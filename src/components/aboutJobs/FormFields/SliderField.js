"use client";

import { Box, Slider, Stack, TextField, Typography } from "@mui/material";
import React, { useCallback, useState } from "react";
import { styled } from "@mui/material/styles";

const CustomSlider = styled(Slider)(({ theme }) => ({
  width: "95%",
  marginLeft: "15px",
  // minWidth: '15rem',
  // [`@media (max-width:1285px)`]: {
  //   width: '80%',
  // },
}));

function SliderField(props) {
  const { label, min, max, step, marks, onChange, value } = props;

  return (
    <>
      <Stack direction="column">
        <Typography variant="body2">{label}</Typography>

        <CustomSlider
          aria-label="Default"
          valueLabelDisplay="auto"
          min={min}
          max={max}
          step={step}
          marks={marks}
          value={value}
          onChange={onChange}
        />
      </Stack>
    </>
  );
}

export default SliderField;
