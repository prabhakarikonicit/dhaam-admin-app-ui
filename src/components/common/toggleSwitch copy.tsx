import React from 'react';

interface ToggleSwitchProps {
  checked: boolean;

  onChange: (e: React.MouseEvent) => void;
  disabled?: boolean;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  checked,
  onChange,

  disabled = false,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby
}) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-labelledby={ariaLabelledby}
      aria-describedby={ariaDescribedby}
      disabled={disabled}
      onClick={(e) => {
        e.stopPropagation();
        onChange(e);
      }}
      className={`
        relative inline-flex h-6 w-12 md:w-11 sm:w-11 lg:w-11 xl:w-11 items-center rounded-full mt-[-10px] md:mt-[-25px] sm:mt-[-25px] lg:mt-[-25px] xl:mt-[-25px]
        ${checked ? 'bg-purple-600' : 'bg-gray-200'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        transition-colors ease-in-out duration-200
      `}
    >
      {checked ? (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 41 24" 
          fill="none"
          className="absolute inset-0 w-full h-full"
        >
          <path 
            d="M0.5 11C0.5 5.20101 5.20101 0.5 11 0.5H29C34.799 0.5 39.5 5.20101 39.5 11C39.5 16.799 34.799 21.5 29 21.5H11C5.20101 21.5 0.5 16.799 0.5 11Z" 
            fill="#7C43DF" 
            stroke="#7C43DF"
          />
          <g filter="url(#filter0_dd_5461_23766)">
            <circle cx="29" cy="11" r="9" fill="white"/>
          </g>
          <defs>
            <filter 
              id="filter0_dd_5461_23766" 
              x="17" 
              y="0" 
              width="24" 
              height="24" 
              filterUnits="userSpaceOnUse" 
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix"/>
              <feColorMatrix 
                in="SourceAlpha" 
                type="matrix" 
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" 
                result="hardAlpha"
              />
              <feOffset dy="1"/>
              <feGaussianBlur stdDeviation="1"/>
              <feColorMatrix 
                type="matrix" 
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"
              />
              <feBlend 
                mode="normal" 
                in2="BackgroundImageFix" 
                result="effect1_dropShadow_5461_23766"
              />
              <feColorMatrix 
                in="SourceAlpha" 
                type="matrix" 
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" 
                result="hardAlpha"
              />
              <feOffset dy="1"/>
              <feGaussianBlur stdDeviation="1.5"/>
              <feColorMatrix 
                type="matrix" 
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
              />
              <feBlend 
                mode="normal" 
                in2="effect1_dropShadow_5461_23766" 
                result="effect2_dropShadow_5461_23766"
              />
              <feBlend 
                mode="normal" 
                in="SourceGraphic" 
                in2="effect2_dropShadow_5461_23766" 
                result="shape"
              />
            </filter>
          </defs>
        </svg>
      ) : (
        <span
          className={`
            ${checked ? 'translate-x-6' : 'translate-x-1'}
            inline-block h-4 w-4 transform rounded-full bg-white
            transition ease-in-out duration-200
          `}
        />
      )}
    </button>
  );
};

export default ToggleSwitch;