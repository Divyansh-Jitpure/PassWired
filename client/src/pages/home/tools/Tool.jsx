import React from "react";

const Tool = ({ toolName, toolIcon, action }) => {
  return (
    <div
      onClick={action}
      className="group flex cursor-pointer flex-col items-center gap-2"
    >
      <span className="text-3xl">{toolIcon}</span>
      <span className="flex min-h-14 w-20 items-center justify-center rounded bg-[#F05454] p-1 text-center text-sm font-semibold text-white shadow-md group-hover:bg-[#ef3c3c] group-active:bg-[#ef3c3c] hover:bg-[#ef3c3c] active:bg-[#ef3c3c]">
        {toolName}
      </span>
    </div>
  );
};

export default Tool;
