import { Box, FormControl, MenuItem, Select, Typography } from "@mui/material";
import React from "react";

function SelectInput(props) {
  const { options, label, onChange, value } = props;

  return (
    <Box>
      <Typography variant="body2">{label}</Typography>
      <FormControl size="small" sx={{ minWidth: "100%" }}>
        <Select
          onChange={onChange}
          inputProps={{ "aria-label": "Without label" }}
          size="small"
          value={value}
        >
          {options?.map((data) => {
            return <MenuItem value={data.value}>{data.name}</MenuItem>;
          })}
        </Select>
      </FormControl>
    </Box>
  );
}

export default SelectInput;
