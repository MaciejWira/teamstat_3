const startYear = 2023;
const startMonth = 11;

export const getMonths = () => {
  const date = new Date(`${startYear}-${startMonth}`);
  const months: string[] = [];
  while (date < new Date()) {
    months.push(`${date.getFullYear()}/${date.getMonth() + 1}`);

    date.setMonth(date.getMonth() + 1);
  }
  return months.reverse();
};

export const getMonthsObj = (noCurrent = false) => {
  const date = new Date(`${startYear}-${startMonth}`);
  const monthsObj: { year: number; month: number }[] = [];
  while (date < new Date()) {
    monthsObj.push({
      year: date.getFullYear(),
      month: date.getMonth() + 1,
    });
    date.setMonth(date.getMonth() + 1);
  }
  return noCurrent ? monthsObj.reverse().slice(1) : monthsObj.reverse();
};

export const getYears = () => {
  let year = startYear;
  const years = [];
  while (year <= new Date().getFullYear()) {
    years.push(`${year}`);
    year++;
  }
  return years.reverse();
};
