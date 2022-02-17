import { useState, useEffect, useRef } from "react";
import { message } from "antd";
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

  const inputRef = useRef<any>(null);

  const { id: itemId, subItems } = itemData || {};

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
      <div className={styles.itemContentWrap}>
        <DInput
          className={styles.itemContentTitle}
          defaultValue={itemData.content}
          isDesc={!isEditing}
          ref={inputRef}
          onBlur={handleBlur}
          onChange={handleChange}
          onDescClick={() => setIsEditing(true)}
          onKeyDown={handleKeyDown}
        />
        <div className={styles.btnBar}>
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
