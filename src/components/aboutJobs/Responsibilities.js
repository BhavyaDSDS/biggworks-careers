import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import DOMPurify from "dompurify";
import { useTheme } from "@mui/system";
import RemoveHtmlTags from "./RemoveHtmlTags";

const Responsibilities = ({ jobData }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const theme = useTheme();

  // const sanitizedHTML = DOMPurify.sanitize(jobData?.responsibilities);
  // console.log("responsibilities", DOMPurify.sanitize(jobData?.responsibilities));
  // // Function to parse HTML and apply conditions
  // const parseAndFormatHTML = (htmlString, expanded) => {
  //   const tempDivElement = document.createElement("div");
  //   tempDivElement.innerHTML = htmlString;

  //   const pTag = tempDivElement.querySelector("p");
  //   const liTags = tempDivElement.querySelectorAll("li");

  //   let formattedContent = "";

  //   if (pTag) {
  //     formattedContent = expanded
  //       ? pTag.textContent
  //       : pTag.textContent.slice(0, 303);
  //   } else if (liTags.length) {
  //     const limit = expanded ? liTags.length : 3;
  //     for (let i = 0; i < liTags.length && i < limit; i++) {
  //       formattedContent += `• ${liTags[i].textContent}\n`;
  //     }
  //   }

  //   return formattedContent;
  // };

  // const displayContent = parseAndFormatHTML(sanitizedHTML, isExpanded);

  // const toggleReadMore = () => {
  //   setIsExpanded(!isExpanded);
  // };

  return (
    <Box mt={1}>
      {/* <Typography
        // className="job-list-sub-title"
        sx={theme.job_list_sub_title}
        whiteSpace="pre-line"
      >
        {sanitizedHTML}
      </Typography> */}

      <RemoveHtmlTags requirement={jobData?.responsibilities}/>
      {/* {(sanitizedHTML.length > 303 ||
        jobData?.responsibilities?.includes("<li>")) && (
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
            {isExpanded ? "Read Less" : "Read More"}
          </Typography>
        </Box>
      )} */}
    </Box>
  );
};

export default Responsibilities;
