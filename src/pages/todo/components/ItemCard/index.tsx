import { useState, useEffect, useRef } from "react";
import { message } from "antd";
import classnames from "classnames";
import { TodoItemInfo, SubItemInfo } from "@/types/todo";
import { DInput, Icon } from "@/components";
import styles from "./index.less";
import { createItem, deleteItem, updateItem, getItemDetails } from "@/api/todo";
import { ENTER_KEY } from "@/constants";
import SubItemCard from "../SubItemCard";

interface ItemCardProps {
  handleRemoveItem: (itemId: string) => void;
  handleRefreshItemList: () => void;
  initialData: TodoItemInfo;
  listId: string;
}

const ItemCard = (props: ItemCardProps) => {
  const { initialData, listId, handleRemoveItem, handleRefreshItemList } = props;

  const [itemData, setItemData] = useState(initialData);
  const [isEditing, setIsEditing] = useState(itemData.id === "newItem");
  const [isHover, setIsHover] = useState(false);
  const inputRef = useRef<any>(null);

  // subItem
  const [subItemList, setSubItemList] = useState<SubItemInfo[]>([]);

  const { id: itemId, subItems: initSubItemList, content, isDone } = itemData || {};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemData({ ...itemData, content: e.target.value });
  };

  const handleBlur = async () => {
    try {
      setIsEditing(false);
      if (!itemData.content) {
        itemData.id === "newItem"
          ? handleRemoveItem(itemData.id)
          : setItemData({ ...itemData, content: initialData.content });
        return;
      }
      if (itemData.id === "newItem") {
        await createItem({ listId, content: itemData.content });
        await handleRefreshItemList();
      } else {
        await updateItem({ itemId, content: itemData.content });
      }
    } catch (error) {
      console.log(error);
      message.error("操作失败");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ENTER_KEY) {
      inputRef.current.blur();
      setIsEditing(!isEditing);
      e.stopPropagation();
    }
  };

  const handleDeleteItem = async () => {
    try {
      handleRemoveItem(itemData.id);
      await deleteItem(itemData.id);
    } catch (error) {
      console.log(error);
      message.error("删除失败");
    }
  };

  const handleItemIsDone = async () => {
    await updateItem({ itemId, isDone: !isDone });
    await handleRefreshItemList();
    setIsEditing(false)
  };

  
  /** handle subItem */
  const emptySubItem = {
    id: "newSubItem",
    content: "",
    isDone: false,
  };
  const handleAddSubItem = () => {
    setSubItemList([emptySubItem, ...subItemList]);
  };
  const handleRefreshSubItemList = async () => {
    const { data } = await getItemDetails(itemData.id);
    setItemData(data);
    setSubItemList(data.subItems);
  };
  const handleRemoveSubItem = (subItemId: string) => {
    const index = subItemList.findIndex((i) => i.id === subItemId);
    subItemList.splice(index, 1);
    setSubItemList([...subItemList]);
  };

  useEffect(() => {
    setItemData(initialData);
  }, [initialData]);

  useEffect(() => {
    setSubItemList(initSubItemList);
  }, [initSubItemList]);

  useEffect(() => {
    if (inputRef.current) {
      isEditing && inputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <div className={styles.itemCardWrap}>
      <div
        className={styles.itemContentWrap}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <DInput
          className={classnames(styles.itemContentTitle, { [styles.noHoverStyle]: isEditing, [styles.itemTitleHover]: isHover })}
          defaultValue={content}
          isDesc={!isEditing || isDone}
          ref={inputRef}
          onBlur={handleBlur}
          onChange={handleChange}
          onDescClick={() => !isDone && setIsEditing(true)}
          onKeyDown={handleKeyDown}
          descClassName={classnames({ [styles.isDone]: isDone })}
        />
        <div className={styles.btnBar} style={{ visibility: isHover && !isEditing ? "visible" : "hidden" }}>
          <Icon type={'icon-add'} onClick={handleAddSubItem} />
          <Icon type={isDone ? 'icon-rest' : 'icon-done'} onClick={handleItemIsDone} />
          <Icon type="icon-delete" onClick={handleDeleteItem} />
        </div>
      </div>

      {subItemList?.map((i) => {
        return (
          <SubItemCard
            key={i.id}
            initialData={i}
            itemId={itemId}
            handleRemoveSubItem={handleRemoveSubItem}
            handleRefreshSubItemList={handleRefreshSubItemList}
          />
        );
      })}
    </div>
  );
};

export default ItemCard;
