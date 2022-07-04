import React from "react";
import { Flex, Image} from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <Flex  mt={4} mb={4} ml={4}>
        <Link to="/">
        <Image
          height="50"
          width="150"
          src="./assets/logo.png"
          alt="logo"
          align="center"
          justifyContent="center"
        />
        </Link>
      </Flex>
    </div>
  );
}

export default Navbar;
