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

  return (
    <div className="mb-6">
      <div className="flex items-start mb-1">
        <h3 className="text-base font-medium">{label}</h3>
      </div>
      {description && <p className="text-sm text-gray-500 mb-2">{description}</p>}
      
      <div className="flex justify-end ">
        <div 
          className="flex items-center border rounded-md overflow-hidden cursor-pointer p-3 mt-[-35px]"
          onClick={handleClick}
        >
          <input 
            type="color"
            value={color}
            ref={inputRef}
            onChange={handleColorChange}
            className="opacity-0 absolute rounded-custom44px"
          />
          <div 
            className="w-8 h-8 flex items-center justify-center rounded-custom44px" 
            style={{ backgroundColor: color }}
          ></div>
          <div className="px-3 py-2 bg-white">
            <span className="text-sm font-medium">{color.toUpperCase()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;