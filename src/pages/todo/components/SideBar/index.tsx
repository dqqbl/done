import { memo } from "react";
import classNames from "classnames";
import { DocumentInfo } from "@/types/todo";
import styles from "./index.less";

interface SideBarProps {
  data: DocumentInfo[];
  curItemId?: string;
  handleSelect: (item: DocumentInfo) => void;
}

const SideBar = (props: SideBarProps) => {
  const { data = [], curItemId, handleSelect } = props;

  const handleItemClick = (item: DocumentInfo) => {
    if (item.id === curItemId) return;
    handleSelect(item);
  };

  const handleAddClick = () => {};

  return (
    <div className={styles.sideBarWrap}>
      <div className={styles.sideBarHeader}>Directory</div>
      <div className={styles.sideBarContentWrap}>
        {/* <div className={styles.sideBarContent}> */}
        {data.map((i) => (
          <li
            className={classNames(styles.directoryItem, { [styles.selected]: curItemId === i.id })}
            key={i.id}
            onClick={() => handleItemClick(i)}
          >
            {i.name}
          </li>
        ))}
        {/* </div> */}
      </div>
      <div className={styles.sideBarFooter} onClick={handleAddClick}>
        <div className={styles.addDocIcon}>+</div>
      </div>
    </div>
  );
};
export default memo(SideBar);
