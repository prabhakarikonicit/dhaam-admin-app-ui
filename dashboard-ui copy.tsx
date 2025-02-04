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
} from "lucide-react";

import { useState } from 'react';
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
}
const TopHeader: React.FC<TopHeaderProps> = ({ userName, userImage }) => (
  <div className="bg-purple-600 text-white px-3 sm:px-4 md:px-6 py-2 md:py-3 flex flex-wrap items-center justify-between gap-2">
    <div className="text-lg md:text-xl font-bold">
      <Logo />
    </div>

    <div className="flex-1 w-full sm:w-auto max-w-2xl mx-2 md:mx-8 order-3 sm:order-2">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-4 w-4" />
        <input
          type="text"
          placeholder="Search"
          className="w-full pl-10 pr-4 py-2 rounded-lg bg-white border border-white/20 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/30"
        />
      </div>
    </div>

    <div className="flex items-center gap-2 sm:gap-4 md:gap-6 order-2 sm:order-3">
      <button className="hidden md:flex items-center space-x-2 px-3 py-1.5 bg-white rounded-lg text-sm hover:bg-white/20 transition-colors">
        <span className="text-sm text-black">www.design-mart.com</span>
        <svg
          className="h-4 w-4 stroke-black"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      </button>

      <button className="px-2 sm:px-3 py-1.5 bg-white/10 rounded-lg text-xs sm:text-sm hover:bg-white/20 transition-colors whitespace-nowrap">
        DHAAM AI
      </button>

      <button className="relative p-2 bg-white hover:bg-white/10 rounded-lg">
        <Bell className="h-5 w-5 text-black" />
        <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
      </button>

      <button className="flex items-center p-1 space-x-2 sm:space-x-3 bg-white text-black rounded-lg">
        <span className="hidden sm:inline text-sm font-medium">{userName}</span>
        <img
          src={userImage || "/api/placeholder/32/32"}
          alt={userName}
          className="h-8 w-8 rounded-full bg-white/20"
        />
      </button>
    </div>
  </div>
);

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  text,
  active = false,
  hasSubmenu = false,
}) => (
  <div
    className={`flex items-center px-4 py-2 my-1 rounded-lg cursor-pointer ${
      active ? "bg-gray-100" : "hover:bg-background-grey"
    }`}
  >
    <div className="text-gray-600 mr-3">{icon}</div>
    <span className="text-gray-700 flex-1">{text}</span>
    {hasSubmenu && <ChevronDown className="h-4 w-4 text-gray-400" />}
  </div>
);

const OrderStat: React.FC<OrderStatProps> = ({ title, value, icon }) => (
  <div className=" bg-white rounded-lg flex font-semibold flex-col">
    <div className=" my-4 mx-4 text-gray-500 mb-0 text-sm">{title}</div>
    <div className="text-3xl/[42px] mx-4 text-gray-900">{value}</div>
    <div className="text-2xl text-purple-600 self-end">{icon}</div>
  </div>
);

const StoresStat: React.FC<StoresStatProps> = ({ title, value }) => (
  <div className="bg-store-card rounded-lg flex font-semibold border-solid border-grey-border border-y-[1px] border-x-[1px] px-[10px] py-[10px] pt-[8px] justify-between">
    <div className="flex flex-col">
      <div className=" text-gray-500 text-sm">{title}</div>
      <div className="text-3xl/[42px] text-gray-900 text-center">{value}</div>
    </div>
    <ChevronRight className="h-4 w-4" />
  </div>
);



const DashboardLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex flex-col h-screen">
      <TopHeader userName="Aman Kumar" />

      <div className="flex flex-1 overflow-hidden">
        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-gray-600 bg-opacity-50 z-20 lg:hidden"
            onClick={toggleSidebar}
          />
        )}

        {/* Sidebar */}
        <div className={`
          fixed lg:static inset-y-0 left-0 
          transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 transition-transform duration-300 ease-in-out
          w-64 bg-white border-r border-gray-200 z-30
        `}>
          <div className="p-4 md:p-6">
            <div className="flex justify-between items-center lg:hidden mb-4">
              <h1 className="text-xl font-bold text-purple-600">Dhaam</h1>
              <button onClick={toggleSidebar} className="p-2 rounded-md hover:bg-gray-100">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="space-y-1">
              <SidebarItem icon={<GetStarted />} text="Get Started" />
              <SidebarItem icon={<Dashboard />} text="Dashboard" active />
              <SidebarItem icon={<Orders />} text="Orders" hasSubmenu />
              <SidebarItem icon={<Menu />} text="Menu" hasSubmenu />
              <SidebarItem icon={<Customers />} text="Customers" />
              <SidebarItem icon={<Stores />} text="Stores" hasSubmenu />
              <SidebarItem icon={<Settings />} text="Setting" hasSubmenu />
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <header className="px-3 sm:px-4 md:px-6 py-3 sm:py-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
              <div className="flex items-center space-x-4">
                <button 
                  onClick={toggleSidebar}
                  className="p-2 rounded-md hover:bg-gray-100 lg:hidden"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                  Analytics
                </h2>
              </div>
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6 w-full sm:w-auto">
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <Clock className="h-5 w-5 text-gray-600" />
                </button>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <span className="text-gray-600 text-sm sm:text-base">Auto Refresh</span>
                  <div className="w-12 h-6 bg-purple-600 rounded-full relative cursor-pointer">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
                <div className="flex gap-2 sm:gap-3 ml-auto sm:ml-0">
                  <button className="bg-white px-3 sm:px-4 py-2 border border-gray-200 rounded-md text-gray-600 text-sm">
                    Today
                  </button>
                  <button className="px-3 sm:px-4 py-2 bg-purple-600 text-white rounded-md text-sm">
                    Customise
                  </button>
                </div>
              </div>
            </div>
          </header>

          {/* Dashboard Content */}
          <div className="p-3 sm:p-4 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-1 gap-3 sm:gap-4 md:gap-6">
            <Card className="bg-white">
                <CardHeader className="pb-2">
                  <CardTitle className="flex justify-between items-center font-base font-medium text-headding-color text-sm sm:text-base">
                   Revenue
                    <button className="flex justify-items-center p-1.5 items-center rounded-md border-solid border-grey-border border-y-[1px] border-x-[1px]">
                      <ChevronRight />
                    </button>
                 </CardTitle>
                 </CardHeader>
                <CardContent>
                 <div className="mb-4">
                   <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
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
                  <CardTitle className="flex justify-between items-center font-base font-medium text-headding-color text-sm sm:text-base">
                    Orders
                    <button className="flex justify-items-center p-1.5 items-center rounded-md border-solid border-grey-border border-y-[1px] border-x-[1px]">
                      <ChevronRight />
                    </button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-background-grey grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 p-2 sm:p-4">
                    <OrderStat title="Completed" value="1000" icon={<Completed />} />
                    <OrderStat title="Dispatched" value="1000" icon={<Dispatched />} />
                    <OrderStat title="Pending" value="1000" icon={<Pending />} />
                    <OrderStat title="Cancelled" value="1000" icon={<Cancled />} />
                  </div>
                </CardContent>
              </Card>

              {/* New Customers Card */}
              <Card className="bg-white">
                <CardHeader className="pb-2">
                  <CardTitle className="flex justify-between items-center font-base font-medium text-headding-color text-sm sm:text-base">
                    New customers
                    <button className="flex justify-items-center p-1.5 items-center rounded-md border-solid border-grey-border border-y-[1px] border-x-[1px]">
                      <ChevronRight />
                    </button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    6543
                  </h3>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-purple-600 rounded-full" style={{ width: "60%" }}></div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm text-gray-600">Title here</span>
                      <span className="text-xs sm:text-sm text-gray-600">00%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Stores Card */}
              <Card className="bg-white">
                <CardHeader className="pb-2">
                  <CardTitle className="flex justify-between items-center font-base font-medium text-headding-color text-sm sm:text-base">
                    Stores
                    <button className="flex justify-items-center p-1.5 items-center rounded-md border-solid border-grey-border border-y-[1px] border-x-[1px]">
                      <ChevronRight />
                    </button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 p-2 sm:p-4">
                    <StoresStat title="Active Store" value="10" />
                    <StoresStat title="Inactive Store" value="10" />
                    <StoresStat title="Open Store" value="10" />
                    <StoresStat title="Closed Store" value="10" />
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



// const DashboardLayout = () => {
//   return (
//     <div className="flex flex-col h-screen">
//       <TopHeader userName="Aman Kumar" />

//       <div className="flex flex-1 overflow-hidden">
//         {/* Sidebar */}
//         <div className="w-64 bg-white border-r border-gray-200">
//           <div className="p-6">
//             {/* <h1 className="text-xl font-bold text-purple-600 mb-8">Dhaam</h1> */}

//             <nav className="space-y-1">
//               <SidebarItem icon={<GetStarted />} text="Get Started" />
//               <SidebarItem icon={<Dashboard />} text="Dashboard" active />
//               <SidebarItem icon={<Orders />} text="Orders" hasSubmenu />
//               <SidebarItem icon={<Menu />} text="Menu" hasSubmenu />
//               <SidebarItem icon={<Customers />} text="Customers" />
//               <SidebarItem icon={<Stores />} text="Stores" hasSubmenu />
//               <SidebarItem icon={<Settings />} text="Setting" hasSubmenu />
//             </nav>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="flex-1">
//           {/* Header */}
//           <header className="px-3 sm:px-4 md:px-6 py-3 sm:py-4">
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
//             <div className="flex items-center space-x-4">
//               <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
//                 Analytics
//               </h2>
//             </div>
//             <div className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6 w-full sm:w-auto">
//               <button className="p-2 hover:bg-gray-100 rounded-full">
//                 <Clock className="h-5 w-5 text-gray-600" />
//               </button>
//               <div className="flex items-center space-x-2 sm:space-x-3">
//                 <span className="text-gray-600 text-sm sm:text-base">Auto Refresh</span>
//                 <div className="w-12 h-6 bg-purple-600 rounded-full relative cursor-pointer">
//                   <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
//                 </div>
//               </div>
//               <div className="flex gap-2 sm:gap-3 ml-auto sm:ml-0">
//                 <button className="bg-white px-3 sm:px-4 py-2 border border-gray-200 rounded-md text-gray-600 text-sm">
//                   Today
//                 </button>
//                 <button className="px-3 sm:px-4 py-2 bg-purple-600 text-white rounded-md text-sm">
//                   Customise
//                 </button>
//               </div>
//             </div>
//           </div>
//         </header>

//           {/* Dashboard Content */}
//           <div className="p-3 sm:p-4 md:p-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
//               {/* Revenue Card */}
//               <Card className="bg-white">
//                 <CardHeader className="pb-2">
//                   <CardTitle className="flex justify-between items-center font-base font-medium text-headding-color text-sm sm:text-base">
//                     Revenue
//                     <button className="flex justify-items-center p-1.5 items-center rounded-md border-solid border-grey-border border-y-[1px] border-x-[1px]">
//                       <ChevronRight />
//                     </button>
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="mb-4">
//                     <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">
//                       $10000000.00
//                     </h3>
//                   </div>
//                   <div className="w-full overflow-x-auto">
//                     <LineChart 
//                       width={350} 
//                       height={80} 
//                       data={revenueData}
//                       className="w-full min-w-[350px]"
//                     >
//                       <XAxis dataKey="time" />
//                       <YAxis />
//                       <Tooltip />
//                       <Line
//                         type="monotone"
//                         dataKey="value"
//                         stroke="#8884d8"
//                         strokeWidth={2}
//                         dot={{ r: 4 }}
//                       />
//                     </LineChart>
//                   </div>
//                 </CardContent>
//               </Card>

//               {/* Orders Card */}
//               <Card className="bg-white">
//                 <CardHeader className="pb-2">
//                   <CardTitle className="flex justify-between items-center font-base font-medium text-headding-color text-sm sm:text-base">
//                     Orders
//                     <button className="flex justify-items-center p-1.5 items-center rounded-md border-solid border-grey-border border-y-[1px] border-x-[1px]">
//                       <ChevronRight />
//                     </button>
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="bg-background-grey grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 p-2 sm:p-4">
//                     <OrderStat title="Completed" value="1000" icon={<Completed />} />
//                     <OrderStat title="Dispatched" value="1000" icon={<Dispatched />} />
//                     <OrderStat title="Pending" value="1000" icon={<Pending />} />
//                     <OrderStat title="Cancelled" value="1000" icon={<Cancled />} />
//                   </div>
//                 </CardContent>
//               </Card>

//               {/* New Customers Card */}
//               <Card className="bg-white">
//                 <CardHeader className="pb-2">
//                   <CardTitle className="flex justify-between items-center font-base font-medium text-headding-color text-sm sm:text-base">
//                     New customers
//                     <button className="flex justify-items-center p-1.5 items-center rounded-md border-solid border-grey-border border-y-[1px] border-x-[1px]">
//                       <ChevronRight />
//                     </button>
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4">
//                     6543
//                   </h3>
//                   <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
//                     <div className="h-full bg-purple-600 rounded-full" style={{ width: "60%" }}></div>
//                   </div>
//                   <div className="mt-4 space-y-2">
//                     <div className="flex items-center justify-between">
//                       <span className="text-xs sm:text-sm text-gray-600">Title here</span>
//                       <span className="text-xs sm:text-sm text-gray-600">00%</span>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>

//               {/* Stores Card */}
//               <Card className="bg-white">
//                 <CardHeader className="pb-2">
//                   <CardTitle className="flex justify-between items-center font-base font-medium text-headding-color text-sm sm:text-base">
//                     Stores
//                     <button className="flex justify-items-center p-1.5 items-center rounded-md border-solid border-grey-border border-y-[1px] border-x-[1px]">
//                       <ChevronRight />
//                     </button>
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 p-2 sm:p-4">
//                     <StoresStat title="Active Store" value="10" />
//                     <StoresStat title="Inactive Store" value="10" />
//                     <StoresStat title="Open Store" value="10" />
//                     <StoresStat title="Closed Store" value="10" />
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;




// import {
//   Bell,
//   Clock,
//   ChevronDown,
//   Package,
//   Users,
//   Store,
//   List,
//   LayoutDashboard,
//   TrendingUp,
//   Search,
// } from "lucide-react";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "../ui/card-components";
// import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
// import { ReactComponent as Calendar } from "../../lib/Images/calendar.svg";
// import { ReactComponent as Cancled } from "../../lib/Images/cancled.svg";
// import { ReactComponent as ChevronRight } from "../../lib/Images/chevron-right.svg";
// import { ReactComponent as Completed } from "../../lib/Images/completed.svg";
// import { ReactComponent as Customers } from "../../lib/Images/customers.svg";
// import { ReactComponent as Dashboard } from "../../lib/Images/dashboard.svg";
// import { ReactComponent as Dispatched } from "../../lib/Images/dispatched.svg";
// import { ReactComponent as GetStarted } from "../../lib/Images/getStarted.svg";
// import { ReactComponent as InfoIcon } from "../../lib/Images/info-icon.svg";
// import { ReactComponent as Logo } from "../../lib/Images/logo.svg";
// import { ReactComponent as Menu } from "../../lib/Images/menu.svg";
// import { ReactComponent as Orders } from "../../lib/Images/orders.svg";
// import { ReactComponent as Pending } from "../../lib/Images/pending.svg";
// import { ReactComponent as Reload } from "../../lib/Images/reload.svg";
// import { ReactComponent as Settings } from "../../lib/Images/settings.svg";
// import { ReactComponent as Stores } from "../../lib/Images/stores.svg";

// const revenueData = [
//   { time: "10:00 AM", value: 10 },
//   { time: "2:00 PM", value: 50 },
//   { time: "6:00 PM", value: 60 },
//   { time: "10:00 PM", value: 100 },
// ];

// interface SidebarItemProps {
//   icon: React.ReactNode;
//   text: string;
//   active?: boolean;
//   hasSubmenu?: boolean;
// }

// interface OrderStatProps {
//   title: string;
//   value: string;
//   icon: React.ReactNode;
// }

// interface StoresStatProps {
//   title: string;
//   value: string;
// }

// interface TopHeaderProps {
//   userName: string;
//   userImage?: string;
// }

// const TopHeader: React.FC<TopHeaderProps> = ({ userName, userImage }) => (
//   <div className="bg-purple-600 text-white px-3 md:px-6 py-2 md:py-3 flex items-center justify-between flex-wrap gap-2">
//     <div className="text-xl font-bold">
//       <Logo />
//     </div>

//     <div className="flex-1 max-w-2xl mx-2 md:mx-8 min-w-[200px]">
//       <div className="relative">
//         <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//         <input
//           type="text"
//           placeholder="Search"
//           className="w-full pl-10 pr-4 py-2 rounded-lg bg-white border border-white/20 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white/30"
//         />
//       </div>
//     </div>

//     <div className="flex items-center space-x-2 md:space-x-6 flex-wrap">
//       <button className="hidden md:flex items-center space-x-2 px-3 py-1.5 bg-white rounded-lg text-sm hover:bg-white/20 transition-colors">
//         <span className="text-sm text-black">www.design-mart.com</span>
//         <svg
//           className="h-4 w-4 stroke-black"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
//           />
//         </svg>
//       </button>

//       <button className="px-3 py-1.5 bg-white/10 rounded-lg text-sm hover:bg-white/20 transition-colors whitespace-nowrap">
//         DHAAM AI
//       </button>

//       <button className="relative p-2 bg-white hover:bg-white/10 rounded-lg">
//         <Bell className="h-5 w-5 text-black" />
//         <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
//       </button>

//       <button className="flex items-center p-1 space-x-3 bg-white text-black rounded-lg">
//         <span className="text-sm font-medium hidden sm:inline">{userName}</span>
//         <img
//           src={userImage || "/api/placeholder/32/32"}
//           alt={userName}
//           className="h-8 w-8 rounded-full bg-white/20"
//         />
//       </button>
//     </div>
//   </div>
// );

// const SidebarItem: React.FC<SidebarItemProps> = ({
//   icon,
//   text,
//   active = false,
//   hasSubmenu = false,
// }) => (
//   <div
//     className={`flex items-center px-2 md:px-4 py-2 my-1 rounded-lg cursor-pointer ${
//       active ? "bg-gray-100" : "hover:bg-background-grey"
//     }`}
//   >
//     <div className="text-gray-600 mr-2 md:mr-3">{icon}</div>
//     <span className="text-gray-700 flex-1 text-sm md:text-base">{text}</span>
//     {hasSubmenu && <ChevronDown className="h-4 w-4 text-gray-400" />}
//   </div>
// );

// const OrderStat: React.FC<OrderStatProps> = ({ title, value, icon }) => (
//   <div className="bg-white rounded-lg flex font-semibold flex-col">
//     <div className="my-2 md:my-4 mx-2 md:mx-4 text-gray-500 mb-0 text-xs md:text-sm">{title}</div>
//     <div className="text-xl md:text-3xl mx-2 md:mx-4 text-gray-900">{value}</div>
//     <div className="text-xl md:text-2xl text-purple-600 self-end">{icon}</div>
//   </div>
// );

// const StoresStat: React.FC<StoresStatProps> = ({ title, value }) => (
//   <div className="bg-store-card rounded-lg flex font-semibold border-solid border-grey-border border-y-[1px] border-x-[1px] p-2 md:px-[10px] md:py-[10px] md:pt-[8px] justify-between">
//     <div className="flex flex-col">
//       <div className="text-gray-500 text-xs md:text-sm">{title}</div>
//       <div className="text-xl md:text-3xl text-gray-900 text-center">{value}</div>
//     </div>
//     <ChevronRight className="h-4 w-4" />
//   </div>
// );

// const DashboardLayout = () => {
//   return (
//     <div className="flex flex-col h-screen">
//       <TopHeader userName="Aman Kumar" />

//       <div className="flex flex-1 overflow-hidden">
//         <div className="hidden md:block w-64 bg-white border-r border-gray-200">
//           <div className="p-4 md:p-6">
//             <nav className="space-y-1">
//               <SidebarItem icon={<GetStarted />} text="Get Started" />
//               <SidebarItem icon={<Dashboard />} text="Dashboard" active />
//               <SidebarItem icon={<Orders />} text="Orders" hasSubmenu />
//               <SidebarItem icon={<Menu />} text="Menu" hasSubmenu />
//               <SidebarItem icon={<Customers />} text="Customers" />
//               <SidebarItem icon={<Stores />} text="Stores" hasSubmenu />
//               <SidebarItem icon={<Settings />} text="Setting" hasSubmenu />
//             </nav>
//           </div>
//         </div>

//         <div className="flex-1 overflow-auto">
//           <header className="px-4 md:px-6 py-3 md:py-4">
//             <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//               <div className="flex items-center space-x-4">
//                 <button className="md:hidden">
//                   <Menu className="h-6 w-6" />
//                 </button>
//                 <h2 className="text-lg md:text-xl font-semibold text-gray-800">
//                   Analytics
//                 </h2>
//               </div>
//               <div className="flex items-center space-x-3 md:space-x-6 flex-wrap gap-y-2">
//                 <button className="p-2 hover:bg-gray-100 rounded-full">
//                   <Clock className="h-5 w-5 text-gray-600" />
//                 </button>
//                 <div className="flex items-center space-x-3">
//                   <span className="text-gray-600 text-sm">Auto Refresh</span>
//                   <div className="w-12 h-6 bg-purple-600 rounded-full relative cursor-pointer">
//                     <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
//                   </div>
//                 </div>
//                 <button className="bg-white px-3 md:px-4 py-2 border border-gray-200 rounded-md text-gray-600 text-sm">
//                   Today
//                 </button>
//                 <button className="px-3 md:px-4 py-2 bg-purple-600 text-white rounded-md text-sm">
//                   Customise
//                 </button>
//               </div>
//             </div>
//           </header>

//           <div className="p-4 md:p-6">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
//               <Card className="bg-white">
//                 <CardHeader className="pb-2">
//                   <CardTitle className="flex justify-between items-center font-base font-medium text-headding-color">
//                     Revenue
//                     <button className="flex justify-items-center p-1.5 items-center rounded-md border-solid border-grey-border border-y-[1px] border-x-[1px]">
//                       <ChevronRight />
//                     </button>
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-4 p-2 md:p-4">
//                     <StoresStat title="Active Store" value="10" />
//                     <StoresStat title="Inactive Store" value="10" />
//                     <StoresStat title="Open Store" value="10" />
//                     <StoresStat title="Closed Store" value="10" />
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;