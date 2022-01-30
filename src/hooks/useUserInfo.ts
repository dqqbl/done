import { getUserDetail } from "@/api/user";
import { useSelector, useDispatch } from "./redux";
import { updateUser, UserInfo } from "@/reducer/user";

interface useUserInfoReturn {
  /** 用户信息 */
  userInfo: UserInfo;
  /** 更新用户信息 */
  updateUserInfo: () => void;
}

const useUserInfo: () => useUserInfoReturn = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const updateUserInfo = async () => {
    const { data: userInfo } = await getUserDetail();
    dispatch(updateUser(userInfo));
  };

  return {
    userInfo: user,
    updateUserInfo,
  };
};

export default useUserInfo;
