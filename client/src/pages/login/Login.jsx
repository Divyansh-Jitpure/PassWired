import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
import FormInput from "../../components/FormInput";
import { useDispatch } from "react-redux";
import { login } from "../../features/auth/authThunks";
import { toast } from "sonner";
import { FaEye, FaEyeSlash } from "react-icons/fa";

// Login component for user authentication
const Login = () => {
  // State for email, password, and password visibility
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handles login form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    // Promise for login process to show toast notifications
    const loginPromise = new Promise(async (resolve, reject) => {
      try {
        // Dispatch login thunk with email and password
        const result = await dispatch(login({ email, password }));

        // Check if login was successful
        if (login.fulfilled.match(result)) {
          // Redirect based on whether user has set a PIN
          if (!result.payload.user.pin) {
            navigate("/appPin", { state: { id: result.payload.user.id } });
          } else {
            navigate("/");
          }
          resolve();
        } else {
          // Login failed
          reject(result.payload || "Login failed!");
        }
      } catch (err) {
        // Handle errors
        reject(err.response?.data?.error || "Login failed!");
      }
    });

    // Show toast notifications for login process
    toast.promise(loginPromise, {
      loading: "Logging in...",
      success: "Login Successful!",
      error: (errMsg) => errMsg,
    });

    return loginPromise;
  };

  const googleSignIn = () => {
    toast.info("Coming Soon!!");
  };

  return (
    <div className="mb-22 flex flex-col items-center justify-center gap-6 select-none sm:gap-5 2xl:gap-6">
      {/* Headers */}
      <div className="text-center">
        <h2 className="font-[ubuntu] text-4xl font-semibold text-[#30475E] text-shadow-md">
          — Welcome —
        </h2>
        <p className="text-xl">We are happy to have you back!!</p>
      </div>

      {/* Login Form */}
      <form
        onSubmit={handleLogin}
        className="flex w-[75%] flex-col gap-4 sm:w-[50%] md:w-[40%] xl:w-[30%] 2xl:w-[20%]"
      >
        {/* Email Input */}
        <FormInput
          value={email}
          setValue={setEmail}
          label="Email"
          type="email"
        />

        {/* Password Input with show/hide toggle */}
        <div className="relative">
          <FormInput
            value={password}
            setValue={setPassword}
            label="Password"
            type={showPassword ? "text" : "password"}
          />
          {/* Toggle password visibility */}
          {password &&
            (showPassword ? (
              <FaEyeSlash
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-2xl"
              />
            ) : (
              <FaEye
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-2xl"
              />
            ))}
        </div>

        {/* Submit Button */}
        <div className="mx-auto mt-2">
          <button
            type="submit"
            className="cursor-pointer rounded bg-[#F05454] px-3 py-1 text-xl text-[#DDDDDD] shadow-md transition-all select-none hover:bg-[#ef3c3c] active:bg-[#ef3c3c]"
          >
            Sign In
          </button>
        </div>
      </form>

      {/* Divider */}
      <div className="flex w-[75%] items-center justify-center gap-2 sm:w-[50%] md:w-[40%] xl:w-[30%] 2xl:w-[20%]">
        <hr className="w-[50%] text-gray-400" />
        <span className="font-[Ubuntu] text-xl"> Or </span>
        <hr className="w-[50%] text-gray-400" />
      </div>

      {/* Google Sign In Button */}
      <div
        onClick={googleSignIn}
        className="flex h-12 w-[75%] cursor-pointer items-center justify-center gap-4 rounded-lg border bg-white/40 hover:bg-white/70 active:bg-white/70 sm:w-[50%] md:w-[40%] xl:w-[30%] 2xl:w-[20%]"
      >
        <FcGoogle className="text-3xl" />
        <span className="text-xl">Sign In with Google</span>
      </div>

      {/* Link to Signup Page */}
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
