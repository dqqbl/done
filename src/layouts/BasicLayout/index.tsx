import { Outlet } from "react-router-dom";
import NavBar from "../NavBar";
import styles from "./index.less";

const BasicLayout = () => {
  return (
    <div className={styles.basicLayoutRoot}>
      <NavBar />
      <Outlet />
    </div>
  );
};
export default BasicLayout;
