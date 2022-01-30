import { HashRouter as Router, useRoutes } from "react-router-dom";
import ReactDom from "react-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import getRoutes from "./routes";
import styles from "./app.less";
import { useUserInfo } from "./hooks";

const AppContent = () => {
  const { userInfo } = useUserInfo();
  let element = useRoutes(getRoutes(Boolean(userInfo.id)));
  return <div className={styles.app}>{element}</div>;
};

const App = () => {
  return (
    <Router>
      <Provider store={store}>
        <AppContent />
      </Provider>
    </Router>
  );
};

ReactDom.render(<App />, document.getElementById("root"));
