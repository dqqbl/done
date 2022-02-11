import { DocumentInfo } from "@/types/todo";
import ItemCard from "../ItemCard";
import styles from "./index.less";

interface DocContentProps {
  data?: DocumentInfo;
}

const DocContent = (props: DocContentProps) => {
  const { data } = props;
  const { id: docId, name: docName, lists: itemLists } = data || {};

  console.log(itemLists);

  return (
    <div className={styles.documentWrap}>
      <div className={styles.titleBar}>
        <div className={styles.titleLeftBar}>L</div>
        <div className={styles.title}>{docName}</div>
        <div className={styles.titleRightBar}>R</div>
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
