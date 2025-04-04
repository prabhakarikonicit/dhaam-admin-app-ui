import React, { useState } from "react";
import SurgeDelivery from "../../configurations/store/surgedelivery";
import { Plus, Copy } from "lucide-react";
import ToggleSwitch from "../../../common/toggleSwitch";
 
 
interface TimeSelectorProps {
  value: string;
  onChange: (value: string) => void;
}
 
interface DayScheduleProps {
  day: string;
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}
 
const TimeSelector: React.FC<TimeSelectorProps> = ({ value, onChange }) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="p-2 border border-gray-200 rounded-lg text-gray-700 text-[12px] focus:ring-2 focus:ring-purple-500"
  >
    <option value="9:00am">9:00am</option>
    <option value="09:30am">09:30am</option>
    <option value="10:00am">10:00am</option>
  </select>
);
const MarketplaceDefaultsForm: React.FC = () => {
  const [marketplaceAvailability, setMarketplaceAvailability] = useState(false);
  const [marketplaceTiming, setMarketplaceTiming] = useState(true);
  const [marketplaceTiming1, setMarketplaceTiming1] = useState(true);
  const [allowGDPRAccess, setAllowGDPRAccess] = useState(false);
  const [freeDelivery, setFreeDelivery] = useState(false);
  const [marketPlace, setMarketplace] = useState(false);
 
  const handleToggle = (e: React.MouseEvent) => {
    setAllowGDPRAccess(!allowGDPRAccess);
  };
 
  const handleFreeDeliveryToggle = () => {
    setFreeDelivery((prev) => !prev);
  };
 
  const handleMarketplaceToggle = () => {
    setMarketplace((prev) => !prev);
  };
 
  return (
    <div className="max-w-full rounded-custom12px p-6 md:p-0 sm:p-0 lg:p-0 xl:p-0 sm:max-h-full md:max-h-full lg:max-h-full xl:max-h-full max-h-[80vh] overflow-y-auto sm:overflow-visible md:overflow-visible lg:overflow-visible xl:overflow-visible">
      <div className="flex justify-between items-center mb-3 mt-0 sm:mt-6 md:mt-8 lg:mt-12 xl-mt-12">
        <h2 className="text-[14px] font-inter font-[600] text-headding-color leading-[21px] mb-3">
          Marketplace Defaults
        </h2>
      </div>
 
      <form className="space-y-3 bg-backgroundWhite p-6 rounded-lg">
        <div>
          <label className="block text-[14px] font-inter font-[500] leading-[130%] tracking-[0%] text-paragraphBlack mb-3">
            Currency
          </label>
 
          <select className="w-full p-3 border border-reloadBorder font-inter text-[14px] font-[400] leading-[150%] tracking-[0%] rounded-custom8px focus:ring-1 focus:ring-menuSubHeadingColor placeholder:text-reloadBorder placeholder:font-inter text-reloadBorder">
            <option className="font-inter text-paragraphBlack">
              US Dollar (USD $)
            </option>
            <option className="font-inter text-paragraphBlack">
              Indian Rupee (INR ₹)
            </option>
            <option className="font-inter text-paragraphBlack">
              Euro (EUR €)
            </option>
            <option className="font-inter text-paragraphBlack">
              British Pound (GBP £)
            </option>
            <option className="font-inter text-paragraphBlack">
              Japanese Yen (JPY ¥)
            </option>
 
          </select>
        </div>
 
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[14px] font-inter font-[500] leading-[130%] tracking-[0%] text-paragraphBlack mb-3 mt-3text-reloadBorder">
              Unit System
            </label>
 
            <select className="w-full p-3 border border-reloadBorder font-inter text-[14px] font-[400] leading-[150%] tracking-[0%] rounded-custom8px focus:ring-1 focus:ring-menuSubHeadingColor placeholder:text-reloadBorder placeholder:font-inter text-reloadBorder">
 
              <option className="font-inter text-paragraphBlack">Metric System</option>
              <option className="font-inter text-paragraphBlack">Imperial System</option>
              <option className="font-inter text-paragraphBlack">US Customary System</option>
              <option className="font-inter text-paragraphBlack">SI (International System of Units)</option>
              <option className="font-inter text-paragraphBlack">British Engineering System</option>
 
            </select>
          </div>
          <div>
            <label className="block text-[14px] font-inter font-[500] text-paragraphBlack mb-3 mt-3 leading-[130%] tracking-[0%]">
              Default Weight Unit
            </label>
 
            <select className="w-full p-3 border border-reloadBorder font-inter text-[14px] font-[400] leading-[150%] tracking-[0%] rounded-custom8px focus:ring-1 focus:ring-menuSubHeadingColor placeholder:text-reloadBorder placeholder:font-inter text-reloadBorder">
              <option className="font-inter text-paragraphBlack">Kilogram (kg)</option>
              <option className="font-inter text-paragraphBlack">Gram (g)</option>
              <option className="font-inter text-paragraphBlack">Pound (lb)</option>
              <option className="font-inter text-paragraphBlack">Ounce (oz)</option>
              <option className="font-inter text-paragraphBlack">Metric Ton (t)</option>
 
            </select>
          </div>
        </div>
 
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[14px] font-inter font-[500] text-paragraphBlack mb-3 leading-[130%] tracking-[0%]">
              Time Format
            </label>
 
            <select className="w-full p-3 border border-reloadBorder font-inter text-[14px] font-[400] leading-[150%] tracking-[0%] rounded-custom8px focus:ring-1 focus:ring-menuSubHeadingColor placeholder:text-reloadBorder placeholder:font-inter text-reloadBorder">
 
              <option className="font-inter text-paragraphBlack">12 Hour</option>
              <option className="font-inter text-paragraphBlack">24 Hour</option>
            </select>
          </div>
          <div>
            <label className="block text-[14px] font-inter font-[500] text-paragraphBlack mb-3 leading-[130%] tracking-[0%]">
              Date Format
            </label>
 
            <select className="w-full p-3 border border-reloadBorder font-inter text-[14px] font-[400] leading-[150%] tracking-[0%] rounded-custom8px focus:ring-1 focus:ring-menuSubHeadingColor placeholder:text-reloadBorder placeholder:font-inter text-reloadBorder">
              <option className="font-inter text-paragraphBlack">DD MM YYYY</option>
              <option className="font-inter text-paragraphBlack">MM DD YYYY</option>
              <option className="font-inter text-paragraphBlack">YYYY MM DD</option>
              <option className="font-inter text-paragraphBlack">DD-MM-YYYY</option>
              <option className="font-inter text-paragraphBlack">MM/DD/YYYY</option>
 
            </select>
          </div>
        </div>
 
        <div>
          <label className="block text-[14px] font-inter font-[500] text-paragraphBlack mb-3">
            Time zone
          </label>
 
          <select className="w-full p-3 border border-reloadBorder font-inter text-[14px] font-[400] leading-[150%] tracking-[0%] rounded-custom8px focus:ring-1 focus:ring-menuSubHeadingColor placeholder:text-reloadBorder placeholder:font-inter text-reloadBorder">
            <option className="font-inter text-paragraphBlack">
              (GMT-05:00) Eastern Time (US & Canada)
            </option>
            <option className="font-inter text-paragraphBlack">
              (GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi
            </option>
 
            <option className="font-inter text-paragraphBlack">
              (GMT+00:00) Greenwich Mean Time (GMT)
            </option>
            <option className="font-inter text-paragraphBlack">
              (GMT+01:00) Central European Time (CET)
            </option>
            <option className="font-inter text-paragraphBlack">
              (GMT+08:00) Beijing, Hong Kong, Singapore
            </option>
            <option className="font-inter text-paragraphBlack">
              (GMT-08:00) Pacific Time (US & Canada)
            </option>
            <option className="font-inter text-paragraphBlack">
              (GMT-07:00) Mountain Time (US & Canada)
            </option>
            <option className="font-inter text-paragraphBlack">
              (GMT-06:00) Central Time (US & Canada)
            </option>
            <option className="font-inter text-paragraphBlack">
              (GMT+09:00) Tokyo, Osaka, Sapporo
            </option>
            <option className="font-inter text-paragraphBlack">
              (GMT+10:00) Sydney, Melbourne, Canberra
            </option>
            <option className="font-inter text-paragraphBlack">
              (GMT+03:00) Moscow, St. Petersburg, Nairobi
            </option>
            <option className="font-inter text-paragraphBlack">
              (GMT+04:00) Abu Dhabi, Muscat, Baku
            </option>
            <option className="font-inter text-paragraphBlack">
              (GMT-03:00) Buenos Aires, Montevideo
            </option>
            <option className="font-inter text-paragraphBlack">
              (GMT+07:00) Bangkok, Jakarta, Hanoi
            </option>
            <option className="font-inter text-paragraphBlack">
              (GMT+12:00) Auckland, Wellington, Fiji
            </option>
            <option className="font-inter text-paragraphBlack">
              (GMT-09:00) Alaska Time (US)
            </option>
            <option className="font-inter text-paragraphBlack">
              (GMT-11:00) Samoa, Midway Island
            </option>
 
 
          </select>
          <p className="mt-5  text-[12px] font-inter font-[500] text-cardTitle leading-[15.6px] mb-4">
            Sets the time for when orders and analytics are recorded
          </p>
        </div>
 
 
        <div>
          <label className="block text-[14px] font-inter font-[500] text-paragraphBlack mb-3 leading-[130%] tracking-[0%]">
            Country Code
          </label>
 
          <select className="w-full p-3 border border-reloadBorder font-inter text-[14px] font-[400] leading-[150%] tracking-[0%] rounded-custom8px focus:ring-1 focus:ring-menuSubHeadingColor placeholder:text-reloadBorder placeholder:font-inter text-reloadBorder">
            <option className="font-inter text-paragraphBlack">United States (+1) 🇺🇸</option>
            <option className="font-inter text-paragraphBlack">India (+91) 🇮🇳</option>
            <option className="font-inter text-paragraphBlack">United Kingdom (+44) 🇬🇧</option>
            <option className="font-inter text-paragraphBlack">Canada (+1) 🇨🇦</option>
            <option className="font-inter text-paragraphBlack">Australia (+61) 🇦🇺</option>
            <option className="font-inter text-paragraphBlack">Germany (+49) 🇩🇪</option>
            <option className="font-inter text-paragraphBlack">France (+33) 🇫🇷</option>
            <option className="font-inter text-paragraphBlack">Japan (+81) 🇯🇵</option>
            <option className="font-inter text-paragraphBlack">China (+86) 🇨🇳</option>
            <option className="font-inter text-paragraphBlack">Brazil (+55) 🇧🇷</option>
            <option className="font-inter text-paragraphBlack">South Africa (+27) 🇿🇦</option>
            <option className="font-inter text-paragraphBlack">Russia (+7) 🇷🇺</option>
            <option className="font-inter text-paragraphBlack">Mexico (+52) 🇲🇽</option>
            <option className="font-inter text-paragraphBlack">United Arab Emirates (+971) 🇦🇪</option>
            <option className="font-inter text-paragraphBlack">Singapore (+65) 🇸🇬</option>
 
          </select>
        </div>
        <div className="border border-reloadBorder p-4 rounded-md">
          {/* Free Delivery with Toggle Switch on Right */}
          <div className="flex justify-between items-center">
            <label className="text-[14px] font-inter font-[500] text-paragraphBlack">
              Free Delivery
            </label>
 
            {/* Toggle Switch */}
            <ToggleSwitch
              checked={freeDelivery}
              onChange={handleFreeDeliveryToggle} // Using the new function
            // aria-labelledby="free-delivery-label"
            />
          </div>
 
          {/* Description Below */}
          <p className="mt-3 text-[12px] font-inter font-[500] text-cardTitle leading-[15.6px]">
            Enable this option to waive delivery charges when the delivery is handled by the admin.
          </p>
        </div>
 
 
 
        <div className="space-y-4 overflow-y-auto">
          <div className="flex items-center justify-between border border-reloadBorder p-4 rounded-md">
            <span className="text-[14px] font-inter font-[500] text-reloadBorder">
              Marketplace Availability
            </span>
 
            {/* Toggle Switch */}
            <ToggleSwitch
              checked={marketPlace}
              onChange={handleMarketplaceToggle} // Using the new function
            // aria-labelledby="free-delivery-label"
            />
          </div>
 
 
          <div className="flex items-center justify-between border border-reloadBorder p-4 rounded-md">
            <span className="text-[14px] font-inter font-[500] text-paragraphBlack">
              Marketplace Timing
            </span>
 
            {/* Toggle Switch */}
            <ToggleSwitch
              checked={marketplaceTiming} // Changed from allowGDPRAccess to marketplaceTiming
              onChange={(e) => setMarketplaceTiming(!marketplaceTiming)} // Updated handler
            // aria-labelledby="marketplace-timing-label"
            />
          </div>
 
 
          {marketplaceTiming && (
            <div className="border border-reloadBorder rounded-custom12px ">
              <SurgeDelivery />
 
              {/* <DaySchedule day="Sunday" enabled={false} onChange={() => {}} />
              <DaySchedule day="Monday" enabled={true} onChange={() => {}} />
              <DaySchedule day="Tuesday" enabled={true} onChange={() => {}} />
              <DaySchedule day="Wednesday" enabled={true} onChange={() => {}} />
              <DaySchedule day="Thursday" enabled={true} onChange={() => {}} />
              <DaySchedule day="Friday" enabled={true} onChange={() => {}} />
              <DaySchedule day="Saturday" enabled={false} onChange={() => {}} /> */}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};
 
export default MarketplaceDefaultsForm;