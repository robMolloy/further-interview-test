import { incrementToGmtBusinessHours } from "@/utils/processInputData";

describe("incrementToGmtBusinessHours tests", () => {
  it("should correctly implement", () => {
    const result = incrementToGmtBusinessHours(new Date("2021-01-02T17:00:00.000Z"));
    expect(result.toISOString()).toBe("2021-01-04T09:00:00.000Z");
  });
});
