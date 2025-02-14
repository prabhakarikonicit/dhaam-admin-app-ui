import React from "react";
import "./App.css";
import DashboardLayout from "./components/Dashboard-ui/dashboard-ui";
import SignUPLogIN from "./components/SignUpLogIn/SignUpLogin";
import AuthLayout from "./components/AuthLayout/AuthLayout";
import BusinessSignup from "./components/SignUpLogIn/BusinessSignup";
import Step4SingupForm from "./components/SignUpLogIn/Step4SingupForm";
import SuccessPage from "./components/SignUpLogIn/SuccessPage";
import OTPVerification from "./components/SignUpLogIn/OTPVerification";


const App = () => {

  const handleOTPVerify = (otp: string) => {
    console.log('OTP Verified:', otp);
    // Add your verification logic heresdfgsdfg
  };

  const handleClose = () => {
    console.log('Modal closed');
    // Add your close modal logic here
  };
  return (
    <div className="App">
      
     
      {/* <DashboardLayout /> */}
      {/* <Step4SingupForm/> */}
      {/* <SignUPLogIN />    */}
      <BusinessSignup/>
      {/* {/* <AuthLayout />  */}
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
