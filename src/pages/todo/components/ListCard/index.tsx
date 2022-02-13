// import { useState } from "react";
// import classNames from "classnames";
import { forwardRef, memo } from "react";
import { DInput } from "@/components";
import { TodoListInfo } from "@/types/todo";
import styles from "./index.less";

interface ListCardProps {
  data: TodoListInfo;
  curSelId: string;
  tabIndex: number;
  isEditing: boolean;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onBlur:() => void
}

const ListCard = (props: ListCardProps, ref: any) => {
  const { data, curSelId, tabIndex, isEditing, onKeyDown, onBlur } = props;
  const { id: listId, title, items: itemContents } = data;
  // const [isExpand, setIsExpand] = useState(true);

  return (
    <div className={styles.itemCardWrap} tabIndex={tabIndex} onKeyDown={onKeyDown} >
      <DInput
        isDesc={!isEditing}
        descClassName={styles.itemTitle}
        defaultValue={title}
        ref={ref}
        onBlur={onBlur}
        // onBlur={handleBlur}
        // onChange={handleChange}
      />
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

export default memo(forwardRef(ListCard));
