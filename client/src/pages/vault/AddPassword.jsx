import React, { useEffect } from "react";
import { FaPlus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { setSheetState } from "../../features/password/passwordSlice";

const AddPassword = () => {
  const sheetState = useSelector((state) => state.password.sheetState);
  // useEffect(() => {
  //   console.log("SheetState:", sheetState);
  // }, [sheetState]);

  const dispatch = useDispatch();

  return (
    <div className="grid w-[80%] grid-cols-2 rounded border px-3 py-1">
      <span className="my-auto mr-auto text-xl font-semibold text-shadow-sm">
        Add Password
      </span>
      <button
        onClick={() => dispatch(setSheetState())}
        className="ml-auto cursor-pointer rounded-full p-2 text-2xl hover:bg-white active:bg-white"
      >
        <FaPlus />
      </button>
    </div>
  );
};

export default AddPassword;
