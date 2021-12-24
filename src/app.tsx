import { BrowserRouter as Router } from "react-router-dom";
import { useRoutes } from "react-router-dom";
import ReactDom from "react-dom";
import routes from "./routes";
import styles from "./app.less";

const AppContent = () => {
  let element = useRoutes(routes);
  return <div className={styles.app}>{element}</div>;
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

ReactDom.render(<App />, document.getElementById("root"));
