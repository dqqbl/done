import { useState, useEffect, useRef, memo, InputHTMLAttributes, ChangeEvent } from "react";
import { message } from "antd";
// import classNames from "classnames";
import { DInput } from "@/components";
import { TodoListInfo } from "@/types/todo";
import styles from "./index.less";
import { createList } from "@/api/todo";

interface ListCardProps {
  docId: string;
  initialData: TodoListInfo;
  curListId: string;
  tabIndex: number;
  initDocList: () => void;
  // isEditing: boolean;
  // onKeyDown: (e: React.KeyboardEvent) => void;
  // onBlur: () => void;
}

const ListCard = (props: ListCardProps) => {
  const { docId, initialData, curListId, tabIndex, initDocList } = props;

  const inputRef = useRef<any>(null);

  const [listData, setListData] = useState(initialData);
  const [isEditing, setIsEditing] = useState(false);

  const { id: listId, title, items: itemContents } = listData || {};

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // if (e.key === ENTER_KEY) {
    //   if (isEditing) {
    //     inputRef.current.blur();
    //   }
    //   setIsEditing(!isEditing);
    // }
  };

  const handleBlur = async () => {
    try {
      setIsEditing(false);
      if (curListId === "newList") {
        await createList({ id: docId, title: listData.title });
        message.success("条目创建成功");
        await initDocList();
        // await initTodoList();
      } else {
        // const temp = [...renderList];
        // const index = temp.findIndex((i) => i.id === curItemId);
        // await updateDocument({ id: curItemId!, name: renderList[index].name });
        message.success("条目修改成功");
      }
      // await initDocList();
    } catch (error) {
      console.log(error);
      message.error("操作失败");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setListData({ ...listData, title: e.target.value });
    // const temp = [...renderList!];
    // const index = temp.findIndex((i) => i.id === curItemId);
    // temp[index].name = e.target.value;
    // setRenderList([...temp]);
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
  // const { id: listId, title, items: itemContents } = initialData;
  // const [isExpand, setIsExpand] = useState(true);

  return (
    <div className={styles.itemCardWrap} tabIndex={tabIndex} onKeyDown={handleKeyDown}>
      <div className={styles.titleWrap}>
        <DInput
          isDesc={!(curListId === listId && isEditing)}
          descClassName={styles.itemTitle}
          defaultValue={title}
          ref={inputRef}
          onBlur={handleBlur}
          // onBlur={handleBlur}
          onChange={handleChange}
        />
        <div className={styles.addBtn} onClick={() => {}}>
          +
        </div>
      </div>
      {/* <div className={styles.itemTitle}>{title}</div> */}
      {itemContents?.map(({ id: itemId, content: itemContent, subItems }) => {
        return (
          <div className={styles.itemContentWrap} key={itemId}>
            <div className={styles.itemContentTitle}>{itemContent}</div>
            {subItems?.map(({ id: subItemId, content: subItemContent }) => {
              return (
                <div key={subItemId} className={styles.subItemWrap}>
                  {subItemContent}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default memo(ListCard);
