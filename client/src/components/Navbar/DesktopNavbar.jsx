import React from "react";
import { useSelector } from "react-redux";
import DesktopHeader from "./DesktopHeader";
import Search from "../Search";
import { Link } from "react-router";
import { FiSearch } from "react-icons/fi";

const DesktopNavbar = () => {
  const { accessToken } = useSelector((state) => state.auth);

  if (!accessToken) return;

  const [isAtTop, setIsAtTop] = React.useState(true);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY === 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed z-10 hidden w-full items-center justify-around bg-[#DDDDDD] py-3 ${
        !isAtTop ? "shadow-md" : ""
      } sm:flex 2xl:py-4`}
    >
      <DesktopHeader />
      <div className="relative flex items-center justify-center sm:mr-1 sm:w-[30%] md:ml-5 md:w-[35%] lg:ml-5 lg:w-[30%] xl:ml-4 xl:w-[23%] 2xl:ml-3 2xl:w-[16%]">
        <input
          type="text"
          className="h-10 w-full rounded-lg border px-3 text-xl shadow-md"
          placeholder="Search"
        />
        <button className="absolute right-2 cursor-pointer">
          <FiSearch className="text-3xl text-[#30475E]" />
        </button>
      </div>
      <div className="flex text-[#30475E] *:text-xl *:font-semibold *:text-shadow-md *:hover:underline *:hover:text-shadow-lg sm:gap-3 md:gap-5">
        <Link to={"/"}>Home</Link>
        <Link to={"/vault"}>Vault</Link>
        <Link to={"/more"}>More</Link>
      </div>
    </div>
  );
};

export default DesktopNavbar;
