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
import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const Settings = () => {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.up("sm"));
  // hook up the form fields wihh firebase and store name, username in teh documents
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const logged = useAuth();

  let defaultValues = {
    name: "",
    username: "",
    bio: "",
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    defaultValues,
  });

  const handleForm = async (data, e) => {
    e.preventDefault();
    console.log("data", data);

    setLoading(true);
    try {
      await setDoc(doc(db, "users", logged.user.uid), {
        name: data.name,
        username: data.username,
        bio: data.bio,
        following: [],
        followers: [],
      });
      setLoading(false);
      navigate("/");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleForm)}>
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
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <TextField
                  type="text"
                  size="small"
                  placeholder="Name"
                  sx={{ background: "#fafafa" }}
                  onChange={onChange}
                  error={Boolean(errors.name)}
                />
              )}
              rules={{
                required: "required",
              }}
            />
          </Box>
          <Box>
            <FormLabel sx={{ paddingRight: "12px", fontWeight: "600" }}>
              Username{" "}
            </FormLabel>
            <Controller
              control={control}
              name="username"
              render={({ field: { onChange, value } }) => (
                <TextField
                  type="text"
                  size="small"
                  placeholder="Username"
                  sx={{ background: "#fafafa" }}
                  onChange={onChange}
                  error={Boolean(errors.username)}
                />
              )}
              rules={{
                required: "username required",
              }}
            />
          </Box>
          <Box>
            <FormLabel sx={{ paddingRight: "65px", fontWeight: "600" }}>
              Bio
            </FormLabel>
            <Controller
              control={control}
              name="bio"
              render={({ field: { onChange, value } }) => (
                <TextField
                  type="text"
                  size="small"
                  placeholder="Bio"
                  sx={{ background: "#fafafa" }}
                  onChange={onChange}
                />
              )}
            />
          </Box>
          <Button disabled={loading} type="submit" variant="contained">
            Submit
          </Button>
        </Card>
      </form>
    </div>
  );
};

export default Settings;
