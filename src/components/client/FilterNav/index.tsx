"use client";

import { useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { TextSpan } from "@/components/server/TextC";
import LinkC from "@/components/server/LinkC";
import { getMonths, getYears } from "@/services/getMonths";
import styles from "./FilterNav.module.scss";

type Props = {
  isCaptains?: boolean;
};

const FilterNav: React.FC<Props> = ({ isCaptains }) => {
  const { push } = useRouter();
  const { year, month } = useParams();

  const url = `${year || ""}${(month && `/${month}`) || ""}`;

  const changeHandler = useCallback(
    (target: string) => {
      if (target === "/" || !target) push("/");
      else {
        push(`/${isCaptains ? "table-captains" : "table"}/${target}`);
      }
    },
    [isCaptains, push]
  );

  return (
    <div className={styles.Container}>
      <select
        className={styles.Select}
        value={url}
        onChange={(e) => changeHandler(e.target.value)}
      >
        <option value="" disabled={!url}>
          Miesięczne
        </option>
        {getMonths().map((month) => (
          <option key={month} value={month}>
            {new Date(month).toLocaleString("pl-PL", {
              year: "numeric",
              month: "long",
            })}
          </option>
        ))}
      </select>
      <select
        className={styles.Select}
        value={url}
        onChange={(e) => changeHandler(e.target.value)}
      >
        <option value="" disabled={!month && !!year}>
          Roczne
        </option>
        {getYears().map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
      <LinkC className={styles.Link} href="/table">
        <TextSpan theme={["large", "bold"]}>CAŁA TABELA</TextSpan>
      </LinkC>
      <LinkC className={styles.Link} href="/table-captains">
        <TextSpan theme={["large", "bold"]}>KAPITANOWIE</TextSpan>
      </LinkC>
    </div>
  );
};

export default FilterNav;
