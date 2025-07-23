import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const ProtectedRoutes = () => {
  const { accessToken } = useSelector((state) => state.auth);
  return accessToken ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
