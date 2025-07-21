import React, { useRef, useState } from "react";
import PwdSheetFormInput from "./PwdSheetFormInput";
import API from "../../utils/api";

const PwdSheet = ({ sheetOpen, setSheetOpen }) => {
  const [formData, setFormData] = useState({
    service: "",
    username: "",
    password: "",
  });
  const sheetRef = useRef();

  const handlePwdSubmit = async (e) => {
    e.preventDefault();
    // console.log("Form Data Submitted:", formData);

    try {
      await API.post("/passwords/add", formData);
    } catch (err) {
      console.error(
        "Error adding password:",
        err.response?.data?.error || err.message,
      );
    }

    setSheetOpen(!sheetOpen);
    setFormData({
      service: "",
      username: "",
      password: "",
    });
  };
  return (
    <div
      ref={sheetRef}
      className={`absolute bottom-16 h-70 w-full bg-white ${sheetOpen ? "block" : "hidden"} `}
    >
      <form
        className="flex h-full w-full flex-col items-center justify-center gap-4"
        onSubmit={handlePwdSubmit}
      >
        <PwdSheetFormInput
          lable="Service"
          type="text"
          value={formData.service}
          setValue={(e) =>
            setFormData({ ...formData, service: e.target.value })
          }
        />
        <PwdSheetFormInput
          lable="Username or Email"
          type="text"
          value={formData.username}
          setValue={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
        />
        <PwdSheetFormInput
          lable="Password"
          type="password"
          value={formData.password}
          setValue={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <button
          type="submit"
          className="cursor-pointer rounded bg-[#F05454] px-3 py-1 text-xl text-[#DDDDDD] shadow-md transition-all select-none hover:bg-[#ef3c3c] active:bg-[#ef3c3c]"
        >
          Save Password
        </button>
      </form>
    </div>
  );
};

export default PwdSheet;
