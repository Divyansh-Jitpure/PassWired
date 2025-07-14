import React from "react";
import pic from "/public/pic2.png";

const UserInfo = () => {
  const username = "DivyanshJit";
  const email = "divyanshjit@gmail.com";
  return (
    <div className="flex items-center gap-3">
      <img
        className="aspect-square w-15 rounded-full object-cover"
        src={pic}
        alt="profilePicture"
      />
      <section>
        <p className="text-xl font-semibold">{username}</p>
        <p>{email}</p>
      </section>
    </div>
  );
};

export default UserInfo;
