import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import Home from "./pages/home/Home";
import Vault from "./pages/vault/Vault";
import Navbar from "./components/Navbar";
import More from "./pages/more/More";
import Header from "./components/Header";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import { useDispatch, useSelector } from "react-redux";
import API from "./utils/api";
import { setCredentials } from "./features/auth/authSlice";
import ProtectedRoutes from "./components/ProtectedRoutes";
import AppPin from "./pages/login/AppPin";
import PinModal from "./components/PinModal";
import ToastManager from "./components/ToastManager";

const App = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const showPinModal = useSelector((state) => state.auth.showPinModal);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Refresh first to get new access token
        const refresh = await API.post("/auth/refresh", {});
        const accessToken = refresh.data.accessToken;

        // Set Authorization header for all future requests
        API.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

        // Now get the user
        const res = await API.get("/auth/user");
        const user = res.data.user;

        dispatch(setCredentials({ accessToken, user }));
      } catch (err) {
        console.error(
          "Auto login failed:",
          err.response?.data?.error || err.message,
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <main className="grid min-h-[100dvh] grid-rows-[auto_1fr_auto] bg-[#DDDDDD]">
      <Router>
        <ToastManager />
        <Header />
        {showPinModal && <PinModal />}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/appPin" element={<AppPin />} />
            <Route path="/" element={<Home />} />
            <Route path="/vault" element={<Vault />} />
            <Route path="/more" element={<More />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
        <Navbar />
      </Router>
    </main>
  );
};

export default App;
