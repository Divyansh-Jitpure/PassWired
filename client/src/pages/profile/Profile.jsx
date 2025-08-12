import React from "react";
import Title from "../../components/Title";
import Category from "../more/Category";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authThunks";
import { toast } from "sonner";
import {
  setShowChangePwdModal,
  setShowChangePinModal,
} from "../../features/auth/authSlice";
import API from "../../utils/api";
import ChangePassword from "../../components/ChangePassword";
import ChangePin from "../../components/ChangePin";
import { FaUser } from "react-icons/fa";

const Profile = () => {
  const user = useSelector((state) => state.auth.user);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const showPwdChangeModal = useSelector(
    (state) => state.auth.showPwdChangeModal,
  );
  const showPinChangeModal = useSelector(
    (state) => state.auth.showPinChangeModal,
  );

  const changePassword = async () => {
    dispatch(setShowChangePwdModal(true));
  };

  const changePin = async () => {
    dispatch(setShowChangePinModal(true));
  };

  const deleteAccount = async () => {
    const deletePromise = new Promise(async (resolve, reject) => {
      try {
        await API.delete("/auth/deleteAccount");

        const result = await dispatch(logout());
        if (logout.fulfilled.match(result)) {
          navigate("/login");
        } else {
          throw new Error(result.payload || "Logout failed!");
        }
        resolve();
      } catch (err) {
        reject(err || "Error deleting account");
      }
    });

    toast.promise(deletePromise, {
      loading: "Deleting Account...",
      success: "Account deleted Successfully!",
      error: (errMsg) => errMsg,
    });

    return deletePromise;
  };

  const handleLogout = async () => {
    try {
      const logoutPromise = dispatch(logout());
      toast.promise(logoutPromise, {
        loading: "Logging out...",
        success: "Logout Successful!",
        error: (errMsg) => errMsg,
      });
      const result = await logoutPromise;
      if (logout.fulfilled.match(result)) {
        navigate("/login");
      } else {
        throw new Error(result.payload || "Logout failed!");
      }
    } catch (err) {
      throw err?.message || err?.response?.data?.error || "Logout failed!";
    }
  };

  return (
    <div className="mt-4 mb-22 flex flex-col items-center gap-10 select-none sm:mt-22">
      {showPwdChangeModal && <ChangePassword />}
      {showPinChangeModal && <ChangePin />}
      <Title text="Profile" />

      <section className="flex flex-col items-center">
        <FaUser className="mb-1 text-4xl text-[#213242]" />
        <Title text={user?.username} />
        <span className="text-[#30475eb7]">{user?.email}</span>
        <span>
          Account active since {new Date(user?.createdAt).toDateString()}
        </span>
      </section>

      <section className="flex w-[70%] flex-col text-center sm:w-[50%] md:w-[40%] xl:w-[30%] 2xl:w-[20%]">
        <Category
          categoryName="🛠️ Account Settings"
          features={[
            {
              name: "Theme",
              action: () => toast.info("Dark Theme is Coming Soon!!"),
            },
            {
              name: "Change Password",
              action: () => changePassword(),
            },
            {
              name: "Change App Pin",
              action: () => changePin(),
            },
            {
              name: "Enable 2FA",
              action: () => toast.info("Enabling 2FA is Coming Soon!!"),
            },
            {
              name: "Delete Account",
              action: () => {
                const confirmDelete = window.confirm(
                  "Are you sure you want to Delete your Account and associated passwords?",
                );
                if (!confirmDelete) return;
                deleteAccount();
              },
            },
          ]}
        />
      </section>
      <button
        onClick={() => {
          const confirmLogout = window.confirm(
            "Are you sure you want to logout?",
          );
          if (!confirmLogout) return;
          handleLogout();
        }}
        className="cursor-pointer rounded bg-[#F05454] px-3 py-1 text-xl text-[#DDDDDD] shadow-md transition-all select-none hover:bg-[#ef3c3c] active:bg-[#ef3c3c]"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
