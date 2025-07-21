import React from "react";
import { FaCopy } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import API from "../utils/api";

const Password = ({ pwd }) => {
  const handlleDelete = async () => {
    try {
      await API.delete(`/passwords/delete/${pwd._id}`);
    } catch (err) {
      console.error(
        "Error deleting password:",
        err.response?.data?.error || err.message,
      );
    }
  };

  const viewPassword = () => {};
  return (
    <div className="grid w-full grid-cols-2 rounded border bg-white p-2 shadow-md">
      <section className="flex flex-col">
        <span
          onClick={viewPassword}
          className="w-fit cursor-pointer text-xl font-semibold text-shadow-sm"
        >
          {pwd.service}
        </span>
        <span>{pwd.username}</span>
      </section>
      <section className="flex items-center justify-end gap-3">
        <button className="cursor-pointer">
          <FaCopy className="text-2xl" />
        </button>
        <button onClick={handlleDelete} className="cursor-pointer">
          <MdDelete className="text-3xl" />
        </button>
      </section>
    </div>
  );
};

export default Password;
