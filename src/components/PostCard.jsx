import {
  Avatar,
  Box,
  Button,
  Card,
  CardMedia,
  IconButton,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  Link,
} from "@mui/material";
import React from "react";
import { ReactComponent as Heart } from "../assets/svgs/heart.svg";
import { ReactComponent as Comment } from "../assets/svgs/comment.svg";
// import { Link } from "react-router-dom";

const PostCard = ({ link }) => {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Card
      elevation={3}
      sx={{
        width: sm ? "470px" : "373px",
        // paddingY: "20px",
        paddingBottom: "20px",
        marginTop: "20px",
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        gap={2}
        paddingLeft={2}
        paddingY={2}
      >
        <Avatar
          sx={{ bgcolor: "#FFB6C1", width: 28, height: 28 }}
          aria-label="profile"
        >
          M
        </Avatar>
        <Link href="#" sx={{ textDecoration: "none" }}>
          <Typography color="black" sx={{ fontWeight: 700 }}>
            Mubashir
          </Typography>
        </Link>
      </Box>

      <CardMedia component="img" height="500" image={link} alt="post image" />
      <Box pl={2} pt={2}>
        <Box display="flex" gap={1} mb={1}>
          <Heart />
          <Comment />
        </Box>
        <Typography>200 likes</Typography>
        <Box display="flex" gap={1}>
          <Typography sx={{ fontWeight: 700 }}>mubashir</Typography>
          <Typography> Lmao what is that!!</Typography>
        </Box>
        <Typography variant="subtitle2" color="#919191">
          Views comments
        </Typography>
        <Box display="flex" gap={1}>
          <Typography sx={{ fontWeight: 700 }}>asad</Typography>
          <Typography> Hahah that looks great</Typography>
        </Box>
        <Box display="flex" width="100%">
          <TextField
            size="small"
            fullWidth
            variant="standard"
            placeholder="Add comment"
            sx={{ border: "none" }}
            InputProps={{
              disableUnderline: true,
            }}
          />
          <Button>Post</Button>
        </Box>
        <Typography variant="subtitle2" color="#919191">
          30 minutes ago
        </Typography>
      </Box>
    </Card>
  );
};

export default PostCard;
