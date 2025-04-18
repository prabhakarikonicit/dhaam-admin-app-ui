import { Bell, Search, Info } from "lucide-react";
import { useState, useEffect } from "react";
import GeneralComponent from "../Settings/General/GeneralComponent";
import IntegrationComponent from "../Settings/Integration/IntegrationComponent";
import ConfigurationsComponent from "../Settings/configurations/configurationscomponent";
import MarketPlaceDesignComponent from "../Settings/marketplacedesign/marketplacedesigncomponent";
import Category from "../Menu/category/category";
import ProductManagement from "../Menu/product/product";
import AddonsManagement from "../Menu/addons/addons";
import Combos from "../Menu/combos/combos";
import Stores from "../stores/stores";
import Orders from "../orders/orders";
import { ChevronDown } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../ui/card-components";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import { ReactComponent as Calendar } from "../../lib/Images/calendar.svg";
import { ReactComponent as Cancled } from "../../lib/Images/cancled.svg";
import { ReactComponent as ChevronRight } from "../../lib/Images/chevron-right.svg";
import { ReactComponent as Completed } from "../../lib/Images/completed.svg";
import { ReactComponent as Customers } from "../../lib/Images/customers.svg";
import { ReactComponent as Dashboard } from "../../lib/Images/dashboard.svg";
import { ReactComponent as Dispatched } from "../../lib/Images/dispatched.svg";
import { ReactComponent as GetStarted } from "../../lib/Images/getStarted.svg";
import { ReactComponent as InfoIcon } from "../../lib/Images/info-icon.svg";
import { ReactComponent as Logo } from "../../lib/Images/logo.svg";
import { ReactComponent as GlobeAlt } from "../../lib/Images/globe-alt.svg";
import { ReactComponent as ExternalLink } from "../../lib/Images/external-link.svg";
import { ReactComponent as ToggleOn } from "../../lib/Images/Toggle on.svg";
import logo2 from "../../lib/Images/logo.png";
import { ReactComponent as Menu } from "../../lib/Images/menu.svg";
import { ReactComponent as Order } from "../../lib/Images/orders.svg";
import { ReactComponent as Pending } from "../../lib/Images/pending.svg";
import { ReactComponent as Reload } from "../../lib/Images/reload.svg";
import { ReactComponent as Settings } from "../../lib/Images/settings.svg";
import { ReactComponent as Store } from "../../lib/Images/stores.svg";

const revenueData = [
  { time: "10:00 AM", value: 10 },
  { time: "2:00 PM", value: 50 },
  { time: "6:00 PM", value: 60 },
  { time: "10:00 PM", value: 100 },
];

interface OrderStatProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

interface StoresStatProps {
  title: string;
  value: string;
}

interface TopHeaderProps {
  userName: string;
  userImage?: string;
  onMenuClick: () => void;
  width?: number;
}

interface ProgressItem {
  title: string;
  percentage: number;
  color: string;
}

const NewCustomersCard = () => {
  const progressItems: ProgressItem[] = [
    { title: "Title here", percentage: 5, color: "bg-purple-500" },
    { title: "Title here", percentage: 35, color: "bg-blue-500" },
    { title: "Title here", percentage: 8, color: "bg-orange-500" },
    { title: "Title here", percentage: 16, color: "bg-green-500" },
  ];

  const totalWidth = progressItems.reduce(
    (acc, item) => acc + item.percentage,
    0
  );

  return (
    <Card className="bg-white">
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center text-[12px] font-medium">
          <div className="flex justify-between items-center font-inter text-headding-color text-base font-[500] leading-[24px] sm:text-base gap-2">
            New customers
            <Info className="w-4 h-4 text-gray-400" />
          </div>
          <button className="p-1.5 rounded-md border border-gray-200">
            <ChevronRight className="w-4 h-4" />
          </button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <h3 className="text-3xl font-inter text-cardValue font-[600] leading-[33px] mb-4">
          6543
        </h3>
        <div className="flex w-full h-[33px] gap-x-1 rounded-custom4x overflow-hidden">
          {progressItems.map((item, index) => (
            <div
              key={index}
              className={`h-full md:gap-2 sm:gap-2 rounded-custom4x ${item.color}`}
              style={{ width: `${(item.percentage / totalWidth) * 100}%` }}
            />
          ))}
        </div>
        <div className="mt-4 space-y-2">
          {progressItems.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${item.color}`} />
                <span className="text-[14px] text-headding-color font-inter leading-[21px] font-[500]">
                  {item.title}
                </span>
              </div>
              <span className="text-[14px] text-cardValue font-inter leading-[21px] font-[500]">
                {item.percentage}%
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
interface StoresStatProps {
  title: string;
  value: string;
}
const StoresStat: React.FC<StoresStatProps> = ({ title, value }) => (
  <div className="bg-gray-50 p-4 rounded-lg">
    <div className="flex items-center justify-between mb-1">
      <span className="text-[12px]  text-cardTitle font-inter leading-[15.6px] font-[600]">
        {title}
      </span>
      <ChevronRight className="w-4 h-4 text-gray-400" />
    </div>
    <p className="text-xl text-cardValue font-inter leading-[15.6px] font-[600]">
      {value}
    </p>
  </div>
);

const TopHeader: React.FC<TopHeaderProps> = ({
  userName,
  userImage,
  onMenuClick,
  width = 0,
}) => {
  // const isMobile = width < 640 && width <= 466;
  const isMobile = width < 640;

  return (
    <div className=" flex flex-col">
      {/* Top Bar */}
      <div className=" bg-[#7C43DF] flex items-center px-3 py-3 gap-3">
        {isMobile && (
          <button
            onClick={onMenuClick}
            className="p-2 text-white hover:bg-white/10 rounded-lg font-inter font-[600] bg-backgroundWhite border border-reloadBorder  "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3 5C3 4.44772 3.44772 4 4 4H16C16.5523 4 17 4.44772 17 5C17 5.55228 16.5523 6 16 6H4C3.44772 6 3 5.55228 3 5Z"
                fill="#212121"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3 10C3 9.44772 3.44772 9 4 9H16C16.5523 9 17 9.44772 17 10C17 10.5523 16.5523 11 16 11H4C3.44772 11 3 10.5523 3 10Z"
                fill="#212121"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3 15C3 14.4477 3.44772 14 4 14H16C16.5523 14 17 14.4477 17 15C17 15.5523 16.5523 16 16 16H4C3.44772 16 3 15.5523 3 15Z"
                fill="#212121"
              />
            </svg>
          </button>
        )}

        {!isMobile && <Logo className="h-8 text-white " />}

        {/* Search */}

        <div className="flex-1 relative">
          <div className="flex items-center gap-4 justify-center ">
            <div
              className={`flex items-center bg-reloadBackground p-0 justify-start sm:w-1/2 md:w-1/2 py-[2px] ${
                isMobile ? "bg-white" : "bg-white"
              } rounded-lg`}
            >
              <div
                className={`absolute inset-y-0 left-50 pl-3 flex items-center pointer-events-none font-inter font-[600] bg-backgroundWhite rounded-custom `}
              >
                <Search
                  className={`h-4 w-4 ${
                    isMobile ? "text-gray-500" : "text-gray-500"
                  }`}
                />
              </div>
              <input
                type="text"
                placeholder="Search"
                className={`w-3/4 h-9 pl-10 pr-3 rounded-lg ${
                  isMobile
                    ? "bg-white text-white placeholder-gray/60"
                    : "bg-white text-gray-900 placeholder-gray-500"
                } text-[12px] focus:outline-none`}
              />
            </div>

            {!isMobile && (
              <button className="hidden md:flex sm:flex items-center h-[30px] bg-backgroundWhite rounded-lg px-4 ">
                <GlobeAlt />
                <span className="text-[12px] sm:px-1 md:px-1 font-inter font-[600] leading-[15.6px] text-gray-900">
                  www.design-mart.com
                </span>
                <ExternalLink />
              </button>
            )}
          </div>
        </div>

        {/* Desktop-only website link */}
        {/* Right section */}
        <div className="flex items-center gap-3">
          {!isMobile && (
            <button className="hidden md:flex items-center gap-2 px-3 py-1.5 font-[600] rounded-lg text-whiteColor text-[12px] font-inter">
              <svg className="w-3.5 h-3.5" viewBox="0 0 14 14" fill="none">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.5 1.4C3.88661 1.4 4.2 1.71342 4.2 2.1V2.8H4.9C5.28661 2.8 5.6 3.11342 5.6 3.5C5.6 3.88658 5.28661 4.2 4.9 4.2H4.2V4.9C4.2 5.28658 3.88661 5.6 3.5 5.6C3.11339 5.6 2.8 5.28658 2.8 4.9V4.2H2.1C1.71339 4.2 1.4 3.88658 1.4 3.5C1.4 3.11342 1.71339 2.8 2.1 2.8H2.8V2.1C2.8 1.71342 3.11339 1.4 3.5 1.4Z"
                  fill="white"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.4 1.4C8.71761 1.4 8.99541 1.61386 9.07668 1.9209L9.90213 5.03928L12.2498 6.39369C12.4665 6.51871 12.6 6.74986 12.6 7C12.6 7.25014 12.4665 7.48129 12.2498 7.60631L9.90213 8.96072L9.07668 12.0791C8.99541 12.3861 8.71761 12.6 8.4 12.6C8.08239 12.6 7.80459 12.3861 7.72332 12.0791L6.89787 8.96072L4.55025 7.60631C4.33356 7.48129 4.20005 7.25014 4.20005 7C4.20005 6.74986 4.33356 6.51871 4.55025 6.39369L6.89787 5.03928L7.72332 1.9209C7.80459 1.61386 8.08239 1.4 8.4 1.4Z"
                  fill="white"
                />
              </svg>
              DHAAM AI
            </button>
          )}

          {/* Notification Bell */}
          <button
            className={`relative p-2 ${
              isMobile
                ? "bg-backgroundWhite  hover:bg-white/10"
                : "bg-backgroundWhite"
            } rounded-custom border border-reloadBorder`}
          >
            <Bell
              className={`h-5 w-5 ${
                isMobile ? "bg-backgroundWhite" : "bg-white "
              }`}
            />
            {/* <div className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full" /> */}
          </button>

          {/* User Profile */}
          {isMobile ? (
            <button className="w-8 h-8 rounded-full overflow-hidden">
              <img
                src={userImage || "/api/placeholder/32/32"}
                alt={userName}
                className="w-full h-full object-cover"
              />
            </button>
          ) : (
            <button className="flex items-center gap-2 pl-2 pr-1 py-1 bg-white rounded-lg">
              <span className="text-[12px] font-inter text-[12px] font-[600] leading-[15.6px]">
                {userName}
              </span>
              <img
                src={userImage || "/api/placeholder/32/32"}
                alt={userName}
                className="h-8 w-8 rounded-full"
              />
            </button>
          )}
        </div>
      </div>

      {/* Mobile Analytics Header */}
      {isMobile && (
        <div className="flex items-center justify-between p-3 bg-hidden">
          <h1 className="text-xl sm:text-xl px-6 font-inter font-[600] text-gray-800">
            Analytics
          </h1>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-8  px-8 sm:px-2 py-2  rounded-md text-gray-600 text-[12px] font-inter font-[600] bg-backgroundWhite border border-reloadBorder">
              Today
              <Calendar />
            </button>
            <button className="p-2 hover:bg-white/10 mx-3 font-inter font-[600] bg-backgroundWhite border border-reloadBorder rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M10 6C8.89543 6 8 5.10457 8 4C8 2.89543 8.89543 2 10 2C11.1046 2 12 2.89543 12 4C12 5.10457 11.1046 6 10 6Z"
                  fill="#212121"
                />
                <path
                  d="M10 12C8.89543 12 8 11.1046 8 10C8 8.89543 8.89543 8 10 8C11.1046 8 12 8.89543 12 10C12 11.1046 11.1046 12 10 12Z"
                  fill="#212121"
                />
                <path
                  d="M10 18C8.89543 18 8 17.1046 8 16C8 14.8954 8.89543 14 10 14C11.1046 14 12 14.8954 12 16C12 17.1046 11.1046 18 10 18Z"
                  fill="#212121"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  hasSubmenu?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  subItems?: Array<{ text: string }>;
  onSubItemClick?: (item: string) => void;
  selectedSubItem?: string | null;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  text,
  active = false,
  hasSubmenu = false,
  children,
  onClick,
  subItems,
  onSubItemClick,
  selectedSubItem,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    if (hasSubmenu) {
      setIsExpanded(!isExpanded);
    }
    if (onClick) {
      onClick();
    }
  };

  const handleSubItemClick = (item: string) => {
    if (onSubItemClick) {
      onSubItemClick(item);
    }
  };
  return (
    <div>
      <div
        onClick={handleClick}
        className={`flex items-center px-4 py-2 my-1 rounded-lg cursor-pointer ${
          active
            ? "bg-subMenus"
            : isExpanded
            ? "bg-gray-100"
            : "hover:bg-gray-50"
        }`}
      >
        <div className="text-gray-600 mr-3">{icon}</div>
        <span className="text-gray-700 flex-1 font-inter text-[14px] leading-[21px] font-[500]">
          {text}
        </span>
        {hasSubmenu && (
          <ChevronDown
            className={`h-4 w-4 text-gray-400 transform transition-transform ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        )}
      </div>
      {isExpanded && subItems && (
        <div className="ml-4">
          {subItems.map((item, index) => (
            <div
              key={index}
              className={`flex items-center px-4 py-2 my-1 rounded-lg cursor-pointer ${
                selectedSubItem === item.text
                  ? "bg-subMenus"
                  : "hover:bg-gray-50"
              }`}
              onClick={() => handleSubItemClick(item.text)}
            >
              <span className="text-gray-700 flex-1 font-inter text-[14px] leading-[21px] font-[500]">
                {item.text}
              </span>
            </div>
          ))}
        </div>
      )}
      {children}
    </div>
  );
};
interface SidebarNavProps {
  onSettingsSubItemClick: (item: string) => void;
  onMenuSubItemClick: (item: string) => void;
  onItemClick: (view: string) => void;
  currentView: string;
}

const SidebarNav: React.FC<SidebarNavProps> = ({
  onSettingsSubItemClick,
  onMenuSubItemClick,
  onItemClick,
  currentView,
}) => {
  const [selectedSubItem, setSelectedSubItem] = useState<string | null>(null);
  const settingsSubItems = [
    { text: "General" },
    { text: "Integration" },
    { text: "Configurations" },
    { text: "Marketplace Design" },
  ];
  const menuSubItems = [
    { text: "Category" },
    { text: "Product" },
    { text: "Add-ons" },
    { text: "Combos" },
  
  ];
  const handleSubItemClick = (item: string, parentText: string) => {
    setSelectedSubItem(item);

    // Call the appropriate handler based on the parent menu item
    if (parentText === "Settings") {
      onSettingsSubItemClick(item);
    } else if (parentText === "Menu") {
      onMenuSubItemClick(item);
    }
  };

  return (
    <nav className="space-y-1">
      <SidebarItem
        icon={<GetStarted />}
        text="Get Started"
        onClick={() => onItemClick("get-started")}
        active={currentView === "get-started"}
      />
      <SidebarItem
        icon={<Dashboard />}
        text="Dashboard"
        onClick={() => onItemClick("dashboard")}
        active={currentView === "dashboard"}
      />
      <SidebarItem
        icon={<Order />}
        text="Orders"
        onClick={() => onItemClick("orders")}
        active={currentView === "orders"}
      />
      <SidebarItem
        icon={<Menu />}
        text="Menu"
        hasSubmenu={true}
        subItems={menuSubItems}
        selectedSubItem={selectedSubItem}
        onSubItemClick={(item) => handleSubItemClick(item, "Menu")}
        active={currentView === "menu"}
      />

      <SidebarItem icon={<Customers />} text="Customers" />
      <SidebarItem
        icon={<Store />}
        text="Stores"
        onClick={() => onItemClick("stores")}
        active={currentView === "stores"}
      />
      <SidebarItem
        icon={<Settings />}
        text="Settings"
        hasSubmenu={true}
        subItems={settingsSubItems}
        selectedSubItem={selectedSubItem}
        onSubItemClick={(item) => handleSubItemClick(item, "Settings")}
        active={currentView === "settings"}
      />
    </nav>
  );
};
// const SidebarNav: React.FC<SidebarNavProps> = ({
//   onSettingsSubItemClick,
//   onItemClick,
//   currentView,
// }) => {
//   const [selectedSubItem, setSelectedSubItem] = useState<string | null>(null);
//   const settingsSubItems = [
//     { text: "General" },
//     { text: "Integration" },
//     { text: "Configurations" },
//     { text: "Marketplace Design" },

//   ];
//   const handleSubItemClick = (item: string) => {
//     setSelectedSubItem(item);
//     onSettingsSubItemClick(item);
//   };
//   return (
//     <nav className="space-y-1">
//       <SidebarItem
//         icon={<GetStarted />}
//         text="Get Started"
//         onClick={() => onItemClick("get-started")}
//         active={currentView === "get-started"}
//       />
//       <SidebarItem
//         icon={<Dashboard />}
//         text="Dashboard"
//         onClick={() => onItemClick("dashboard")}
//         active={currentView === "dashboard"}
//       />
//       <SidebarItem icon={<Orders />} text="Orders" hasSubmenu />
//       <SidebarItem icon={<Menu />} text="Menu" hasSubmenu />
//       <SidebarItem icon={<Customers />} text="Customers" />
//       <SidebarItem icon={<Store />} text="Stores"  />
//       <SidebarItem
//         icon={<Settings />}
//         text="Settings"
//         hasSubmenu={true}
//         subItems={settingsSubItems}
//         selectedSubItem={selectedSubItem}
//         onSubItemClick={handleSubItemClick}
//         active={currentView === "settings"}
//       />
//     </nav>
//   );
// };
const OrderStat: React.FC<OrderStatProps> = ({ title, value, icon }) => (
  <div className="bg-white rounded-lg flex flex-col w-full p-4 shadow-sm">
    {/* Title */}
    <div className="text-cardTitle text-[12px] sm:text-base md:text-lg font-inter font-semibold truncate">
      {title}
    </div>

    {/* Value */}
    <div className="text-lg sm:text-2xl md:text-3xl text-cardValue font-inter font-bold break-words">
      {value}
    </div>

    {/* Icon */}
    <div className="text-2xl text-purple-600 self-end">{icon}</div>
  </div>
);

const DashboardLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [currentView, setCurrentView] = useState("dashboard");
  const [selectedSettingsItem, setSelectedSettingsItem] = useState<
    string | null
  >(null);
  const [selectedMenuItem, setSelectedMenuItem] = useState<string | null>(null);
  const handleSettingsSubItemClick = (item: string) => {
    setSelectedSettingsItem(item);
    setCurrentView("settings");
  };
  const handleMenuSubItemClick = (item: string) => {
    setSelectedMenuItem(item);
    setCurrentView("menu");
  };
  const handleItemClick = (view: string) => {
    setCurrentView(view);
    if (view === "dashboard") {
      setSelectedSettingsItem(null);
    }
    if (width < 640) {
      toggleSidebar();
    }
  };
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
  const showSidebar = width >= 640;
  const isTablet = width >= 640 && width <= 835;
  const isLaptop = width > 835;
  const showCloseIcon = width < 375;
  const renderContent = () => {
    if (currentView === "stores") {
      // Directly render the Stores component when stores view is selected
      return <Stores />;
    }
    if (currentView === "orders") {
      // Directly render the Stores component when stores view is selected
      return <Orders />;
    }
    if (currentView === "settings") {
      // Only show settings content when General is selected
      if (selectedSettingsItem === "General") {
        return <GeneralComponent />;
      } else if (selectedSettingsItem === "Integration") {
        console.log("selectedSettingsItem", selectedSettingsItem);
        return <IntegrationComponent />;
      } else if (selectedSettingsItem === "Configurations") {
        return <ConfigurationsComponent />;
      } else if (selectedSettingsItem === "Marketplace Design") {
        return <MarketPlaceDesignComponent />;
      }
      return null;
    }

    if (currentView === "menu") {
      // Handle menu view with the different submenu components
      if (selectedMenuItem === "Category") {
        return <Category />;
      } else if (selectedMenuItem === "Product") {
        return <ProductManagement />;
      }
     else if (selectedMenuItem === "Add-ons") {
      return <AddonsManagement />;
    }
    else if (selectedMenuItem === "Combos") {
      return <Combos />;
    }
    }

    if (currentView === "dashboard") {
      return (
        <div className="flex-1 overflow-hidden">
          {isTablet && (
            <div className="px-5 py-3">
              <div className="flex items-center justify-between">
                {/* <div className="flex items-center gap-4"> */}
                <h1 className="text-xl px-6 font-semibold font-inter font-[600]">
                  Analytics
                </h1>
                <button className="p-2  hover:bg-gray-100 rounded-custom  bg-reloadBackground">
                  <Reload />
                </button>
                <div className="flex items-center gap-2">
                  <span className="text-textHeading text-[14px] leading-[21px] font-inter font-[500] sm:text-[14px] item-center">
                    Auto Refresh
                  </span>
                  <div className="w-12 h-6 bg-purple-600 rounded-full relative">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="41"
                      height="24"
                      viewBox="0 0 41 24"
                      fill="none"
                    >
                      <rect
                        x="0.5"
                        y="0.5"
                        width="39"
                        height="21"
                        rx="10.5"
                        fill="#7C43DF"
                        stroke="#7C43DF"
                      />
                      <g filter="url(#filter0_dd_4512_259)">
                        <circle cx="29" cy="11" r="9" fill="white" />
                      </g>
                      <defs>
                        <filter
                          id="filter0_dd_4512_259"
                          x="17"
                          y="0"
                          width="24"
                          height="24"
                          filterUnits="userSpaceOnUse"
                          color-interpolation-filters="sRGB"
                        >
                          <feFlood
                            flood-opacity="0"
                            result="BackgroundImageFix"
                          />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset dy="1" />
                          <feGaussianBlur stdDeviation="1" />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="BackgroundImageFix"
                            result="effect1_dropShadow_4512_259"
                          />
                          <feColorMatrix
                            in="SourceAlpha"
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                            result="hardAlpha"
                          />
                          <feOffset dy="1" />
                          <feGaussianBlur stdDeviation="1.5" />
                          <feColorMatrix
                            type="matrix"
                            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
                          />
                          <feBlend
                            mode="normal"
                            in2="effect1_dropShadow_4512_259"
                            result="effect2_dropShadow_4512_259"
                          />
                          <feBlend
                            mode="normal"
                            in="SourceGraphic"
                            in2="effect2_dropShadow_4512_259"
                            result="shape"
                          />
                        </filter>
                      </defs>
                    </svg>
                  </div>
                </div>
                <button className="flex items-center gap-x-20 px-2 sm:px-2 py-2 border border-gray-200 rounded-custom text-gray-600 text-[12px] font-inter font-[600] bg-backgroundWhite border border-reloadBorder">
                  Today
                  <Calendar />
                </button>
                <button className="p-2 hover:bg-white/10 mx-3 font-inter font-[600] bg-backgroundWhite border border-reloadBorder rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M10 6C8.89543 6 8 5.10457 8 4C8 2.89543 8.89543 2 10 2C11.1046 2 12 2.89543 12 4C12 5.10457 11.1046 6 10 6Z"
                      fill="#212121"
                    />
                    <path
                      d="M10 12C8.89543 12 8 11.1046 8 10C8 8.89543 8.89543 8 10 8C11.1046 8 12 8.89543 12 10C12 11.1046 11.1046 12 10 12Z"
                      fill="#212121"
                    />
                    <path
                      d="M10 18C8.89543 18 8 17.1046 8 16C8 14.8954 8.89543 14 10 14C11.1046 14 12 14.8954 12 16C12 17.1046 11.1046 18 10 18Z"
                      fill="#212121"
                    />
                  </svg>
                </button>
                {/* </div> */}
              </div>
            </div>
          )}

          {isLaptop && (
            <header className="hidden sm:block px-3 sm:px-4 md:px-6 py-3 sm:py-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
                <div className="flex items-center gap-4">
                  {/* {width < 834 && (
                <button
                  onClick={toggleSidebar}
                  className="p-2 rounded-md hover:bg-white/10"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              )} */}
                  <h2 className="text-lg px-6 sm:text-xl font-inter font-[600] text-gray-800">
                    Analytics
                  </h2>
                </div>
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6 w-full sm:w-auto">
                  <button className="p-2 hover:bg-gray-100 rounded-custom  bg-reloadBackground">
                    <Reload />
                  </button>
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <span className="text-textHeading text-[14px] leading-[21px] font-inter font-[500] sm:text-[14px] item-center">
                      Auto Refresh
                    </span>
                    <div className="w-12 h-6 bg-purple-600 rounded-full relative cursor-pointer">
                      <ToggleOn />
                    </div>
                  </div>
                  <div className="flex gap-2 sm:gap-5 ml-auto sm:ml-0">
                    <button className="flex items-center gap-x-20 px-2 sm:px-2 py-2 border border-gray-200 rounded-custom text-gray-600 text-[12px] font-inter font-[600] bg-backgroundWhite border border-reloadBorder">
                      Today
                      <Calendar />
                    </button>
                    <button className="px-3 sm:px-4 py-2 bg-bgButton text-white rounded-md text-[12px] font-inter text-[12px] font-[600] leading-[15.6px]">
                      Customise
                    </button>
                  </div>
                </div>
              </div>
            </header>
          )}
          <div className="h-[calc(100vh-130px)] overflow-y-auto p-3 sm:p-4 md:p-6">
            <div className="grid grid-cols-12 sm:grid-cols-12 md:grid-cols-12 gap-3 sm:gap-4 md:gap-6 mb-6">
              {/* Revenue Card */}
              <div className="col-span-12 sm:col-span-12 md:col-span-4">
                <Card className="bg-white h-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex justify-between items-center text-[12px] font-medium">
                      <div className="flex justify-between items-center font-inter text-headding-color text-base font-[500] leading-[24px] sm:text-base gap-2">
                        Revenue
                        <Info className="w-4 h-4 text-gray-400" />
                      </div>
                      <button className="p-1.5 rounded-md border border-gray-200">
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <h3 className="text-[22px] sm:text-[22px] md:text-[22px] font-inter font-[600] text-gray-900 leading-[1.75]">
                        $10000000.00
                      </h3>
                    </div>
                    <div className="w-full overflow-x-auto">
                      <LineChart
                        width={300}
                        height={80}
                        data={revenueData}
                        className="w-full min-w-[300px]"
                      >
                        <XAxis dataKey="time" />
                        <YAxis />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="#8884d8"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                        />
                      </LineChart>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Orders Card */}
              <div className="col-span-12 sm:col-span-12 md:col-span-8">
                <Card className="bg-white h-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex justify-between items-center text-[12px] font-medium">
                      <div className="flex justify-between items-center font-inter text-headding-color text-base font-[500] leading-[24px] sm:text-base gap-2">
                        Orders
                        <Info className="w-4 h-4 text-gray-400" />
                      </div>
                      <button className="p-1.5 rounded-md border border-gray-200">
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-background-grey grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 p-2 sm:p-4 md:font-inter">
                      <OrderStat
                        title="Completed"
                        value="1000"
                        icon={<Completed />}
                      />
                      <OrderStat
                        title="Dispatched"
                        value="1000"
                        icon={<Dispatched />}
                      />
                      <OrderStat
                        title="Pending"
                        value="1000"
                        icon={<Pending />}
                      />
                      <OrderStat
                        title="Cancelled"
                        value="1000"
                        icon={<Cancled />}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Bottom Cards */}
            <div className="grid grid-cols-12 gap-3 sm:gap-4 md:gap-6">
              {/* New Customers Card */}
              <div className="col-span-12 sm:col-span-12 md:col-span-6">
                <Card className="bg-white h-full">
                  <div className="space-y-4">
                    <NewCustomersCard />
                  </div>
                </Card>
              </div>

              {/* Stores Card */}
              <div className="col-span-12 sm:col-span-12 md:col-span-6">
                <Card className="bg-white h-full">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex justify-between items-center text-[12px] font-medium">
                      <div className="flex justify-between items-center font-inter text-headding-color text-base font-[500] leading-[24px] sm:text-base gap-2">
                        Stores
                        <Info className="w-4 h-4 text-cardTitle font-inter text-[12px] font-[600]" />
                      </div>
                      <button className="p-1.5 rounded-md border border-gray-200">
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <StoresStat title="Active store" value="10" />
                      <StoresStat title="Inactive store" value="10" />
                      <StoresStat title="Open store" value="10" />
                      <StoresStat title="Closed store" value="10" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };
  return (
    <div className="flex flex-col h-screen">
      <TopHeader
        userName="Aman Kumar"
        onMenuClick={toggleSidebar}
        width={width}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Mobile Overlay */}
        {isSidebarOpen && width < 640 && (
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-50 z-20"
            onClick={toggleSidebar}
          />
        )}

        {/* Sidebar */}
        <div
          className={`
            fixed sm:relative inset-y-0 left-0 
            transform ${
              isSidebarOpen || showSidebar
                ? "translate-x-0"
                : "-translate-x-full"
            }
            transition-transform duration-300 ease-in-out
            w-[240px] bg-white border-r border-gray-200 z-30
          `}
        >
          <div className=" md:p-6">
            {width < 640 && (
              <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold text-purple-600">Dhaam</h1>
                {showCloseIcon && (
                  <button
                    onClick={toggleSidebar}
                    className="p-2 rounded-md hover:bg-gray-100"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>
            )}
            <SidebarNav
              onSettingsSubItemClick={handleSettingsSubItemClick}
              onMenuSubItemClick={handleMenuSubItemClick} // This was missing
              onItemClick={handleItemClick}
              currentView={currentView}
            />

            {/* </nav> */}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-hidden">{renderContent()}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
