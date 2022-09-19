import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { updateFollowingArray } from "../utils/services/updateFollowingFirestore";
import { getSuggestions } from "../utils/services/getSuggestions";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  Avatar,
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const Suggestions = ({ setShowSuggestions }) => {
  const { user } = useAuth();
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.up("md"));
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);

  const [userSuggestions, setUserSuggestions] = useState();
  const count = useRef(0);

  const suggestedProfiles = async (loggedUserID) => {
    const data = await getSuggestions(loggedUserID);
    setUserSuggestions(data);
    if (data.length < 1) {
      // console.log("userSuggestions", userSuggestions);
      count.current = count.current + 1;
      // console.log("count:", count.current);
    } else {
      count.current = 0;
      // console.log("count:", count.current);
    }

    if (count.current === 6) {
      // console.log("no user found");
      setShowSuggestions(false);
    }
    setLoading(false);
  };

  const updateFollowing = async (followedID) => {
    setBtnLoading(true);
    await updateFollowingArray(user.uid, followedID);
    // after profile is followed remove it from suggestions state array adn UI is updated
    setUserSuggestions((state) =>
      state.filter((item) => item.id !== followedID)
    );
    setBtnLoading(false);
  };

  useEffect(() => {
    if (user) {
      suggestedProfiles(user.uid);
    }
  }, [user]);

  useEffect(() => {
    if (userSuggestions?.length < 1 && count.current < 6) {
      suggestedProfiles(user.uid);
    }
  }, [userSuggestions]);

  return (
    <div>
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
        {loading && <Skeleton count={5} height="30px" />}
        {userSuggestions?.map((item, i) => (
          <Box
            key={i}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box display="flex" gap={2} marginY={1}>
              <Avatar sx={{ width: 28, height: 28 }}>M</Avatar>
              <Typography varaint="h6">{item.name}</Typography>
            </Box>
            <Button
              disabled={btnLoading}
              sx={{ fontWeight: 700 }}
              onClick={() => updateFollowing(item.id)}
            >
              Follow
            </Button>
          </Box>
        ))}
      </Box>
    </div>
  );
};

export default Suggestions;

// random user being fetched from firestore
// remove user from display if followed
// remove component from dom is affl users are followed/ no user returned from firestore
