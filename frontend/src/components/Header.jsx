import { Flex, Image, Link, useColorMode } from "@chakra-ui/react";
import lightLogo from '../assets/light-logo.svg';
import darkLogo from '../assets/dark-logo.svg';
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { AiFillHome } from "react-icons/ai"; // Correct import
import { RxAvatar } from "react-icons/rx"; // Correct import
import { Link as RouterLink } from "react-router-dom";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const user = useRecoilValue(userAtom);

  // console.log("User object:", user.username); // Debugging log

  return (
    <Flex justifyContent={"space-between"} mt={10} alignItems="center">
      {user && (
        <Link as={RouterLink} to="/">
          <AiFillHome size="24" style={{ marginRight: "10px" }} /> {/* Add size and margin */}
        </Link>
      )}
      <Image
        cursor={"pointer"}
        w={6}
        mb={4} // Adding margin-bottom
        src={colorMode === "dark" ? lightLogo : darkLogo}
        onClick={toggleColorMode}
      />

      {user && (
        <Link as={RouterLink} to={`/${user.userName}`}>
          <RxAvatar size="24" style={{ marginRight: "10px" }} /> {/* Add size and margin */}
        </Link>
      )}

    </Flex>
  );
};

export default Header;
