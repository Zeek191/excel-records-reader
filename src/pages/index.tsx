import Button from "@/components/button/button";
import { HEADER_ROW } from "@/consts/result-headers";
import { useEffect, useRef } from "react";
import readXlsxFile, { Row } from "read-excel-file";
import writeXlsxFile from "write-excel-file";

export default function Main() {
  const inputRef = useRef<HTMLInputElement>(null);

  function clickInput() {
    inputRef.current?.click();
  }

  function cumulateNumbers(input: Row[]) {
    return input.reduce((prevState, currentState) => {
      if (typeof currentState?.[0] !== "number") return prevState;

      if (String(currentState?.[0]).length < 4) return prevState;

      if (prevState?.[currentState?.[0]])
        return {
          ...(prevState || {}),
          [currentState?.[0]]: prevState?.[currentState?.[0]] + 1,
        };

      return { ...(prevState || {}), [currentState?.[0]]: 1 };
    }, {} as Record<string, number>);
  }

  function transformResultShape(result: RecordsCount) {
    return Object.keys(result).map((record) => [
      {
        type: String,
        value: String(record),
      },
      {
        type: String,
        value: String(result[record]),
      },
    ]);
  }

  function generateFile(file?: File) {
    if (!file) return null;

    readXlsxFile(file)
      .then(cumulateNumbers)
      .then((response) => {
        //@ts-ignore
        writeXlsxFile([HEADER_ROW, ...transformResultShape(response)], {
          fileName: "result.xlsx",
        });
      });
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.addEventListener("change", () => {
        const file = inputRef.current?.files?.[0];
        return generateFile(file);
      });
    }
  }, [inputRef.current]);

  return (
    <div className="flex justify-center items-center flex-col h-screen">
      <input type="file" ref={inputRef} className="hidden" />

      <Button onClick={clickInput}>Load file...</Button>
    </div>
  );
}
