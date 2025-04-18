import React, { useState } from "react";
import { Eye, Mail, ChevronDown, Lock } from "lucide-react";

interface FormFieldProps {
  type: string;
  placeholder: string;
  icon?: React.ReactNode;
  prefix?: string;
  isRequired?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  type,
  placeholder,
  icon,
  prefix,
  isRequired = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative h-[56px] mb-4">
      <div
        className={`absolute inset-0 rounded-[12px] bg-white ${
          isFocused ? "ring-1 ring-headding-color" : "border border-[#E5E7EB]"
        }`}
      />

      <div className="relative flex items-center h-full px-4 mr-2">
        {/* Left Icons */}
        {type === "email" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M2.00333 5.88355L9.99995 9.88186L17.9967 5.8835C17.9363 4.83315 17.0655 4 16 4H4C2.93452 4 2.06363 4.83318 2.00333 5.88355Z"
              fill="#636363"
            />
            <path
              d="M18 8.1179L9.99995 12.1179L2 8.11796V14C2 15.1046 2.89543 16 4 16H16C17.1046 16 18 15.1046 18 14V8.1179Z"
              fill="#636363"
            />
          </svg>
        )}
        {type === "password" && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M5 9V7C5 4.23858 7.23858 2 10 2C12.7614 2 15 4.23858 15 7V9C16.1046 9 17 9.89543 17 11V16C17 17.1046 16.1046 18 15 18H5C3.89543 18 3 17.1046 3 16V11C3 9.89543 3.89543 9 5 9ZM13 7V9H7V7C7 5.34315 8.34315 4 10 4C11.6569 4 13 5.34315 13 7Z"
              fill="#C2C2C2"
            />
          </svg>
        )}

        {/* Phone Prefix */}
        {prefix && (
          <div className="flex items-center mr-2 text-[14px] font-inter">
            <span className="text-reloadBorder text-[14px] font-inter">
              {prefix}
            </span>
            {/* <ChevronDown className="w-4 h-4 text-gray-400 ml-1" /> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M6.35147 8.75137C6.8201 8.28275 7.5799 8.28275 8.04853 8.75137L12 12.7028L15.9515 8.75137C16.4201 8.28275 17.1799 8.28275 17.6485 8.75137C18.1172 9.22 18.1172 9.9798 17.6485 10.4484L12.8485 15.2484C12.3799 15.7171 11.6201 15.7171 11.1515 15.2484L6.35147 10.4484C5.88284 9.9798 5.88284 9.22 6.35147 8.75137Z"
                fill="#C2C2C2"
              />
            </svg>
          </div>
        )}

        {/* Input Field */}
        <input
          type={showPassword ? "text" : type}
          placeholder={placeholder}
          required={isRequired}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full h-full bg-transparent border-none outline-none text-[14px] font-inter placeholder-gray-400"
        />

        {/* Password Toggle */}
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="ml-2 text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            <Eye className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

const SignUPLogIN: React.FC = () => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Left Section */}
      <div className="w-[676px] bg-bgButton p-12 flex flex-col justify-center">
        <h1 className="text-[40px] font-inter leading-[60px] font-[700] text-whiteColor mb-4">
          Welcome to Dhaam
        </h1>
        <p className="text-[18px] font-inter leading-[27px] font-[500] text-whiteColor">
          Your Gateway to Effortless Business.
        </p>
        <div className="mt-12">
          <img
            src="/api/placeholder/600/400"
            alt="Welcome Illustration"
            className="w-full max-w-xl mx-auto"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="w-1/2 p-12 flex flex-col">
        <div className="flex justify-center max-w-md mx-auto w-full gap mb-12 text-whiteColor text-cardValue bg-background-grey p-[8px] text-[14px] font-inter leading-[27px] font-[500] rounded-custom8px">
          <button className="px-6 py-2 bg-bgButton text-white rounded-lg">
            Create Account
          </button>
          <button className="px-6 py-2 text-gray-700">Login</button>
        </div>

        <div className="max-w-md mx-auto w-full">
          <form className="space-y-6">
            <FormField type="email" placeholder="aman.ku" />

            <FormField
              type="tel"
              placeholder="Enter Phone Number"
              prefix="+91"
            />

            <div className="space-y-2">
              <FormField type="password" placeholder="Password" />
              <ul className="text-[14px] text-gray-600 space-y-2 mt-2">
                <li className="flex items-center gap-2 text-[12px] font-inter leading-[15.6px] font-[400]">
                  <svg
                    className="w-4 h-4 text-green-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Cannot contain your name or email address
                </li>
                <li className="flex items-center gap-2 text-[12px] font-inter leading-[15.6px] font-[400]">
                  <svg
                    className="w-4 h-4 text-green-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  At least 8 characters
                </li>
                <li className="flex items-center gap-2 text-[12px] font-inter leading-[15.6px] font-[400]">
                  <svg
                    className="w-4 h-4 text-green-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Contains a number or symbol
                </li>
              </ul>
            </div>

            <button className="w-full text-white bg-bgButton py-4 rounded-custom8px border-1 border-solid border-btnBorder font-inter text-[14px]">
              Signup for free
            </button>

            <div className="relative text-center my-6">
              <div className="absolute inset-0 flex items-center justify-between">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="178"
                  height="2"
                  viewBox="0 0 178 2"
                  fill="none"
                >
                  <path d="M1 1H177" stroke="#C2C2C2" strokeLinecap="round" />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="178"
                  height="2"
                  viewBox="0 0 178 2"
                  fill="none"
                >
                  <path d="M1 1H177" stroke="#C2C2C2" strokeLinecap="round" />
                </svg>
              </div>
              <span className="relative bg-white px-4 text-[14px] font-inter font-[400] text-gray-500">
                OR
              </span>
            </div>

            <button className="w-full flex items-center justify-center gap-3 border border-reloadBorder py-4 rounded-custom8px font-inter font-[5 00] text-[14px] leading-[21px] ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="19"
                height="19"
                viewBox="0 0 19 19"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M18.14 9.70456C18.14 9.06637 18.0827 8.45274 17.9764 7.86365H9.5V11.345H14.3436C14.135 12.47 13.5009 13.4232 12.5477 14.0614V16.3196H15.4564C17.1582 14.7527 18.14 12.4455 18.14 9.70456Z"
                  fill="#4285F4"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M9.49976 18.5C11.9298 18.5 13.967 17.6941 15.4561 16.3195L12.5475 14.0613C11.7416 14.6013 10.7107 14.9204 9.49976 14.9204C7.15567 14.9204 5.17158 13.3372 4.46385 11.21H1.45703V13.5418C2.93794 16.4831 5.98158 18.5 9.49976 18.5Z"
                  fill="#34A853"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M4.46409 11.2099C4.28409 10.6699 4.18182 10.0931 4.18182 9.49995C4.18182 8.90677 4.28409 8.32995 4.46409 7.78995V5.45813H1.45727C0.847727 6.67313 0.5 8.04768 0.5 9.49995C0.5 10.9522 0.847727 12.3268 1.45727 13.5418L4.46409 11.2099Z"
                  fill="#FBBC05"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M9.49976 4.07955C10.8211 4.07955 12.0075 4.53364 12.9402 5.42545L15.5216 2.84409C13.9629 1.39182 11.9257 0.5 9.49976 0.5C5.98158 0.5 2.93794 2.51682 1.45703 5.45818L4.46385 7.79C5.17158 5.66273 7.15567 4.07955 9.49976 4.07955Z"
                  fill="#EA4335"
                />
              </svg>
              Continue with google
            </button>

            <p className="text-paragraph text-center py-4 rounded-custom8px font-inter font-[400] text-[11px] leading-[14.3px]">
              By signing up to create an account I accept Company's{" "}
              <a
                href="#"
                className="text-paragraphBlack hover:underline text-center  py-4  font-inter font-[400] text-[11px] "
              >
                Terms of use & Privacy Policy
              </a>
              .
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUPLogIN;
