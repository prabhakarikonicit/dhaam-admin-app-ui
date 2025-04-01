import React, { useState, useEffect } from "react";
import "./App.css";
import DashboardLayout from "./components/Dashboard-ui/dashboard-ui";
import SignUPLogIN from "./components/SignUpLogIn/SignUpLogin";
import BusinessSignup from "./components/SignUpLogIn/BusinessSignup";
import Step4SingupForm from "./components/SignUpLogIn/Step4SingupForm";
import SuccessPage from "./components/SignUpLogIn/SuccessPage";
import OTPVerification from "./components/SignUpLogIn/OTPVerification";

const App = () => {
  // Check localStorage on component mount to see if user was previously authenticated
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const savedAuth = localStorage.getItem('isAuthenticated');
    return savedAuth === 'true';
  });
  
  const [userEmail, setUserEmail] = useState(() => {
    return localStorage.getItem('userEmail') || "";
  });

  // Update localStorage whenever authentication state changes
  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated.toString());
    if (userEmail) {
      localStorage.setItem('userEmail', userEmail);
    }
  }, [isAuthenticated, userEmail]);

  // Handle successful login
  const handleLoginSuccess = (email: string) => {
    console.log('User logged in:', email);
    setUserEmail(email);
    setIsAuthenticated(true);
  };

  // Add logout function for completeness
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserEmail("");
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userEmail');
  };

  const handleOTPVerify = (otp: string) => {
    console.log('OTP Verified:', otp);
    // Add your verification logic here
  };

  const handleClose = () => {
    console.log('Modal closed');
    // Add your close modal logic here
  };

  return (
    <div className="App">
      {isAuthenticated ? (
        <DashboardLayout />
      ) : (
        <SignUPLogIN onLoginSuccess={handleLoginSuccess} />
      )}
      
      {/* Commented components */}
      {/* <Step4SingupForm/> */}
      {/* <BusinessSignup/> */}
      {/* <SuccessPage/> */}
      {/* <OTPVerification 
        email="aman@gmail.com"
        onClose={handleClose}
        onVerify={handleOTPVerify}
      /> */}
    </div>
  );
};

export default App;