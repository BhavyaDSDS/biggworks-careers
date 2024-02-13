"use Client";
import { getLocations, getRoles, getSkills } from "@/app/api/ApiHandlers";
import { MyContext } from "@/context/ContextProvider";
import { formateQueary } from "@/utils/CustomFunctions";
import { useTheme } from "@emotion/react";
import { Autocomplete, Stack, TextField, Typography } from "@mui/material";
import { useCallback, useContext, useEffect, useState } from "react";

function AutoCompleteInput(props) {
  const { onChange, ref, value, multiple, type, apiPath, error,label } = props;
  const { globalJobFormState, globalJobFormDispatch } = useContext(MyContext);
  const [isCalledApi, setIsCalledApi] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const apicalls = {
    roles: getRoles,
    skills: getSkills,
    locations: getLocations,
  };


  const theme = useTheme();

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      const cleanedInput = inputValue
        ?.replace(/[^a-zA-Z0-9]/g, "")
        ?.toLowerCase();

      if (inputValue === "") {
        setInputValue("");
        getMoreList(apiPath, false);
      } else {
        let path = `${apiPath}&value__wildcard=*${cleanedInput}*`;
        getMoreList(path, false);
      }
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [inputValue]);

  const getMoreList = useCallback(
    async (path, update = true) => {
      try {
        setIsCalledApi(true);
        //taking list from old list
        let tempList = [...globalJobFormState?.[type]?.list];
        //next path shuld be not null before calling the api
        if (path) {
          const response = await apicalls[type](path);
          //margin old list and new list
          const data = {
            list: update
              ? [...tempList, ...response.results]
              : response.results,
            nextPath: formateQueary(response.next),
          };
          globalJobFormDispatch({ type: type, payload: data });
        }
      } catch (error) {
        console.log("getMoreList function ===", error);
      } finally {
        setIsCalledApi(false);
      }
    },
    [globalJobFormState, type, apiPath]
  );

  const handleScroll = useCallback(
    async (e) => {
      const listboxNode = e.currentTarget;

      //this variable true when scroll comes to bottom
      const isCloseToBottom =
        listboxNode.scrollHeight -
          (listboxNode.scrollTop + listboxNode.clientHeight) <
        300;

      if (isCloseToBottom && !isCalledApi) {
        const urlPath = globalJobFormState?.[type]?.nextPath;
        getMoreList(urlPath);
      }
    },
    [isCalledApi, globalJobFormState, type]
  );

  const handleInputChange = (e, input) => {
    setInputValue(input);
  };

  return (
    <Stack direction="column">
      <Typography variant="body2">{label}</Typography>

      <Autocomplete
        multiple={multiple}
        limitTags={2}
        options={globalJobFormState?.[type]?.list || []}
        onChange={(_, data) => onChange(data)}
        getOptionLabel={(option) => option?.name || ""}
        ListboxProps={{
          onScroll: handleScroll,
        }}
        onInputChange={handleInputChange}
        renderInput={(params) => (
          <TextField
            {...params}
            inputRef={ref}
            value={value}
            error={Boolean(error)}
            helperText={
              error && <Typography sx={theme.errorMessage}>{error}</Typography>
            }
            size="small"
          />
        )}
      />
    </Stack>
  );
}

export default AutoCompleteInput;
