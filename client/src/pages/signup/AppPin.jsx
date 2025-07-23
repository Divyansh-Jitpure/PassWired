import React from "react";
import FormInput from "../../components/FormInput";
import { useState } from "react";

const AppPin = () => {
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");

  const handleSetPin = () => {};

  return (
    <div className="mb-22 flex flex-col items-center justify-center gap-6 select-none">
      {" "}
      {/* Headers */}
      <div className="text-center">
        <h2 className="font-[ubuntu] text-4xl font-semibold text-[#30475E] text-shadow-md">
          — App Pin —
        </h2>
        <p className="text-xl">Set a Pin for this App</p>
      </div>
      <form
        onSubmit={handleSetPin}
        className="flex w-[75%] flex-col gap-4 sm:w-[25%]"
      >
        {/* pin */}
        <FormInput value={pin} setValue={setPin} lable="Pin" type="password" />

        {/* Confirm pin */}
        <FormInput
          value={confirmPin}
          setValue={setConfirmPin}
          lable="Confirm Pin"
          type="password"
        />

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
