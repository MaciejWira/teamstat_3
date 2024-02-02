import { BaseComponentProps } from "@/types/components";
import style from "./HeadingWrapper.module.scss";

const HeadingWrapper: React.FC<BaseComponentProps> = ({ children }) => (
  <div className={style.Wrapper}>{children}</div>
);

export default HeadingWrapper;
