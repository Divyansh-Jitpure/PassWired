import React from "react";
import Tool from "./Tool";
import Title from "../../../components/Title";

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
    <div className="flex w-[80%] flex-col items-center gap-4">
      <Title text="Tools" />

      <section className="grid grid-cols-4 gap-3">
        {tools.map((tool) => (
          <Tool toolName={tool} />
        ))}
      </section>
    </div>
  );
};

export default Tools;
