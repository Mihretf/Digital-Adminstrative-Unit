import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useLanguage } from "./context/LanguageContext";

import LandingPage from "./components/LandingPage/LandingPage";
import CreateAccountForm from "./components/CreateAccountForm/CreateAccountForm";
import SignInForm from "./components/SignInForm/SignInForm";

export default function App() {
  return (
    <useLanguage>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/create-account" element={<CreateAccountForm />} />
          <Route path="/sign-in" element={<SignInForm />} />
        </Routes>
      </Router>
    </useLanguage>
  );
}
