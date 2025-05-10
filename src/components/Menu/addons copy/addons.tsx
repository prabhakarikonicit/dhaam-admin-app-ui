import React, { useState } from "react";
import AddonSidebar from "./sidebar"; // Import AddonSidebar instead of Sidebar

import AddonsTable from "./addonstable";
// Define addon interface - make sure this matches the interface in AddonSidebar
interface Addon {
  id: string;
  name: string;
  selectionType: "single" | "multi";
  options: Array<{
    name: string;
    price: string;
    isDefault?: boolean;
  }>;
  mandatoryOption: boolean;
  image?: File;
  products: string[];
}

const AddonsManagement: React.FC = () => {
  const [addons, setAddons] = useState<Addon[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showTable, setShowTable] = useState(false);
  // Handle opening the sidebar
  const handleOpenSidebar = () => {
    setIsSidebarOpen(true);
    setShowTable(false);
  };

  // Handle saving an addon
  const handleSaveAddon = (addon: Addon) => {
    if (!addon.id) {
      // Add new addon
      const newAddon = {
        ...addon,
        id: Date.now().toString(),
      };
      setAddons([...addons, newAddon]);
    } else {
      // Update existing addon
      setAddons(addons.map((a) => (a.id === addon.id ? addon : a)));
    }
    setIsSidebarOpen(false);
    setShowTable(true); // Show the table after saving
  };

  // Filter addons based on search term
  const filteredAddons = addons.filter((addon) =>
    addon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background-grey flex-grow overflow-auto h-[calc(100vh-50px)] ">
      {/* Header */}
      <div className="w-full bg-background-grey">
        <div className="max-w-full rounded-custom12px p-4 sm:p-6 sm:max-h-full md:max-h-full lg:max-h-full xl:max-h-full max-h-[80vh] overflow-y-auto sm:overflow-visible md:overflow-visible lg:overflow-visible xl:overflow-visible mb-0 mx-auto sm:px-6 lg:px-4 flex justify-between items-center">
          <h1 className="text-cardValue text-[18px] sm:text-[20px] font-inter font-[600]">
            Add-Ons
          </h1>
          <div className="relative w-[60%] sm:w-auto md:w-[22%]">
            <select className="appearance-none block w-full bg-white border border-reloadBorder rounded-custom8px py-2 sm:py-3 pl-3 pr-6 text-verifyOtp text-[12px] md:text-[14px] sm:text-[14px] lg:text-[14px] xl:text-[14px] font-inter font-[400] placeholder: focus:outline-none focus:ring-purple-500 focus:border-purple-500">
              <option className="border border-reloadBorder py-2 pl-3 pr-10 text-verifyOtp text-[14px] font-inter font-[400] ">
                Queenstown Public House
              </option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.29289 7.29289C5.68342 6.90237 6.31658 6.90237 6.70711 7.29289L10 10.5858L13.2929 7.29289C13.6834 6.90237 14.3166 6.90237 14.7071 7.29289C15.0976 7.68342 15.0976 8.31658 14.7071 8.70711L10.7071 12.7071C10.3166 13.0976 9.68342 13.0976 9.29289 12.7071L5.29289 8.70711C4.90237 8.31658 4.90237 7.68342 5.29289 7.29289Z"
                  fill="#949494"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-8xl mx-4 md:mx-auto sm:mx-auto lg:mx-auto xl:mx-auto px-4 sm:px-4 rounded-custom12px lg:px-4 py-2 bg-white h-full md:bg-transparent">
        {showTable ? (
          <AddonsTable />
        ) : (
          <>
            {/* Search and Actions */}
            <div className="flex flex-row justify-between items-center mb-6  bg-white sm:rounded-custom10px sm:bg-backgroundWhite pt-0 py-3  md:p-4 sm:p-4 lg:p-4 xl:p-4 border-b border-grey-border sm:border-0">
              <div className="relative w-full max-w-[70%] sm:max-w-lg ">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
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
                      d="M6.39961 3.2001C4.6323 3.2001 3.19961 4.63279 3.19961 6.4001C3.19961 8.16741 4.6323 9.6001 6.39961 9.6001C8.16692 9.6001 9.59961 8.16741 9.59961 6.4001C9.59961 4.63279 8.16692 3.2001 6.39961 3.2001ZM1.59961 6.4001C1.59961 3.74913 3.74864 1.6001 6.39961 1.6001C9.05058 1.6001 11.1996 3.74913 11.1996 6.4001C11.1996 7.43676 10.871 8.39667 10.3122 9.18133L14.1653 13.0344C14.4777 13.3468 14.4777 13.8534 14.1653 14.1658C13.8529 14.4782 13.3463 14.4782 13.0339 14.1658L9.18084 10.3127C8.39618 10.8715 7.43627 11.2001 6.39961 11.2001C3.74864 11.2001 1.59961 9.05106 1.59961 6.4001Z"
                      fill="#949494"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search Add-on"
                  className="block w-full md:w-[60%] pl-10 pr-3 py-2 border border-grey-border rounded-custom7px leading-5 text-[12px] text-cardTitle font-inter font-[500] bg-white shadow-sm focus:outline-none focus:ring-1 focus:ring-bgButton focus:border-purple-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex-shrink-0">
                <button
                  onClick={handleOpenSidebar}
                  className="whitespace-nowrap px-4 py-2 border border-btnBorder text-[12px] font-[600] font-inter rounded-custom text-whiteColor bg-bgButton hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Create New
                </button>
              </div>
            </div>

            {/* Empty State */}
            {addons.length === 0 && (
              <div className="mt-24 text-center ">
                <div className="mx-auto w-32 h-32">
                  <svg
                    className="w-full h-full text-orange-400"
                    viewBox="0 0 200 200"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M76.5 155H123.5L150 113.5L123.5 72H76.5L50 113.5L76.5 155Z"
                      fill="#F4A261"
                      stroke="#F4A261"
                      strokeWidth="4"
                    />
                    <path
                      d="M86 72V38.5M114 72V38.5M67 114H50M150 114H133M86 38.5H114M86 38.5L67 57M114 38.5L133 57"
                      stroke="#CCC"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <h3 className="mt-2 text-[14px] font-[700] font-inter text-headding-color leading-[21px]">
                  No add-ons created yet
                </h3>
                <p className="hidden md:block mt-1 text-[12px] font-[500] font-inter text-cardTitle">
                Create add-on groups to allow customers to customise their<br/> orders and enhance their experience.
                </p>
                <p className="block md:hidden mt-1 text-[12px] font-[500] font-inter text-cardTitle">
                Create add-on groups to allow customers to customise their orders and enhance their experience.
                </p>
                <div className="mt-6">
                  <button
                    onClick={handleOpenSidebar}
                    className="inline-flex items-center px-6 py-2 border border-reloadBorder text-[12px] font-inter font-[600] rounded-custom text-cardValue bg-backgroundWhite hover:bg-purple-700 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    Create
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {/* Addon Sidebar */}
        <AddonSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          onSave={handleSaveAddon}
        />
      </div>
    </div>
  );
};

export default AddonsManagement;
