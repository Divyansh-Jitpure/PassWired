import React from "react";
import { GiSherlockHolmes } from "react-icons/gi";
import { useNavigate } from "react-router";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="my-3 flex cursor-pointer justify-center select-none text-shadow-md">
      <h1
        onClick={() => navigate("/")}
        className="flex items-center font-[Ubuntu] text-3xl font-semibold"
      >
        <span className="text-[#F05454]">Pass</span>
        <span className="mr-1 text-[#30475E]">Wired</span>
        <GiSherlockHolmes className="text-[#9a4000]" />
      </h1>
    </div>
  );
};

export default Header;
