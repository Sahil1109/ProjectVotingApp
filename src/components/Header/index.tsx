import * as React from "react";
import { Grid, Paper } from "@material-ui/core";
import { Context, FirebaseAuth } from "../AuthenticationContext";
import { __RouterContext } from "react-router";
import { css } from "emotion";

const classes = {
  email: css`
    margin: 1em;
  `
};

const Header: React.FC = () => {
  const context = React.useContext(Context);
  const router = React.useContext(__RouterContext);
  const history = router.history;

  const handleSignout = React.useCallback(async () => {
    await FirebaseAuth.Singleton().signOutGoogle();
    history.replace("/");
    window.location.reload();
  }, [history]);

  return (
    <Paper>
      <Grid container>
        <Grid item xs={10}>
          <h4 className={classes.email}>
            Welcome , <br />
            <b>{context!.displayName}</b>
          </h4>
        </Grid>
        <Grid item xs={2} container justify={"center"} alignItems={"center"}>
          <button
            style={{ border: "1px orange solid", padding: "5px" }}
            onClick={handleSignout}
          >
            Sneek Out
          </button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Header;
