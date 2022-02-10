import { DocumentInfo } from "@/types/todo";
import classNames from "classnames";
import styles from "./index.less";

interface SideBarProps {
  data: DocumentInfo[];
  curItem?: DocumentInfo;
  handleSelect: (item: DocumentInfo) => void;
}

const SideBar = (props: SideBarProps) => {
  const { data = [], curItem, handleSelect } = props;

  const handleClick = (item: DocumentInfo) => {
    if (item.id === curItem?.id) return
    handleSelect(item)
  }

  return (
    <div className={styles.sideBarWrap}>
      <div className={styles.sideBarHeader}>Directory</div>
      <div className={styles.sideBarContentWrap}>
        {/* <div className={styles.sideBarContent}> */}
        {data.map((i) => (
          <li className={classNames(styles.directoryItem, {[styles.selected]: curItem?.id === i.id})} key={i.id} onClick={() => handleClick(i)}>
            {i.name}
          </li>
        ))}
        {/* </div> */}
      </div>
      <div className={styles.sideBarFooter}>
        <div className={styles.addDocIcon}>+</div>
      </div>
    </div>
  );
};
export default SideBar;
