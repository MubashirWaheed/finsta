import React, { useState } from "react";
import {
  Box,
  Button,
  Divider,
  Typography,
  Alert,
  Fade,
  Card,
  CardMedia,
  CardActions,
  Container,
  CssBaseline,
} from "@mui/material";
import LoginForm from "../components/LoginForm";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { AuthCard } from "../utils/styles/AuthCard";
import { ReactComponent as Google } from "../assets/svgs/google.svg";
import instagram from "../assets/instagram.png";

const Login = () => {
  const { setUser } = useAuth();
  const provider = new GoogleAuthProvider();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState(false);

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
      <Container sx={{ p: 0 }} background="#fafafa" maxWidth="md">
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          sx={{ width: "100%", height: "100vh" }}
        >
          <AuthCard
            elevation={3}
            sx={{
              height: {
                xs: "100vh",
                sm: "90%",
              },
            }}
          >
            <Box
              display="flex"
              justifyContent="center"
              sx={{
                // width: "90%",
                mt: 2,
                mb: 2,
              }}
            >
              <CardMedia
                sx={{
                  marginTop: 4,
                  width: 200,
                  maxHeight: { xs: 233, md: 167 },
                  maxWidth: { xs: 350, md: 250 },
                }}
                component="img"
                alt="Instagram logo."
                src={instagram}
              />
            </Box>

            {error && (
              <Fade
                in={error}
                timeout={{ enter: 1000, exit: 2000 }}
                addEndListener={() => {
                  setTimeout(() => {
                    setError(false);
                  }, 3000);
                }}
              >
                <Alert severity="error" sx={{ mb: 3, width: "100%" }}>
                  Wrong Credentials
                </Alert>
              </Fade>
            )}

            <LoginForm setError={setError} />
            <Divider
              sx={{
                mt: 2,
                // lines not aliging with text properly
                // width: "100%",
              }}
            >
              Or
            </Divider>

            <CardActions sx={{ display: "flex", flexDirection: "column" }}>
              <Button
                display="flex"
                sx={{ textTransform: "none", gap: 1 }}
                disabled={loading}
                onClick={handleGoogleLogin}
              >
                <Google />
                Login with Google
              </Button>

              <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
                Don't have an account? <Link to="/signup">Sign Up</Link>
              </Typography>
            </CardActions>
            <Box
              sx={{
                display: "flex",
                gap: 1,
                justifyContent: "center",
              }}
              flexWrap="wrap"
              color="#8e8e8e"
            >
              <Typography variant="caption">Meta</Typography>
              <Typography variant="caption">About</Typography>
              <Typography variant="caption">Blog</Typography>
              <Typography variant="caption">Jobs</Typography>
              <Typography variant="caption">API</Typography>
              <Typography variant="caption">Privacy</Typography>
              <Typography variant="caption">Terms</Typography>
              <Typography variant="caption">Instagram Lite</Typography>
            </Box>
          </AuthCard>
        </Box>
      </Container>
    </div>
  );
};

export default Login;
