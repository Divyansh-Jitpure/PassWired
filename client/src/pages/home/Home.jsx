import React, { useEffect } from "react";
import Tools from "./tools/Tools";
import Search from "../../components/Search";
import { useNavigate } from "react-router";
import Title from "../../components/Title";
import Button from "../../components/Button";
import RecentPasswords from "../../components/RecentPasswords";
import { useDispatch, useSelector } from "react-redux";
import AddPassword from "../vault/AddPassword";
import { fetchAllPasswords } from "../../features/password/passwordThunks";
import PwdSheet from "../vault/PwdSheet";

const Home = () => {
  const navigate = useNavigate();
  const allPasswords = useSelector((state) => state.password.allPasswords);
  // Redux state for sheet visibility
  const sheetState = useSelector((state) => state.password.sheetState);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllPasswords());
  }, []);

  return (
    <div className="mb-22 flex flex-col items-center gap-6 select-none">
      {sheetState && <PwdSheet />}
      <Search />
      <Tools />
      <Button text="All Features" action={() => navigate("/more")} />
      <Title text="Recent Passwords" />
      <AddPassword />
      {!allPasswords.length ? (
        <span className="">No passwords saved</span>
      ) : (
        <RecentPasswords pwdCount={3} />
      )}
      <Button text="See All Passwords" action={() => navigate("/vault")} />
    </div>
  );
};

export default Home;
