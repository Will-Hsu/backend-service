import React from "react";
import { Container } from "@material-ui/core";
import Home from "./components/Home/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import Profile from "./components/Profile/Profile";

const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/profile"
            element={<Profile />}
          />
          <Route
            path="/login"
            element={
              !user ? <Auth newUser={false} /> : <Navigate to="/profile" />
            }
          />
          <Route
            path="/register"
            element={
              !user ? <Auth newUser={true} /> : <Navigate to="/profile" />
            }
          />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
