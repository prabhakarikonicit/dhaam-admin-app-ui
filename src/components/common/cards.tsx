import React, { useState } from "react";
import ToggleSwitch from "./toggleSwitch";

interface CardProps {
  title: string;
  description?: string;
  toggleChecked?: boolean;
  onToggleChange?: (e: React.MouseEvent) => void;
  children?: React.ReactNode;
}
interface DeliveryModeProps {
  onSave?: () => void;
}

// Main DeliveryMode Component
export const DeliveryMode: React.FC<DeliveryModeProps> = ({
  onSave = () => {},
}) => {
  // State for delivery modes and other settings
  const [settings, setSettings] = useState({
    takeAway: false,
    homeDelivery: true,
    deliveryManager: false,
    customOrderFields: false,
    deliveryManagement: "store", // 'admin' or 'store'
  });

  // State for slot interval input
  const [slotInterval, setSlotInterval] = useState("");

  // Toggle setting state
  const toggleSetting = (setting: keyof typeof settings) => {
    if (typeof settings[setting] === "boolean") {
      setSettings({
        ...settings,
        [setting]: !settings[setting],
      });
    }
  };

  // Set delivery management option
  const setDeliveryManagement = (option: "admin" | "store") => {
    setSettings({
      ...settings,
      deliveryManagement: option,
    });
  };

  // Handle slot interval change
  const handleSlotIntervalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlotInterval(e.target.value);
  };

  // Handle save button click
  const handleSave = () => {
    // Perform save operation
    onSave();
  };

  return (
    <div className="space-y-4">
      {/* Delivery Mode Card */}
      <div className="bg-white rounded-lg p-6">
        <div className="mb-4">
          <h2 className="text-[14px] font-inter font-[500] text-textHeading">
            Delivery Mode
          </h2>
          <p className="text-[12px] font-inter font-[500]  text-cardTitle">
            Choose delivery modes. Merchants can enable both Home Delivery and
            Takeaway
          </p>
        </div>

        {/* Delivery Mode Options */}
        <div className="space-y-4 border-t pt-4">
          {/* Take Away Option */}
          <div className="flex items-center border-b py-4">
            <div className="relative flex items-center justify-center">
              <input
                type="checkbox"
                id="takeaway"
                checked={settings.takeAway}
                onChange={() => toggleSetting("takeAway")}
                className="appearance-none h-5 w-5 rounded-md border border-cardValue 
                  checked:bg-bgButton checked:border-bgButton focus:outline-none"
              />
              {settings.takeAway && (
                <svg
                  className="absolute w-3 h-3 text-white pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              )}
            </div>
            <label
              htmlFor="takeaway"
              className="ml-3 text-[14px] font-inter font-[400] text-textHeading"
            >
              Take Away
            </label>
          </div>

          {/* Home Delivery Option */}
          <div className="flex items-center">
            <div className="relative flex items-center justify-center">
              <input
                type="checkbox"
                id="homeDelivery"
                checked={settings.homeDelivery}
                onChange={() => toggleSetting("homeDelivery")}
                className="appearance-none h-5 w-5 rounded-md border border-cardValue 
                  checked:bg-bgButton checked:border-bgButton focus:outline-none"
              />
              {settings.homeDelivery && (
                <svg
                  className="absolute w-3 h-3 text-white pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              )}
            </div>
            <label
              htmlFor="homeDelivery"
              className="ml-3 text-[14px] font-inter font-[500] text-textHeading"
            >
              Home Delivery
            </label>
          </div>
        </div>

        {/* Slot Interval Section - only visible if homeDelivery is enabled */}
        {settings.homeDelivery && (
          <div className="mt-4">
            <h3 className="text-[14px] font-inter font-[500] text-textHeading mb-2">
              Slot Interval (In Minutes)
            </h3>
            <input
              type="text"
              placeholder="Enter Slot"
              value={slotInterval}
              onChange={handleSlotIntervalChange}
              className="w-full border rounded-md px-3 py-4 border border-reloadBorder text-[14px] font-inter font-[400] text-reloadBorder rounded-custom8px focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        )}

        {/* Save Button */}
        <div className="flex justify-end mt-4">
          <button
            onClick={handleSave}
            className="px-4 py-2 text-[12px] font-inter font-[600] bg-backgroundWhite text-cardValue border border-reloadBorder rounded-custom"
          >
            Save
          </button>
        </div>
      </div>

      {/* Delivery Manager Card */}
      <div className="bg-white rounded-lg p-6">
        <div className="flex justify-between items-center mb-2">
          <div>
            <h2 className="text-[14px] font-inter font-[500] text-textHeading">
              Delivery Manager
            </h2>
            <p className="hidden md:block text-[12px] font-inter font-[500] text-cardTitle">
              Configure delivery management settings for order fulfillment and
              logistics.
            </p>
            <p className="block md:hidden text-[12px] font-inter font-[500] text-cardTitle">
              Configure delivery management settings <br />
              for order fulfillment and logistics.
            </p>
          </div>
          <ToggleSwitch
            checked={settings.deliveryManager}
            onChange={() => toggleSetting("deliveryManager")}
            aria-labelledby="delivery-manager"
          />
        </div>

        {/* Management Options - only visible if deliveryManager is enabled */}
        {settings.deliveryManager && (
          <div className="mt-4 space-y-4">
            <div className="flex items-center">
              {/* Admin radio button */}
              <div className="relative flex items-center">
                <input
                  type="radio"
                  id="admin"
                  name="deliveryManagement"
                  checked={settings.deliveryManagement === "admin"}
                  onChange={() => setDeliveryManagement("admin")}
                  className="sr-only"
                />
                <div
                  onClick={() => setDeliveryManagement("admin")}
                  className={`w-6 h-6 rounded-full border flex items-center justify-center cursor-pointer ${
                    settings.deliveryManagement === "admin"
                      ? "border-1 border-bgButton rounded-custom36px"
                      : "border border-cardValue rounded-custom28px"
                  }`}
                >
                  {settings.deliveryManagement === "admin" && (
                    <div className="w-3.5 h-3.5 rounded-full bg-bgButton"></div>
                  )}
                </div>
                <label
                  htmlFor="admin"
                  className="ml-3 text-[14px] font-inter font-[500] text-textHeading cursor-pointer"
                >
                  Admin
                </label>
              </div>

              {/* Store radio button */}
              <div className="flex ml-4 items-center">
                <div className="relative">
                  <input
                    type="radio"
                    id="store"
                    name="deliveryManagement"
                    checked={settings.deliveryManagement === "store"}
                    onChange={() => setDeliveryManagement("store")}
                    className="sr-only"
                  />
                  <div
                    onClick={() => setDeliveryManagement("store")}
                    className={`w-6 h-6 border flex items-center justify-center cursor-pointer ${
                      settings.deliveryManagement === "store"
                        ? "border-1 border-bgButton rounded-custom36px"
                        : "border border-cardValue rounded-custom28px"
                    }`}
                  >
                    {settings.deliveryManagement === "store" && (
                      <div className="w-3.5 h-3.5 rounded-custom bg-bgButton"></div>
                    )}
                  </div>
                </div>
                <label
                  htmlFor="store"
                  className="ml-3 text-[14px] font-inter font-[500] text-textHeading cursor-pointer"
                >
                  Store
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
// Basic card component with toggle

// export const ToggleCard: React.FC<CardProps> = ({
//   title,
//   description,
//   toggleChecked = false,
//   onToggleChange = () => {},
//   children
// }) => {
//   return (
//     <div className="bg-white rounded-lg p-6 mb-4">
//       <div className="flex justify-between items-center">
//         <div>
//           <h2 className="text-[12px] md:text-[14px] sm:text-[14px] lg:text-[14px] xl:text-[14px] font-inter font-[500] text-paragraphBlack leading-[21px]">{title}</h2>
//           {description && <p className="text-[10px] md:text-[12px] sm:text-[12px] lg:text-[12px] xl:text-[12px] font-inter font-[500px] text-cardTitle leading-[21px] break-words">{description}</p>}

//         </div>
//         <ToggleSwitch
//           checked={toggleChecked}
//           onChange={onToggleChange}
//           aria-labelledby={`toggle-${title.replace(/\s+/g, '-').toLowerCase()}`}
//         />
//       </div>
//       {children && <div className="mt-4">{children}</div>}
//     </div>
//   );
// };

export const ToggleCard: React.FC<CardProps> = ({
  title,
  description,
  input,
  toggleChecked = false,
  onToggleChange = () => {},
  actionButton = null,
  children,
  variant = "default",
}) => {
  // Image 1 style - compact with title/toggle on same line, "Add New" button on right
  if (variant === "compact") {
    return (
      <div className="bg-white rounded-custom12px p-4 mb-4">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-baseline gap-3">
            <h2 className="text-[14px] font-inter font-[500] text-textHeading leading-[21px]">
              {title}
            </h2>
            <ToggleSwitch
              checked={toggleChecked}
              onChange={onToggleChange}
              aria-labelledby={`toggle-${title
                .replace(/\s+/g, "-")
                .toLowerCase()}`}
            />
          </div>
          {actionButton && <div>{actionButton}</div>}
        </div>
        {description && (
          <p className="text-[12px] font-inter font-[500] text-cardTitle mt-1">
            {description}
          </p>
        )}
        {children && <div className="mt-4">{children}</div>}
      </div>
    );
  }

  // Image 2 style - default with title/description on left, toggle on right
  else if (variant === "default") {
    return (
      <div className="bg-white rounded-custom12px p-4 md:p-6 mb-4">
        <div className="flex justify-between items-center w-full">
          <div>
            <h2 className="text-[14px] font-inter font-[500] text-textHeading leading-[21px]">
              {title}
            </h2>
            {description && (
              <p className="text-[12px] font-inter font-[500] text-cardTitle mt-1 leading-[21px]">
                {description}
              </p>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <ToggleSwitch
              checked={toggleChecked}
              onChange={onToggleChange}
              aria-labelledby={`toggle-${title
                .replace(/\s+/g, "-")
                .toLowerCase()}`}
            />
            {actionButton}
          </div>
        </div>
        {children && <div className="mt-4">{children}</div>}
      </div>
    );
  }
  // Image 3 style - With input field below
  else if (variant === "WithInputBelow") {
    return (
      <div className="bg-white rounded-custom12px p-4 md:p-6 mb-4">
        <div className="flex justify-between items-center w-full">
          <div>
            <h2 className="text-[14px] font-inter font-[500] text-textHeading leading-[21px]">
              {title}
            </h2>
            {description && (
              <p className="text-[12px] font-inter font-[500] text-cardTitle mt-1 leading-[21px]">
                {description}
              </p>
            )}
          </div>
  
          <div className="flex items-center space-x-4">
            <ToggleSwitch
              checked={toggleChecked}
              onChange={onToggleChange}
              aria-labelledby={`toggle-${title
                .replace(/\s+/g, "-")
                .toLowerCase()}`}
            />
            {actionButton}
          </div>
        </div>
        
        {toggleChecked && (
          <>
            <div className="mt-4">
              <h3 className="text-[14px] font-inter font-[500] text-textHeading leading-[21px] mb-2">
                {input}
              </h3>
            </div>
            <div>
              <input
                type="text"
                className="w-full border border-reloadBorder bg-backgroundWhite rounded-custom8px px-3 py-4 text-[14px] focus:outline-none focus:ring-2 focus:ring-purple-500 font-inter font-[400]"
                placeholder="Enter the maximum order limit per slot"
              />
            </div>
          </>
        )}
        
        {children && <div className="mt-4">{children}</div>}
      </div>
    );
  }

  // Default return as a fallback - this fixes the TypeScript error
  return (
    <div className="bg-white rounded-custom12px p-4 md:p-6 mb-4">
      <div className="flex justify-between items-center w-full">
        <div>
          <h2 className="text-[14px] font-inter font-[500] text-textHeading leading-[21px]">
            {title}
          </h2>
          {description && (
            <p className="text-[12px] font-inter font-[500] text-cardTitle mt-1 leading-[21px]">
              {description}
            </p>
          )}
        </div>
        <div className="flex items-center space-x-4">
          <ToggleSwitch
            checked={toggleChecked}
            onChange={onToggleChange}
            aria-labelledby={`toggle-${title
              .replace(/\s+/g, "-")
              .toLowerCase()}`}
          />
          {actionButton}
        </div>
      </div>
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
};
interface CardProps {
  title: string;
  description?: string;
  input?: string;
  placeholder?: string;
  toggleChecked?: boolean;
  onToggleChange?: (e: React.MouseEvent) => void;
  actionButton?: React.ReactNode; // Added the actionButton property
  children?: React.ReactNode;
  variant?: "compact" | "default" | "WithInputBelow";
}

// InputCard component - this appears to already exist in your code as InputCardDemo
export const InputCard: React.FC<CardProps> = ({
  title,
  placeholder = "Enter amount",
}) => {
  return (
    <div className="rounded-custom12px p-6 bg-white">
      <h2 className="text-[14px] md:text-[14px] sm:text-[14px] lg:text-[14px] xl:text-[14px]  font-inter font-[500] text-textHeading">
        {title}
      </h2>
      <div className="mt-4">
        <input
          type="text"
          placeholder={placeholder}
          className="w-full border border-reloadBorder bg-backgroundWhite rounded-custom8px px-3 py-4 text-[10px] md:text-[14px] sm:text-[14px] lg:text-[14px] xl:text-[14px] focus:outline-none focus:ring-2 focus:ring-purple-500 font-inter font-[400] placeholder:text-reloadBorder"
        />
      </div>
    </div>
  );
};

// InputCardGrid component
export const InputCardGrid: React.FC<{ cards: CardProps[] }> = ({ cards }) => {
  return (
    <div className="grid md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 grid-cols-2 gap-4 ">
      {cards.map((card, index) => (
        <InputCard
          key={index}
          title={card.title}
          placeholder={card.placeholder}
        />
      ))}
    </div>
  );
};

// Time input component with clock icon
export const TimeInput: React.FC<{ placeholder: string }> = ({
  placeholder,
}) => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder={placeholder}
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
  );
};

// Display Store Timing Card
export const DisplayStoreTimingCard: React.FC<{
  checked: boolean;
  onChange: (e: React.MouseEvent) => void;
}> = ({ checked, onChange }) => {
  return (
    <ToggleCard
      title="Order Placement Email Notification"
      description="Send an email confirmation when an order is placed."
      toggleChecked={checked}
      onToggleChange={onChange}
    />
  );
};

// Order Placement Email Notification Card
export const EmailNotificationCard: React.FC<{
  checked: boolean;
  onChange: (e: React.MouseEvent) => void;
}> = ({ checked, onChange }) => {
  return (
    <ToggleCard
      title="Order Placement Email Notification"
      description="Send an email confirmation when an order is placed."
      toggleChecked={checked}
      onToggleChange={onChange}
    >
      <button className="mt-2 border border-reloadBorder px-4 py-2 rounded-custom text-[10px] md:text-[12px] sm:text-[12px] lg:text-[12px] xl:text-[12px] font-inter font-[600] text-cardValue">
        View Email Template
      </button>
    </ToggleCard>
  );
};

// Maximum Orders Per Slot Card
export const DynamicCards: React.FC<{
  checked: boolean;
  onChange: (e: React.MouseEvent) => void;
  title?: string;
  description?: string;
  maxOrderLabel?: string;
  maxOrderPlaceholder?: string;
  value?: string;
  actionButton?: React.ReactNode;
  variant?: "default" | "compact" | "WithInputBelow";
  onValueChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({
  checked,
  onChange,
  title = "Maximum Orders Per Slot",
  description = "Set the maximum number of orders allowed per time slot.",
  actionButton = null,
  variant = "default",
  maxOrderLabel = "Max Orders per Slot",
  maxOrderPlaceholder = "Enter the maximum order limit per slot",
  value = "",
  onValueChange = () => {}
}) => {
  return (
    <ToggleCard
    title={title}
    description={description}
    toggleChecked={checked}
    onToggleChange={onChange}
    actionButton={actionButton}
    variant={variant}
    input={maxOrderLabel}
    >
       {checked && variant !== "WithInputBelow" && (
        <div>
          <h3 className="text-[14px] font-inter font-[500] text-textHeading mb-2">{maxOrderLabel}</h3>
          <input
            type="text"
            placeholder={maxOrderPlaceholder}
            value={value}
            onChange={onValueChange}
            className="w-full border border-reloadBorder bg-backgroundWhite rounded-custom8px px-3 py-4 text-[14px] focus:outline-none focus:ring-2 focus:ring-purple-500 font-inter font-[400]"
          />
        </div>
      )}
    </ToggleCard>
  );
};
// Order Control Card with Product Multi-Selection
export const OrderControlCard: React.FC<{
  orderControlChecked: boolean;
  onOrderControlChange: (e: React.MouseEvent) => void;
  productMultiSelectionChecked: boolean;
  onProductMultiSelectionChange: (e: React.MouseEvent) => void;
}> = ({
  orderControlChecked,
  onOrderControlChange,
  productMultiSelectionChecked,
  onProductMultiSelectionChange,
}) => {
  return (
    <div className="bg-white rounded-lg p-6 mb-4">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h2 className="text-[14px] font-inter font-[500] text-textHeading">
            Order Control
          </h2>
          <p className="text-[12px] font-inter font-[500] text-cardTitle">
            Allow stores to accept or reject orders automatically.
          </p>
        </div>
        <ToggleSwitch
          checked={orderControlChecked}
          onChange={onOrderControlChange}
          aria-labelledby="order-control"
        />
      </div>

      {orderControlChecked && (
        <div className="mt-4 mb-6">
          <h3 className="text-[14px] font-inter font-[500] text-textHeading mb-2">
            Order Acceptance Time (In Minutes)
          </h3>
          <TimeInput placeholder="Enter Time" />
        </div>
      )}

      <div className="pt-6 border-t">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-[14px] font-inter font-[500] text-textHeading">
              Product Multi-Selection
            </h2>
            <p className="text-[12px] font-inter font-[500] text-cardTitle">
              Allow customers to select multiple products
              <br /> within a category or option group.
            </p>
          </div>
          <ToggleSwitch
            checked={productMultiSelectionChecked}
            onChange={onProductMultiSelectionChange}
            aria-labelledby="product-multi-selection"
          />
        </div>
      </div>
    </div>
  );
};
interface StoreTimingAvailabilityProps {
  selectedDayOption: string;
  setSelectedDayOption: (option: string) => void;
  selectedTimeOption: string;
  setSelectedTimeOption: (option: string) => void;
}

// Define option type
interface Option {
  id: string;
  label: string;
}
export const StoreTimingAvailability = ({
  selectedDayOption,
  setSelectedDayOption,
  selectedTimeOption,
  setSelectedTimeOption,
}: StoreTimingAvailabilityProps) => {
  // Day options
  const dayOptions: Option[] = [
    { id: "everyday", label: "Everyday" },
    { id: "specificDay", label: "Specific Day" },
  ];

  // Time options
  const timeOptions: Option[] = [
    { id: "fullTime", label: "Full-time" },
    { id: "specificTime", label: "Specific time" },
  ];

  return (
    <div>
      <div className="mb- rounded-tl-custom8px rounded-tr-custom8px border border-reloadBorder p-4">
        <h2 className="text-textHeading font-inter text-[14px] font-[500] leading-[21px]">
          Store Timing & Availability
        </h2>
        <p className="text-[12px] font-inter font-[500] text-cardTitle leading-[21px]">
          Set your store timing and availability.
        </p>
      </div>
      <div className="bg-backgroundWhite rounded-bl-custom8px rounded-br-custom8px border border-reloadBorder p-4 ">
        {/* Day Options */}
        <div className="py-4">
          {dayOptions.map((option, index) => (
            <div
              key={option.id}
              className={`py-3 ${
                index === 0 ? "border-b border-grey-border" : ""
              }`}
            >
              <label className="flex items-center cursor-pointer">
                <div className="relative flex items-center">
                  <input
                    type="radio"
                    name="dayOption"
                    checked={selectedDayOption === option.id}
                    onChange={() => setSelectedDayOption(option.id)}
                    className="sr-only"
                  />
                  <div
                    className={`w-6 h-6 rounded-custom36px border mr-2 flex items-center justify-center ${
                      selectedDayOption === option.id
                        ? "border-1 border-bgButton"
                        : "border border-cardValue  rounded-custom28px"
                    }`}
                  >
                    {selectedDayOption === option.id && (
                      <div className="w-3.5 h-3.5 rounded-custom36px bg-bgButton"></div>
                    )}
                  </div>
                </div>
                <span className="ml-3 text-textHeading font-inter text-[14px] font-[500] leading-[21px] ">
                  {option.label}
                </span>
              </label>
            </div>
          ))}
        </div>

        {/* Time Options */}
        <div className="border-t border-reloadBorder py-4">
          {timeOptions.map((option, index) => (
            <div
              key={option.id}
              className={`py-3 ${
                index === 0 ? "border-b border-grey-border" : ""
              }`}
            >
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input
                    type="radio"
                    name="timeOption"
                    checked={selectedTimeOption === option.id}
                    onChange={() => setSelectedTimeOption(option.id)}
                    className="sr-only"
                  />

                  <div
                    className={`w-6 h-6 rounded-full border flex items-center justify-center ${
                      selectedTimeOption === option.id
                        ? "border-1 border-[#7E3AF2]"
                        : "border border-cardValue  rounded-custom28px"
                    }`}
                  >
                    {selectedTimeOption === option.id && (
                      <div className="w-3.5 h-3.5 rounded-full bg-[#7E3AF2]"></div>
                    )}
                  </div>
                </div>
                <span className="ml-3 text-textHeading font-inter text-[14px] font-[500] leading-[21px]">
                  {option.label}
                </span>
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
// Scheduled Order Time Range Card
export const ScheduledOrderCard: React.FC<{
  timeRangeChecked: boolean;
  onTimeRangeChange: (e: React.MouseEvent) => void;
  minOrderChecked: boolean;
  onMinOrderChange: (e: React.MouseEvent) => void;
  remindersChecked: boolean;
  onRemindersChange: (e: React.MouseEvent) => void;
}> = ({
  timeRangeChecked,
  onTimeRangeChange,
  minOrderChecked,
  onMinOrderChange,
  remindersChecked,
  onRemindersChange,
}) => {
  return (
    <div className="bg-white rounded-lg p-6 mb-4">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h2 className="text-[14px] font-inter font-[500] text-textHeading">
            Scheduled Order Time Range
          </h2>
          <p className="hidden md:block text-[12px] font-inter font-[500] text-cardTitle">
            Set a delivery time range for scheduled orders to ensure timely
            fulfillment.
          </p>
          <p className="block md:hidden text-[12px] font-inter font-[500] text-cardTitle">
            Set a delivery time range for scheduled
            <br /> orders to ensure timely fulfillment.
          </p>
        </div>
        <ToggleSwitch
          checked={timeRangeChecked}
          onChange={onTimeRangeChange}
          aria-labelledby="scheduled-order-time-range"
        />
      </div>

      {timeRangeChecked && (
        <>
          <div className="mt-4 mb-4">
            <h3 className="text-[14px] font-inter font-[500] text-textHeading mb-2">
              Delivery Time Range (Minutes)
            </h3>

            <div className="relative">
              <input
                type="text"
                placeholder="Enter time range for scheduled orders"
                className="block w-full px-3 py-4 pr-10 focus:border-indigo-300 rounded-custom8px border border-reloadBorder font-inter font-[14px] font-[400] text-reloadBorder focus:ring focus:ring-indigo-200 focus:ring-opacity-50 "
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M10 6.66667V10L12.5 12.5M17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C14.1421 2.5 17.5 5.85786 17.5 10Z"
                    stroke="#949494"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="mb-4 pt-4 border-t">
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-[14px] font-inter font-[500] text-textHeading">
                Set Minimum Order Amount
              </h3>
              <ToggleSwitch
                checked={minOrderChecked}
                onChange={onMinOrderChange}
                aria-labelledby="set-minimum-order-amount"
              />
            </div>

            {minOrderChecked && (
              <input
                type="text"
                placeholder="Enter amount"
                className="w-full border border-reloadBorder rounded-custom8px px-3 py-4 pr-10 text-[14px] font-inter font-[400] placeholder:text-reloadBorder focus:outline-none focus:ring-2 focus:ring-purple-500 mt-2"
              />
            )}
          </div>

          <div className="pt-4 border-t">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-[14px] font-inter font-[500] text-textHeading">
                Scheduled Order Reminders
              </h3>
              <ToggleSwitch
                checked={remindersChecked}
                onChange={onRemindersChange}
                aria-labelledby="scheduled-order-reminders"
              />
            </div>

            {remindersChecked && (
              <>
                <p className="text-[12px] font-inter font-[500] text-cardTitle mb-4">
                  Set reminder notifications for restaurants and customers
                  before a scheduled order to ensure timely preparation and
                  delivery.
                </p>

                <div className="mb-4">
                  <h4 className="text-[14px] font-inter font-[500] text-textHeading mb-2">
                    Reminder for Restaurants
                  </h4>
                  <TimeInput placeholder="Enter time range for scheduled orders" />
                </div>

                <div>
                  <h4 className="text-[14px] font-inter font-[500] text-textHeading mb-2">
                    Reminder for Customers
                  </h4>
                  <TimeInput placeholder="Enter time range for scheduled orders" />
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};
export default ScheduledOrderCard;
