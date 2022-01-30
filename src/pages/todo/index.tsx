import SideBar from "./components/SideBar";
import styles from "./index.less";

const Todo = () => {
  return (
    <div className={styles.todoRoot}>
      <SideBar />
      <div className={styles.documentWrap}>
        <div className={styles.titleBar}>
          <div className={styles.titleLeftBar}></div>
          <div className={styles.title}>工作记录</div>
          <div className={styles.titleRightBar}></div>
        </div>
        <div className={styles.documentContentWrap}>content</div>
      </div>
    </div>
  );
};
export default Todo;
