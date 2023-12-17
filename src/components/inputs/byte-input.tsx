import { Input } from "@chakra-ui/react";
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
  const placeholder = () => {
    if (selectedTool === ByteConversionMethods.BINARY) {
      return "Enter a hex string, e.g. 0x1234";
    }

    return "Enter a value";
  };
  return (
    <Input
      type="text"
      value={value}
      placeholder={placeholder()}
      onChange={(e) => {
        const inputValue = e.target.value as ByteConversionMethods;
        setInputValue(inputValue);
        onChange(inputValue, selectedTool);
      }}
    />
  );
};

export default ByteInput;
