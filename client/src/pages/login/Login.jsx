import React, { useState } from "react";
import Button from "../../components/Button";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router";
import FormInput from "../../components/FormInput";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = (e) => {
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
        onSubmit={handleLogin}
        className="flex w-[75%] flex-col gap-4 sm:w-[25%]"
      >
        {/* Email */}
        <FormInput
          value={email}
          setValue={setEmail}
          lable="Email"
          type="email"
        />

        {/* Password */}
        <FormInput
          value={password}
          setValue={setPassword}
          lable="Password"
          type="password"
        />

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

      <div className="">
        Don't have an account{" "}
        <Link to={"/signup"} className="font-semibold text-[#F05454]">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Login;
