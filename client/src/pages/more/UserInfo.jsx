import React from "react";
import pic from "/pic2.png";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const UserInfo = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  return (
    <div className="mt-5 flex items-center justify-center gap-3">
      {/* <img
        onClick={() => navigate("/profile")}
        className="aspect-square w-16 cursor-pointer rounded-full object-cover"
        src={pic}
        alt="profilePicture"
      /> */}
      <section className="flex flex-col">
        <span
          onClick={() => navigate("/profile")}
          className="w-fit cursor-pointer text-2xl font-semibold text-[#30475E] text-shadow-md"
        >
          {user?.username}
        </span>
        <span className="text-[#30475eb7]">{user?.email}</span>
      </section>
    </div>
  );
};

export default UserInfo;
