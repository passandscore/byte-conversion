import { Button } from "@chakra-ui/react";

export const ResetButton = ({ clearResults }: { clearResults: () => void }) => {
  return (
    <Button size="xs" onClick={clearResults} color={"red.400"} w="5rem" mr={2}>
      Reset
    </Button>
  );
};
