import { Typography, Divider, Tooltip, Box, Stack } from "@mui/material";
import React, { useState, useCallback, useEffect } from "react";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined"; // location
import { useTheme } from "@mui/system";

function WorkLocations({ jobData }) {
  const [resultantArr, setResultantArr] = useState([]);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const theme = useTheme();

  const handleContainerResize = useCallback(() => {
    const bigContainer = document.querySelector(".big-container");
    const containerWidth = bigContainer.offsetWidth;

    let totalDivWidth = 0;
    let resultArr = [];

    jobData?.work_locations?.forEach((location) => {
      // Replace 'name' with the actual property you want to use from the object

      // console.log("locationlocation", location);
      let wdth =
        (location?.location_l?.length + location?.type.length + 4) * 5.8;
      totalDivWidth += wdth;
      if (totalDivWidth < containerWidth) {
        resultArr.push(location);
      }
    });
    setResultantArr(resultArr);
  }, [jobData?.work_locations]);

  useEffect(() => {
    // Initial call to handleContainerResize to set the initial state
    handleContainerResize();
    // Call the handleContainerResize function on window resize
    window.addEventListener("resize", handleContainerResize);

    // Remove the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleContainerResize);
    };
  }, []);

  const handleChipMouseEnter = () => {
    setTooltipOpen(true);
  };

  const handleChipMouseLeave = () => {
    setTooltipOpen(false);
  };

  const handleChipTouchStart = () => {
    setTooltipOpen(true);
  };

  const handleChipTouchEnd = () => {
    setTooltipOpen(false);
  };

  // console.log("jobDataWork_locations", jobData?.work_locations?.length);

  return (
    <div
      className="big-container"
      style={{ width: "68%", whiteSpace: "nowrap" }}
    >
      <Stack
        direction="row"
        spacing={0.6}
        display={"flex"}
        alignItems={"center"}
        onMouseEnter={handleChipMouseEnter}
        onMouseLeave={handleChipMouseLeave}
        onTouchStart={handleChipTouchStart}
        onTouchEnd={handleChipTouchEnd}
        pb={0.6}
      >
        <LocationOnOutlinedIcon sx={{ color: "#bcbbbb" }} />
        <Typography 
        // className="job-detail-subtitle"
        sx={theme.job_detail_subtitle}
        >
          Locations and work type
        </Typography>
      </Stack>
      {jobData?.work_locations?.length > 0 &&
        jobData?.work_locations?.map((loc) => {
          return (
            <Stack direction={"row"} spacing={0.4} pl={3.6} pt={0.1}>
              <Typography
                //  className="job-detail-information"
                sx={theme.job_detail_information}
              >
                {loc.location_l}
              </Typography>
              <Typography
                //  className="job-detail-information"
                sx={theme.job_detail_information}
              >
                {" "}
                •{" "}
              </Typography>
              <Typography
                // className="job-detail-subtitle"
                sx={theme.job_detail_subtitle}
              >
                {loc.type}
              </Typography>
            </Stack>
          );
        })}
    </div>
  );
}

export default WorkLocations;
