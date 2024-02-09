"use client";

import { Box, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import CandidateProfileCard from "./CandidateProfileCard";
import { KALIBRE_TITLE } from "@/constants/MediaConstants";
import OnboardingFooter from "./OnboardingFooter";

const leftLayout = {
  padding: "2rem",
  height: "100vh",
  overflow: "hidden",
  //   position: "relative",
};

function OnboardingPage(props) {
  const { pageData, pageNum, onBoardDispatch } = props;

  console.log("qqq page data ===", pageData);

  return (
    <>
      <Box>
        <Grid container>
          <Grid item xs={6}>
            <Box sx={leftLayout}>
              <Box sx={{ width: "150px" }}>
                <img src={KALIBRE_TITLE} style={{ maxWidth: "100%" }} />
              </Box>
              <Box sx={{ marginTop: "2.5rem" }}>
                <Typography variant={pageNum === 0 ? "h1" : "h2"}>
                  {pageData?.col_one?.heading}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ fontSize: "18px", marginTop: "1rem" }}
                >
                  {pageData?.col_one?.paragraph}
                </Typography>
              </Box>
              <Box
                sx={{
                  position: "fixed",
                  bottom: "20px",
                  width: "46%",
                }}
              >
                <OnboardingFooter
                  pageNum={pageNum}
                  onBoardDispatch={onBoardDispatch}
                />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box>
              <CandidateProfileCard />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default OnboardingPage;
