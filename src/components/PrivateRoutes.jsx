import React from "react";
import { Navigate } from "react-router-dom";
import { Container } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { Box } from "@mui/system";
import Navbar from "./Navbar";

const PrivateRoutes = ({ children }) => {
  const { user } = useAuth();

  return user ? (
    <>
      <Navbar />
      <Box sx={{ background: "#FFB6C1", height: "100%" }}>
        <Container maxWidth="md">{children}</Container>
      </Box>
    </>
  ) : (
    <Navigate to="login" replace />
  );
};

export default PrivateRoutes;
