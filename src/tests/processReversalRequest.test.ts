import { processReversalRequestData } from "@/utils/processInputData";
import { formattedTestData } from "./testData";

describe("processReversalRequest tests", () => {
  it("should correctly split reversalRequest0", () => {
    const reversalRequest = formattedTestData[0];
    const result = processReversalRequestData(reversalRequest);
    expect({
      ...result,
      signUpDate: result.signUpDate.toISOString(),
      investmentDate: result.investmentDate.toISOString(),
      refundRequestDate: result.refundRequestDate.toISOString(),
      deemedRefundRequestDate: result.deemedRefundRequestDate.toISOString(),
    }).toEqual({
      name: "Emma Smith",
      locationCountry: "US",
      locationTimezone: "PST",
      requestSource: "phone",
      signUpDate: "2020-01-02T00:00:00.000Z",
      investmentDate: "2021-01-02T14:00:00.000Z",
      refundRequestDate: "2021-01-02T17:00:00.000Z",
      deemedRefundRequestDate: "2021-01-04T09:00:00.000Z",
      tosType: "old",
    });
  });
  it("should correctly split reversalRequest1", () => {
    const reversalRequest = formattedTestData[1];
    const result = processReversalRequestData(reversalRequest);
    expect({
      ...result,
      signUpDate: result.signUpDate.toISOString(),
      investmentDate: result.investmentDate.toISOString(),
      refundRequestDate: result.refundRequestDate.toISOString(),
      deemedRefundRequestDate: result.deemedRefundRequestDate.toISOString(),
    }).toEqual({
      name: "Benjamin Johnson",
      locationCountry: "Europe",
      locationTimezone: "CET",
      requestSource: "web app",
      signUpDate: "2020-02-12T00:00:00.000Z",
      investmentDate: "2021-01-02T05:30:00.000Z",
      refundRequestDate: "2021-02-01T22:00:00.000Z",
      deemedRefundRequestDate: "2021-02-01T22:00:00.000Z",
      tosType: "new",
    });
  });
});
