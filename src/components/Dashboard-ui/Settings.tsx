import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import SettingsComponent from '../Settings/General/GeneralComponent';

interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  hasSubmenu?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  text,
  active = false,
  hasSubmenu = false,
  children,
  onClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (text === 'Settings') {
      setShowSettings(true);
      if (onClick) onClick();
    } else {
      setIsOpen(!isOpen);
      if (onClick) onClick();
    }
  };

  if (showSettings) {
    return <SettingsComponent />;
  }

  return (
    <div className="relative">
      <div
        onClick={handleClick}
        className={`flex items-center px-4 py-2 my-1 rounded-lg cursor-pointer ${
          active ? 'bg-gray-100' : 'hover:bg-gray-50'
        }`}
      >
        <div className="text-gray-600 mr-3">{icon}</div>
        <span className="text-gray-700 flex-1 font-inter text-[14px] leading-[21px] font-[500]">
          {text}
        </span>
        {hasSubmenu && (
          <ChevronDown
            className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
              isOpen ? 'transform rotate-180' : ''
            }`}
          />
        )}
      </div>

      {isOpen && children}
    </div>
  );
};

export default SidebarItem;