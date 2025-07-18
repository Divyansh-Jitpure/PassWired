import React from "react";

const Button = ({ text, action, type }) => {
  return (
    <button
      onClick={() => action()}
      type={type}
      className="cursor-pointer rounded bg-[#F05454] px-3 py-1 text-xl text-[#DDDDDD] shadow-md transition-all select-none hover:bg-[#ef3c3c] active:bg-[#ef3c3c]"
    >
      {text}
    </button>
  );
};

export default Button;
