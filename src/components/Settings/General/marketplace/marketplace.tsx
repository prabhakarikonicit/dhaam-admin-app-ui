import React, { useState } from "react";
import {
    Plus,
    Copy,
  } from "lucide-react";

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
const DaySchedule: React.FC<DayScheduleProps> = ({
  day,
  enabled,
  onChange,
}) => {
  return (
    <div className="flex items-center gap-4 py-2">
      <div className="flex items-center gap-2 w-32">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={enabled}
            onChange={(e) => onChange(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
        </label>
        <span className="text-[12px] font-medium text-gray-700">{day}</span>
      </div>

      <div className="flex items-center gap-2">
        <TimeSelector value="9:00am" onChange={() => {}} />
        <span className="text-gray-500">-</span>
        <TimeSelector value="9:00am" onChange={() => {}} />
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <Plus className="w-4 h-4 text-gray-400" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <Copy className="w-4 h-4 text-gray-400" />
        </button>
      </div>
    </div>
  );
};
const MarketplaceDefaultsForm: React.FC = () => {
  const [marketplaceAvailability, setMarketplaceAvailability] = useState(false);
  const [marketplaceTiming, setMarketplaceTiming] = useState(true);

  return (
    <div className="max-w-3xl rounded-lg p-6 sm:max-h-full md:max-h-full lg:max-h-full xl:max-h-full max-h-[80vh] overflow-y-auto sm:overflow-visible md:overflow-visible lg:overflow-visible xl:overflow-visible">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-[14px] font-inter font-[600px] text-headding-color leading-[21px] mb-3">
          Marketplace Defaults
        </h2>
      </div>

      <form className="space-y-3 bg-backgroundWhite p-6 rounded-lg">
        <div>
          <label className="block text-[12px] font-inter font-[600px] text-paragraphBlack leading-[15.6px] mb-3">
            Currency
          </label>
          <select className="w-full p-3 border border-reloadBorder font-inter rounded-custom8px focus:ring-1 focus:ring-menuSubHeadingColor placeholder:text-reloadBorder placeholder:font-inter">
            <option className="font-inter text-reloadBorder">
              Indian Rupee (INR ₹)
            </option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[12px] font-inter font-[500px] text-paragraphBlack leading-[15.6px] mb-3 mt-3">
              Unit System
            </label>
            <select className="w-full p-3 border border-reloadBorder font-inter rounded-custom8px focus:ring-1 focus:ring-menuSubHeadingColor placeholder:text-reloadBorder placeholder:font-inter">
              <option className="font-inter text-reloadBorder">
                Metric system
              </option>
            </select>
          </div>
          <div>
            <label className="block text-[12px] font-inter font-[500px] text-paragraphBlack mb-3 mt-3 leading-[15.6px]">
              Default Weight Unit
            </label>
            <select className="w-full p-3 border border-reloadBorder font-inter rounded-custom8px focus:ring-1 focus:ring-menuSubHeadingColor placeholder:text-reloadBorder placeholder:font-inter">
              <option className="font-inter text-reloadBorder">
                Kilogram (kg)
              </option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[12px] font-inter font-[500px] text-paragraphBlack mb-3">
              Time Format
            </label>
            <select className="w-full p-3 border border-reloadBorder font-inter rounded-custom8px focus:ring-1 focus:ring-menuSubHeadingColor placeholder:text-reloadBorder placeholder:font-inter">
              <option className="font-inter text-reloadBorder">12 Hour</option>
            </select>
          </div>
          <div>
            <label className="block text-[12px] font-inter font-[500px] text-paragraphBlack mb-3">
              Date Format
            </label>
            <select className="w-full p-3 border border-reloadBorder font-inter rounded-custom8px focus:ring-1 focus:ring-menuSubHeadingColor placeholder:text-reloadBorder placeholder:font-inter">
              <option className="font-inter text-reloadBorder">
                DD MM YYYY
              </option>
            </select>
          </div>
        </div>

        <div>
          <label className="block  text-[12px] font-inter font-[500px] text-paragraphBlack mb-3">
            Time zone
          </label>
          <select className="w-full p-3 border border-reloadBorder font-inter rounded-custom8px focus:ring-1 focus:ring-menuSubHeadingColor placeholder:text-reloadBorder placeholder:font-inter">
            <option className="font-inter text-reloadBorder">
              (GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi
            </option>
          </select>
          <p className="mt-5  text-[12px] font-inter font-[500px] text-cardTitle leading-[15.6px] mb-4">
            Sets the time for when orders and analytics are recorded
          </p>
        </div>

        <div>
          <label className="block text-[12px] font-inter font-[500px] text-paragraphBlack mb-3">
            Country Code
          </label>
          <select className="w-full p-3 border border-reloadBorder font-inter rounded-custom8px focus:ring-1 focus:ring-menuSubHeadingColor placeholder:text-reloadBorder placeholder:font-inter">
            <option className="font-inter text-reloadBorder">
              India (+91) 🇮🇳
            </option>
          </select>
        </div>

        <div className="space-y-4 overflow-y-auto">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-inter font-[500px] text-paragraphBlack">
              Marketplace Availability
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={marketplaceAvailability}
                onChange={(e) => setMarketplaceAvailability(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[12px] font-inter font-[500px] text-paragraphBlack mb-3">
              Marketplace Timing
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={marketplaceTiming}
                onChange={(e) => setMarketplaceTiming(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>

          {marketplaceTiming && (
            <div className="border border-gray-200 rounded-lg p-4 mt-4 ">
              <DaySchedule day="Sunday" enabled={false} onChange={() => {}} />
              <DaySchedule day="Monday" enabled={true} onChange={() => {}} />
              <DaySchedule day="Tuesday" enabled={true} onChange={() => {}} />
              <DaySchedule day="Wednesday" enabled={true} onChange={() => {}} />
              <DaySchedule day="Thursday" enabled={true} onChange={() => {}} />
              <DaySchedule day="Friday" enabled={true} onChange={() => {}} />
              <DaySchedule day="Saturday" enabled={false} onChange={() => {}} />
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default MarketplaceDefaultsForm;