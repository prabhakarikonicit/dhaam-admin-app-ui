

import React, { useRef, useState } from 'react';

const ColorPicker: React.FC<{
  label: string;
  description?: string;
  color: string;
  onChange?: (color: string) => void;
}> = ({ 
  label, 
  description, 
  color, 
  onChange 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };
  
  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  // Color picker component that we'll reuse
  const ColorPickerControl = () => (
    <div 
      className="flex items-center border rounded-md overflow-hidden cursor-pointer"
      onClick={handleClick}
    >
      <input 
        type="color"
        value={color}
        ref={inputRef}
        onChange={handleColorChange}
        className="opacity-0 absolute rounded-custom44px"
        aria-label={`Choose ${label} color`}
      />
      <div 
        className="w-8 h-8 flex items-center justify-center rounded-custom44px" 
        style={{ backgroundColor: color }}
      ></div>
      <div className="px-3 py-2 bg-white">
        <span className="text-sm font-medium">{color.toUpperCase()}</span>
      </div>
    </div>
  );

  return (
    <div className="mb-6 relative w-full">
      <div className="flex flex-col md:flex-row sm:flex-row lg:flex-row xl:flex-row justify-between items-start w-full">
        {/* Mobile View */}
        <div className="md:hidden sm:hidden lg:hidden xl:hidden block w-full flex flex-wrap">
          <h3 className=" text-[11px] font-inter font-[600] text-headding-color mb-1 ">{label}</h3>
          <div className="flex justify-end w-full mt-[-28px] mb-1">
            <ColorPickerControl />
          </div>
          {description && (
            <p className="text-[10px] md:text-[12px] sm:text-[12px] lg:text-[12px] xl:text-[12px] font-inter text-cardTitle mb-2 pr-2">
              {description}
            </p>
          )}
          
         
        </div>
        
        {/* Desktop/Tablet View */}
        <div className="hidden md:flex sm:flex lg:flex xl:flex w-full items-start justify-between">
          <div className="w-3/5">
            <h3 className="md:text-[14px] sm:text-[14px] lg:text-[14px] xl:text-[14px] text-[12px] font-inter font-[600] text-headding-color mb-1 ">{label}</h3>
            
            {description && (
              <p className="text-[10px] md:text-[12px] sm:text-[12px] lg:text-[12px] xl:text-[12px] font-inter text-cardTitle mb-2 pr-2">
                {description}
              </p>
            )}
          </div>
          
          <div className="w-2/5 flex justify-end">
            <ColorPickerControl />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
