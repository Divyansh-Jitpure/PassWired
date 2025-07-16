import React from "react";
import UserInfo from "./UserInfo";

import Category from "./Category";
import Button from "../../components/Button";

const More = () => {
  return (
    <div className="mx-auto mb-22 flex w-[90%] flex-col items-center gap-5 select-none">
      <UserInfo />
      <section className="flex w-full flex-col gap-3">
        <Category
          name="🔐 Account & Security"
          features={["Change Password", "Enable 2FA", "Biometric Login"]}
        />
        <Category
          name="⚙️ App Settings"
          features={["Dark Mode", "Export Vault", "Feedback"]}
        />
        <Category
          name="📄 Legal"
          features={["Privacy Policy", "Delete Account"]}
        />
      </section>
      <Button text="Logout" />
    </div>
  );
};

export default More;
