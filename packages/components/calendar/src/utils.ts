import {DateValue, startOfYear} from "@heroui/internationalized-date";

export function getYearRange(start?: DateValue | null, end?: DateValue | null): DateValue[] {
  const years: DateValue[] = [];

  if (!start || !end) {
    return years;
  }

  let current = startOfYear(start);

  while (current.compare(end) <= 0) {
    years.push(current);
    // Move to the first day of the next year
    current = startOfYear(current.add({years: 1}));
  }

  return years;
}

export function addMonths(date: DateValue, months: number): DateValue {
  return date.add({months});
}

export function getMonthsInYear(year: DateValue) {
  const firstMonth = startOfYear(year);
  const months = [firstMonth];

  while (months.length < 12) {
    const prevMonth = months[months.length - 1];

    months.push(addMonths(prevMonth, 1));
  }

  return months;
}
