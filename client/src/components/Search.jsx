import React from "react";
import { FiSearch } from "react-icons/fi";

const Search = () => {
  return (
    <div className="mt-6 flex w-[85%] items-center justify-center gap-3">
      <input
        type="text"
        className="h-10 w-full rounded border p-2 text-xl shadow-md"
        placeholder="Search"
      />
      <button className="cursor-pointer">
        <FiSearch className="text-4xl" />
      </button>
    </div>
  );
};

export default Search;
