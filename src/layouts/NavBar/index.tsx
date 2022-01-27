import { Link, useNavigate } from "react-router-dom";
import styles from "./index.less";

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <nav className={styles.navWrap}>
      <div onClick={() => navigate("/")} className={styles.indexIcon}>
        Done
      </div>
      <ul>
        {/* <li>
          <Link to="/todo">todo</Link>
        </li> */}
        <li>
          <Link to="/user">user</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
