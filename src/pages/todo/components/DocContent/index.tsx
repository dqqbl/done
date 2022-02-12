import { useEffect, memo, useState } from "react";
import { message, Modal } from "antd";
import { DocumentInfo, TodoItem, TodoItemInfo } from "@/types/todo";
import ItemCard from "../ItemCard";
import styles from "./index.less";
import { deleteDocument } from "@/api/todo";

interface DocContentProps {
  data: DocumentInfo;
  initDocList: () => void;
}

const DocContent = (props: DocContentProps) => {
  const { data, initDocList } = props;
  const { id: docId, name: docName, lists: itemLists = [] } = data || {};

  const [renderList, setRenderList] = useState<TodoItemInfo[]>();

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

  const emptyObj = {
    id: "newObj",
    title: new Date().toDateString(),
    items: [],
  };

  useEffect(() => {
    setRenderList(itemLists);
  }, [itemLists]);

  return (
    <div className={styles.documentWrap}>
      <div className={styles.titleBar}>
        <div className={styles.titleLeftBar}></div>
        <div className={styles.title}>{docName}</div>
        <div className={styles.titleRightBar}>
          <div
            onClick={() => {
              setRenderList([emptyObj, ...itemLists]);
            }}
          >
            ➕
          </div>
          <div onClick={handleDeleteDoc}>删</div>
        </div>
      </div>
      <div className={styles.documentContentWrap}>
        {renderList?.map((i) => (
          <ItemCard key={i.id} data={i} />
        ))}
      </div>
    </div>
  );
};

export default memo(DocContent);
