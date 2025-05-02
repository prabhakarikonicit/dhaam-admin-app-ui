import React, { useState } from "react";
import ProductsTable from "../Menu/product/producttable";
// Define interface for store items
interface StoreItem {
  name: string;
  quantity: number;
  price: string;
}

// Define interface for component props
interface StoreDetailPageProps {
  storeId: string;
  storeName: string;
  storeAddress: string;
  rating: number;
  status: string;
  phoneNumber: string;
  email: string;
  storeItems?: StoreItem[];
  onBackClick: () => void;
  onPrint: () => void;
  onReject: () => void;
  onAccept: () => void;
  onMoreActions: () => void;
}

// StoreDetailPage component with tabs as shown in the screenshots
const StoreDetailPage: React.FC<StoreDetailPageProps> = ({
  storeId,
  storeName,
  storeAddress,
  rating,
  status,
  phoneNumber,
  email,
  storeItems,
  onBackClick,
  onPrint,
  onReject,
  onAccept,
  onMoreActions,
}) => {
  // State to keep track of the active tab
  const [activeTab, setActiveTab] = useState("defaultSetting");

  return (
    <div className="bg-white rounded-lg">
      {/* Header with back button, store name and actions */}
      <div className="flex justify-between items-center p-4 border-b">
        <div className="flex items-center">
          <button
            onClick={onBackClick}
            className="mr-4 border border-reloadBorder bg-backgroundWhite p-1 rounded-custom"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <div className="flex items-center">
              <h1 className="text-[20px] font-inter font-[600] text-menuSubHeadingColor">
                {storeName}
              </h1>
              <span
                className={`ml-2 px-4 py-1 text-[12px] font-[600] font-inter rounded-custom80px ${
                  status === "Active"
                    ? "bg-green text-customWhiteColor"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {status}
              </span>
            </div>
            <p className="text-[12px] font-inter font-[500] text-cardValue">
              {storeId}
            </p>
          </div>
        </div>
        <div className="flex space-x-2 -mt-2">
          <button className="px-4 py-2  border border-reloadBorder text-cardValue font-[600] font-inter text-[12px] rounded-custom flex items-center">
            English{" "}
            <span className="ml-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3.70503 5.10503C3.97839 4.83166 4.42161 4.83166 4.69497 5.10503L7 7.41005L9.30503 5.10503C9.57839 4.83166 10.0216 4.83166 10.295 5.10503C10.5683 5.37839 10.5683 5.82161 10.295 6.09498L7.49497 8.89498C7.22161 9.16834 6.77839 9.16834 6.50503 8.89498L3.70503 6.09498C3.43166 5.82161 3.43166 5.37839 3.70503 5.10503Z"
                  fill="#212121"
                />
              </svg>
            </span>
          </button>
          <button className="px-4 py-2  border border-reloadBorder text-cardValue font-[600] font-inter text-[12px] rounded-custom flex items-center">
            Visit Store{" "}
            <span className="ml-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M7.7001 2.1C7.3135 2.1 7.0001 2.4134 7.0001 2.8C7.0001 3.1866 7.3135 3.5 7.7001 3.5H9.51015L5.10512 7.90502C4.83176 8.17839 4.83176 8.62161 5.10512 8.89497C5.37849 9.16834 5.82171 9.16834 6.09507 8.89497L10.5001 4.48995V6.3C10.5001 6.6866 10.8135 7 11.2001 7C11.5867 7 11.9001 6.6866 11.9001 6.3V2.8C11.9001 2.4134 11.5867 2.1 11.2001 2.1H7.7001Z"
                  fill="#212121"
                />
                <path
                  d="M3.5001 3.5C2.7269 3.5 2.1001 4.1268 2.1001 4.9V10.5C2.1001 11.2732 2.7269 11.9 3.5001 11.9H9.1001C9.8733 11.9 10.5001 11.2732 10.5001 10.5V8.4C10.5001 8.0134 10.1867 7.7 9.8001 7.7C9.4135 7.7 9.1001 8.0134 9.1001 8.4V10.5H3.5001V4.9L5.6001 4.9C5.9867 4.9 6.3001 4.5866 6.3001 4.2C6.3001 3.8134 5.9867 3.5 5.6001 3.5H3.5001Z"
                  fill="#212121"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="border-b">
        <div className="flex">
          <button
            className={`px-6 py-4 font-inter text-[14px] font-[500] text-headding-color ${
              activeTab === "defaultSetting"
                ? "border-b-2 border-purple-500 text-verifyOtp"
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
          {/* Action buttons (Discard, Save) */}

          <div className="p-4 flex justify-end">
            <button className="mr-2 px-4 py-2 text-[12px] font-[600] font-inter rounded-custom border border-reloadBorder">
              Discard
            </button>
            <button className="px-6 py-2 text-[12px] font-[600] font-inter rounded-custom bg-bgButton text-white border border-btnBorder">
              Save
            </button>
          </div>
        </div>
      </div>

      {/* Tab content */}
      {activeTab === "defaultSetting" && (
        <div className="px-4 pb-4">
          <div className="flex flex-wrap">
            <div className="w-full lg:w-1/2 pr-2">
              {/* Left column */}

              {/* Personal Information Section */}
              <div className="bg-white border border-gray-200 rounded-lg mb-4 mt-4">
                <div className="bg-gray-50 p-4 border-b border-gray-200">
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
                        className="w-full p-2 border border-reloadBorder rounded-custom text-[12px] font-[500] font-inter text-paragraphBlack"
                        // defaultValue="Aman Kumar"
                      />
                    </div>
                    <div>
                      <label className="block text-[12px] font-[500] font-inter text-paragraphBlack mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        className="w-full p-2 border border-reloadBorder rounded-custom text-[12px] font-[500] font-inter text-paragraphBlack placeholder:paragraphBlack"
                        placeholder="amanofficial502@gmail.com"
                        // defaultValue="amanofficial502@gmail.com"
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
                          className="w-full p-2 border border-reloadBorder rounded-custom text-[12px] font-[500] font-inter text-paragraphBlack placeholder:paragraphBlack"
                          // defaultValue="6391 Elgin St. Celina, Delaware 10299"
                          placeholder="6391 Elgin St. Celina, Delaware 10299"
                        />
                        <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="16" />
                            <line x1="8" y1="12" x2="16" y2="12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[12px] font-[500] font-inter text-paragraphBlack mb-2">
                        Phone
                      </label>
                      <div className="flex">
                        <select className="p-2 border border-reloadBorder rounded-custom text-[12px] font-[500] font-inter text-paragraphBlack placeholder:paragraphBlack rounded-l-md w-16">
                          <option>+1</option>
                        </select>
                        <input
                          type="text"
                          className="flex-1 p-2 border border-reloadBorder rounded-custom text-[12px] font-[500] font-inter text-paragraphBlack placeholder:paragraphBlack rounded-r-md"
                          placeholder="8102308108"
                          // defaultValue="8102308108"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Store Information Section */}
              <div className="bg-white border border-gray-200 rounded-lg mb-4">
                <div className="bg-gray-50 p-4 border-b border-gray-200">
                  <h2 className="text-cardValue font-inter font-[14px] font-[600] tracking-wide">
                    Store Information
                  </h2>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-[12px] font-[500] font-inter text-paragraphBlack mb-2">
                        Store Name
                      </label>
                      <input
                        type="text"
                        placeholder="Queenstown Public House"
                        className="w-full p-2 border border-reloadBorder rounded-custom text-[12px] font-[500] font-inter text-paragraphBlack placeholder:paragraphBlack"
                        // defaultValue={storeName}
                      />
                    </div>
                    <div>
                      <label className="block text-[12px] font-[500] font-inter text-paragraphBlack mb-2">
                        Store Id
                      </label>
                      <input
                        type="text"
                        placeholder="#20345"
                        className="w-full p-2 border border-reloadBorder rounded-custom text-[12px] font-[500] font-inter text-paragraphBlack placeholder:paragraphBlack"
                        // defaultValue={storeId}
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-[12px] font-[500] font-inter text-paragraphBlack mb-2">
                      Store Display Address
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="6391 Elgin St. Celina, Delaware 10299"
                        className="w-full p-2 border border-reloadBorder rounded-custom text-[12px] font-[500] font-inter text-paragraphBlack placeholder:paragraphBlack"
                        // defaultValue={storeAddress}
                      />
                      <span className="absolute right-2 top-1/2 transform -translate-y-1/2  text-[12px] font-[400] font-inter text-cardTitle placeholder:cardTitle">
                        37/100
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-[12px] font-[500] font-inter text-paragraphBlack mb-2">
                      Store Description
                    </label>
                    <textarea
                      className="w-full p-2 border border-reloadBorder rounded-custom text-[12px] font-[400] font-inter text-paragraphBlack placeholder:paragraphBlack h-24 resize-none"
                      placeholder="Text"
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-[12px] font-[500] font-inter text-paragraphBlack mb-2">
                      Store URL
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="queenstown-public-house"
                        className="w-full p-2 border border-reloadBorder rounded-custom text-[12px] font-[400] font-inter text-paragraphBlack placeholder:paragraphBlack rounded-md"
                        // defaultValue="queenstown-public-house"
                      />
                      <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[12px] font-[400] font-inter text-cardTitle placeholder:cardTitle">
                        23/100
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Serving Area */}
              <div className="bg-white border border-gray-200 rounded-lg mb-4">
                <div className="bg-gray-50 p-4 border-b border-gray-200">
                  <h2 className="text-cardValue font-inter font-[14px] font-[600] tracking-wide mb-2">
                    Serving Area{" "}
                    <p className="font-inter font-[12px] font-[500] text-cardTitle mb-4 ">
                      Define the geographic areas where your stores can accept
                      and deliver orders.
                    </p>
                  </h2>
                </div>
                <div className="p-4">
                  <div className="mb-4 border-b border-gray-100 pb-3">
                    <label className="flex items-center mb-2">
                      <input
                        type="radio"
                        name="serving"
                        className="form-radio h-4 w-4 text-purple-600 accent-bgButton"
                        defaultChecked
                      />
                      <span className="ml-2 font-inter font-[14px] font-[600] text-textHeading tracking-wide">
                        Serve Everywhere
                      </span>
                    </label>
                    <p className="text-[12px] font-[500] font-inter font-[500] text-cardTitle ml-6">
                      No location restrictions; accept orders from all areas.
                    </p>
                  </div>

                  <div className="mb-4 border-b border-gray-100 pb-3">
                    <label className="flex items-center mb-2">
                      <input
                        type="radio"
                        name="serving"
                        className="form-radio h-4 w-4 text-purple-600"
                      />
                      <span className="ml-2 font-inter font-[14px] font-[600] text-textHeading tracking-wide">
                        Radius-Based Serving
                      </span>
                    </label>
                    <p className="text-[12px] font-[500] font-inter font-[500] text-cardTitle ml-6">
                      Set a delivery radius around your restaurant's central
                      location.
                    </p>
                  </div>

                  <div>
                    <label className="flex items-center mb-2">
                      <input
                        type="radio"
                        name="serving"
                        className="form-radio h-4 w-4 text-purple-600"
                      />
                      <span className="ml-2 font-inter font-[14px] font-[600] text-textHeading tracking-wide">
                        Geofence Serving
                      </span>
                    </label>
                    <p className="text-[12px] font-[500] font-inter font-[500] text-cardTitle ml-6">
                      Create specific geographic zones to control where you
                      accept orders.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/2 pl-2">
              {/* Right column */}

              {/* Store Banner Web */}
              <div className="mb-4">
                <h2 className="text-base font-medium mb-2">
                  Store Banner Web{" "}
                  <span className="text-sm font-normal text-gray-500">
                    (1440×320 pixels)
                  </span>
                </h2>
                <div className="relative h-80 bg-amber-500 rounded-md overflow-hidden">
                  <div className="absolute top-0 right-0 p-2">
                    <button className="p-1 bg-white rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 5v14M19 12H5" />
                      </svg>
                    </button>
                  </div>
                  <div className="absolute inset-0 flex flex-col p-6">
                    <div className="mt-6">
                      <div className="bg-white text-amber-500 text-sm font-medium px-2 py-1 rounded inline-flex items-center">
                        <svg
                          className="mr-1"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                            fill="#F59E0B"
                          />
                          <path
                            d="M13.0607 7.75736L13.4142 8.11091L14.8284 9.52512L15.182 9.87868L16.2426 8.81802L15.889 8.46446L14.4748 7.05025L14.1213 6.6967L13.0607 7.75736Z"
                            fill="#F59E0B"
                          />
                          <path
                            d="M15.5962 12C15.5962 12.1973 15.5747 12.3946 15.5317 12.5877L15.4425 12.9919L16.6159 13.3542L16.7051 13.0132C16.7672 12.677 16.8 12.3384 16.8 12C16.8 11.6616 16.7672 11.323 16.7051 10.9868L16.6159 10.6458L15.4425 11.0081L15.5317 11.4123C15.5747 11.6054 15.5962 11.8027 15.5962 12Z"
                            fill="#F59E0B"
                          />
                          <path
                            d="M13.0607 16.2426L14.1213 17.3033L14.4748 16.9497L15.889 15.5355L16.2426 15.182L15.182 14.1213L14.8284 14.4749L13.4142 15.8891L13.0607 16.2426Z"
                            fill="#F59E0B"
                          />
                          <path
                            d="M12 15.5962C11.8027 15.5962 11.6054 15.5747 11.4123 15.5317L11.0081 15.4425L10.6458 16.6159L10.9868 16.7051C11.323 16.7672 11.6616 16.8 12 16.8C12.3384 16.8 12.677 16.7672 13.0132 16.7051L13.3542 16.6159L12.9919 15.4425L12.5877 15.5317C12.3946 15.5747 12.1973 15.5962 12 15.5962Z"
                            fill="#F59E0B"
                          />
                          <path
                            d="M7.75736 13.0607L6.6967 14.1213L7.05025 14.4749L8.46446 15.8891L8.81802 16.2426L9.87868 15.182L9.52512 14.8284L8.11091 13.4142L7.75736 13.0607Z"
                            fill="#F59E0B"
                          />
                          <path
                            d="M8.40385 12C8.40385 11.8027 8.42534 11.6054 8.4683 11.4123L8.55753 11.0081L7.38414 10.6458L7.29491 10.9868C7.23283 11.323 7.2 11.6616 7.2 12C7.2 12.3384 7.23283 12.677 7.29491 13.0132L7.38414 13.3542L8.55753 12.9919L8.4683 12.5877C8.42534 12.3946 8.40385 12.1973 8.40385 12Z"
                            fill="#F59E0B"
                          />
                          <path
                            d="M10.9393 7.75736L9.87868 6.6967L9.52512 7.05025L8.11091 8.46446L7.75736 8.81802L8.81802 9.87868L9.17157 9.52512L10.5858 8.11091L10.9393 7.75736Z"
                            fill="#F59E0B"
                          />
                          <path
                            d="M12 8.40385C12.1973 8.40385 12.3946 8.42534 12.5877 8.4683L12.9919 8.55752L13.3542 7.38414L13.0132 7.29491C12.677 7.23283 12.3384 7.2 12 7.2C11.6616 7.2 11.323 7.23283 10.9868 7.29491L10.6458 7.38414L11.0081 8.55752L11.4123 8.4683C11.6054 8.42534 11.8027 8.40385 12 8.40385Z"
                            fill="#F59E0B"
                          />
                        </svg>
                        Logo Here
                      </div>
                    </div>

                    <div className="mt-auto">
                      <div className="text-5xl font-bold text-white italic">
                        authentic
                        <br />
                        italian food
                      </div>
                      <div className="flex flex-col mt-2">
                        <div className="flex items-center text-white">
                          <svg
                            className="mr-1"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M22 16.92V19.92C22 20.4704 21.7893 20.9983 21.4142 21.3979C21.0391 21.7975 20.5304 22.0431 20 22.07C19.5 22.07 18.97 22.16 18.3 22.16C13.86 22.16 9.67 20.37 6.6 17.3C3.53 14.23 1.73 10.05 1.73 5.6C1.73 4.95 1.74 4.42 1.83 3.93C1.86 3.39959 2.10455 2.90121 2.50483 2.52488C2.90511 2.14854 3.43274 1.93552 3.98 1.93H6.98C7.2 1.93 7.91 1.63 8.13 2.07C8.63 3.09 9.08 4.07 9.51 5.01C9.78 5.55 9.54 6.21 9.11 6.64L8.1 7.66C9.19 10.19 11.35 12.35 13.87 13.44L14.89 12.44C15.31 12.01 15.97 11.77 16.5 12.04C17.42 12.47 18.38 12.91 19.4 13.42C19.92 13.66 19.97 14.47 19.97 14.7V16.92H22Z"
                              fill="white"
                            />
                          </svg>
                          +123-456-7890
                        </div>
                        <div className="flex items-center text-white">
                          <svg
                            className="mr-1"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12 12.75C13.6569 12.75 15 11.4069 15 9.75C15 8.09315 13.6569 6.75 12 6.75C10.3431 6.75 9 8.09315 9 9.75C9 11.4069 10.3431 12.75 12 12.75Z"
                              fill="white"
                            />
                            <path
                              d="M19.5 9.75C19.5 16.5 12 21.75 12 21.75C12 21.75 4.5 16.5 4.5 9.75C4.5 7.76088 5.29018 5.85322 6.6967 4.4467C8.10322 3.04018 10.0109 2.25 12 2.25C13.9891 2.25 15.8968 3.04018 17.3033 4.4467C18.7098 5.85322 19.5 7.76088 19.5 9.75Z"
                              fill="white"
                            />
                          </svg>
                          123 Anywhere St. Any City
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white px-2 py-1 text-xs">
                    store banner.png
                    <span className="ml-2">341 KB</span>
                  </div>
                  <button className="absolute bottom-2 right-2 bg-white text-xs px-4 py-1 rounded">
                    Change
                  </button>
                </div>
              </div>

              {/* Mobile Banner */}
              <div className="mb-4">
                <h2 className="text-base font-medium mb-2">
                  Store Banner Mobile{" "}
                  <span className="text-sm font-normal text-gray-500">
                    (320×160 pixels)
                  </span>
                </h2>
                <div className="border-2 border-dashed border-gray-300 rounded-md p-8 flex flex-col items-center justify-center">
                  <p className="text-gray-400 mb-2">
                    Choose a file or drag & drop your logo here
                  </p>
                  <button className="text-blue-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="bg-white border border-gray-200 rounded-lg mb-4">
                <div className="bg-gray-50 p-4 border-b border-gray-200">
                  <h2 className="text-base font-medium">Payment Methods</h2>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-600 mb-4">
                    Admin-enabled payment methods will be selected by default
                    for customers at checkout.
                  </p>

                  <div className="grid grid-cols-3 gap-4">
                    {/* Toggle switch using only Tailwind classes */}
                    <div className="flex items-center justify-between">
                      <span>Cash</span>
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          defaultChecked
                        />
                        <div className="relative w-10 h-5 bg-gray-300 rounded-full peer peer-checked:bg-purple-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-200">
                          <div className="absolute top-[2px] left-[2px] bg-white w-4 h-4 rounded-full transition-all duration-300 peer-checked:translate-x-5"></div>
                        </div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <span>PG1</span>
                      <label className="inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="relative w-10 h-5 bg-gray-300 rounded-full peer peer-checked:bg-purple-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-200">
                          <div className="absolute top-[2px] left-[2px] bg-white w-4 h-4 rounded-full transition-all duration-300 peer-checked:translate-x-5"></div>
                        </div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <span>PG2</span>
                      <label className="inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="relative w-10 h-5 bg-gray-300 rounded-full peer peer-checked:bg-purple-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-200">
                          <div className="absolute top-[2px] left-[2px] bg-white w-4 h-4 rounded-full transition-all duration-300 peer-checked:translate-x-5"></div>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full">
              {/* Featured Listing Toggle from the second image */}
              <div className="bg-white border border-grey-border rounded-custom8px mb-4">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-inter text-[12px] font-[600]  text-textHeading">
                      Featured Listing
                    </span>
                    <label className="inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="relative w-10 h-5 bg-gray-300 rounded-full peer peer-checked:bg-purple-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-200">
                        <div className="absolute top-[2px] left-[2px] bg-white w-4 h-4 rounded-full transition-all duration-300 peer-checked:translate-x-5"></div>
                      </div>
                    </label>
                  </div>
                  <p className="text-[12px] font-[500] font-inter text-cardTitle mb-4">
                    Enable sponsorship to feature a merchant at the top of
                    listings for increased visibility.
                  </p>
                  <div className="border border-grey-border mb-3"></div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 ">
                    <div>
                      <label className="block text-[12px] font-[600] font-inter text-paragraphBlack mb-1">
                        Start and End date
                      </label>
                      <div className="flex items-center">
                        <div className="relative flex-1">
                          <input
                            type="text"
                            className="w-full py-3 pl-3 pr-8 border border-reloadBorder rounded-md"
                            defaultValue="8th April 2025"
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <rect
                                x="3"
                                y="4"
                                width="18"
                                height="18"
                                rx="2"
                                ry="2"
                              />
                              <line x1="16" y1="2" x2="16" y2="6" />
                              <line x1="8" y1="2" x2="8" y2="6" />
                              <line x1="3" y1="10" x2="21" y2="10" />
                            </svg>
                          </div>
                        </div>
                        <span className="mx-2">—</span>
                        <div className="relative flex-1">
                          <input
                            type="text"
                            className="w-full py-3 pl-3 pr-8 border border-reloadBorder rounded-md"
                            defaultValue="8th April 2025"
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <rect
                                x="3"
                                y="4"
                                width="18"
                                height="18"
                                rx="2"
                                ry="2"
                              />
                              <line x1="16" y1="2" x2="16" y2="6" />
                              <line x1="8" y1="2" x2="8" y2="6" />
                              <line x1="3" y1="10" x2="21" y2="10" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[12px] font-[600] font-inter text-paragraphBlack mb-1">
                        Store Display Address
                      </label>
                      <div className="flex items-center">
                        <div className="relative flex-1">
                          <select className="w-full py-3 pl-3 pr-8 border border-reloadBorder rounded-md appearance-none">
                            <option>9:00am</option>
                          </select>
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="6 9 12 15 18 9" />
                            </svg>
                          </div>
                        </div>
                        <span className="mx-2">—</span>
                        <div className="relative flex-1">
                          <select className="w-full py-3 pl-3 pr-8 border border-reloadBorder rounded-md appearance-none">
                            <option>10:00am</option>
                          </select>
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="6 9 12 15 18 9" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Store Activity Log from the second image */}
              <div className="bg-white border border-reloadBorder rounded-lg">
                <div className="bg-gray-50 p-4 border-b border-reloadBorder">
                  <h2 className="font-inter text-[12px] font-[600]  text-textHeading">
                    Store Activity Log
                  </h2>
                  <p className="text-[12px] font-[500] font-inter text-cardTitle">
                    Track and view all actions and updates made by stores for
                    better monitoring and accountability.
                  </p>
                </div>

                <div className="p-4 flex justify-end items-center border-b border-gray-200">
                  <div className="relative w-40">
                    <select className="w-full p-2 pl-3 pr-8 border border-gray-300 rounded-md appearance-none">
                      <option>All</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>
                  </div>
                  <div className="relative">
                    <button className="flex items-center p-2 border border-gray-300 rounded-md">
                      <span>Date Range</span>
                      <svg
                        className="ml-2"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect
                          x="3"
                          y="4"
                          width="18"
                          height="18"
                          rx="2"
                          ry="2"
                        />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div>
                  <div className="relative pl-10 py-4 border-l-2 border-gray-200">
                    <div className="absolute left-[7px] top-4 w-4 h-4 rounded-full bg-gray-400"></div>
                    <p className="font-inter text-[14px] font-[600]  text-textHeading mb-2">
                      Today at 4:14 PM
                    </p>
                    <p className="text-[12px] font-[500] font-inter text-cardTitle">
                      serving restriction in merchant delivery config is updated
                      to no restriction by Admin (test TOPO 1686442)
                    </p>
                  </div>

                  <div className="relative pl-10 py-4 border-l-2 border-gray-200">
                    <div className="absolute left-[7px] top-4 w-4 h-4 rounded-full bg-gray-400"></div>
                    <p className="font-inter text-[14px] font-[600]  text-textHeading mb-2">
                      Today at 4:14 PM
                    </p>
                    <p className="text-[12px] font-[500] font-inter text-cardTitle">
                      serving restriction in merchant delivery config is updated
                      to no restriction by Admin (test TOPO 1686442)
                    </p>
                  </div>

                  <div className="relative pl-10 py-4 border-l-2 border-gray-200">
                    <div className="absolute left-[7px] top-4 w-4 h-4 rounded-full bg-gray-400"></div>
                    <p className="font-inter text-[14px] font-[600]  text-textHeading mb-2">
                      Today at 4:14 PM
                    </p>
                    <p className="text-[12px] font-[500] font-inter text-cardTitle">
                      serving restriction in merchant delivery config is updated
                      to no restriction by Admin (test TOPO 1686442)
                    </p>
                  </div>

                  <div className="relative pl-10 py-4 border-l-2 border-gray-200">
                    <div className="absolute left-[7px] top-4 w-4 h-4 rounded-full bg-gray-400"></div>
                    <p className="font-inter text-[14px] font-[600]  text-textHeading mb-2">
                      Today at 4:14 PM
                    </p>
                    <p className="text-[12px] font-[500] font-inter text-cardTitle">
                      serving restriction in merchant delivery config is updated
                      to no restriction by Admin (test TOPO 1686442)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "catalogue" && (
        <div className="p-4">
          <h2 className="text-xl font-medium mb-4">Catalogue</h2>
          <p>Catalogue content goes here...</p>
        </div>
      )}

      {activeTab === "configurations" && <ProductsTable />}
    </div>
  );
};

export default StoreDetailPage;
