"use client";

import { sendPhoneNumber } from "@/app/api/ApiHandlers";
import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { MuiTelInput, matchIsValidTel } from "mui-tel-input";
import { Controller, useForm } from "react-hook-form";

import {
  createCode,
  consumeCode,
  resendCode,
} from "supertokens-web-js/recipe/passwordless";

function PhoneNumberForm(props) {
  const { setMobileNumber, setIsShowOtpForm } = props;

  const { control, handleSubmit } = useForm({
    defaultValues: {
      phone_number: "+91",
    },
  });

  const phoneNumberSubmit = async (number) => {
    try {
      let formattedPhone = number?.phone_number?.replace(/\s/g, "");
      setMobileNumber(formattedPhone);

      const phoneNum = {
        phoneNumber: formattedPhone,
      };

      await sendPhoneNumber(phoneNum);
      setIsShowOtpForm(true);
    } catch (error) {
      console.log("Error from phoneNumberSubmit", error);
    }
  };

  return (
    <Box>
      <Typography variant="h1">Ready to code your destiny?</Typography>
      <Typography
        variant="h3"
        mt={5}
        mb={3}
        sx={{ width: "70%", fontWeight: 400 }}
      >
        <b>Log in</b> if you're returning or
        <b> Sign Up</b> to embark on your tech adventure!"
      </Typography>

      <Box>
        <form onSubmit={handleSubmit(phoneNumberSubmit)}>
          <Controller
            name="phone_number"
            control={control}
            rules={{ validate: matchIsValidTel }}
            render={({ field, fieldState }) => (
              <MuiTelInput
                {...field}
                helperText={fieldState.invalid ? "Phone Number is Invalid" : ""}
                error={fieldState.invalid}
                sx={{
                  width: "85%",
                  maxWidth: "400px",
                }}
              />
            )}
          />
          <div>
            <Button
              type="submit"
              variant="contained"
              sx={{
                width: "85%",
                maxWidth: "400px",
                mt: "25px",
              }}
              size="large"
            >
              Request OTP
            </Button>
          </div>
        </form>
      </Box>
    </Box>
  );
}

export default PhoneNumberForm;
