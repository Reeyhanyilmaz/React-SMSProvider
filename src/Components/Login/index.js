import axios from "axios";
import { setUserToken, setUser } from "../../redux/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import {Flex, Box, Heading, FormControl, FormLabel, Button, Input} from "@chakra-ui/react";
import {useNavigate} from 'react-router-dom';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const URL = "https://c4f2.acsight.com:7710/connect/token";
  const user = useSelector((state) => state.auth.user);

  const handleLogin = async (e) => {
    e.preventDefault(); //login olunca sayfa yenilenmesini engelledim.

    try {
      const resp = await axios.post(URL, new URLSearchParams({      
          grant_type: "password",
          client_id: "ClientIdWithFullAccess",
          client_secret: "fullAccessSecret",
          username: user.email,
          password: user.password,
        })       
      );
      if (resp.status === 200) {
        dispatch(setUserToken(resp.data.access_token));
        navigate("/tableList");
      } else {
       alert("Something a wrong");
      }
    } catch (error) {
      alert("No such user was found");
    }
  };
  return (
    <div>
      <Flex align="center" width="full" justifyContent="center">
        <Box pt={10}>
          <Box textAlign="center">
            <Heading>Login</Heading>
          </Box>

          <Box my={5} textAlign="left">
            <form onSubmit={handleLogin}>
              <FormControl isRequired>
                <FormLabel>E-mail</FormLabel>
                <Input
                  type="text"
                  placeholder="email@email.com"
                  onChange={(e) => dispatch(setUser({ type: "email", value: e.target.value }))}/>
              </FormControl>

              <FormControl mt={4} isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  placeholder="password"
                  onChange={(e) => dispatch(setUser({ type: "password", value: e.target.value }))}/>
              </FormControl>

              <Button
                colorScheme="teal"
                size="lg"
                mt={4}
                width="full"
                type="submit">
                Login
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </div>
  );
}

export default Login;
