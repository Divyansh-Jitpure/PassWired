import React, { useEffect } from "react";
import FormInput from "../../components/FormInput";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setAppPin } from "../../features/auth/authThunks";
import { toast } from "sonner";
import API from "../../utils/api";

// AppPin component for setting a 4-digit application PIN
const AppPin = () => {
  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [confirmPin, setConfirmPin] = useState("");
  const [showConfirmPin, setShowConfirmPin] = useState(false);

  const navigate = useNavigate();

  // Get current user from location-state sent from login
  const location = useLocation();
  const { id } = location.state;

  const dispatch = useDispatch();

  // Handle form submission for setting PIN
  const handleSetPin = async (e) => {
    e.preventDefault();

    const setPinPromise = new Promise(async (resolve, reject) => {
      try {
        // Validate inputs
        if (!pin || !confirmPin) {
          reject("Please fill all fields.");
          return;
        }

        // Check if PINs match
        if (pin !== confirmPin) {
          reject("Pins do not match!");
          return;
        }

        // Dispatch setAppPin thunk
        const result = await dispatch(setAppPin({ id, pin }));

        if (setAppPin.fulfilled.match(result)) {
          navigate("/");
          resolve();
        } else {
          reject(result.payload || "Pin Setup Failed!!");
        }
      } catch (err) {
        // Handle errors from API
        reject(err.response?.data?.error || "Pin Setup Failed!!");
      }
    });

    // Show toast notifications for sign up process
    toast.promise(setPinPromise, {
      loading: "Setting up the pin...",
      success: "Pin Setup Successful!",
      error: (errMsg) => errMsg,
    });

    return setPinPromise;
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 select-none sm:h-screen sm:gap-5 xl:scale-80 2xl:scale-100 2xl:gap-6">
      {/* Headers */}
      <div className="text-center">
        <h2 className="dark:text-primary font-[ubuntu] text-4xl font-semibold text-[#30475E] text-shadow-md">
          — App Pin —
        </h2>
        <p className="dark:text-primary text-xl">
          Set a 4 digit Pin for this App
        </p>
      </div>
      <form
        onSubmit={handleSetPin}
        className="flex w-[75%] flex-col gap-4 sm:w-[25%]"
      >
        {/* PIN input field */}
        <div className="relative">
          <FormInput
            value={pin}
            setValue={setPin}
            len={4}
            label="Pin"
            type={showPin ? "text" : "password"}
          />
          {/* Toggle PIN visibility */}
          {pin &&
            (showPin ? (
              <FaEyeSlash
                onClick={() => setShowPin(!showPin)}
                className="dark:text-primary absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-2xl"
              />
            ) : (
              <FaEye
                onClick={() => setShowPin(!showPin)}
                className="dark:text-primary absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-2xl"
              />
            ))}
        </div>

        {/* Confirm PIN input field */}
        <div className="relative">
          <FormInput
            value={confirmPin}
            setValue={setConfirmPin}
            len={4}
            label="Confirm Pin"
            type={showConfirmPin ? "text" : "password"}
          />
          {/* Toggle confirm PIN visibility */}
          {confirmPin &&
            (showConfirmPin ? (
              <FaEyeSlash
                onClick={() => setShowConfirmPin(!showConfirmPin)}
                className="dark:text-primary absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-2xl"
              />
            ) : (
              <FaEye
                onClick={() => setShowConfirmPin(!showConfirmPin)}
                className="dark:text-primary absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-2xl"
              />
            ))}
        </div>
        {/* Submit button */}
        <div className="mx-auto mt-2">
          <button
            type="submit"
            className="cursor-pointer rounded bg-[#F05454] px-3 py-1 text-xl text-[#DDDDDD] shadow-md transition-all select-none hover:bg-[#ef3c3c] active:bg-[#ef3c3c]"
          >
            Set Pin
          </button>
        </div>
      </form>
    </div>
  );
};

export default AppPin;
