import React from "react";
import { FaUserSecret } from "react-icons/fa6";
import { useNavigate } from "react-router";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="my-3 flex justify-center transition-all select-none text-shadow-md hover:text-shadow-lg sm:hidden">
      <h1
        onClick={() => navigate("/")}
        className="flex cursor-pointer items-center font-[Ubuntu] text-3xl font-semibold"
      >
        <span className="text-[#F05454]">Pass</span>
        <span className="dark:text-primary mr-1 text-[#30475E]">Wired</span>
        <FaUserSecret className="text-[#002041] dark:text-white" />
      </h1>
    </div>
  );
};

export default Header;
