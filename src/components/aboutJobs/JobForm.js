"use client";
import { Card, Modal, Stack, Typography, Grid, Button } from "@mui/material";
import React from "react";
import { useTheme } from "@mui/system";
import { Controller } from "react-hook-form";
import { useForm } from "react-hook-form";
import InputField from "./FormFields/InputField";
import SliderField from "./FormFields/SliderField";
import { createOptions } from "@/utils/CustomFunctions";
import SwitchInput from "./FormFields/SwitchInput";
import { exp, lpa } from "@/constants/TextConstants";
import AutoCompleteInput from "./FormFields/AutoCompleteInput";
import { ROLE_API, SKILL_API, LOCATION_API } from "@/constants/TextConstants";
import SelectInput from "./FormFields/SelectInput";
import RadioInput from "./FormFields/RadioInput";
import DateInput from "./FormFields/DateInput";
import PdfUploaderInput from "./FormFields/PdfUploaderInput";
import Availability from "./FormFields/Availability";
function JobForm({ jobModalOpen, handleOpenModal, handleCloseModal }) {
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setError,
    clearErrors,
  } = useForm({
    defaultValues: {
      fresher: false,
      total_experience: 1,
      relavent_experience: 1,
      resigned: true,
      buy_out: false,
      availability_for_interview: [],
      notice_period_negotiable: "Non-negotiable",
    },
  });
  const theme = useTheme();
  const fresher = watch("fresher");
  const resigned = watch("resigned");
  const notice_period = watch("notice_period");
  const result = createOptions(watch("total_experience"));
  const submit = (data) => {
    console.log("form data =", data);
  };
  return (
    <div>
      <Modal open={jobModalOpen} onClose={handleCloseModal}>
        <Card sx={theme.modal_card}>
          <form onSubmit={handleSubmit(submit)}>
            <Stack direction={"column"} spacing={2}>
              <Controller
                control={control}
                rules={{
                  required: "Name is Required",
                }}
                name="name"
                render={({ field: { onChange, onBlur, value } }) => (
                  <InputField
                    label="Name"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    error={errors?.name?.message}
                  />
                )}
              />
              <Controller
                control={control}
                rules={{
                  required: "Email is Required",
                  pattren: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Invalid email address",
                  },
                }}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <InputField
                    label="Email"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    error={errors?.email?.message}
                  />
                )}
              />
              <Controller
                control={control}
                rules={{
                  required: "Phone number is Required!",
                  pattern: {
                    value: /^[0-9]{10}$/i,
                    message: "Invalid phone number",
                  },
                }}
                name="mobile"
                render={({ field: { onChange, onBlur, value } }) => (
                  <InputField
                    label="mobile"
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    error={errors?.email?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name="fresher"
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <SwitchInput
                    label="Fresher"
                    onChange={onChange}
                    value={value}
                  />
                )}
              />

              {!fresher && (
                <>
                  <Controller
                    control={control}
                    name="total_experience"
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                      <SliderField
                        onChange={onChange}
                        value={value}
                        marks={exp}
                        min={1}
                        max={30}
                        step={0.5}
                        label="Total Experiance"
                      />
                    )}
                  />

                  <Grid container>
                    <Grid item xs={6} sx={{ paddingRight: "4px" }}>
                      <Controller
                        control={control}
                        name="current_role"
                        rules={{
                          required: "current role Required!",
                        }}
                        render={({
                          field: { onChange, onBlur, value, ref },
                        }) => (
                          <AutoCompleteInput
                            type="roles"
                            onChange={onChange}
                            ref={ref}
                            value={value}
                            multiple={false}
                            apiPath={ROLE_API}
                            error={errors?.current_role?.message}
                            label="Current Role"
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Controller
                        control={control}
                        name="relevant_experience"
                        rules={{
                          required: "Relevant exp Required!",
                        }}
                        render={({
                          field: { onChange, onBlur, value, ref },
                        }) => (
                          <SelectInput
                            onChange={onChange}
                            value={value}
                            error={errors?.current_role?.message}
                            label="Relavent Experience"
                            options={result}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </>
              )}
              <Controller
                control={control}
                name="p_tech_skills"
                rules={{
                  required: "primary skill  Required!",
                }}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <AutoCompleteInput
                    type="skills"
                    onChange={onChange}
                    ref={ref}
                    value={value}
                    multiple={true}
                    apiPath={SKILL_API}
                    error={errors?.p_tech_skills?.message}
                    label="Primary skills (Max 6)"
                  />
                )}
              />

              <Controller
                control={control}
                name="current_location"
                rules={{
                  required: "current location Required!",
                }}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <AutoCompleteInput
                    type="locations"
                    onChange={onChange}
                    ref={ref}
                    value={value}
                    multiple={false}
                    apiPath={LOCATION_API}
                    error={errors?.current_location?.message}
                    label="Current Location"
                  />
                )}
              />

              <Controller
                control={control}
                name="expected_ctc"
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <SliderField
                    onChange={onChange}
                    value={value}
                    marks={lpa}
                    min={1}
                    max={100}
                    step={0.25}
                    label="Expected CTC"
                  />
                )}
              />

              {!fresher && (
                <>
                  <Controller
                    control={control}
                    name="current_ctc"
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                      <SliderField
                        onChange={onChange}
                        value={value}
                        marks={lpa}
                        min={1}
                        max={100}
                        step={0.25}
                        label="Current CTC"
                      />
                    )}
                  />

                  <Controller
                    control={control}
                    name="resigned"
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                      <RadioInput
                        onChange={onChange}
                        value={value}
                        label="Have you Resigned"
                        options={[
                          { label: "Yes", value: true },
                          { label: "No", value: false },
                        ]}
                        isRow={true}
                      />
                    )}
                  />
                </>
              )}

              {(fresher || resigned) && (
                <Controller
                  control={control}
                  name="date_of_joining"
                  rules={{
                    required: "date of joining required",
                  }}
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <DateInput
                      onChange={onChange}
                      value={value}
                      label="When are you available to join?"
                      error={errors?.date_of_joining?.message}
                    />
                  )}
                />
              )}

              {!fresher && (
                <>
                  {!resigned && (
                    <Controller
                      control={control}
                      name="notice_period"
                      rules={{
                        required: "Notice period required",
                      }}
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <ToggleButtonInput
                          onChange={onChange}
                          value={value}
                          label="Notice period"
                          error={errors?.notice_period?.message}
                          options={npOptions}
                        />
                      )}
                    />
                  )}

                  {!resigned && notice_period >= 30 && (
                    <>
                      <Controller
                        control={control}
                        name="notice_period_negotiable"
                        render={({
                          field: { onChange, onBlur, value, ref },
                        }) => (
                          <SelectInput
                            onChange={onChange}
                            value={value}
                            label="Negotiable Days"
                            options={negotiableOptions}
                          />
                        )}
                      />

                      <Controller
                        control={control}
                        name="buy_out"
                        render={({
                          field: { onChange, onBlur, value, ref },
                        }) => (
                          <SwitchInput
                            onChange={onChange}
                            value={value}
                            label="Buyout"
                          />
                        )}
                      />
                    </>
                  )}
                </>
              )}

              <Controller
                control={control}
                name="resume"
                rules={{
                  required: "Resume required",
                }}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <PdfUploaderInput
                    onChange={onChange}
                    value={value}
                    label="Attach your Resume"
                    error={errors?.resume?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="availablity_for_interview"
                rules={{
                  required: "Availabl slot required",
                }}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <Availability
                    onChange={onChange}
                    value={value}
                    label="Add your Free slots"
                    error={errors?.availablity_for_interview?.message}
                    maxCount={3}
                  />
                )}
              />

              <Button
                style={{ marginTop: "20px", marginBottom: "45px" }}
                sx={theme.custom_button}
                variant="contained"
                type="submit"
              >
                Submit
              </Button>
            </Stack>
          </form>
        </Card>
      </Modal>
    </div>
  );
}

export default JobForm;
