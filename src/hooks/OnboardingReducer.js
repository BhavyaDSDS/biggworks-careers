import { LOADING_INIT } from "@/constants/TextConstants";

export const intialData = {
  loading: LOADING_INIT,
  pageNum: 0,
  fields: {},
};

export const onboardingReducer = (state, action) => {
  switch (action.type) {
    case "pageNum":
      return {
        ...state,
        pageNum: action.payload,
      };
    case "pageNumAndLoading":
      return {
        ...state,
        pageNum: action.payload.pageNumb,
        loading: action.payload.loading,
      };

    default:
      return state;
  }
};
