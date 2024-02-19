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
import { LOADING_SUCCESS } from "@/constants/TextConstants";
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
console.log("jobCardData", globalState?.job_list?.list)
  //   const job = {
  //     job_title: "Data Engineer",
  //     relevant_exp: 5,
  //     total_exp: [5, 7],
  //     salary_range_min: 1000000,
  //     salary_range_max: 1500000,
  //     work_locations: ["Banglore", "wWest Bengalore", "South Bengalore"],
  //     work_type: [],
  //     job_description:
  //       "A front-end web developer is probably what most people think of as a “web developer”. A front-end web developer is responsible for implementing visual elements that users see and interact with in a web application. They are usually supported by back-end web developers, who are responsible for server-side application logic and integration of the work front-end developers do. Writing a good job description and a corresponding job ad requires proper separation of concerns. Posting a generic web developer job description in your ad when you are looking for an advanced front-end web developer, will bring numerous applications from people who are specialized in building back-end web services, or web designers who have absolutely no knowledge about programming.There are technologies and knowledge that are common to all web developer jobs. This article will provide you with a sample front-end web developer job description that will help you write a perfect job ad and assure that you easily find and hire the person that matches your specific criteria.",
  //     minimum_requirements:
  //       "A front-end web developer is probably what most people think of as a “web developer”. A front-end web developer is responsible for implementing visual elements that users see and interact with in a web application. They are usually supported by back-end web developers, who are responsible for server-side application logic and integration of the work front-end developers do. Writing a good job description and a corresponding job ad requires proper separation of concerns. Posting a generic web developer job description in your ad when you are looking for an advanced front-end web developer, will bring numerous applications from people who are specialized in building back-end web services, or web designers who have absolutely no knowledge about programming.There are technologies and knowledge that are common to all web developer jobs. This article will provide you with a sample front-end web developer job description that will help you write a perfect job ad and assure that you easily find and hire the person that matches your specific criteria.",
  //     responsibilities:
  //       "A front-end web developer is probably what most people think of as a “web developer”. A front-end web developer is responsible for implementing visual elements that users see and interact with in a web application. They are usually supported by back-end web developers, who are responsible for server-side application logic and integration of the work front-end developers do. Writing a good job description and a corresponding job ad requires proper separation of concerns. Posting a generic web developer job description in your ad when you are looking for an advanced front-end web developer, will bring numerous applications from people who are specialized in building back-end web services, or web designers who have absolutely no knowledge about programming.There are technologies and knowledge that are common to all web developer jobs. This article will provide you with a sample front-end web developer job description that will help you write a perfect job ad and assure that you easily find and hire the person that matches your specific criteria.",
  //     pri_tech_skills_l: [
  //       "CSS3",
  //       "Animation",
  //       "Responsiveness",
  //       "ReactJS",
  //       "NodeJS",
  //       "Strong Coding",
  //       "Data Structure And Algorithms",
  //       "Debugging",
  //     ],
  //     employer_logo:
  //       "https://res.cloudinary.com/kalibre-ai/image/upload/v1690885218/b2c%20images/company_active_yktqaj.png",
  //     preferred_requirements:
  //       "A front-end web developer is probably what most people think of as a “web developer”. A front-end web developer is responsible for implementing visual elements that users see and interact with in a web application. They are usually supported by back-end web developers, who are responsible for server-side application logic and integration of the work front-end developers do. Writing a good job description and a corresponding job ad requires proper separation of concerns. Posting a generic web developer job description in your ad when you are looking for an advanced front-end web developer, will bring numerous applications from people who are specialized in building back-end web services, or web designers who have absolutely no knowledge about programming.There are technologies and knowledge that are common to all web developer jobs. This article will provide you with a sample front-end web developer job description that will help you write a perfect job ad and assure that you easily find and hire the person that matches your specific criteria.",
  //   };
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
        {/* <Grid container mt={7.5}> */}
        {/* <Grid container gap={30}> */}

          {/* <Grid xs={3} mt={6}>
          
           
            <Stack
              sx={{ cursor: "pointer" }}
              onClick={() => router.push("/")}
              direction={"row"}
              spacing={1}
              mb={4}
              alignItems={"center"}
            >
              <Icon icon="gg:arrow-left-o" style={{ fontSize: "32px" }} />
              <Typography variant="h6"> Back to jobs search</Typography>
            </Stack>

            <Stack direction={"column"} spacing={4}>
              {globalState?.job_list?.list?.map((data) => {
                console.log("jobsDescriptions", data);
                return data.total_exp_min &&
                  data.total_exp_max &&
                  data.relevant_exp &&
                  data.work_locations &&
                  data.salary_range_min &&
                  data.salary_range_max &&
                  data.pri_tech_skills_l &&
                  data.role_name ? (
                  <Card
                    sx={{ cursor: "pointer" }}
                    onClick={() => handleClick(data.id)}
                  >
                    <CardHeader
                      title={
                        data.job_title ? (
                          <Typography
                            variant="h6"
                            sx={{ fontWeight: 700, cursor: "pointer" }}
                          >
                            {data.job_title}
                          </Typography>
                        ) : (
                          <Skeleton
                            variant="rectangle"
                            width={"240px"}
                          ></Skeleton>
                        )
                      }
                     
                    />
                    <JobsCardContent
                      job_title={data.job_title}
                      datePostedOn={data.datePostedOn}
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
                ) : null;
              })}
            </Stack>
           
          </Grid> */}
          {/* <Grid xs={8}> */}
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
                    Apply
                  </Button>
                </Box>
                {/* <Stack spacing={1.9} justifyContent={"center"}> */}
                {/* {job?.total_exp?.[1] != null && (
                  <>
                    <Box>
                      <Stack
                        direction="row"
                        spacing={1}
                        display={"flex"}
                        alignItems={"center"}
                      >
                        <WorkOutlineOutlinedIcon
                          sx={{ color: "#bcbbbb", fontSize: "1.3rem" }}
                        />
                        <Typography className="job-detail-subtitle">
                          Experience
                        </Typography>
                      </Stack>
                      <Typography
                        className="job-detail-information"
                        paddingLeft={3.6}
                        pt={0.7}
                      >
                        {job?.total_exp[0] != null && job?.total_exp[0]} -{" "}
                        {job?.total_exp[1] != null && job?.total_exp[1]} yrs -{" "}
                        {job?.job_title} (
                        {job?.relevant_exp && job?.relevant_exp} yrs)
                      </Typography>
                    </Box>
                  </>
                )} */}

                {/* {job?.work_locations?.length > 0 && (
                  <WorkLocations jobData={job} />
                )}

                {job?.salary_range_min != null &&
                  job?.salary_range_max != null && (
                    <>
                      <Box>
                        <Stack
                          direction="row"
                          spacing={0.8}
                          display={"flex"}
                          alignItems={"center"}
                        >
                          <LocalAtmOutlinedIcon sx={{ color: "#bcbbbb" }} />
                          <Typography className="job-detail-subtitle">
                            Pay
                          </Typography>
                        </Stack>
                        <Typography
                          pl={3.8}
                          pt={0.67}
                          className="job-detail-information"
                        >
                          {job?.salary_range_min &&
                            job?.salary_range_min / 100000}{" "}
                          LPA-
                          {job?.salary_range_max &&
                            job?.salary_range_max / 100000}{" "}
                          LPA
                        </Typography>
                      </Box>
                    </>
                  )}
                <Box width="100%">
                  {job?.pri_tech_skills_l?.length > 0 && (
                    <PrimaryTechSkills jobData={job} />
                  )}
                </Box> */}

                {/* <Divider sx={{ marginTop: "24px" }} /> */}
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
                      // className="job-list-title"
                      sx={theme.job_list_title}
                      variant="h6"
                    >
                      Minimum Requirements:
                    </Typography>
                  </Box>

                  <MinimumRequirements jobData={job} />

                  <Box mt={3}>
                    <Typography
                      // lassName="job-list-title"
                      sx={theme.job_list_title}
                      mb="16px"
                    >
                      Preferred Requirements:
                    </Typography>
                  </Box>

                  <PrefferedRequirements jobData={job} />

                  <Box mt={3}>
                    <Typography
                      // className="job-list-title"
                      sx={theme.job_list_title}
                      mb="16px"
                    >
                      Responsibilities:
                    </Typography>
                  </Box>

                  <Responsibilities jobData={job} />
                </Box>
              ) : null}
              {/* </Stack> */}
            </Card>

            
          {/* </Grid> */}
        {/* </Grid> */}

        {job &&
              !job?.minimum_requirements &&
              !job?.preferred_requirements &&
              !job?.responsibilities && (
                
                <Grid container gap={3} mt={12} >
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
                          <Card sx={{width:"100%"}}>
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
              )
              }

      </Box>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000}
        open={openSnackbar}
        onClose={() => {
          setOpenSnackbar(false);
        }}
        // message="Successfully submited"
        key={"top+horizontal"}
      >
         <Alert
    severity="success"
    variant="filled"
    sx={{ width: '100%', fontSize:"22px" , display:"flex", justifyContent:"center", alignItems:"center"}}
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
