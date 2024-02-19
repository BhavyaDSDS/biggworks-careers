"use client";

import { getFlagEmoji, isArrayIterable } from "@/utils/CustomFunctions";
import { Box, Chip, Divider, Stack, Typography } from "@mui/material";
import { Icon } from "@iconify/react";
import theme from "@/theme/theme";
import { useCallback, useEffect, useState } from "react";
const office = "fluent:building-24-regular";
const hybrid = "fluent:building-home-16-regular";
const remote = "fluent:home-16-regular";



const WorkType = ({ kind }) => {
  console.log("kindkind", kind);
  const global ="global"
  return (
    <>
      <Stack direction="row" spacing={5}>
        {kind === "office" ? (
          <Typography>
            <Icon icon={office} />
          </Typography>
        ) : kind === "hybrid" ? (
          <Typography>
            <Icon icon={hybrid} />
          </Typography>
        ) : (
          <Typography>
            <Icon icon={remote} />
          </Typography>
        )}
      </Stack>
    </>
  );
};



const CityData = ({ city }) => {
  
 

  console.log("city?.location_lcity?.location_l", city?.location_l)
  return (
    <>
    <div className="responsiveContainer" >
      <Stack direction={"row"} spacing={30} flexWrap={"wrap"}>
        {/* {isArrayIterable(city) &&
          city?.map((data, idx) => {
            console.log("datadata****", data);
            return ( */}
        <Chip
          variant="outlined"
          size="small"
          label={
            <Stack direction="row" spacing={0.3} justifyContent={"center"} alignItems={"center"}>
              {city?.work_type.map((data) => {
                console.log("worktypeworktype", data.length);
                return <WorkType kind={data} />;
              })}
              <Typography>{city?.location_l}</Typography>
            </Stack>
          }
        />
        {/* );
          })} */}
      </Stack>
      </div>
    </>
  );
};

function LocationView({ list }) {
  console.log("location list =====", list);

  return (
    <Box>
      <Stack direction="row" spacing={1} alignItems="center" useFlexGap flexWrap={"wrap"}>
        {isArrayIterable(list) &&
          list?.map((data, idx) => {
            // console.log("location list =====", data);

            return (
              <Box key={idx}>
                <Stack direction="row" spacing={1} alignItems="center">
                  {/* <Typography variant="h5">
                    {getFlagEmoji(data?.country_flag)}
                  </Typography> */}
                  <CityData city={data} />
                </Stack>
              </Box>
            );
          })}
      </Stack>
    </Box>
  );
}

export default LocationView;
