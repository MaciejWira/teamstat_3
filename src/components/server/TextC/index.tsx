import { createElement } from "react";
import { BaseComponentProps } from "@/types/components";
import style from "./TextC.module.scss";
import classNames from "@/services/classNames";

type Props = BaseComponentProps & {
  theme?: string[];
  el?: "span" | "p";
};

const TextC: React.FC<Props> = ({ children, className, theme, el = "p" }) =>
  createElement(
    el,
    {
      className: classNames(
        style.TextC,
        ...(theme || []).map((t) => style[`TextC--${t}`]),
        className
      ),
    },
    children
  );

export default TextC;

export const TextSpan: React.FC<Props> = (props) => (
  <TextC {...props} el="span" />
);
