import { BaseComponentProps } from "@/types/components";
import style from "./Heading.module.scss";

const Heading: React.FC<BaseComponentProps> = ({ children }) => (
  <h1 className={style.Heading}>{children}</h1>
);

export default Heading;
