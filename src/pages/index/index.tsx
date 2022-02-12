import { Button, Form, message } from "antd";
import { useNavigate } from "react-router-dom";
import { BasicCard, DInput } from "@/components";
import { login } from "@/api/auth";
import localStore from "@/utils/localStore";
import { useUserInfo } from "@/hooks";
import { appList } from "./constants";
import styles from "./index.less";
import { useEffect } from "react";
import { useDispatch, useSelector } from "@/hooks/redux";
import { setShowLogin } from "@/reducer/common";
import { initialUser, updateUser } from "@/reducer/user";
import { USER_TOKEN_INFO } from "@/constants";

const Index = () => {
  const [form] = Form.useForm();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { showLogin } = useSelector((state) => state.common);
  const { updateUserInfo } = useUserInfo();

  const handleLogin = async () => {
    try {
      const values = await form.validateFields();
      const { data: tokenInfo } = await login(values);
      if (!tokenInfo) return message.info("账号或密码错误");
      localStore.setToken(tokenInfo);
      await updateUserInfo();
      dispatch(setShowLogin(false));
    } catch (error) {
      message.error("用户信息获取失败");
    }
  };

  useEffect(() => {
    if (window.location.href.indexOf("reLogin=true") !== -1) {
      console.log(window.location);
      message.warning("身份验证已失效，请重新登录");
      dispatch(updateUser(initialUser));
      navigate("/");
    }
  }, [navigate]);

  const handleCardClick = (url: string) => {
    if (localStore.get(USER_TOKEN_INFO)) return navigate(url);
    dispatch(setShowLogin(true));
  };

  return (
    <div className={styles.indexRoot}>
      <div className={styles.appListWrap}>
        {appList.map((i) => (
          <BasicCard key={i.name} className={styles.appItemWrap} onClick={() => handleCardClick(i.url)}>
            {i.name}
          </BasicCard>
        ))}
      </div>
      {showLogin && (
        <BasicCard className={styles.loginWrap}>
          <h3 className={styles.loginTitle}>Welcome Done!</h3>
          <Form form={form} colon={false}>
            <Form.Item name={"acount"}>
              <DInput placeholder="acount" radius={true} />
            </Form.Item>
            <Form.Item name={"password"}>
              <DInput placeholder="password" radius={true} />
            </Form.Item>
            <Button type="primary" size="large" shape="round" className={styles.loginBtn} onClick={handleLogin}>
              Login
            </Button>
          </Form>
        </BasicCard>
      )}
    </div>
  );
};
export default Index;
