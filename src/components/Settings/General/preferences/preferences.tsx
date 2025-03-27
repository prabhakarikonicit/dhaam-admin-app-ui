import React, { useState } from "react";
import ToggleSwitch from "../../../common/toggleSwitch";

interface PreferenceOption {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}
const Preferences: React.FC = () => {
  const [preferences, setPreferences] = useState<PreferenceOption[]>([
    {
      id: "orderControl",
      title: "Order Control",
      description:
        "Allow store add side items or categories to complement main orders.",
      enabled: true,
    },
    {
      id: "analytics",
      title: "Analytics & Insights",
      description: "Track and analyze platform performance and store activity.",
      enabled: false,
    },
    {
      id: "deliveryZone",
      title: "Delivery Zone Radius",
      description: "Set the maximum delivery distance for stores.",
      enabled: false,
    },
    {
      id: "privacyControl",
      title: "Privacy Control for Customer Info",
      description: "Prevent stores from seeing customer contact details.",
      enabled: false,
    },
    {
      id: "customerProfile",
      title: "Customer Profile Visibility",
      description: "Allow stores to view customer profiles.",
      enabled: false,
    },
    {
      id: "ratings",
      title: "Ratings & Feedback",
      description: "Enable customers to rate their orders and experience.",
      enabled: false,
    },
    {
      id: "addressConfirmation",
      title: "Address Confirmation Before Order Ready",
      description:
        "Require customers to confirm their address before marking an order as ready.",
      enabled: false,
    },
  ]);

  const handleToggle = (prefId: string) => (e: React.MouseEvent) => {
    setPreferences((prev) =>
      prev.map((pref) =>
        pref.id === prefId ? { ...pref, enabled: !pref.enabled } : pref
      )
    );
  };
  return (
    <div className="max-w-full p-0 rounded-lg sm:max-h-full md:max-h-full lg:max-h-full xl:max-h-full max-h-[80vh] overflow-y-auto sm:overflow-visible md:overflow-visible lg:overflow-visible xl:overflow-visible">
      <div className="mb-6">
        <h2 className="text-[14px] font-inter font-[600] text-headding-color">
          Preferences
        </h2>
      </div>

      <div className="space-y-6 bg-backgroundWhite p-6 rounded-custom12px">
        {preferences.map((pref) => (
          <div 
            key={pref.id}
            className="flex items-center justify-between py-4 border-b border-grey-border last:border-0"
          >
            <div>
              <h3 
                id={`${pref.id}-title`}
                className="text-[12px] md:text-[14px] sm:text-[14px] lg:text-[14px] xl:text-[14px]font-inter font-[500] font-inter text-textHeading  mb-1"
              >
                {pref.title}
              </h3>
              <p 
                id={`${pref.id}-description`}
                className="text-[12px] md:text-[14px] sm:text-[14px] lg:text-[14px] xl:text-[14px] font-inter text-cardTitle"
              >
                {pref.description}
              </p>
            </div>
            <ToggleSwitch
              checked={pref.enabled}
             
              onChange={handleToggle(pref.id)}
              aria-labelledby={`${pref.id}-title`}
              aria-describedby={`${pref.id}-description`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Preferences;
