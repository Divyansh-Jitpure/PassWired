import React from "react";
import Tools from "./tools/Tools";
import Search from "../../components/Search";
import { useNavigate } from "react-router";
import Title from "../../components/Title";
import Button from "../../components/Button";
import RecentPasswords from "../../components/RecentPasswords";
import { useSelector } from "react-redux";

const Home = () => {
  const navigate = useNavigate();
  const allPasswords = useSelector((state) => state.password.allPasswords);

  return (
    <div className="mb-22 flex flex-col items-center gap-6 select-none">
      <Search />
      <Tools />
      <Button text="All Features" action={() => navigate("/more")} />
      <Title text="Recent Passwords" />
      {allPasswords.length === 0 ? (
        <span className="">No passwords saved</span>
      ) : (
        <RecentPasswords pwdCount={3} />
      )}
      <Button text="See All Passwords" action={() => navigate("/vault")} />
    </div>
  );
};

export default Home;
