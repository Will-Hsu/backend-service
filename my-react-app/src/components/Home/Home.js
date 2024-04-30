import React from "react";
import {
  Paper,
  Typography,
  Container,
  Button,
  Avatar,
} from "@material-ui/core";
// import LockOutlinedIcon from "@mui/icons-material/Deck";
import LockOutlinedIcon from "@material-ui/icons/Deck";
import useStyles from "./styles";
import { Link } from "react-router-dom";

const Home = () => {
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
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">Backend Test UI</Typography>
        <Button
          component={Link}
          to="/register"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Register
        </Button>
        <Button
          component={Link}
          to="/login"
          fullWidth
          variant="contained"
          color="primary"
        >
          Log In
        </Button>
      </Paper>
    </Container>
  );
};

export default Home;
