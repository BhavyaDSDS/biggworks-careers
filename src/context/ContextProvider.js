"use client";

import { getFilters, getJobs, getLocations, getRoles, getSkills } from "@/app/api/ApiHandlers";
import { JOBS_PATH, LOADING_INIT, LOCATION_API, ROLE_API, SKILL_API } from "@/constants/TextConstants";
import React, { createContext, useEffect, useReducer } from "react";
import { formateQueary } from "@/utils/CustomFunctions";

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

const BEGINNING_STATE = {
  roles: {
    list: [],
    nextPath: null,
  },
  skills: {
    list: [],
    nextPath: null,
  },
  locations: {
    list: [],
    nextPath: null,
  },
};

const globalJobFormReducer = (state, action) => {
  switch (action.type) {
    case "roles":
      return {
        ...state,
        roles: action.payload,
      };
    case "skills":
      return {
        ...state,
        skills: action.payload,
      };
    case "locations":
      return {
        ...state,
        locations: action.payload,
      };
    default:
      return state;
  }
};
const globalReducer = (state, action) => {
  console.log("statestatestatestate", state)
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
  const [globalJobFormState, globalJobFormDispatch] = useReducer(globalJobFormReducer, BEGINNING_STATE)
  useEffect(() => {
    // getJobs(JOBS_PATH, dispatch);
    getFilters(dispatch);
    // console.log("qqq calling =")
    getAllRole(ROLE_API);
    getAllSkills(SKILL_API);
    getAllLocations(LOCATION_API);
  }, []);

 

  const getAllRole = async (url) => {
    try {
      const response = await getRoles(url);
      console.log("responseresponseresponse", response)
      const data = {
        list: response.results,
        nextPath: formateQueary(response.next),
      };
      // console.log("getting data =====",data)
      dispatch({ type: "roles", payload: data });
    } catch (error) {
      console.log("Error from getAllRole", error);
    }
  };

  const getAllSkills = async (url) => {
    try {
      const response = await getSkills(url);
      const data = {
        list: response.results,
        nextPath: formateQueary(response.next),
      };
      // console.log("getting data =====",data)
      dispatch({ type: "skills", payload: data });
    } catch (error) {
      console.log("Error from getAllSkills", error);
    }
  };

  const getAllLocations = async (url) => {
    try {
      const response = await getLocations(url);
      const data = {
        list: response.results,
        nextPath: formateQueary(response.next),
      };
      // console.log("getting data =====",data)
      dispatch({ type: "skills", payload: data });
    } catch (error) {
      console.log("Error from getAllSkills", error);
    }
  };


  
  return (
    <div>
      <MyContext.Provider
        value={{
          globalState,
          dispatch,
          globalJobFormState,
          globalJobFormDispatch
        }}
      >
        {children}
     
      </MyContext.Provider>
    </div>
  );
}

export default ContextProvider;
