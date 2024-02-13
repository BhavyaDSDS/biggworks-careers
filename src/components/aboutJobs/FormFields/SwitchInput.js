import { Box, FormControlLabel, Switch } from "@mui/material";
import React, { useCallback, useState } from "react";

function SwitchInput(props) {
  const { label, onChange, value } = props;

  return (
    <>
      <Box sx={{ marginLeft: "2px" }}>
        <FormControlLabel
          control={<Switch checked={value} onChange={onChange} size="small" />}
          label={label}
        />
      </Box>
    </>
  );
}

export default SwitchInput;
