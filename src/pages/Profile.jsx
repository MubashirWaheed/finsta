import { Avatar, Box, Divider, Typography } from "@mui/material";
import React from "react";

const Profile = () => {
  return (
    <div style={{ marginTop: "60px" }}>
      <Box
        // bgcolor="#FFB6C1"
        display="flex"
        gap={6}
        padding={2}
        sx={{ marginTop: "20px" }}
      >
        <Avatar sx={{ width: 130, height: 130 }}>M</Avatar>
        <Box>
          <Typography variant="h3">Mubashir</Typography>
          <Box display="flex" gap={4} mt={1}>
            <Typography>3 Posts</Typography>
            <Typography> 200 Following</Typography>
            <Typography>300 Folowers</Typography>
          </Box>
        </Box>
      </Box>
      <Divider width="100%" />
      <Box>POST</Box>
      <Box>POST</Box>
      <Box>POST</Box>
    </div>
  );
};

export default Profile;
