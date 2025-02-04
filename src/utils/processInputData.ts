import {
  convertDateToDateObject,
  convertEuropeanDateStringToFormattedDateString,
  convertUsDateStringToFormattedDateString,
} from "./dateUtils";
import { TReversalRequest } from "./schemas";

export const incrementToGmtBusinessHours = (initDt: Date): Date => {
  const dt = new Date(initDt);

  if (dt.getHours() >= 19) {
    dt.setDate(dt.getDate() + 1);
    dt.setHours(9, 0, 0, 0);
  }

  if (dt.getHours() < 9) dt.setHours(9, 0, 0, 0);

  if (dt.getDay() === 6 || dt.getDay() === 0) {
    const dayIncrement = dt.getDay() === 6 ? 2 : 1;
    dt.setDate(dt.getDate() + dayIncrement);
    dt.setHours(9, 0, 0, 0);
  }

  return dt;
};

export const processReversalRequestData = (p: TReversalRequest) => {
  const splitLocation = p.location.split(" ");
  const locationCountry = splitLocation[0] as "US" | "Europe";
  const locationTimezone = splitLocation[1].slice(1, -1) as "PST" | "CET" | "GMT" | "EST";

  const dateStringConversionFn =
    locationCountry === "US"
      ? convertUsDateStringToFormattedDateString
      : convertEuropeanDateStringToFormattedDateString;

  const signUpDate = convertDateToDateObject({
    formattedDateString: dateStringConversionFn(p.signUpDate),
    time: "00:00",
    timezone: "GMT", // should always be GMT as no corresponding time
  });
  const refundRequestDate = convertDateToDateObject({
    formattedDateString: dateStringConversionFn(p.refundRequestDate),
    time: p.refundRequestTime,
    timezone: locationTimezone,
  });

  return {
    name: p.name,
    locationCountry,
    locationTimezone,
    signUpDate,
    requestSource: p.requestSource as "phone" | "web app",
    investmentDate: convertDateToDateObject({
      formattedDateString: dateStringConversionFn(p.investmentDate),
      time: p.investmentTime,
      timezone: locationTimezone,
    }),
    refundRequestDate,
    deemedRefundRequestDate:
      p.requestSource === "phone"
        ? incrementToGmtBusinessHours(refundRequestDate)
        : refundRequestDate,
    tosType: signUpDate >= new Date("2020-01-03") ? ("new" as const) : ("old" as const),
  };
};

export const getLatestReversalRequestDate = (p: {
  requestSource: "phone" | "web app";
  tosType: "old" | "new";
  investmentDate: Date;
}) => {
  const dt = new Date(p.investmentDate);

  if (p.requestSource === "phone" && p.tosType === "old") dt.setHours(dt.getHours() + 4);
  if (p.requestSource === "phone" && p.tosType === "new") dt.setHours(dt.getHours() + 24);
  if (p.requestSource === "web app" && p.tosType === "old") dt.setHours(dt.getHours() + 8);
  if (p.requestSource === "web app" && p.tosType === "new") dt.setHours(dt.getHours() + 16);

  return dt;
};

export const isRefundRequestAccepted = (p: TReversalRequest) => {
  const processedReversalRequestData = processReversalRequestData(p);

  const latestReversalRequestDate = getLatestReversalRequestDate(processedReversalRequestData);

  return processedReversalRequestData.deemedRefundRequestDate < latestReversalRequestDate;
};
