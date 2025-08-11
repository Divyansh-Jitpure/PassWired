import React, { useRef, useState } from "react";
import PwdSheetFormInput from "../pages/vault/PwdSheetFormInput";
import { useDispatch } from "react-redux";
import { setShowChangePinModal } from "../features/auth/authSlice";
import Title from "./Title";
import { IoClose } from "react-icons/io5";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "sonner";
import API from "../utils/api";

const ChangePin = () => {
  const [currPin, setCurrPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [showNewPin, setShowNewPin] = useState(false);
  const [showconfirmPin, setShowconfirmPin] = useState(false);

  const sheetRef = useRef();

  const dispatch = useDispatch();

  const handleChangePin = async (e) => {
    e.preventDefault();

    const changePinPromise = new Promise(async (resolve, reject) => {
      try {
        // Validate required fields
        if (!currPin || !newPin || !confirmPin) {
          reject("Please fill all fields.");
          return;
        }
        // Check if passwords match
        if (newPin !== confirmPin) {
          reject("Passwords do not match!");
          return;
        }

        await API.patch("/auth/changePin", {
          currPin,
          newPin,
        });
        dispatch(setShowChangePinModal(false));
        resolve();
      } catch (err) {
        reject(err.response?.data?.error || err || "Error changing Pin");
      }
    });

    toast.promise(changePinPromise, {
      loading: "Changing Pin...",
      success: "Pin changed Successfully!",
      error: (errMsg) => errMsg,
    });

    return changePinPromise;
  };

  //   const closeModal = (e) => {
  //     if (sheetRef.current === e.target) {
  //       dispatch(setShowChangePinModal());
  //     }
  //   };

  return (
    <div
      ref={sheetRef}
      //   onClick={closeModal}
      className={`fixed inset-0 z-1000 flex items-center justify-center bg-black/30 backdrop-blur-sm`}
    >
      {/* Password entry form */}
      <form
        className="relative flex w-[85%] flex-col items-center gap-4 rounded-xl bg-white p-12 sm:w-[50%] md:w-[40%] xl:w-[30%] 2xl:w-[20%]"
        onSubmit={handleChangePin}
      >
        <Title text="Change Pin" />
        {/* Close button */}
        <IoClose
          onClick={() => dispatch(setShowChangePinModal())}
          className="absolute top-2 right-2 cursor-pointer rounded-full text-4xl hover:bg-gray-400/30 active:bg-gray-400/30"
        />
        {/* Current Password input field */}
        <div className="relative w-full">
          <PwdSheetFormInput
            label="Current Pin"
            type={showPin ? "text" : "password"}
            value={currPin}
            setValue={(e) => setCurrPin(e.target.value)}
          />
          {currPin &&
            (showPin ? (
              <FaEyeSlash
                onClick={() => setShowPin(!showPin)}
                className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-2xl"
              />
            ) : (
              <FaEye
                onClick={() => setShowPin(!showPin)}
                className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-2xl"
              />
            ))}
        </div>
        {/* New Password input field */}
        <div className="relative w-full">
          <PwdSheetFormInput
            label="New Pin"
            type={showNewPin ? "text" : "password"}
            value={newPin}
            setValue={(e) => setNewPin(e.target.value)}
          />
          {newPin &&
            (showNewPin ? (
              <FaEyeSlash
                onClick={() => setShowNewPin(!showNewPin)}
                className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-2xl"
              />
            ) : (
              <FaEye
                onClick={() => setShowNewPin(!showNewPin)}
                className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-2xl"
              />
            ))}
        </div>
        {/* New Password input field */}
        <div className="relative w-full">
          <PwdSheetFormInput
            label="Confirm New Pin"
            type={showconfirmPin ? "text" : "password"}
            value={confirmPin}
            setValue={(e) => setConfirmPin(e.target.value)}
          />
          {newPin &&
            (showconfirmPin ? (
              <FaEyeSlash
                onClick={() => setShowconfirmPin(!showconfirmPin)}
                className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-2xl"
              />
            ) : (
              <FaEye
                onClick={() => setShowconfirmPin(!showconfirmPin)}
                className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-2xl"
              />
            ))}
        </div>
        {/* Submit button */}
        <button
          type="submit"
          className="cursor-pointer rounded bg-[#F05454] px-3 py-1 text-xl text-[#DDDDDD] shadow-md transition-all select-none hover:bg-[#ef3c3c] active:bg-[#ef3c3c]"
        >
          Change Pin
        </button>
      </form>
    </div>
  );
};

export default ChangePin;
