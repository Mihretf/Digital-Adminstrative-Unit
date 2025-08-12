import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext"; // your context provider
import LandingPage from "./components/LandingPage/LandingPage";
import CreateAccountForm from "./components/CreateAccountForm/CreateAccountForm";
import SignInForm from "./components/SignInForm/SignInForm";
import { Dashboard } from "./components/Dashboard/Dashboard"; // import your dashboard

export default function App() {
  const [userRequests, setUserRequests] = useState([]);

  const handleLogout = () => {
    console.log("Logging out...");
  };

  const handleRequestService = (serviceId) => {
    console.log("Requested service:", serviceId);
  };

  const handleViewRequest = (request) => {
    console.log("Viewing request:", request);
  };

  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/create-account" element={<CreateAccountForm />} />
          <Route path="/sign-in" element={<SignInForm />} />
          <Route
            path="/dashboard"
            element={
              <Dashboard
                onLogout={handleLogout}
                onRequestService={handleRequestService}
                onViewRequest={handleViewRequest}
                userRequests={userRequests}
              />
            }
          />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}
