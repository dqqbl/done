import { useState, useEffect, useRef } from "react";
import { message } from "antd";
import classnames from "classnames";
import { SubItemInfo } from "@/types/todo";
import { DInput, Icon } from "@/components";
import styles from "./index.less";
import { createSubItem, deleteSubItem, updateSubItem } from "@/api/todo";
import { ENTER_KEY } from "@/constants";

interface SubItemCardProps {
  handleRemoveSubItem: (itemId: string) => void;
  handleRefreshSubItemList: () => void;
  initialData: SubItemInfo;
  itemId: string;
}

const SubItemCard = (props: SubItemCardProps) => {
  const { initialData, itemId, handleRemoveSubItem, handleRefreshSubItemList } = props;

  const [subItemData, setSubItemData] = useState(initialData);
  const [isEditing, setIsEditing] = useState(subItemData.id === "newSubItem");
  const [isHover, setIsHover] = useState(false);
  const inputRef = useRef<any>(null);

  const { id: subItemId, content, isDone } = subItemData || {};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubItemData({ ...subItemData, content: e.target.value });
  };

  const handleBlur = async () => {
    try {
      setIsEditing(false);
      if (!subItemData.content) {
        subItemData.id === "newSubItem"
          ? handleRemoveSubItem(subItemData.id)
          : setSubItemData({ ...subItemData, content: initialData.content });
        return;
      }
      if (subItemData.id === "newSubItem") {
        await createSubItem({ itemId, content: subItemData.content });
        await handleRefreshSubItemList();
      } else {
        await updateSubItem({ subItemId, content: subItemData.content });
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

  const handleDeleteSubItem = async () => {
    try {
      handleRemoveSubItem(subItemData.id);
      await deleteSubItem(subItemData.id);
    } catch (error) {
      console.log(error);
      message.error("删除失败");
    }
  };

  const handleSubItemIsDone = async () => {
    await updateSubItem({ subItemId, isDone: !isDone });
    await handleRefreshSubItemList();
    setIsEditing(false)
  };

  useEffect(() => {
    setSubItemData(initialData);
  }, [initialData]);

  useEffect(() => {
    if (inputRef.current) {
      isEditing && inputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <div className={styles.subItemCardWrap}>
      <div
        className={styles.subItemContentWrap}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <DInput
          className={classnames(styles.subItemContentTitle, { [styles.noHoverStyle]: isEditing, [styles.subItemTitleHover]: isHover })}
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
          <Icon type={isDone ? 'icon-rest' : 'icon-done'} onClick={handleSubItemIsDone} />
          <Icon type="icon-delete" onClick={handleDeleteSubItem} />
        </div>
      </div>
    </div>
  );
};

export default SubItemCard;
