"use client";

import FiltersSkeleton from "@/components/jobsPage/FiltersSkeleton";
import FiltersLayout from "@/components/jobsPage/FiltersLayout";
import JobCard from "@/components/jobsPage/JobCard";
import JobCardSkeleton from "@/components/jobsPage/JobCardSkeleton";
import { LOADING_SUCCESS } from "@/constants/TextConstants";
import { MyContext } from "@/context/ContextProvider";
import {
  createQuary,
  isArrayIterable,
  isEmptyObject,
} from "@/utils/CustomFunctions";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { getJobs } from "./api/ApiHandlers";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ResultNotFound from "@/components/jobsPage/ResultNotFound";
import Navbar from "../components/Navbar";

function Home() {
  const { globalState, dispatch } = useContext(MyContext);

  // console.log("api data =======",  === 0);

  useEffect(() => {
    let quary = createQuary(globalState.selectedFilters);

    if (!isEmptyObject(globalState.selectedFilters)) {
      getJobs(quary, dispatch);
    }
  }, [globalState.selectedFilters]);

  return (
    <Box>
      <Container
        maxWidth="xl"
        sx={{ marginTop: "50px", marginBottom: "150px" }}
      >
        <Box marginBottom={22}>
          <Navbar />
        </Box>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={12} md={4} lg={3.5} xl={3.5}>
            {globalState?.filters?.loading != LOADING_SUCCESS ? (
              <FiltersSkeleton />
            ) : (
              <FiltersLayout />
            )}
          </Grid>
          <Grid item xs={12} sm={12} md={8} lg={8.5} xl={8.5}>
            <Stack direction="column" spacing={4}>
              {globalState?.job_list?.loading != LOADING_SUCCESS ? (
                <>
                  {Array.from({ length: 20 }).map((_, index) => (
                    <JobCardSkeleton key={index} />
                  ))}
                </>
              ) : globalState?.job_list?.list?.length === 0 ? (
                <ResultNotFound />
              ) : (
                <>
                  {globalState?.job_list?.list?.map((data) => (
                   
                    <JobCard {...data} key={data?.id} />
                  ))}
                </>
              )}
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ marginTop: "30px" }}
            >
              <Button
                variant="outlined"
                startIcon={<NavigateBeforeIcon />}
                disabled={!globalState?.job_list?.prevPath}
                onClick={() => {
                  getJobs(globalState?.job_list?.prevPath, dispatch);
                }}
              >
                Previous
              </Button>
              <Button
                variant="outlined"
                endIcon={<NavigateNextIcon />}
                disabled={!globalState?.job_list?.nextPath}
                onClick={() => {
                  getJobs(globalState?.job_list?.nextPath, dispatch);
                }}
              >
                Next
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Home;
