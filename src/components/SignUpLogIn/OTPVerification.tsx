import React, { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";

interface OTPVerificationProps {
  email: string;
  onClose: () => void;
  onVerify: (otp: string) => void;
}

const OTPVerification: React.FC<OTPVerificationProps> = ({
  email = "aman@gmail.com",
  onClose,
  onVerify,
}) => {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [timeLeft, setTimeLeft] = useState<number>(20);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if value is entered
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResendOTP = () => {
    setTimeLeft(20);
    // Add your resend OTP logic here
  };

  const handleSubmit = () => {
    const otpString = otp.join("");
    onVerify(otpString);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          {/* <X className="w-5 h-5" /> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M6 18L18 6M6 6L18 18"
              stroke="#636363"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>

        {/* Header */}
        <h2 className="text-[25px] font-inter font-[700] leading-[37.5px] text-verifyOtp mb-2">
          Verify OTP
        </h2>
        <p className="text-headding-color font-inter font-[500] leading-[21px] text-[11px] sm:text-[14px]md:text-[14px] mb-6">
          We have sent an OTP to{" "}
          <span className="font-inter font-[700] leading-[21px] text-[11px] sm:text-[14px]md:text-[14px] text-gray-900">
            {email}
          </span>{" "}
          <button className="font-inter font-[700] text-menuSubHeadingColor  text-[11px] sm:text-[14px]md:text-[14px] hover:underline ml-1">
            Edit
          </button>
        </p>

        {/* OTP Input Fields */}
        <div className="flex flex-wrap gap-[0.80rem] sm:gap-3 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={digit}
              ref={(el) => (inputRefs.current[index] = el)}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className={`w-11 gap-1 sm:gap-4 sm:w-14 md:w-14 h-12 text-center font-inter bg-store-card border-2 border-bgButton rounded-custom8px
                ${index === 0 ? "border-bgButton" : "border-1 border-reloadBorder"}
                focus:outline-none focus:border-purple-500 focus:ring-0 focus:ring-purple-500`}
            />
          ))}
        </div>

        {/* Continue Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-bgButton text-white py-3 rounded-custom8px text-[15px] font-inter font-[600] hover:bg-purple-700 transition-colors mb-4 h-[48px]"
        >
          Continue
        </button>

        {/* Resend OTP */}
        <div className="text-center ">
          {timeLeft > 0 ? (
            <p className="text-textHeading text-[14px] font-inter font-[600]">
              Resend OTP in{" "}
              <span className="text-purpleColor text-[14px] font-inter font-[600] ">
                00:{timeLeft.toString().padStart(2, "0")}
             
              Sec </span>{" "}
            </p>
          ) : (
            <button
              onClick={handleResendOTP}
              className="text-purpleColor hover:underline"
            >
              Resend OTP
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
