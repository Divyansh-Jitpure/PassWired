import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import Home from "./pages/Home";
import Vault from "./pages/vault/Vault";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <main className="grid min-h-[100dvh] grid-rows-[auto_1fr_auto] bg-[#DDDDDD]">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vault" element={<Vault />} />
        </Routes>
        <Navbar />
      </Router>
    </main>
  );
};

export default App;
