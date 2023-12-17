import { Select } from "@chakra-ui/react";
import { ConversionTools, ByteConversionMethods } from "src/types";

const ConversionSelector = ({
  selectRef,
  value,
  isMobileWidth,
  tools,
  onChange,
  setReturnType,
}: {
  selectRef: React.MutableRefObject<HTMLSelectElement | null>;
  value: string;
  isMobileWidth: boolean;
  tools: ConversionTools[];
  onChange: (value: string, methodName: string) => void;
  setReturnType: (value: string) => void;
}) => {
  return (
    <Select
      ref={selectRef}
      // isDisabled={!value}
      placeholder="Select option"
      w={isMobileWidth ? "100%" : "20rem"}
      onChange={(e) => {
        const [methodName, returnType] = e.target.value.split(",");

        onChange(value, methodName);

        if (methodName != ByteConversionMethods.EMPTY_STRING) {
          setReturnType(returnType);
        }

        if (selectRef.current) {
          selectRef.current.blur();
        }
      }}
    >
      {tools.map(({ title, methodName, returnType }, i) => (
        <option key={`${title}-${i}`} value={`${methodName},${returnType}`}>
          {title}
        </option>
      ))}
    </Select>
  );
};

export default ConversionSelector;
