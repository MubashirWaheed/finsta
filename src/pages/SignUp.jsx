import React from "react";
import { Button, CardMedia, Divider, Typography } from "@mui/material";
import { Box } from "@mui/material";
import { AuthCard } from "../utils/styles/AuthCard";
import instagram from "../assets/instagram.png";
import { ReactComponent as Google } from "../assets/svgs/whiteGoogle.svg";
import SignUpForm from "../components/SignUpForm";

const SignUp = () => {
  return (
    <Box
      display="flex"
      flexDirection="coloumn"
      justifyContent="center"
      alignItems="center"
      sx={{ background: "#fafafa", height: "100vh" }}
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
          sx={{ width: "100%", mt: 2, mb: 1 }}
        >
          <CardMedia
            component="img"
            alt="Instagram logo."
            src={instagram}
            sx={{
              width: 200,
              maxHeight: { xs: 233, md: 167 },
              maxWidth: { xs: 350, md: 250 },
            }}
          />
        </Box>
        <Typography
          variant="h6"
          sx={{
            color: "#8f8f8f",
            lineHeight: 1,
            textAlign: "center",
            pl: 4,
            pr: 4,
          }}
        >
          Sign up to see photos and videos from your friends.
        </Typography>
        <Button
          variant="contained"
          display="flex"
          sx={{ fontWeight: 600, textTransform: "none", gap: 1, mt: 2 }}
        >
          <Google />
          Login with Google
        </Button>
        <Divider sx={{ mt: 2 }}>OR</Divider>

        <SignUpForm />
      </AuthCard>
    </Box>
  );
};

export default SignUp;
