import { Flex, Image, useColorMode } from "@chakra-ui/react";
import lightLogo from '../assets/light-logo.svg';
import darkLogo from '../assets/dark-logo.svg';

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex justifyContent={"center"} mt={10}>
      <Image
        cursor={"pointer"}
        w={6}
        mb={4} // Adding margin-bottom
        src={colorMode === "dark" ? lightLogo : darkLogo}
        onClick={toggleColorMode}
      />
    </Flex>
  );
};

export default Header;
