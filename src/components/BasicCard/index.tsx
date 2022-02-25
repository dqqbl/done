import classnames from "classnames";
import styles from "./index.less";

interface BasicCardProps {
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  size?: string;
  radiusSize?: string;
  style?: Record<string, string>;
}

const BasicCard = (props: BasicCardProps) => {
  const { children, size = "md", radiusSize = "md", className, ...rest } = props;
  const basicCardSizeClass: Record<string, string> = {
    lg: styles.basicCardLg,
    md: styles.basicCardMd,
    sm: styles.basicCardSm,
  };
  const basicCardRadiusClass: Record<string, string> = {
    lg: styles.basicCardRadiusLg,
    md: styles.basicCardRadiusMd,
    sm: styles.basicCardRadiusSm,
  };
  return (
    <div
      className={classnames(
        styles.basicCardWrap,
        className,
        basicCardSizeClass[size],
        basicCardRadiusClass[radiusSize]
      )}
      {...rest}
    >
      {children}
    </div>
  );
};
export default BasicCard;
