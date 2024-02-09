import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import DOMPurify from "dompurify";
import { useTheme } from "@mui/system";

const PrefferedRequirements = ({ jobData }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const theme = useTheme();

  const sanitizedHTML = DOMPurify.sanitize(jobData?.preferred_requirements);
  console.log("preferred_requirements", DOMPurify.sanitize(jobData?.preferred_requirements))
  // Function to parse HTML and apply conditions
  const parseAndFormatHTML = (htmlString, expanded) => {
    const tempDivElement = document.createElement("div");
    tempDivElement.innerHTML = htmlString;

    const pTag = tempDivElement.querySelector("p");
    const liTags = tempDivElement.querySelectorAll("li");
    const theme = useTheme();

    let formattedContent = "";

    if (pTag) {
      formattedContent = expanded
        ? pTag.textContent
        : pTag.textContent.slice(0, 303);
    } else if (liTags.length) {
      const limit = expanded ? liTags.length : 3;
      for (let i = 0; i < liTags.length && i < limit; i++) {
        formattedContent += `• ${liTags[i].textContent}\n`;
      }
    }

    return formattedContent;
  };

  const displayContent = parseAndFormatHTML(sanitizedHTML, isExpanded);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  // console.log("displayContentdisplayContentPrefferedRequirements", sanitizedHTML.length)

  return (
    <Box mt={1}>
      <Typography 
      // className="job-list-sub-title"
      sx={theme.job_list_sub_title}
       whiteSpace="pre-line">
        {sanitizedHTML}
      </Typography>
      {/* {(sanitizedHTML.length > 303 ||
        jobData?.preferred_requirements?.includes("<li>")) && (
        <Box
          onClick={toggleReadMore}
          sx={{
            textDecoration: "underline",
            marginTop: "16px",
            textAlign: "right",
            cursor: "pointer",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Typography 
          // className="job-list-title"
          sx={theme.job_list_title}
          >
          {isExpanded ? 'Read Less' : 'Read More'}
          </Typography>
        </Box>
      )} */}
    </Box>
  );
};

export default PrefferedRequirements;
