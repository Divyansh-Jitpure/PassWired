import React, { useEffect, useState } from "react";
import RecentPasswords from "../../components/RecentPasswords";
import Title from "../../components/Title";
import AddPassword from "./AddPassword";
import PwdSheet from "./PwdSheet";

const Vault = () => {
  return (
    <div className="relative mt-4 flex flex-col items-center gap-4 select-none">
      <Title text="Saved Passwords" />
      <AddPassword />
      <PwdSheet />
      <RecentPasswords pwdCount={Number.MAX_VALUE} />
    </div>
  );
};

export default Vault;
