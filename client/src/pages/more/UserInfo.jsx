import React from "react";
import pic from "/pic2.png";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import Title from "../../components/Title";

const UserInfo = () => {
  const user = useSelector((state) => state.auth.user);

  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center gap-3">
      {/* <img
        onClick={() => navigate("/profile")}
        className="aspect-square w-16 cursor-pointer rounded-full object-cover"
        src={pic}
        alt="profilePicture"
      /> */}
      <section className="flex flex-col items-center">
        <span onClick={() => navigate("/profile")} className="cursor-pointer">
          <Title text={user?.username} />
        </span>
        <span className="text-[#30475eb7]">{user?.email}</span>
      </section>
    </div>
  );
};

export default UserInfo;
