import React from "react";
import Tool from "./Tool";
import Title from "../../../components/Title";

const Tools = () => {
  const tools = [
    "Change Password",
    "Export Vault",
    "Password Strength",
    "Feedback",
    "Delete Account",
  ];
  return (
    <div className="flex w-[80%] flex-col items-center gap-4">
      <Title text="Tools" />

      <section className="grid grid-cols-4 gap-3 sm:grid-cols-8">
        {tools.map((tool) => (
          <Tool toolName={tool} />
        ))}
      </section>
    </div>
  );
};

export default Tools;
