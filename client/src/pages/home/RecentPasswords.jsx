import React from "react";
import Password from "../../components/Password";

const RecentPasswords = ({ pwdCount }) => {
  const pwds = [
    { platform: "Google", id: "example.gmail.com" },
    { platform: "Facebook", id: "FacebookID" },
    { platform: "instagram", id: "InstaID" },
    { platform: "Amazon", id: "example.gmail.com" },
    { platform: "Amazon", id: "example.gmail.com" },
    { platform: "Amazon", id: "example.gmail.com" },
  ];
  return (
    <div className="flex w-[80%] flex-col gap-3">
      {pwds.map((pwd, index) => {
        return (
          index < pwdCount && <Password platform={pwd.platform} id={pwd.id} />
        );
      })}
    </div>
  );
};

export default RecentPasswords;
