"use client";

import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Popover,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import dayjs from "dayjs";
import { useCallback } from "react";
import { generateTimeOptions, makeReadableFormate } from "@/utils/CustomFunctions";
import { useTheme } from "@emotion/react";

const intialContent = {
  // startTime: null,
  // endTime: null,
  date: null,
  dateObject: null,
  time : []
};

const intialErrorContent = {
  date: null,
  start: null,
  end: null,
};

function CardView(props) {
  const {
    close,
    options,
    cardContent,
    setCardContent,
    submit,
    errorMessage,
    setErrorMessage,
    editId,
    deleteSlot,
  } = props;

  const minAllowedDate = dayjs();

  console.log("asd getting date ===", cardContent);

  const handleChangeContent = useCallback(
    (key, data,position=0) => {
      let tempData = { ...cardContent };

      setErrorMessage({
        date: null,
        start: null,
        end: null,
      });

      if (key === "dateObject") {
        tempData.dateObject = data;
        tempData.date = dayjs(data).format("YYYY-MM-DD");
      } else {
        if (data) {
          console.log("qqq ttempData",tempData)
          tempData.time[position] = data.label;
        } else {
          tempData.time[position] = null
        }
      }
      setCardContent(tempData);
    },
    [cardContent]
  );

  
  return (
    <Box>
      <Card>
        <CardContent>
          <Stack direction="column" spacing={2}>
            <Stack direction="column" spacing={1}>
              <Stack direction="row" spacing={1}>
                <CalendarTodayIcon fontSize="small" />
                <Typography>Select Date</Typography>
              </Stack>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  minDate={minAllowedDate}
                  value={
                    cardContent.dateObject === null
                      ? null
                      : dayjs(cardContent.dateObject)
                  }
                  onChange={(e) => {
                    handleChangeContent("dateObject", e);
                  }}
                  slotProps={{
                    textField: {
                      helperText: (
                        <Typography variant="subtitle2" color="red">
                          {errorMessage.date}
                        </Typography>
                      ),
                      size: "small",
                    },
                  }}
                />
              </LocalizationProvider>
            </Stack>

            <Stack direction="row" spacing={1}>
              <AccessTimeIcon fontSize="small" />
              <Typography>Set Time</Typography>
            </Stack>
            <Stack direction="row" spacing={3}>
              <Autocomplete
                renderInput={(params) => (
                  <TextField
                    {...params}
                    hiddenLabel
                    variant="filled"
                    size="small"
                    placeholder="Start time"
                    sx={{ minWidth: "150px" }}
                    helperText={
                      <Typography variant="subtitle2" color="red">
                        {errorMessage.start}
                      </Typography>
                    }
                  />
                )}
                options={options}
                value={cardContent?.time?.[0]}
                onChange={(e, value) => {
                  handleChangeContent("time", value);
                }}
              />
              <Autocomplete
                renderInput={(params) => (
                  <TextField
                    {...params}
                    hiddenLabel
                    variant="filled"
                    size="small"
                    placeholder="End time"
                    sx={{ minWidth: "150px" }}
                    helperText={
                      <Typography variant="subtitle2" color="red">
                        {errorMessage.end}
                      </Typography>
                    }
                  />
                )}
                options={options}
                value={cardContent?.time?.[1]}
                onChange={(e, value) => {
                  handleChangeContent("time", value,1);
                }}
              />
            </Stack>
          </Stack>
        </CardContent>
        <Divider />
        <CardActions>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={1}
            sx={{ width: "100%" }}
          >
            <div>
              {editId && (
                <Button size="small" onClick={deleteSlot} sx={{ color: "red" }}>
                  Delete
                </Button>
              )}
            </div>

            <Stack direction="row" gap={1}>
              <Button size="small" onClick={close}>
                Cancel
              </Button>
              <Button size="small" variant="contained" onClick={submit}>
                Ok
              </Button>
            </Stack>
          </Stack>
        </CardActions>
      </Card>
    </Box>
  );
}






function Availability(props) {
  // const [availabelSlots, setAvailabelSlots] = useState([]);
  const { label,maxCount,error,name,state,onChange,value } = props


  const [anchorEl, setAnchorEl] = useState(null);
  const [timeOptions, setTimeOptions] = useState([]);
  const [cardContent, setCardContent] = useState();
  const [errorMessage, setErrorMessage] = useState(intialErrorContent);
  const [editId, setEditId] = useState(null);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const theme = useTheme();


  // console.log("available slot ===",value)

  const handleClick = (event, data) => {
    setAnchorEl(event.currentTarget);
    setCardContent(data);
    setErrorMessage(intialErrorContent);
    if (data.hasOwnProperty("id")) {
      setEditId(data.id);
    } else {
      setEditId(null);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    let genaratedOptions = generateTimeOptions();
    setTimeOptions(genaratedOptions);
  }, []);

//   console.log("sss getting list ===",onbording?.fields[name])

  const submit = useCallback(() => {
    let errorMessages = {};

    // Check each field and add error messages
    if (!cardContent?.dateObject) {
      errorMessages.date = "Required field!";
    } else {
      // Check if dateObject is today or in the future
      const currentDate = dayjs();
      const selectedDate = dayjs(cardContent.dateObject);

      if (selectedDate.isBefore(currentDate, "day")) {
        errorMessages.date = "Please select future date!";
      }
    }

    // console.log("qqq cardContent",cardContent.time[1])

    if (cardContent?.time[0] === undefined) {
      errorMessages.start = "Required field!";
    }

    if (cardContent?.time[1] === undefined) {
      errorMessages.end = "Required field!";
    } else {
      // Check if startTime and endTime are equal
      if (cardContent?.time[0] === cardContent?.time[1]) {
        errorMessages.end = "Different from start time!";
      }
    }

    // If there are no error messages, update another state
    if (Object.keys(errorMessages).length === 0) {

      if (editId) {
        let tempList = value.map((data) => {
          if (data.id === editId) {
            return cardContent;
          }
          return data;
        });

        onChange(tempList)


      } else {

        let tempList = [...value]

        let tempCardData = { ...cardContent };
        tempCardData.id = dayjs().valueOf();
        tempList.push(tempCardData);

        // updateOnbordingData(tempList,name,setOnbording)

        onChange(tempList)

        // setAvailabelSlots((prev) => {
        //   let temp = [...prev];
        //   let tempCardData = { ...cardContent };
        //   tempCardData.id = dayjs().valueOf();
        //   temp.push(tempCardData);
        //   return temp;
        // });




      }
      handleClose();
    //   setError(false)
    } else {
      // Set the error messages in state
      setErrorMessage(errorMessages);
    }
  }, [cardContent, editId,name,state]);



  const deleteSlot = useCallback(() => {
    let tempList = value?.filter((data) => data.id != editId);

    onChange(tempList)

    setAnchorEl(null);
  }, [editId,state,name]);

  return (
    <Box>
      <Typography variant="body2">{label}</Typography>

      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        {value?.map((data, idx) => {
          return (
            <Button
              key={idx}
              aria-describedby={id}
              variant="outlined"
              sx={{
                border: "1px solid #0d0e10",
                color: "#0d0e10",
                textTransform: "none",
                "&:hover": {
                  border: "1px solid #0d0e10",
                  color: "#0d0e10",
                },
              }}
              onClick={(e) => {
                handleClick(e, data);
              }}
            >
              {makeReadableFormate(data)}
            </Button>
          );
        })}

        {value?.length <= maxCount && (
          <Button
            aria-describedby={id}
            variant="outlined"
            sx={{
              border: "1px dashed #eaeaec",
              color: "#71717a",
              textTransform: "none",
              "&:hover": {
                border: "1px dashed #eaeaec",
                color: "#71717a",
              },
            }}
            onClick={(e) => {
              handleClick(e, {date: null,
                dateObject: null,
                time : []});
            }}
          >
            Add Slots
          </Button>
        )}
      </Stack>

      {Boolean(error)&&<Typography sx={theme.errorMessage} color="rgb(215,64,64)">{error}</Typography>}


      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        style={{ marginTop: "5px" }}
      >
        <CardView
          close={handleClose}
          options={timeOptions}
          cardContent={cardContent}
          setCardContent={setCardContent}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          submit={submit}
          editId={editId}
          deleteSlot={deleteSlot}
        />
      </Popover>
    </Box>
  );
}

export default Availability;
