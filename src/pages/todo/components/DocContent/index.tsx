import { useEffect, memo, useState, useRef } from "react";
import { message, Modal, Input } from "antd";
import { DocumentInfo, TodoListInfo } from "@/types/todo";
import ListCard from "../ListCard";
import styles from "./index.less";
import { createList, deleteDocument } from "@/api/todo";
import { ENTER_KEY } from "@/constants";

interface DocContentProps {
  initialTodoList: DocumentInfo;
  /** 初始化sideBar数据 */
  initDocList: () => void;
  /** 初始化文档内容 */
  initTodoList: () => void;
}

const DocContent = (props: DocContentProps) => {
  const { initialTodoList, initDocList, initTodoList } = props;
  const { id: docId, name: docName, lists = [] } = initialTodoList || {};

  const [todoList, setTodoList] = useState<TodoListInfo[]>();

  const [curListId, setCurListId] = useState("");
  // const [isEditing, setIsEditing] = useState(false);

  const handleDeleteDoc = () => {
    Modal.confirm({
      content: "确认删除该文档",
      onOk: () => {
        deleteDocument(docId!)
          .then(() => {
            message.success("删除成功");
            initDocList();
          })
          .catch((err) => {
            console.log(err);
            message.error("删除失败");
          });
      },
    });
  };

  const emptyList = {
    id: "newList",
    title: new Date().toDateString(),
    items: [],
  };

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
  //       await createList({ id: docId, title: renderList?.[0].title || "" });
  //       message.success("文档创建成功");
  //       await initTodoList();
  //     } else {
  //       // const temp = [...renderList];
  //       // const index = temp.findIndex((i) => i.id === curItemId);
  //       // await updateDocument({ id: curItemId!, name: renderList[index].name });
  //       message.success("文档修改成功");
  //     }
  //     // await initDocList();
  //   } catch (error) {
  //     console.log(error);
  //     message.error("操作失败");
  //   }
  // };

  // const handleChange = () => {
  //   const temp = [...renderList!];
  //   const index = temp.findIndex((i) => i.id === curItemId);
  //   temp[index].name = e.target.value;
  //   setRenderList([...temp]);
  // }

  useEffect(() => {
    setTodoList(initialTodoList?.lists || []);
  }, [initialTodoList]);

  return (
    <div className={styles.documentWrap}>
      <div className={styles.titleBar}>
        <div className={styles.titleLeftBar}></div>
        <div className={styles.title}>{docName}</div>
        <div className={styles.titleRightBar}>
          <div
            onClick={() => {
              setTodoList([emptyList, ...lists]);
              setCurListId(emptyList.id);
              // setIsEditing(true);
            }}
          >
            ➕
          </div>
          <div onClick={handleDeleteDoc}>删</div>
        </div>
      </div>
      <div className={styles.documentContentWrap}>
        {todoList?.map((i, index) => (
          <ListCard
            key={i.id}
            docId={docId}
            initialData={i}
            curListId={curListId}
            tabIndex={todoList?.length + index + 1}
            initDocList={initDocList}
            // onKeyDown={handleKeyDown}
            // isEditing={isEditing}
            // onBlur={handleBlur}
          />
        ))}
      </div>
    </div>
  );
};

export default memo(DocContent);
