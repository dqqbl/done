// import { useState } from "react";
// import classNames from "classnames";
import { memo } from "react";
import { DInput } from "@/components";
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
      <DInput
        isDesc={true}
        descClassName={styles.itemTitle}
        defaultValue={title}
        // isDesc={!(curItemId === i.id && isEditing)}
        // ref={newDocRef}
        // onBlur={handleBlur}
        // onChange={handleChange}
      />
      {/* <div className={styles.itemTitle}>{title}</div> */}
      {items?.map(({ id: itemId, content: itemContent, subItems }) => {
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

export default memo(ItemCard);
