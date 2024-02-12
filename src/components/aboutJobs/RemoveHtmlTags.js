import { Typography } from "@mui/material";
import React from "react";
import { useTheme } from "@mui/system";

function RemoveHtmlTags(props) {
  const { requirement } = props;
  const theme = useTheme();

  function removeHTMLTags(html) {
    // Create a temporary div element
    var tempDiv = document.createElement("div");
    // Set the HTML content of the div with your input HTML
    tempDiv.innerHTML = html;
    // Get the text content of the div (which excludes HTML tags)
    return tempDiv.textContent || tempDiv.innerText || "";
  }

  // Example usage:
  var htmlContent = requirement;
  var plainText = removeHTMLTags(htmlContent);
  console.log("htmlContenthtmlContent", plainText); // Output: "This is rich text content."
  return (
    <div>
      <Typography whiteSpace="pre-line" sx={theme.job_list_sub_title}>
        {" "}
        {plainText}
      </Typography>
    </div>
  );
}

export default RemoveHtmlTags;
