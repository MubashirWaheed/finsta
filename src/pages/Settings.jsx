import {
  Avatar,
  Box,
  Button,
  Card,
  FormLabel,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";

const Settings = () => {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.up("sm"));
  // hook up the form fields wihh firebase and store name, username in teh documents

  const handleForm = () => {};

  return (
    <div>
      <form onSubmit={handleForm}>
        <Card
          elevation={2}
          sx={{
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "15px",
            // background: "lightblue",
            marginTop: "50px",
            paddingTop: "30px",
            paddingBottom: "100px",
          }}
        >
          <Box
            sx={{
              width: "340px",
              display: "flex",
              alignItems: "center",
              paddingBottom: "20px",
            }}
          >
            <Avatar sx={{ marginRight: sm ? "50px" : "20px" }}>M</Avatar>
            <Typography>Name</Typography>
          </Box>
          <Box>
            <FormLabel sx={{ paddingRight: "40px", fontWeight: "600" }}>
              Name{" "}
            </FormLabel>
            <TextField
              type="text"
              size="small"
              placeholder="Name"
              sx={{ background: "#fafafa" }}
            />
          </Box>
          <Box>
            <FormLabel sx={{ paddingRight: "12px", fontWeight: "600" }}>
              Username{" "}
            </FormLabel>
            <TextField
              type="text"
              size="small"
              placeholder="Username"
              sx={{ background: "#fafafa" }}
            />
          </Box>
          <Box>
            <FormLabel sx={{ paddingRight: "65px", fontWeight: "600" }}>
              Bio
            </FormLabel>
            <TextField
              type="text"
              size="small"
              placeholder="Bio"
              sx={{ background: "#fafafa" }}
            />
          </Box>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Card>
      </form>
    </div>
  );
};

export default Settings;
