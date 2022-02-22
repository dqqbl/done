import { useState, useEffect, useRef } from "react";
import { message } from "antd";
import classnames from "classnames";
import { TodoItemInfo } from "@/types/todo";
import { DInput } from "@/components";
import styles from "./index.less";
import { createItem, deleteItem, updateItem } from "@/api/todo";
import { ENTER_KEY } from "@/constants";

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

  const { id: itemId, subItems, content, isDone } = itemData || {};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemData({ ...itemData, content: e.target.value });
  };

  const handleBlur = async () => {
    try {
      setIsEditing(false);
      console.log(itemData);
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
  }

  useEffect(() => {
    setItemData(initialData);
  }, [initialData]);

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
          className={classnames(styles.itemContentTitle, { [styles.noHoverStyle]: isEditing })}
          defaultValue={content}
          isDesc={!isEditing || isDone}
          ref={inputRef}
          onBlur={handleBlur}
          onChange={handleChange}
          onDescClick={() => setIsEditing(true)}
          onKeyDown={handleKeyDown}
          descClassName={classnames({[styles.isDone]: isDone})}
        />
        <div className={styles.btnBar} style={{ visibility: isHover ? "visible" : "hidden" }}>
          <div onClick={handleItemIsDone}>{isDone ? '返' : 'D'}</div>
          <div onClick={handleDeleteItem}>删</div>
        </div>
      </div>

      {subItems?.map(({ id: subItemId, content: subItemContent }) => {
        return (
          <div key={subItemId} className={styles.subItemWrap}>
            {subItemContent}
          </div>
        );
      })}
    </div>
  );
};

export default ItemCard;
