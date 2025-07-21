import React, { use, useEffect, useState } from "react";
import RecentPasswords from "../home/RecentPasswords";
import Title from "../../components/Title";
import Password from "../../components/Password";
import AddPassword from "./AddPassword";
import API from "../../utils/api";
import PwdSheet from "./PwdSheet";

const Vault = () => {
  const [allPasswords, setAllPasswords] = useState([]);
  const [sheetOpen, setSheetOpen] = useState(false);

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
    <div className="relative mt-4 flex flex-col items-center gap-4 select-none">
      <Title text="Saved Passwords" />
      <AddPassword setSheetOpen={setSheetOpen} sheetOpen={sheetOpen} />
      <PwdSheet sheetOpen={sheetOpen} setSheetOpen={setSheetOpen} />
      <RecentPasswords
        allPasswords={allPasswords}
        pwdCount={Number.MAX_VALUE}
      />
    </div>
  );
};

export default Vault;
