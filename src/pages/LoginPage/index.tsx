import * as React from "react";
import Logo from "../../static/images/logo.jpeg";
import { Grid, CircularProgress } from "@material-ui/core";
import { classes } from "./style/styles";
import { FirebaseAuth } from "../../components/AuthenticationContext";
import firebase from "../../utils/firebase";

interface LoginPageRoutes {
  handleLoading: (arg: boolean) => void;
  handleLoginPage: (arg: boolean) => void;
}

const LoginPage: React.FC<LoginPageRoutes> = ({
  handleLoading,
  handleLoginPage
}) => {
  const firebaseAuth = FirebaseAuth.Singleton();
  const handleLogoClick = React.useCallback(async () => {
    await firebaseAuth.signInGoogle();
  }, []);

  React.useEffect(() => {
    firebase
      .auth()
      .getRedirectResult()
      .then(response => {
        if (response!.user !== null) {
          handleLoginPage(false);
        }
        handleLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
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
