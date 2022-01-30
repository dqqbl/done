import { USER_TOKEN_INFO } from "@/constants";
import { useUserInfo } from "@/hooks";
import localStore from "@/utils/localStore";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../NavBar";
import styles from "./index.less";

const BasicLayout = () => {
  const { updateUserInfo } = useUserInfo();
  useEffect(() => {
    if (localStore.get(USER_TOKEN_INFO)) updateUserInfo();
  }, []);
  return (
    <div className={styles.basicLayoutRoot}>
      <NavBar />
      <Outlet />
    </div>
  );
};
export default BasicLayout;
