import React from "react";
import { Paper, Typography, Container, Button } from "@material-ui/core";
import useStyles from "./styles";
import { Link } from "react-router-dom";

const Profile = () => {
  const classes = useStyles();

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
        <Typography variant="body1">Welcome Back!</Typography>
        <Button
          component={Link}
          to="/"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Log Out
        </Button>
      </Paper>
    </Container>
  );
};

export default Profile;
