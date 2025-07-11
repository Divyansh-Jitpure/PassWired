import React from "react";
import Password from "../../components/Password";

const RecentPasswords = () => {
  const pwds = [
    { platform: "Google", id: "example.gmail.com" },
    { platform: "Facebook", id: "FacebookID" },
    { platform: "instagram", id: "InstaID" },
    { platform: "Amazon", id: "example.gmail.com" },
  ];
  return (
    <div className="mt-6 mb-22 flex flex-col items-center">
      <h2 className="mb-4 font-[ubuntu] text-2xl font-semibold">
        Recent Passwords
      </h2>

      <section className="flex w-[80%] flex-col gap-3">
        {pwds.map((pwd) => (
          <Password platform={pwd.platform} id={pwd.id} />
        ))}
      </section>
    </div>
  );
};

export default RecentPasswords;
