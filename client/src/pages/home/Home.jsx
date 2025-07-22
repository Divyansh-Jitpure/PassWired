import React, { useEffect, useState } from "react";
import Tools from "./tools/Tools";
import Search from "../../components/Search";
import RecentPasswords from "./RecentPasswords";
import { useNavigate } from "react-router";
import Title from "../../components/Title";
import Button from "../../components/Button";
import API from "../../utils/api";

const Home = () => {
  const [allPasswords, setAllPasswords] = useState([]);
  const navigate = useNavigate();
  // const accessToken = useSelector((state) => state.auth.accessToken);
  // console.log("Access Token:", accessToken);

  // const user = useSelector((state) => state.auth.user);
  // useEffect(() => {
  //   console.log("User:", user);
  // }, []);

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
    <div className="mb-22 flex flex-col items-center gap-6 select-none">
      <Search />
      <Tools />
      <Button text="All Features" action={() => navigate("/more")} />
      <Title text="Recent Passwords" />
      <RecentPasswords allPasswords={allPasswords} pwdCount={4} />
      <Button text="See All Passwords" action={() => navigate("/vault")} />
    </div>
  );
};

export default Home;
