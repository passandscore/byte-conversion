import { Flex, Container } from "@chakra-ui/react";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useWindowSize } from "usehooks-ts";

import { ConversionTools, ByteConversionMethods } from "src/types";
import ByteInput from "src/components/inputs/byte-input";
import ConversionSelector from "src/components/inputs/conversion-selector";
import ConvertedResults from "src/components/textarea/converted-results";

const Converter = ({
  tools,
  value,
  result,
  selectedTool,
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

  return (
    <Fragment>
      <Container maxW="container.xl" mt={10}>
        <Flex my={10} gap={5} direction={isMobileWidth ? "column" : "row"}>
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

        {/* Result Textarea */}
        {selectedTool != ByteConversionMethods.NONE &&
          value != ByteConversionMethods.EMPTY_STRING && (
            <ConvertedResults
              returnType={returnType}
              result={result}
              isMobileWidth={isMobileWidth}
              inputValueError={inputValueError}
              selectRef={selectRef}
              textAreaRef={textAreaRef}
              setInputValue={setInputValue}
              setInputResult={setInputResult}
              setSelectedTool={setSelectedTool}
            />
          )}
      </Container>
    </Fragment>
  );
};

export default Converter;
