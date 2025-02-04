import { isRefundRequestAccepted } from "@/utils/processInputData";
import { formattedTestData } from "./testData";

describe("isRefundRequestAccepted tests", () => {
  it("should correctly decide if the refund request is accepted", () => {
    const testItem = formattedTestData[5]; // 8hours for refund
    expect(
      isRefundRequestAccepted({
        ...testItem,
        refundRequestDate: "1/1/2021",
        refundRequestTime: "17:00",
      })
    ).toBe(true);
    expect(
      isRefundRequestAccepted({
        ...testItem,
        refundRequestDate: "1/1/2021",
        refundRequestTime: "19:00",
      })
    ).toBe(false);
  });
});
