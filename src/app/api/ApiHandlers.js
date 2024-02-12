import {
  FILTERS_PATH,
  LOADING_PENDING,
  LOADING_SUCCESS,
  ONBOARDING_QUETIONS,
} from "@/constants/TextConstants";
import { createSelectedObject, formateQueary } from "@/utils/CustomFunctions";
import {
  createCode,
  consumeCode,
  resendCode,
} from "supertokens-web-js/recipe/passwordless";
import Session from "supertokens-web-js/recipe/session";

import api from "@/utils/HttpCommons";

//get all jobs
export const getJobs = async (url, dispatch) => {
  try {
    let inti = {
      list: [],
      nextPath: null,
      prevPath: null,
      loading: LOADING_PENDING,
    };

    dispatch({ type: "jobs", payload: inti });

    const response = await api.get(url);
    // console.log("asd respose ====", response.data);

    const data = {
      list: response?.data?.results,
      nextPath: formateQueary(response?.data?.next),
      prevPath: formateQueary(response?.data?.previous),
      loading: LOADING_SUCCESS,
    };

    dispatch({ type: "jobs", payload: data });

    return response.data;
  } catch (error) {
    console.log("Error from getJobs : ", error);
  }
};

//get all Filters
export const getFilters = async (dispatch) => {
  try {
    let inti = {
      list: [],
      loading: LOADING_PENDING,
    };

    dispatch({ type: "filters", payload: inti });

    const response = await api.get(FILTERS_PATH);
    // console.log("asd respose ====", response.data);

    const data = {
      list: response?.data,
      loading: LOADING_SUCCESS,
    };

    let selectedFilterList = createSelectedObject(response?.data);

    dispatch({ type: "filters", payload: data });
    dispatch({ type: "selected_filter", payload: selectedFilterList });

    return response.data;
  } catch (error) {
    console.log("Error from getJobs : ", error);
  }
};

//send phone number to backend
export const sendPhoneNumber = async (postData) => {
  try {
    const response = await createCode(postData);
    const result = await response.data;
    return result;
  } catch (error) {
    console.log("Error from sendPhoneNumber :", error);
  }
};

//resend the phonenumber to backend
export const resendPhoneNumber = async () => {
  try {
    const response = await resendCode();
    return response;
  } catch (error) {
    console.log("Error from resendPhoneNumber :", error);
  }
};

//send otp to backend
export const sendOtp = async (postData, dispatch) => {
  try {
    const response = await consumeCode(postData);

    if (response?.status == "OK") {
      const userInfo = {
        phone_number: response?.phone_number,
        user_id: response?.user_id,
      };

      localStorage.setItem("info", JSON.stringify(userInfo));

      dispatch({ type: "auth", payload: true });

      return true;
    } else {
      if (response?.status === "INCORRECT_USER_INPUT_CODE_ERROR") {
        let tempData = {
          type: "otpErrorStatus",
          payload:
            "Wrong OTP! Please try again,Number of attempts left :" +
            (response?.maximumCodeInputAttempts -
              response?.failedCodeInputAttemptCount),
        };

        dispatch(tempData);
      } else if (response?.status === "EXPIRED_USER_INPUT_CODE_ERROR") {
        let tempData = {
          type: "otpErrorStatus",
          payload: "Invalid OTP. Generate a new one and retry",
        };

        dispatch(tempData);
      } else {
        let tempData = {
          type: "otpErrorStatus",
          payload: "Login failed. Please try again",
        };

        dispatch(tempData);
      }

      return false;
    }
  } catch (error) {
    console.log("Error from sendOtp :", error);
  }
};

//logout the session
export const signOut = async (dispatch) => {
  try {
    await Session.signOut();
    localStorage.removeItem("info");

    dispatch({ type: "auth", payload: false });
  } catch (error) {
    console.log("Error from signOut :", error);
  }
};

//getOnboarding data
export const getOnboardingPages = async (data, dispatch) => {
  try {
    let inti = {
      list: [],
      loading: LOADING_PENDING,
    };
    dispatch({ type: "onbordingQuestions", payload: inti });

    const response = await api.put(
      "onboarding/updateuserdetail/candidate",
      data
    );

    let onBoardQuestions = {
      list: response?.data?.onboardingpages,
      loading: LOADING_SUCCESS,
    };

    dispatch({ type: "onbordingQuestions", payload: onBoardQuestions });

    return response.data;
  } catch (error) {
    console.log("Error from getOnboardingPages :", error);
  }
};


//get job by id
export const getJobByID = async (id) => {
  try {
    const response = await api.get(`jobs/vt/${id}`);
    console.log("ResponseResponse",response )
    return response.data;
  } catch (error) {
    console.log("Error from getJobByID: ", error);
  }
};