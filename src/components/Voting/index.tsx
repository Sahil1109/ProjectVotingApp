import * as React from "react";
import { Grid } from "@material-ui/core";
import Themes from "./Themes";
import { Route, __RouterContext } from "react-router";
import { Link } from "react-router-dom";
import AddThemeDialog from "./AddTheme";
import { classes } from "./style";

const Voting: React.FC = () => {
  return (
    <Grid>
      <div className={classes.addTheme}>
        <Route path={"/dashboard/add-theme"} component={AddThemeDialog} />
        <Grid
          item
          xs={12}
          container
          className={classes.borderBottom}
          justify={"space-between"}
          alignItems={"center"}
        >
          <h4 className={classes.addThemeTitle}>Add a new theme</h4>
          <Link to="/dashboard/add-theme">
            <button className={classes.addThemeButton}>+</button>
          </Link>
        </Grid>
        <Grid>
          <Themes />
        </Grid>
      </div>
    </Grid>
  );
};

export default Voting;
