import { formattedTestData } from "@/tests/testData";
import { isRefundRequestAccepted } from "@/utils/processInputData";
import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState(formattedTestData[0]);

  return (
    <main className="p-4">
      <div className="border border-1 p-4">
        {(() => {
          const isSuccess = isRefundRequestAccepted(formData);

          return (
            <span className={`text-3xl ${isSuccess ? "bg-green-900" : "bg-red-900"}`}>
              {isSuccess ? "SUCCESS" : "FAIL"}
            </span>
          );
        })()}
        <pre>{JSON.stringify(formData, undefined, 2)}</pre>
      </div>
      <br />
      <div>Select test data below</div>
      <div className="max-h-96 overflow-y-scroll border border-1 p-4">
        <div className="grid grid-cols-3 gap-4">
          {formattedTestData.map((x, j) => (
            <pre
              key={j}
              className="cursor-pointer border border-1 hover:bg-slate-400 hover:text-black"
              onClick={() => setFormData(x)}
            >
              {JSON.stringify(x, undefined, 2)}
            </pre>
          ))}
        </div>
      </div>
    </main>
  );
}
