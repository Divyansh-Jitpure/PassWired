import React from "react";
import { FaCopy } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";

const Password = ({ platform, id }) => {
  return (
    <div className="grid w-full grid-cols-2 rounded border p-2">
      <section className="flex flex-col">
        <span className="text-xl font-semibold">{platform}</span>
        <span>{id}</span>
      </section>
      <section className="flex items-center justify-end gap-2">
        <button>
          <FaCopy className="text-2xl" />
        </button>
        <button>
          <MdDelete className="text-3xl" />
        </button>
      </section>
    </div>
  );
};

export default Password;
