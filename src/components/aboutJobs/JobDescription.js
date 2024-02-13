import {
    AppBar,
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Stack,
  Toolbar,
  Typography,
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

function JobDescription(props) {
  const { job } = props;
  const [jobModalOpen, setJobModalOpen] = useState(false)

  const handleOpenModal = () =>{
    setJobModalOpen(true);
  }

  const handleCloseModal = () =>{
    setJobModalOpen(false)
  }
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

  console.log("Job***", job);
  return (
    <div>
      <Box width={"69%"} margin={auto}>
      <Box marginBottom={12}>
        <Navbar/>
        </Box>
        <Grid container>
         
          <Grid xs={7} >
            <Box sx={{ padding: "22px", border:"1px solid gray" }}>
              <Box sx={{display:"flex", justifyContent:"space-between"}}>
                <img
                  src="https://res.cloudinary.com/kalibre-ai/image/upload/v1690885218/b2c%20images/company_active_yktqaj.png"
                  alt=""
                />
                <Button onClick={handleOpenModal} >Apply</Button>
                {
                  jobModalOpen && (<JobForm jobModalOpen={jobModalOpen}
                    handleOpenModal={handleOpenModal}
                    handleCloseModal={handleCloseModal}

                  />)
                }
              </Box>

              <Typography variant="h5" fontWeight={900}>
                {job?.job_title}
              </Typography>

              <Stack spacing={1.9} justifyContent={"center"}>
                {job?.total_exp?.[1] != null && (
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
                )}

                {job?.work_locations?.length > 0 && <WorkLocations jobData={job} />}

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
                </Box>
                <Divider sx={{ marginTop: "24px" }} />
                <Box>
                  <Typography
                    mt={3}
                    // className="regarding-job"
                    sx={theme.regarding_job}
                    pb="12px"
                  >
                    Regarding This Position
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    mt={2}
                    // className="job-list-title"
                    sx={theme.job_list_title}
                  >
                    Minimum Requirements:
                  </Typography>
                </Box>

                <MinimumRequirements jobData={job} />

                <Box mt={3}>
                  <Typography
                    c
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
              </Stack>
            </Box>
             
          </Grid>
          <Grid xs={3} >
            
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default JobDescription;
