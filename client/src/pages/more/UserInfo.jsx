import React from "react";
import pic from "/public/pic2.png";

const UserInfo = () => {
  const username = "DivyanshJit";
  const email = "divyanshjit@gmail.com";
  return (
    <div className="mt-5 flex items-center justify-center gap-3">
      <img
        className="aspect-square w-15 rounded-full object-cover"
        src={pic}
        alt="profilePicture"
      />
      <section className="flex flex-col">
        <span className="text-xl font-semibold">{username}</span>
        <span className="text-gray-700">{email}</span>
      </section>
    </div>
  );
};

export default UserInfo;
