import React from "react";
import Tools from "./tools/Tools";
import Search from "../../components/Search";
import RecentPasswords from "./RecentPasswords";

const Home = () => {
  return (
    <div>
      <Search />
      <Tools />
      {/* <RecentPasswords /> */}
    </div>
  );
};

export default Home;
