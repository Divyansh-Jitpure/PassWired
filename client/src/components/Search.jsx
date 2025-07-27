import React from "react";
import { FiSearch } from "react-icons/fi";

const Search = () => {
  return (
    <div className="relative mt-6 flex w-[80%] items-center justify-center gap-3 sm:w-[50%] md:w-[40%] xl:w-[30%] 2xl:w-[20%]">
      <input
        type="text"
        className="h-10 w-full rounded-lg border p-2 text-xl shadow-md"
        placeholder="Search"
      />
      <button className="absolute right-2 cursor-pointer">
        <FiSearch className="text-3xl text-[#30475E]" />
      </button>
    </div>
  );
};

export default Search;
