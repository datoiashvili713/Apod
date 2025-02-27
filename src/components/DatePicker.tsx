import { Control, Controller } from "react-hook-form";
import {
  DatePickerWrapper,
  InputWrapper,
  StyledLabelText,
} from "./DatePickerStyles";
import { Button, TextField } from "@mui/material";
import { useState } from "react";

interface FieldValues {
  startDate: string;
  endDate: string;
}

interface DatePickerProps {
  isFetching: boolean;
  control: Control<FieldValues>;
  errorsStart: string | undefined;
  errorsEnd: string | undefined;
  errorMessages: string[];
}

function DatePicker({
  isFetching,
  control,
  errorsStart,
  errorsEnd,
  errorMessages,
}: DatePickerProps) {
   const [startDate, setStartDate] = useState<string | null>(null);
  const today = new Date().toISOString().split("T")[0]
  
  return (
    <DatePickerWrapper>
      <InputWrapper>
        <label htmlFor="startDate">
          <StyledLabelText>Start Date:</StyledLabelText>
        </label>
        <Controller
          control={control}
          name="startDate"
          rules={{
            required: "Start Date is required",
            pattern: {
              value: /^\d{4}-\d{2}-\d{2}$/,
              message: "Invalid date format (YYYY-MM-DD)",
            },
          }}
          render={({ field: { onChange, value } }) => (
            <TextField
              variant="standard"
              required
              type="date"
              id="startDate"
              value={value || ""}
              onChange={(e) => {
              onChange(e);
              setStartDate(e.target.value);
              }}
              inputProps={{ max: today }}
              style={{ marginBottom: "20px", width: "100%" }}
              helperText={errorsStart || ""}
              error={Boolean(errorsStart)}
            />
          )}
        />

        <label htmlFor="endDate">
          <StyledLabelText>End Date:</StyledLabelText>
        </label>
        <Controller
          control={control}
          name="endDate"
          rules={{
            required: "End Date is required",
            pattern: {
              value: /^\d{4}-\d{2}-\d{2}$/,
              message: "Invalid date format (YYYY-MM-DD)",
            },
          }}
          render={({ field: { onChange, value } }) => (
            <TextField
              variant="standard"
              required
              disabled={!startDate}
              type="date"
              id="endDate"
              style={{  width: "100%" }}
              value={value || ""}
              onChange={onChange}
              inputProps={{
                min: startDate || "", 
                max: today, 
              }}
              error={Boolean(errorsEnd)}
              helperText={errorsEnd}
            />
          )}
        />
      </InputWrapper>

      {errorMessages.length > 0 && (
        <div style={{ color: "red", marginTop: "10px" }}>
          {errorMessages.map((message, index) => (
            <p key={index}>{message}</p>
          ))}
        </div>
      )}

      <Button
        variant="contained"
        color="success"
        type="submit"
        disabled={isFetching}
      >
        {isFetching ? "Loading..." : "Search by date"}
      </Button>
    </DatePickerWrapper>
  );
}

export default DatePicker;
