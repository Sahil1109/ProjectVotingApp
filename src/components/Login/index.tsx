import * as React from "react";

import { Paper, Grid, CircularProgress } from "@material-ui/core";
import LoginPage from "../../pages/LoginPage";

interface ILoginProps {}

const Login: React.FC<ILoginProps> = () => {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [displayLogin, setDisplayLogin] = React.useState<boolean>(true);

  const handleLoginPage = React.useCallback(
    displayState => {
      setDisplayLogin(displayState);
    },
    []
  );

  const handleLoading = React.useCallback(
    loadingState => setLoading(loadingState),
    []
  );

  return (
    <Paper
      style={{
        border: "3px solid rgb(127,0,255)",
        height: "100vh",
        width: "100vw",
        padding: "1em"
      }}
    >
      <Grid
        style={{ height: "100%", border: "2px solid rgb(49,0,72)" }}
        container
        justify="center"
      >
        <Grid item sm={12}>
          <b>
            <h1 style={{ textAlign: "center", margin: "1em 0em 0em 0em" }}>
              Project Ideas Voting
            </h1>
          </b>
        </Grid>

        <Grid item sm={12} container justify={"center"}>
          {loading && <CircularProgress />}
          {displayLogin && (
            <LoginPage
              handleLoading={handleLoading}
              handleLoginPage={handleLoginPage}
            />
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Login;
