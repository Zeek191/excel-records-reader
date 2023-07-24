import Button from "@/components/button";
import Input from "@/components/input";
import Wrapper from "@/components/wrapper";
import { HEADER_ROW } from "@/consts/result-headers";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import readXlsxFile, { Row } from "read-excel-file";
import writeXlsxFile from "write-excel-file";

export default function SumRecordsPage() {
  const [file, setFile] = useState<File>();
  const [outputFileName, setOutputFileName] = useState<string>("result");
  const inputRef = useRef<HTMLInputElement>(null);

  function changeOutputFileNameHandler(e: ChangeEvent<HTMLInputElement>) {
    setOutputFileName(e.target?.value);
  }

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

  function generateFile() {
    if (!file) return null;

    readXlsxFile(file)
      .then(cumulateNumbers)
      .then((response) => {
        //@ts-ignore - TO IMPROVE
        writeXlsxFile([HEADER_ROW, ...transformResultShape(response)], {
          fileName: outputFileName,
        });
      });
  }

  useEffect(() => {
    function changeHandler() {
      setFile(inputRef.current?.files?.[inputRef.current?.files.length - 1]);
    }

    if (inputRef.current) {
      inputRef.current.addEventListener("change", changeHandler);
    }

    return () => inputRef.current?.removeEventListener("change", changeHandler);
  }, [inputRef.current?.files?.length, outputFileName]);

  return (
    <Wrapper fullWidth fullHeight centerContent>
      <Wrapper fullWidth withBorder>
        <div className="w-full flex flex-col justify-center max-w-lg">
          <input ref={inputRef} type="file" className="hidden" />

          <Input
            required
            type="text"
            label="Output file name"
            value={outputFileName}
            onChange={changeOutputFileNameHandler}
            error={outputFileName.length === 0}
          />

          <Input
            type="text"
            label="Loaded file name"
            disabled
            value={file?.name}
          />

          <div className="grid gap-x-2 grid-cols-2">
            <Button onClick={clickInput}>Load file</Button>
            <Button onClick={generateFile} disabled={!file?.name}>
              Export file
            </Button>
          </div>
        </div>
      </Wrapper>
    </Wrapper>
  );
}
