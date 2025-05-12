import React, { useState } from 'react';
import CountrySelector from '../shared/CountrySelector';
import { CountryCode } from '../types';

interface PersonalInfoProps {
  countryCodes: CountryCode[];
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({ countryCodes }) => {
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>({
    code: "IN",
    flag: "🇮🇳",
    dialCode: "+91",
  });
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);

  return (
    <div className="bg-white border border-reloadBorder rounded-custom8px mb-6 mt-4 overflow-hidden">
      <div className="bg-background-grey p-4 py-6 border-b border-reloadBorder">
        <h2 className="text-cardValue font-inter font-[14px] font-[600] tracking-wide">
          Personal Information
        </h2>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-[12px] font-[500] font-inter text-paragraphBlack mb-2">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Aman Kumar"
              className="w-full py-3 px-3 border border-reloadBorder rounded-custom text-[12px] font-[500] font-inter text-paragraphBlack"
            />
          </div>
          <div>
            <label className="block text-[12px] font-[500] font-inter text-paragraphBlack mb-2">
              Email
            </label>
            <input
              type="email"
              className="w-full py-3 px-3 border border-reloadBorder rounded-custom text-[12px] font-[500] font-inter text-paragraphBlack placeholder:paragraphBlack"
              placeholder="amanofficial502@gmail.com"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[12px] font-[500] font-inter text-paragraphBlack mb-2">
              Address
            </label>
            <div className="relative">
              <input
                type="text"
                className="w-full py-3 px-3 border border-reloadBorder rounded-custom text-[12px] font-[500] font-inter text-paragraphBlack placeholder:paragraphBlack"
                placeholder="6391 Elgin St. Celina, Delaware 10299"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <g clip-path="url(#clip0_8744_3490)">
                    <path
                      d="M7.99984 5.33332C6.5265 5.33332 5.33317 6.52666 5.33317 7.99999C5.33317 9.47332 6.5265 10.6667 7.99984 10.6667C9.47317 10.6667 10.6665 9.47332 10.6665 7.99999C10.6665 6.52666 9.47317 5.33332 7.99984 5.33332ZM13.9598 7.33332C13.8088 5.9814 13.2026 4.72102 12.2407 3.75912C11.2788 2.79722 10.0184 2.191 8.6665 2.03999V1.33332C8.6665 0.966656 8.3665 0.666656 7.99984 0.666656C7.63317 0.666656 7.33317 0.966656 7.33317 1.33332V2.03999C5.98125 2.191 4.72086 2.79722 3.75897 3.75912C2.79707 4.72102 2.19085 5.9814 2.03984 7.33332H1.33317C0.966504 7.33332 0.666504 7.63332 0.666504 7.99999C0.666504 8.36666 0.966504 8.66666 1.33317 8.66666H2.03984C2.19085 10.0186 2.79707 11.279 3.75897 12.2409C4.72086 13.2028 5.98125 13.809 7.33317 13.96V14.6667C7.33317 15.0333 7.63317 15.3333 7.99984 15.3333C8.3665 15.3333 8.6665 15.0333 8.6665 14.6667V13.96C10.0184 13.809 11.2788 13.2028 12.2407 12.2409C13.2026 11.279 13.8088 10.0186 13.9598 8.66666H14.6665C15.0332 8.66666 15.3332 8.36666 15.3332 7.99999C15.3332 7.63332 15.0332 7.33332 14.6665 7.33332H13.9598ZM7.99984 12.6667C5.41984 12.6667 3.33317 10.58 3.33317 7.99999C3.33317 5.41999 5.41984 3.33332 7.99984 3.33332C10.5798 3.33332 12.6665 5.41999 12.6665 7.99999C12.6665 10.58 10.5798 12.6667 7.99984 12.6667Z"
                      fill="black"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_8744_3490">
                      <rect width="16" height="16" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </button>
            </div>
          </div>
          <div>
            <label className="block text-[12px] font-[500] font-inter text-paragraphBlack mb-2">
              Phone
            </label>
            <div className="flex items-center border border-reloadBorder rounded-custom overflow-hidden relative">
              {/* Country Code Selector */}
              <CountrySelector 
                selectedCountry={selectedCountry}
                setSelectedCountry={setSelectedCountry}
                showCountryDropdown={showCountryDropdown}
                setShowCountryDropdown={setShowCountryDropdown}
                countryCodes={countryCodes}
              />

              {/* Phone Input */}
              <input
                type="text"
                className="flex-1 py-2 px-2 border-none outline-none text-[12px] font-[500] font-inter text-paragraphBlack placeholder:paragraphBlack"
                placeholder="8102308108"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;