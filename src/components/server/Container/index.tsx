import { BaseComponentProps } from "@/types/components";

import styles from "./Container.module.scss";
import classNames from "@/services/classNames";

const Container: React.FC<BaseComponentProps> = ({ children, className }) => (
  <div className={classNames(styles.Container, className)}>{children}</div>
);

export default Container;
