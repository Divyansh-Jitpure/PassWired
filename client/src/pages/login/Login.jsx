import React, { useState } from "react";
import Title from "../../components/Title";
import Button from "../../components/Button";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    // handle login
  };

  return (
    <div className="mb-22 flex flex-col items-center justify-center gap-6 select-none">
      {/* Headers */}
      <div className="text-center">
        <h2 className="font-[ubuntu] text-4xl font-semibold text-[#30475E] text-shadow-md">
          — Welcome —
        </h2>
        <p className="text-xl">We are happy to have you back!!</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex w-[75%] flex-col gap-4 sm:w-[25%]"
      >
        {/* Email */}
        <div className="relative w-full">
          <input
            type="text"
            id="email"
            required
            // autoComplete="off"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="peer h-12 w-full rounded-lg border p-4 shadow-md focus:border-[#F05454] focus:outline-none"
          />
          <label
            htmlFor="email"
            className={
              email !== ""
                ? "absolute top-[-11px] left-3 bg-[#DDDDDD] px-1 text-[#F05454]"
                : "absolute top-3 left-4 bg-[#DDDDDD] px-1 text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-[-11px] peer-focus:left-3 peer-focus:text-[#F05454]"
            }
          >
            Email
          </label>
        </div>

        {/* Password */}
        <div className="relative w-full">
          <input
            type="password"
            id="password"
            required
            // autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="peer h-12 w-full rounded-lg border p-4 shadow-md focus:border-[#F05454] focus:outline-none"
          />
          <label
            htmlFor="password"
            className={
              password !== ""
                ? "absolute top-[-11px] left-3 bg-[#DDDDDD] px-1 text-[#F05454]"
                : "absolute top-3 left-4 bg-[#DDDDDD] px-1 text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-[-11px] peer-focus:left-3 peer-focus:text-[#F05454]"
            }
          >
            Password
          </label>
        </div>

        {/* Submit */}
        <div className="mx-auto mt-2">
          <Button type="submit" text="Sign In" />
        </div>
      </form>
      <div className="flex w-[75%] items-center justify-center gap-2">
        <hr className="w-[50%] text-gray-400" />
        <span className="font-[Ubuntu] text-xl"> Or </span>
        <hr className="w-[50%] text-gray-400" />
      </div>

      <div className="flex h-12 w-[75%] cursor-pointer items-center justify-center gap-4 rounded-lg border bg-white/40 hover:bg-white/70 active:bg-white/70">
        <FcGoogle className="text-3xl" />
        <span className="text-xl">Sign In with Google</span>
      </div>
      <span className="">
        Don't have an account{" "}
        <Link to={"/signup"} className="font-semibold text-[#F05454]">
          Sign Up
        </Link>
      </span>
    </div>
  );
};

export default Login;
