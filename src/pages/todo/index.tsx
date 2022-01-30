import { Button } from "antd";
import { getUserDetail } from "@/api/user";

const Todo = () => {
  return (
    <div>
      todopage
      <Button onClick={() => getUserDetail()}>ttt</Button>
    </div>
  );
};
export default Todo;
