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
  Skeleton,
} from "@mui/material";
import React, { useState } from "react";

import { useRouter } from "next/navigation";
import JobsCardContent from "../jobsPage/JobsCardContent";
import { Icon } from "@iconify/react";
import { useContext, useEffect } from "react";
import { MyContext } from "@/context/ContextProvider";
import { createQuary } from "@/utils/CustomFunctions";
import { JOBS_PATH } from "@/constants/TextConstants";
import { getJobs } from "@/app/api/ApiHandlers";
function JobListCard() {
  const router = useRouter();

  const { globalState, dispatch } = useContext(MyContext);

  const handleClick = (id) => {
    router.push(`${id}`);
  };

  useEffect(() => {
    getJobs(JOBS_PATH, dispatch);
  }, []);

  console.log("global state ========", globalState);

  return (
    <div>
      <Box sx={{ width: "500px", marginTop: "50px", marginLeft: "30px" }}>
        {/* <Grid container gap={6}>
        <Grid xs={3} mt={6}> */}
        {/* {globalState?.job_list?.loading != LOADING_SUCCESS ? (
              <> */}

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
          {globalState?.job_list?.loading == "pending"
            ? Array.from({ length: 7 })?.map((_, idx) => {
                return (
                  <Card key={`hjwehj${idx}`} sx={{ height: "200px", padding:"20px" }}>
                    <Skeleton animation={"wave"} height={30} />
                    <Skeleton animation={"wave"} height={30} />
                    <Skeleton animation={"wave"} height={30} />
                    <Skeleton animation={"wave"} height={30} />
                    <Skeleton animation={"wave"} height={30} />
                    <Skeleton animation={"wave"} height={30} />
                  </Card>
                );
              })
            : globalState?.job_list?.list?.map((data) => {
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
                      // avatar={<CompanyAvatar url={employer_logo} />}
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
        {/* </>
            ) : (
              ""
            )} */}
        {/* </Grid>
      </Grid> */}
      </Box>
    </div>
  );
}

export default JobListCard;
