import React, { useState } from 'react';
import ToggleSwitch from '../../../common/toggleSwitch';
import {
  DisplayStoreTimingCard,
  EmailNotificationCard,
  MaxOrdersCard,
  OrderControlCard,
  ScheduledOrderCard,
  InputCard,
} from '../../../common/cards';

// Define types for time slots
interface TimeSlot {
  startTime: string;
  endTime: string;
  type: 'Fixed' | 'Percentage';
  value: string;
}

// Define types for day configuration
interface DayConfig {
  enabled: boolean;
  timeSlots: TimeSlot[];
}

// Define valid day keys
type DayKey = 'sunday' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday';

// Days configuration type
type DaysConfigType = Record<DayKey, DayConfig>;

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

  // Toggle setting state
  const toggleSetting = (setting: keyof typeof settings) => {
    setSettings({
      ...settings,
      [setting]: !settings[setting],
    });
  };

  // Initial state for all days
  const [daysConfig, setDaysConfig] = useState<DaysConfigType>({
    sunday: { enabled: false, timeSlots: [] },
    monday: { enabled: true, timeSlots: [
      { startTime: '9:00am', endTime: '10:00am', type: 'Fixed', value: '₹50' },
      { startTime: '10:01am', endTime: '09:00am', type: 'Percentage', value: '2%' }
    ] },
    tuesday: { enabled: true, timeSlots: [{ startTime: '9:00am', endTime: '', type: 'Fixed', value: '' }] },
    wednesday: { enabled: true, timeSlots: [{ startTime: '9:00am', endTime: '', type: 'Fixed', value: '' }] },
    thursday: { enabled: true, timeSlots: [{ startTime: '9:00am', endTime: '9:00am', type: 'Fixed', value: '' }] },
    friday: { enabled: true, timeSlots: [{ startTime: '9:00am', endTime: '9:00am', type: 'Fixed', value: '' }] },
    saturday: { enabled: false, timeSlots: [] }
  });

  // Toggle day enabled/disabled - with fixed TypeScript typing
  const toggleDay = (day: DayKey) => {
    setDaysConfig({
      ...daysConfig,
      [day]: {
        ...daysConfig[day],
        enabled: !daysConfig[day].enabled
      }
    });
  };
  
  return (
    <div className="bg-gray-50 min-h-screen p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 bg-white p-4 rounded-md">
        <h1 className="text-lg font-medium">Store</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 text-gray-600">Cancel</button>
          <button className="px-4 py-2 bg-gray-100 rounded-md text-gray-800 hover:bg-gray-200">Save</button>
        </div>
      </div>
      
      {/* Surge Delivery Section */}
      <div className="bg-white rounded-lg p-6 mb-4">
        <div className="flex justify-between items-center mb-2">
          <div>
            <h2 className="text-lg font-medium">Surge On Delivery</h2>
            <p className="text-gray-500 text-sm">Apply dynamic delivery charges based on demand and conditions.</p>
          </div>
          <ToggleSwitch 
            checked={settings.surgeDelivery} 
            onChange={() => toggleSetting('surgeDelivery')} 
            aria-labelledby="surge-delivery"
          />
        </div>
        
        {settings.surgeDelivery && (
          <div className="border rounded-lg mt-4">
            {/* Days of week */}
            {(Object.entries(daysConfig) as [DayKey, DayConfig][]).map(([day, config]) => (
              <div key={day} className="border-b last:border-b-0">
                <div className="flex items-center p-4">
                  <ToggleSwitch
                    checked={config.enabled}
                    onChange={() => toggleDay(day)}
                    aria-labelledby={`toggle-${day}`}
                  />
                  <span className="ml-4 capitalize">{day}</span>
                </div>
                
                {config.enabled && (
                  <div className="pl-12 pr-4 pb-4">
                    {config.timeSlots.map((slot, index) => (
                      <div key={index} className="flex items-center mb-4">
                        <div className="flex items-center mr-2">
                          <div className="relative">
                            <select 
                              className="appearance-none border rounded-md px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-purple-500"
                              value={slot.startTime}
                            >
                              <option value="9:00am">9:00am</option>
                              <option value="10:00am">10:00am</option>
                              <option value="11:00am">11:00am</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                              </svg>
                            </div>
                          </div>
                          
                          <span className="mx-2">—</span>
                          
                          <div className="relative">
                            <select 
                              className="appearance-none border rounded-md px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-purple-500"
                              value={slot.endTime}
                            >
                              <option value="9:00am">9:00am</option>
                              <option value="9:30am">9:30am</option>
                              <option value="10:00am">10:00am</option>
                              <option value="10:30am">10:30am</option>
                              <option value="11:00am">11:00am</option>
                              <option value="11:30am">11:30am</option>
                              <option value="12:00pm">12:00pm</option>
                              <option value="12:30pm">12:30pm</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center mr-2 ml-4">
                          <div className="relative">
                            <select 
                              className="appearance-none border rounded-md px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-purple-500"
                              value={slot.type}
                            >
                              <option value="Fixed">Fixed</option>
                              <option value="Percentage">Percentage</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center mr-2 ml-2">
                          <div className="relative">
                            <select 
                              className="appearance-none border rounded-md px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-purple-500"
                              value={slot.value}
                            >
                              {slot.type === 'Fixed' ? (
                                <>
                                  <option value="₹50">₹50</option>
                                  <option value="₹100">₹100</option>
                                </>
                              ) : (
                                <>
                                  <option value="2%">2%</option>
                                  <option value="5%">5%</option>
                                  <option value="10%">10%</option>
                                </>
                              )}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center ml-auto">
                          <button className="text-gray-500 hover:text-gray-700 mx-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                          </button>
                          <button className="text-gray-500 hover:text-gray-700 mx-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2" />
                            </svg>
                          </button>
                          {index > 0 && (
                            <button className="text-gray-500 hover:text-gray-700 mx-1">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                    
                    {(day === 'tuesday' || day === 'wednesday' || day === 'thursday' || day === 'friday') && (
                      <div className="flex items-center">
                        <button className="flex items-center text-gray-500 hover:text-gray-700">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </button>
                        <button className="ml-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2" />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Order Settings */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
        {/* First Column */}
        <div className="space-y-4">
          {/* Minimum Order Amount */}
          <InputCard 
            title="Minimum Order Amount" 
            placeholder="Enter amount"
          />
          
          {/* Order Placement Email Notification */}
          <EmailNotificationCard
            checked={settings.emailNotification}
            onChange={() => toggleSetting('emailNotification')}
          />
          
          {/* Maximum Orders Per Slot */}
          <MaxOrdersCard
            checked={settings.maxOrdersPerSlot}
            onChange={() => toggleSetting('maxOrdersPerSlot')}
          />
          
          {/* Order Control with Product Multi-Selection */}
          <OrderControlCard
            orderControlChecked={settings.orderControl}
            onOrderControlChange={() => toggleSetting('orderControl')}
            productMultiSelectionChecked={settings.productMultiSelection}
            onProductMultiSelectionChange={() => toggleSetting('productMultiSelection')}
          />
        </div>
        
        {/* Second Column */}
        <div className="space-y-4">
          {/* Minimum Pickup Amount */}
          <InputCard 
            title="Minimum Pickup Amount" 
            placeholder="Enter amount"
          />
          
          {/* Display Store Timing */}
          <DisplayStoreTimingCard
            checked={settings.displayStoreTiming}
            onChange={() => toggleSetting('displayStoreTiming')}
          />
          
          {/* Preparation Time */}
          <div className="bg-white rounded-lg p-6 mb-4">
            <h2 className="text-lg font-medium mb-2">Preparation Time</h2>
            <p className="text-gray-500 text-sm mb-4">Set the default order preparation time. Adjust it for specific orders in the order list before accepting. Requires accept/reject enabled for edits after order placement.</p>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter preparation time in minutes"
                className="w-full border rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Scheduled Order Time Range */}
          <ScheduledOrderCard
            timeRangeChecked={settings.scheduledOrderTimeRange}
            onTimeRangeChange={() => toggleSetting('scheduledOrderTimeRange')}
            minOrderChecked={settings.setMinimumOrderAmount}
            onMinOrderChange={() => toggleSetting('setMinimumOrderAmount')}
            remindersChecked={settings.scheduledOrderReminders}
            onRemindersChange={() => toggleSetting('scheduledOrderReminders')}
          />
        </div>
      </div>
    </div>
  );
};

export default Store;