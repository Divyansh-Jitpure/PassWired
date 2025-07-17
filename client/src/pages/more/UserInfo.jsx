import React from "react";
import pic from "/pic2.png";
import { useNavigate } from "react-router";

const UserInfo = () => {
  const navigate = useNavigate();
  const username = "DivyanshJit";
  const email = "divyanshjit@gmail.com";
  return (
    <div className="mt-5 flex items-center justify-center gap-3">
      <img
        className="aspect-square w-16 cursor-pointer rounded-full object-cover"
        src={pic}
        alt="profilePicture"
      />
      <section className="flex flex-col">
        <span
          onClick={() => navigate("/profile")}
          className="cursor-pointer text-xl font-semibold text-[#30475E]"
        >
          {username}
        </span>
        <span className="text-[#30475eb7]">{email}</span>
      </section>
    </div>
  );
};

export default UserInfo;
