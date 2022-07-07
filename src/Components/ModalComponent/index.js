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

function AddModalComponent({handleProvider}) {
  //formik
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);

   //providerEnums
  const providerEnums = useSelector((state) => state.provider.providerEnums);
  const shiftEnums = providerEnums.filter((item) => item.value !== 0); //ilk elemanın index 0 , filtreledim.

  //token
  const userToken = useSelector((state) => state.auth.userToken);

  async function addNewProvider(values) {
    const URL = "http://c4f2.acsight.com:7770/api/system/add-partner-sms-provider";
    axios.defaults.headers.common = {
      Authorization: "Bearer " + userToken,
    };
    try {
      const resp = await axios.post(URL, values);
      if(resp.data.success === true) {
        handleProvider();
        onClose();
      }
    }
    catch (error) {
      console.log("error", error);
    }
  }

  const formik = useFormik({
    initialValues: {
      ID: 0,
      status: true,
      ProviderID: shiftEnums[0].value,
      PartnerID: "",
      BaseURL:"",
      FromName: "",
      Username: "",
      Password: "",
      VendorCode: "",
      ApiKey: "",
      SecretKey: "",
      AccountSID: "",
      AuthToken: "",
    },
    onSubmit: (values) => {
      addNewProvider(values);
    },
  });

  return (
    <>
      <Button onClick={onOpen} colorScheme="teal">
        Add New Provider
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
              <FormControl isRequired  mb="2">
                <FormLabel>Provider</FormLabel>
                <Select size="xs" onChange={formik.handleChange} name="ProviderID" >
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
                  placeholder="PartnerID"
                  onChange={formik.handleChange}
                />
              </FormControl>

              <FormControl isRequired mt={4} >
                <FormLabel>BaseURL</FormLabel>
                <Input
                  name="BaseURL"
                  value={formik.values.BaseURL}
                  size="xs"
                  type="text"
                  placeholder="BaseURL"
                  onChange={formik.handleChange}
                />
              </FormControl>

              <FormControl isRequired  mt={4}>
                <FormLabel>FromName</FormLabel>
                <Input
                  name="FromName"
                  value={formik.values.FromName}
                  size="xs"
                  type="text"
                  placeholder="FromName"
                  onChange={formik.handleChange}
                />
              </FormControl>

              <FormControl isRequired  mt={4}>
                <FormLabel>Username</FormLabel>
                <Input
                  name="Username"
                  value={formik.values.Username}
                  size="xs"
                  type="text"
                  placeholder="Username"
                  onChange={formik.handleChange}
                />
              </FormControl>

              <FormControl isRequired  mt={4}>
                <FormLabel>Password</FormLabel>
                <Input
                  name="Password"
                  value={formik.values.Password}
                  size="xs"
                  type="password"
                  placeholder="Password"
                  onChange={formik.handleChange}
                />
              </FormControl>

              <FormControl isRequired  mt={4}>
                <FormLabel>VendorCode</FormLabel>
                <Input
                  name="VendorCode"
                  value={formik.values.VendorCode}
                  size="xs"
                  type="text"
                  placeholder="VendorCode"
                  onChange={formik.handleChange}
                />
              </FormControl>

              <FormControl isRequired  mt={4}>
                <FormLabel>ApiKey</FormLabel>
                <Input
                  name="ApiKey"
                  value={formik.values.ApiKey}
                  size="xs"
                  type="text"
                  placeholder="ApiKey"
                  onChange={formik.handleChange}
                />
              </FormControl>

              <FormControl isRequired  mt={4}>
                <FormLabel>SecretKey</FormLabel>
                <Input
                  name="SecretKey"
                  value={formik.values.SecretKey}
                  size="xs"
                  type="text"
                  placeholder="SecretKey"
                  onChange={formik.handleChange}
                />
              </FormControl>

              <FormControl isRequired  mt={4}>
                <FormLabel>AccountSID</FormLabel>
                <Input
                  name="AccountSID"
                  value={formik.values.AccountSID}
                  size="xs"
                  type="text"
                  placeholder="AccountSID"
                  onChange={formik.handleChange}
                />
              </FormControl>

              <FormControl isRequired  mt={4}>
                <FormLabel>AuthToken</FormLabel>
                <Input
                  name="AuthToken"
                  value={formik.values.AuthToken}
                  size="xs"
                  type="text"
                  placeholder="AuthToken"
                  onChange={formik.handleChange}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="teal" mr={3} type="submit">
                Add
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddModalComponent;
