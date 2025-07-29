import React from "react";
import Tool from "./Tool";
import Title from "../../../components/Title";
import { FaUser } from "react-icons/fa";
import { PiPasswordFill } from "react-icons/pi";
import { LuBicepsFlexed } from "react-icons/lu";
import { IoMdMoon } from "react-icons/io";
import { useNavigate } from "react-router";
import { toast } from "sonner";
const Tools = () => {
  const navigate = useNavigate();

  const tools = [
    {
      toolName: "View Profile",
      toolIcon: <FaUser />,
      action: () => navigate("/profile"),
    },
    {
      toolName: "Password Generator",
      toolIcon: <PiPasswordFill />,
      action: () => navigate("/passwordGenerator"),
    },
    {
      toolName: "Password Strength Checker",
      toolIcon: <LuBicepsFlexed />,
      action: () => toast.info("Password Strength Checker is Coming Soon!!"),
    },
    {
      toolName: "Theme",
      toolIcon: <IoMdMoon />,
      action: () => toast.info("Dark Theme is Coming Soon!!"),
    },
  ];
  return (
    <div className="mt-4 flex flex-col items-center justify-center gap-4">
      <Title text="Tools" />

      <section className="flex gap-4">
        {tools.map((tool, index) => (
          <Tool
            key={index}
            toolName={tool.toolName}
            toolIcon={tool.toolIcon}
            action={tool.action}
          />
        ))}
      </section>
    </div>
  );
};

export default Tools;
