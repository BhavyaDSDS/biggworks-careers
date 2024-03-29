import { createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: "Google Sans, sans-serif",
    htmlFontSize: 14,
    color: "#222222",

    h1: {
      fontSize: "2.5rem",
      fontWeight: "600",
      lineHeight: "1.2",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: "500",
      lineHeight: "1.25",
    },

    h3: {
      fontSize: "1.75rem",
      fontWeight: "500",
      lineHeight: "1.3",
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: "400",
      lineHeight: "1.35",
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: "500",
      lineHeight: "1.4",
    },
    h6: {
      fontSize: "1.3rem",
      fontWeight: "500",
      lineHeight: "1.5",
    },
    subtitle1: {
      fontSize: "1rem",
      fontWeight: "400",
      lineHeight: "1.5",
    },
    subtitle2: {
      fontSize: "0.875rem",
      fontWeight: "500",
      lineHeight: "1.4",
    },
    body1: {
      fontSize: "1rem",
      fontWeight: "400",
      lineHeight: "1.5",
    },
    body2: {
      fontSize: "0.875rem",
      fontWeight: "400",
      lineHeight: "1.43",
    },
    button: {
      fontSize: "0.875rem",
      fontWeight: "500",
      textTransform: "uppercase",
      letterSpacing: "0.025em",
    },
    caption: {
      fontSize: "0.75rem",
      lineHeight: "1.66",
    },
    overline: {
      fontSize: "0.75rem",
      fontWeight: "600",
      textTransform: "uppercase",
      letterSpacing: "0.1em",
    },
    secondary: {
      fontSize: "0.875rem",
      fontWeight: "400",
      lineHeight: "1.4",
      color: "rgba(0, 0, 0, 0.45)",
    },
  },
  job_detail_subtitle: {
    fontSize: "15px",
    fontWeight: 400,
    color: "#6B6F76",
    letterSpacing: "0.5px",
  },

  skill_chips:{
    backgroundColor:"#e4f7ff",
    border:"1px solid #96d1ff", 
    color:"#6fa9ff"
  },
  job_list_title: {
    fontSize: "16px",
    fontWeight: 600,
    color: "#343434",
    letterSpacing: "0.5px",
  },
  job_list_sub_title: {
    fontSize: "15px",
    fontWeight: 400,
    color: "#787878",
    letterSpacing: "0.5px",
  },
  job_detail_subtitle: {
    fontSize: "15px",
    fontWeight: 400,
    color: "#6B6F76",
    letterSpacing: "0.5px",
  },
  job_detail_information: {
    fontSize: "15px",
    fontWeight: 500,
    color: "#3C4149",
    letterSpacing: "0.5px",
  },

  location_chips:{
    backgroundColor:"rgba(217, 217, 217, 0.3)",
    border:"1px solid #ececec"
  },
  jobDescription_outline: {},

  apply_button: {},

  modal_card: {
    position: "absolute",
    top: "15%",
    left: "36%",
    width: "600px",
    padding:"22px",
    maxHeight: { xs: "60vh", sm: "calc(77vh)" },
    overflow: "auto",
    scrollBehavior: "smooth",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  errorMessage: {
    fontSize: "12px",
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "capitalize",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px",
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: "rgba(0, 0, 0, 0.05)",
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: "#ffffff",
          padding: "16px",
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          color: "#222222 !important",
          borderRadius: "8px",
        },
      },
    },
  },
});

export default theme;
