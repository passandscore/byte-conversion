import type { NextPage } from "next";
import React, { useState } from "react";
import { BytesLike, ethers } from "ethers";
import Converter from "src/components/converter/basic-conversion";
import { ConversionTools, ByteConversionMethods } from "src/types";

const ByteConverter: NextPage = () => {
  const [inputValue, setInputValue] = useState(
    ByteConversionMethods.EMPTY_STRING
  );
  const [inputResult, setInputResult] = useState("" as any);
  const [selectedTool, setSelectedTool] = useState(ByteConversionMethods.NONE);
  const [inputValueError, setInputValueError] = useState(false);

  const bytesToUtf8 = (input: string) => {
    const bytesLike = ethers.getBytes(input);
    return ethers.toUtf8String(bytesLike);
  };

  const bytesToBase64 = (input: string) => {
    const bytesLike = ethers.getBytes(input);
    return Buffer.from(bytesLike).toString("base64");
  };

  const bytesToBinary = (input: string) => {
    try {
      let binaryString = "";

      // Start from the third character to skip the "0x" prefix
      for (let i = 2; i < input.length; i++) {
        const hexDigit = input[i];
        const binaryDigit = parseInt(hexDigit, 16).toString(2).padStart(4, "0");
        binaryString += binaryDigit;
      }

      return binaryString;
    } catch (e) {
      setInputValueError(true);
      console.log(`Error converting ${input} to binary`);
    }
    return "";
  };

  const isValidBytesLike = (input: string) => {
    const isBytesLike = ethers.isBytesLike(input);
    if (!isBytesLike) {
      setInputValueError(true);
      return false;
    }
    setInputValueError(false);
    return true;
  };

  const onChange = (
    input: ByteConversionMethods,
    methodName: ByteConversionMethods
  ) => {
    setSelectedTool(methodName);

    if (
      input === ByteConversionMethods.EMPTY_STRING ||
      methodName === ByteConversionMethods.EMPTY_STRING ||
      methodName === ByteConversionMethods.NONE
    )
      return;

    setInputValue(input);
    setInputResult(input);

    const validInput = isValidBytesLike(input);
    if (!validInput) return;

    if (methodName === ByteConversionMethods.BINARY) {
      //@ts-ignore
      if (input === "0x") {
        setInputValueError(true);
        console.log(`Error converting ${input} to binary`);
        return;
      }

      const convertedResult = bytesToBinary(input);
      setInputResult(convertedResult);
      return;
    }

    if (methodName === ByteConversionMethods.BASE64) {
      //@ts-ignore

      if (input === "0x") {
        setInputValueError(true);
        console.log(`Error converting ${input} to binary`);
        return;
      }

      const convertedResult = bytesToBase64(input);
      setInputResult(convertedResult);
      return;
    }

    if (methodName === ByteConversionMethods.UTF8) {
      //@ts-ignore

      if (input === "0x") {
        setInputValueError(true);
        console.log(`Error converting ${input} to binary`);
        return;
      }

      const convertedResult = bytesToUtf8(input);
      setInputResult(convertedResult);
      return;
    }

    try {
      const convertedResult = ethers[methodName](input);
      setInputResult(convertedResult);
    } catch (e) {
      setInputValueError(true);
      console.log(`Error converting ${input} to ${methodName}`);
    }
  };

  const tools = [
    {
      title: "Data Length",
      methodName: ByteConversionMethods.DATA_LENGTH,
      returnType: "Number",
    },
    {
      title: "Hexadecimal",
      methodName: ByteConversionMethods.HEXLIFY,
      returnType: "String",
    },
    {
      title: "Binary",
      methodName: ByteConversionMethods.BINARY,
      returnType: "String",
    },
    {
      title: "Base64",
      methodName: ByteConversionMethods.BASE64,
      returnType: "String",
    },
    {
      title: "UTF-8",
      methodName: ByteConversionMethods.UTF8,
      returnType: "String",
    },
  ] as ConversionTools[];

  return (
    <Converter
      tools={tools}
      value={inputValue}
      result={inputResult}
      selectedTool={selectedTool}
      inputValueError={inputValueError}
      setInputValue={setInputValue}
      setInputResult={setInputResult}
      setSelectedTool={setSelectedTool}
      onChange={onChange}
    />
  );
};

export default ByteConverter;
