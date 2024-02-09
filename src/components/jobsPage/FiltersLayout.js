"use client";

import { CLEAR_BUTTON_STRING } from "@/constants/TextConstants";
import { MyContext } from "@/context/ContextProvider";
import {
  INTIAL_SELECTED_FILTERS,
  isArrayIterable,
} from "@/utils/CustomFunctions";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Stack,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import FilterCheckBox from "./FilterCheckBox";
import TuneIcon from "@mui/icons-material/Tune";

const LargeScreenFilterCardStyle = {
  display: {
    xs: "none",
    sm: "none",
    md: "block",
    lg: "block",
    xl: "block",
  },
};

const SmallScreenFilterCardStyle = {
  display: {
    xs: "block",
    sm: "block",
    md: "none",
    lg: "none",
    xl: "none", 
  },
};

function FiltersLayout() {
  const { globalState, dispatch } = useContext(MyContext);

  const [showClearBtn, setShowClearBtn] = useState(false);

  useEffect(() => {
    const isChanged =
      JSON.stringify(globalState.selectedFilters) !=
      JSON.stringify(INTIAL_SELECTED_FILTERS);

    setShowClearBtn(isChanged);
  }, [globalState.selectedFilters]);

  const resetSelectedFilters = () => {
    dispatch({ type: "selected_filter", payload: INTIAL_SELECTED_FILTERS });
  };

  return (
    <>
      <Card sx={LargeScreenFilterCardStyle}>
        <CardHeader
          title="Filters"
          action={
            <>
              {showClearBtn && (
                <Button onClick={resetSelectedFilters}>
                  {CLEAR_BUTTON_STRING}
                </Button>
              )}
            </>
          }
        />

        <Divider />

        <CardContent>
          {isArrayIterable(globalState?.filters?.list) &&
            globalState?.filters?.list?.map((data) => {
              if (data?.type === "checkbox") {
                return (
                  <Box sx={{ marginTop: "5px" }} key={data.id}>
                    <FilterCheckBox {...data} />
                  </Box>
                );
              } else {
              }
            })}
        </CardContent>
      </Card>

      <Card sx={SmallScreenFilterCardStyle}>
        <CardContent>
          <Stack
            direction="row"
            spacing={3}
            justifyContent="center"
            alignItems="center"
          >
            <Button size="small" variant="outlined">
              <TuneIcon />
            </Button>
            <Box
              sx={{
                overflow: "auto",
                "&::-webkit-scrollbar": {
                  display: "none",
                  position: "relative",
                },
              }}
            >
              <Stack direction="row" spacing={1.5}>
                {isArrayIterable(globalState?.filters?.list) &&
                  globalState?.filters?.list?.map((data) => {
                    return (
                      <Button
                        variant="outlined"
                        key={data.id}
                        sx={{ whiteSpace: "nowrap", minWidth: "100px" }}
                        size="small"
                      >
                        {data?.name}
                      </Button>
                    );
                  })}
              </Stack>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
}

export default FiltersLayout;
