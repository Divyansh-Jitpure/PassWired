import React, { useEffect, useState } from "react";
import RecentPasswords from "../../components/RecentPasswords";
import Title from "../../components/Title";
import AddPassword from "./AddPassword";
import PwdSheet from "./PwdSheet";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPasswords } from "../../features/password/passwordThunks";
import EditPassword from "./EditPassword";

const Vault = () => {
  const allPasswords = useSelector((state) => state.password.allPasswords);

  const dispatch = useDispatch();

  // Redux state for sheet visibility
  const sheetState = useSelector((state) => state.password.sheetState);

  const showEditModal = useSelector((state) => state.auth.showEditModal);

  useEffect(() => {
    dispatch(fetchAllPasswords());
  }, []);

  return (
    <div className="relative mt-4 mb-22 flex flex-col items-center gap-4 select-none sm:mt-22">
      {sheetState && <PwdSheet />}
      {showEditModal && <EditPassword />}

      <Title text="Saved Passwords" />
      <AddPassword />

      {!allPasswords.length ? (
        <span className="">No passwords saved</span>
      ) : (
        <RecentPasswords pwdCount={Number.MAX_VALUE} />
      )}
    </div>
  );
};

export default Vault;
