import { BaseComponentProps } from "@/types/components";

import styles from "./Container.module.scss";

const Container: React.FC<BaseComponentProps> = ({ children }) => (
  <div className={styles.Container}>{children}</div>
);

export default Container;
