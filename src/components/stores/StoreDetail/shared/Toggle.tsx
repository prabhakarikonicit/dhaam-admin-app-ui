import React from 'react';

interface ToggleProps {
  enabled: boolean;
  onChange: () => void;
  label?: string;
  description?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Toggle: React.FC<ToggleProps> = ({ 
  enabled, 
  onChange, 
  label, 
  description,
  size = 'md' 
}) => {
  const getToggleClasses = () => {
    const baseClasses = `relative inline-flex items-center rounded-full transition-colors focus:outline-none ${
      enabled ? "bg-bgButton" : "bg-gray-300"
    }`;
    
    switch (size) {
      case 'sm':
        return `${baseClasses} h-6 w-11`;
      case 'lg':
        return `${baseClasses} h-7 w-14`;
      default:
        return `${baseClasses} h-6 w-12`;
    }
  };

  const getThumbClasses = () => {
    const baseClasses = `inline-block transform rounded-full bg-white transition-transform`;
    
    switch (size) {
      case 'sm':
        return `${baseClasses} h-4 w-4 ${enabled ? "translate-x-5" : "translate-x-1"}`;
      case 'lg':
        return `${baseClasses} h-5 w-5 ${enabled ? "translate-x-7" : "translate-x-1"}`;
      default:
        return `${baseClasses} h-4 w-4 ${enabled ? "translate-x-7" : "translate-x-1"}`;
    }
  };

  return (
    <div>
      <div className="flex items-center">
        <button
          className={getToggleClasses()}
          onClick={onChange}
          role="switch"
          aria-checked={enabled}
        >
          <span className={getThumbClasses()} />
        </button>
        {label && (
          <span className="ml-3 font-inter text-[12px] font-[600] text-textHeading">
            {label}
          </span>
        )}
      </div>
      {description && (
        <p className="text-[12px] font-[500] font-inter text-cardTitle mt-1 ml-1">
          {description}
        </p>
      )}
    </div>
  );
};

export default Toggle;