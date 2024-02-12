import React from 'react'

function JobContent() {
  return (
    <div>  <Box sx={{ padding: "22px", border:"1px solid gray" }}>
    <Box>
      <img
        src="https://res.cloudinary.com/kalibre-ai/image/upload/v1690885218/b2c%20images/company_active_yktqaj.png"
        alt=""
      />
    </Box>

    <Typography variant="h5" fontWeight={900}>
      {job?.job_title}
    </Typography>
    
    <Stack spacing={1.9} justifyContent={"center"}>
      {job?.total_exp?.[1] != null && (
        <>
          <Box>
            <Stack
              direction="row"
              spacing={1}
              display={"flex"}
              alignItems={"center"}
            >
              <WorkOutlineOutlinedIcon
                sx={{ color: "#bcbbbb", fontSize: "1.3rem" }}
              />
              <Typography className="job-detail-subtitle">
                Experience
              </Typography>
            </Stack>
            <Typography
              className="job-detail-information"
              paddingLeft={3.6}
              pt={0.7}
            >
              {job?.total_exp[0] != null && job?.total_exp[0]} -{" "}
              {job?.total_exp[1] != null && job?.total_exp[1]} yrs -{" "}
              {job?.job_title} (
              {job?.relevant_exp && job?.relevant_exp} yrs)
            </Typography>
          </Box>
        </>
      )}

      {job?.work_locations?.length > 0 && <WorkLocations jobData={job} />}

      {job?.salary_range_min != null &&
        job?.salary_range_max != null && (
          <>
            <Box>
              <Stack
                direction="row"
                spacing={0.8}
                display={"flex"}
                alignItems={"center"}
              >
                <LocalAtmOutlinedIcon sx={{ color: "#bcbbbb" }} />
                <Typography className="job-detail-subtitle">
                  Pay
                </Typography>
              </Stack>
              <Typography
                pl={3.8}
                pt={0.67}
                className="job-detail-information"
              >
                {job?.salary_range_min &&
                  job?.salary_range_min / 100000}{" "}
                LPA-
                {job?.salary_range_max &&
                  job?.salary_range_max / 100000}{" "}
                LPA
              </Typography>
            </Box>
          </>
        )}
      <Box width="100%">
        {job?.pri_tech_skills_l?.length > 0 && (
          <PrimaryTechSkills jobData={job} />
        )}
      </Box>
      <Divider sx={{ marginTop: "24px" }} />
      <Box>
        <Typography
          mt={3}
          // className="regarding-job"
          sx={theme.regarding_job}
          pb="12px"
        >
          Regarding This Position
        </Typography>
      </Box>
      <Box>
        <Typography
          mt={2}
          // className="job-list-title"
          sx={theme.job_list_title}
        >
          Minimum Requirements:
        </Typography>
      </Box>

      <MinimumRequirements jobData={job} />

      <Box mt={3}>
        <Typography
          c
          // lassName="job-list-title"
          sx={theme.job_list_title}
          mb="16px"
        >
          Preferred Requirements:
        </Typography>
      </Box>

      <PrefferedRequirements jobData={job} />

      <Box mt={3}>
        <Typography
          // className="job-list-title"
          sx={theme.job_list_title}
          mb="16px"
        >
          Responsibilities:
        </Typography>
      </Box>

      <Responsibilities jobData={job} />
    </Stack>
  </Box>
   </div>
  )
}

export default JobContent