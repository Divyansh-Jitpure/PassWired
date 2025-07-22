import React, { useEffect, useState } from "react";
import Tools from "./tools/Tools";
import Search from "../../components/Search";
import RecentPasswords from "./RecentPasswords";
import { useNavigate } from "react-router";
import Title from "../../components/Title";
import Button from "../../components/Button";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="mb-22 flex flex-col items-center gap-6 select-none">
      <Search />
      <Tools />
      <Button text="All Features" action={() => navigate("/more")} />
      <Title text="Recent Passwords" />
      <RecentPasswords pwdCount={3} />
      <Button text="See All Passwords" action={() => navigate("/vault")} />
    </div>
  );
};

export default Home;
