import React, { useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import instagram from "../assets/instagram.png";
import { ReactComponent as HomeSvg } from "../assets/svgs/home.svg";
import { ReactComponent as Add } from "../assets/svgs/add.svg";
import {
  AppBar,
  Avatar,
  Container,
  CssBaseline,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
  Box,
} from "@mui/material";

const Navbar = () => {
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("Logged out");
        navigate("/login");
      })
      .catch((error) => {
        console.log("error while logging out", error);
      });
  };

  return (
    <div>
      <div style={{ height: "100%" }}>
        <CssBaseline />
        <AppBar position="static" sx={{ background: "white" }}>
          <Container maxWidth="lg">
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              paddingTop={1}
              paddingBottom={1}
            >
              <Box
                component="img"
                src={instagram}
                sx={{ width: { xs: 100, md: 120 } }}
              />
              <Box
                display="flex"
                alignItems="center"
                marginLeft={3}
                sx={{ gap: { xs: -4 } }}
              >
                <TextField
                  sx={{ background: "#efefef" }}
                  size="small"
                  placeholder="search"
                  height="10px"
                />
                <IconButton
                  aria-label="go to home"
                  sx={{ pl: 1, ml: { md: 1 } }}
                >
                  <HomeSvg />
                </IconButton>
                <IconButton aria-label="add media" sx={{ pl: 1 }}>
                  <Add />
                </IconButton>
                <Box>
                  <Tooltip title="Open settings">
                    <IconButton
                      aria-label="account of current user"
                      sx={{ pl: 1, pr: 1 }}
                      onClick={handleOpenUserMenu}
                    >
                      <Avatar sx={{ width: 28, height: 28 }}>A</Avatar>
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography
                        textAlign="center"
                        onClick={() => navigate("/profile")}
                      >
                        Profile
                      </Typography>
                    </MenuItem>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography
                        textAlign="center"
                        onClick={() => navigate("/settings")}
                      >
                        Settings
                      </Typography>
                    </MenuItem>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography textAlign="center" onClick={handleSignOut}>
                        Log Out
                      </Typography>
                    </MenuItem>
                  </Menu>
                </Box>
              </Box>
            </Box>
          </Container>
        </AppBar>
      </div>
    </div>
  );
};

export default Navbar;
