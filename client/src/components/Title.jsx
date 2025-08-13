import React from "react";

const Title = ({ text }) => {
  return (
    <h2 className="font-[ubuntu] text-2xl font-semibold text-[#30475E] text-shadow-md dark:text-[#F05454]">
      — {text} —
    </h2>
  );
};

export default Title;
