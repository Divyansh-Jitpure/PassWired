import React from "react";

const Feature = ({ title, action }) => {
  return (
    <div
      onClick={() => action()}
      className="cursor-pointer rounded-lg bg-white px-3 py-2 hover:bg-white/60 active:bg-white/60 dark:hover:bg-white/80"
    >
      <span className="text-xl">{title}</span>
    </div>
  );
};

export default Feature;
