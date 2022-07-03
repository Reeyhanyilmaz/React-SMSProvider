import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setPartnerProviders } from "../../redux/provider/providerSlice";
import {Flex, Table, Thead, Tbody, Tr, Th, Td, TableCaption, TableContainer, Alert, AlertIcon, Spinner} from "@chakra-ui/react";

function TableList() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const partnerProviders = useSelector((state) => state.provider.partnerProviders);
  const providerEnums = ["", "PostaGuvercini" , "MobilDev", "JetSMS", "MailJet", "Twilio", "InfoBip", "Vonage"];
  const userToken = useSelector((state) => state.auth.userToken);
  const URL = "http://c4f2.acsight.com:7770/api/system/sms-provider-list"; 

  const formatDate = (params) => {
    const dt = new Date(params);

    return `
    ${dt.getFullYear().toString().padStart(4, "0")}/${(dt.getMonth() + 1).toString().padStart(2, "0")}/${dt.getDate().toString().padStart(2, "0")} 
    ${dt.getHours().toString().padStart(2, "0")}:${dt.getMinutes().toString().padStart(2, "0")}`;
  }

  useEffect(() => {
    console.log("partnerProviders ", partnerProviders);
  }, [partnerProviders]);

  const handleProvider = async () => {
    try {
      axios.defaults.headers.common = {
        Authorization: "Bearer " + userToken,
      };
      const { data } = await axios.get(URL);
      console.log("data", data);
          if (data.info.statusCode === 200) {
            dispatch(setPartnerProviders(data.data.partnerProviders));
            console.log("partnerProviders", partnerProviders);
          } else {
            setIsError(true);
          }
    } catch (error) {
      setIsError(true);
    }
    setIsLoading(false);
};

  useEffect(() => {
    handleProvider();
  }, []);

  if (isLoading) {
    return (
      <Flex justifyContent="center" alignItems="center" height="100vh">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          size="xl"
          color="teal.500"
        />
    </Flex>
    );
  }

  if (isError) {
    return (
      <div>
        <Alert status="error">
          <AlertIcon />
           Error!
        </Alert>
      </div>
    );
  }

  return (
    <div style={{marginRight: "20px", marginLeft: "20px"}}>
      <TableContainer>
        <Table variant="striped" colorScheme="teal" size='sm' maxWidth="50%" mt="4" >
          <TableCaption>SMS Provider List</TableCaption>
          <Thead>
            <Tr>
              <Th>providerID</Th>
              <Th>baseURL</Th>
              <Th >fromName </Th>
              <Th>username</Th>
              <Th>password</Th>
              <Th >vendorCode</Th>
              <Th>apiKey</Th>
              <Th>secretKey</Th>
              <Th>accountSID</Th>
              <Th>status</Th>
              <Th>updatedWhen </Th>
            </Tr>
          </Thead>
          <Tbody>
          {partnerProviders.map((item, i) => (
            <Tr key={i}>
              <Td>{providerEnums[item.providerID]}</Td>
              <Td>{item.baseURL}</Td>
              <Td>{item.fromName}</Td>
              <Td>{item.username}</Td>
              <Td>{item.password}</Td>
              <Td>{item.vendorCode}</Td>
              <Td>{item.apiKey}</Td>
              <Td>{item.secretKey}</Td>
              <Td>{item.accountSID}</Td>
              <Td>{item.status}</Td>
              <Td>{formatDate(item.updatedWhen)}</Td>
            </Tr>
          ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default TableList;
