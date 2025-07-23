import React from "react";
import UserInfo from "./UserInfo";

import Category from "./Category";
import Button from "../../components/Button";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authThunks";

const More = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleLogout = async () => {
    const result = await dispatch(logout());

    if (logout.fulfilled.match(result)) {
      navigate("/login");
    } else {
      console.error(result.payload); // handle error if needed
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
            { name: "Change Password", action: () => {} },
            { name: "Delete Account", action: () => {} },
          ]}
        />
        <Category
          categoryName="🔐 Security"
          features={[
            { name: "Enable 2FA", action: () => {} },
            { name: "Manage Devices", action: () => {} },
            { name: "Biometric Login", action: () => {} },
          ]}
        />
        <Category
          categoryName="✨ Features"
          features={[
            { name: "Export Vault", action: () => {} },
            { name: "Password Generator", action: () => {} },
            { name: "Password Strength Checker", action: () => {} },
          ]}
        />
        <Category
          categoryName="⚙️ App Settings"
          features={[
            { name: "Theme", action: () => {} },
            { name: "Language Selection", action: () => {} },
          ]}
        />
        <Category
          categoryName="📦 App Info"
          features={[
            { name: "App Version", action: () => {} },
            { name: "What's New", action: () => {} },
            { name: "Credits & Licenses", action: () => {} },
          ]}
        />
        <Category
          categoryName="💬 Feedback & Support"
          features={[
            { name: "Report a Bug", action: () => {} },
            { name: "Share Feedback", action: () => {} },
            { name: "Contact Developer", action: () => {} },
          ]}
        />
        <Category
          categoryName="📄 Legal"
          features={[
            { name: "Privacy Policy", action: () => {} },
            { name: "Terms & Conditions", action: () => {} },
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
