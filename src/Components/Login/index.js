import axios from 'axios';
import {setUserToken, setUser} from '../../redux/auth/authSlice';
import {useDispatch, useSelector} from 'react-redux';
import {Link, Flex , Box , Heading , FormControl , FormLabel , Button, Input , Alert} from '@chakra-ui/react';

function Login() {
  const dispatch = useDispatch();  
  const URL = 'http://c4f2.acsight.com:7710/connect/token';
  const user = useSelector(state => state.auth.user);

  const handleLogin = async (e) => {
    e.preventDefault(); //login olunca sayfa yenilenmesini engelledim.
    console.log('user', user)

    try {
      const resp = await axios.post(URL, new URLSearchParams({
        "grant_type": "password",
        "client_id": "ClientIdWithFullAccess",
        "client_secret": "fullAccessSecret",
        "username": user.email,
        "password": user.password,
      }))

      if (resp.status === 200) {
        dispatch(setUserToken(resp.data.access_token));
        console.log('resp :>> ', resp.data.access_token);
        Link('components/Table');
      } else {
        console.log('resp :>> ', resp);
      }
    } 
    catch (error) {
      console.log("catch" , error.response)
    }
  }
  return (
    <div>
        {/* <form onSubmit={handleLogin}>
            <input type="text" placeholder="mail" onChange={(e) => dispatch(setUser( {type : "email", value: e.target.value}))} />
            <br />
            <input type="password" placeholder="password" onChange={(e) => dispatch(setUser( {type : "password", value: e.target.value}))}/>
            <br />
            <button type="submit">Login</button>
        </form> */}



        <Flex align="center" width="full" justifyContent="center">
        <Box pt={10}>
          <Box textAlign="center">
            <Heading>Login</Heading>
          </Box>

          {/* <Box my={5}>
            {
              formik.errors.email && formik.touched.email && 
              (
                <Alert status='error'>
                  {formik.errors.email}
                </Alert>
              )
            }
          </Box>

          <Box my={5}>
            {
              formik.errors.password && formik.touched.password &&
              (
                <Alert status='error'>
                  {formik.errors.password}
                </Alert>
              )
            }
          </Box> */}

          <Box my={5} textAlign="left">
            <form onSubmit={handleLogin}>
              <FormControl>
                <FormLabel >E-mail</FormLabel>
                <Input type="text" placeholder="email@email.com" onChange={(e) => dispatch(setUser( {type : "email", value: e.target.value}))}/>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel >Password</FormLabel>
                <Input type="password" placeholder="password" onChange={(e) => dispatch(setUser( {type : "password", value: e.target.value}))} />
              </FormControl>

              <Button colorScheme='teal' size='lg' mt={4} width="full" type='submit'>
               Login
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </div>
  )
}

export default Login;