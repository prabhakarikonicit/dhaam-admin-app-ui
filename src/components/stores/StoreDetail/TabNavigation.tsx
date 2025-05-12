import React from 'react';

interface TabNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="border-b-2 bg-white mx-4 rounded-tl-custom12px rounded-tr-custom12px ">
      <div className="flex justify-between items-center ">
        <div className="flex">
          <button
            className={`px-6 py-4 font-inter text-[14px] font-[500] text-headding-color ${
              activeTab === "defaultSetting"
                ? "border-b-2 border-bgButton text-verifyOtp"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("defaultSetting")}
          >
            Default Setting
          </button>
          <button
            className={`px-6 py-4 font-inter text-[14px] font-[500] text-headding-color ${
              activeTab === "catalogue"
                ? "border-b-2 border-purple-500 text-verifyOtp"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("catalogue")}
          >
            Catalogue
          </button>
          <button
            className={`px-6 py-4 font-inter text-[14px] font-[500] text-headding-color ${
              activeTab === "configurations"
                ? "border-b-2 border-purple-500 text-verifyOtp"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("configurations")}
          >
            Configurations
          </button>
        </div>

        <div className="flex items-center mr-4">
          <button className="mr-2 px-6 py-2 text-[12px] font-[600] font-inter rounded-custom border border-reloadBorder">
            Discard
          </button>
          <button className="px-8 py-2 text-[12px] font-[600] font-inter rounded-custom bg-bgButton text-white border border-btnBorder">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default TabNavigation;