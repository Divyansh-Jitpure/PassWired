import React, { useRef, useState } from "react";
import PwdSheetFormInput from "../pages/vault/PwdSheetFormInput";
import { useDispatch } from "react-redux";
import { setShowChangePwdModal } from "../features/auth/authSlice";
import Title from "./Title";
import { IoClose } from "react-icons/io5";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "sonner";
import API from "../utils/api";

const ChangePassword = () => {
  const [currPassword, setCurrPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showconfirmPassword, setShowconfirmPassword] = useState(false);

  const sheetRef = useRef();

  const dispatch = useDispatch();

  const handleChangePwd = async (e) => {
    e.preventDefault();

    const changePwdPromise = new Promise(async (resolve, reject) => {
      try {
        // Validate required fields
        if (!currPassword || !newPassword || !confirmPassword) {
          reject("Please fill all fields.");
          return;
        }
        // Check if passwords match
        if (newPassword !== confirmPassword) {
          reject("Passwords do not match!");
          return;
        }

        await API.patch("/auth/changePassword", {
          currPassword,
          newPassword,
        });
        dispatch(setShowChangePwdModal(false));
        resolve();
      } catch (err) {
        reject(err.response?.data?.error || err || "Error changing password");
      }
    });

    toast.promise(changePwdPromise, {
      loading: "Changing Password...",
      success: "Password changed Successfully!",
      error: (errMsg) => errMsg,
    });

    return changePwdPromise;
  };

  // const closeModal = (e) => {
  //   if (sheetRef.current === e.target) {
  //     dispatch(setShowChangePwdModal());
  //   }
  // };

  return (
    <div
      ref={sheetRef}
      // onClick={closeModal}
      className={`fixed inset-0 z-1000 flex items-center justify-center bg-black/30 backdrop-blur-sm`}
    >
      {/* Password entry form */}
      <form
        className="relative flex w-[85%] flex-col items-center gap-4 rounded-xl bg-white p-12 sm:w-[50%] md:w-[40%] xl:w-[30%] 2xl:w-[20%]"
        onSubmit={handleChangePwd}
      >
        <Title text="Change Password" />
        {/* Close button */}
        <IoClose
          onClick={() => dispatch(setShowChangePwdModal())}
          className="absolute top-2 right-2 cursor-pointer rounded-full text-4xl hover:bg-gray-400/30 active:bg-gray-400/30"
        />
        {/* Current Password input field */}
        <div className="relative w-full">
          <PwdSheetFormInput
            label="Current Password"
            type={showPassword ? "text" : "password"}
            value={currPassword}
            setValue={(e) => setCurrPassword(e.target.value)}
          />
          {currPassword &&
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
        {/* New Password input field */}
        <div className="relative w-full">
          <PwdSheetFormInput
            label="New Password"
            type={showNewPassword ? "text" : "password"}
            value={newPassword}
            setValue={(e) => setNewPassword(e.target.value)}
          />
          {newPassword &&
            (showNewPassword ? (
              <FaEyeSlash
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-2xl"
              />
            ) : (
              <FaEye
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-2xl"
              />
            ))}
        </div>
        {/* New Password input field */}
        <div className="relative w-full">
          <PwdSheetFormInput
            label="Confirm New Password"
            type={showconfirmPassword ? "text" : "password"}
            value={confirmPassword}
            setValue={(e) => setConfirmPassword(e.target.value)}
          />
          {confirmPassword &&
            (showconfirmPassword ? (
              <FaEyeSlash
                onClick={() => setShowconfirmPassword(!showconfirmPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-2xl"
              />
            ) : (
              <FaEye
                onClick={() => setShowconfirmPassword(!showconfirmPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-2xl"
              />
            ))}
        </div>
        {/* Submit button */}
        <button
          type="submit"
          className="cursor-pointer rounded bg-[#F05454] px-3 py-1 text-xl text-[#DDDDDD] shadow-md transition-all select-none hover:bg-[#ef3c3c] active:bg-[#ef3c3c]"
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
