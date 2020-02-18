import * as React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "../../Login";

interface PublicRoutesProps {}

const PublicRoutes: React.FC<PublicRoutesProps> = () => {
  return (
    <Switch>
      <Route path={["/login"]} component={Login} />
      <Redirect from="/" to="/login" />
    </Switch>
  );
};

export default PublicRoutes;
