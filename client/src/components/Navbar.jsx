import React, { useState } from "react";
import {
  HiHome,
  HiOutlineHome,
  HiSquares2X2,
  HiOutlineSquares2X2,
  HiLockClosed,
  HiOutlineLockClosed,
} from "react-icons/hi2";
import { useLocation, useNavigate } from "react-router";

const Navbar = () => {
  const navigate = useNavigate();
  const path = useLocation().pathname;

  return (
    <nav className="fixed bottom-0 grid h-16 w-full grid-cols-3 items-center justify-items-center bg-[#F05454] transition-all text-shadow-sm *:flex *:h-full *:w-full *:cursor-pointer *:flex-col *:items-center *:justify-center *:hover:bg-[#ef3c3c] *:active:bg-[#ef3c3c] sm:hidden">
      <section onClick={() => navigate("/vault")}>
        {path === "/vault" ? (
          <HiLockClosed className="text-3xl" />
        ) : (
          <HiOutlineLockClosed className="text-3xl" />
        )}
        <span className="font-semibold select-none">Vault</span>
      </section>
      <section onClick={() => navigate("/")}>
        {path === "/" ? (
          <HiHome className="text-3xl" />
        ) : (
          <HiOutlineHome className="text-3xl" />
        )}
        <span className="font-semibold select-none">Home</span>
      </section>
      <section onClick={() => navigate("/more")}>
        {path === "/more" ? (
          <HiSquares2X2 className="text-3xl" />
        ) : (
          <HiOutlineSquares2X2 className="text-3xl" />
        )}
        <span className="font-semibold select-none">More</span>
      </section>
    </nav>
  );
};

export default Navbar;
