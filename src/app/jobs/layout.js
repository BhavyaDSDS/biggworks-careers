import JobDescription from "@/components/aboutJobs/JobDescription";
import JobListCard from "@/components/aboutJobs/JobListCard";
import { Grid } from "@mui/material";

export default function RootLayout({ children }) {
  return (
    <>
      <div >
        <Grid container sx={{gap:{xl:28}}}> 
        <Grid xs={0} md={4} xl={3} sx={{display:{xs:"none", md:"block"}}}>
        <JobListCard />
        </Grid>
        <Grid xs={12} md={5} xl={6}>
        {children}
        </Grid>
        </Grid>
      </div>
    </>
  );
}
