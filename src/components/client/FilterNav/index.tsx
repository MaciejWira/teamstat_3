"use client";

import styles from "./FilterNav.module.scss";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useCallback } from "react";

const startYear = 2023;
const startMonth = 11;

const FilterNav = () => {
  const { push } = useRouter();
  const { year, month } = useParams();

  const url = `${year || ""}${(month && `/${month}`) || ""}`;

  const getMonths = useCallback(() => {
    const date = new Date(`${startYear}-${startMonth}`);
    const months = [];
    while (date < new Date()) {
      months.push(`${date.getFullYear()}/${date.getMonth() + 1}`);
      date.setMonth(date.getMonth() + 1);
    }
    return months.reverse();
  }, []);

  const getYears = useCallback(() => {
    let year = startYear;
    const years = [];
    while (year <= new Date().getFullYear()) {
      years.push(`${year}`);
      year++;
    }
    return years.reverse();
  }, []);

  const changeHandler = useCallback((target: string) => {
    if (target === "/" || !target) push("/");
    else {
      push(`/table/${target}`);
    }
  }, []);

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
            {new Date(month).toLocaleString("default", {
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
      <Link className={styles.Link} href="/table">
        Cała tabela
      </Link>
    </div>
  );
};

export default FilterNav;
