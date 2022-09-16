import {
  Avatar,
  Button,
  Box,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
// import { getAuth, signOut } from "firebase/auth";
import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";
import Suggestions from "../components/Suggestions";
import { useState } from "react";

const Home = () => {
  const { user, addPost } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.up("md"));
  const sm = useMediaQuery(theme.breakpoints.up("sm"));
  const [showSuggestions, setShowSuggestions] = useState(true);
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

        {showSuggestions && (
          <Suggestions setShowSuggestions={setShowSuggestions} />
        )}
      </Box>
    </div>
  );
};

export default Home;
