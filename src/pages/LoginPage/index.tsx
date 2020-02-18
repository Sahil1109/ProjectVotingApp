import * as React from "react";
import Logo from "../../static/images/logo.jpeg";
import { Grid } from "@material-ui/core";
import { classes } from "./style/styles";
import { FirebaseAuth } from "../../components/AuthenticationContext";

interface LoginPageRoutes {}

const LoginPage: React.FC<LoginPageRoutes> = () => {
  const firebaseAuth = FirebaseAuth.Singleton();
  const handleLogoClick = React.useCallback(async () => {
    await firebaseAuth.signInGoogle();
  }, []);

  return (
    <Grid container direction={"column"} alignItems={"center"}>
      <img
        style={{
          padding: "5px",
          border: "1px solid orange",
          borderRadius: "50%",
          cursor: "pointer"
        }}
        src={Logo}
        className={classes.logo}
        onClick={handleLogoClick}
      />
      <h5>Click on above button to sign in</h5>
      <h4>
        You just need your <b>block8.com</b> email address
      </h4>
    </Grid>
  );
};

export default LoginPage;
