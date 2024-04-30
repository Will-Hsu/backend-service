import React, { useState } from "react";
import {
  Avatar,
  Paper,
  Grid,
  Typography,
  Container,
  Button,
} from "@material-ui/core";
// import axios from "axios";
import jwt_decode from "jwt-decode";
import useStyles from "./styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Input from "./Input";
// import Icon from "./Icon";
import { useNavigate } from "react-router-dom";
import { login, register } from "../../services/auth";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = ({ newUser }) => {
  const classes = useStyles();
  const [formData, setFormData] = useState(initialState);
  const [isSignup, setSignup] = useState(newUser);
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword((prev) => !prev);
  const switchMode = () => {
    setSignup((prev) => !prev);
    if (isSignup) navigate("/login");
    else navigate("/register");
  };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call register function from auth.js
      const response = isSignup
        ? await register(formData)
        : await login(formData);

      const { token } = response.data.token;
      const decoded = jwt_decode(token);

      // Store token and user in local storage
      localStorage.setItem("user", decoded.userName);
      localStorage.setItem("token", token);

      // Handle successful registration
      console.log("Authenticated successfully", token);
      navigate("/profile");
    } catch (error) {
      // Handle error
      console.error("Error occurred:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
    >
      <Paper
        className={classes.paper}
        elevation={3}
      >
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sign Up" : "Sign In"}</Typography>
        <form
          className={classes.form}
          onSubmit={handleSubmit}
        >
          <Grid
            container
            spacing={2}
          >
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Register" : "Log In"}
          </Button>
          <Grid
            container
            justifyContent="flex-end"
          >
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
