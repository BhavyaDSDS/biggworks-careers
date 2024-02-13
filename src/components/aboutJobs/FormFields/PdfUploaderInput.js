"use client";

import { Box, LinearProgress, Stack, Typography } from "@mui/material";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import React, { useCallback, useState } from "react";
import api from "@/utils/HttpCommons";
import { S3_BUCKET_NAME, S3_FOLDER_NAME, S3_PERMISION_METHOD } from "@/constants/TextConstants";
import { getFileSize } from "@/utils/CustomFunctions";
import axios from "axios";
import { useTheme } from "@emotion/react";

function PdfUploaderInput(props) {
  const { label, name, onChange,error } = props;

  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState(true);
  const [selectedFile, setSelectedFile] = useState();


  const theme = useTheme();


  const handleUpload = useCallback(async (selectedFile) => {
    if (selectedFile) {
      let newFilename = selectedFile?.name?.trim()?.replace(/\s+/g, "");
      newFilename = newFilename.replace(/[^a-zA-Z0-9.]/g, "");

      let info = {
        resume: `${S3_FOLDER_NAME}${newFilename}`,
        resume_parsed_status: "parsed",
        uploaded_by: "self",
        bucket_name: S3_BUCKET_NAME,
        obj_method: S3_PERMISION_METHOD,
        file_name: `${S3_FOLDER_NAME}${newFilename}`,
      };

      try {
        const response = await api.post("candidates/presignedurl", info);

        const url = response?.data?.url;
        let totalSize = selectedFile.size;

        const res = await axios.put(url, selectedFile, {
          headers: {
            "Content-Type": selectedFile.type,
          },
          onUploadProgress: (event) => {
            let progress = (event.loaded / totalSize) * 100;
            setUploadProgress(parseInt(progress.toFixed(0)));
          },
        });

        if (res.status === 200) {
          setUploadStatus(true);
          console.log("resresresres", res.data);
          onChange(response?.data?.resume);

          let temp = {
            name: selectedFile?.name,
            size: selectedFile?.size,
            progress: 100,
          };

          console.log("final check ===", temp);

          //   updateOnbordingData(temp, fullData, setOnbording);
        } else {
          setUploadStatus(false);
        }
      } catch (error) {
        console.log("Error uploading file :", error);
      }

      // console.log("file name ====", response);
    }
  }, [name]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    // console.log("pppp getting the file ====", file);
    if (file) {
      setSelectedFile(file);
      handleUpload(file);
    }
  };

  console.log("selectedFileselectedFile", selectedFile);
  return (
    <Box>
      <Typography variant="body2">{label}</Typography>
      <Box>
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          style={{ display: "none" }}
          id="file-input"
        />

        {selectedFile?.name ? (
          <Box
            sx={{
              border: "1px solid gray",
              padding: "10px",
              borderRadius: "14px",
              textAlign: "center",
              width: "70%",
              cursor: "pointer",
            }}
          >
            <Stack direction="column" justifyContent="space-between">
              <Stack direction="row" spacing={1.5}>
                <InsertDriveFileIcon
                  sx={{
                    fontSize: 15,
                    color: `${uploadStatus ? "#353535" : "#c92519"}`,
                  }}
                />

                <Box>
                  {!uploadStatus && (
                    <Typography variant="subtitle1" sx={{ color: "#c92519" }}>
                      Failed
                    </Typography>
                  )}
                  <Typography
                    variant="subtitle2"
                    sx={{
                      color: `${uploadStatus ? "#353535" : "#c92519"}`,
                      textAlign: "start",
                    }}
                  >
                    {selectedFile?.name}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "#a5a3a0", textAlign: "left" }}
                  >
                    {getFileSize(selectedFile?.size)}
                  </Typography>
                </Box>

                <Box>
                  {uploadStatus && uploadProgress == 100 ? (
                    <CheckCircleIcon
                      sx={{ fontSize: 23, color: "#50c878", cursor: "pointer" }}
                    />
                  ) : uploadStatus === false ? (
                    <DeleteIcon
                      sx={{ fontSize: 23, color: "#c92519", cursor: "pointer" }}
                      onClick={(e) => {
                        setSelectedFile(null);
                      }}
                    />
                  ) : null}
                </Box>
              </Stack>

              {selectedFile.name != null && uploadProgress === 100 ? (
                <label htmlFor="file-input">
                  <Box
                    sx={{
                      textAlign: "center",
                      width: "30%",
                      minWidth: "150px",
                      cursor: "pointer",
                    }}
                  >
                    <Typography variant="subtitle1" sx={{ color: "#2196f3" }}>
                      Click to edit
                    </Typography>
                  </Box>
                </label>
              ) : (
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <LinearProgress
                    variant="determinate"
                    value={uploadProgress}
                    sx={{
                      height: 7,
                      borderRadius: 6,
                      width: "83%",
                      "& .MuiLinearProgress-bar": {
                        backgroundColor:
                          uploadProgress < 100 ? "#2196f3" : "#50c878",
                        borderRadius: 6,
                        height: 7,
                      },
                    }}
                  />

                  <Typography>{`${uploadProgress} %`}</Typography>
                </Stack>
              )}

              <Box>
                {uploadStatus && uploadProgress == 100 ? // /> //   sx={{ fontSize: 23, color: "#50c878", cursor: "pointer" }} // <CheckCircleIcon
                null : uploadStatus === false ? (
                  <DeleteIcon
                    sx={{ fontSize: 23, color: "#c92519", cursor: "pointer" }}
                    onClick={(e) => {
                      setSelectedFile(null);
                    }}
                  />
                ) : null}
              </Box>
            </Stack>
          </Box>
        ) : (
          <Box>
            <label htmlFor="file-input">
              <Box
                sx={{
                  border: "1px dashed gray",
                  padding: "10px",
                  borderRadius: "14px",
                  textAlign: "center",
                  width: "70%",
                  cursor: "pointer",
                }}
              >
                <Stack
                  direction="row"
                  spacing={2}
                  justifyContent="left"
                  alignItems="center"
                >
                  <UploadFileOutlinedIcon sx={{ fontSize: 25 }} />
                  <Typography variant="subtitle1" sx={{ color: "#3ca3f4" }}>
                    Click to upload
                  </Typography>
                </Stack>
              </Box>
            </label>
          </Box>
        )}
      </Box>
      {Boolean(error)&&<Typography sx={theme.errorMessage} color="rgb(215,64,64)">{error}</Typography>}

    </Box>
  );
}

export default PdfUploaderInput;
