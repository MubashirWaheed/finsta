import { TextField } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";

const FormInputField = ({ name, control, label }) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <TextField
          // id="email"
          name={name}
          label={label}
          value={value[name]}
          // value={formState.email}
          type={name}
          variant="outlined"
          size="small"
          autoComplete="off"
          // aria-describedby="enter email for login"
          onChange={onChange}
        />
      )}
      rules={{
        required: true,
      }}
    />
  );
};

export default FormInputField;
