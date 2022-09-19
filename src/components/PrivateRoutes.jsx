import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { Container } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { Box } from "@mui/system";
import Navbar from "./Navbar";
const PrivateRoutes = ({ children }) => {
  const { user, setAddPost } = useAuth();

  return user ? (
    <>
      <Navbar setAddPost={setAddPost} />
      <Box sx={{ background: "#fafafa", minHeight: "100%" }}>
        <Container
          maxWidth="md"
          disableGutters
          sx={{
            minHeight: "100%",
            background: "#fafafa",
            // background: "#BFF6C1",
          }}
        >
          {children}
        </Container>
      </Box>
    </>
  ) : (
    <Navigate to="login" replace />
  );
};

export default PrivateRoutes;
