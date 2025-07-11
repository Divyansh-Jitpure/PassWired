import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router";
import Home from "./pages/home/Home";
import Vault from "./pages/vault/Vault";
import Navbar from "./components/Navbar";
import More from "./pages/more/More";
import Header from "./components/Header";

const App = () => {
  return (
    <main className="grid min-h-[100dvh] grid-rows-[auto_1fr_auto] bg-[#DDDDDD]">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vault" element={<Vault />} />
          <Route path="/more" element={<More />} />
        </Routes>
        <Navbar />
      </Router>
    </main>
  );
};

export default App;
