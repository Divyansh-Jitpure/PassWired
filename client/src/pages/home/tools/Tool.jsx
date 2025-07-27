import React from "react";

const Tool = ({ toolName, toolIcon, action }) => {
  return (
    <div
      onClick={action}
      className="flex max-h-fit w-20 cursor-pointer flex-col items-center gap-1 rounded-lg p-2 shadow-lg"
    >
      <span className="text-3xl text-[#d63535]">{toolIcon}</span>
      <span className="text-center text-sm font-semibold text-shadow-lg">
        {toolName}
      </span>
    </div>
  );
};

export default Tool;
