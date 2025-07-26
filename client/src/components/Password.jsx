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
    try {
      await API.delete(`/passwords/delete/${pwd._id}`);
      dispatch(fetchAllPasswords());
    } catch (err) {
      console.error(
        "Error deleting password:",
        err.response?.data?.error || err.message,
      );
    }
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
    try {
      const res = await API.get(`/passwords/view/${id}`);
      await navigator.clipboard.writeText(res.data.password);
      alert("Copied");
    } catch (err) {
      console.error(
        "Error copying password:",
        err.response?.data?.error || err.message,
      );
    }
  };

  // Executes pending action after PIN verification
  useEffect(() => {
    if (runFunction && pendingAction && pwd._id === targetPasswordId) {
      const executeAction = async () => {
        if (pendingAction === "view") {
          await viewPassword(pwd._id);
        } else if (pendingAction === "copy") {
          await copyPassword(pwd._id);
        } else if (pendingAction === "delete") {
          await handlleDelete();
        }

        dispatch(clearPendingAction());
        dispatch(setRunFunction(false));
      };

      executeAction();
    }
  }, [runFunction, pendingAction, targetPasswordId, pwd._id, dispatch]);

  return (
    <div className="grid w-full grid-cols-2 rounded border bg-white p-2 shadow-md">
      {/* Left section: Service name, username, and password */}
      <section className="flex flex-col">
        <span
          // onClick={() => viewPassword(pwd._id)}
          onClick={() => handleActionWithPin("view")}
          className="w-fit cursor-pointer text-xl font-semibold text-shadow-sm"
        >
          {pwd.service}
        </span>
        <span>{pwd.username}</span>
        {showPwd && (
          <span>
            Password:{" "}
            <span
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
        {showPwd ? (
          <button onClick={hidePassword} className="cursor-pointer">
            <FaEyeSlash className="text-3xl" />
          </button>
        ) : (
          <button
            // onClick={() => viewPassword(pwd._id)}
            onClick={() => handleActionWithPin("view")}
            className="cursor-pointer"
          >
            <FaEye className="text-3xl" />
          </button>
        )}

        <button
          onClick={() => handleActionWithPin("copy")}
          className="cursor-pointer"
        >
          <FaCopy className="text-2xl" />
        </button>
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
