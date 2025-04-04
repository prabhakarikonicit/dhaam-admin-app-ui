import React, { useState } from "react";
import ToggleSwitch from "../../../common/toggleSwitch";
import { ChevronDown } from "lucide-react";

interface PermissionSectionProps {
  section: Permission;
  onToggle: (sectionId: string, actionId?: string) => void;
  isExpanded: boolean;
  onExpand: () => void;
}
interface AddStaffProps {
  onClose: () => void;
  onSave: (data: any) => void;
}
interface Permission {
  id: string;
  name: string;
  enabled: boolean;
  actions: {
    id: string;
    name: string;
    enabled: boolean;
  }[];
  isCollapsible?: boolean;
}

interface PermissionSectionProps {
  section: Permission;
  onToggle: (sectionId: string, actionId?: string) => void;
  isExpanded: boolean;
  onExpand: () => void;
}

const PermissionSection: React.FC<PermissionSectionProps> = ({
  section,
  onToggle,
  isExpanded,
  onExpand,
}) => {
  const handleToggle = (e: React.MouseEvent) => {
    onToggle(section.id);
  };

  const handleActionToggle = (actionId: string) => (e: React.MouseEvent) => {
    onToggle(section.id, actionId);
  };

  return (
    <div className="rounded-custom12px overflow-hidden border border-reloadBorder">
      <div
        className={`flex items-center border-b bg-background-grey justify-between p-4 ${
          section.isCollapsible ? "cursor-pointer" : ""
        }`}
        onClick={section.isCollapsible ? onExpand : undefined}
      >
        <span className="text-[14px] font-inter font-[500] text-gray-900 ">
          {section.name}
        </span>
        <div className="flex items-center gap-3">
          {section.actions.length > 0 && (
            <ToggleSwitch checked={section.enabled} onChange={handleToggle} />
          )}
          {section.isCollapsible && (
            <ChevronDown
              className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                isExpanded ? "transform rotate-180" : ""
              }`}
            />
          )}
        </div>
      </div>

      {section.actions.length > 0 &&
        section.enabled &&
        !section.isCollapsible && (
          <div className="divide-y divide-gray-200">
            {section.actions.map((action) => (
              <div
                key={action.id}
                className="flex items-center justify-between p-4 pl-8 bg-white"
              >
                <span className="text-[14px] font-inter text-gray-700">
                  {action.name}
                </span>
                <ToggleSwitch
                  checked={action.enabled}
                  onChange={handleActionToggle(action.id)}
                />
              </div>
            ))}
          </div>
        )}

      {section.isCollapsible && isExpanded && (
        <div className="bg-white p-4"> {/* Added bg-white here */}
        <div className="border-t border-gray-200 p-4">
          <div className="text-[14px] font-inter text-gray-600">
            Content for {section.name}
          </div>
        </div>
        </div>
      )}
    </div>
  );
};
const AddStaff: React.FC<{
  onClose: () => void;
  onSave: (data: any) => void;
}> = ({ onClose, onSave }) => {
  const [staffName, setStaffName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTab, setSelectedTab] = useState("General");
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const menuItems: string[] = [
    "General",
    "Marketing",
    "Order Setting",
    "User Setting",
    "Marketplace",
    "General Setting",
    "Agent Integration",
    "Master Brand",
  ];
  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const [permissions, setPermissions] = useState<Permission[]>([
    {
      id: "1",
      name: "Orders",
      enabled: true,
      actions: [
        { id: "1-1", name: "Create", enabled: false },
        { id: "1-2", name: "View", enabled: true },
        { id: "1-3", name: "Edit", enabled: false },
      ],
    },
    {
      id: "2",
      name: "Stores",
      enabled: true,
      actions: [
        { id: "2-1", name: "Create", enabled: false },
        { id: "2-2", name: "View", enabled: false },
        { id: "2-3", name: "Edit", enabled: false },
      ],
    },
    {
      id: "3",
      name: "Store Configuration",
      enabled: false,
      actions: [],
      isCollapsible: true,
    },
    {
      id: "4",
      name: "Catalogue",
      enabled: false,
      actions: [],
      isCollapsible: true,
    },
    {
      id: "5",
      name: "Customer",
      enabled: false,
      actions: [],
      isCollapsible: true,
    },
    {
      id: "6",
      name: "Analytics",
      enabled: false,
      actions: [],
      isCollapsible: true,
    },
    {
      id: "7",
      name: "Wallet",
      enabled: false,
      actions: [],
      isCollapsible: true,
    },
  ]);

  const renderPermissionContent = () => {
    if (selectedTab === "General") {
      return (
        <div className="space-y-4 ">
          {permissions.map((section) => (
            <PermissionSection
              key={section.id}
              section={section}
              onToggle={(sectionId, actionId) => {
                setPermissions((prev) =>
                  prev.map((section) => {
                    if (section.id === sectionId) {
                      if (actionId) {
                        return {
                          ...section,
                          actions: section.actions.map((action) => {
                            if (action.id === actionId) {
                              return { ...action, enabled: !action.enabled };
                            }
                            return action;
                          }),
                        };
                      }
                      return { ...section, enabled: !section.enabled };
                    }
                    return section;
                  })
                );
              }}
              isExpanded={expandedSections.includes(section.id)}
              onExpand={() => toggleSection(section.id)}
            />
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="">
      <div className="flex items-center justify-between p-6 bg-backgroundWhite rounded-custom12px">
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="bg-backgroundWhite border border-reloadBorder p-2 rounded-custom"
          >
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
                d="M6.79537 11.695C6.522 11.9683 6.07878 11.9683 5.80542 11.695L1.60542 7.49498C1.33205 7.22161 1.33205 6.7784 1.60542 6.50503L5.80542 2.30503C6.07878 2.03166 6.522 2.03166 6.79537 2.30503C7.06873 2.5784 7.06873 3.02161 6.79537 3.29498L3.79034 6.30001H11.9004C12.287 6.30001 12.6004 6.61341 12.6004 7.00001C12.6004 7.38661 12.287 7.70001 11.9004 7.70001L3.79034 7.70001L6.79537 10.705C7.06873 10.9784 7.06873 11.4216 6.79537 11.695Z"
                fill="#212121"
              />
            </svg>
          </button>
          <h2 className="text-[14px] font-inter font-[600] text-paragraphBlack">
            Add new staff
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-[12px] font-inter font-[600] text-cardValue "
          >
            Discard
          </button>
          <button
            onClick={() => onSave({ staffName, description, permissions })}
            className="px-4 py-2 text-[12px] font-inter font-[600] text-whiteColor bg-bgButton rounded-custom"
          >
            Save
          </button>
        </div>
      </div>

      <div className=" mt-4">
        <div className="space-y-6 p-6 bg-backgroundWhite rounded-custom12px">
          {/* Staff Name */}
          <div>
            <label className="block text-[12px] font-inter font-[500] text-paragraphBlack mb-2">
              Staff Name*
            </label>
            <input
              type="text"
              value={staffName}
              onChange={(e) => setStaffName(e.target.value)}
              className="w-full px-3 py-4 border border-reloadBorder rounded-custom8px text-[14px] font-inter font-[400]"
              placeholder="Store Manager"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-[14px] font-inter font-[500] text-paragraphBlack mb-2">
              Description
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-4 border border-reloadBorder rounded-custom8px text-[14px] font-inter font-[400]"
              placeholder="Lorem ipsum"
            />
          </div>
          <div className="flex w-full gap-8 ">
            <div className="flex-1 border-r border-gray-100">
              <label className="block text-[14px] font-inter font-[500] text-paragraphBlack mb-2">
                Email
              </label>
              <input
                type="email"
                // value={email}
                // onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-4 border border-reloadBorder rounded-custom8px text-[14px] font-inter font-[400]"
                placeholder="Enter email"
              />
            </div>

            <div className="flex-1 ">
              <label className="block text-[14px] font-inter font-[500] text-paragraphBlack mb-2">
                Password
              </label>
              <input
                type="password"
                // value={password}
                // onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-4 border border-reloadBorder rounded-custom8px text-[14px] font-inter font-[400]"
                placeholder="Set password"
              />
            </div>
          </div>
          </div>
         

          <div className="mt-5">
          <h3 className="text-[14px] font-inter font-[600] text-headding-color mb-4 ms-2">
              Permissions
            </h3>
            </div>
          {/* Permissions */}
            <div className="grid grid-cols-4 gap-20 ">
              {/* Left Sidebar */}
              <div className="space-y-2 bg-backgroundWhite p-3 rounded-custom12px w-56">
                {menuItems.map((item) => (
                  <button
                    key={item}
                    onClick={() => setSelectedTab(item)}
                    className={`text-[14px] font-inter w-full text-left px-4 py-2 rounded transition-colors
                      ${
                        selectedTab === item
                          ? "bg-subMenus text-verifyOtp font-[500] p-0"
                          : "text-headding-color font-[400]"
                      }`}
                  >
                    {item}
                  </button>
                ))}
              </div>

              {/* Right Content */}
              <div className="col-span-3 rounded-custom12px">{renderPermissionContent()}</div>
            </div>
   
       
      </div>
    </div>
  );
};

export default AddStaff;