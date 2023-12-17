import { FormControl, FormHelperText } from "@chakra-ui/react";
import { ByteConversionMethods } from "src/types";

const InputHelperText = ({ selectedTool }: { selectedTool: string }) => {
  const note = () => {
    if (selectedTool === ByteConversionMethods.UTF8) {
      return (
        <>
          Note: See the{" "}
          <a
            href="https://theasciicode.com.ar/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#4299E1" }}
          >
            ASCII{" "}
          </a>
          table for UTF-8 printable characters
        </>
      );
    }
    return "";
  };

  return (
    <FormControl mb={10}>
      <FormHelperText>{note()}</FormHelperText>
    </FormControl>
  );
};

export default InputHelperText;
