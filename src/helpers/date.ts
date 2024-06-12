export const getDate = (daysFromToday: number) => {
  const date = new Date();
  date.setDate(date.getDate() + daysFromToday);
  return date;
};

export const displayReadableDate = (date: Date) => {
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const displayReadableShortDate = (date: Date) => {
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });
};

export const dayDifference = (date1: Date, date2 = new Date()) => {
  const difference = date2.getTime() - date1.getTime();
  return Math.round(difference / (1000 * 3600 * 24));
};
