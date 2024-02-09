import { JOBS_PATH } from "@/constants/TextConstants";
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

export let INTIAL_SELECTED_FILTERS = {}

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
    INTIAL_SELECTED_FILTERS = {...tempObj}
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
          url += `/?${key}=${values}`;
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
