import React, { useState } from "react";
import SuccessPage from './SuccessPage';  

interface StepIndicatorProps {
  currentStep: number;
  steps: string[];
}

const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  steps,
}) => {
  return (
    <div className="flex items-center justify-center w-full sm:w-[600px] md:w-[600px] lg:w-[600px] xl:w-[600px] ms-5 mb-8">
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
              className={`absolute whitespace-nowrap text-sm font-inter font-[600px] top-10 text-headding-color
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

interface DomainSuggestion {
  name: string;
  available: boolean;
}

const Step4SingupForm: React.FC = () => {
  // Move all hooks to the top level
  const [showSuccessPage, setShowSuccessPage] = useState(false);
  const [domain, setDomain] = useState("hyperstore");
  const [suggestions] = useState<DomainSuggestion[]>([
    { name: "hyper-store", available: true },
    { name: "hyper-store-new", available: true },
    { name: "newhyperstore", available: true },
  ]);

  const steps = ["Basic Details", "Business Details", "Setup Domain"];
  const currentStep = 1;

  if (showSuccessPage) {
    return <SuccessPage />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-l from-[#D3B4D9]/60 to-[#C2BAC2]/20 bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-custom20px shadow-lg p-8">
        {/* Logo section */}
        <div className="flex items-center gap-x-4 justify-center mb-[3rem]">
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
            Dhaam
          </button>
        </div>

        <StepIndicator currentStep={currentStep} steps={steps} />

        <div className="space-y-[45px] mt-[75px]">
          {/* Domain input section */}
          <div>
            <label className="block text-[14px] font-inter font-[500] leading-[21px] text-paragraphBlack mb-1">
              Enter Domain
            </label>
            <div className="relative">
              <input
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="w-full p-3 pr-24 border border-reloadBorder text-[14px] font-inter text-menuSubHeadingColor font-[400] rounded-custom8px focus:outline-none focus:border-purple-500"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[14px] font-inter font-[400] text-cardTitle">
                .dhaam.com
              </span>
            </div>
            <div className="mt-2 flex items-center text-sm text-green-600">
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
                  d="M8 14C8.78793 14 9.56815 13.8448 10.2961 13.5433C11.0241 13.2417 11.6855 12.7998 12.2426 12.2426C12.7998 11.6855 13.2417 11.0241 13.5433 10.2961C13.8448 9.56815 14 8.78793 14 8C14 7.21207 13.8448 6.43185 13.5433 5.7039C13.2417 4.97595 12.7998 4.31451 12.2426 3.75736C11.6855 3.20021 11.0241 2.75825 10.2961 2.45672C9.56815 2.15519 8.78793 2 8 2C6.4087 2 4.88258 2.63214 3.75736 3.75736C2.63214 4.88258 2 6.4087 2 8C2 9.5913 2.63214 11.1174 3.75736 12.2426C4.88258 13.3679 6.4087 14 8 14ZM7.84533 10.4267L11.1787 6.42667L10.1547 5.57333L7.288 9.01267L5.80467 7.52867L4.862 8.47133L6.862 10.4713L7.378 10.9873L7.84533 10.4267Z"
                  fill="#34A853"
                />
              </svg>
              <span className="text-validationSucColor px-2 text-[14px] font-inter font-[500] leading-[14px]">
                {domain}
              </span>
              <span className="text-cardTitle text-[14px] font-inter font-[500]">
                is available
              </span>
            </div>
          </div>

          {/* Suggestions section */}
          <div>
            <p className="text-cardTitle text-[11px] font-inter font-[500] mb-2 leading-[14.3px]">
              Suggestions
            </p>
            <div className="flex flex-wrap gap-x-3 sm:gap-x-6 md:gap-x-6">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion.name}
                  onClick={() => setDomain(suggestion.name)}
                  className="px-2 sm:px-4 md:px-4 lg:px-4  py-2 border border-reloadBorder text-[9px] sm:text-[13px] md:text-[13px] lg:text-[13px] leading-[18px] font-roboto rounded-custom100px hover:border-purple-500 focus:outline-none focus:border-purple-500"
                >
                  {suggestion.name}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="flex h-[40px] gap-4">
            <button className="flex-1 h-[40px] px-4 py-[12px] border border-cardTitle text-[14px] font-inter font-[400] rounded-custom8px hover:bg-gray-50 focus:outline-none">
              Previous
            </button>
            <button
              onClick={() => setShowSuccessPage(true)}
              className="flex-1 px-4 py-[12px] bg-bgButton text-white text-[14px] font-inter font-[400] rounded-custom8px hover:bg-purple-700 focus:outline-none"
            >
              Finish
            </button>
          </div>

          {/* Custom domain link */}
          <div className="text-center">
            <button className="text-purpleColor text-[14px] font-inter font-[600] h-[40px] leading-[21px] hover:underline focus:outline-none">
              Use Custom Domain
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step4SingupForm;