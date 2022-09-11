import React, { useState } from "react";
import { Grid, TextField, Button, Typography } from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { useForm, Controller } from "react-hook-form";

const SignUpForm = () => {
  // setError
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  let defaultValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };

  const {
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    defaultValues,
  });

  const handleFormSubmit = async (data, e) => {
    e.preventDefault();
    console.log("form submitted");
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      console.log("userCredential", userCredential);
      //   setUser(userCredential.user);
      navigate("/user-details");
    } catch (error) {
      //   setError(true);
      console.log("Error", error);
    }
    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Grid
          container
          alignItems="center"
          justify="center"
          direction="column"
          sx={{ gap: 2 }}
        >
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <TextField
                sx={{ width: "100%", background: "#fafafa" }}
                id="email"
                name="email"
                label="Email"
                value={value.email}
                type="email"
                variant="outlined"
                size="small"
                autoComplete="off"
                aria-describedby="enter email for login"
                onChange={onChange}
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
              />
            )}
            rules={{
              required: "email is required",
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "please enter a valid email",
              },
            }}
          />
          {/* NAME FIELD  */}

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <TextField
                sx={{ width: "100%", background: "#fafafa" }}
                id="password"
                name="password"
                label="Password"
                value={value.password}
                type="password"
                variant="outlined"
                size="small"
                autoComplete="off"
                aria-describedby="enter password for login"
                onChange={onChange}
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
              />
            )}
            rules={{
              minLength: {
                value: 6,
                message: "minimum password length is 6",
              },
              maxLength: {
                value: 18,
                message: "maximum password length is 18",
              },
              required: "password required",
            }}
          />
          {/* Confirm passoword */}
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, value } }) => (
              <TextField
                sx={{ width: "100%", background: "#fafafa" }}
                id="confirmPassowrd"
                name="confirmPassword"
                label="Confirm Password"
                value={value.confirmPassowrd}
                type="password"
                variant="outlined"
                size="small"
                autoComplete="off"
                aria-describedby="please reenter your passoword"
                onChange={onChange}
                error={Boolean(errors.confirmPassword)}
                helperText={errors.confirmPassword?.message}
              />
            )}
            rules={{
              validate: (val) => {
                if (watch("password") !== val) {
                  return "Your passwords does not match";
                }
              },
              minLength: {
                value: 6,
                message: "minimum password length is 6",
              },
              maxLength: {
                value: 18,
                message: "maximum password length is 18",
              },
              required: "password required",
            }}
          />
          <Typography
            variant="caption"
            color="#959595"
            sx={{ textAlign: "center" }}
          >
            By signing up, you agree to our Terms , Privacy Policy and Cookies
            Policy .
          </Typography>

          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={loading}
            sx={{ width: "100%" }}
          >
            Sign Up
          </Button>
        </Grid>
      </form>
    </div>
  );
};

export default SignUpForm;
