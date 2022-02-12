import { message, Modal } from "antd";
import { DocumentInfo } from "@/types/todo";
import ItemCard from "../ItemCard";
import styles from "./index.less";
import { deleteDocument } from "@/api/todo";

interface DocContentProps {
  data: DocumentInfo;
  initDocList: () => void;
}

const DocContent = (props: DocContentProps) => {
  const { data, initDocList } = props;
  const { id: docId, name: docName, lists: itemLists } = data || {};

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

  return (
    <div className={styles.documentWrap}>
      <div className={styles.titleBar}>
        <div className={styles.titleLeftBar}></div>
        <div className={styles.title}>{docName}</div>
        <div className={styles.titleRightBar}>
          <div>➕</div>
          <div onClick={handleDeleteDoc}>删</div>
        </div>
      </div>
      <div className={styles.documentContentWrap}>
        {itemLists?.map((i) => (
          <ItemCard key={i.id} data={i} />
        ))}
      </div>
    </div>
  );
};

export default DocContent;
