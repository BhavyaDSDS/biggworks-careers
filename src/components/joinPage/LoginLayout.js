"useClient";

import { Box, Typography } from "@mui/material";
import PhoneNumberForm from "./PhoneNumberForm";
import OtpForm from "./OtpForm";
import { useState } from "react";

function LoginLayout() {
  const [mobileNumber, setMobileNumber] = useState("");
  const [isShowOtpForm, setIsShowOtpForm] = useState(false);

  return (
    <Box sx={{ paddingTop: "10px" }}>
      {isShowOtpForm ? (
        <OtpForm
          setMobileNumber={setMobileNumber}
          setIsShowOtpForm={setIsShowOtpForm}
          mobileNumber={mobileNumber}
        />
      ) : (
        <PhoneNumberForm
          setMobileNumber={setMobileNumber}
          setIsShowOtpForm={setIsShowOtpForm}
        />
      )}
    </Box>
  );
}

export default LoginLayout;
