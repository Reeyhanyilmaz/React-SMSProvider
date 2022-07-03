import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setPartnerProviders } from "../../redux/provider/providerSlice";

function Table() {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const dispatch = useDispatch();
  const URL = "http://c4f2.acsight.com:7770/api/system/sms-provider-list";
  const userToken = useSelector((state) => state.auth.userToken);
  const partnerProviders = useSelector(
    (state) => state.provider.partnerProviders
  );

  useEffect(() => {
    console.log("partnerProviders :>> ", partnerProviders);
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
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error!</div>;
  }

  return (
    <div>
      <h1>Table</h1>
      <table>
        <thead>
          <tr>
            <th>providerID:</th>
            <th>baseURL </th>
            <th>fromName </th>
            <th>username: </th>
            <th>password </th>
            <th>vendorCode </th>
            <th>apiKey </th>
            <th>secretKey: </th>
            <th>accountSID </th>
            <th>status </th>
            <th>updatedWhen </th>
          </tr>
        </thead>
        <tbody>
          {partnerProviders.map((item, i) => (
            <tr key={i}>
              <td>{item.providerID}</td>
              <td>{item.baseURL}</td>
              <td>{item.fromName}</td>
              <td>{item.username}</td>
              <td>{item.password}</td>
              <td>{item.vendorCode}</td>
              <td>{item.apiKey}</td>
              <td>{item.secretKey}</td>
              <td>{item.accountSID}</td>
              <td>{item.status}</td>
              <td>{item.updatedWhen}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
