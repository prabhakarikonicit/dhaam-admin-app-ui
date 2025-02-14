import React, { useState, ChangeEvent } from "react";
import backgroundImage from "../../lib/Images/bg.png";
import Step4SingupForm from "./Step4SingupForm";
interface FormFieldProps {
  type: string;
  placeholder: string;
  value: string;
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  isRequired?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  type,
  placeholder,
  value,
  name,
  onChange,
  isRequired = false,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      name={name}
      onChange={onChange}
      required={isRequired}
      className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
    />
  );
};

interface StepIndicatorProps {
  currentStep: number;
  steps: string[];
}

const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  steps,
}) => {
  return (
    <div className="flex items-center justify-center w-full sm:w-[600px] md:w-[600px] lg:w-[600px] xl:w-[600px] ms-5  mb-8">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center flex-1">
          {/* Circle container */}
          <div className="relative flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16Z"
                fill={index <= currentStep ? "#34A853" : "#E5E7EB"}
              />
              {index <= currentStep && (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.7206 6.39125C13.0931 6.01881 13.0931 5.41496 12.7206 5.04252C12.3482 4.67007 11.7443 4.67007 11.3719 5.04252L6.65144 9.76297L4.62831 7.73984C4.25587 7.3674 3.65202 7.3674 3.27958 7.73984C2.90713 8.11228 2.90713 8.71613 3.27958 9.08857L5.96473 11.7737C5.96876 11.7779 5.97284 11.7821 5.97697 11.7862C6.34941 12.1586 6.95326 12.1586 7.3257 11.7862L12.7206 6.39125Z"
                  fill="white"
                />
              )}
            </svg>
            {/* Text below the circle */}
            <span
              className={`absolute whitespace-nowrap text-sm font-inter font-[500px] top-10 text-headding-color
                ${
                  index === currentStep
                    ? "text-purpleColor"
                    : "text-headding-color"
                }`}
            >
              {step}
            </span>
          </div>

          {/* Connecting line */}
          {index < steps.length - 1 && (
            <div
              className={`h-[2px] flex-1
                ${index < currentStep ? "bg-[#34A853]" : "bg-gray-300"}`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

interface FormData {
  businessName: string;
  businessType: string;
  businessCategory: string;
}

const BusinessSignup: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    businessName: "",
    businessType: "",
    businessCategory: "",
  });
  const [showStep4SingupForm, setShowStep4SingupForm] = useState(false);

  const steps = ["Basic Details", "Business Details", "Setup Domain"];
  const currentStep = 1;

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  if (showStep4SingupForm) {
    return <Step4SingupForm />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-l from-[#D3B4D9]/60 to-[#C2BAC2]/20 bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center justify-center gap-x-4 mb-[3rem]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
          >
            <path
              d="M29.5238 17.4288L25.7143 17.4288C25.3354 17.4288 24.9721 17.2783 24.7041 17.0104C24.4362 16.7425 24.2857 16.3791 24.2857 16.0002C24.2857 15.6213 24.4362 15.258 24.7041 14.9901C24.9721 14.7221 25.3354 14.5716 25.7143 14.5716L29.5238 14.5716C29.9027 14.5716 30.2661 14.7221 30.534 14.9901C30.8019 15.258 30.9524 15.6213 30.9524 16.0002C30.9524 16.3791 30.8019 16.7425 30.534 17.0104C30.2661 17.2783 29.9027 17.4288 29.5238 17.4288ZM25.2381 21.7145C25.2381 21.3356 25.0876 20.9723 24.8197 20.7043C24.5518 20.4364 24.1884 20.2859 23.8095 20.2859L20 20.2859C19.6211 20.2859 19.2578 20.4364 18.9899 20.7043C18.7219 20.9723 18.5714 21.3356 18.5714 21.7145C18.5714 22.0934 18.7219 22.4567 18.9899 22.7246C19.2578 22.9926 19.6211 23.1431 20 23.1431L23.8095 23.1431C24.1884 23.1431 24.5518 22.9926 24.8197 22.7246C25.0876 22.4567 25.2381 22.0934 25.2381 21.7145ZM8.09525 16.0002C8.09525 15.6213 7.94474 15.258 7.67683 14.9901C7.40892 14.7221 7.04556 14.5716 6.66668 14.5716L2.85715 14.5716C2.47827 14.5716 2.11491 14.7221 1.847 14.9901C1.57909 15.258 1.42858 15.6213 1.42858 16.0002C1.42858 16.3791 1.57909 16.7424 1.847 17.0104C2.11491 17.2783 2.47827 17.4288 2.85715 17.4288L6.66668 17.4288C7.04556 17.4288 7.40892 17.2783 7.67683 17.0104C7.94474 16.7424 8.09525 16.3791 8.09525 16.0002ZM22.381 16.0002C22.381 15.6213 22.2305 15.258 21.9625 14.9901C21.6946 14.7221 21.3313 14.5716 20.9524 14.5716L11.4286 14.5716C11.0497 14.5716 10.6863 14.7221 10.4184 14.9901C10.1505 15.258 10 15.6213 10 16.0002C10 16.3791 10.1505 16.7424 10.4184 17.0104C10.6863 17.2783 11.0497 17.4288 11.4286 17.4288L20.9524 17.4288C21.3313 17.4288 21.6946 17.2783 21.9625 17.0104C22.2305 16.7425 22.381 16.3791 22.381 16.0002ZM25.2381 10.2859C25.2381 9.90704 25.0876 9.54368 24.8197 9.27577C24.5518 9.00786 24.1884 8.85735 23.8095 8.85735L17.1429 8.85735C16.764 8.85735 16.4006 9.00786 16.1327 9.27577C15.8648 9.54368 15.7143 9.90704 15.7143 10.2859C15.7143 10.6648 15.8648 11.0282 16.1327 11.2961C16.4006 11.564 16.764 11.7145 17.1429 11.7145L23.8095 11.7145C24.1884 11.7145 24.5518 11.564 24.8197 11.2961C25.0876 11.0282 25.2381 10.6648 25.2381 10.2859ZM16.6667 21.7145C16.6667 21.3356 16.5162 20.9723 16.2483 20.7043C15.9803 20.4364 15.617 20.2859 15.2381 20.2859L8.57144 20.2859C8.19256 20.2859 7.8292 20.4364 7.56129 20.7043C7.29338 20.9723 7.14287 21.3356 7.14287 21.7145C7.14287 22.0934 7.29338 22.4567 7.56129 22.7246C7.8292 22.9926 8.19256 23.1431 8.57144 23.1431L15.2381 23.1431C15.617 23.1431 15.9803 22.9926 16.2483 22.7246C16.5162 22.4567 16.6667 22.0934 16.6667 21.7145ZM19.5238 4.57164C19.5238 4.19276 19.3733 3.82939 19.1054 3.56148C18.8375 3.29358 18.4741 3.14307 18.0953 3.14307L14.2857 3.14307C13.9068 3.14307 13.5435 3.29358 13.2756 3.56148C13.0077 3.82939 12.8572 4.19276 12.8572 4.57164C12.8572 4.95052 13.0077 5.31388 13.2756 5.58179C13.5435 5.8497 13.9068 6.00021 14.2857 6.00021L18.0953 6.00021C18.4741 6.00021 18.8375 5.8497 19.1054 5.58179C19.3733 5.31388 19.5238 4.95052 19.5238 4.57164ZM13.8095 10.2859C13.8095 9.90704 13.659 9.54368 13.3911 9.27577C13.1232 9.00786 12.7598 8.85735 12.381 8.85735L8.57144 8.85735C8.19256 8.85735 7.8292 9.00786 7.56129 9.27577C7.29338 9.54368 7.14287 9.90704 7.14287 10.2859C7.14287 10.6648 7.29338 11.0282 7.56129 11.2961C7.8292 11.564 8.19256 11.7145 8.57144 11.7145L12.381 11.7145C12.7598 11.7145 13.1232 11.564 13.3911 11.2961C13.659 11.0282 13.8095 10.6648 13.8095 10.2859ZM19.5238 27.4288C19.5238 27.0499 19.3733 26.6865 19.1054 26.4186C18.8375 26.1507 18.4741 26.0002 18.0952 26.0002L14.2857 26.0002C13.9068 26.0002 13.5435 26.1507 13.2756 26.4186C13.0077 26.6865 12.8572 27.0499 12.8572 27.4288C12.8572 27.8077 13.0077 28.171 13.2756 28.4389C13.5435 28.7068 13.9068 28.8574 14.2857 28.8574L18.0952 28.8574C18.4741 28.8574 18.8375 28.7068 19.1054 28.4389C19.3733 28.171 19.5238 27.8077 19.5238 27.4288Z"
              fill="#1E293B"
            />
          </svg>
          <button className="text-purpleColor text-[26.667px] font-krona font-[400] leading-[40px]">
            {" "}
            Dhaam
          </button>
          {/* <img
            src="/api/placeholder/120/40"
            alt="Dhaam logo"
            className="mx-auto"
          /> */}
        </div>
        <StepIndicator currentStep={currentStep} steps={steps} />

        <form className="space-y-[62px] mt-[75px] ">
          <div className="space-y-4">
            <div>
              <label className="block text-[14px] font-inter font-[400] text-paragraphBlack leading-[21px] mb-1  ">
                Business Name
              </label>
              <FormField
                type="text"
                placeholder="Hyperstore"
                value={formData.businessName}
                name="businessName"
                onChange={handleInputChange}
                isRequired
              />
            </div>

            <div>
              <label className="block mt-[20px] text-[14px] font-inter font-[500] text-paragraphBlack leading-[21px] mb-1">
                Business Type
              </label>
              <select
                className="w-full p-3 border border-reloadBorder font-inter text-reloadBorder rounded-custom8px focus:outline-none focus:border-purple-500 bg-white"
                value={formData.businessType}
                onChange={handleInputChange}
                name="businessType"
              >
                <option className="font-inter" value="">
                  Select Business Type
                </option>
                <option className="font-intr" value="retail">
                  Retail
                </option>
                <option className="font-inter" value="service">
                  Service
                </option>
                <option className="font-inter" value="manufacturing">
                  Manufacturing
                </option>
              </select>
            </div>

            <div>
              <label className="block text-[14px] mt-[20px] font-inter font-[500] text-paragraphBlack leading-[21px] mb-1">
                Business Category
              </label>
              <select
                className="w-full p-3 border border-reloadBorder font-inter text-reloadBorder rounded-custom8px focus:outline-none focus:border-purple-500 bg-white"
                value={formData.businessCategory}
                onChange={handleInputChange}
                name="businessCategory"
              >
                <option
                  className="font-inter border border-reloadBorder"
                  value=""
                >
                  Select Business Category
                </option>
                <option className="font-inter" value="food">
                  Food & Beverage
                </option>
                <option className="font-inter" value="tech">
                  Technology
                </option>
                <option className="font-inter" value="fashion">
                  Fashion
                </option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            onClick={() => setShowStep4SingupForm(true)}
            className="w-full bg-bgButton text-white py-3  text-[14px] font-inter font-[600] text-paragraphBlack leading-[21px] h-[40px] rounded-custom8px hover:bg-purple-700 transition-colors"
          >
            Create Account
          </button>
        </form>

        <p className="text-[10px] mt-[28px] md:mt-[64px] sm:mt-[64px] font-satoshi font-[500] text-center text-paragraphBlack mt-6">
          {/* By continuing, you agree to our{" "} */}
          <a
            href="#"
            className="text-[12px] font-satoshi font-[500] text-center text-paragraphBlack hover:underline"
          >
            Terms of use
          </a>{" "}
          &{" "}
          <a
            href="#"
            className="text-[12px] font-satoshi font-[500] text-center text-paragraphBlack hover:underline"
          >
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
};

export default BusinessSignup;