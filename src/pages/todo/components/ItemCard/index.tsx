import { useState, useEffect } from "react";
import { TodoItemInfo } from "@/types/todo";
import styles from "./index.less";

interface ItemCardProps {
  initialData: TodoItemInfo;
}

const ItemCard = (props: ItemCardProps) => {
  const { initialData } = props;
  // // const inputRef = useRef<any>(null);

  const [itemData, setItemData] = useState(initialData);

  const { id: itemId, content, subItems } = itemData || {};
  // // const [isEditing, setIsEditing] = useState(false);

  // const { id: listId, title, items: itemContents } = listData || {};

  // const handleKeyDown = (e: React.KeyboardEvent) => {
  //   if (e.key === ENTER_KEY) {
  //     if (isEditing) {
  //       inputRef.current.blur();
  //     }
  //     setIsEditing(!isEditing);
  //   }
  // };

  // const handleBlur = async () => {
  //   try {
  //     setIsEditing(false);
  //     if (curListId === "newList") {
  //       await createList({ id: docId, title: listData.title });
  //       message.success("条目创建成功");
  //       await initTodoList();
  //       // await initTodoList();
  //     } else {
  //       // const temp = [...renderList];
  //       // const index = temp.findIndex((i) => i.id === curItemId);
  //       // await updateDocument({ id: curItemId!, name: renderList[index].name });
  //       message.success("条目修改成功");
  //     }
  //     // await initDocList();
  //   } catch (error) {
  //     console.log(error);
  //     message.error("操作失败");
  //   }
  // };

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setListData({ ...listData, title: e.target.value });
  //   // const temp = [...renderList!];
  //   // const index = temp.findIndex((i) => i.id === curItemId);
  //   // temp[index].name = e.target.value;
  //   // setRenderList([...temp]);
  // };

  // const handleDeleteList = async () => {
  //   await deleteList({ docId, listId: listData.id });
  //   await initTodoList();
  // };

  useEffect(() => {
    setItemData(initialData);
    // if (initialData.id === "newList") {
    //   setIsEditing(true);
    // }
  }, [initialData]);

  // useEffect(() => {
  //   isEditing && inputRef.current.focus();
  // }, [isEditing]);
  // // const { id: listId, title, items: itemContents } = initialData;
  // // const [isExpand, setIsExpand] = useState(true);

  return (
    <div className={styles.itemContentWrap}>
      <div className={styles.itemContentTitle}>{content}</div>
      {subItems?.map(({ id: subItemId, content: subItemContent }) => {
        return (
          <div key={subItemId} className={styles.subItemWrap}>
            {subItemContent}
          </div>
        );
      })}
    </div>
    // <div className={styles.itemCardWrap} tabIndex={tabIndex} onKeyDown={handleKeyDown} onClick={handleListClick}>
    //   <div className={styles.titleWrap}>
    //     <DInput
    //       isDesc={!(curListId === listId && isEditing)}
    //       descClassName={styles.itemTitle}
    //       defaultValue={title}
    //       ref={inputRef}
    //       onBlur={handleBlur}
    //       // onBlur={handleBlur}
    //       onChange={handleChange}
    //     />
    //     <div className={styles.btnBar}>
    //       <div className={styles.addItemBtn} onClick={() => {}}>
    //         +
    //       </div>
    //       <div onClick={handleDeleteList}>删</div>
    //     </div>
    //   </div>
    //   {/* <ItemCard initialData={itemContents} /> */}
    //   {/* <div className={styles.itemTitle}>{title}</div> */}
    //   {/* {itemContents?.map(({ id: itemId, content: itemContent, subItems }) => {
    //     return (
    //       <div className={styles.itemContentWrap} key={itemId}>
    //         <div className={styles.itemContentTitle}>{itemContent}</div>
    //         {subItems?.map(({ id: subItemId, content: subItemContent }) => {
    //           return (
    //             <div key={subItemId} className={styles.subItemWrap}>
    //               {subItemContent}
    //             </div>
    //           );
    //         })}
    //       </div>
    //     );
    //   })} */}
    // </div>
  );
};

export default ItemCard;
