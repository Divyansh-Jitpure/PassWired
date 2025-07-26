import { useEffect, useRef, useState } from "react";
import FormInput from "./FormInput";
import Title from "./Title";
import { setShowPinModal } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { setRunFunction } from "../features/auth/authSlice";
import API from "../utils/api";
import { IoClose } from "react-icons/io5";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const PinModal = () => {
  // Local state for storing the entered PIN
  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);

  const modalRef = useRef();

  const dispatch = useDispatch();

  // Get modal visibility state from Redux store
  const showPinModal = useSelector((state) => state.auth.showPinModal);

  // Reset PIN input when modal is closed
  useEffect(() => {
    if (!showPinModal) {
      setPin("");
    }
  }, [showPinModal]);

  // Handle PIN form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Verify PIN via API call
      const res = await API.get(`/auth/verifyPin/${pin}`);
      if (res.data.verified) {
        // If verified, trigger pending function and close modal
        dispatch(setRunFunction(true));
        dispatch(setShowPinModal({ pinModalState: false }));
      }
    } catch (err) {
      // Log error if verification fails
      console.error(
        "Error verifying pin:",
        err.response?.data?.error || err.message,
      );
    }
  };

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      dispatch(setShowPinModal({ pinModalState: false }));
    }
  };

  return (
    // Modal overlay
    <div
      ref={modalRef}
      onClick={closeModal}
      className="fixed inset-0 z-1000 flex items-center justify-center bg-black/30 backdrop-blur-sm"
    >
      <form
        onSubmit={handleSubmit}
        className="relative flex flex-col items-center justify-center gap-6 rounded-xl bg-[#DDDDDD] p-12"
      >
        {/* Close button */}
        <IoClose
          onClick={() => dispatch(setShowPinModal({ pinModalState: false }))}
          className="absolute top-2 right-2 cursor-pointer rounded-full text-4xl hover:bg-gray-400/30 active:bg-gray-400/30"
        />
        {/* Modal title */}
        <Title text="Enter Pin" />
        {/* PIN input field */}
        <div className="relative">
          <FormInput
            value={pin}
            setValue={setPin}
            label="Pin"
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

        {/* Submit button */}
        <button
          type="submit"
          disabled={!pin}
          className="cursor-pointer rounded bg-[#F05454] px-3 py-1 text-xl text-[#DDDDDD] shadow-md transition-all select-none hover:bg-[#ef3c3c] active:bg-[#ef3c3c]"
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default PinModal;
