import { isDisplayError } from "@/utils/CustomFunctions";
import { useTheme } from "@emotion/react";
import { Stack, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

import React, { useState } from "react";

function DateInput(props) {
  const { label, onChange, value, error } = props;

  const minAllowedDate = dayjs();


  const theme = useTheme();


  return (
    <>
      <Stack direction="column">
        <Typography variant="body2">{label}</Typography>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            minDate={minAllowedDate}
            value={value}
            onChange={onChange}
            slotProps={{
              textField: {
                helperText: error && (
                  <Typography sx={theme.errorMessage}>{error}</Typography>
                ),
                size: "small",
                error: Boolean(error),
              },
            }}
          />
        </LocalizationProvider>
      </Stack>
    </>
  );
}

export default DateInput;
