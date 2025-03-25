import React, { useState } from "react";
import { SidebarNavProps } from "../../types";
import SidebarItem from "../../common/sidebarItem";
import GetStarted from "../../assets/images/getStarted.svg";
import Dashboard from "../../assets/images/dashboard.svg";
import Stores from "../../assets/images/stores.svg";
import Settings from "../../assets/images/settings.svg";
import Orders from "../../assets/images/orders.svg";
import Menu from "../../assets/images/menu.svg";
import Customers from "../../assets/images/customers.svg";
import { useNavigate } from "react-router-dom";

const SidebarNav: React.FC<SidebarNavProps> = ({
  onSettingsSubItemClick,
  onItemClick,
  currentView,
  setCurrentView
}) => {
  const navigate = useNavigate();
  const [selectedSubItem, setSelectedSubItem] = useState<string | null>(null);
  const settingsSubItems = [
    { text: "General" },
    { text: "Integration" },
    { text: "Configurations" },
    { text: "Marketplace Design" },
  ];
  const handleSubItemClick = (item: string) => {
      const path = `${currentView}/${item.toLocaleLowerCase().replace(' ', '_')}`
      navigate(path);
    setSelectedSubItem(item);
    onSettingsSubItemClick(item);
  };

  const handleItemClick = (view: string) => {
    navigate(`/${view}`);
    onItemClick(view);
  };
  return (
    <nav className="space-y-1">
      <SidebarItem
        icon={<img src={GetStarted} />}
        text="Get Started"
        onClick={() => handleItemClick("")}
        active={currentView === "get_started"}
      />
      <SidebarItem
        icon={<img src={Dashboard} />}
        text="Dashboard"
        onClick={() => handleItemClick("")}
        active={currentView === "dashboard"}
      />
      <SidebarItem
        icon={<img src={Orders} />}
        text="Orders"
        onClick={() => handleItemClick("orders")}
        hasSubmenu
      />
      <SidebarItem icon={<img src={Menu} />} text="Menu" hasSubmenu />
      <SidebarItem icon={<img src={Customers} />} text="Customers" />
      <SidebarItem
        icon={<img src={Stores} />}
        text="Stores"
        onClick={() => handleItemClick("stores")}
        active={currentView === "stores"}
        hasSubmenu
      />
      <SidebarItem
        icon={<img src={Settings} />}
        text="Settings"
        subItems={settingsSubItems}
        selectedSubItem={selectedSubItem}
        onSubItemClick={handleSubItemClick}
        onClick={() => setCurrentView('settings')}
        active={currentView === "settings"}
        hasSubmenu
      />
    </nav>
  );
};

export default SidebarNav;
