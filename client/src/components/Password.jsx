import { useState } from "react";
import { FaCopy } from "react-icons/fa6";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import API from "../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPasswords } from "../features/password/passwordThunks";
import {
  setShowPinModal,
  setPendingAction,
  clearPendingAction,
  setRunFunction,
} from "../features/auth/authSlice";
import { useEffect } from "react";
import { toast } from "sonner";

// Password component displays a single password entry and handles actions (view, copy, delete)
const Password = ({ pwd }) => {
  // Local state for password value and visibility
  const [password, setPassword] = useState();
  const [showPwd, setShowPwd] = useState(false);

  // Redux state selectors
  const runFunction = useSelector((state) => state.auth.runFunction);
  const pendingAction = useSelector((state) => state.auth.pendingAction);
  const targetPasswordId = useSelector((state) => state.auth.targetPasswordId);

  const dispatch = useDispatch();

  // Triggers PIN modal and sets pending action in Redux
  const handleActionWithPin = (action) => {
    dispatch(setPendingAction({ action, id: pwd._id }));
    dispatch(setShowPinModal({ pinModalState: true }));
  };

  // Deletes the password entry
  const handlleDelete = async () => {
    const deletePromise = new Promise(async (resolve, reject) => {
      try {
        await API.delete(`/passwords/delete/${pwd._id}`);
        dispatch(fetchAllPasswords());
        resolve();
      } catch (err) {
        reject(
          "Error deleting password:",
          err.response?.data?.error || err.message,
        );
      }
    });

    toast.promise(deletePromise, {
      loading: "Deleting Password...",
      success: "Password Deleted Successfully!",
      error: (errMsg) => errMsg,
    });

    return deletePromise;
  };

  // Fetches and displays the password
  const viewPassword = async (id) => {
    try {
      const res = await API.get(`/passwords/view/${id}`);
      setShowPwd(!showPwd);
      setPassword(res.data);
    } catch (err) {
      console.error(
        "Error fetching password:",
        err.response?.data?.error || err.message,
      );
    }
  };

  // Hides the password
  const hidePassword = () => {
    setPassword(null);
    setShowPwd(!showPwd);
  };

  // Copies the password to clipboard
  const copyPassword = async (id) => {
    const copyPromise = new Promise(async (resolve, reject) => {
      try {
        const res = await API.get(`/passwords/view/${id}`);
        await navigator.clipboard.writeText(res.data.password);
        resolve();
      } catch (err) {
        reject(
          "Error copying password:",
          err.response?.data?.error || err.message,
        );
      }
    });

    toast.promise(copyPromise, {
      loading: "Copying Password...",
      success: "Password Copied Successfully!",
      error: (errMsg) => errMsg,
    });

    return copyPromise;
  };

  // Executes pending action after PIN verification
  useEffect(() => {
    // Only run if the PIN modal has been verified and the action is for this password
    if (runFunction && pendingAction && pwd._id === targetPasswordId) {
      const executeAction = async () => {
        if (pendingAction === "view") {
          await viewPassword(pwd._id);
        } else if (pendingAction === "copy") {
          await copyPassword(pwd._id);
        } else if (pendingAction === "delete") {
          await handlleDelete();
        }

        // Clear pending action and reset runFunction flag
        dispatch(clearPendingAction());
        dispatch(setRunFunction(false));
      };

      executeAction();
    }
  }, [runFunction, pendingAction, targetPasswordId, pwd._id, dispatch]);

  return (
    <div className="mx-auto grid w-[80%] grid-cols-2 rounded border bg-white p-2 shadow-md sm:w-[70%] md:w-[60%] xl:w-[40%] 2xl:w-[30%]">
      {/* Left section: Service name, username, and password */}
      <section className="flex flex-col">
        <span
          // Clicking service name triggers PIN modal for viewing password
          onClick={() => handleActionWithPin("view")}
          className="w-fit cursor-pointer text-xl font-semibold text-shadow-sm"
        >
          {pwd.service}
        </span>
        <span>{pwd.username}</span>
        {/* Show password if visible */}
        {showPwd && (
          <span>
            Password:{" "}
            <span
              // Clicking password triggers PIN modal for copying password
              onClick={() => handleActionWithPin("copy")}
              className="cursor-pointer rounded-xs bg-gray-300/50 px-1"
            >
              {password.password}
            </span>
          </span>
        )}
      </section>
      {/* Right section: Action buttons */}
      <section className="flex items-center justify-end gap-4">
        {/* Toggle password visibility */}
        {showPwd ? (
          <button onClick={hidePassword} className="cursor-pointer">
            <FaEyeSlash className="text-3xl" />
          </button>
        ) : (
          <button
            onClick={() => handleActionWithPin("view")}
            className="cursor-pointer"
          >
            <FaEye className="text-3xl" />
          </button>
        )}

        {/* Copy password button */}
        <button
          onClick={() => handleActionWithPin("copy")}
          className="cursor-pointer"
        >
          <FaCopy className="text-2xl" />
        </button>
        {/* Delete password button */}
        <button
          onClick={() => handleActionWithPin("delete")}
          className="cursor-pointer"
        >
          <MdDelete className="text-3xl" />
        </button>
      </section>
    </div>
  );
};

export default Password;
