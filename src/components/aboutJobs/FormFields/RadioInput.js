import {
    Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

function RadioInput(props) {
  const { label, options, isRow,onChange,value } = props;

     console.log("value ====",value)


  return (
    <>
      <Stack direction="column">
        <Typography variant="body2">{label}</Typography>
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
            row={isRow}
            onChange={(e) => {onChange(e.target.value === "true")}}
            value={value}
          >
            {options?.map((data, idx) => {
              return (
                <Box key={idx}>
                  <FormControlLabel
                    value={data?.value}
                    control={<Radio size="small"  />}
                    label={data.label}
                    
                  />
                </Box>
              );
            })}
          </RadioGroup>
        </FormControl>
      </Stack>
    </>
  );
}

export default RadioInput;
