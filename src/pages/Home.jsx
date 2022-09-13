import {
  Avatar,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { getAuth, signOut } from "firebase/auth";
import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import PostCard from "../components/PostCard";
import { Box } from "@mui/system";
const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.up("sm"));
  const md = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <div>
      <Box
        display="flex"
        gap={8}
        alignItems="start"
        justifyContent={md ? "" : "center"}
        paddingBottom={4}
        // bgcolor="red"
        mt={9}
      >
        <Box>
          <PostCard
            link={
              "https://images.pexels.com/photos/1223649/pexels-photo-1223649.jpeg?cs=srgb&dl=pexels-oliver-sj%C3%B6str%C3%B6m-1223649.jpg&fm=jpg"
            }
          />
          <PostCard
            link={
              "https://images.pexels.com/photos/4934535/pexels-photo-4934535.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            }
          />
          <PostCard
            link={
              "https://images.pexels.com/photos/1223649/pexels-photo-1223649.jpeg?cs=srgb&dl=pexels-oliver-sj%C3%B6str%C3%B6m-1223649.jpg&fm=jpg"
            }
          />
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          width={300}
          // bgcolor="lightblue"
          height={300}
          marginTop={5}
          p={2}
          sx={{ display: md ? "flex" : "none" }}
        >
          <Typography>Suggestion for you</Typography>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            // gap={2}
            // p={2}
          >
            <Box display="flex" gap={2} marginY={1}>
              <Avatar sx={{ width: 28, height: 28 }}>M</Avatar>
              <Typography varaint="h6">Jhon</Typography>
            </Box>
            <Button sx={{ fontWeight: 700 }}>Follow</Button>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            // p={2}
          >
            <Box display="flex" gap={2}>
              <Avatar sx={{ width: 28, height: 28 }}>M</Avatar>
              <Typography varaint="h6">Jhon</Typography>
            </Box>
            <Button sx={{ fontWeight: 700 }}>Follow</Button>
          </Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            // p={2}
          >
            <Box display="flex" gap={2}>
              <Avatar sx={{ width: 28, height: 28 }}>M</Avatar>
              <Typography varaint="h6">Jhon</Typography>
            </Box>
            <Button sx={{ fontWeight: 700 }}>Follow</Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Home;
