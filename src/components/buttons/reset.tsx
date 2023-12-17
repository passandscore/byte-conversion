import { Button } from "@chakra-ui/react";
import { ByteConversionMethods } from "src/types";

export const ResetButton = ({
  setInputValue,
  setInputResult,
  setSelectedTool,
  selectRef,
  textAreaRef,
}: {
  setInputValue: (value: string) => void;
  setInputResult: (value: string) => void;
  setSelectedTool: (value: ByteConversionMethods) => void;
  selectRef: React.MutableRefObject<HTMLSelectElement | null>;
  textAreaRef: React.MutableRefObject<HTMLTextAreaElement | null>;
}) => {
  return (
    <Button
      size="xs"
      onClick={() => {
        setInputValue("");
        setInputResult("");
        setSelectedTool(ByteConversionMethods.NONE);
        selectRef.current!.value = ByteConversionMethods.EMPTY_STRING;
        textAreaRef.current!.value = "";
      }}
      color={"red.400"}
      w="5rem"
      mr={2}
    >
      Reset
    </Button>
  );
};
