import { ComponentProps } from "react";
import Link from "next/link";
import { TextSpan } from "@/components/server/TextC";

import style from "./LinkC.module.scss";
import classNames from "@/services/classNames";

type Props = ComponentProps<typeof Link> & {
  theme?: string[];
  classNameText?: string;
};

const LinkC: React.FC<Props> = (props) => {
  const linkProps = { ...props };
  delete linkProps.classNameText;
  delete linkProps.className;
  delete linkProps.theme;

  return (
    <Link {...linkProps} className={classNames(style.Link, props.className)}>
      <TextSpan className={props.classNameText} theme={props.theme}>
        {props.children}
      </TextSpan>
    </Link>
  );
};

export default LinkC;
