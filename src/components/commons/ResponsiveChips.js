"use client";

import { isArrayIterable } from "@/utils/CustomFunctions";
import { Box, Chip, Stack, Tooltip, Typography, useTheme } from "@mui/material";
import { Icon } from "@iconify/react";
import { useCallback, useEffect, useRef, useState } from "react";
import theme from "../../theme/theme";

function ResponsiveChips({ list, type }) {
  console.log("location chips list ", list);

  const [visibleChips, setVisibleChips] = useState([]);
  const [hiddenChips, setHiddenChips] = useState([]);
  const theme = useTheme();
  const containerRef = useRef(null);

  const calculateEffectiveWidth = useCallback(
    (string) => {
      console.log("effective width", string);
      const fontSize = theme.typography.fontSize; // Font size from your CSS
      const averageCharWidth = fontSize * 0.6; // Adjust as needed
      const horizontalPadding = 15; // 9px on each side
      const margin = 4; // Add border width if applicable

      let textWidth = string?.length * averageCharWidth;
      const effectiveWidth = textWidth + horizontalPadding + margin;
      return parseFloat(effectiveWidth.toFixed(1));
    },
    [containerRef]
  );

  const handleContainerResize = useCallback(() => {
    // const containerWidth = document.querySelector(".responsiveContainer");
    // const currentContainerWidth = containerWidth.offsetWidth;
    const containerWidth = containerRef.current;
    const currentContainerWidth = containerWidth.offsetWidth;

    // console.log("ddd widht ===", currentContainerWidth);
    let totalWidth = 0;
    let visibleChipsArray = [];
    let hiddenChipsArray = [];
    if (type === "location") {
      for (let i = 0; i < list?.length; i++) {
        let temp = list[i];
        const chipWidth =
          temp?.work_type?.length * 20 +
          calculateEffectiveWidth(temp?.location_l);

        console.log(
          "chips width for location ",
          chipWidth,
          currentContainerWidth
        );

        if (totalWidth + chipWidth <= currentContainerWidth) {
          visibleChipsArray.push(temp);
          totalWidth += chipWidth;
        } else {
          hiddenChipsArray.push(temp);
        }
      }
    } else {
      for (let i = 0; i < list?.length; i++) {
        const chipWidth = calculateEffectiveWidth(list[i]);

        if (totalWidth + chipWidth <= currentContainerWidth) {
          visibleChipsArray.push(list[i]);
          totalWidth += chipWidth;
        } else {
          hiddenChipsArray.push(list[i]);
        }
      }
    }

    setVisibleChips(visibleChipsArray);
    setHiddenChips(hiddenChipsArray);
  }, [list, calculateEffectiveWidth, containerRef, type]);

  useEffect(() => {
    window.addEventListener("resize", handleContainerResize);

    handleContainerResize();

    return () => {
      window.removeEventListener("resize", handleContainerResize);
    };
  }, [handleContainerResize]);

  const office = "fluent:building-24-regular";
  const hybrid = "fluent:building-home-16-regular";
  const remote = "fluent:home-16-regular";

  return (
    <div className="responsiveContainer" ref={containerRef}>
      <Stack direction={"row"} spacing={1} alignItems={"center"}>
        {type === "location" ? (
          <Icon
            icon="fluent:location-24-regular"
            style={{ fontSize: "22px" }}
          />
        ) : (
          <Icon
            icon="fluent:window-wrench-24-regular"
            style={{ fontSize: "22px" }}
          />
        )}
        <Stack direction="row" spacing={0.5}>
          {visibleChips?.map((data, idx) => {
            console.log("return type chips", data);

            return type === "location" ? (
              <Chip
                sx={theme.location_chips}
                key={idx}
                label={
                  <Stack direction={"row"} spacing={0} alignItems={"center"}>
                    {data?.work_type?.map((item) => {
                      return item === "office" ? (
                        <Icon icon={office} />
                      ) : item === "hybrid" ? (
                        <Icon icon={hybrid} />
                      ) : (
                        <Icon icon={remote} />
                      );
                    })}
                    <Typography>{data?.location_l}</Typography>
                  </Stack>
                }
                variant="outlined"
                size="small"
              />
            ) : (
              <Chip
                sx={theme.skill_chips}
                key={idx}
                label={data}
                variant="outlined"
                size="small"
              />
            );
          })}

          <Tooltip
            placement="top"
            title={
              <Box>
                <Stack direction="row" flexWrap="wrap" gap={0.5}>
                  {hiddenChips?.map((data, idx) =>
                    type === "location" ? (
                      <Chip
                        sx={theme.location_chips}
                        key={idx}
                        label={
                          <Stack
                            direction={"row"}
                            spacing={0}
                            alignItems={"center"}
                          >
                            {data?.work_type?.map((item) => {
                              return item === "office" ? (
                                <Icon icon={office} />
                              ) : item === "hybrid" ? (
                                <Icon icon={hybrid} />
                              ) : (
                                <Icon icon={remote} />
                              );
                            })}
                            <Typography>{data?.location_l}</Typography>
                          </Stack>
                        }
                        variant="outlined"
                        size="small"
                      />
                    ) : (
                      <Chip
                        sx={theme.skill_chips}
                        key={idx}
                        label={data}
                        variant="outlined"
                        size="small"
                      />
                    )
                  )}
                </Stack>
              </Box>
            }
          >
            {isArrayIterable(hiddenChips) && (
              <Chip
                sx={
                  type === "location" ? theme.location_chips : theme.skill_chips
                }
                label={` + ${hiddenChips.length}`}
                variant="outlined"
                size="small"
              />
            )}
          </Tooltip>
        </Stack>
      </Stack>
    </div>
  );
}

export default ResponsiveChips;
