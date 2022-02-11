// import { useState } from "react";
// import classNames from "classnames";
import { TodoItemInfo } from "@/types/todo";
import styles from "./index.less";

interface ItemCardProps {
  data: TodoItemInfo;
}

const ItemCard = (props: ItemCardProps) => {
  const { data } = props;
  const { id: docId, title, items } = data;
  // const [isExpand, setIsExpand] = useState(true);

  return (
    <div className={styles.itemCardWrap}>
      <div className={styles.itemTitle}>{title}</div>
      {items?.map(({ id: itemId, content: itemContent, subItems }) => {
        console.log("???");
        console.log(subItems);
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

export default ItemCard;
