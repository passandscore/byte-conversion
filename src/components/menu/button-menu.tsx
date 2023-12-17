import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useToast,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

const ButtonMenu = ({
  clearResults,
  result,
}: {
  clearResults: () => void;
  result: string;
}) => {
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
    <Menu>
      <MenuButton as={Button} size="xs" rightIcon={<ChevronDownIcon />}>
        Actions
      </MenuButton>
      <MenuList>
        <MenuItem onClick={clearResults}>Reset</MenuItem>
        <MenuItem
          onClick={() => {
            navigator.clipboard.writeText(result);
            copied();
          }}
        >
          Copy
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
export default ButtonMenu;
