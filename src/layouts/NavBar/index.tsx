import { Button } from "antd";
import { useUserInfo } from "@/hooks";
import { Link, useNavigate } from "react-router-dom";
import styles from "./index.less";
import localStore from "@/utils/localStore";
import { useDispatch } from "@/hooks/redux";
import { setShowLogin } from "@/reducer/common";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useUserInfo();
  const { avatarUrl } = userInfo;

  const handleLoginSide = () => {
    dispatch(setShowLogin(true));
  };

  return (
    <nav className={styles.navWrap}>
      <div onClick={() => navigate("/")} className={styles.indexIcon}>
        Done
      </div>
      <ul>
        {/* <li>
          <Link to="/todo">todo</Link>
        </li> */}
        {/* <li>
          <Button size="small" onClick={() => localStore.clear()}>
            清除缓存
          </Button>
        </li> */}
        <li>
          {avatarUrl ? (
            // <Link to="/user">
            //   <div className={styles.avatar} dangerouslySetInnerHTML={{ __html: avatarUrl }}></div>
            // </Link>
            <div className={styles.avatar} dangerouslySetInnerHTML={{ __html: avatarUrl }}></div>
          ) : (
            <span className={styles.login} onClick={handleLoginSide}>
              Sgin in
            </span>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
