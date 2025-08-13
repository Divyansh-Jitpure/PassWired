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
import TermsConditions from "./pages/terms/TermsConditions";
import PrivacyPolicy from "./pages/terms/PrivacyPolicy";
import DesktopNavbar from "./components/Navbar/DesktopNavbar";
import PasswordGenerator from "./pages/passwordGenerator/PasswordGenerator";
import PasswordStrength from "./pages/passwordStrength/PasswordStrength";

const App = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const { showPinModal, activeTheme } = useSelector((state) => state.auth);

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

  if (loading)
    return (
      <div className={activeTheme ? "dark" : ""}>
        <div className="dark:bg-primary-dark flex h-screen flex-col items-center justify-center bg-[#DDDDDD] pb-10">
          <div className="mx-auto h-20 w-20 animate-spin rounded-full border-6 border-dashed border-[#F05454]"></div>
          <section className="text-center">
            <h2 className="dark:text-primary mt-4 text-3xl font-semibold text-[#30475E]">
              Loading...
            </h2>
            <p className="text-2xl text-zinc-500 dark:text-zinc-400">
              PassWired is loading...
            </p>
            <p className="text-lg text-zinc-400 dark:text-zinc-500">
              — Please Wait —
            </p>
          </section>
        </div>
      </div>
    );

  return (
    <div className={activeTheme ? "dark" : ""}>
      <main className="bg-primary dark:bg-primary-dark grid min-h-[100dvh] grid-rows-[auto_1fr_auto]">
        <Router>
          <ToastManager />
          <DesktopNavbar />
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
              <Route path="/privacypolicy" element={<PrivacyPolicy />} />
              <Route path="/t&c" element={<TermsConditions />} />
              <Route
                path="/passwordGenerator"
                element={<PasswordGenerator />}
              />
              <Route path="/passwordStrength" element={<PasswordStrength />} />
            </Route>
          </Routes>
          <Navbar />
        </Router>
      </main>
    </div>
  );
};

export default App;
