import { CssBaseline } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import PrivateRoutes from "./components/PrivateRoutes";
import ProtectedAuth from "./components/ProtectedAuth";
import { AuthContextProvider } from "../src/context/AuthContext";

function App() {
  return (
    <div style={{ height: "100%" }}>
      <CssBaseline />

      <BrowserRouter>
        <AuthContextProvider>
          <Routes>
            <Route
              path="/login"
              element={
                <ProtectedAuth>
                  <Login />
                </ProtectedAuth>
              }
            />
            <Route
              path="/signup"
              element={
                <ProtectedAuth>
                  <SignUp />
                </ProtectedAuth>
              }
            />

            <Route
              path="/"
              element={
                <PrivateRoutes>
                  <Home />
                </PrivateRoutes>
              }
            />
            <Route
              path="/settings"
              element={
                <PrivateRoutes>
                  <Settings />
                </PrivateRoutes>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoutes>
                  <Profile />
                </PrivateRoutes>
              }
            />
          </Routes>
        </AuthContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
