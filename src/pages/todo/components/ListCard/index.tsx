import { useState, useEffect, useRef, memo } from "react";
import { message, Modal } from "antd";
import classnames from "classnames";
import { DInput, Icon } from "@/components";
import { TodoItemInfo, TodoListInfo } from "@/types/todo";
import { createList, deleteList, getListDetails, updateList } from "@/api/todo";
import { ENTER_KEY } from "@/constants";
import ItemCard from "../ItemCard";
import styles from "./index.less";

interface ListCardProps {
  docId: string;
  initialData: TodoListInfo;
  curListId: string;
  tabIndex: number;
  initTodoList: () => void;
  handleListClick: () => void;
}

const emptyItem = {
  id: "newItem",
  content: "",
  subItems: [],
  isDone: false,
};

const ListCard = (props: ListCardProps) => {
  const { docId, initialData, curListId, tabIndex, initTodoList, handleListClick } = props;

  const inputRef = useRef<any>(null);

  const [listData, setListData] = useState(initialData);
  const [isEditing, setIsEditing] = useState(false);
  const [itemList, setItemList] = useState<TodoItemInfo[]>([]);
  const [isHover, setIsHover] = useState(false);

  const { id: listId, title, items: initItemList, isDone } = listData || {};

  /** handle List */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ENTER_KEY) {
      if (isEditing) {
        inputRef.current.blur();
      }
      setIsEditing(!isEditing);
    }
  };

  const handleBlur = async () => {
    try {
      setIsEditing(false);
      if (curListId === "newList") {
        await createList({ docId, title: listData.title });
        message.success("条目创建成功");
        await initTodoList();
      } else {
        await updateList({ listId: curListId, title: listData.title });
        message.success("条目修改成功");
      }
    } catch (error) {
      console.log(error);
      message.error("操作失败");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setListData({ ...listData, title: e.target.value });
  };

  const handleDeleteList = async () => {
    Modal.confirm({
      content: "确认删除该条目?",
      onOk: async () => {
        await deleteList(listData.id);
        await initTodoList();
      },
    });
  };

  /** handle item */
  const handleAddItem = () => {
    setItemList([emptyItem, ...itemList]);
  };
  const handleRefreshItemList = async () => {
    const { data } = await getListDetails(listData.id);
    setListData(data);
    setItemList(data.items);
  };
  const handleRemoveItem = (itemId: string) => {
    const index = itemList.findIndex((i) => i.id === itemId);
    itemList.splice(index, 1);
    setItemList([...itemList]);
  };

  useEffect(() => {
    setListData(initialData);
    if (initialData.id === "newList") {
      setIsEditing(true);
    }
  }, [initialData]);

  useEffect(() => {
    isEditing && inputRef.current.focus();
  }, [isEditing]);

  useEffect(() => {
    setItemList(initItemList);
  }, [initItemList]);

  return (
    <div className={styles.itemCardWrap} tabIndex={tabIndex} onKeyDown={handleKeyDown} onClick={handleListClick}>
      <div className={styles.titleWrap} onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
        <DInput
          isDesc={!(curListId === listId && isEditing) || isDone}
          defaultValue={title}
          ref={inputRef}
          onBlur={handleBlur}
          onChange={handleChange}
          descClassName={classnames(styles.itemTitle, { [styles.isDone]: isDone })}
        />
        <div className={styles.btnBar} style={{ visibility: isHover ? "visible" : "hidden" }}>
          <Icon type="icon-add" onClick={handleAddItem} />
          <Icon type="icon-delete" onClick={handleDeleteList} />
        </div>
      </div>
      {itemList?.map((i) => {
        return (
          <ItemCard
            key={i.id}
            initialData={i}
            listId={listId}
            handleRemoveItem={handleRemoveItem}
            handleRefreshItemList={handleRefreshItemList}
          />
        );
      })}
    </div>
  );
};

export default memo(ListCard);
