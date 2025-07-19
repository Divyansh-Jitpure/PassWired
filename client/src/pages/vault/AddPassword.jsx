import React from "react";
import { FaPlus } from "react-icons/fa6";

const AddPassword = () => {
  return (
    <div className="grid w-[80%] grid-cols-2 rounded border px-3 py-1">
      <span className="my-auto mr-auto text-xl font-semibold text-shadow-sm">
        Add Password
      </span>
      <button className="ml-auto cursor-pointer rounded-full p-2 text-2xl hover:bg-white active:bg-white">
        <FaPlus />
      </button>
    </div>
  );
};

export default AddPassword;
