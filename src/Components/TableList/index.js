import { useEffect, useState} from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setPartnerProviders } from "../../redux/provider/providerSlice";
import {Flex, Table, Thead, Tbody, Tr, Th, Td, TableContainer, Alert, AlertIcon, Spinner, Switch} from "@chakra-ui/react";
import ModalComponent from "../ModalComponent";
import EditModalComponent from "../EditModalComponent";

function TableList() {
  const dispatch = useDispatch();
  const URL = "http://c4f2.acsight.com:7770/api/system/sms-provider-list"; 

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  //her bir item
  const partnerProviders = useSelector((state) => state.provider.partnerProviders);

  //providerEnums'ları tutan state
  const providerEnums = useSelector((state) => state.provider.providerEnums);

  //token
  const userToken = useSelector((state) => state.auth.userToken);

  const formatDate = (params) => {
    const dt = new Date(params);
    return `
    ${dt.getFullYear().toString().padStart(4, "0")}/${(dt.getMonth() + 1).toString().padStart(2, "0")}/${dt.getDate().toString().padStart(2, "0")} 
    ${dt.getHours().toString().padStart(2, "0")}:${dt.getMinutes().toString().padStart(2, "0")}`;
  }

  //switchStatus
  const handleSwitchStatus = async (id, newStatus) =>{
    axios.defaults.headers.common = {
      Authorization: "Bearer " + userToken,
    };

    const statusURL = `http://c4f2.acsight.com:7770/api/system/change-stat-partner-sms-provider?id=${id}&stat=${newStatus === false ? false : true}`;
    try {
     const resp = await axios.post(statusURL);
     console.log('resp', resp); 
     handleProvider();
    }catch(error) {
      console.log('error', error);
    }
  }

  //provider'ları listeler
  const handleProvider = async () => {
    try {
      axios.defaults.headers.common = {
        Authorization: "Bearer " + userToken,
      };
      const { data } = await axios.get(URL);
          if (data.info.statusCode === 200) {
            dispatch(setPartnerProviders(data.data.partnerProviders));
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
    <div style={{ marginRight: "20px", marginLeft: "20px" }}>
     
      <TableContainer mb={4}>
        <Table
          variant="striped"
          colorScheme="teal"
          size="sm"
          maxWidth="50%"
          mt="4"
        >
          <Thead>
            <Tr>
              <Th>Edit</Th>
              <Th>providerID</Th>
              <Th>baseURL</Th>
              <Th>fromName </Th>
              <Th>username</Th>
              <Th>password</Th>
              <Th>vendorCode</Th>
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
                <Td>{
                  //partnerID default olan 3 değerde 0.
                    item.partnerID === 0 ? "" : <EditModalComponent handleProvider={handleProvider} item={item}/>
                  }
                  </Td>
                <Td>{providerEnums[item.providerID].name}</Td>
                <Td>{item.baseURL}</Td>
                <Td>{item.fromName}</Td>
                <Td>{item.username}</Td>
                <Td>{item.password}</Td>
                <Td>{item.vendorCode}</Td>
                <Td>{item.apiKey}</Td>
                <Td>{item.secretKey}</Td>
                <Td>{item.accountSID}</Td>
                <Td>
                  <Switch
                    size="sm"
                    colorScheme="teal"
                    isChecked={item.status}
                    onChange={() => handleSwitchStatus(item.id, !item.status)}
                  />
                </Td>
                <Td>{formatDate(item.updatedWhen)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>     

      <ModalComponent handleProvider={handleProvider}/>
    </div>
  );
}

export default TableList;
