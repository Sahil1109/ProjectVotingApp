import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PublicRoutes from "./components/Routes/PublicRoutes";
import PrivateRoutes from "./components/Routes/PrivateRoutes";
import AuthenticationContext, {
  Context
} from "./components/AuthenticationContext";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AuthenticationContext>
        <Context.Consumer>
          {value => {
            if (value) {
              return (
                <Switch>
                  <Route path="/dashboard" component={PrivateRoutes} />
                </Switch>
              );
            }
            return <PublicRoutes />;
          }}
        </Context.Consumer>
      </AuthenticationContext>
    </BrowserRouter>
  );
};

export default App;