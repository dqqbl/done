import { forwardRef } from "react";
import { Input, InputProps } from "antd";
import classnames from "classnames";
import styles from "./index.less";

interface DInputProps extends InputProps {
  radius?: boolean;
  /** 带样式禁用 */
  readOnly?: boolean;
  /** 纯展示 */
  isDesc?: boolean;
}

const DInput = (props: DInputProps, ref: any) => {
  const { className, radius = false, readOnly = false, isDesc = false, ...rest } = props;

  return (
    <div className={classnames(styles.dInputWrap, { [styles.radius]: radius }, className)}>
      {/* <Input disabled={disabled || readOnly} {...rest}></Input> */}
      {isDesc ? <div style={{ padding: "4px" }}>{rest.defaultValue}</div> : <Input ref={ref} {...rest}></Input>}
    </div>
  );
};
export default forwardRef(DInput);
