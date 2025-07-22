import React, { useEffect, useState } from "react";
import RecentPasswords from "../home/RecentPasswords";
import Title from "../../components/Title";
import AddPassword from "./AddPassword";
import API from "../../utils/api";
import PwdSheet from "./PwdSheet";
import { useDispatch, useSelector } from "react-redux";
import { setAllPasswords } from "../../features/password/passwordSlice";
import { fetchAllPasswords } from "../../features/password/passwordThunks";

const Vault = () => {
  const allPasswords = useSelector((state) => state.password.allPasswords);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllPasswords());
  }, [allPasswords]);

  return (
    <div className="relative mt-4 flex flex-col items-center gap-4 select-none">
      <Title text="Saved Passwords" />
      <AddPassword />
      <PwdSheet />
      <RecentPasswords
        allPasswords={allPasswords}
        pwdCount={Number.MAX_VALUE}
      />
    </div>
  );
};

export default Vault;
