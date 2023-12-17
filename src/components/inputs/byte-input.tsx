import { Flex, FormControl, FormHelperText, Input } from "@chakra-ui/react";
import { ByteConversionMethods } from "src/types";

const ByteInput = ({
  value,
  selectedTool,
  setInputValue,
  onChange,
}: {
  value: ByteConversionMethods;
  selectedTool: ByteConversionMethods;
  setInputValue: (value: ByteConversionMethods) => void;
  onChange: (value: ByteConversionMethods, methodName: string) => void;
}) => {
  return (
    <Input
      type="text"
      value={value}
      placeholder="0x....."
      onChange={(e) => {
        const inputValue = e.target.value as ByteConversionMethods;
        setInputValue(inputValue);
        onChange(inputValue, selectedTool);
      }}
    />
  );
};

export default ByteInput;
