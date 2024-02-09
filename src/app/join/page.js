"use client"

import LoginLayout from "@/components/joinPage/LoginLayout";
import {
  ADOBE_CMP,
  AMAZON_CMP,
  EXPEDIA_CMP,
  GOOGLE_CMP,
  KALIBRE_TITLE,
  LINKEDIN_CMP,
  INFINITY_META_CMP,
  MICROSOFT_CMP,
  NVIDIA_CMP,
  RAZORPAY_CMP,
  SWIGGY_CMP,
} from "@/constants/MediaConstants";
import { Box, Grid, Stack, Typography } from "@mui/material";

const rightParentBox = {
  background: "linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)",
  height: "100vh",
  width: "100%",
  padding: "14rem 10rem",
  textAlign: "center",
};

const leftParentBox = {
  height: "100vh",
  width: "100%",
  padding: "5rem",
};

const CompaniesLogo = [
  NVIDIA_CMP,
  SWIGGY_CMP,
  EXPEDIA_CMP,
  AMAZON_CMP,
  GOOGLE_CMP,
  LINKEDIN_CMP,
  ADOBE_CMP,
  RAZORPAY_CMP,
  INFINITY_META_CMP,
  MICROSOFT_CMP,
];

function page() {
  return (
    <Box>
      <Grid container>
        <Grid item lg={6} xl={6}>
          <Box sx={leftParentBox}>
            <Box sx={{ width: "180px" }}>
              <img src={KALIBRE_TITLE} style={{ maxWidth: "100%" }} />
            </Box>
            <Box marginTop={10}>
              <LoginLayout />
            </Box>
          </Box>
        </Grid>
        <Grid item lg={6} xl={6}>
          <Box sx={rightParentBox}>
            <Stack
              direction="column"
              justifyContent="space-between"
              alignItems="center"
              sx={{ height: "100%" }}
            >
              <Box>
                <Typography variant="h1" mb={3}>
                  Your Potential, Their Priority! 🌟
                </Typography>
                <Typography variant="h2">
                  Over 500 Companies Awaiting Your Talent! Let's Complete Your
                  Profile Together! 🚀
                </Typography>
              </Box>
              <Box>
                <Stack direction="row" spacing={0.5} flexWrap="wrap" gap={1}>
                  {CompaniesLogo?.map((data, idx) => {
                    return (
                      <Box key={idx} sx={{ width: "120px" }}>
                        <img src={data} style={{ maxWidth: "100%" }} />
                      </Box>
                    );
                  })}
                </Stack>
              </Box>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default page;
