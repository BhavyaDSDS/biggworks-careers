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
import { getDifferenceInDate, isEmptyObject } from "@/utils/CustomFunctions";
import ResponsiveChips from "../commons/ResponsiveChips";
import { APPLY_BUTTON_STRING } from "@/constants/TextConstants";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { useCallback, useState } from "react";
import LocationView from "./LocationView";

function JobCard(props) {
  const {
    
    job_title,
    employer_logo,
    employer_name,
    posted_on,
    b2c_work_locations,
    pri_tech_skills_raw,
    application_link,
    employer_highlights,
  } = props;

  const datePostedOn = getDifferenceInDate(posted_on);

  const [isHoverd, setIsHovered] = useState(false);
  // console.log("date highlights =====", employer_highlights);

  //apply job
  const applyJob = useCallback((url) => {
    window.open(url, "_blank");
  }, []);

  return (
    <>
      <Card
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardHeader
          avatar={<CompanyAvatar url={employer_logo} />}
          title={
            <Typography variant="h6" sx={{ fontWeight: 500 }}>
              {job_title}
            </Typography>
          }
          subheader={
            <Typography variant="subtitle1">{employer_name}</Typography>
          }
          action={<Typography variant="secondary">{datePostedOn}</Typography>}
        />
        <CardContent>
          <Box sx={{ width: "90%", marginLeft: "55px" }}>
            <Stack direction="column" spacing={1}>
            <LocationView list={b2c_work_locations} />
            <ResponsiveChips list={pri_tech_skills_raw} />
            </Stack>
          </Box>
        </CardContent>
        <Divider />
        <CardActions>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ width: "100%" }}
          >
            <Box sx={{ marginLeft: "60px" }}>
              <Stack
                direction="row"
                divider={<span>•</span>}
                spacing={1}
                alignItems="center"
              >
                {!isEmptyObject(employer_highlights) &&
                  Object.values(employer_highlights)?.map((data, idx) => {
                    return (
                      <Box key={idx}>
                        <Typography variant="subtitle1">
                          {data && data}
                        </Typography>
                      </Box>
                    );
                  })}
              </Stack>
            </Box>
            <Box>
              <Button
                variant={isHoverd ? "contained" : ""}
                endIcon={<ArrowRightAltIcon />}
                onClick={() => {
                  applyJob(application_link?.[0]);
                }}
              >
                {APPLY_BUTTON_STRING}
              </Button>
            </Box>
          </Stack>
        </CardActions>
      </Card>
    </>
  );
}

export default JobCard;
