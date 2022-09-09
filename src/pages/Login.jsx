import React, { useState } from "react";
import {
  Box,
  Grid,
  Button,
  Divider,
  Typography,
  Alert,
  Fade,
  Paper,
  Card,
  CardMedia,
  CardActions,
} from "@mui/material";
import LoginForm from "../components/LoginForm";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
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
      <Box
        display="flex"
        flexDirection="coloumn"
        justifyContent="center"
        alignItems="center"
        sx={{
          background: "#fafafa",

          width: "100%",
        }}
      >
        <Card
          elevation={3}
          sx={{
            direction: "column",
            alignItems: "center",
            p: 3,
            mt: 4,
            backgroundColor: "#fff",
            width: "375px",
            minHeight: { xs: "100vh", md: "90vh" },
          }}
        >
          <Box
            display="flex"
            justifyContent="center"
            sx={{
              width: "100%",
              mt: 2,
              mb: 2,
            }}
          >
            <CardMedia
              sx={{
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

          <Divider sx={{ borderBottomWidth: 35, mt: 2 }}>OR</Divider>

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
        </Card>
      </Box>
    </div>
  );
};

// xs={3} sx={{ }}

export default Login;
