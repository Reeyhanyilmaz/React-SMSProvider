import { useRef } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalCloseButton,
  useDisclosure,
  Button,
  Select,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import axios from "axios";

function ModalComponent({ handleProvider, item }) {
 
  //formik
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  //providerEnums
  const providerEnums = useSelector((state) => state.provider.providerEnums);
  const shiftEnums = providerEnums.filter((item) => item.value !== 0);

  //token
  const userToken = useSelector((state) => state.auth.userToken);

  async function editProvider(values) {
    const URL = "http://c4f2.acsight.com:7770/api/system/update-partner-sms-provider";
    
    axios.defaults.headers.common = {
      Authorization: "Bearer " + userToken,
      
    };
    axios.defaults.headers["Access-Control-Allow-Origin"] = "*";
    axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
    try {
      const resp = await axios.post(URL , values);
      if(resp.data.success === true){
        handleProvider();
        onClose();
      }
    }
    catch (error) {
      alert("error");
    console.log("error", error);
  } 
}

  const formik = useFormik({
    initialValues: {
      ID: item.id,
      status: item.status,
      ProviderID: item.providerID,
      PartnerID: item.partnerID,
      BaseURL: item.baseURL,
      FromName: item.fromName,
      Username: item.username,
      Password: item.password,
      VendorCode: item.vendorCode,
      ApiKey: item.apiKey,
      SecretKey: item.secretKey,
      AccountSID: item.accountSID,
      AuthToken: item.authToken,
    },
    onSubmit: (values) => {
      editProvider(values);
    },
  });

  return (
    <>
      <Button onClick={onOpen} colorScheme="teal" size="xs">
        Edit
      </Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <form onSubmit={formik.handleSubmit}>
            <ModalBody pb={6}>
              <FormControl isRequired mb="2">
                <FormLabel>ProviderID</FormLabel>
                <Select
                  size="xs"
                  onChange={formik.handleChange}
                  name="ProviderID"
                  value={formik.values.ProviderID}
                >
                  {shiftEnums.map((item, i) => (
                    <option key={i} value={item.value}>
                      {item.name}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl isRequired >
                <FormLabel>PartnerID</FormLabel>
                <Input
                  name="PartnerID"
                  value={formik.values.PartnerID}
                  size="xs"
                  type="number"
                  ref={initialRef}
                  onChange={formik.handleChange}
                />
              </FormControl>

              <FormControl isRequired mt={4}>
                <FormLabel>BaseURL</FormLabel>
                <Input
                  name="BaseURL"
                  value={formik.values.BaseURL}
                  size="xs"
                  type="text"
                  onChange={formik.handleChange}
                />
              </FormControl>

              <FormControl isRequired mt={4}>
                <FormLabel>FromName</FormLabel>
                <Input
                  name="FromName"
                  value={formik.values.FromName}
                  size="xs"
                  type="text"
                  onChange={formik.handleChange}
                />
              </FormControl>

              <FormControl isRequired mt={4}>
                <FormLabel>Username</FormLabel>
                <Input
                  name="Username"
                  value={formik.values.Username}
                  size="xs"
                  type="text"
                  onChange={formik.handleChange}
                />
              </FormControl>

              <FormControl isRequired mt={4}>
                <FormLabel>Password</FormLabel>
                <Input
                  name="Password"
                  value={formik.values.Password}
                  size="xs"
                  type="password"
                  onChange={formik.handleChange}
                />
              </FormControl>

              <FormControl isRequired mt={4}>
                <FormLabel>VendorCode</FormLabel>
                <Input
                  name="VendorCode"
                  value={formik.values.VendorCode}
                  size="xs"
                  type="text"
                  onChange={formik.handleChange}
                />
              </FormControl>

              <FormControl isRequired mt={4}>
                <FormLabel>ApiKey</FormLabel>
                <Input
                  name="ApiKey"
                  value={formik.values.ApiKey}
                  size="xs"
                  type="text"
                  onChange={formik.handleChange}
                />
              </FormControl>

              <FormControl isRequired mt={4}>
                <FormLabel>SecretKey</FormLabel>
                <Input
                  name="SecretKey"
                  value={formik.values.SecretKey}
                  size="xs"
                  type="text"
                  onChange={formik.handleChange}
                />
              </FormControl>

              <FormControl isRequired mt={4}>
                <FormLabel>AccountSID</FormLabel>
                <Input
                  name="AccountSID"
                  value={formik.values.AccountSID}
                  size="xs"
                  type="text"
                  onChange={formik.handleChange}
                />
              </FormControl>

              <FormControl isRequired mt={4}>
                <FormLabel>AuthToken</FormLabel>
                <Input
                  name="AuthToken"
                  value={formik.values.AuthToken}
                  size="xs"
                  type="text"
                  onChange={formik.handleChange}
                />
              </FormControl>

              {/* modal'da değişmediği için iptal ettim */}
              {/* <FormControl mt="4">
                <FormLabel>Status</FormLabel>
                <Select name="status" value={String(formik.values.status)} onChange={formik.handleChange}>                   
                    <option value="false">False</option>
                    <option value="true">True</option>
                </Select>
              </FormControl> */}
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="teal" mr={3} type="submit">
                Send
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalComponent;
