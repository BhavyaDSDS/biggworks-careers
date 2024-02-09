"use client";

import {
  BACK_BUTTON_STRING,
  CONTINUE_BUTTON_STRING,
} from "@/constants/TextConstants";
import { Box, Button, Stack } from "@mui/material";
import { useCallback } from "react";

function OnboardingFooter(props) {
  const { pageNum, onBoardDispatch } = props;

  console.log("qqq page num ===", pageNum);

  const nextPage = useCallback(() => {
    const data = { type: "pageNum", payload: pageNum + 1 };

    if (pageNum != 7) {
      onBoardDispatch(data);
    }
  }, [pageNum]);

  const backPage = useCallback(() => {
    const data = { type: "pageNum", payload: pageNum - 1 };

    if (pageNum != 0) {
      onBoardDispatch(data);
    }
  }, [pageNum]);

  console.log("qqqq pagen num ===", pageNum);

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Box>
          <Button onClick={backPage} variant="outlined">
            {BACK_BUTTON_STRING}
          </Button>
        </Box>
        <Stack direction="row" spacing={2}>
          {[0, 1, 2, 3, 4, 5, 6, 7].map((data) => {
            return (
              <Box
                key={data}
                sx={{
                  width: "30px",
                  height: "5px",
                  backgroundColor: pageNum == data ? "#000" : "#ebebeb",
                  borderRadius: "5px",
                }}
              />
            );
          })}
        </Stack>
        <Box>
          <Button onClick={nextPage} variant="contained">
            {CONTINUE_BUTTON_STRING}
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}

export default OnboardingFooter;
