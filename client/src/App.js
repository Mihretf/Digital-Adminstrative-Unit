import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useParams, useNavigate } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import LandingPage from "./components/LandingPage/LandingPage";
import CreateAccountForm from "./components/CreateAccountForm/CreateAccountForm";
import SignInForm from "./components/SignInForm/SignInForm";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { ServiceRequestForm } from "./components/serviceRequest/serviceRequest";

function ServiceRequestWrapper() {
  const { serviceType } = useParams();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/dashboard");
  };

  const handleSubmit = (data) => {
    console.log("Form submitted:", data);
    navigate("/dashboard");
  };

  return (
    <ServiceRequestForm
      serviceType={serviceType}
      onBack={handleBack}
      onSubmit={handleSubmit}
    />
  );
}

export default function App() {
  const [userRequests, setUserRequests] = useState([]);

  const handleLogout = () => {
    console.log("Logging out...");
    // You can navigate on logout inside Dashboard or other component using useNavigate
  };

  const handleViewRequest = (request) => {
    console.log("Viewing request:", request);
    // Navigate inside Dashboard or wrap this function to do so
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
                onViewRequest={handleViewRequest}
                userRequests={userRequests}
              />
            }
          />
          <Route path="/service-request/:serviceType" element={<ServiceRequestWrapper />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}
