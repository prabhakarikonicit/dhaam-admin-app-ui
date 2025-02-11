import React, { useState } from "react";

interface StepIndicatorProps {
  currentStep: number;
  steps: Array<{
    title: string;
    completed: boolean;
  }>;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({
  steps,
  currentStep,
}) => {
  return (
    <div className="flex items-center justify-between w-full mb-8">
      {steps.map((step, index) => (
        <div key={step.title} className="flex items-center flex-1">
          <div className="flex flex-col items-center">
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full 
              ${
                step.completed
                  ? "bg-purple-500"
                  : index === currentStep
                  ? "border-2 border-purple-500"
                  : "border-2 border-gray-200"
              }`}
            >
              {step.completed && (
                <svg
                  className="w-4 h-4 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
            <span
              className={`mt-2 text-sm ${
                index === currentStep ? "text-purple-500" : "text-gray-500"
              }`}
            >
              {step.title}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={`h-0.5 w-full mx-4 ${
                step.completed ? "bg-purple-500" : "bg-gray-200"
              }`}
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
  const [domain, setDomain] = useState("hyperstore");
  const [suggestions] = useState<DomainSuggestion[]>([
    { name: "hyper-store", available: true },
    { name: "hyper-store-new", available: true },
    { name: "newhyperstore", available: true },
  ]);

  const steps = [
    { title: "Basic Details", completed: true },
    { title: "Business Details", completed: true },
    { title: "Setup Domain", completed: false },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-custom20px shadow-lg p-8">
      <div className="flex items-center justify-center mb-[3rem]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="31"
            height="32"
            viewBox="0 0 31 32"
            fill="none"
          >
            <g clip-path="url(#clip0_3505_2336)">
              <path
                d="M29.0238 17.4288L25.2143 17.4288C24.8354 17.4288 24.472 17.2783 24.2041 17.0104C23.9362 16.7425 23.7857 16.3791 23.7857 16.0002C23.7857 15.6213 23.9362 15.258 24.2041 14.9901C24.472 14.7221 24.8354 14.5716 25.2143 14.5716L29.0238 14.5716C29.4027 14.5716 29.766 14.7221 30.034 14.9901C30.3019 15.258 30.4524 15.6213 30.4524 16.0002C30.4524 16.3791 30.3019 16.7425 30.034 17.0104C29.766 17.2783 29.4027 17.4288 29.0238 17.4288ZM24.7381 21.7145C24.7381 21.3356 24.5876 20.9723 24.3197 20.7043C24.0518 20.4364 23.6884 20.2859 23.3095 20.2859L19.5 20.2859C19.1211 20.2859 18.7578 20.4364 18.4898 20.7043C18.2219 20.9723 18.0714 21.3356 18.0714 21.7145C18.0714 22.0934 18.2219 22.4567 18.4898 22.7246C18.7578 22.9926 19.1211 23.1431 19.5 23.1431L23.3095 23.1431C23.6884 23.1431 24.0518 22.9926 24.3197 22.7246C24.5876 22.4567 24.7381 22.0934 24.7381 21.7145ZM7.59523 16.0002C7.59523 15.6213 7.44472 15.258 7.17681 14.9901C6.9089 14.7221 6.54554 14.5716 6.16666 14.5716L2.35714 14.5716C1.97826 14.5716 1.6149 14.7221 1.34699 14.9901C1.07908 15.258 0.928567 15.6213 0.928567 16.0002C0.928567 16.3791 1.07908 16.7424 1.34699 17.0104C1.6149 17.2783 1.97826 17.4288 2.35714 17.4288L6.16666 17.4288C6.54554 17.4288 6.9089 17.2783 7.17681 17.0104C7.44472 16.7424 7.59523 16.3791 7.59523 16.0002ZM21.8809 16.0002C21.8809 15.6213 21.7304 15.258 21.4625 14.9901C21.1946 14.7221 20.8313 14.5716 20.4524 14.5716L10.9286 14.5716C10.5497 14.5716 10.1863 14.7221 9.91841 14.9901C9.65051 15.258 9.5 15.6213 9.5 16.0002C9.5 16.3791 9.65051 16.7424 9.91841 17.0104C10.1863 17.2783 10.5497 17.4288 10.9286 17.4288L20.4524 17.4288C20.8313 17.4288 21.1946 17.2783 21.4625 17.0104C21.7304 16.7425 21.8809 16.3791 21.8809 16.0002ZM24.7381 10.2859C24.7381 9.90704 24.5876 9.54368 24.3197 9.27577C24.0518 9.00786 23.6884 8.85735 23.3095 8.85735L16.6429 8.85735C16.264 8.85735 15.9006 9.00786 15.6327 9.27577C15.3648 9.54368 15.2143 9.90704 15.2143 10.2859C15.2143 10.6648 15.3648 11.0282 15.6327 11.2961C15.9006 11.564 16.264 11.7145 16.6429 11.7145L23.3095 11.7145C23.6884 11.7145 24.0518 11.564 24.3197 11.2961C24.5876 11.0282 24.7381 10.6648 24.7381 10.2859ZM16.1667 21.7145C16.1667 21.3356 16.0162 20.9723 15.7482 20.7043C15.4803 20.4364 15.117 20.2859 14.7381 20.2859L8.07142 20.2859C7.69254 20.2859 7.32918 20.4364 7.06127 20.7043C6.79336 20.9723 6.64285 21.3356 6.64285 21.7145C6.64285 22.0934 6.79336 22.4567 7.06127 22.7246C7.32918 22.9926 7.69254 23.1431 8.07142 23.1431L14.7381 23.1431C15.117 23.1431 15.4803 22.9926 15.7482 22.7246C16.0162 22.4567 16.1667 22.0934 16.1667 21.7145ZM19.0238 4.57164C19.0238 4.19276 18.8733 3.82939 18.6054 3.56148C18.3375 3.29358 17.9741 3.14307 17.5952 3.14307L13.7857 3.14307C13.4068 3.14307 13.0435 3.29358 12.7756 3.56148C12.5077 3.82939 12.3571 4.19276 12.3571 4.57164C12.3571 4.95052 12.5077 5.31388 12.7756 5.58179C13.0435 5.8497 13.4068 6.00021 13.7857 6.00021L17.5952 6.00021C17.9741 6.00021 18.3375 5.8497 18.6054 5.58179C18.8733 5.31388 19.0238 4.95052 19.0238 4.57164ZM13.3095 10.2859C13.3095 9.90704 13.159 9.54368 12.8911 9.27577C12.6232 9.00786 12.2598 8.85735 11.8809 8.85735L8.07142 8.85735C7.69254 8.85735 7.32918 9.00786 7.06127 9.27577C6.79336 9.54368 6.64285 9.90704 6.64285 10.2859C6.64285 10.6648 6.79336 11.0282 7.06127 11.2961C7.32918 11.564 7.69254 11.7145 8.07142 11.7145L11.8809 11.7145C12.2598 11.7145 12.6232 11.564 12.8911 11.2961C13.159 11.0282 13.3095 10.6648 13.3095 10.2859ZM19.0238 27.4288C19.0238 27.0499 18.8733 26.6865 18.6054 26.4186C18.3375 26.1507 17.9741 26.0002 17.5952 26.0002L13.7857 26.0002C13.4068 26.0002 13.0435 26.1507 12.7756 26.4186C12.5076 26.6865 12.3571 27.0499 12.3571 27.4288C12.3571 27.8077 12.5076 28.171 12.7756 28.4389C13.0435 28.7068 13.4068 28.8574 13.7857 28.8574L17.5952 28.8574C17.9741 28.8574 18.3375 28.7068 18.6054 28.4389C18.8733 28.171 19.0238 27.8077 19.0238 27.4288Z"
                fill="url(#paint0_linear_3505_2336)"
              />
            </g>
            <defs>
              <linearGradient
                id="paint0_linear_3505_2336"
                x1="30.4524"
                y1="16.0002"
                x2="0.928567"
                y2="16.0002"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#FBBC05" />
                <stop offset="0.18" stop-color="#3DF80E" />
                <stop offset="0.455" stop-color="#4A1BF3" />
                <stop offset="0.705" stop-color="#BDEF27" />
                <stop offset="1" stop-color="#EA4335" />
              </linearGradient>
              <clipPath id="clip0_3505_2336">
                <rect
                  width="30.4762"
                  height="30.4762"
                  fill="white"
                  transform="translate(0.452377 0.762207)"
                />
              </clipPath>
            </defs>
          </svg>
          <button className="text-purpleColor text-[26.667px] font-krona font-[400] leading-[40px]"> Dhaam</button>
          {/* <img
            src="/api/placeholder/120/40"
            alt="Dhaam logo"
            className="mx-auto"
          /> */}
        </div>

        <StepIndicator currentStep={2} steps={steps} />

        <div className="space-y-6">
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
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M8 14C8.78793 14 9.56815 13.8448 10.2961 13.5433C11.0241 13.2417 11.6855 12.7998 12.2426 12.2426C12.7998 11.6855 13.2417 11.0241 13.5433 10.2961C13.8448 9.56815 14 8.78793 14 8C14 7.21207 13.8448 6.43185 13.5433 5.7039C13.2417 4.97595 12.7998 4.31451 12.2426 3.75736C11.6855 3.20021 11.0241 2.75825 10.2961 2.45672C9.56815 2.15519 8.78793 2 8 2C6.4087 2 4.88258 2.63214 3.75736 3.75736C2.63214 4.88258 2 6.4087 2 8C2 9.5913 2.63214 11.1174 3.75736 12.2426C4.88258 13.3679 6.4087 14 8 14ZM7.84533 10.4267L11.1787 6.42667L10.1547 5.57333L7.288 9.01267L5.80467 7.52867L4.862 8.47133L6.862 10.4713L7.378 10.9873L7.84533 10.4267Z"
                  fill="#34A853"
                />
              </svg>
              <span className="text-validationSucColor px-2 text-[14px] font-inter font-[500] leading-[14px]">
                {" "}
                {domain}{" "}
              </span>{" "}
              <span className="text-cardTitle text-[14px] font-inter font-[500]">
                {" "}
                is available
              </span>
            </div>
          </div>

          <div>
            <p className="text-cardTitle text-[11px] font-inter font-[500] mb-2 leading-[14.3px] ">
              Suggestions
            </p>
            <div className="flex flex-wrap gap-2 ">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion.name}
                  onClick={() => setDomain(suggestion.name)}
                  className="px-4 py-2 border border-reloadBorder text-[13px] leading-[18px] font-roboto rounded-custom100px hover:border-purple-500 focus:outline-none focus:border-purple-500"
                >
                  {suggestion.name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex h-[40px] gap-4">
            <button className="flex-1 px-4 py-[12px] border border-cardTitle text-[14px] font-inter font-[400] rounded-custom8px  hover:bg-gray-50 focus:outline-none">
              Previous
            </button>
            <button className="flex-1 px-4 py-[12px] bg-bgButton text-white text-[14px] font-inter font-[400] rounded-custom8px hover:bg-purple-700 focus:outline-none">
              Finish
            </button>
          </div>

          <div className="text-center ">
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
