import React from "react";
import { Toaster } from "sonner";

// Component to manage toast notifications based on authentication events
const ToastManager = () => {
  return (
    <div className="absolute">
      <Toaster richColors mobileOffset={{ bottom: "80px" }} />
    </div>
  );
};

export default ToastManager;
