import React from "react";
import UserInfo from "./UserInfo";

import Category from "./Category";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authThunks";
import { toast } from "sonner";
import {
  setShowPinModal,
  setPendingAction,
  clearPendingAction,
  setRunFunction,
  setShowChangePwdModal,
} from "../../features/auth/authSlice";
import API from "../../utils/api";
import ChangePassword from "../../components/ChangePassword";

const More = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const showPwdChangeModal = useSelector(
    (state) => state.auth.showPwdChangeModal,
  );

  console.log(showPwdChangeModal);

  const deleteAccount = async () => {
    const deletePromise = new Promise(async (resolve, reject) => {
      try {
        await API.delete("/auth/user");
      } catch (err) {
        reject(err.response?.data?.error || "Error deleting account");
      }
    });

    toast.promise(deletePromise, {
      loading: "Deleting Account...",
      success: "Account deleted Successfully!",
      error: (errMsg) => errMsg,
    });

    return deletePromise;
  };

  const changePassword = async () => {
    dispatch(setShowChangePwdModal(true));
    console.log("dsf");
  };

  // Redux state selectors
  const runFunction = useSelector((state) => state.auth.runFunction);
  const pendingAction = useSelector((state) => state.auth.pendingAction);
  const targetPasswordId = useSelector((state) => state.auth.targetPasswordId);

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
    <div className="mx-auto mt-5 mb-22 flex w-full flex-col items-center gap-5 select-none sm:mt-22">
      {showPwdChangeModal && <ChangePassword />}
      <UserInfo />
      <section className="flex w-[80%] flex-col items-center gap-3 sm:w-[50%] md:w-[40%] xl:w-[30%] 2xl:w-[20%]">
        <Category
          categoryName="👤 Account"
          features={[
            { name: "View Profile", action: () => navigate("/profile") },
            {
              name: "Delete Account",
              action: () => toast.info("Deleting Account is Coming Soon!!"),
            },
          ]}
        />
        <Category
          categoryName="🔐 Security"
          features={[
            {
              name: "Change Password",
              action: () => changePassword(),
            },
            {
              name: "Change App Pin",
              action: () => toast.info("Changing App Pin is Coming Soon!!"),
            },
            {
              name: "Enable 2FA",
              action: () => toast.info("Enabling 2FA is Coming Soon!!"),
            },
            // { name: "Manage Devices", action: () => {} },
            // { name: "Biometric Login", action: () => {} },
          ]}
        />
        <Category
          categoryName="✨ Features"
          features={[
            // { name: "Export Vault", action: () => {} },
            {
              name: "Password Generator",
              action: () => navigate("/passwordGenerator"),
            },
            {
              name: "Password Strength Checker",
              action: () => navigate("/passwordStrength"),
            },
          ]}
        />
        <Category
          categoryName="⚙️ App Settings"
          features={[
            {
              name: "Theme",
              action: () => toast.info("Dark Theme is Coming Soon!!"),
            },
            // { name: "Language Selection", action: () => {} },
          ]}
        />
        {/* <Category
          categoryName="📦 App Info"
          features={[
            { name: "App Version", action: () => {} },
            { name: "What's New", action: () => {} },
            { name: "Credits & Licenses", action: () => {} },
          ]}
        /> */}
        <Category
          categoryName="💬 Feedback & Support"
          features={[
            // { name: "Report a Bug", action: () => {} },
            // { name: "Share Feedback", action: () => {} },
            {
              name: "Contact Developer",
              action: () =>
                window.open("https://divyansh-jitpure.web.app/", "_blank"),
            },
          ]}
        />
        <Category
          categoryName="📄 Legal"
          features={[
            {
              name: "Privacy Policy",
              action: () => navigate("/privacypolicy"),
            },
            { name: "Terms & Conditions", action: () => navigate("/t&c") },
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

export default More;
