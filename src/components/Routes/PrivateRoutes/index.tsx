import * as React from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import Home from "../../../pages/Home";

const PrivateRoutes: React.FC = () => {
  return (
    <Switch>
      <Route path="/dashboard" component={Home} />
      <Redirect from="/" to="/dashboard" />
    </Switch>
  );
};

export default PrivateRoutes;
