import {
  // Menu,
  Bell,
  Clock,
  // Settings,
  ChevronDown,
  Package,
  Users,
  Store,
  List,
  LayoutDashboard,
  TrendingUp,
  Search,
  Info,
} from "lucide-react";

import { useState, useEffect } from "react";
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
import { ReactComponent as Menu } from "../../lib/Images/menu.svg";
import { ReactComponent as Orders } from "../../lib/Images/orders.svg";
import { ReactComponent as Pending } from "../../lib/Images/pending.svg";
import { ReactComponent as Reload } from "../../lib/Images/reload.svg";
import { ReactComponent as Settings } from "../../lib/Images/settings.svg";
import { ReactComponent as Stores } from "../../lib/Images/stores.svg";

const revenueData = [
  { time: "10:00 AM", value: 10 },
  { time: "2:00 PM", value: 50 },
  { time: "6:00 PM", value: 60 },
  { time: "10:00 PM", value: 100 },
];

interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  active?: boolean;
  hasSubmenu?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
}

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
    { title: "Title here", percentage: 40, color: "bg-purple-500" },
    { title: "Title here", percentage: 30, color: "bg-blue-500" },
    { title: "Title here", percentage: 15, color: "bg-orange-500" },
    { title: "Title here", percentage: 15, color: "bg-green-500" },
  ];

  const totalWidth = progressItems.reduce(
    (acc, item) => acc + item.percentage,
    0
  );

  return (
    <Card className="bg-white">
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center text-sm font-medium">
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
        <div className="flex w-full h-2 rounded-full overflow-hidden">
          {progressItems.map((item, index) => (
            <div
              key={index}
              className={`h-full ${item.color}`}
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
      <span className="text-sm  text-cardTitle font-inter leading-[15.6px] font-[600]">
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
  const isMobile = width < 640;
  const myScreen = width <= 767;

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
          <div className="flex items-center gap-4 ">
            <div
              className={`flex items-center bg-reloadBackground sm:w-1/2 md:w-1/2 py-[2px] ${
                isMobile ? "bg-white" : "bg-white"
              } rounded-lg`}
            >
              <div
                className={`absolute inset-y-0 left-0 pl-3   flex items-center pointer-events-none font-inter font-[600] bg-backgroundWhite rounded-custom `}
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
                } text-sm focus:outline-none`}
              />
            </div>

            {!isMobile && (
              <button className="hidden md:flex sm:flex items-center h-9 bg-backgroundWhite rounded-lg px-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    d="M12.25 7C12.25 9.89949 9.89949 12.25 7 12.25M12.25 7C12.25 4.1005 9.89949 1.75 7 1.75M12.25 7H1.75M7 12.25C4.1005 12.25 1.75 9.89949 1.75 7M7 12.25C7.9665 12.25 8.75 9.89949 8.75 7C8.75 4.1005 7.9665 1.75 7 1.75M7 12.25C6.0335 12.25 5.25 9.89949 5.25 7C5.25 4.1005 6.0335 1.75 7 1.75M1.75 7C1.75 4.1005 4.1005 1.75 7 1.75"
                    stroke="#7C43DF"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                <span className="text-sm sm:px-1 md:px-1 font-inter font-[600] leading-[15.6px] text-gray-900">
                  www.design-mart.com
                </span>

                <svg
                  className="w-3.5 h-3.5 ml-2"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    d="M10 3H4.5C3.67157 3 3 3.67157 3 4.5V9.5C3 10.3284 3.67157 11 4.5 11H9.5C10.3284 11 11 10.3284 11 9.5V5M7 7L11 3M11 3V6M11 3H8"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Desktop-only website link */}

        {/* Right section */}
        <div className="flex items-center gap-3">
          {!isMobile && (
            <button className="hidden md:flex items-center gap-2 px-3 py-1.5 font-[600] rounded-lg text-whiteColor text-sm font-inter">
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
              isMobile ? "text-white hover:bg-white/10" : "bg-white"
            } rounded-lg`}
          >
            <Bell
              className={`h-5 w-5 ${isMobile ? "text-white" : "text-gray-900"}`}
            />
            <div className="absolute top-1.5 right-1.5 h-2 w-2 bg-red-500 rounded-full" />
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
              <span className="text-sm font-inter text-sm font-[600] leading-[15.6px]">
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
          <h1 className="text-xl sm:text-xl font-inter font-[600] text-gray-800">
            Analytics
          </h1>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-8  px-8 sm:px-2 py-2  rounded-md text-gray-600 text-sm font-inter font-[600] bg-backgroundWhite border border-reloadBorder">
              Today
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 4V2M12 4V2M4 7H12M2 14H14C14.5523 14 15 13.5523 15 13V4C15 3.44772 14.5523 3 14 3H2C1.44772 3 1 3.44772 1 4V13C1 13.5523 1.44772 14 2 14Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
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
const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  text,
  active = false,
  hasSubmenu = false,
  children,
  onClick,
}) => (
  <div onClick={onClick}>
    <div
      className={`flex items-center px-4 py-2 my-1 rounded-lg cursor-pointer ${
        active ? "bg-gray-100" : "hover:bg-background-grey"
      }`}
    >
      <div className="text-gray-600 mr-3">{icon}</div>
      <span className="text-gray-700 flex-1 font-inter text-[14px] leading-[21px] font-[500]">
        {text}
      </span>
      {/* {hasSubmenu && <ChevronDown className="h-4 w-4 text-gray-400" />} */}
    </div>
    {children}
  </div>
);

const OrderStat: React.FC<OrderStatProps> = ({ title, value, icon }) => (
  <div className="bg-white rounded-lg flex flex-col w-full p-4 shadow-sm">
    {/* Title */}
    <div className="text-cardTitle text-sm sm:text-base md:text-lg font-inter font-semibold truncate">
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

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  // Show sidebar by default at 834px
  const showSidebar = width >= 640;
  const isTablet = width >= 640 && width <= 835;
  const isLaptop = width > 835;
  const showCloseIcon = width < 375;

  return (
    <div className="flex flex-col h-screen">
      <TopHeader
        userName="Aman Kumar"
        onMenuClick={toggleSidebar}
        width={width}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Overlay for mobile */}
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
            isSidebarOpen || showSidebar ? "translate-x-0" : "-translate-x-full"
          }
          transition-transform duration-300 ease-in-out
          w-64 bg-white border-r border-gray-200 z-30
        `}
        >
          <div className="p-4 md:p-6">
            {width < 640 && (
              <div className="flex justify-between items-center mb-4">
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

            <nav className="space-y-1 ">
              <SidebarItem
                icon={<GetStarted />}
                text="Get Started"
                onClick={() => width < 640 && toggleSidebar()}
              />
              <SidebarItem icon={<Dashboard />} text="Dashboard" active />
              <SidebarItem icon={<Orders />} text="Orders" hasSubmenu />
              <SidebarItem icon={<Menu />} text="Menu" hasSubmenu>
                <div className="pl-8 mt-1 space-y-1">
                  <div className="text-menuSubHeadingColor py-1 font-inter text-sm leading-[15.6px] font-[500]">
                    List
                  </div>
                  <div className="text-menuSubHeadingColor py-1 font-inter text-sm leading-[15.6px] font-[500]">
                    List
                  </div>
                  <div className="text-menuSubHeadingColor py-1 font-inter text-sm leading-[15.6px] font-[500]">
                    List
                  </div>
                  <div className="text-menuSubHeadingColor py-1 font-inter text-sm leading-[15.6px] font-[500]">
                    List
                  </div>
                  <div className="text-menuSubHeadingColor py-1 font-inter text-sm leading-[15.6px] font-[500]">
                    List
                  </div>
                </div>
              </SidebarItem>
              <SidebarItem icon={<Customers />} text="Customers" />
              <SidebarItem icon={<Stores />} text="Stores" hasSubmenu />
              <SidebarItem icon={<Settings />} text="Setting" hasSubmenu />
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          {/* Header */}
          {isTablet && (
            <div className="px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3"></div>

                {/* <div className="flex items-center gap-4"> */}
                <h1 className="text-xl font-semibold font-inter font-[600]">
                  Analytics
                </h1>
                <button className="p-2 rounded-lg bg-white/10">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </button>
                <div className="flex items-center gap-2">
                  <span className="text-textHeading text-[14px] leading-[21px] font-inter font-[500] sm:text-[14px] item-center">
                    Auto Refresh
                  </span>
                  <div className="w-12 h-6 bg-purple-600 rounded-full relative">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                  </div>
                </div>
                <button className="flex items-center gap-8  px-8 sm:px-2 py-2  rounded-md text-gray-600 text-sm font-inter font-[600] bg-backgroundWhite border border-reloadBorder">
                  Today
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4 4V2M12 4V2M4 7H12M2 14H14C14.5523 14 15 13.5523 15 13V4C15 3.44772 14.5523 3 14 3H2C1.44772 3 1 3.44772 1 4V13C1 13.5523 1.44772 14 2 14Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
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
                  {width < 834 && (
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
                  )}
                  <h2 className="text-lg sm:text-xl font-inter font-[600] text-gray-800">
                    Analytics
                  </h2>
                  <Logo className="h-8" />
                </div>
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6 w-full sm:w-auto">
                  <button className="p-2 hover:bg-gray-100 rounded-custom  bg-reloadBackground">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <g clip-path="url(#clip0_4512_275)">
                        <path
                          d="M14.66 15.66C13.352 16.9694 11.6305 17.7848 9.78879 17.9673C7.94705 18.1498 6.09901 17.6881 4.55952 16.6608C3.02004 15.6335 1.88436 14.1042 1.34597 12.3335C0.807587 10.5628 0.899804 8.66015 1.60691 6.94979C2.31402 5.23944 3.59227 3.82716 5.22389 2.95357C6.85551 2.07998 8.73954 1.79914 10.555 2.15888C12.3705 2.51863 14.005 3.4967 15.1802 4.92647C16.3554 6.35624 16.9985 8.14925 17 10H15C15.0012 8.61181 14.521 7.26614 13.6413 6.1923C12.7615 5.11846 11.5366 4.38291 10.1753 4.11097C8.81404 3.83904 7.40056 4.04755 6.17577 4.70098C4.95098 5.35442 3.99066 6.41233 3.45845 7.69446C2.92625 8.97659 2.85509 10.4036 3.25711 11.7323C3.65913 13.061 4.50944 14.2092 5.66315 14.9813C6.81687 15.7533 8.20259 16.1014 9.58419 15.9662C10.9658 15.8311 12.2578 15.221 13.24 14.24L14.66 15.66ZM12 10H20L16 14L12 10Z"
                          fill="#949494"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_4512_275">
                          <rect width="20" height="20" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </button>
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <span className="text-textHeading text-[14px] leading-[21px] font-inter font-[500] sm:text-[14px] item-center">
                      Auto Refresh
                    </span>
                    <div className="w-12 h-6 bg-purple-600 rounded-full relative cursor-pointer">
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
                        <g filter="url(#filter0_dd_4450_105)">
                          <circle cx="29" cy="11" r="9" fill="white" />
                        </g>
                        <defs>
                          <filter
                            id="filter0_dd_4450_105"
                            x="17"
                            y="0"
                            width="24"
                            height="24"
                            filterUnits="userSpaceOnUse"
                            colorInterpolationFilters="sRGB"
                          >
                            <feFlood
                              floodOpacity="0"
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
                              result="effect1_dropShadow_4450_105"
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
                              in2="effect1_dropShadow_4450_105"
                              result="effect2_dropShadow_4450_105"
                            />
                            <feBlend
                              mode="normal"
                              in="SourceGraphic"
                              in2="effect2_dropShadow_4450_105"
                              result="shape"
                            />
                          </filter>
                        </defs>
                      </svg>
                    </div>
                  </div>
                  <div className="flex gap-2 sm:gap-5 ml-auto sm:ml-0">
                    <button className="flex items-center gap-2 bg-white px-2 sm:px-2 py-2 border border-gray-200 rounded-md text-gray-600 text-sm font-inter font-[600] border-custom">
                      Today
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                      >
                        <path
                          d="M4.66667 4.08333V1.75M9.33333 4.08333V1.75M4.08333 6.41667H9.91667M2.91667 12.25H11.0833C11.7277 12.25 12.25 11.7277 12.25 11.0833V4.08333C12.25 3.439 11.7277 2.91667 11.0833 2.91667H2.91667C2.27233 2.91667 1.75 3.439 1.75 4.08333V11.0833C1.75 11.7277 2.27233 12.25 2.91667 12.25Z"
                          stroke="#949494"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                    <button className="px-3 sm:px-4 py-2 bg-purple-600 text-white rounded-md text-sm font-inter font-semibold">
                      Customise
                    </button>
                  </div>
                </div>
              </div>
            </header>
          )}
          {/* Dashboard Content */}
          <div className="h-[calc(100vh-130px)] overflow-y-auto p-3  sm:p-4 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-4 md:gap-6">
              {/* Revenue Card */}
              <Card className="bg-white">
                <CardHeader className="pb-2">
                  <CardTitle className="flex justify-between items-center text-sm font-medium">
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
                      width={350}
                      height={80}
                      data={revenueData}
                      className="w-full min-w-[350px]"
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

              {/* Orders Card */}
              <Card className="bg-white">
                <CardHeader className="pb-2">
                  <CardTitle className="flex justify-between items-center text-sm font-medium">
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

              {/* New Customers Card */}
              <Card className="bg-white">
                <div className="space-y-4">
                  <NewCustomersCard />
                  {/* <StoresCard /> */}
                </div>
              </Card>

              {/* Stores Card */}
              <Card className="bg-white">
                <CardHeader className="pb-2">
                  <CardTitle className="flex justify-between items-center text-sm font-medium">
                    <div className="flex justify-between items-center font-inter text-headding-color text-base font-[500] leading-[24px] sm:text-base gap-2">
                      Stores
                      <Info className="w-4 h-4 text-cardTitle font-inter text-sm font-[600]" />
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
    </div>
  );
};

export default DashboardLayout;
