import React, { useState } from 'react';
import ToggleSwitch from '../../../common/toggleSwitch';
import { ChevronDown, Plus, X } from 'lucide-react';

interface CheckoutProps {
  onClose: () => void;
  onSave: (data: any) => void;
}

const Checkout: React.FC<CheckoutProps> = ({ onClose, onSave }) => {
  // State for all form fields
  const [sideOrder, setSideOrder] = useState(false);
  const [deliveryModes, setDeliveryModes] = useState({
    takeAway: true,
    homeDelivery: false
  });
  const [deliveryTime, setDeliveryTime] = useState('');
  const [customOrderFields, setCustomOrderFields] = useState(false);
  const [eta, setEta] = useState(false);
  const [googleMapApiKey, setGoogleMapApiKey] = useState('');
  const [deliveryCharge, setDeliveryCharge] = useState({
    amount: '',
    type: 'Fixed'
  });
  const [tip, setTip] = useState({
    enabled: false,
    amount: '',
    allowManual: false
  });
  const [multipleTipOptions, setMultipleTipOptions] = useState({
    enabled: false,
    options: ['10', '20', '30', '40', '50']
  });

  const handleToggle = (field: string) => (e: React.MouseEvent) => {
    switch(field) {
      case 'sideOrder':
        setSideOrder(!sideOrder);
        break;
      case 'customOrderFields':
        setCustomOrderFields(!customOrderFields);
        break;
      case 'eta':
        setEta(!eta);
        break;
      case 'tip':
        setTip(prev => ({ ...prev, enabled: !prev.enabled }));
        break;
      case 'multipleTipOptions':
        setMultipleTipOptions(prev => ({ ...prev, enabled: !prev.enabled }));
        break;
    }
  };

  const removeTipOption = (option: string) => {
    setMultipleTipOptions(prev => ({
      ...prev,
      options: prev.options.filter(opt => opt !== option)
    }));
  };

  return (
    <div className="max-w-3xl rounded-custom12px p-6 md:p-0 sm:p-0 lg:p-0 xl:p-0 sm:max-h-full md:max-h-full lg:max-h-full xl:max-h-full max-h-[80vh] overflow-y-auto sm:overflow-visible md:overflow-visible lg:overflow-visible xl:overflow-visible">
      <div className="flex items-center justify-between p-6">
        <h2 className="text-[14px] font-inter font-[600] text-headding-color">Checkout</h2>
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-[12px] font-inter font-[600] text-paragraphBlack"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave({
              sideOrder,
              deliveryModes,
              deliveryTime,
              customOrderFields,
              eta,
              googleMapApiKey,
              deliveryCharge,
              tip,
              multipleTipOptions
            })}
            className="px-4 py-2 text-[12px] font-inter font-[600] text-paragraphBlack bg-backgroundWhite border border-reloadBorder rounded-custom"
          >
            Save
          </button>
        </div>
      </div>

      <div className="p-6 md:p-0 sm:p-0 lg:p-0 xl:p-0 space-y-6">
        {/* Side Order */}
        <div className="bg-backgroundWhite rounded-custom12px p-3 border border-gray-200 shadow-custom">
          <div className="flex items-center justify-between">
            <div>
              <h3 id="side-order-title" className="text-[14px] font-inter font-[500] my-2 text-textHeading">Side Order</h3>
              <p id="side-order-desc" className="text-[12px] font-inter font-[500] text-cardTitle">Allow store add side items or categories to complement main orders.</p>
            </div>
            <ToggleSwitch 
              checked={sideOrder} 
              onChange={handleToggle('sideOrder')}
              aria-labelledby="side-order-title"
              aria-describedby="side-order-desc"
              
            />
          </div>
        </div>

        {/* Delivery Mode */}
        <div className="p-2 ">
          <div className="border border-reloadBorder rounded-tl-[12px] rounded-tr-[12px] border">
          <h3 className="text-[14px] font-inter font-[500] text-textHeading bg-background-grey p-2 ">Delivery Mode</h3>
          <p className="text-[12px] font-inter font-[500] text-cardTitle mb-4 bg-background-grey p-2">Choose delivery modes. Merchants can enable both Home Delivery and Takeaway</p>
          </div>
          <div className="space-y-4 bg-backgroundWhite p-2  rounded-bl-[12px] rounded-br-[12px] border">
            <div className="flex items-center gap-2 border-b py-3">
              <input
                type="checkbox"
                checked={deliveryModes.takeAway}
                onChange={() => setDeliveryModes(prev => ({ ...prev, takeAway: !prev.takeAway }))}
                className="rounded border-gray-300 text-purple-600"
              />
              <span className="text-[14px] font-inter text-gray-700">Take Away</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={deliveryModes.homeDelivery}
                onChange={() => setDeliveryModes(prev => ({ ...prev, homeDelivery: !prev.homeDelivery }))}
                className="rounded border-gray-300 text-purple-600"
              />
              <span className="text-[14px] font-inter text-gray-700">Home Delivery</span>
            </div>
          </div>
        </div>

        {/* Delivery Time */}
        <div className="bg-background-grey rounded-lg p-6">
        <div className="border border-reloadBorder rounded-tl-[12px] rounded-tr-[12px] border">

          <h3 className="text-[14px] font-inter font-[500] text-textHeading bg-background-grey p-2">Delivery Time</h3>
          <p className="text-[12px] font-inter font-[500] text-cardTitle mb-4 bg-background-grey p-2 mb-4">Set the default delivery time. If a restaurant handles its own delivery, they can enter their own delivery time.</p>
          </div>
          <input
            type="text"
            placeholder="Select delivery time"
            value={deliveryTime}
            onChange={(e) => setDeliveryTime(e.target.value)}
            className="w-full px-3 py-6 border border-gray-200 rounded-lg text-[14px] font-inter"
          />
        </div>

        {/* Custom Order Fields */}
        <div className="bg-white rounded-custom12px p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h3 id="custom-fields-title"  className="text-[14px] font-inter font-[500] text-textHeading py-2">Custom Order Fields</h3>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </div>
              <p id="custom-fields-desc" className="text-[12px] font-inter text-cardTitle">Allow customers to enter additional information during checkout.</p>
            </div>
            <ToggleSwitch 
              checked={customOrderFields} 
              onChange={handleToggle('customOrderFields')}
              aria-labelledby="custom-fields-title"
              aria-describedby="custom-fields-desc"
            />
          </div>
        </div>

        {/* ETA */}
        <div className=" rounded-lg p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 id="eta-title" className="text-[14px] font-inter text-textHeading">ETA (Estimate Time of Arrival)</h3>
              <p id="eta-desc" className="text-[12px] font-inter text-cardTitle">Turn on to show customers the expected delivery time.</p>
            </div>
            <ToggleSwitch 
              checked={eta} 
              onChange={handleToggle('eta')}
              aria-labelledby="eta-title"
              aria-describedby="eta-desc"
            />
          </div>
          
          {eta && (
            <input
              type="text"
              placeholder="Google map API key"
              value={googleMapApiKey}
              onChange={(e) => setGoogleMapApiKey(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-[14px] font-inter"
            />
          )}
        </div>

        {/* Delivery Charge */}
        <div className="rounded-lg p-4 border border-gray-200">
          <h3 className="text-[14px] font-inter text-textHeading">Delivery Charge</h3>
          <p className="text-[12px] font-inter text-cardTitle mb-4">Set the charge for delivery on orders.</p>
          
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Enter delivery charge amount"
              value={deliveryCharge.amount}
              onChange={(e) => setDeliveryCharge(prev => ({ ...prev, amount: e.target.value }))}
              className="flex-1 px-3 py-2 border border-gray-200 w-10  rounded-lg text-[14px] font-inter"
            />
            <select
              value={deliveryCharge.type}
              onChange={(e) => setDeliveryCharge(prev => ({ ...prev, type: e.target.value }))}
              className="px-3 py-2 border border-gray-200 rounded-lg text-[14px] font-inter"
            >
              <option>Fixed</option>
              <option>Percentage</option>
            </select>
          </div>
        </div>

        {/* Tip */}
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 id="tip-title" className="text-[14px] font-inter text-textHeading">Tip</h3>
              <p id="tip-desc" className="text-[12px] font-inter text-cardTitle">Set a minimum tip amount for deliveries across all merchants. Choose between a fixed amount or a percentage of the order.</p>
            </div>
            <ToggleSwitch 
              checked={tip.enabled} 
              onChange={handleToggle('tip')}
              aria-labelledby="tip-title"
              aria-describedby="tip-desc"
            />
          </div>

          {tip.enabled && (
            <div className="space-y-4">
              <div className="flex gap-4 flex-wrap">
                <input
                  type="text"
                  placeholder="Enter minimum tip amount"
                  value={tip.amount}
                  onChange={(e) => setTip(prev => ({ ...prev, amount: e.target.value }))}
                  className="flex-1 px-3 py-4 border border-gray-200 rounded-lg text-[14px] font-inter"
                />
                <div className="flex items-center flex-wrap">
                  <label className="inline-flex items-center">
                    <ToggleSwitch
                      checked={tip.allowManual}
                      onChange={() => setTip(prev => ({ ...prev, allowManual: !prev.allowManual }))}
                    />
                    <span className="ml-2 text-[14px] font-inter text-gray-70">Allow manual tip entry</span>
                  </label>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between  mb-4">
                  <h4 className="text-[14px] font-inter font-[500] text-gray-900">Multiple tip options for customers</h4>
                  <ToggleSwitch
                    checked={multipleTipOptions.enabled}
                    onChange={handleToggle('multipleTipOptions')}
                  />
                </div>

                {multipleTipOptions.enabled && (
                  <div className="space-y-4">
                    <div className="flex gap-4 flex-wrap">
                      <input
                        type="text"
                        placeholder="Enter amount"
                        className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-[14px] font-inter"
                      />
                      <button
                        className="p-2 border border-gray-200 rounded-lg"
                      >
                        <Plus className="w-4 h-4 text-gray-500" />
                      </button>
                      <select
                        className="px-3 py-2 border border-gray-200 rounded-lg text-[14px] font-inter"
                      >
                        <option>Fixed</option>
                        <option>Percentage</option>
                      </select>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {multipleTipOptions.options.map((option) => (
                        <div
                          key={option}
                          className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full"
                        >
                          <span className="text-[14px] font-inter text-gray-700">₹{option}</span>
                          <button
                            onClick={() => removeTipOption(option)}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <p className="text-[12px] text-gray-500">Default tip set to ₹10</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;