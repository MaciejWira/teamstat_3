import { SortProps } from "@/services/getTable";
import styles from "./Table.module.scss";

export const columns: {
  short: string;
  long?: string;
  isLong?: boolean;
  theme?: string[];
  additionalClassesCell?: string[];
  sortProp?: SortProps;
}[] = [
  { short: "#" },
  {
    long: "Zawodnik",
    short: "Zawodnik",
    isLong: true,
    theme: ["white"],
    additionalClassesCell: [styles["Td--wide"], styles["Td--left"]],
  },
  { long: "Mecze", short: "M", sortProp: "games" },
  { long: "Punkty", short: "Pkt", sortProp: "points" },
  { long: "Punkty na mecz", short: "Pkt/M", sortProp: "pointsPerGame" },
  { long: "Gole", short: "G", sortProp: "goalsDifference" },
  { long: "Wygrane", short: "W", sortProp: "wins" },
  { long: "Remisy", short: "R" },
  { long: "Przegrane", short: "P", sortProp: "losses" },
  { long: "Gole strzelone", short: "G+", sortProp: "goalsFor" },
  { long: "Gole stracone", short: "G-", sortProp: "goalsAgainst" },
];
