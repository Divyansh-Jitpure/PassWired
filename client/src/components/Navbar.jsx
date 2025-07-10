import React, { useState } from "react";
import {
  HiHome,
  HiOutlineHome,
  HiSquares2X2,
  HiOutlineSquares2X2,
  HiLockClosed,
  HiOutlineLockClosed,
} from "react-icons/hi2";
import { useLocation } from "react-router";

const Navbar = () => {
  const path = useLocation().pathname;

  return (
    <nav className="fixed bottom-0 grid h-20 w-full grid-cols-3 items-center justify-items-center gap-5 bg-[#F05454] *:flex *:h-full *:w-full *:flex-col *:items-center *:justify-center *:hover:bg-[#ef3c3c]">
      <section>
        {path === "/vault" ? (
          <HiLockClosed className="text-4xl" />
        ) : (
          <HiOutlineLockClosed className="text-4xl" />
        )}
        <span className="font-semibold">Vault</span>
      </section>
      <section>
        {path === "/" ? (
          <HiHome className="text-4xl" />
        ) : (
          <HiOutlineHome className="text-4xl" />
        )}
        <span className="font-semibold">Home</span>
      </section>
      <section className="flex flex-col">
        {path === "/more" ? (
          <HiSquares2X2 className="text-4xl" />
        ) : (
          <HiOutlineSquares2X2 className="text-4xl" />
        )}
        <span className="font-semibold">More</span>
      </section>
    </nav>
  );
};

export default Navbar;
