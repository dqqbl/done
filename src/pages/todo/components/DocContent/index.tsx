import { useEffect, memo, useState } from "react";
import { message, Modal } from "antd";
import { DocumentInfo, TodoListInfo } from "@/types/todo";
import ListCard from "../ListCard";
import styles from "./index.less";
import { deleteDocument } from "@/api/todo";

interface DocContentProps {
  initialTodoList: DocumentInfo;
  /** 初始化sideBar数据 */
  initDocList: (restSel?: boolean) => void;
  /** 初始化文档内容 */
  initTodoList: () => void;
}

const DocContent = (props: DocContentProps) => {
  const { initialTodoList, initDocList, initTodoList } = props;
  const { id: docId, name: docName, lists = [] } = initialTodoList || {};

  const [todoList, setTodoList] = useState<TodoListInfo[]>();

  const [curListId, setCurListId] = useState("");

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

  const handleAddList = () => {
    setTodoList([emptyList, ...lists]);
    setCurListId(emptyList.id);
  };

  useEffect(() => {
    setTodoList(initialTodoList?.lists || []);
  }, [initialTodoList]);

  return (
    <div className={styles.documentWrap}>
      <div className={styles.titleBar}>
        <div className={styles.titleLeftBar}></div>
        <div className={styles.title}>{docName}</div>
        {docId && (
          <div className={styles.titleRightBar}>
            <div onClick={handleAddList}>➕</div>
            <div onClick={handleDeleteDoc}>删</div>
          </div>
        )}
      </div>
      <div className={styles.documentContentWrap}>
        {todoList?.map((i, index) => (
          <ListCard
            key={i.id}
            docId={docId}
            initialData={i}
            curListId={curListId}
            tabIndex={todoList?.length + index + 1}
            initTodoList={initTodoList}
            handleListClick={() => setCurListId(i.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default memo(DocContent);
