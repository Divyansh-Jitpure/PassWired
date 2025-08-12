import React from "react";
import Tool from "./Tool";
import Title from "../../../components/Title";
import { FaUser } from "react-icons/fa";
import { PiPasswordFill } from "react-icons/pi";
import { LuBicepsFlexed } from "react-icons/lu";
import { IoMdMoon } from "react-icons/io";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../../features/auth/authSlice";
import { FaSun } from "react-icons/fa";

const Tools = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { activeTheme } = useSelector((state) => state.auth);

  const tools = [
    {
      toolName: "Profile",
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
      action: () => navigate("/passwordStrength"),
    },
    {
      toolName: "Theme",
      toolIcon: activeTheme ? <IoMdMoon /> : <FaSun />,
      action: () => {
        dispatch(toggleTheme(!activeTheme));
      },
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
