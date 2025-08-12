import React from "react";

const PwdSheetFormInput = ({ value, setValue, label, type }) => {
  return (
    <div className="relative w-full">
      <input
        type={type}
        id={label.toLowerCase()}
        required
        autoComplete="off"
        value={value}
        onChange={setValue}
        className="peer dark:border-primary dark:text-primary h-12 w-full rounded-lg border p-4 shadow-md focus:border-[#F05454] focus:outline-none"
      />
      <label
        htmlFor={label.toLowerCase()}
        className={
          value !== ""
            ? "dark:bg-primary-dark absolute top-[-11px] left-3 bg-white px-1 text-[#F05454]"
            : "dark:bg-primary-dark absolute top-3 left-4 bg-white px-1 text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-[-11px] peer-focus:left-3 peer-focus:text-[#F05454] dark:text-gray-400"
        }
      >
        {label}
      </label>
    </div>
  );
};

export default PwdSheetFormInput;
