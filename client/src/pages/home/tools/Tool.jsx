import React from "react";

const Tool = ({ toolName }) => {
  return (
    <div className="flex min-h-16 w-20 cursor-pointer items-center justify-center rounded bg-[#F05454] px-1 py-2 shadow-md hover:bg-[#ef3c3c] active:bg-[#ef3c3c]">
      <span className="text-center text-sm font-semibold">{toolName}</span>
    </div>
  );
};

export default Tool;
