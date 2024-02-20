

//api paths
export const JOBS_PATH = "search/jobs/?application_from=self&created_by__exclude=42"
export const FILTERS_PATH = "b2c/filters"
export const ONBOARDING_QUETIONS = "candidates/getcandonboard"

//api status
export const LOADING_INIT = "init"
export const LOADING_PENDING = "pending"
export const LOADING_SUCCESS = "success"


export const CLEAR_BUTTON_STRING = "Clear"
export const RESET_BUTTON_STRING = "Reset"
export const APPLY_BUTTON_STRING = "Apply"
export const VIEW_STRING = "View"
export const CANCEL_BUTTON_STRING = "Cancel"
export const SHOW_MORE_BUTTON_STRING = "Show more"
export const CONTINUE_BUTTON_STRING = "Continue"
export const BACK_BUTTON_STRING = "Back"

export const ROLE_API = "search/roles/?";
export const SKILL_API = "/search/skill/?skill_type=t";
export const LOCATION_API = "search/location/?"

export const S3_BUCKET_NAME = "brain-merit-storage";
export const S3_PERMISION_METHOD = "put_object";
export const S3_FOLDER_NAME = "dev/"

export const exp = [
    {
      value: 1,
      label: "1yrs",
    },
    {
      value: 15,
      label: "15yrs",
    },
  
    {
      value: 30,
      label: "30yrs",
    },
  ];
  
  export const lpa = [
    {
      value: 1,
      label: "1 Lpa",
    },
    {
      value: 30,
      label: "30Lpa",
    },
    {
      value: 60,
      label: "60Lpa",
    },
    {
      value: 100,
      label: "100Lpa",
    },
  ];
  
  export const npOptions = [
    {
      label: "07 Days",
      value: 7,
    },
    {
      label: "15 Days",
      value: 15,
    },
    {
      label: "30 Days",
      value: 30,
    },
    {
      label: "45 Days",
      value: 45,
    },
    {
      label: "60 Days",
      value: 60,
    },
    {
      label: "90 Days",
      value: 90,
    },
  ]
  
  export const negotiableOptions = [
    {
      name: "Non-negotiable",
      value: "Non-negotiable",
    },
    {
      name: "07 Days",
      value: 7,
    },
    {
      name: "15 Days",
      value: 15,
    },
    {
      name: "30 Days",
      value: 30,
    },
    {
      name: "45 Days",
      value: 45,
    },
    {
      name: "60 Days",
      value: 60,
    },
    {
      name: "90 Days",
      value: 90,
    },
  ]