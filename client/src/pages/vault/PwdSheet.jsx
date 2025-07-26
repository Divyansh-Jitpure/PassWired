import { useRef, useState } from "react";
import PwdSheetFormInput from "./PwdSheetFormInput";
import API from "../../utils/api";
import { useDispatch, useSelector } from "react-redux";
import {
  setSheetState,
  setAppPinState,
} from "../../features/password/passwordSlice";
import { fetchAllPasswords } from "../../features/password/passwordThunks";

// Password Sheet component for adding new password entries
const PwdSheet = () => {
  // Local state for form data
  const [formData, setFormData] = useState({
    service: "",
    username: "",
    password: "",
  });

  // Ref for the sheet container
  const sheetRef = useRef();

  // Redux state for sheet visibility
  const sheetState = useSelector((state) => state.password.sheetState);

  // Redux dispatch function
  const dispatch = useDispatch();

  // Handles form submission for adding a password
  const handlePwdSubmit = async (e) => {
    e.preventDefault();

    try {
      // Set app pin state before submitting
      dispatch(setAppPinState());

      // Send POST request to add password
      await API.post("/passwords/add", formData);

      // Refresh password list after adding
      dispatch(fetchAllPasswords());
    } catch (err) {
      // Log error if request fails
      console.error("Error adding password:", err.response?.data?.error || err);
    }

    // Hide sheet and reset form after submission
    dispatch(setSheetState());
    setFormData({
      service: "",
      username: "",
      password: "",
    });
  };

  return (
    <div
      ref={sheetRef}
      className={`absolute bottom-16 h-70 w-full border-t-2 bg-white ${sheetState ? "block" : "hidden"} `}
    >
      <form
        className="flex h-full w-full flex-col items-center justify-center gap-4"
        onSubmit={handlePwdSubmit}
      >
        {/* Service input field */}
        <PwdSheetFormInput
          label="Service"
          type="text"
          value={formData.service}
          setValue={(e) =>
            setFormData({ ...formData, service: e.target.value })
          }
        />
        {/* Username or Email input field */}
        <PwdSheetFormInput
          label="Username or Email"
          type="text"
          value={formData.username}
          setValue={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
        />
        {/* Password input field */}
        <PwdSheetFormInput
          label="Password"
          type="password"
          value={formData.password}
          setValue={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        {/* Submit button */}
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
