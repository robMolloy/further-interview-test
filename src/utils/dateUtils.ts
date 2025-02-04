const timeZoneMap = {
  CET: { amount: 1, direction: "+" },
  PST: { amount: 8, direction: "-" },
  EST: { amount: 5, direction: "-" },
  GMT: { amount: 0, direction: "+" },
};

export const convertUsDateStringToFormattedDateString = (dateString: string) => {
  const splitDate = dateString.split("/").map((x) => x.padStart(2, "0"));

  return `${splitDate[2]}-${splitDate[0]}-${splitDate[1]}`;
};
export const convertEuropeanDateStringToFormattedDateString = (dateString: string) => {
  const splitDate = dateString.split("/").map((x) => x.padStart(2, "0"));

  return `${splitDate[2]}-${splitDate[1]}-${splitDate[0]}`;
};

export const convertDateToDateObject = (p: {
  formattedDateString: string;
  time: string;
  timezone: keyof typeof timeZoneMap;
}) => {
  const timeString = p.time;
  const timezoneOffset = timeZoneMap[p.timezone];
  const timezoneOffsetString = `${timezoneOffset.direction}${timezoneOffset.amount
    .toString()
    .padStart(2, "0")}:00`;

  return new Date(`${p.formattedDateString}T${timeString}${timezoneOffsetString}`);
};
