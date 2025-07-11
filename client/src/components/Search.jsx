import React from "react";
import { FiSearch } from "react-icons/fi";

const Search = () => {
  return (
    <div className="mt-6 flex items-center justify-center gap-2">
      <input
        type="text"
        className="h-10 w-[75%] rounded border p-2 text-xl"
        placeholder="Search"
      />
      <FiSearch className="text-2xl" />
    </div>
  );
};

export default Search;
