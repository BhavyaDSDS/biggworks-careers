import {
  Box,
  CardContent,
  CardHeader,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import LocationView from "./LocationView";
import ResponsiveChips from "../commons/ResponsiveChips";
import { floatToInteger, convertToLack } from "@/utils/CustomFunctions";
import { Icon } from "@iconify/react";
function JobsCardContent({
  job_title,
  datePostedOn,
  total_exp_min,
  total_exp_max,
  relevant_exp,
  work_locations,
  salary_range_min,
  salary_range_max,
  pri_tech_skills_l,
  role_name,
}) {
  console.log("total_exp_mintotal_exp_min", work_locations);
  return (
    <div>
      <CardContent sx={{ padding: "0px 20px" }}>
        <Box sx={{ width: "90%" }}>
          <Stack direction="column" spacing={1}>
            {total_exp_max && floatToInteger(total_exp_max) ? (
              <Stack direction={"row"} spacing={1} alignItems={"center"}>
                <Icon
                  icon="fluent:briefcase-24-regular"
                  style={{ fontSize: "22px" }}
                />
                <Stack>
                  <Typography>
                    {floatToInteger(total_exp_min)} -{" "}
                    {floatToInteger(total_exp_max)} yrs -{" "}
                    {`${role_name}${
                      relevant_exp && floatToInteger(relevant_exp)
                        ? `(${floatToInteger(relevant_exp)}yrs)`
                        : ""
                    }`}
                  </Typography>
                </Stack>
              </Stack>
            ) : null}
            {work_locations !== null && (
              <Stack
                direction={"row"}
                spacing={1}
                flexWrap={"nowrap"}
              >
                {/* <LocationView list={work_locations} /> */}
                <ResponsiveChips list={work_locations} type={"location"} />
              </Stack>
            )}
            {salary_range_min &&
            floatToInteger(salary_range_min) &&
            salary_range_max &&
            floatToInteger(salary_range_max) ? (
              <Stack direction={"row"} spacing={1} alignItems={"center"}>
                <Icon
                  icon="fluent:money-24-regular"
                  style={{ fontSize: "22px" }}
                />
                <Typography>
                  {convertToLack(salary_range_min)} LPA -{" "}
                  {convertToLack(salary_range_max)} LPA
                </Typography>
              </Stack>
            ) : null}
            <ResponsiveChips list={pri_tech_skills_l} />
          </Stack>
        </Box>
      </CardContent>
    </div>
  );
}

export default JobsCardContent;
