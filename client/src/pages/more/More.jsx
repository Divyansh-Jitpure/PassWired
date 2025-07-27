import React from "react";
import UserInfo from "./UserInfo";

import Category from "./Category";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authThunks";
import { toast } from "sonner";

const More = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

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
    <div className="mx-auto mb-22 flex w-[90%] flex-col items-center gap-5 select-none">
      <UserInfo />
      <section className="flex w-full flex-col gap-3">
        <Category
          categoryName="👤 Account"
          features={[
            { name: "View Profile", action: () => navigate("/profile") },
            {
              name: "Delete Account",
              action: () => toast.info("Delete Account is Coming Soon!!"),
            },
          ]}
        />
        <Category
          categoryName="🔐 Security"
          features={[
            {
              name: "Change Password",
              action: () => toast.info("Changing Password is Coming Soon!!"),
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
              action: () => toast.info("Password Generator is Coming Soon!!"),
            },
            {
              name: "Password Strength Checker",
              action: () =>
                toast.info("Password Strength Checker is Coming Soon!!"),
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
        onClick={handleLogout}
        className="cursor-pointer rounded bg-[#F05454] px-3 py-1 text-xl text-[#DDDDDD] shadow-md transition-all select-none hover:bg-[#ef3c3c] active:bg-[#ef3c3c]"
      >
        Logout
      </button>
    </div>
  );
};

export default More;
