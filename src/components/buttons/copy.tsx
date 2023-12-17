import { Button, useToast } from "@chakra-ui/react";

export const CopyButton = ({ result }: { result: string }) => {
  const toast = useToast();

  const copied = () => {
    toast({
      title: "Copied",
      status: "success",
      isClosable: true,
      position: "top",
    });
  };

  return (
    <Button
      size="xs"
      onClick={() => {
        navigator.clipboard.writeText(result);
        copied();
      }}
      color={"green.400"}
      w="5rem"
      mr={2}
    >
      Copy
    </Button>
  );
};
