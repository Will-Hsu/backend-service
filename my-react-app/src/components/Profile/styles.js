import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: theme.spacing(2),
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  button: {
    margin: theme.spacing(2, 0, 2),
  },
}));
