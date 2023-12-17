import { Flex, Container } from "@chakra-ui/react";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useWindowSize } from "usehooks-ts";

import { ConversionTools, ByteConversionMethods } from "src/types";
import ByteInput from "src/components/inputs/byte-input";
import ConversionSelector from "src/components/inputs/conversion-selector";
import ConvertedResults from "src/components/textarea/converted-results";
import InputHelperText from "../helper-text/input/Text";

const Converter = ({
  tools,
  value,
  result,
  selectedTool,
  prefixError,
  inputValueError,
  setInputValue,
  setInputResult,
  setSelectedTool,
  onChange,
}: {
  value: ByteConversionMethods;
  result: string;
  tools: ConversionTools[];
  selectedTool: ByteConversionMethods;
  prefixError: boolean;
  inputValueError: boolean;
  setInputValue: (value: ByteConversionMethods) => void;
  setInputResult: (value: string) => void;
  setSelectedTool: (value: ByteConversionMethods) => void;
  onChange: (value: ByteConversionMethods, methodName: string) => void;
}) => {
  // HOOKS
  const { width } = useWindowSize();
  const selectRef = useRef<HTMLSelectElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    const textArea = textAreaRef.current;
    const isValid =
      value && selectedTool != ByteConversionMethods.NONE && result;

    if (isValid && textArea) {
      textArea.style.height = "0px";

      const scrollHeight = textArea.scrollHeight;
      textArea.style.height = scrollHeight + "px";
    }
  }, [textAreaRef.current, result, width, value, selectedTool]);

  // STATE
  const [returnType, setReturnType] = useState("");

  // CONSTANTS
  const isMobileWidth = width < 450;

  // FUNCTIONS
  const clearResults = () => {
    setInputValue(ByteConversionMethods.EMPTY_STRING);
    setInputResult("");
    setSelectedTool(ByteConversionMethods.NONE);
    selectRef.current!.value = ByteConversionMethods.EMPTY_STRING;
    textAreaRef.current!.value = "";
  };

  const showResults = () => {
    return (
      selectedTool != ByteConversionMethods.NONE &&
      value != ByteConversionMethods.EMPTY_STRING &&
      !prefixError &&
      value.length > 2
    );
  };

  return (
    <Fragment>
      <Container maxW="container.xl" mt={10}>
        <Flex mt={10} gap={5} direction={isMobileWidth ? "column" : "row"}>
          <ByteInput
            value={value}
            selectedTool={selectedTool}
            setInputValue={setInputValue}
            onChange={onChange}
          />

          {/* Conversion Tool Selection */}
          <ConversionSelector
            selectRef={selectRef}
            value={value}
            isMobileWidth={isMobileWidth}
            tools={tools}
            onChange={onChange}
            setReturnType={setReturnType}
          />
        </Flex>

        {/* Optional Note */}
        <InputHelperText selectedTool={selectedTool} />

        {/* Result Textarea */}
        {showResults() && (
          <ConvertedResults
            returnType={returnType}
            result={result}
            isMobileWidth={isMobileWidth}
            inputValueError={inputValueError}
            textAreaRef={textAreaRef}
            clearResults={clearResults}
          />
        )}
      </Container>
    </Fragment>
  );
};

export default Converter;
