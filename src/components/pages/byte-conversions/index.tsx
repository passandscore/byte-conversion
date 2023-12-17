import type { NextPage } from "next";
import React, { useState } from "react";
import { BytesLike, ethers } from "ethers";
import Converter from "src/components/converter/basic-conversion";
import { ConversionTools, ByteConversionMethods } from "src/types";
import { useToast } from "@chakra-ui/react";
import { bytesToByteArray } from "src/utils/bytesToByteArray";
import { bytesToDecimal } from "src/utils/bytesToDecimal";
import { bytesToUtf8 } from "src/utils/bytesToUtf8";
import { bytesToBase64 } from "src/utils/bytesToBase64";
import { bytesToBinary } from "src/utils/bytesToBinary";
import { isValidBytesLike } from "src/utils/isValidBytesLike";

const ByteConverter: NextPage = () => {
  const [inputValue, setInputValue] = useState(
    ByteConversionMethods.EMPTY_STRING
  );
  const [inputResult, setInputResult] = useState("" as any);
  const [selectedTool, setSelectedTool] = useState(ByteConversionMethods.NONE);
  const [inputValueError, setInputValueError] = useState(false);
  const [prefixError, setPrefixError] = useState(false);

  const toast = useToast();

  const inputValidityCheck = (
    input: ByteConversionMethods,
    methodName: ByteConversionMethods
  ) => {
    if (
      input === ByteConversionMethods.EMPTY_STRING ||
      methodName === ByteConversionMethods.EMPTY_STRING ||
      methodName === ByteConversionMethods.NONE
    ) {
      return false;
    }

    return true;
  };

  const prefixValidityCheck = (input: ByteConversionMethods) => {
    if (!input.startsWith("0x") && input.length === 2 && !prefixError) {
      setPrefixError(true);

      toast({
        title: "Invalid input",
        description: "Input must start with 0x",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
    } else {
      setPrefixError(false);
    }
  };

  const bytesLikeInputValidityCheck = (input: ByteConversionMethods) => {
    const validInput = isValidBytesLike(input);
    validInput ? setInputValueError(false) : setInputValueError(true);
    if (!validInput) {
      return false;
    }
    return true;
  };

  const methodSelector = (
    methodName: ByteConversionMethods,
    input: ByteConversionMethods
  ) => {
    if (methodName === ByteConversionMethods.BINARY) {
      const convertedResult = bytesToBinary(input);
      setInputResult(convertedResult);
      return;
    }

    if (methodName === ByteConversionMethods.BASE64) {
      const convertedResult = bytesToBase64(input);
      setInputResult(convertedResult);
      return;
    }

    if (methodName === ByteConversionMethods.UTF8) {
      const convertedResult = bytesToUtf8(input);
      setInputResult(convertedResult);
      return;
    }

    if (methodName === ByteConversionMethods.DECIMAL) {
      //@ts-ignore

      if (input === "0x") {
        setInputValueError(true);
        console.log(`Error converting ${input} to decimal`);
        return;
      }

      const convertedResult = bytesToDecimal(input);
      setInputResult(convertedResult);
      return;
    }

    if (methodName === ByteConversionMethods.ARRAY) {
      const convertedResult = bytesToByteArray(input);
      const formatted = `[ ${convertedResult.toString().replace(/,/g, ", ")} ]`;
      setInputResult(formatted);
      return;
    }

    if (methodName === ByteConversionMethods.DATA_LENGTH) {
      const convertedResult = ethers.dataLength(input);
      setInputResult(convertedResult);
      return;
    }
  };

  const onChange = (
    input: ByteConversionMethods,
    methodName: ByteConversionMethods
  ) => {
    setSelectedTool(methodName);

    const validInput = inputValidityCheck(input, methodName);
    if (!validInput) return;

    console.log(`Input: ${input}`);

    setInputValue(input);
    setInputResult(input);

    prefixValidityCheck(input);

    const isBytesLike = bytesLikeInputValidityCheck(input);
    if (!isBytesLike) return;

    methodSelector(methodName, input);
  };

  const tools = [
    {
      title: "Data Length",
      methodName: ByteConversionMethods.DATA_LENGTH,
      returnType: "Number",
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
    {
      title: "Decimal",
      methodName: ByteConversionMethods.DECIMAL,
      returnType: "String",
    },
    {
      title: "Bytes Array",
      methodName: ByteConversionMethods.ARRAY,
      returnType: "Number Array",
    },
  ] as ConversionTools[];

  return (
    <Converter
      tools={tools}
      value={inputValue}
      result={inputResult}
      selectedTool={selectedTool}
      prefixError={prefixError}
      inputValueError={inputValueError}
      setInputValue={setInputValue}
      setInputResult={setInputResult}
      setSelectedTool={setSelectedTool}
      onChange={onChange}
    />
  );
};

export default ByteConverter;
