"use client";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import CompanyAvatar from "../commons/CompanyAvatar";
import {
  getDifferenceInDate,
  isEmptyObject,
  floatToInteger,
  converToLack,
} from "@/utils/CustomFunctions";
import ResponsiveChips from "../commons/ResponsiveChips";
import { APPLY_BUTTON_STRING, VIEW_STRING } from "@/constants/TextConstants";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { useCallback, useState } from "react";
import LocationView from "./LocationView";
import { useRouter } from "next/navigation";
import JobsCardContent from "./JobsCardContent";
function JobCard(props) {
  const {
    id,
    job_title,
    employer_logo,
    employer_name,
    posted_on,
    b2c_work_locations,
    pri_tech_skills_raw,
    application_link,
    employer_highlights,
    total_exp_min,
    total_exp_max,
    relevant_exp,
    role_name,
    work_locations,
    pri_tech_skills_l,
    salary_range_min,
    salary_range_max,
  } = props;

  const datePostedOn = getDifferenceInDate(posted_on);
  const [isHoverd, setIsHovered] = useState(false);
  // console.log("date highlights =====", employer_highlights);

  //apply job
  const applyJob = useCallback((url) => {
    window.open(url, "_blank");
  }, []);
  const router = useRouter();
  const handleClick = (id) => {
    // Your click handling logic goes here
    console.log("Typography clicked");
    router.push(`jobs/${id}`);
  };
  return (
    <>
      <Card>
        <CardHeader
          // avatar={<CompanyAvatar url={employer_logo} />}
          title={
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, cursor: "pointer" }}
            >
              {job_title}
            </Typography>
          }
          // subheader={
          //   <Typography variant="subtitle1">{employer_name}</Typography>
          // }
          action={<Typography variant="secondary">{datePostedOn}</Typography>}
        />
        <JobsCardContent
          job_title={job_title}
          datePostedOn={datePostedOn}
          total_exp_min={total_exp_min}
          total_exp_max={total_exp_max}
          relevant_exp={relevant_exp}
          work_locations={work_locations}
          salary_range_min={salary_range_min}
          salary_range_max={salary_range_max}
          pri_tech_skills_l={pri_tech_skills_l}
          role_name={role_name}
        />

        <Divider />
        <CardActions>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ width: "100%" }}
          >
            <Box sx={{ marginLeft: "20px", width: "100%" }}>
              {!isEmptyObject(employer_highlights) && (
                <ResponsiveChips
                  type="companyInfo"
                  list={Object.values(employer_highlights)}
                />
              )}
            </Box>
            <Box>
              <Button
                variant={isHoverd ? "contained" : ""}
                endIcon={<ArrowRightAltIcon />}
                //
                onClick={() => handleClick(id)}
                sx={{ cursor: "pointer" }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {VIEW_STRING}
              </Button>
            </Box>
          </Stack>
        </CardActions>
      </Card>
    </>
  );
}

export default JobCard;
