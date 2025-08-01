import React, { useEffect } from "react";
import { setShowEditModal } from "../../features/auth/authSlice";
import { useDispatch } from "react-redux";

const EditPassword = () => {
  const [formData, setFormData] = useState({
    service: "",
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const editRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {});

  const editPassword = async (id) => {
    const editPromise = new Promise(async (resolve, reject) => {
      try {
        const res = await API.patch(`/passwords/edit/${id}`);
        resolve();
      } catch (err) {
        reject(
          "Error editing password:",
          err.response?.data?.error || err.message,
        );
      }
    });

    toast.promise(editPromise, {
      loading: "Editing Password...",
      success: "Password edited Successfully!",
      error: (errMsg) => errMsg,
    });

    return editPromise;
  };

  const closeModal = (e) => {
    if (editRef.current === e.target) {
      dispatch(setSheetState());
    }
  };

  return (
    <div
      ref={editRef}
      onClick={closeModal}
      className={`fixed inset-0 z-1000 flex items-center justify-center bg-black/30 backdrop-blur-sm`}
    >
      {/* Password entry form */}
      <form
        className="relative flex w-[85%] flex-col items-center gap-4 rounded-xl bg-white p-12 sm:w-[50%] md:w-[40%] xl:w-[30%] 2xl:w-[20%]"
        onSubmit={handlePwdSubmit}
      >
        <Title text="Add Password" />
        {/* Close button */}
        <IoClose
          onClick={() => dispatch(setShowEditModal())}
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

export default EditPassword;
