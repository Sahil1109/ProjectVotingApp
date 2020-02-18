import * as React from "react";
import LoginPage from "../../../pages/LoginPage";
import { Paper, Grid } from "@material-ui/core";


interface PublicRoutesProps {}

const PublicRoutes: React.FC<PublicRoutesProps> = () => {
  return (
    <Paper
      style={{
        border: "1px solid orange",
        height: "100vh",
        width: "100vw",
        padding: "1em"
      }}
    >
      <Grid
        style={{ height: "100%", border: "2px dashed orange" }}
        container
        justify="center"
      >
        <Grid item sm={12}>
          <b>
            <h1 style={{ textAlign: "center", margin: "1em 0em 0em 0em" }}>
              Blockathon
            </h1>
          </b>
          <h3 style={{ textAlign: "center" }}>2.0</h3>
        </Grid>
        <Grid item sm={12} container justify={"center"}>
          <LoginPage />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PublicRoutes;
