import React, { useEffect } from "react";
import Password from "../../components/Password";

const RecentPasswords = ({ pwdCount, allPasswords }) => {
  // console.log(allPasswords);

  return (
    <div className="flex w-[80%] flex-col gap-3">
      {allPasswords?.map((pwd, index) => {
        return (
          index < pwdCount && (
            <Password
              key={index}
              pwd={pwd}
              platform={pwd.service}
              id={pwd.username}
            />
          )
        );
      })}
    </div>
  );
};

export default RecentPasswords;
