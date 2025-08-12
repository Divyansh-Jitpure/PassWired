import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../features/auth/authThunks";
import { toast } from "sonner";
import { setShowDeleteAccountModal } from "../features/auth/authSlice";
import { IoClose } from "react-icons/io5";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import API from "../utils/api";
import Title from "./Title";
import PwdSheetFormInput from "../pages/vault/PwdSheetFormInput";
import { useNavigate } from "react-router";

const DeleteAccount = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const sheetRef = useRef();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const deleteAccount = async (e) => {
    e.preventDefault();

    const deletePromise = new Promise(async (resolve, reject) => {
      try {
        if (!password) {
          reject("Please fill password.");
          return;
        }

        await API.delete("/auth/deleteAccount", {
          data: { password },
        });

        const result = await dispatch(logout());
        if (logout.fulfilled.match(result)) {
          navigate("/login");
        } else {
          throw new Error(result.payload || "Logout failed!");
        }
        dispatch(setShowDeleteAccountModal(false));
        resolve();
      } catch (err) {
        reject(err.response?.data?.error || err || "Error deleting account");
      }
    });

    toast.promise(deletePromise, {
      loading: "Deleting Account...",
      success: "Account deleted Successfully!",
      error: (errMsg) => errMsg,
    });

    return deletePromise;
  };

  return (
    <div
      ref={sheetRef}
      // onClick={closeModal}
      className={`fixed inset-0 z-1000 flex items-center justify-center bg-black/30 backdrop-blur-sm`}
    >
      {/* Password entry form */}
      <form
        className="dark:bg-primary-dark relative flex w-[85%] flex-col items-center gap-4 rounded-xl bg-white p-12 sm:w-[50%] md:w-[40%] xl:w-[30%] 2xl:w-[20%]"
        onSubmit={deleteAccount}
      >
        <Title text="Delete Account" />

        {/* Close button */}
        <IoClose
          onClick={() => dispatch(setShowDeleteAccountModal())}
          className="dark:text-primary absolute top-2 right-2 cursor-pointer rounded-full text-4xl hover:bg-gray-400/30 active:bg-gray-400/30"
        />

        {/* Current Password input field */}
        <div className="relative w-full">
          <PwdSheetFormInput
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            setValue={(e) => setPassword(e.target.value)}
          />
          {password &&
            (showPassword ? (
              <FaEyeSlash
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer dark:text-primary text-2xl"
              />
            ) : (
              <FaEye
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer dark:text-primary text-2xl"
              />
            ))}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="cursor-pointer rounded bg-[#F05454] px-3 py-1 text-xl text-[#DDDDDD] shadow-md transition-all select-none hover:bg-[#ef3c3c] active:bg-[#ef3c3c]"
        >
          Delete Account
        </button>
      </form>
    </div>
  );
};

export default DeleteAccount;
