import styles from "./Table.module.scss";

export const columns = [
  { short: "#" },
  {
    long: "Zawodnik",
    short: "Zawodnik",
    isLong: true,
    additionalClasses: [styles["White"]],
    additionalClassesCell: [styles["Td--wide"], styles["Td--left"]],
  },
  { long: "Mecze", short: "M" },
  { long: "Punkty", short: "Pkt" },
  { long: "Gole", short: "G" },
  { long: "Wygrane", short: "W" },
  { long: "Remisy", short: "R" },
  { long: "Przegrane", short: "P" },
  { long: "Gole strzelone", short: "G+" },
  { long: "Gole stracone", short: "G-" },
];
