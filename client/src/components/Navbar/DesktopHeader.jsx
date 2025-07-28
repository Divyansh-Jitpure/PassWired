import React from "react";
import { FaUserSecret } from "react-icons/fa6";
import { useNavigate } from "react-router";

const DesktopHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="transition-all select-none text-shadow-md hover:text-shadow-lg">
      <h1
        onClick={() => navigate("/")}
        className="flex cursor-pointer items-center font-[Ubuntu] text-3xl font-semibold"
      >
        <span className="text-[#F05454]">Pass</span>
        <span className="mr-1 text-[#30475E]">Wired</span>
        <FaUserSecret className="text-[#002041]" />
      </h1>
    </div>
  );
};

export default DesktopHeader;
