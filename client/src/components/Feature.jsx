import React from "react";

const Feature = ({ title }) => {
  return (
    <div className="cursor-pointer rounded-lg bg-amber-50 px-3 py-2 hover:bg-amber-50/60 active:bg-amber-50/60">
      <span className="text-xl">{title}</span>
    </div>
  );
};

export default Feature;
