import styles from "./index.less";

const SideBar = () => {
  return (
    <div className={styles.sideBarWrap}>
      <div className={styles.sideBarHeader}>Directory</div>
      <div className={styles.sideBarContentWrap}>
        {/* <div className={styles.sideBarContent}> */}
        {new Array(10).fill(0).map((i, index) => (
          <li className={styles.directoryItem} key={index}>
            item
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
