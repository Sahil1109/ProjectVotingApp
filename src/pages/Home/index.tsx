import * as React from "react";
import Header from "../../components/Header";
import Voting from "../../components/Voting";

const Home: React.FC = () => {
  return (
    <div>
      <Header />
      <Voting />
    </div>
  );
};

export default Home;
