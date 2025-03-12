import React, {useState} from 'react';
import ToggleSwitch from './toggleSwitch';

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
export const DeliveryMode: React.FC<DeliveryModeProps> = ({ onSave = () => {} }) => {
  // State for delivery modes and other settings
  const [settings, setSettings] = useState({
    takeAway: false,
    homeDelivery: true,
    deliveryManager: false,
    customOrderFields: false,
    deliveryManagement: 'store' // 'admin' or 'store'
  });

  // State for slot interval input
  const [slotInterval, setSlotInterval] = useState('');

  // Toggle setting state
  const toggleSetting = (setting: keyof typeof settings) => {
    if (typeof settings[setting] === 'boolean') {
      setSettings({
        ...settings,
        [setting]: !settings[setting],
      });
    }
  };

  // Set delivery management option
  const setDeliveryManagement = (option: 'admin' | 'store') => {
    setSettings({
      ...settings,
      deliveryManagement: option
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
          <h2 className="text-[14px] font-inter font-[600] text-textHeading">Delivery Mode</h2>
          <p className="text-[12px] font-inter text-cardTitle">Choose delivery modes. Merchants can enable both Home Delivery and Takeaway</p>
        </div>
        
        {/* Delivery Mode Options */}
        <div className="space-y-4 border-t pt-4">
          {/* Take Away Option */}
          <div className="flex items-center">
            <input 
              type="checkbox" 
              id="takeaway" 
              checked={settings.takeAway}
              onChange={() => toggleSetting('takeAway')}
              className="h-5 w-5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
            />
            <label htmlFor="takeaway" className="ml-3 text-[12px] font-inter font-[600] text-textHeading">Take Away</label>
          </div>
          
          {/* Home Delivery Option */}
          <div className="flex items-center">
            <input 
              type="checkbox" 
              id="homeDelivery" 
              checked={settings.homeDelivery}
              onChange={() => toggleSetting('homeDelivery')}
              className="h-5 w-5 text-indigo-600 rounded border-gray-300 text-[12px] font-inter font-[600] text-textHeading"
            />
            <label htmlFor="homeDelivery" className="ml-3 text-[12px] font-inter font-[600] text-textHeading">Home Delivery</label>
          </div>
        </div>
        
        {/* Slot Interval Section - only visible if homeDelivery is enabled */}
        {settings.homeDelivery && (
          <div className="mt-4">
            <h3 className="text-[14px] font-inter font-[600] text-textHeading mb-2">Slot Interval (In Minutes)</h3>
            <input
              type="text"
              placeholder="Enter Slot"
              value={slotInterval}
              onChange={handleSlotIntervalChange}
              className="w-full border rounded-md px-3 py-2 border border-reloadBorder text-[12px] font-inter font-[400] text-reloadBorder rounded-custom8px focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        )}
        
        {/* Save Button */}
        <div className="flex justify-end mt-4">
          <button 
            onClick={handleSave}
            className="px-4 py-2 text-[12px] font-inter bg-white text-gray-800 border border-reloadBorder rounded-custom"
          >
            Save
          </button>
        </div>
      </div>
      
      {/* Delivery Manager Card */}
      <div className="bg-white rounded-lg p-6">
        <div className="flex justify-between items-center mb-2">
          <div>
            <h2 className="text-[14px] font-inter font-[600] text-textHeading">Delivery Manager</h2>
            <p className="text-[12px] font-inter text-cardTitle">Configure delivery management settings for order fulfillment and logistics.</p>
          </div>
          <ToggleSwitch 
            checked={settings.deliveryManager} 
            onChange={() => toggleSetting('deliveryManager')} 
            aria-labelledby="delivery-manager"
          />
        </div>
        
        {/* Management Options - only visible if deliveryManager is enabled */}
        {settings.deliveryManager && (
          <div className="mt-4 space-y-4">
            <div className="flex items-center">
              <input 
                type="radio" 
                id="admin" 
                name="deliveryManagement"
                checked={settings.deliveryManagement === 'admin'}
                onChange={() => setDeliveryManagement('admin')}
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded-custom28px focus:ring-indigo-500"
              />
              <label htmlFor="admin" className="ml-3 text-base">Admin</label>
           
            
            <div className="flex ml-4 items-center">
              <input 
                type="radio" 
                id="store" 
                name="deliveryManagement"
                checked={settings.deliveryManagement === 'store'}
                onChange={() => setDeliveryManagement('store')}
                className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
              />
              <label htmlFor="store" className="ml-3 text-base">Store</label>
            </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Custom Order Fields Card */}
      <div className="bg-white rounded-lg p-6">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center space-x-2">
            <h2 className="text-[14px] font-inter font-[600] text-textHeading">Custom Order Fields</h2>
            <button className="rounded-full p-1 border border-gray-300 text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          <ToggleSwitch 
            checked={settings.customOrderFields} 
            onChange={() => toggleSetting('customOrderFields')} 
            aria-labelledby="custom-order-fields"
          />
        </div>
        
        <p className="text-[12px] font-inter text-cardTitle">Allow customers to enter additional information during checkout.</p>
      </div>
    </div>
  );
};
// Basic card component with toggle
export const ToggleCard: React.FC<CardProps> = ({ 
  title, 
  description, 
  toggleChecked = false, 
  onToggleChange = () => {}, 
  children 
}) => {
  return (
    <div className="bg-white rounded-lg p-6 mb-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-[14px] font-inter font-[500] text-paragraphBlack leading-[21px]">{title}</h2>
          {description && <p className="text-[12px] font-inter font-[500px] text-cardTitle leading-[21px] break-words">{description}</p>}
        
        </div>
        <ToggleSwitch 
          checked={toggleChecked} 
          onChange={onToggleChange} 
          aria-labelledby={`toggle-${title.replace(/\s+/g, '-').toLowerCase()}`}
        />
      </div>
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
};

interface CardProps {
  title: string;
  placeholder?: string;
}

// InputCard component - this appears to already exist in your code as InputCardDemo
// But I'm providing a compatible implementation here
export const InputCard: React.FC<CardProps> = ({ 
  title, 
  placeholder = "Enter amount" 
}) => {
  return (
    <div className="rounded-lg p-6 bg-white">
      <h2 className="text-[14px] font-inter font-[600] text-textHeading">{title}</h2>
      <div className="mt-4">
        <input
          type="text"
          placeholder={placeholder}
          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 text-[12px] font-intr text-headding-color"
        />
      </div>
    </div>
  );
};

// InputCardGrid component
export const InputCardGrid: React.FC<{ cards: CardProps[] }> = ({ cards }) => {
  return (
    <div className="grid md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 grid-cols-1 gap-4 ">
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
export const TimeInput: React.FC<{ placeholder: string }> = ({ placeholder }) => {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder={placeholder}
        className="w-full border rounded-md px-3 py-2 pr-10 text-[12px] font-inter font-[400] text-reloadBorder focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
    </div>
  );
};

// Display Store Timing Card
export const DisplayStoreTimingCard: React.FC<{ checked: boolean; onChange: (e: React.MouseEvent) => void }> = ({ 
  checked, 
  onChange 
}) => {
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
export const EmailNotificationCard: React.FC<{ checked: boolean; onChange: (e: React.MouseEvent) => void }> = ({ 
  checked, 
  onChange 
}) => {
  return (
    <ToggleCard
      title="Order Placement Email Notification"
      description="Send an email confirmation when an order is placed."
      toggleChecked={checked}
      onToggleChange={onChange}
    >
      <button className="mt-2 border px-4 py-2 rounded-md text-gray-700 hover:bg-gray-50">
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
  onValueChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ 
  checked, 
  onChange,
  title = "Maximum Orders Per Slot",
  description = "Set the maximum number of orders allowed per time slot.",
  // maxOrderLabel = "Max Orders per Slot",
  // maxOrderPlaceholder = "Enter the maximum order limit per slot",
  // value = "",
  // onValueChange = () => {}
}) => {
  return (
    <ToggleCard
      title={title}
      description={description}
      toggleChecked={checked}
      onToggleChange={onChange}
    >
      {/* {checked && (
        <div>
          <h3 className="font-medium mb-2 ">{maxOrderLabel}</h3>
          <input
            type="text"
            placeholder={maxOrderPlaceholder}
            value={value}
            onChange={onValueChange}
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 "
          />
        </div>
      )} */}
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
  onProductMultiSelectionChange
}) => {
  return (
    <div className="bg-white rounded-lg p-6 mb-4">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h2 className="text-[14px] font-inter font-[600] text-textHeading">Order Control</h2>
          <p className="text-gray-500 text-sm">Allow stores to accept or reject orders automatically.</p>
        </div>
        <ToggleSwitch
          checked={orderControlChecked}
          onChange={onOrderControlChange}
          aria-labelledby="order-control"
        />
      </div>
      
      {orderControlChecked && (
        <div className="mt-4 mb-6">
          <h3 className="text-[14px] font-inter font-[600] text-textHeading mb-2">Order Acceptance Time (In Minutes)</h3>
          <TimeInput placeholder="Enter Time" />
        </div>
      )}
      
      <div className="pt-6 border-t">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-[14px] font-inter font-[600] text-textHeading">Product Multi-Selection</h2>
            <p className="text-gray-500 text-sm">Allow customers to select multiple products within a category or option group.</p>
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
  onRemindersChange
}) => {
  return (
    <div className="bg-white rounded-lg p-6 mb-4">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h2 className="text-[14px] font-inter font-[600] text-textHeading">Scheduled Order Time Range</h2>
          <p className="text-[12px] font-inter text-cardTitle">Set a delivery time range for scheduled orders to ensure timely fulfillment.</p>
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
            <h3 className="text-[14px] font-inter font-[600] text-textHeading mb-2">Delivery Time Range (Minutes)</h3>
            <TimeInput placeholder="Enter time range for scheduled orders" />
          </div>
          
          <div className="mb-4 pt-4 border-t">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-[14px] font-inter font-[600] text-textHeading">Set Minimum Order Amount</h3>
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
                className="w-full border rounded-md px-3 py-2 text-[14px] font-inter font-[400] text-textHeading focus:outline-none focus:ring-2 focus:ring-purple-500 mt-2"
              />
            )}
          </div>
          
          <div className="pt-4 border-t">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-[14px] font-inter font-[600] text-textHeading">Scheduled Order Reminders</h3>
              <ToggleSwitch
                checked={remindersChecked}
                onChange={onRemindersChange}
                aria-labelledby="scheduled-order-reminders"
              />
            </div>
            
            {remindersChecked && (
              <>
                <p className="text-[12px] font-inter text-cardTitle mb-4">Set reminder notifications for restaurants and customers before a scheduled order to ensure timely preparation and delivery.</p>
                
                <div className="mb-4">
                  <h4 className="text-[14px] font-inter font-[600] text-textHeading mb-2">Reminder for Restaurants</h4>
                  <TimeInput placeholder="Enter time range for scheduled orders" />
                </div>
                
                <div>
                  <h4 className="text-[14px] font-inter font-[600] text-textHeadingmb-2">Reminder for Customers</h4>
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