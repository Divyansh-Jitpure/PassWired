import React from "react";
import { FaCopy } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";

const Password = ({ platform, id }) => {
  return (
    <div className="grid w-full grid-cols-2 rounded border p-2 shadow-md">
      <section className="flex flex-col">
        <span className="text-xl font-semibold text-shadow-sm">{platform}</span>
        <span>{id}</span>
      </section>
      <section className="flex items-center justify-end gap-3">
        <button className="cursor-pointer">
          <FaCopy className="text-2xl" />
        </button>
        <button className="cursor-pointer">
          <MdDelete className="text-3xl" />
        </button>
      </section>
    </div>
  );
};

export default Password;
