import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
import FormInput from "../../components/FormInput";
import API from "../../utils/api";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "sonner";

// SignUp component for user registration
const SignUp = () => {
  // State variables for form fields and password visibility
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  // Handles form submission for sign up
  const handleSignUp = async (e) => {
    e.preventDefault();

    // Promise for toast notifications
    const signUpPromise = new Promise(async (resolve, reject) => {
      try {
        // Validate required fields
        if (!username || !email || !password || !confirmPassword) {
          reject("Please fill all fields.");
          return;
        }
        // Check if passwords match
        if (password !== confirmPassword) {
          reject("Passwords do not match!");
          return;
        }

        // API call to sign up endpoint
        const res = await API.post("/auth/signup", {
          username,
          email,
          password,
        });

        // Navigate to login page on success
        navigate("/login");

        resolve();
      } catch (err) {
        // Handle errors from API
        reject(err.response?.data?.error || "Signup Failed!!");
      }
    });

    // Show toast notifications for sign up process
    toast.promise(signUpPromise, {
      loading: "Signing in...",
      success: "Sign Up Successful!",
      error: (errMsg) => errMsg,
    });

    return signUpPromise;
  };

  return (
    <div className="mb-22 flex flex-col items-center justify-center gap-6 select-none">
      {/* Headers */}
      <div className="text-center">
        <h2 className="font-[ubuntu] text-4xl font-semibold text-[#30475E] text-shadow-md">
          — Welcome —
        </h2>
        <p className="text-xl">We are happy to have you here!!</p>
      </div>

      {/* SignUp Form */}
      <form
        onSubmit={handleSignUp}
        className="flex w-[75%] flex-col gap-4 sm:w-[25%]"
      >
        {/* Username input */}
        <FormInput
          value={username}
          setValue={setUsername}
          label="Username"
          type="text"
        />

        {/* Email input */}
        <FormInput
          value={email}
          setValue={setEmail}
          label="Email"
          type="email"
        />

        {/* Password input with show/hide toggle */}
        <div className="relative">
          <FormInput
            value={password}
            setValue={setPassword}
            label="Password"
            type={showPassword ? "text" : "password"}
          />
          {showPassword ? (
            <FaEyeSlash
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-2xl"
            />
          ) : (
            <FaEye
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-2xl"
            />
          )}
        </div>

        {/* Confirm Password input with show/hide toggle */}
        <div className="relative">
          <FormInput
            value={confirmPassword}
            setValue={setConfirmPassword}
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
          />
          {showConfirmPassword ? (
            <FaEyeSlash
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-2xl"
            />
          ) : (
            <FaEye
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-2xl"
            />
          )}
        </div>

        {/* Submit button */}
        <div className="mx-auto mt-2">
          <button
            type="submit"
            className="cursor-pointer rounded bg-[#F05454] px-3 py-1 text-xl text-[#DDDDDD] shadow-md transition-all select-none hover:bg-[#ef3c3c] active:bg-[#ef3c3c]"
          >
            Sign Up
          </button>
        </div>
      </form>

      {/* Divider for alternative sign up */}
      <div className="flex w-[75%] items-center justify-center gap-2">
        <hr className="w-[50%] text-gray-400" />
        <span className="font-[Ubuntu] text-xl"> Or </span>
        <hr className="w-[50%] text-gray-400" />
      </div>

      {/* Google sign up button */}
      <div className="flex h-12 w-[75%] cursor-pointer items-center justify-center gap-4 rounded-lg border bg-white/40 hover:bg-white/70 active:bg-white/70">
        <FcGoogle className="text-3xl" />
        <span className="text-xl">Sign Up with Google</span>
      </div>

      {/* Link to login page */}
      <div className="">
        Already have an account{" "}
        <Link to={"/login"} className="font-semibold text-[#F05454]">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
