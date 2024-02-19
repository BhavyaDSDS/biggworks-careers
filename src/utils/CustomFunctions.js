import { JOBS_PATH } from "@/constants/TextConstants";
import { Stack } from "@mui/material";
import dayjs from "dayjs";

//make a queary of nextPath and prevPath for pages
export const formateQueary = (url) => {
  if (url) {
    const urlPath = new URL(url);
    const path = urlPath?.pathname + urlPath?.search;
    return path;
  }

  return url;
};

// getting the  diffrence  based on current date
export const getDifferenceInDate = (date) => {
  if (date) {
    const today = dayjs();
    const postedOn = dayjs(date, "YYYY-MM-DD");
    const diffInDays = today.diff(postedOn, "days");

    if (diffInDays === 0) {
      return "today";
    } else if (diffInDays === 1) {
      return "1 day ago";
    } else if (diffInDays === 2) {
      return "2 days ago";
    } else if (diffInDays <= 30) {
      return `${diffInDays} days ago`;
    } else if (diffInDays <= 365) {
      const diffInMonths = Math.floor(diffInDays / 30);
      return `${diffInMonths} month${diffInMonths > 1 ? "s ago" : " ago"}`;
    } else {
      const diffInYears = Math.floor(diffInDays / 365);
      return `${diffInYears} year${diffInYears > 1 ? "s ago" : " ago"}`;
    }
  }
};

//check array length
export const isArrayIterable = (list) => {
  if (list?.length > 0) {
    return true;
  } else {
    return false;
  }
};

//check object is empty
export const isEmptyObject = (obj) => {
  return Object.keys(obj).length === 0;
};

//this function take flag code and return
export const getFlagEmoji = (countryCode) => {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
};

export let INTIAL_SELECTED_FILTERS = {};

//selected object  keys created
export const createSelectedObject = (list) => {
  let tempObj = {};

  if (list) {
    list?.forEach((data) => {
      if (data.type == "checkbox") {
        tempObj[data?.value] = [];
      } else {
        tempObj[data?.slider_data?.min_key] = data?.slider_data?.min;
        tempObj[data?.slider_data?.max_key] = data?.slider_data?.max;
      }
    });

    //  console.log("object key getting ===",tempObj)
    INTIAL_SELECTED_FILTERS = { ...tempObj };
    return tempObj;
  }
};

//creating the queary
export const createQuary = (selectedFiltersList) => {
  //setting the key of selectedFilterslist object
  const selectedKeys = Object?.keys(selectedFiltersList);

  //Initialize the url
  let url = JOBS_PATH;

  // Flag to keep track if it's the first query parameter
  let isFirstQueryParam = true;

  //looping through the selected keys
  if (Array.isArray(selectedKeys) && selectedKeys != undefined) {
    selectedKeys?.forEach((key) => {
      //get the values assosiate with the key
      const values = selectedFiltersList?.[key];

      //check if it is an array and it has values
      if (Array?.isArray(values) && values?.length > 0) {
        // If it's the first query parameter, append "/?" followed by key__in=values
        // Otherwise, append "&" followed by key__in=values
        if (isFirstQueryParam) {
          url += `/?${key}=${values.join("__")}`;
          isFirstQueryParam = false;
        } else {
          url += `&${key}=${values.join("__")}`;
        }
      }
      // Check if values is not an array and is not null or undefined
      else if (
        !Array.isArray(values) &&
        values !== null &&
        values !== undefined
      ) {
        // If it's the first query parameter, append "/?" followed by key__in=values
        // Otherwise, append "&" followed by key=values
        if (isFirstQueryParam) {
          url += `&${key}=${values}`;
          console.log("isFirstQueryParamisFirstQueryParam", url);
          isFirstQueryParam = false;
        } else {
          url += `&${key}=${values}`;
        }
      }
    });
  }

  // console.log("qqq quary ====",url)

  return url;
};

//this fuction will take arrayOfObject and  selected value and move to first indext of array
export const moveToFirstIndex = (array, selected) => {
  let tempArray = [...array];

  // Find the index of the object with the specified value
  let indexOfObject = array?.findIndex((obj) => obj.value === selected);

  // Check if the object exists in the array
  if (indexOfObject !== -1) {
    // Remove the object from its current position
    let removedObject = tempArray?.splice(indexOfObject, 1)[0];

    // Add the object to the first position
    tempArray?.unshift(removedObject);
  }

  // console.log("first value ===",tempArray);
  return tempArray;
};

//creating the relaventexp option based on total exp
export const createOptions = (num) => {
  const options = [];

  for (let i = 1; i <= num; i += 0.5) {
    const option = {
      name: `${i} years`,
      value: i,
    };

    options.push(option);
  }

  return options;
};

//validating particular field
export const isDisplayError = (name, required, globalError, message) => {
  if (required) {
    if (Array.isArray(name)) {
      if ((!isEmptyArray(name) && globalError) || message != null) {
        return true;
      }
    } else {
      if ((name === null && globalError) || message != null) {
        return true;
      }
    }
  } else {
    return false;
  }
};

//calcaleting  file size
export const getFileSize = (bytes) => {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

  if (bytes === 0) return "0 Byte";

  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));

  return Math.round(100 * (bytes / Math.pow(1024, i))) / 100 + " " + sizes[i];
};

//genareating the time slots
export const generateTimeOptions = () => {
  const times = [];

  // Get the current time
  const currentTime24Hr = dayjs().format("HH:mm");

  for (let i = 0; i < 24; i++) {
    for (let j = 0; j < 60; j += 30) {
      const time = dayjs().hour(i).minute(j);
      const value = time.format("HH:mm"); // 24-hour format
      const label = time.format("hh:mm A"); // 12-hour format with AM/PM
      times.push({ value, label });
    }
  }

  //get the current time index
  const startIndex = times.findIndex((option) => {
    let value = option.value.split(":");
    let current = currentTime24Hr.split(":");
    return value[0] === current[0];
  });

  // get current time to 0th index
  if (startIndex !== -1) {
    const part1 = times.slice(startIndex);
    const part2 = times.slice(0, startIndex);
    const circularTimes = [...part1, ...part2];

    return circularTimes;
  }

  return times;
};

// making the readable slot
export const makeReadableFormate = (data) => {
  return (
    <Stack direction="row" spacing={1}>
      <span>{dayjs(data?.dateObject).format("DD MMM")},</span>
      <span>{data?.time?.[0]} </span>
      <span>-</span>
      <span>{data?.time?.[1]} </span>
    </Stack>
  );
};

function convert12To24(time, from12To24 = true) {
  if (from12To24) {
    return dayjs(time, "hh:mm A").format("HH:mm");
  } else {
    return dayjs(time, "HH:mm").format("hh:mm A");
  }
}

export const floatToInteger = (data) => {
  return data / 1;
};

export const convertToLack = (number) => {
  return number / 100000;
};

export const LimitedJobDetail = (array) => {
  let tempArray = [];

  array?.forEach((data) => {
    if (
      data.total_exp_min &&
      data.total_exp_max &&
      data.relevant_exp &&
      data.work_locations &&
      data.salary_range_min &&
      data.salary_range_max &&
      data.pri_tech_skills_l &&
      data.role_name &&
      tempArray.length < 5
    ) {
      if (tempArray.length < 5) {
        tempArray.push(data);
      }
    }
    return tempArray;
  });
}



export const formateOnboardValues = (values) => {
  console.log("values to modified", values);
  let copyValues = { ...values };

  if (copyValues?.current_location) {
    copyValues.current_location = copyValues?.current_location?.value;
  }
  if (copyValues?.current_role) {
    copyValues.current_role = copyValues?.current_role?.value;
  }

  if (isArrayIterable(copyValues.p_tech_skills)) {
    copyValues.p_tech_skills = copyValues?.p_tech_skills?.map(
      (data) => data.value
    );
  }
  if (copyValues?.phone_number) {
    copyValues.phone_number = `+91${copyValues?.phone_number}`;
  }

  if (copyValues?.date_of_joining) {
    copyValues.date_of_joining = dayjs(copyValues?.date_of_joining).format(
      "YYYY-MM-DD"
    );
  }
  copyValues.expected_ctc=copyValues?.expected_ctc*100000
  copyValues.current_ctc=copyValues?.current_ctc*100000

  if (copyValues?.availablity_for_interview?.length > 0) {
    let tempData = copyValues?.availablity_for_interview?.map((data) => {
      return {
        date: data.date,
        dateObject: data.dateObject,
        id: data.id,
        time: [convert12To24(data.time[0]), convert12To24(data.time[1])],
      };
    });


    copyValues.availablity_for_interview = tempData;
  }

  // copyValues?.delete(copyValues?.name)
  // copyValues?.delete(copyValues?.relevant_experience)
  delete copyValues?.name;

  console.log("values to modified 1", copyValues);

  return copyValues;
};
