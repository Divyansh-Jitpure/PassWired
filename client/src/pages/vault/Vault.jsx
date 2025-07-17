import React from "react";
import RecentPasswords from "../home/RecentPasswords";
import Title from "../../components/Title";
import Password from "../../components/Password";
import AddPassword from "./AddPassword";

const Vault = () => {
  return (
    <div className="mt-4 flex flex-col items-center gap-4 select-none">
      <Title text="Saved Passwords" />
      <AddPassword />
      <section className="w-[80%]">
        <Password platform="{pwd.platform}" id="{pwd.id}" />
      </section>
      <RecentPasswords pwdCount={Number.MAX_VALUE} />
    </div>
  );
};

export default Vault;
