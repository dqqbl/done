import { Input, InputProps } from "antd";
import classnames from "classnames";
import styles from "./index.less";

interface DInputProps extends InputProps {}

const DInput = (props: DInputProps) => {
  const { className, ...rest } = props;
  return (
    <div className={classnames(styles.dInputWrap, className)}>
      <Input {...rest}></Input>
    </div>
  );
};
export default DInput;
