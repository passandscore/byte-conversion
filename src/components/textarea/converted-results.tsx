import {
  Box,
  Flex,
  FormControl,
  FormHelperText,
  Textarea,
} from "@chakra-ui/react";
import ButtonMenu from "../menu/button-menu";
import { ResetButton } from "../buttons/reset";
import { CopyButton } from "../buttons/copy";

const ConvertedResults = ({
  returnType,
  result,
  isMobileWidth,
  inputValueError,
  textAreaRef,
  clearResults,
}: {
  returnType: string;
  result: string;
  isMobileWidth: boolean;
  inputValueError: boolean;
  textAreaRef: React.MutableRefObject<HTMLTextAreaElement | null>;
  clearResults: () => void;
}) => {
  return (
    <Box>
      <FormControl>
        <FormHelperText>{`Type: ${returnType}`}</FormHelperText>
        <Textarea
          ref={textAreaRef}
          mt={2}
          value={inputValueError ? "Invalid Bytes" : result}
          isReadOnly
          p={30}
        ></Textarea>
      </FormControl>
      <Flex justify="flex-end" mt={3}>
        {isMobileWidth ? (
          <ButtonMenu clearResults={clearResults} result={result} />
        ) : (
          <Flex>
            {result && (
              <Flex>
                <ResetButton clearResults={clearResults} />
                <CopyButton result={result} />
              </Flex>
            )}
          </Flex>
        )}
      </Flex>
    </Box>
  );
};

export default ConvertedResults;
