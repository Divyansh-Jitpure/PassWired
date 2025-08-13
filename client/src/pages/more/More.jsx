import React from "react";
import UserInfo from "./UserInfo";
import Category from "./Category";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authThunks";
import { toast } from "sonner";
import {
  setShowChangePwdModal,
  setShowChangePinModal,
  setShowDeleteAccountModal,
  toggleTheme,
} from "../../features/auth/authSlice";
import API from "../../utils/api";
import ChangePassword from "../../components/ChangePassword";
import ChangePin from "../../components/ChangePin";
import DeleteAccount from "../../components/DeleteAccount";

const More = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const {
    activeTheme,
    showPwdChangeModal,
    showPinChangeModal,
    showDeleteAccountModal,
  } = useSelector((state) => state.auth);

  const changePassword = async () => {
    dispatch(setShowChangePwdModal(true));
  };

  const changePin = async () => {
    dispatch(setShowChangePinModal(true));
  };

  const deleteAccount = async () => {
    dispatch(setShowDeleteAccountModal(true));
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
    <div className="mx-auto mt-5 mb-22 flex w-full flex-col items-center gap-5 select-none sm:mt-22">
      {showPwdChangeModal && <ChangePassword />}
      {showPinChangeModal && <ChangePin />}
      {showDeleteAccountModal && <DeleteAccount />}

      <UserInfo />
      <section className="flex w-[80%] flex-col items-center gap-3 sm:w-[50%] md:w-[40%] xl:w-[30%] 2xl:w-[20%]">
        <Category
          categoryName="👤 Account"
          features={[
            { name: "View Profile", action: () => navigate("/profile") },
            {
              name: "Delete Account",
              action: () => deleteAccount(),
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
              action: () => changePin(),
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
              name: "Theme" + (activeTheme ? "🌙" : "☀️"),
              action: () => dispatch(toggleTheme(!activeTheme)),
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
