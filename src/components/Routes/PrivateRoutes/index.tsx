import * as React from "react";
import { RouteComponentProps } from "react-router";
import Header from "../../Header";
import Voting from "../../Voting";

const PrivateRoutes: React.FC<RouteComponentProps> = props => {
  return (
    <div>
      <Header />
      <Voting />
    </div>
  );
};

export default PrivateRoutes;
