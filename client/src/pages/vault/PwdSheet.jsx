import { useRef, useState } from "react";
import PwdSheetFormInput from "./PwdSheetFormInput";
import API from "../../utils/api";
import { useDispatch, useSelector } from "react-redux";
import {
  setSheetState,
  setAppPinState,
} from "../../features/password/passwordSlice";
import { fetchAllPasswords } from "../../features/password/passwordThunks";
import { toast } from "sonner";
import { IoClose } from "react-icons/io5";
import { FaEye, FaEyeSlash } from "react-icons/fa";

// Password Sheet component for adding new password entries
const PwdSheet = () => {
  // Local state for form data
  const [formData, setFormData] = useState({
    service: "",
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  // Ref for the sheet container
  const sheetRef = useRef();

  // Redux dispatch function
  const dispatch = useDispatch();

  // Handles form submission for adding a password
  const handlePwdSubmit = async (e) => {
    e.preventDefault();

    // Create a promise for toast notifications
    const savePasswordPromise = new Promise(async (resolve, reject) => {
      try {
        // Set app pin state before submitting
        dispatch(setAppPinState());

        // Send POST request to add password
        await API.post("/passwords/add", formData);

        // Refresh password list after adding
        dispatch(fetchAllPasswords());

        // Hide sheet and reset form after submission
        dispatch(setSheetState());
        setFormData({
          service: "",
          username: "",
          password: "",
        });
        resolve();
      } catch (err) {
        // Log error if request fails
        reject("Error adding password" || err.response?.data?.error || err);
      }
    });

    // Show toast notifications for promise states
    toast.promise(savePasswordPromise, {
      loading: "Adding Password...",
      success: "Password Added Successfully!",
      error: (errMsg) => errMsg,
    });

    return savePasswordPromise;
  };

  const closeModal = (e) => {
    if (sheetRef.current === e.target) {
      dispatch(setSheetState());
    }
  };

  return (
    // Sheet container for password form
    <div
      ref={sheetRef}
      onClick={closeModal}
      className={`fixed inset-0 z-1000 flex items-center justify-center bg-black/30 backdrop-blur-sm`}
    >
      {/* Password entry form */}
      <form
        className="relative flex w-[75%] flex-col items-center gap-4 rounded-xl bg-white p-12 py-14 sm:w-[50%] md:w-[40%] xl:w-[30%] 2xl:w-[20%]"
        onSubmit={handlePwdSubmit}
      >
        {/* Close button */}
        <IoClose
          onClick={() => dispatch(setSheetState())}
          className="absolute top-2 right-2 cursor-pointer rounded-full text-4xl hover:bg-gray-400/30 active:bg-gray-400/30"
        />
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
        <div className="relative w-full">
          <PwdSheetFormInput
            label="Password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            setValue={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          {formData.password &&
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
