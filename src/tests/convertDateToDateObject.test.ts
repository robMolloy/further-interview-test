import { convertDateToDateObject } from "@/utils/dateUtils";

// const timeZoneMap = {
//   CET: { amount: 1, direction: "+" },
//   PST: { amount: 8, direction: "-" },
//   EST: { amount: 5, direction: "-" },
//   GMT: { amount: 0, direction: "+" },
// };∏

describe("convertDateToDateObject tests", () => {
  it("should correctly convertDateToDateObject", () => {
    expect(
      convertDateToDateObject({
        formattedDateString: "2020-02-01",
        time: "00:00",
        timezone: "CET",
      })
    ).toEqual(new Date("2020-01-31T23:00:00.000Z"));

    expect(
      convertDateToDateObject({
        formattedDateString: "2020-02-01",
        time: "00:00",
        timezone: "PST",
      })
    ).toEqual(new Date("2020-02-01T08:00:00.000Z"));

    expect(
      convertDateToDateObject({
        formattedDateString: "2020-02-01",
        time: "00:00",
        timezone: "EST",
      })
    ).toEqual(new Date("2020-02-01T05:00:00.000Z"));

    expect(
      convertDateToDateObject({
        formattedDateString: "2020-02-01",
        time: "00:00",
        timezone: "GMT",
      })
    ).toEqual(new Date("2020-02-01T00:00:00.000Z"));
  });
});
