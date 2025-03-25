import ReactDOM from "react-dom/client";
import {
//   RemoteOrderDivComponent,
RemoteSettingsConfigsComponent,
RemoteSettingsMarketPlaceDesignComponent,
//   RemoteStoreDivComponent,
//   RemoteAdminDivComponent,
} from "./remoteComponents";
import "./App.css";
import "dhaam_settings_app_ui/tailwindStyles";
import "./index.css";
import SidebarNav from "./localComponents/sidebarNav";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TopHeader from "./localComponents/topHeader";

const App = () => {
  const [selectedSettingsItem, setSelectedSettingsItem] = useState<
    string | null
  >(null);
  const [currentView, setCurrentView] = useState("dashboard");
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [showSidebar, setShowSidebar] = useState(width >= 640);
  const [showCloseIcon, setShowCloseIcon] = useState(width < 375);
  const handleSettingsSubItemClick = (item: string) => {
    setSelectedSettingsItem(item);
    setCurrentView("settings");
  };
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
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
    setShowSidebar(width >= 640);
    setShowCloseIcon(width < 375);
  }, [width]);
  // <div className="mt-10 text-3xl mx-auto max-w-6xl">
  //   <div>Name: dhaam_main_app_ui</div>
  //   <div>Framework: react-19</div>
  //   <RemoteOrderDivComponent/>
  //   <RemoteSettingsDivComponent/>
  //   <RemoteStoreDivComponent/>
  //   <RemoteAdminDivComponent/>
  // </div>
  return (
    <BrowserRouter>
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
            fixed sm:relative force-relative inset-y-0 left-0 
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
                onItemClick={handleItemClick}
                currentView={currentView}
                setCurrentView={setCurrentView}
              />

              {/* </nav> */}
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 overflow-hidden">
            <Routes>
              {/* <Route path="/stores" element={<RemoteStoreDivComponent />} /> */}
              <Route
                path="/settings/configurations"
                element={<RemoteSettingsConfigsComponent />}
              />
              <Route
                path="/settings/marketplace_design"
                element={<RemoteSettingsMarketPlaceDesignComponent />}
              />
              {/* <Route path="/orders" element={<RemoteOrderDivComponent />} /> */}
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);

root.render(<App />);
