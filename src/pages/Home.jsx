import { Button } from "@mui/material";
import { getAuth, signOut } from "firebase/auth";
import React from "react";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { user } = useAuth();
  console.log("user from context ", user);
  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("Logged out");
        // dispatch(deleteToken());
        // Sign-out successful.
      })
      .catch((error) => {
        console.log("error while logging out", error);
        // An error happened.
      });
  };
  return (
    <div>
      <h1>Home</h1>
      <Button onClick={handleSignOut}>Sign Out</Button>
    </div>
  );
};

export default Home;
