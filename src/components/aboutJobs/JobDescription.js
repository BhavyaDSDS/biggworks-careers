"use client";
import {
  AppBar,
  Box,
  Button,
  Card,
  CardHeader,
  Container,
  Divider,
  Grid,
  Stack,
  Toolbar,
  Typography,
  Link,
  Snackbar,
  Alert,
} from "@mui/material";
import React, { useState } from "react";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import LocalAtmOutlinedIcon from "@mui/icons-material/LocalAtmOutlined";
import WorkLocations from "./WorkLocations";
import PrimaryTechSkills from "./PrimaryTechSkills";
import MinimumRequirements from "./MinimumRequirements";
import PrefferedRequirements from "./PrefferedRequirements";
import Responsibilities from "./Responsibilities";
import { useTheme } from "@mui/system";
import Navbar from "../layoutsComponents/Navbar";
import { auto } from "@popperjs/core";
import JobForm from "./JobForm";
import { createQuary, isEmptyObject } from "@/utils/CustomFunctions";
import { useContext, useEffect } from "react";
import { MyContext } from "@/context/ContextProvider";
import { getJobs } from "@/app/api/ApiHandlers";
import {
  APPLY_BUTTON_STRING,
  LOADING_SUCCESS,
} from "@/constants/TextConstants";
import { useRouter } from "next/navigation";
import JobsCardContent from "../jobsPage/JobsCardContent";
import { Icon } from "@iconify/react";

import { LimitedJobDetail } from "@/utils/CustomFunctions";

function JobDescription(props) {
  const { job } = props;
  const [jobModalOpen, setJobModalOpen] = useState(false);
  const [jobCardData, setJobCardData] = useState([]);
  const { globalState, dispatch } = useContext(MyContext);
  const limitedJobCardRender = globalState?.job_list?.list?.slice(0, 4);
  console.log("limitedJobCardRender", globalState?.job_list?.list);
  const router = useRouter();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleOpenModal = () => {
    setJobModalOpen(true);
  };
  const handleCloseModal = () => {
    setJobModalOpen(false);
  };
  console.log("jobCardData", globalState?.job_list?.list);

  const theme = useTheme();
  const handleClick = (id) => {
    router.push(`${id}`);
  };
  console.log("Job***", job);
  useEffect(() => {
    if (globalState?.job_list?.list?.length > 0) {
      const limit = LimitedJobDetail(globalState?.job_list?.list);
      console.log("qqq limited numbers hsbfauz", limit);
      setJobCardData(limit);
    }
  }, [globalState]);

  return (
    <div>
      <Box width={"95%"} margin={auto}>
        <Box>
          <Navbar />
        </Box>
       
        <Card
          sx={{
            padding: "30px",
            border: "1px solid #d9d9d9",
            marginTop: "110px",
            // width:  "869px"
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            {jobModalOpen && (
              <JobForm
                jobData={job}
                setOpenSnackbar={setOpenSnackbar}
                jobModalOpen={jobModalOpen}
                handleOpenModal={handleOpenModal}
                handleCloseModal={handleCloseModal}
              />
            )}
          </Box>

          <Card
            sx={{
              backgroundColor: "#F2FEFF",
              borderRadius: "2px",
              border: "none",
              padding: "20px",
              boxShadow: "none",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h5" fontWeight={900}>
                {job?.job_title}
              </Typography>
              <Button onClick={handleOpenModal} variant="contained">
                {APPLY_BUTTON_STRING}{" "}
              </Button>
            </Box>
           
           
            
            <Box>
              <JobsCardContent
                total_exp_min={job?.total_exp[0]}
                total_exp_max={job?.total_exp[1]}
                relevant_exp={job?.relevant_exp}
                work_locations={job?.work_locations}
                salary_range_min={job?.salary_range_min}
                salary_range_max={job?.salary_range_max}
                pri_tech_skills_l={job?.pri_tech_skills_l}
                role_name={job?.role_l}
              />
            </Box>
          </Card>

          {job?.minimum_requirements &&
          job?.preferred_requirements &&
          job?.responsibilities ? (
            <Box>
              <Box>
                <Typography
                  mt={2}
                  sx={theme.job_list_title}
                  variant="h6"
                >
                  Minimum Requirements:
                </Typography>
              </Box>

              <MinimumRequirements jobData={job} />

              <Box mt={3}>
                <Typography
                  sx={theme.job_list_title}
                  mb="16px"
                >
                  Preferred Requirements:
                </Typography>
              </Box>

              <PrefferedRequirements jobData={job} />

              <Box mt={3}>
                <Typography
                  sx={theme.job_list_title}
                  mb="16px"
                >
                  Responsibilities:
                </Typography>
              </Box>

              <Responsibilities jobData={job} />
            </Box>
          ) : null}
          
        </Card>

     

        
      </Box>

      {job &&
          !job?.minimum_requirements &&
          !job?.preferred_requirements &&
          !job?.responsibilities && (
            <Grid container gap={3} mt={12}>
              {jobCardData?.map((data) => {
                console.log("InitialData", data);
                return (
                  data.total_exp_min &&
                  data.total_exp_max &&
                  data.relevant_exp &&
                  data.work_locations &&
                  data.salary_range_min &&
                  data.salary_range_max &&
                  data.pri_tech_skills_l &&
                  data.role_name && (
                    <Grid xs={5}>
                      <Card sx={{ width: "100%" }}>
                        <CardHeader
                          title={
                            <Typography
                              variant="h6"
                              sx={{ fontWeight: 700, cursor: "pointer" }}
                            >
                              {data.job_title}
                            </Typography>
                          }
                        />
                        <JobsCardContent
                          job_title={data.job_title}
                          total_exp_min={data.total_exp_min}
                          total_exp_max={data.total_exp_max}
                          relevant_exp={data.relevant_exp}
                          work_locations={data.work_locations}
                          salary_range_min={data.salary_range_min}
                          salary_range_max={data.salary_range_max}
                          pri_tech_skills_l={data.pri_tech_skills_l}
                          role_name={data.role_name}
                        />
                      </Card>
                    </Grid>
                  )
                );
              })}
            </Grid>
          )}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000}
        open={openSnackbar}
        onClose={() => {
          setOpenSnackbar(false);
        }}
        key={"top+horizontal"}
      >
        <Alert
          severity="success"
          variant="filled"
          sx={{
            width: "100%",
            fontSize: "22px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClose={() => {
            setOpenSnackbar(false);
          }}
        >
          Successfully submited
        </Alert>
      </Snackbar>
    </div>
  );
}

export default JobDescription;
