import React, { useState } from "react";
import ToggleSwitch from "../../../common/toggleSwitch";
import SurgeDelivery from "./surgedelivery";
import {
  DisplayStoreTimingCard,
  EmailNotificationCard,
  DynamicCards,
  OrderControlCard,
  ScheduledOrderCard,
  InputCardGrid,
  InputCard,
  StoreTimingAvailability,
  DeliveryMode,
} from "../../../common/cards";

// Store settings component
const Store: React.FC = () => {
  // State for all toggles
  const [settings, setSettings] = useState({
    surgeDelivery: true,
    displayStoreTiming: false,
    emailNotification: false,
    maxOrdersPerSlot: false,

    orderControl: false,
    productMultiSelection: false,
    scheduledOrderTimeRange: false,
    setMinimumOrderAmount: false,
    scheduledOrderReminders: false,
  });
  const [selectedDayOption, setSelectedDayOption] =
    useState<string>("everyday");
  const [selectedTimeOption, setSelectedTimeOption] =
    useState<string>("fullTime");
  const [cardData, setCardData] = useState([
    { title: "Minimum Order Amount", placeholder: "Enter amount" },
    { title: "Minimum Pickup Amount", placeholder: "Enter amount" },
  ]);
  const [maxOrdersValue, setMaxOrdersValue] = useState("");

  // Toggle setting state
  const toggleSetting = (setting: keyof typeof settings) => {
    setSettings({
      ...settings,
      [setting]: !settings[setting],
    });
  };

  return (
    <div className="max-w-full rounded-custom12px p-6 md:p-0 sm:p-0 lg:p-0 xl:p-0 sm:max-h-full md:max-h-full lg:max-h-full xl:max-h-full max-h-[80vh] overflow-y-auto sm:overflow-visible md:overflow-visible lg:overflow-visible xl:overflow-visible">
      {/* Header */}
      <div className="flex justify-between items-center mb-2 p-4 rounded-md mt-0 sm:mt-8 md:mt-8 lg:mt-8 xl:8 md:px-1 sm:px-1 lg:px-1 xl:px-1">
        <h1 className="text-[14px] font-inter font-[600] text-headding-color">
          Store
        </h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 text-[12px] font-inter font-[600] text-paragraphBlack">
          Discard
          </button>
          <button className="px-4 py-2 text-[12px] font-inter font-[600] text-whiteColor bg-bgButton border border-reloadBorder rounded-custom">
            Save
          </button>
        </div>
      </div>

      {/* Surge Delivery Section */}
      <div className="rounded-lg p-0 md:p-0 sm:p-0 lg:p-0 xl:p-0 mb-4">
        <div className="mb-10">
          <StoreTimingAvailability
            selectedDayOption={selectedDayOption}
            setSelectedDayOption={setSelectedDayOption}
            selectedTimeOption={selectedTimeOption}
            setSelectedTimeOption={setSelectedTimeOption}
          />
        </div>

        <SurgeDelivery
          title="Surge On Delivery"
          description="Apply dynamic delivery charges based on demand and conditions."
        />
      </div>

      {/* Order Settings */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
        {/* First Column */}
        <div className="space-y-4">
          {/* Minimum Order Amount */}
          <InputCardGrid cards={cardData} />
          {/* Order Placement Email Notification */}
          <EmailNotificationCard
            checked={settings.emailNotification}
            onChange={() => toggleSetting("emailNotification")}
          />

          {/* Maximum Orders Per Slot */}
          <DynamicCards
            checked={settings.maxOrdersPerSlot}
            onChange={() => toggleSetting("maxOrdersPerSlot")}
            title="Maximum Orders Per Slot" // Customize the title
            description="Your custom description here" // Customize the description
            maxOrderLabel="Order Limit" // Optional: Change the label inside the expanded content
            maxOrderPlaceholder="Enter limit (e.g., 50)" // Optional: Change the placeholder
            value={maxOrdersValue} // Track the input value
            variant="WithInputBelow"
            onValueChange={(e) => setMaxOrdersValue(e.target.value)} // Handle value changes
          />

          {/* Order Control with Product Multi-Selection */}
          <OrderControlCard
            orderControlChecked={settings.orderControl}
            onOrderControlChange={() => toggleSetting("orderControl")}
            productMultiSelectionChecked={settings.productMultiSelection}
            onProductMultiSelectionChange={() =>
              toggleSetting("productMultiSelection")
            }
          />
        </div>
        <DynamicCards
          checked={settings.displayStoreTiming}
          onChange={() => toggleSetting("displayStoreTiming")}
          title="Display Store Timing" // Customize the title
          description="Enable to show store operating hours on the listing." // Customize the description
          maxOrderLabel="Order Limit" // Optional: Change the label inside the expanded content
          maxOrderPlaceholder="Enter limit (e.g., 50)" // Optional: Change the placeholder
          value={maxOrdersValue} // Track the input value
          onValueChange={(e) => setMaxOrdersValue(e.target.value)} // Handle value changes
        />
        {/* Second Column */}
        <div className="space-y-4">
          {/* Display Store Timing */}
          <DisplayStoreTimingCard
            checked={settings.displayStoreTiming}
            onChange={() => toggleSetting("displayStoreTiming")}
          />

          {/* Preparation Time */}
          <div className="bg-white rounded-lg p-6 mb-4">
            <h2 className="text-[14px] font-inter font-[500] text-textHeading mb-2">
              Preparation Time
            </h2>
            <p className="text-[12px] font-inter font-[500] text-cardTitle mb-4">
              Set the default order preparation time. Adjust it for specific
              orders in the order list before accepting. Requires accept/reject
              enabled for edits after order placement.
            </p>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter preparation time in minutes"
                className="w-full border border-reloadBorder rounded-custom8px px-3 py-2 pr-10 text-[14px] font-inter font-[400] placeholder:text-reloadBorder focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Scheduled Order Time Range */}

          <ScheduledOrderCard
            timeRangeChecked={settings.scheduledOrderTimeRange}
            onTimeRangeChange={() => toggleSetting("scheduledOrderTimeRange")}
            minOrderChecked={settings.setMinimumOrderAmount}
            onMinOrderChange={() => toggleSetting("setMinimumOrderAmount")}
            remindersChecked={settings.scheduledOrderReminders}
            onRemindersChange={() => toggleSetting("scheduledOrderReminders")}
          />

          {/* <DisplayStoreTimingCard
            checked={settings.displayStoreTiming}
            onChange={() => toggleSetting("displayStoreTiming")}
          /> */}

          <DeliveryMode
            onSave={() => console.log("Delivery mode settings saved")}
          />
        </div>
      </div>
    </div>
  );
};

export default Store;
