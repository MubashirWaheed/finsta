import React, { useState } from "react";
import { Grid, TextField, Button } from "@mui/material";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { useForm, Controller } from "react-hook-form";

const LoginForm = ({ setError }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();
  let defaultValues = {
    email: "",
    password: "",
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    defaultValues,
  });

  const handleFormSubmit = async (data, e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      setUser(userCredential.user);
      navigate("/");
    } catch (error) {
      setError(true);
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
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={loading}
            sx={{ width: "100%" }}
          >
            Log In
          </Button>
        </Grid>
      </form>
    </div>
  );
};

export default LoginForm;
