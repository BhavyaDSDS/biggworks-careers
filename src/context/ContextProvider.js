"use client";

import { getFilters, getJobs } from "@/app/api/ApiHandlers";
import { JOBS_PATH, LOADING_INIT } from "@/constants/TextConstants";
import { createContext, useEffect, useReducer } from "react";

export const MyContext = createContext();

const INTIAL_STATE = {
  job_list: {
    list: [],
    nextPath: null,
    prevPath: null,
    loading: LOADING_INIT,
  },
  filters: {
    list: [],
    loading: LOADING_INIT,
  },
  selectedFilters: {},
  otpErrorStatus: null,
  isAuthenticated: false,
  onbordingQuestions: {
    list: [],
    loading: LOADING_INIT,
  },
};

const globalReducer = (state, action) => {
  switch (action.type) {
    case "jobs":
      return {
        ...state,
        job_list: action.payload,
      };
    case "filters":
      return {
        ...state,
        filters: action.payload,
      };
    case "selected_filter":
      return {
        ...state,
        selectedFilters: action.payload,
      };
    case "otpErrorStatus":
      return {
        ...state,
        otpErrorStatus: action.payload,
      };
    case "auth":
      return {
        ...state,
        isAuthenticated: action.payload,
      };

    case "onbordingQuestions":
      return {
        ...state,
        onbordingQuestions: action.payload,
      };
    default:
      return state;
  }
};

function ContextProvider({ children }) {
  const [globalState, dispatch] = useReducer(globalReducer, INTIAL_STATE);

  useEffect(() => {
    // getJobs(JOBS_PATH, dispatch);
    getFilters(dispatch);
    // console.log("qqq calling =")
  }, []);

  return (
    <div>
      <MyContext.Provider
        value={{
          globalState,
          dispatch,
        }}
      >
        {children}
      </MyContext.Provider>
    </div>
  );
}

export default ContextProvider;
