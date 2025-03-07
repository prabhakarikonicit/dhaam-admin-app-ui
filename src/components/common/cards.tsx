import React from 'react';
import ToggleSwitch from './toggleSwitch';

interface CardProps {
  title: string;
  description?: string;
  toggleChecked?: boolean;
  onToggleChange?: (e: React.MouseEvent) => void;
  children?: React.ReactNode;
}

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
          <h2 className="text-lg font-medium">{title}</h2>
          {description && <p className="text-gray-500 text-sm">{description}</p>}
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

// Input card component (without toggle)
export const InputCard: React.FC<Omit<CardProps, 'toggleChecked' | 'onToggleChange'> & { placeholder?: string }> = ({ 
  title, 
  description, 
  placeholder = "Enter amount",
  children 
}) => {
  return (
    <div className="bg-white rounded-lg p-6 mb-4">
      <h2 className="text-lg font-medium">{title}</h2>
      {description && <p className="text-gray-500 text-sm mt-1">{description}</p>}
      <div className="mt-4">
        <input
          type="text"
          placeholder={placeholder}
          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
      {children}
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
        className="w-full border rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
      title="Display Store Timing"
      description="Enable to show store operating hours on the listing."
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
export const MaxOrdersCard: React.FC<{ checked: boolean; onChange: (e: React.MouseEvent) => void }> = ({ 
  checked, 
  onChange 
}) => {
  return (
    <ToggleCard
      title="Maximum Orders Per Slot"
      description="Set the maximum number of orders allowed per time slot."
      toggleChecked={checked}
      onToggleChange={onChange}
    >
      {checked && (
        <div>
          <h3 className="font-medium mb-2">Max Orders per Slot</h3>
          <input
            type="text"
            placeholder="Enter the maximum order limit per slot"
            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
  onProductMultiSelectionChange
}) => {
  return (
    <div className="bg-white rounded-lg p-6 mb-4">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h2 className="text-lg font-medium">Order Control</h2>
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
          <h3 className="font-medium mb-2">Order Acceptance Time (In Minutes)</h3>
          <TimeInput placeholder="Enter Time" />
        </div>
      )}
      
      <div className="pt-6 border-t">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-lg font-medium">Product Multi-Selection</h2>
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
          <h2 className="text-lg font-medium">Scheduled Order Time Range</h2>
          <p className="text-gray-500 text-sm">Set a delivery time range for scheduled orders to ensure timely fulfillment.</p>
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
            <h3 className="font-medium mb-2">Delivery Time Range (Minutes)</h3>
            <TimeInput placeholder="Enter time range for scheduled orders" />
          </div>
          
          <div className="mb-4 pt-4 border-t">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Set Minimum Order Amount</h3>
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
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 mt-2"
              />
            )}
          </div>
          
          <div className="pt-4 border-t">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">Scheduled Order Reminders</h3>
              <ToggleSwitch
                checked={remindersChecked}
                onChange={onRemindersChange}
                aria-labelledby="scheduled-order-reminders"
              />
            </div>
            
            {remindersChecked && (
              <>
                <p className="text-gray-500 text-sm mb-4">Set reminder notifications for restaurants and customers before a scheduled order to ensure timely preparation and delivery.</p>
                
                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-2">Reminder for Restaurants</h4>
                  <TimeInput placeholder="Enter time range for scheduled orders" />
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Reminder for Customers</h4>
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