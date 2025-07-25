import React, { useState } from "react";
import FormInput from "./FormInput";
import Title from "./Title";
import Button from "./Button";

const PinModal = () => {
  const [pin, setPin] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="fixed inset-0 z-1000 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center gap-6 rounded-xl bg-[#DDDDDD] p-10"
      >
        <Title text="Enter Pin" />
        <FormInput value={pin} setValue={setPin} lable="Pin" type="password" />
        <button
          type="submit"
          className="cursor-pointer rounded bg-[#F05454] px-3 py-1 text-xl text-[#DDDDDD] shadow-md transition-all select-none hover:bg-[#ef3c3c] active:bg-[#ef3c3c]"
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default PinModal;
