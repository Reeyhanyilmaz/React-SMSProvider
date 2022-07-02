import React from "react";
import {Alert, AlertIcon, AlertTitle, AlertDescription} from "@chakra-ui/react";

function Error404() {
  return (
    <div>
      <Alert status="error" mt={3}>
        <AlertIcon />
        <AlertTitle>Error 404</AlertTitle>
        <AlertDescription>Böyle bir sayfa bulunamadı!</AlertDescription>
      </Alert>
    </div>
  );
}

export default Error404;
