import { Card } from "@mui/material";
import { styled } from "@mui/material/";

export const AuthCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  //   paddingLeft: "22px",
  padding: "22px 30px 22px 30px",
  backgroundColor: "#fff",
  width: "375px",
  // background: "lightblue",
}));
