import React from "react";
import FormInput from "../../components/FormInput";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router";
import API from "../../utils/api";
import { useDispatch } from "react-redux";
import { setAppPin } from "../../features/auth/authThunks";

const AppPin = () => {
  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [confirmPin, setConfirmPin] = useState("");
  const [showConfirmPin, setShowConfirmPin] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const location = useLocation();
  const id = location.state;
  // console.log("id from location state:", id);

  const handleSetPin = async (e) => {
    e.preventDefault();

    if (!pin || !confirmPin) {
      alert("Please fill all fields.");
      return;
    }

    if (pin !== confirmPin) {
      alert("Pins do not match!");
      return;
    }

    const result = await dispatch(setAppPin({ id, pin }));

    if (setAppPin.fulfilled.match(result)) {
      navigate("/login");
    } else {
      console.error(result.payload); // handle error if needed
    }
  };

  return (
    <div className="mb-22 flex flex-col items-center justify-center gap-6 select-none">
      {/* Headers */}
      <div className="text-center">
        <h2 className="font-[ubuntu] text-4xl font-semibold text-[#30475E] text-shadow-md">
          — App Pin —
        </h2>
        <p className="text-xl">Set a 4 digit Pin for this App</p>
      </div>
      <form
        onSubmit={handleSetPin}
        className="flex w-[75%] flex-col gap-4 sm:w-[25%]"
      >
        {/* pin */}
        <div className="relative">
          <FormInput
            value={pin}
            setValue={setPin}
            lable="Pin"
            type={showPin ? "text" : "password"}
          />
          {showPin ? (
            <FaEyeSlash
              onClick={() => setShowPin(!showPin)}
              className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-2xl"
            />
          ) : (
            <FaEye
              onClick={() => setShowPin(!showPin)}
              className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-2xl"
            />
          )}
        </div>

        {/* Confirm pin */}
        <div className="relative">
          <FormInput
            value={confirmPin}
            setValue={setConfirmPin}
            lable="Confirm Pin"
            type={showConfirmPin ? "text" : "password"}
          />
          {showConfirmPin ? (
            <FaEyeSlash
              onClick={() => setShowConfirmPin(!showConfirmPin)}
              className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-2xl"
            />
          ) : (
            <FaEye
              onClick={() => setShowConfirmPin(!showConfirmPin)}
              className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer text-2xl"
            />
          )}
        </div>
        {/* Submit */}
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
