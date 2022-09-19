import { Box, Button, Modal, TextField } from "@mui/material";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { ReactComponent as AddPhoto } from "../assets/svgs/addPhoto.svg";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";
import { v4 as uuidv4 } from "uuid";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    xs: "350px",
    sm: "600px",
  },
  height: {
    xs: "320px",
    sm: "500px",
  },
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const AddPost = () => {
  const { addPost, setAddPost, user } = useAuth();

  const fileInput = React.useRef();
  const [preview, setPreview] = useState(null);
  const [imageUrl, setImageUrl] = useState();
  const [loading, setLoading] = useState(false);

  const onAddImage = (file) => {
    window.URL.revokeObjectURL(preview);
    if (!file) return;
    setImageUrl(file);
    console.log("file", file);
    setPreview(window.URL.createObjectURL(file));
  };

  // create post and store store image in firesbases storage
  const sharePost = async () => {
    // uploading image to cloud storage
    setLoading(true);
    const storageRef = ref(storage, "posts/" + uuidv4());
    await uploadBytes(storageRef, imageUrl);
    const url = await getDownloadURL(storageRef);
    try {
      // creating document in posts collection (firestore)
      const docRef = await addDoc(collection(db, "posts"), {
        createdBy: user.uid,
        date: new Date(),
        imageUrl: url,
        //  object with id and value
        comments: [],
        // only ids as string
        likes: [],
      });
      console.log("Document written with ID: ", docRef.id);
      setLoading(false);
      setAddPost(false);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <Modal
      open={addPost}
      onClose={() => setAddPost(!addPost)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap={1}
        sx={style}
      >
        <img
          src={preview}
          style={{ width: "90%", height: "90%", objectFit: "contain" }}
          id="image"
          alt="-"
          className="user-post"
        />

        <input
          ref={fileInput}
          type="file"
          accept="image/*"
          onChange={(e) => onAddImage(e.target.files[0])}
          style={{ display: "none" }}
        />

        {!preview && (
          <>
            <AddPhoto />

            <Button
              variant="contained"
              color="primary"
              onClick={() => fileInput.current.click()}
            >
              Choose Image
            </Button>
          </>
        )}

        {preview && (
          <>
            <TextField
              size="small"
              type="text"
              multiline
              placeholder="Add caption"
              fullWidth
              sx={{ border: "none", background: "#fafafa" }}
              variant="standard"
              maxRows={3}
              InputProps={{
                disableUnderline: true,
              }}
              inputProps={{
                maxLength: 150,
              }}
            />

            <Button
              onClick={sharePost}
              disabled={loading}
              variant="contained"
              color="primary"
            >
              Share
            </Button>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default AddPost;
