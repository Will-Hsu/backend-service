import React, { useEffect } from "react";
import { Paper, Typography, Container, Button } from "@material-ui/core";
import useStyles from "./styles";
import { Link, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

const Profile = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const logout = () => {
    navigate("/");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // If token is not present, navigate to home page
      navigate("/");
      return;
    }

    // Decode token to check expiration
    try {
      const currentTime = Date.now() / 1000;
      if (jwtDecode(token).exp < currentTime) {
        navigate("/");
      }
    } catch (error) {
      // Error decoding token, navigate to home page
      console.error("Error decoding token:", error);
      navigate("/");
    }
  }, [navigate]);

  return (
    <Container
      component="main"
      maxWidth="xs"
    >
      <Paper
        className={classes.paper}
        elevation={3}
      >
        <Typography variant="h5">Backend Test UI</Typography>
        <Typography variant="body1">
          Welcome Back, {localStorage.getItem("user")}!
        </Typography>
        <Button
          component={Link}
          to="/"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={logout}
        >
          Log Out
        </Button>
      </Paper>
    </Container>
  );
};

export default Profile;
