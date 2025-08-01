import { useState } from "react";
import { FaCopy } from "react-icons/fa6";
import { FaEye, FaEyeSlash, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import API from "../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPasswords } from "../features/password/passwordThunks";
import {
  setShowPinModal,
  setPendingAction,
  clearPendingAction,
  setRunFunction,
  setShowEditModal,
} from "../features/auth/authSlice";
import { useEffect } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router";

// Password component displays a single password entry and handles actions (view, copy, delete)
const Password = ({ pwd }) => {
  // Local state for password value and visibility
  const [password, setPassword] = useState();
  const [showPwd, setShowPwd] = useState(false);
  // const [showEditModal, setShowEditModal] = useState(false);

  const navigate = useNavigate();

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
    setShowPwd(false);
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

  const editPassword = async () => {
    hidePassword();
    dispatch(setShowEditModal(true));
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
        } else if (pendingAction === "edit") {
          await editPassword(pwd._id);
        }

        // Clear pending action and reset runFunction flag
        dispatch(clearPendingAction());
        dispatch(setRunFunction(false));
      };

      executeAction();
    }
  }, [runFunction, pendingAction, targetPasswordId, pwd._id, dispatch]);

  return (
    <div className="mx-auto grid w-full grid-cols-4 rounded border bg-white p-2 shadow-md sm:w-[65%] md:w-[55%] xl:w-[40%] 2xl:w-[30%]">
      {/* Left section: Service name, username, and password */}
      <section className="col-span-3 flex flex-col">
        <span
          // Clicking service name triggers PIN modal for viewing password
          onClick={() =>
            showPwd ? hidePassword() : handleActionWithPin("view")
          }
          className="w-fit cursor-pointer text-xl font-semibold text-shadow-sm"
        >
          {pwd.service}
        </span>
        <span className="break-all">{pwd.username}</span>
        {/* Show password if visible */}
        {showPwd && (
          <span className="flex flex-wrap items-center">
            <span className="mr-2">Password:</span>

            <span
              // Clicking password triggers PIN modal for copying password
              onClick={() => copyPassword(pwd._id)}
              className="flex max-w-fit cursor-pointer flex-wrap overflow-auto rounded bg-gray-300/50 px-2 py-[6px] select-text"
            >
              {password.password}
            </span>
          </span>
        )}
      </section>
      {/* Right section: Action buttons */}
      <section className="col-span-1 ml-auto flex flex-wrap justify-center gap-4">
        {/* Toggle password visibility */}
        {showPwd ? (
          <button
            onClick={hidePassword}
            className="flex min-w-8 cursor-pointer items-center justify-center"
          >
            <FaEyeSlash className="text-3xl" />
          </button>
        ) : (
          <button
            onClick={() => handleActionWithPin("view")}
            className="flex min-w-8 cursor-pointer items-center justify-center"
          >
            <FaEye className="text-3xl" />
          </button>
        )}

        {/* Copy password button */}
        <button
          onClick={() =>
            showPwd ? copyPassword(pwd._id) : handleActionWithPin("copy")
          }
          className="flex min-w-8 cursor-pointer items-center justify-center"
        >
          <FaCopy className="text-2xl" />
        </button>

        {/* Edit password button */}
        <button
          onClick={() => handleActionWithPin("edit")}
          className="flex min-w-8 cursor-pointer items-center justify-center"
        >
          <FaEdit className="text-2xl" />
        </button>

        {/* Delete password button */}
        <button
          onClick={() => handleActionWithPin("delete")}
          className="flex min-w-8 cursor-pointer items-center justify-center"
        >
          <MdDelete className="text-3xl" />
        </button>
      </section>
    </div>
  );
};

export default Password;
