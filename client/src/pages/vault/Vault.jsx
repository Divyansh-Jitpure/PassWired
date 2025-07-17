import React from "react";
import RecentPasswords from "../home/RecentPasswords";
import Title from "../../components/Title";

const Vault = () => {
  return (
    <div className="mt-4 flex flex-col items-center gap-4 select-none">
      <Title text="Saved Passwords" />
      <RecentPasswords pwdCount={Number.MAX_VALUE} />
    </div>
  );
};

export default Vault;
