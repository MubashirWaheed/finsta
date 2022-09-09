import React, { useState } from "react";
import instagram from "../assets/instagram.png";
import { Box, Grid, Button, Divider } from "@mui/material";
import LoginForm from "../components/LoginForm";
import { ReactComponent as Google } from "../assets/svgs/google.svg";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const { setUser } = useAuth();
  const provider = new GoogleAuthProvider();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      navigate("/");
    } catch (error) {
      console.log("ERROR", error);
    }
    setLoading(false);
  };

  return (
    <div>
      <Grid
        container
        direction="column"
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={3} sx={{ mb: 5, mt: 12 }}>
          <Box
            component="img"
            sx={{
              width: 200,
              // border: "1px dashed grey",
              maxHeight: { xs: 233, md: 167 },
              maxWidth: { xs: 350, md: 250 },
            }}
            alt="Instagram logo."
            src={instagram}
          />
        </Grid>
        <Grid item>
          <LoginForm />
          <Divider sx={{ borderBottomWidth: 35, mt: 2 }}>OR</Divider>
        </Grid>
        <Grid item>
          <Button
            display="flex"
            sx={{ textTransform: "none", gap: 1 }}
            disabled={loading}
            onClick={handleGoogleLogin}
          >
            <Google />
            Login with Google
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
