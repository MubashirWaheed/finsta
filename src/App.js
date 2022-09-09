import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import PrivateRoutes from "./components/PrivateRoutes";
import { CssBaseline } from "@mui/material";
import Profile from "./pages/Profile";
import { AuthContextProvider } from "../src/context/AuthContext";
import ProtectedAuth from "./components/ProtectedAuth";

function App() {
  return (
    <div>
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
              path="/"
              element={
                <PrivateRoutes>
                  <Home />
                </PrivateRoutes>
              }
            />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </AuthContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
