import React from "react";

const Tool = ({ toolName }) => {
  return (
    <div className="h-18 w-18 bg-[#F05454]">
      <span className="flex h-full items-center justify-center">
        {toolName}
      </span>
    </div>
  );
};

export default Tool;
