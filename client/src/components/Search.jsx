import React from "react";
import { FiSearch } from "react-icons/fi";
import { toast } from "sonner";

const Search = () => {
  return (
    <div className="relative flex w-[70%] items-center justify-center gap-3">
      <input
        type="text"
        className="dark:border-primary dark:text-primary dark:placeholder:text-primary h-10 w-full rounded-lg border p-2 text-xl shadow-md"
        placeholder="Search"
      />
      <button
        onClick={() => toast.info("Search is Coming Soon!!")}
        className="absolute right-2 cursor-pointer"
      >
        <FiSearch className="dark:text-primary text-3xl text-[#30475E]" />
      </button>
    </div>
  );
};

export default Search;
