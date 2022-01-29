import { Button, Form, message } from "antd";
import { useNavigate } from "react-router-dom";
import { BasicCard, DInput } from "@/components";
import { login } from "@/api/auth";
import { appList } from "./constants";
import styles from "./index.less";
import localStore from "@/utils/localStore";
import { getUserDetail } from "@/api/user";

const Index = () => {
  const [form] = Form.useForm();
  let navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const values = await form.validateFields();
      const { data } = await login(values);
      data ? localStore.setToken(data) : message.info("账号或密码错误");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.indexRoot}>
      <div className={styles.appListWrap}>
        {appList.map((i) => (
          <BasicCard key={i.name} className={styles.appItemWrap} onClick={() => navigate(i.url)}>
            {i.name}
          </BasicCard>
        ))}
      </div>
      <BasicCard className={styles.loginWrap}>
        <h3 className={styles.loginTitle}>Welcome Done!</h3>
        <Form form={form} colon={false}>
          <Form.Item name={"acount"}>
            <DInput placeholder="acount" />
          </Form.Item>
          <Form.Item name={"password"}>
            <DInput placeholder="password" />
          </Form.Item>
          <Button type="primary" size="large" shape="round" className={styles.loginBtn} onClick={handleLogin}>
            Login
          </Button>
          <Button type="primary" size="large" shape="round" className={styles.loginBtn} onClick={() => getUserDetail()}>
            test
          </Button>
        </Form>
      </BasicCard>
    </div>
  );
};
export default Index;
