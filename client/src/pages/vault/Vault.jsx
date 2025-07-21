import React, { use, useEffect, useState } from "react";
import RecentPasswords from "../home/RecentPasswords";
import Title from "../../components/Title";
import Password from "../../components/Password";
import AddPassword from "./AddPassword";
import API from "../../utils/api";

const Vault = () => {
  const [allPasswords, setAllPasswords] = useState([]);

  useEffect(() => {
    const fetchAllPasswords = async () => {
      try {
        const res = await API.get("/passwords/allPwds");
        // console.log(res.data);

        setAllPasswords((a) => (a = res.data));
      } catch (error) {
        console.error("Error fetching passwords:", error);
      }
    };
    fetchAllPasswords();
  }, [allPasswords]);

  return (
    <div className="mt-4 flex flex-col items-center gap-4 select-none">
      <Title text="Saved Passwords" />
      <AddPassword />
      <RecentPasswords
        allPasswords={allPasswords}
        pwdCount={Number.MAX_VALUE}
      />
    </div>
  );
};

export default Vault;
