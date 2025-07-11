import React from "react";
import Tool from "./Tool";

const Tools = () => {
  const tools = [
    "Tool",
    "Tool",
    "Tool",
    "Tool",
    "Tool",
    "Tool",
    "Tool",
    "Tool",
  ];
  return (
    <div className="mt-6 flex flex-col items-center">
      <h2 className="mb-4 font-[ubuntu] text-2xl font-semibold">Tools</h2>

      <section className="grid w-[90%] grid-cols-4 gap-3">
        {tools.map((tool) => (
          <Tool toolName={tool} />
        ))}
      </section>
    </div>
  );
};

export default Tools;
