import { createElement } from "react";
import { BaseComponentProps } from "@/types/components";
import style from "./Heading.module.scss";
import classNames from "@/services/classNames";

type Props = BaseComponentProps & {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
};

const Heading: React.FC<Props> = ({ children, as = "h1" }) =>
  createElement(
    as,
    { className: classNames(style.Heading, style[`Heading--${as}`]) },
    children
  );

export default Heading;
