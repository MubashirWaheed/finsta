import {
  Avatar,
  Button,
  Box,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
// import { getAuth, signOut } from "firebase/auth";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";
import Suggestions from "../components/Suggestions";
import { doc, getDoc, limit, orderBy } from "firebase/firestore";
import { useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  query,
  where,
  onSnapshot,
  getDocs,
} from "firebase/firestore";

const Home = () => {
  const { user } = useAuth();
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.up("md"));
  const sm = useMediaQuery(theme.breakpoints.up("sm"));
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [posts, setPosts] = useState([]);
  // let try to get posts here based on the following of th user
  // based on created by I can add listrner
  // I will send my follwoing array  to check against

  // get my followers
  // add subscription listners
  // if array changes then determine which post added
  //  hwo do I query by latest with snapshot when document added ?
  //  so that I append it at the end of array and  not in the middle

  useEffect(() => {
    const getPosts = async () => {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      let following = docSnap.data().following;
      console.log("follwing: ", following);

      const q = query(
        collection(db, "posts"),
        orderBy("index", "desc"),
        where("createdBy", "in", following)
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        setPosts(data);
      });
    };

    getPosts();
  }, []);

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

//  write query to fetch lates 10 posts from teh collection on load
// whenever this is fired get the first value and store it the array
//  or maybe only load 10 items from array and when user screen docs load 10 more
