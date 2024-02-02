import Image from "next/image";
import style from "./Separator.module.scss";

const Separator = () => (
  <span className={style.Separator}>
    <Image width={12} height={12} src="/assets/icons/caret-right.svg" alt="" />
  </span>
);

export default Separator;
