import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

const BasicLayout = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/todo">todo</Link>
          </li>
          <li>
            <Link to="/user">user</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};
export default BasicLayout;
