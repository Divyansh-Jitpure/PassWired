import React from "react";
import {
  HiHome,
  HiOutlineHome,
  HiSquares2X2,
  HiOutlineSquares2X2,
  HiLockClosed,
  HiOutlineLockClosed,
} from "react-icons/hi2";
import { CgMenuGridO } from "react-icons/cg";

const Navbar = () => {
  return (
    <nav className="fixed bottom-0 grid h-20 w-full grid-cols-3 items-center justify-items-center bg-[#F05454] *:flex *:h-full *:w-full *:items-center *:justify-center *:hover:bg-amber-600">
      <section className="">
        <HiOutlineLockClosed className="text-5xl" />
        {/* <HiLockClosed className="text-5xl" /> */}
      </section>
      <section className="">
        <HiOutlineHome className="text-5xl" />
        {/* <HiHome className="text-5xl" /> */}
      </section>
      <section className="">
        <HiOutlineSquares2X2 className="text-5xl" />
        {/* <HiSquares2X2 className="text-5xl" /> */}
      </section>
    </nav>
  );
};

export default Navbar;
