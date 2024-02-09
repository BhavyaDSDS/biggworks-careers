import { Typography, Tooltip, Box, Chip, Stack } from "@mui/material";
import React, { useState, useCallback, useEffect } from "react";
import IntegrationInstructionsOutlinedIcon from "@mui/icons-material/IntegrationInstructionsOutlined"; // skills
import { useTheme } from "@mui/system";

function PrimaryTechSkills({ jobData }) {
  const [resultantArr, setResultantArr] = useState([]);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const theme = useTheme();

  const handleContainerResize = useCallback(() => {
    const bigContainer = document?.querySelector(".big-container");
    const containerWidth = bigContainer?.offsetWidth;

    let totalDivWidth = 0;
    let resultArr = [];

    jobData?.pri_tech_skills_l?.forEach((div) => {
      let wdth = (div?.length + 4) * 7.5;
      // console.log("wdth", wdth);
      totalDivWidth += wdth;
      if (totalDivWidth < containerWidth) {
        resultArr.push(div);
      }
    });
    setResultantArr(resultArr);
    // console.log("resultArrresultArr", resultArr);
  }, [jobData?.pri_tech_skills_l, resultantArr]);

  useEffect(() => {
    // Call the handleContainerResize function on window resize
    window.addEventListener("resize", handleContainerResize);

    // Initial call to handleContainerResize to set the initial state
    handleContainerResize();

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

  return (
    <div
      // className="big-container"
      style={{ width: "100%", whiteSpace: "nowrap", }}
    >
      <Stack direction="row" spacing={1} display={"flex"} alignItems={"center"}>
        <IntegrationInstructionsOutlinedIcon
          sx={{ color: "#bcbbbb" }} // Adjust the marginRight to your preference
        />
        <Typography 
        // className="job-detail-subtitle"
        sx={theme.job_detail_subtitle}
        >Skill</Typography>
      </Stack>
      <Stack
        direction="row"
        spacing={0.7}
        display={"flex"}
        alignItems={"center"}
        pl={3.8}
        pt={1}
        width="309px"

      >
        {resultantArr?.map((item, index) => {
          // console.log("element", item);
          return (
            <Chip
              // className="skill-chips"
              sx={theme.skill_chips}
              key={index}
              label={item}
              onMouseEnter={handleChipMouseEnter}
              onMouseLeave={handleChipMouseLeave}
              onTouchStart={handleChipTouchStart}
              onTouchEnd={handleChipTouchEnd}
            />
            //   {item}
            // </Chip>
          );
        })}
        {jobData?.pri_tech_skills_l?.length - resultantArr?.length > 0 && (
          <Tooltip
            title={
              <Box>
                {jobData?.pri_tech_skills_l &&
                  jobData?.pri_tech_skills_l?.map((skill, index) => (
                    <Chip key={index} label={skill} 
                    // className="skill-chips"
                    sx={theme.skill_chips}
                     />
                  ))}
              </Box>
            }
            open={tooltipOpen}
            disableHoverListener
            disableTouchListener
            placement="top"
            PopperProps={{
              sx: {
                "& .MuiTooltip-tooltip": {
                  backgroundColor: "white",
                  padding: "18px",
                  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                  color: "black",
                  borderRadius: "10px",
                  width:"75%",
                },
              },
            }}
          >
            <Chip
              // className="skill-chips"
              sx={theme.skill_chips}
              label={`+${
                jobData?.pri_tech_skills_l?.length - resultantArr?.length
              }`}
              onMouseEnter={handleChipMouseEnter}
              onMouseLeave={handleChipMouseLeave}
              onTouchStart={handleChipTouchStart}
              onTouchEnd={handleChipTouchEnd}
            />
          </Tooltip>
        )}
      </Stack>
    </div>
  );
}

export default PrimaryTechSkills;
