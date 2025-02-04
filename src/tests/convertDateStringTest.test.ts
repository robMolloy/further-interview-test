import {
  convertEuropeanDateStringToFormattedDateString,
  convertUsDateStringToFormattedDateString,
} from "@/utils/dateUtils";

describe("convertDateStringTest tests", () => {
  it("should correctly reformat the date string", () => {
    expect(convertEuropeanDateStringToFormattedDateString("1/2/2020")).toEqual("2020-02-01");
    expect(convertUsDateStringToFormattedDateString("1/2/2020")).toEqual("2020-01-02");
  });
});
