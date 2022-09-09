import React, { useState } from "react";
import { Grid, TextField, Button } from "@mui/material";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { useAuth } from "../context/AuthContext";

const initialState = {
  email: "",
  password: "",
};

const LoginForm = () => {
  const [formState, setFormState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const hanldeStateChange = (e) => {
    setFormState((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };
  //  learn how to error handle

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formState.email,
        formState.password
      );
      setUser(userCredential.user);
      navigate("/");
      console.log("userCredential", userCredential);
    } catch (error) {
      console.log("Error", error);
    }
    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <Grid
          container
          alignItems="center"
          justify="center"
          direction="column"
          sx={{ gap: 2 }}
        >
          <Grid item>
            <TextField
              id="email"
              name="email"
              label="Email"
              value={formState.email}
              variant="outlined"
              size="small"
              autoComplete="off"
              aria-describedby="enter email for login"
              onChange={hanldeStateChange}
            />
          </Grid>
          <Grid item>
            <TextField
              id="password"
              size="small"
              name="password"
              label="Password"
              value={formState.password}
              type="password"
              autoComplete="off"
              aria-describedby="enter password for login"
              // error={error ? true : false}
              // helperText={error ? "wrong password" : null}
              onChange={hanldeStateChange}
            />
          </Grid>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            // onClick={ }
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
