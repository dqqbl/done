import { Button, Form, message } from "antd";
import { useNavigate } from "react-router-dom";
import { BasicCard, DInput } from "@/components";
import { login, register } from "@/api/auth";
import localStore from "@/utils/localStore";
import { useUserInfo } from "@/hooks";
import styles from "./index.less";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "@/hooks/redux";
import { setShowLogin } from "@/reducer/common";
import { initialUser, updateUser } from "@/reducer/user";
import { USER_TOKEN_INFO } from "@/constants";
import classnames from "classnames";

const Index = () => {
  const [form] = Form.useForm();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const { showLogin } = useSelector((state) => state.common);
  const [isSignUp, setIsSignUp] = useState(false);
  const { updateUserInfo } = useUserInfo();

  const handleLogin = async () => {
    try {
      const values = await form.validateFields();
      if (isSignUp) {
        const { code } = await register(values);
        if (code === 4007) return message.info("邀请码不存在");
      }
      const { data: tokenInfo } = await login(values);
      if (!tokenInfo) return message.info("账号或密码错误");
      localStore.setToken(tokenInfo);
      await updateUserInfo();
      dispatch(setShowLogin(false));
    } catch (error) {
      console.log(error);
      // message.error("用户信息获取失败");
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
        <BasicCard className={styles.appItemWrap} onClick={() => handleCardClick("/todo")}>
          <h4>todo</h4>
        </BasicCard>
        <BasicCard className={classnames(styles.appItemWrap, styles.disabled)}>
          <h4>Interactive Cinema</h4>
        </BasicCard>
        <BasicCard className={classnames(styles.appItemWrap, styles.disabled)}>
          <h4>Radiate</h4>
        </BasicCard>
        <BasicCard className={classnames(styles.appItemWrap, styles.disabled)}>
          <h4>3D</h4>
        </BasicCard>
      </div>
      {showLogin && (
        <BasicCard className={styles.loginWrap}>
          <h3 className={styles.loginTitle}>Welcome Done!</h3>
          <Form form={form} colon={false}>
            <Form.Item
              name={"acount"}
              rules={[
                { required: true, message: "请输入账号" },
                { pattern: /^[\\u4e00-\\u9fa5_a-zA-Z0-9-]{1,16}$/g, message: "请输入1-16位数字/字母/_" },
              ]}
            >
              <DInput placeholder="acount" radius={true} />
            </Form.Item>
            <Form.Item name={"password"} rules={[{ required: true, message: "请输入密码" }]}>
              <DInput placeholder="password" radius={true} />
            </Form.Item>
            {isSignUp && (
              <Form.Item name={"code"} rules={[{ required: true, message: "请输入邀请码" }]}>
                <DInput placeholder="Invitation code" radius={true} />
              </Form.Item>
            )}
            <Button type="primary" size="large" shape="round" className={styles.loginBtn} onClick={handleLogin}>
              {isSignUp ? "Sign up" : "Sign in"}
            </Button>
            <span className={styles.signUp} onClick={() => setIsSignUp(!isSignUp)}>
              {isSignUp ? "Sign in" : "Sign up"}
            </span>
          </Form>
        </BasicCard>
      )}
    </div>
  );
};
export default Index;
