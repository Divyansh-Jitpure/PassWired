import React, { useEffect, useState } from "react";
import { FaCopy } from "react-icons/fa6";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import API from "../utils/api";

const Password = ({ pwd }) => {
  const [password, setPassword] = useState();
  const [showPwd, setShowPwd] = useState(false);

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

  const viewPassword = async (id) => {
    try {
      const res = await API.get(`/passwords/view/${id}`);
      setShowPwd(!showPwd);
      setPassword((p) => (p = res.data));
    } catch (err) {
      console.error(
        "Error fetching password:",
        err.response?.data?.error || err.message,
      );
    }
  };

  const hidePassword = () => {
    setPassword((p) => (p = null));
    setShowPwd(!showPwd);
  };

  const copyPassword = async (id) => {
    try {
      const res = await API.get(`/passwords/view/${id}`);
      await navigator.clipboard.writeText(res.data.password);
    } catch (err) {
      console.error(
        "Error copying password:",
        err.response?.data?.error || err.message,
      );
    }
  };

  // useEffect(() => {
  //   console.log(password);
  // }, [password]);

  return (
    <div className="grid w-full grid-cols-2 rounded border bg-white p-2 shadow-md">
      <section className="flex flex-col">
        <span
          onClick={() => viewPassword(pwd._id)}
          className="w-fit cursor-pointer text-xl font-semibold text-shadow-sm"
        >
          {pwd.service}
        </span>
        <span>{pwd.username}</span>
        {showPwd && (
          <span>
            Password:{" "}
            <span
              onClick={() => copyPassword(pwd._id)}
              className="cursor-pointer rounded-xs bg-gray-300/50 px-1"
            >
              {password.password}
            </span>
          </span>
        )}
      </section>
      <section className="flex items-center justify-end gap-4">
        {showPwd ? (
          <button onClick={hidePassword} className="cursor-pointer">
            <FaEyeSlash className="text-3xl" />
          </button>
        ) : (
          <button
            onClick={() => viewPassword(pwd._id)}
            className="cursor-pointer"
          >
            <FaEye className="text-3xl" />
          </button>
        )}

        <button
          onClick={() => copyPassword(pwd._id)}
          className="cursor-pointer"
        >
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
