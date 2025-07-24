import React from "react";
import { FaPlus } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { setSheetState } from "../../features/password/passwordSlice";

const AddPassword = () => {
  const dispatch = useDispatch();

  return (
    <div className="flex w-[60%] items-center justify-around gap-20 rounded border bg-white px-3 py-1 shadow-md">
      <span
        onClick={() => dispatch(setSheetState())}
        className="cursor-pointer text-xl font-semibold text-shadow-sm"
      >
        Add Password
      </span>
      <button
        onClick={() => dispatch(setSheetState())}
        className="cursor-pointer rounded-full p-2 text-2xl hover:bg-gray-300/30 active:bg-gray-300/30"
      >
        <FaPlus />
      </button>
    </div>
  );
};

export default AddPassword;
