import { Button } from "@chakra-ui/react";

export const SourceButton = ({ source }: { source: string }) => {
  return (
    <Button size="xs" w="5rem" onClick={() => window.open(source, "_blank")}>
      Source
    </Button>
  );
};
