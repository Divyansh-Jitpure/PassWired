import React, { useEffect } from "react";
import Password from "../../components/Password";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPasswords } from "../../features/password/passwordThunks";

const RecentPasswords = ({ pwdCount }) => {
  const allPasswords = useSelector((state) => state.password.allPasswords);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllPasswords());
  }, [allPasswords]);

  return (
    <div className="flex w-[80%] flex-col gap-3">
      {allPasswords?.map((pwd, index) => {
        return index < pwdCount && <Password key={index} pwd={pwd} />;
      })}
    </div>
  );
};

export default RecentPasswords;
