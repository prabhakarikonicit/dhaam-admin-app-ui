import React, { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { CountryCode } from '../types';

interface CountrySelectorProps {
  selectedCountry: CountryCode;
  setSelectedCountry: (country: CountryCode) => void;
  showCountryDropdown: boolean;
  setShowCountryDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  countryCodes: CountryCode[];
}

const CountrySelector: React.FC<CountrySelectorProps> = ({
  selectedCountry,
  setSelectedCountry,
  showCountryDropdown,
  setShowCountryDropdown,
  countryCodes
}) => {
  const countrySelectorRef = useRef<HTMLDivElement>(null);
  const countryDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(event.target as Node)
      ) {
        setShowCountryDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowCountryDropdown]);

  return (
    <div className="relative">
      <div
        ref={countrySelectorRef}
        className="flex items-center px-3 pb-3 pt-3 cursor-pointer"
        onClick={() => setShowCountryDropdown(prev => !prev)}
      >
        <span className="text-[12px] font-bold font-inter mr-1">
          {selectedCountry.code}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className="ml-1"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M4.23431 5.83429C4.54673 5.52187 5.05327 5.52187 5.36569 5.83429L8 8.4686L10.6343 5.83429C10.9467 5.52187 11.4533 5.52187 11.7657 5.83429C12.0781 6.14671 12.0781 6.65324 11.7657 6.96566L8.56569 10.1657C8.25327 10.4781 7.74673 10.4781 7.43431 10.1657L4.23431 6.96566C3.9219 6.65324 3.9219 6.14671 4.23431 5.83429Z"
            fill="#636363"
          />
        </svg>
      </div>
      
      {/* Country Dropdown using Portal */}
      {showCountryDropdown &&
        countrySelectorRef.current &&
        ReactDOM.createPortal(
          <div
            ref={countryDropdownRef}
            className="bg-white border border-grey-border rounded-md shadow-lg max-h-60 w-48 overflow-y-auto py-1"
            style={{
              position: "absolute",
              zIndex: 99999,
              left: countrySelectorRef.current.getBoundingClientRect().left,
              top: countrySelectorRef.current.getBoundingClientRect().bottom + 5,
            }}
          >
            {countryCodes.map((country) => (
              <div
                key={country.code}
                className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setSelectedCountry(country);
                  setShowCountryDropdown(false);
                }}
              >
                <div className="flex items-center flex-1">
                  <span className="text-[12px] font-bold font-inter ml-5">
                    {country.code}
                  </span>
                </div>
                <span className="text-[12px] font-[400] font-inter ml-auto text-gray-500">
                  {country.dialCode}
                </span>
                {selectedCountry.code === country.code && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="ml-2"
                  >
                    <path
                      d="M6.5 10.5L3.5 7.5L4.5 6.5L6.5 8.5L11.5 3.5L12.5 4.5L6.5 10.5Z"
                      fill="#212121"
                    />
                  </svg>
                )}
              </div>
            ))}
          </div>,
          document.body
        )}
    </div>
  );
};

export default CountrySelector;