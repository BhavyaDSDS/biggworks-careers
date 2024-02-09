"use client";

import Protected from "@/components/auth/Protected";
import { MyContext } from "@/context/ContextProvider";
import { Box, Button, Typography } from "@mui/material";
import { useCallback, useContext, useEffect, useReducer } from "react";
import { getOnboardingPages, signOut } from "../api/ApiHandlers";
import OnboardingPage from "@/components/onboard/OnboardingPage";
import { intialData, onboardingReducer } from "@/hooks/OnboardingReducer";
import { LOADING_SUCCESS } from "@/constants/TextConstants";

function Onbording() {
  const { globalState, dispatch } = useContext(MyContext);

  const [onBoardState, onBoardDispatch] = useReducer(
    onboardingReducer,
    intialData
  );

  //get information from localstorage
  const localStorageInfo = localStorage.getItem("info");
  // parsing the information
  const userInfo = JSON.parse(localStorageInfo);

  const getOnboardData = useCallback(async () => {
    //preparing data for backend
    const tempData = {
      phone_number: userInfo?.phone_number,
      user_id: userInfo?.user_id,
      onboarddatas: {
        onboarding_page_num: 0,
        fields: {},
      },
    };

    const response = await getOnboardingPages(tempData, dispatch);

    let temp = {
      type: "pageNum",
      // payload: response.redirect_onboard_page,
      payload: 0,
    };

    onBoardDispatch(temp);
  }, [userInfo]);

  useEffect(() => {
    getOnboardData();
  }, []);

  console.log("asd global data geting ====", globalState.onbordingQuestions);
  console.log("zzz onboard data geting ====", onBoardState);

  return (
    <>
      {/* <Box>
        <OnboardingPage
          pageData={
            globalState?.onbordingQuestions?.list[onBoardState?.pageNum]
          }
          pageNum={onBoardState?.pageNum}
          onBoardDispatch={onBoardDispatch}
        />
      </Box> */}
    </>
  );
}

export default Protected(Onbording);

{
  /* <Button
          onClick={() => {
            signOut(dispatch);
          }}
        >
          Logout
        </Button> */
}
