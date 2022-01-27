import { Button, Form } from "antd";
import { useNavigate } from "react-router-dom";
import { BasicCard, DInput } from "@/components";
import { appList } from "./constants";
import styles from "./index.less";

const Index = () => {
  const [form] = Form.useForm();
  let navigate = useNavigate();

  return (
    <div className={styles.indexRoot}>
      <div className={styles.appListWrap}>
        {appList.map((i) => (
          <BasicCard
            key={i.name}
            className={styles.appItemWrap}
            onClick={() => navigate(i.url)}
          >
            {i.name}
          </BasicCard>
        ))}
      </div>
      <BasicCard className={styles.loginWrap}>
        <h3 className={styles.loginTitle}>Welcome Done!</h3>
        <Form form={form} colon={false}>
          <Form.Item>
            <DInput placeholder="user" />
          </Form.Item>
          <Form.Item>
            <DInput placeholder="password" />
          </Form.Item>
          <Button
            type="primary"
            size="large"
            shape="round"
            className={styles.loginBtn}
          >
            Login
          </Button>
        </Form>
      </BasicCard>
    </div>
  );
};
export default Index;
