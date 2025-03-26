import React, { useState, useRef, useEffect } from "react";
import Catalog from "./catalog/catalog";
import Commission from "./commission/commission";
import Store from "./store/store";
import { Branding, LoginPage } from "./branding/branding";

// Payment Gateway Icon
const PaymentGatewayIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="21"
    viewBox="0 0 20 21"
    fill="none"
  >
    <path
      d="M4 4.5C2.89543 4.5 2 5.39543 2 6.5V7.5H18V6.5C18 5.39543 17.1046 4.5 16 4.5H4Z"
      fill="#636363"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18 9.5H2V14.5C2 15.6046 2.89543 16.5 4 16.5H16C17.1046 16.5 18 15.6046 18 14.5V9.5ZM4 13.5C4 12.9477 4.44772 12.5 5 12.5H6C6.55228 12.5 7 12.9477 7 13.5C7 14.0523 6.55228 14.5 6 14.5H5C4.44772 14.5 4 14.0523 4 13.5ZM9 12.5C8.44772 12.5 8 12.9477 8 13.5C8 14.0523 8.44772 14.5 9 14.5H10C10.5523 14.5 11 14.0523 11 13.5C11 12.9477 10.5523 12.5 10 12.5H9Z"
      fill="#636363"
    />
  </svg>
);

// POS Icon
const PosIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="21"
    viewBox="0 0 20 21"
    fill="none"
  >
    <path
      d="M2 6.5C2 5.39543 2.89543 4.5 4 4.5H16C17.1046 4.5 18 5.39543 18 6.5V14.5C18 15.6046 17.1046 16.5 16 16.5H4C2.89543 16.5 2 15.6046 2 14.5V6.5Z"
      stroke="#636363"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 12.5H14M6 14.5H10"
      stroke="#636363"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <rect x="4" y="6.5" width="12" height="3" fill="#636363" />
  </svg>
);

// SMS Icon
const SmsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="21"
    viewBox="0 0 20 21"
    fill="none"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2 7.5C2 5.84315 3.34315 4.5 5 4.5H15C16.6569 4.5 18 5.84315 18 7.5V13.5C18 15.1569 16.6569 16.5 15 16.5H5C3.34315 16.5 2 15.1569 2 13.5V7.5ZM5.5 8C5.22386 8 5 8.22386 5 8.5C5 8.77614 5.22386 9 5.5 9H14.5C14.7761 9 15 8.77614 15 8.5C15 8.22386 14.7761 8 14.5 8H5.5ZM5 11.5C5 11.2239 5.22386 11 5.5 11H14.5C14.7761 11 15 11.2239 15 11.5C15 11.7761 14.7761 12 14.5 12H5.5C5.22386 12 5 11.7761 5 11.5ZM5.5 14C5.22386 14 5 14.2239 5 14.5C5 14.7761 5.22386 15 5.5 15H10.5C10.7761 15 11 14.7761 11 14.5C11 14.2239 10.7761 14 10.5 14H5.5Z"
      fill="#636363"
    />
  </svg>
);

// Email Icon
const EmailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="21"
    viewBox="0 0 20 21"
    fill="none"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2 7.5C2 6.39543 2.89543 5.5 4 5.5H16C17.1046 5.5 18 6.39543 18 7.5V13.5C18 14.6046 17.1046 15.5 16 15.5H4C2.89543 15.5 2 14.6046 2 13.5V7.5ZM4 7.5L10 10.5L16 7.5V9.5L10 12.5L4 9.5V7.5Z"
      fill="#636363"
    />
  </svg>
);

// Delivery Management System Icon
const DeliveryIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="21"
    viewBox="0 0 20 21"
    fill="none"
  >
    <path
      d="M12 4.5H15.2361C15.7161 4.5 16.1452 4.81608 16.2812 5.27309L17.5 9.5M12 4.5H4C3.44772 4.5 3 4.94772 3 5.5V14.5C3 15.0523 3.44772 15.5 4 15.5H4.5M12 4.5V8.5C12 9.05228 12.4477 9.5 13 9.5H17.5M17.5 9.5V14.5C17.5 15.0523 17.0523 15.5 16.5 15.5H16"
      stroke="#636363"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M6.5 18.5C7.88071 18.5 9 17.3807 9 16C9 14.6193 7.88071 13.5 6.5 13.5C5.11929 13.5 4 14.6193 4 16C4 17.3807 5.11929 18.5 6.5 18.5Z"
      fill="#636363"
    />
    <path
      d="M14 18.5C15.3807 18.5 16.5 17.3807 16.5 16C16.5 14.6193 15.3807 13.5 14 13.5C12.6193 13.5 11.5 14.6193 11.5 16C11.5 17.3807 12.6193 18.5 14 18.5Z"
      fill="#636363"
    />
  </svg>
);

// Web hook Icon
const WebhookIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="21"
    viewBox="0 0 20 21"
    fill="none"
  >
    <path
      d="M12.5 5.5C12.5 7.15685 11.1569 8.5 9.5 8.5C7.84315 8.5 6.5 7.15685 6.5 5.5C6.5 3.84315 7.84315 2.5 9.5 2.5C11.1569 2.5 12.5 3.84315 12.5 5.5Z"
      fill="#636363"
    />
    <path
      d="M3.5 15.5C3.5 13.8431 4.84315 12.5 6.5 12.5C8.15685 12.5 9.5 13.8431 9.5 15.5C9.5 17.1569 8.15685 18.5 6.5 18.5C4.84315 18.5 3.5 17.1569 3.5 15.5Z"
      fill="#636363"
    />
    <path
      d="M17.5 15.5C17.5 17.1569 16.1569 18.5 14.5 18.5C12.8431 18.5 11.5 17.1569 11.5 15.5C11.5 13.8431 12.8431 12.5 14.5 12.5C16.1569 12.5 17.5 13.8431 17.5 15.5Z"
      fill="#636363"
    />
    <path
      d="M9.5 8.5V18.5M9.5 8.5L6.5 12.5M9.5 8.5L14.5 12.5"
      stroke="#636363"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Google Analytics Icon
const GoogleAnalyticsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="21"
    viewBox="0 0 20 21"
    fill="none"
  >
    <path
      d="M4 4.5C4 3.94772 4.44772 3.5 5 3.5C5.55228 3.5 6 3.94772 6 4.5V16.5C6 17.0523 5.55228 17.5 5 17.5C4.44772 17.5 4 17.0523 4 16.5V4.5Z"
      fill="#636363"
    />
    <path
      d="M9 8.5C9 7.94772 9.44772 7.5 10 7.5C10.5523 7.5 11 7.94772 11 8.5V16.5C11 17.0523 10.5523 17.5 10 17.5C9.44772 17.5 9 17.0523 9 16.5V8.5Z"
      fill="#636363"
    />
    <path
      d="M14 12.5C14 11.9477 14.4477 11.5 15 11.5C15.5523 11.5 16 11.9477 16 12.5V16.5C16 17.0523 15.5523 17.5 15 17.5C14.4477 17.5 14 17.0523 14 16.5V12.5Z"
      fill="#636363"
    />
  </svg>
);

// Chat & Ticketing Icon
const ChatTicketingIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="21"
    viewBox="0 0 20 21"
    fill="none"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2 8.5C2 6.29086 3.79086 4.5 6 4.5H14C16.2091 4.5 18 6.29086 18 8.5V12.5C18 14.7091 16.2091 16.5 14 16.5H3.87868C2.77411 16.5 2 15.7259 2 14.6213V8.5ZM6 8.5C6 7.94772 6.44772 7.5 7 7.5H13C13.5523 7.5 14 7.94772 14 8.5C14 9.05228 13.5523 9.5 13 9.5H7C6.44772 9.5 6 9.05228 6 8.5ZM6 11.5C6 10.9477 6.44772 10.5 7 10.5H10C10.5523 10.5 11 10.9477 11 11.5C11 12.0523 10.5523 12.5 10 12.5H7C6.44772 12.5 6 12.0523 6 11.5Z"
      fill="#636363"
    />
  </svg>
);

// WhatsApp Icon
const WhatsAppIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="21"
    viewBox="0 0 20 21"
    fill="none"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 18.5C14.4183 18.5 18 14.9183 18 10.5C18 6.08172 14.4183 2.5 10 2.5C5.58172 2.5 2 6.08172 2 10.5C2 12.0615 2.41928 13.526 3.14877 14.7885L2.03291 17.0861C1.88338 17.3934 2.10656 17.7402 2.43877 17.7305L4.99409 17.6268C6.29527 18.2015 7.74027 18.5 9.25928 18.5H10Z"
      stroke="#636363"
      strokeWidth="1.5"
    />
    <path
      d="M14 12.9473C13.743 13.2293 13.5136 13.3891 13.2976 13.4559C13.0815 13.5227 12.8519 13.4899 12.6088 13.3574C11.8339 12.9608 10.9401 12.2784 10.1116 11.45C9.28308 10.6216 8.60074 9.72781 8.20415 8.95285C8.07166 8.70975 8.03881 8.48011 8.10561 8.26404C8.17242 8.04797 8.33223 7.81858 8.61421 7.56161C8.81055 7.37625 8.9239 7.27516 8.97825 7.25075C9.03261 7.22633 9.07597 7.23915 9.11736 7.27905C9.42973 7.57861 9.7421 7.87818 10.0545 8.17774C10.1009 8.22265 10.1192 8.27306 10.1094 8.32895C10.0996 8.38484 10.0545 8.44224 9.97395 8.50115C9.8934 8.56006 9.81284 8.61897 9.73229 8.67787C9.65173 8.73678 9.62445 8.8042 9.65045 8.88013C9.89428 9.51789 10.3541 10.0822 10.957 10.4973C11.5599 10.9125 12.2059 11.0644 12.7328 10.9798C12.8032 10.9661 12.8644 10.9324 12.9165 10.8789C12.9686 10.8254 13.0207 10.7719 13.0728 10.7183C13.1249 10.6648 13.1814 10.6317 13.2423 10.619C13.3033 10.6063 13.3578 10.6205 13.4059 10.6618C13.7184 10.9614 14.0308 11.2609 14.3431 11.5605C14.3845 11.5983 14.3977 11.6396 14.3826 11.6846C14.3676 11.7295 14.3123 11.8023 14.1992 11.9051C14.1249 11.9786 14.0628 12.0521 14.0129 12.1256C13.963 12.1991 13.9215 12.2726 13.8883 12.3461C13.8551 12.4195 13.8321 12.493 13.8194 12.5665C13.8067 12.64 13.8095 12.7135 13.8277 12.7869C13.8459 12.8604 13.8789 12.9039 13.9247 12.9175C13.9502 12.926 13.9741 12.9342 13.9962 12.9421C13.9975 12.9438 13.9988 12.9456 14 12.9473Z"
      fill="#636363"
    />
  </svg>
);

// Google Calendar Icon
const GoogleCalendarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="21"
    viewBox="0 0 20 21"
    fill="none"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6 4.5C6 3.94772 5.55228 3.5 5 3.5C4.44772 3.5 4 3.94772 4 4.5V5.5H3C2.44772 5.5 2 5.94772 2 6.5V8.5H18V6.5C18 5.94772 17.5523 5.5 17 5.5H16V4.5C16 3.94772 15.5523 3.5 15 3.5C14.4477 3.5 14 3.94772 14 4.5V5.5H6V4.5ZM18 9.5H2V15.5C2 16.0523 2.44772 16.5 3 16.5H17C17.5523 16.5 18 16.0523 18 15.5V9.5ZM7 12.5C7 11.9477 7.44772 11.5 8 11.5H12C12.5523 11.5 13 11.9477 13 12.5C13 13.0523 12.5523 13.5 12 13.5H8C7.44772 13.5 7 13.0523 7 12.5Z"
      fill="#636363"
    />
  </svg>
);

// Zapier Icon
const ZapierIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="21"
    viewBox="0 0 20 21"
    fill="none"
  >
    <path
      d="M3.33 5.5H17.5"
      stroke="#636363"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3.33 10.5H17.5"
      stroke="#636363"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3.33 15.5H17.5"
      stroke="#636363"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="6.5" cy="5.5" r="1.5" fill="#636363" />
    <circle cx="10.5" cy="10.5" r="1.5" fill="#636363" />
    <circle cx="14.5" cy="15.5" r="1.5" fill="#636363" />
  </svg>
);

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  id: string;
}

const ConfigurationsComponent: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState("Catalog");
  const [isMobile, setIsMobile] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const menuItems: MenuItem[] = [
    { icon: <PaymentGatewayIcon />, label: "Catalog", id: "catalog" },
    { icon: <PosIcon />, label: "Commission", id: "commission" },
    { icon: <SmsIcon />, label: "Store", id: "store" },
    { icon: <EmailIcon />, label: "Branding", id: "branding" },
  ];

  if (isMobile) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        {/* Mobile Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="flex justify-between items-center p-4">
            <h2 className="text-[14px] font-inter font-[600] text-headding-color">
              Configurations
            </h2>
          </div>

          {/* Scrollable Tabs */}
          <div className="relative">
            <div
              ref={scrollContainerRef}
              className="flex overflow-x-auto hide-scrollbar py-2 px-4 bg-backgroundWhite "
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedItem(item.label)}
                  className={`flex items-center whitespace-nowrap px-4 py-4 mx-1 transition-colors ${
                    selectedItem === item.label
                      ? "border-b-2 border-purple-800 text-paragraphBlack"
                      : "text-gray-600"
                  }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  <span className="text-[12px] font-inter font-[500]">
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-4 overflow-y-auto">
          {selectedItem === "Catalog" && <Catalog />}
          {selectedItem === "Commission" && (
            <Commission onSave={() => {}} onCancel={() => {}} />
          )}
          {selectedItem === "Store" && <Store />}
          {selectedItem === "Branding" && <Branding /> && <LoginPage />}
          {selectedItem === "Login" && <LoginPage />}

          {/*  {selectedItem === "Email" && <Email />}
          {selectedItem === "Delivery Management System" && <Delivery/>} */}
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-64px)] flex gap-1 bg-background-grey overflow-y-auto">
      {/* Left Panel - Fixed */}
      <div className="w-[290px] p-6 py-6">
        <h2 className="text-[20px] font-[600] font-inter text-cardValue mb-6">
          Configurations
        </h2>
        <div className="space-y-2 bg-backgroundWhite h-screen p-4 pb-20 rounded-custom">
          {menuItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item.label)}
              className={`flex items-center p-3 ps-4 rounded-custom font-inter font-[14px] leading-[21px] font-[500px] cursor-pointer ${
                selectedItem === item.label
                  ? "bg-subMenus border-gray-200 rounded-custom"
                  : "hover:bg-gray-50 border-gray-200"
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              <span className="flex-1 text-[12px] font-inter font-[14px] leading-[21px] font-[400px] text-verifyOtp">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-[62%] mt-10">
        {selectedItem === "Catalog" && <Catalog />}
        {selectedItem === "Commission" && (
          <Commission onSave={() => {}} onCancel={() => {}} />
        )}
        {selectedItem === "Store" && <Store />}
        {selectedItem === "Branding" && <Branding />}
        {selectedItem === "Login" && <LoginPage />}
        {/*  {selectedItem === "Delivery Management System" && <Delivery />} */}
      </div>
    </div>
  );
};

export default ConfigurationsComponent;
