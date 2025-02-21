import React, { useState } from "react";
import {
  ChevronRight,
  Search,
  PenSquare,
  LayoutGrid,
  Filter,
  Download,
  Plus,
  Trash2,
  Copy,
  MoreVertical,
  Info,
  Play,
  ChevronLeft,
} from "lucide-react";

// Define interfaces for component props
interface TimeSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

interface DayScheduleProps {
  day: string;
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}
interface LanguageOption {
  value: string;
  label: string;
  checked?: boolean;
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

const EditIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
  >
    <path
      d="M17.4142 2.58579C16.6332 1.80474 15.3668 1.80474 14.5858 2.58579L7 10.1716V13H9.82842L17.4142 5.41421C18.1953 4.63316 18.1953 3.36683 17.4142 2.58579Z"
      fill="#949494"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2 6C2 4.89543 2.89543 4 4 4H8C8.55228 4 9 4.44772 9 5C9 5.55228 8.55228 6 8 6H4V16H14V12C14 11.4477 14.4477 11 15 11C15.5523 11 16 11.4477 16 12V16C16 17.1046 15.1046 18 14 18H4C2.89543 18 2 17.1046 2 16V6Z"
      fill="#949494"
    />
  </svg>
);

const CopyIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
  >
    <path
      d="M7 9C7 7.89543 7.89543 7 9 7H15C16.1046 7 17 7.89543 17 9V15C17 16.1046 16.1046 17 15 17H9C7.89543 17 7 16.1046 7 15V9Z"
      fill="#C2C2C2"
    />
    <path
      d="M5 3C3.89543 3 3 3.89543 3 5V11C3 12.1046 3.89543 13 5 13L5 5H13C13 3.89543 12.1046 3 11 3H5Z"
      fill="#C2C2C2"
    />
  </svg>
);

const DomainIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
  >
    <path
      d="M11 3C10.4477 3 10 3.44772 10 4C10 4.55228 10.4477 5 11 5H13.5858L7.29289 11.2929C6.90237 11.6834 6.90237 12.3166 7.29289 12.7071C7.68342 13.0976 8.31658 13.0976 8.70711 12.7071L15 6.41421V9C15 9.55228 15.4477 10 16 10C16.5523 10 17 9.55228 17 9V4C17 3.44772 16.5523 3 16 3H11Z"
      fill="#C2C2C2"
    />
    <path
      d="M5 5C3.89543 5 3 5.89543 3 7V15C3 16.1046 3.89543 17 5 17H13C14.1046 17 15 16.1046 15 15V12C15 11.4477 14.5523 11 14 11C13.4477 11 13 11.4477 13 12V15H5V7L8 7C8.55228 7 9 6.55228 9 6C9 5.44772 8.55228 5 8 5H5Z"
      fill="#C2C2C2"
    />
  </svg>
);

const AccountForm = () => {
  return (
    <div className="max-w-3xl rounded-lg p-6">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-[14px] font-inter font-[600px] text-paragraphBlack ">
          Account Details
        </h2>
        <div className="flex gap-4">
          <button className="px-4 py-2 text-[12px] font-inter font-[600px] text-paragraphBlack border border-gray-200 rounded hover:bg-gray-50">
            Cancel
          </button>
          <button className="px-4 py-2 text-[12px] font-inter font-[600px] text-paragraphBlack bg-backgroundWhite rounded hover:bg-bgButton">
            Save
          </button>
        </div>
      </div>

      <form className="space-y-3 bg-backgroundWhite p-6 rounded-lg">
        <div>
          <label className="block text-[12px] font-inter font-[500px] text-paragraphBlack mb-3">
            Account Name
          </label>
          <input
            type="text"
            // defaultValue="Aman Kum"
            placeholder="Aman kum"
            className="w-full p-3 border border-reloadBorder rounded-custom8px focus:ring-1 focus:ring-menuSubHeadingColor placeholder:text-reloadBorder placeholder:font-inter"
          />
        </div>

        <div>
          <label className="block text-[12px] font-inter font-[500px] text-paragraphBlack mb-3">
            Email
          </label>
          <input
            type="email"
            // defaultValue="aman@gmail.com"
            placeholder="aman@gmail.com"
            className="w-full p-3 border border-reloadBorder rounded-custom8px focus:ring-1 focus:ring-menuSubHeadingColor placeholder:text-reloadBorder placeholder:font-inter"
          />
        </div>

        <div>
          <label className="block text-[12px] font-inter font-[500px] text-paragraphBlack mb-3">
            Phone
          </label>
          <input
            type="tel"
            // defaultValue="+91 810 230 8108"
            placeholder="+91 810 230 8108"
            className="w-full p-3 border border-reloadBorder rounded-custom8px focus:ring-1 focus:ring-menuSubHeadingColor placeholder:text-reloadBorder placeholder:font-inter"
          />
        </div>

        <div>
          <label className="block text-[12px] font-inter font-[500px] text-paragraphBlack mb-3">
            Address
          </label>
          <input
            type="text"
            // defaultValue="2464 Royal Ln. Mesa, New Jersey 45463"
            placeholder="2464 Royal Ln. Mesa, New Jersey 45463"
            className="w-full p-3 border border-reloadBorder rounded-custom8px focus:ring-1 focus:ring-menuSubHeadingColor placeholder:text-reloadBorder placeholder:font-inter"
          />
        </div>

        <div>
          <label className="block text-[12px] font-inter font-[500px] text-paragraphBlack mb-3">
            Password
          </label>
          <div className="relative">
            <input
              type="password"
              // defaultValue="********"
              placeholder="********"
              className="w-full p-3 border border-reloadBorder rounded-custom8px focus:ring-1 focus:ring-menuSubHeadingColor placeholder:text-reloadBorder placeholder:font-inter"
            />
            <EditIcon />
          </div>
        </div>

        <div>
          <label className="block text-[12px] font-inter font-[500px] text-paragraphBlack mb-3">
            Account ID
          </label>
          <div className="relative">
            <input
              type="text"
              // defaultValue="#3902904"
              placeholder="#3902904"
              className="w-full p-3 border border-reloadBorder rounded-custom8px focus:ring-1 focus:ring-menuSubHeadingColor  placeholder:text-reloadBorder placeholder:font-inter"
            />
            <CopyIcon />
          </div>
        </div>

        <div>
          <label className="block text-[12px] font-inter font-[500px] text-paragraphBlack mb-3">
            Account Type
          </label>
          <input
            type="text"
            // defaultValue="Marketplace"
            placeholder="Marketplace"
            className="w-full p-3 border border-reloadBorder rounded-custom8px focus:ring-1 focus:ring-menuSubHeadingColor  placeholder:text-reloadBorder placeholder:font-inter"
          />
        </div>

        <div>
          <label className="block text-[12px] font-inter font-[500px] text-paragraphBlack mb-3">
            Domain
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="www.design-mart.com"
              className="w-full p-3 border border-reloadBorder rounded-custom8px focus:ring-1 focus:ring-menuSubHeadingColor placeholder:text-reloadBorder placeholder:font-inter"
            />
            <DomainIcon />
          </div>
        </div>
      </form>
    </div>
  );
};

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
    <div className="max-w-3xl rounded-lg p-6">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-[14px] font-inter font-[600px] text-paragraphBlack leading-[21px] mb-3">
          Marketplace Defaults
        </h2>
       
      </div>

      <form className="space-y-3 bg-backgroundWhite p-6 rounded-lg">
        <div>
          <label className="block text-[12px] font-inter font-[600px] text-paragraphBlack leading-[15.6px] mb-3">
            Currency
          </label>
          <select className="w-full p-3 border border-reloadBorder font-inter rounded-custom8px focus:ring-1 focus:ring-menuSubHeadingColor placeholder:text-reloadBorder placeholder:font-inter">
            <option className="font-inter text-reloadBorder">Indian Rupee (INR ₹)</option>
            
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[12px] font-inter font-[500px] text-paragraphBlack leading-[15.6px] mb-3 mt-3">
              Unit System
            </label>
            <select className="w-full p-3 border border-reloadBorder font-inter rounded-custom8px focus:ring-1 focus:ring-menuSubHeadingColor placeholder:text-reloadBorder placeholder:font-inter">
              <option className="font-inter text-reloadBorder">Metric system</option>
            </select>
          </div>
          <div>
            <label className="block text-[12px] font-inter font-[500px] text-paragraphBlack mb-3 mt-3 leading-[15.6px]">
              Default Weight Unit
            </label>
            <select className="w-full p-3 border border-reloadBorder font-inter rounded-custom8px focus:ring-1 focus:ring-menuSubHeadingColor placeholder:text-reloadBorder placeholder:font-inter">
              <option className="font-inter text-reloadBorder">Kilogram (kg)</option>
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
              <option className="font-inter text-reloadBorder">DD MM YYYY</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block  text-[12px] font-inter font-[500px] text-paragraphBlack mb-3">
            Time zone
          </label>
          <select className="w-full p-3 border border-reloadBorder font-inter rounded-custom8px focus:ring-1 focus:ring-menuSubHeadingColor placeholder:text-reloadBorder placeholder:font-inter">
            <option className="font-inter text-reloadBorder">(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi</option>
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
            <option className="font-inter text-reloadBorder">India (+91) 🇮🇳</option>
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
              <div className="border border-gray-200 rounded-lg p-4 mt-4">
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
const DomainForm: React.FC = () => {
  return (
    <div className="max-w-3xl  rounded-lg p-6">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-semibold text-gray-800">Domain</h2>
        <div className="flex gap-4 items-center">
          <button className="text-[12px] font-inter font-medium text-cardValue leading-[15.6px] border border-gray-200 rounded hover:bg-gray-50">
            Learn More
          </button>
          <button className="px-4 py-2 text-[12px] font-inter font-[600px] text-cardValue leading-[15.6px]bg-backgroundWhite rounded hover:bg-bgButton">
            Buy New Domain
          </button>
        </div>
      </div>

      <form className="space-y-6 bg-backgroundWhite p-6 rounded-lg">
        <div>
          <label className="block text-[12px] font-inter font-[500px] text-paragraphBlack mb-3">
            Setup existing domain for website
          </label>
          <input
            type="text"
            placeholder="www.dhaam.c"
            className="w-full p-3 border border-reloadBorder rounded-custom8px focus:ring-1 focus:ring-menuSubHeadingColor placeholder:text-reloadBorder placeholder:font-inter"
          />
        </div>

        <div>
          <label className="block text-[12px] font-inter font-[500px] text-paragraphBlack mb-3">
            Setup existing domain for admin dashboard
          </label>
          <input
            type="text"
            placeholder="admin.dhaam.com"
            className="w-full p-3 border border-reloadBorder rounded-custom8px focus:ring-1 focus:ring-menuSubHeadingColor placeholder:text-reloadBorder placeholder:font-inter"
          />
        </div>

        <div className="flex justify-end gap-4">
          <button className="px-4 py-2 text-[12px] font-inter font-[500px] text-paragraphBlack rounded-lg hover:bg-gray-50">
            Cancel
          </button>
          <button className="px-4 py-2 ext-[12px] font-inter font-[500px] text-whiteColor bg-bgButton rounded-custom hover:bg-purple-700">
            Verify Connection
          </button>
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[12px] font-inter font-[500px] text-paragraphBlack">
              Third-party domain providers
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M5.10493 10.295C4.83156 10.0216 4.83156 9.57839 5.10493 9.30503L7.40995 7L5.10493 4.69497C4.83156 4.42161 4.83156 3.97839 5.10493 3.70503C5.37829 3.43166 5.82151 3.43166 6.09488 3.70503L8.89488 6.50503C9.16824 6.77839 9.16824 7.22161 8.89488 7.49497L6.09488 10.295C5.82151 10.5683 5.37829 10.5683 5.10493 10.295Z" fill="#212121"/>
</svg>
          </div>
          <div className="border-t border-gray-200 my-6"></div>
          <div className="flex items-center justify-between mb-4">
            <span className="ttext-[12px] font-inter font-[500px] text-paragraphBlack">
              Learn about how to setup existing domain to dhaam website
            </span>
            <button className="text-[12px] font-inter font-[500px] text-paragraphBlack hover:text-purple-700">
              Learn More
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-4">
            {/* Video Tutorial Card */}
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-gray-800 border-b-8 border-b-transparent ml-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="46" height="47" viewBox="0 0 46 47" fill="none">
                      <rect y="0.0953369" width="46" height="46" rx="23" fill="white" fill-opacity="0.26"/>
                      <path d="M32.409 20.5437C32.8893 20.7991 33.291 21.1804 33.5712 21.6467C33.8514 22.113 33.9994 22.6467 33.9994 23.1907C33.9994 23.7347 33.8514 24.2684 33.5712 24.7347C33.291 25.201 32.8893 25.5823 32.409 25.8377L19.597 32.8047C17.534 33.9277 15 32.4677 15 30.1587V16.2237C15 13.9137 17.534 12.4547 19.597 13.5757L32.409 20.5437Z" fill="white"/>
                    </svg>
                  </div>
                </button>
              </div>
            </div>

            {/* Image Card */}
            <div className="bg-[#B4E4E7] rounded-lg p-6 flex items-center justify-center">
              <img
                src="/api/placeholder/200/150"
                alt="Domain setup illustration"
                className="w-32 h-32 object-contain"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
const LanguagesForm: React.FC = () => {
  const [languages, setLanguages] = useState<LanguageOption[]>([
    { value: "latvian", label: "Latvian", checked: true },
    { value: "mongolian", label: "Mongolian", checked: false },
    { value: "bulgarian", label: "Bulgarian", checked: false },
    { value: "spanish", label: "Spanish", checked: false },
    { value: "lao", label: "Lao", checked: false },
    { value: "turkish", label: "Turkish", checked: true },
    { value: "maithili", label: "Maithili", checked: true },
    { value: "quechua", label: "Quechua", checked: false },
    { value: "basque", label: "Basque", checked: false },
    { value: "georgian", label: "Georgian", checked: true },
    { value: "ewe", label: "Ewe", checked: true },
    { value: "malayalam", label: "Malayalam", checked: true },
    { value: "catalan", label: "Catalan", checked: false },
    { value: "azerbaijani", label: "Azerbaijani", checked: false },
    { value: "kazakh", label: "Kazakh", checked: false },
    { value: "macedonian", label: "Macedonian", checked: false },
    { value: "gujarati", label: "Gujarati", checked: false },
    { value: "shona", label: "Shona", checked: false },
    { value: "samoan", label: "Samoan", checked: false },
    { value: "dinka", label: "Dinka", checked: true },
    { value: "arabic", label: "Arabic", checked: true },
    { value: "inuktitut", label: "Inuktitut", checked: false },
    { value: "korean", label: "Korean", checked: false },
    { value: "afar", label: "Afar", checked: false },
    { value: "burmese", label: "Burmese", checked: false },
    { value: "estonian", label: "Estonian", checked: false },
    { value: "hmong", label: "Hmong", checked: false },
    { value: "sanskrit", label: "Sanskrit", checked: false },
    { value: "igbo", label: "Igbo", checked: false },
    { value: "russian", label: "Russian", checked: true },
    { value: "tongan", label: "Tongan", checked: false },
    { value: "belarusian", label: "Belarusian", checked: false },
    { value: "romanian", label: "Romanian", checked: true },
    { value: "ewe2", label: "Ewe", checked: false },
    { value: "rwanda", label: "Rwanda", checked: false },
    { value: "dzongkha", label: "Dzongkha", checked: false },
    { value: "french", label: "French", checked: false },
    { value: "kyrgyz", label: "Kyrgyz", checked: false },
    { value: "danish", label: "Danish", checked: false },
    { value: "igbo2", label: "Igbo", checked: false },
    { value: "finnish", label: "Finnish", checked: false },
    { value: "hungarian", label: "Hungarian", checked: true },
    { value: "haitian_creole", label: "Haitian Creole", checked: true },
    { value: "konkani", label: "Konkani", checked: false },
    { value: "english", label: "English", checked: true },
    { value: "tatar", label: "Tatar", checked: false },
    { value: "turkish2", label: "Turkish", checked: false },
    { value: "dholuo", label: "Dholuo", checked: false },
    { value: "flemish", label: "Flemish", checked: false },
    { value: "thai", label: "Thai", checked: false },
    { value: "nepali", label: "Nepali", checked: false },
    { value: "ukrainian", label: "Ukrainian", checked: false },
    { value: "mossi", label: "Mossi", checked: false },
    { value: "cantonese", label: "Cantonese", checked: false },
    { value: "gaelic", label: "Gaelic", checked: false },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  const handleLanguageToggle = (value: string) => {
    setLanguages(
      languages.map((lang) =>
        lang.value === value ? { ...lang, checked: !lang.checked } : lang
      )
    );
  };

  const filteredLanguages = languages.filter((lang) =>
    lang.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-3xl bg-white rounded-lg p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-semibold text-gray-800">Languages</h2>
      </div>

      <form className="space-y-6">
        <div>
          <label className="block text-[12px] font-medium text-gray-700 mb-2">
            Published language for website
          </label>
          <select
            defaultValue="english"
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500"
          >
            <option value="default">Default | English</option>
          </select>
        </div>

        <div>
          <label className="block text-[12px] font-medium text-gray-700 mb-2">
            Published language for admin dashboard
          </label>
          <select
            defaultValue="english"
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500"
          >
            <option value="default">Default | English</option>
          </select>
        </div>

        <div className="flex items-center justify-between py-3 px-4 bg-white rounded-lg border border-gray-200">
          <span className="text-[12px] font-medium text-gray-700">
            Add more language
          </span>
          <button type="button" className="p-1">
            <MoreVertical className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        <div className="flex items-center justify-between py-3 px-4 bg-white rounded-lg border border-gray-200">
          <span className="text-[12px] font-medium text-gray-700">
            Add translation
          </span>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-medium text-gray-700">
                Language for your customers
              </span>
              <Info className="w-4 h-4 text-gray-400" />
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search language"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 text-[12px]"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-2 top-1/2 transform -translate-y-1/2" />
            </div>
          </div>

          <div className="grid grid-cols-5 gap-4">
            {filteredLanguages.map((lang) => (
              <div key={lang.value} className="flex items-center">
                <input
                  type="checkbox"
                  id={lang.value}
                  checked={lang.checked}
                  onChange={() => handleLanguageToggle(lang.value)}
                  className="w-4 h-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
                />
                <label
                  htmlFor={lang.value}
                  className="ml-2 text-[12px] text-gray-700"
                >
                  {lang.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};

const PlanForm: React.FC = () => {
  return (
    <div className="max-w-3xl bg-white rounded-lg p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-semibold text-gray-800">Plan</h2>
        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
          Change Plan
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-[12px] font-medium text-gray-700 mb-4">
            Current plan details
          </h3>
          <div className="border border-gray-200 rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-[12px] font-medium text-gray-600">
                  Startup Plan
                </h4>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-3xl font-bold">$19</span>
                  <span className="text-gray-600">Per month</span>
                </div>
                <p className="text-[12px] text-gray-500 mt-1">
                  For all individuals.
                </p>
              </div>
              <div className="px-4 py-1 bg-gray-100 rounded-full text-[12px] text-gray-600">
                Plan expires on : Feb 13, 2026
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <div className="text-xl font-semibold">100</div>
                <div className="text-[12px] text-gray-600">
                  Orders
                  <br />
                  per month
                </div>
              </div>
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <div className="text-xl font-semibold">$0.09</div>
                <div className="text-[12px] text-gray-600">
                  Per month
                  <br />
                  transaction
                </div>
              </div>
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <div className="text-xl font-semibold">50</div>
                <div className="text-[12px] text-gray-600">
                  Customers per
                  <br />
                  month
                </div>
              </div>
            </div>

            <div className="absolute right-6 top-6">
              <img
                src="/api/placeholder/150/80"
                alt="Plan illustration"
                className="opacity-20"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between py-3 px-4 bg-white rounded-lg border border-gray-200">
          <span className="text-[12px] font-medium text-red-600">
            Cancel Plan
          </span>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[12px] font-medium text-gray-700">
              Learn about plans
            </span>
            <button className="text-[12px] text-purple-600 font-medium hover:text-purple-700">
              Learn More
            </button>
          </div>

          <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="w-16 h-16 bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Play className="w-8 h-8 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface BillingItem {
  id: string;
  billNumber: string;
  billType: string;
  status: "Paid" | "Pending" | "Failed";
  amount: number;
  date: string;
  time: string;
}

const BillingForm: React.FC = () => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const billingData: BillingItem[] = Array(10)
    .fill(null)
    .map((_, i) => ({
      id: `row-${i}`,
      billNumber: "#327702783",
      billType: "Startup plan billing",
      status: i === 4 ? "Pending" : i === 5 ? "Failed" : "Paid",
      amount: 19.0,
      date: "January 26",
      time: "06:30 PM",
    }));

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedRows(billingData.map((item) => item.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const getStatusBadgeClasses = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="max-w-4xl bg-white rounded-lg p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-semibold text-gray-800">Billing</h2>
      </div>

      <div className="space-y-6">
        {/* Current Billing Cycle */}
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-[12px] font-medium text-gray-700">
              Current billing cycle
            </h3>
            <p className="text-[12px] text-gray-600">
              Feb 1, 2025 - Mar 1, 2025
            </p>
          </div>
          <button className="px-4 py-2 text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50">
            Billing Details
          </button>
        </div>

        {/* Credit Card Info */}
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
          <div className="flex items-center gap-4">
            <img src="/api/placeholder/40/25" alt="Visa" className="h-6" />
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-medium">Visa</span>
              <span className="text-[12px] text-gray-600">**** 1111</span>
              <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                Primary
              </span>
            </div>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded">
            <PenSquare className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        {/* Past Bills */}
        <div>
          <h3 className="text-[12px] font-medium text-gray-700 mb-4">
            Past bills
          </h3>

          <div className="border border-gray-200 rounded-lg">
            {/* Table Controls */}
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 text-[12px] text-gray-600">
                  <LayoutGrid className="w-4 h-4" />
                  Column
                </button>
                <button className="flex items-center gap-2 text-[12px] text-gray-600">
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
                <button className="flex items-center gap-2 text-[12px] text-gray-600">
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search invoice"
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-[12px]"
                />
              </div>
            </div>

            {/* Table */}
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedRows.length === billingData.length}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-purple-600"
                    />
                  </th>
                  <th className="text-left p-4 text-[12px] font-medium text-gray-600">
                    Billing Number
                  </th>
                  <th className="text-left p-4 text-[12px] font-medium text-gray-600">
                    Bill Type
                  </th>
                  <th className="text-left p-4 text-[12px] font-medium text-gray-600">
                    Status
                  </th>
                  <th className="text-left p-4 text-[12px] font-medium text-gray-600">
                    Amount
                  </th>
                  <th className="text-left p-4 text-[12px] font-medium text-gray-600">
                    Payment Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {billingData.map((item) => (
                  <tr key={item.id} className="border-b border-gray-200">
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(item.id)}
                        onChange={() => handleSelectRow(item.id)}
                        className="rounded border-gray-300 text-purple-600"
                      />
                    </td>
                    <td className="p-4">
                      <span className="text-blue-600 font-medium">
                        {item.billNumber}
                      </span>
                    </td>
                    <td className="p-4">{item.billType}</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClasses(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="p-4">${item.amount.toFixed(2)}</td>
                    <td className="p-4">
                      <div>{item.date}</div>
                      <div className="text-[12px] text-gray-500">
                        {item.time}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="p-4 flex justify-between items-center border-t border-gray-200">
              <span className="text-[12px] text-gray-600">
                Showing result 10 out of 50
              </span>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 rounded">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded">
                  <ChevronRight className="w-4 h-4" />
                </button>
                <select className="ml-2 px-3 py-2 border border-gray-200 rounded-lg text-[12px]">
                  <option>10</option>
                  <option>20</option>
                  <option>50</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Update the SettingsComponent to include the DomainForm

const SliderIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="21"
    viewBox="0 0 20 21"
    fill="none"
  >
    <path
      d="M5 4.5C5 3.94772 4.55228 3.5 4 3.5C3.44772 3.5 3 3.94772 3 4.5V11.7676C2.4022 12.1134 2 12.7597 2 13.5C2 14.2403 2.4022 14.8866 3 15.2324V16.5C3 17.0523 3.44772 17.5 4 17.5C4.55228 17.5 5 17.0523 5 16.5V15.2324C5.5978 14.8866 6 14.2403 6 13.5C6 12.7597 5.5978 12.1134 5 11.7676V4.5Z"
      fill="#333333"
    />
    <path
      d="M11 4.5C11 3.94772 10.5523 3.5 10 3.5C9.44772 3.5 9 3.94772 9 4.5V5.76756C8.4022 6.11337 8 6.75972 8 7.5C8 8.24028 8.4022 8.88663 9 9.23244V16.5C9 17.0523 9.44772 17.5 10 17.5C10.5523 17.5 11 17.0523 11 16.5V9.23244C11.5978 8.88663 12 8.24028 12 7.5C12 6.75972 11.5978 6.11337 11 5.76756V4.5Z"
      fill="#333333"
    />
    <path
      d="M16 3.5C16.5523 3.5 17 3.94772 17 4.5V11.7676C17.5978 12.1134 18 12.7597 18 13.5C18 14.2403 17.5978 14.8866 17 15.2324V16.5C17 17.0523 16.5523 17.5 16 17.5C15.4477 17.5 15 17.0523 15 16.5V15.2324C14.4022 14.8866 14 14.2403 14 13.5C14 12.7597 14.4022 12.1134 15 11.7676V4.5C15 3.94772 15.4477 3.5 16 3.5Z"
      fill="#333333"
    />
  </svg>
);

const SliderMarketIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="21"
    viewBox="0 0 20 21"
    fill="none"
  >
    <path
      d="M3.33333 5.49999V3.83333H16.6667V5.49999H3.33333ZM3.33333 17.1667V12.1667H2.5V10.5L3.33333 6.33333H16.6667L17.5 10.5V12.1667H16.6667V17.1667H15V12.1667H11.6667V17.1667H3.33333ZM5 15.5H10V12.1667H5V15.5Z"
      fill="#636363"
    />
  </svg>
);

const SliderDomainIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="21"
    viewBox="0 0 20 21"
    fill="none"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M4.08296 9.5H6.02863C6.11783 7.95361 6.41228 6.52907 6.86644 5.38228C5.41752 6.27135 4.37513 7.75848 4.08296 9.5ZM10 2.5C5.58172 2.5 2 6.08172 2 10.5C2 14.9183 5.58172 18.5 10 18.5C14.4183 18.5 18 14.9183 18 10.5C18 6.08172 14.4183 2.5 10 2.5ZM10 4.5C9.92395 4.5 9.76787 4.53173 9.5347 4.76184C9.29723 4.9962 9.03751 5.3849 8.79782 5.94417C8.40914 6.8511 8.12491 8.08559 8.03237 9.5H11.9676C11.8751 8.08559 11.5909 6.8511 11.2022 5.94417C10.9625 5.3849 10.7028 4.9962 10.4653 4.76184C10.2321 4.53173 10.076 4.5 10 4.5ZM13.9714 9.5C13.8822 7.95361 13.5877 6.52907 13.1336 5.38228C14.5825 6.27135 15.6249 7.75848 15.917 9.5H13.9714ZM11.9676 11.5H8.03237C8.12491 12.9144 8.40914 14.1489 8.79782 15.0558C9.03751 15.6151 9.29723 16.0038 9.5347 16.2382C9.76787 16.4683 9.92395 16.5 10 16.5C10.076 16.5 10.2321 16.4683 10.4653 16.2382C10.7028 16.0038 10.9625 15.6151 11.2022 15.0558C11.5909 14.1489 11.8751 12.9144 11.9676 11.5ZM13.1336 15.6177C13.5877 14.4709 13.8822 13.0464 13.9714 11.5H15.917C15.6249 13.2415 14.5825 14.7287 13.1336 15.6177ZM6.86644 15.6177C6.41228 14.4709 6.11783 13.0464 6.02863 11.5H4.08296C4.37513 13.2415 5.41752 14.7287 6.86644 15.6177Z"
      fill="#636363"
    />
  </svg>
);
const SliderLanguagesIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="21"
    viewBox="0 0 20 21"
    fill="none"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M7.00001 2.5C7.55229 2.5 8.00001 2.94772 8.00001 3.5V4.5H8.73223C8.744 4.49979 8.75581 4.49979 8.76765 4.5H11C11.5523 4.5 12 4.94772 12 5.5C12 6.05228 11.5523 6.5 11 6.5H9.57801C9.21635 8.18748 8.63076 9.79154 7.85405 11.2796C8.14482 11.6338 8.44964 11.976 8.76767 12.3055C9.15124 12.7028 9.14007 13.3359 8.74272 13.7195C8.34537 14.103 7.7123 14.0919 7.32873 13.6945C7.13962 13.4986 6.95468 13.2987 6.77405 13.0948C5.88895 14.4101 4.84387 15.6084 3.66692 16.6618C3.2554 17.0301 2.6232 16.9951 2.25487 16.5836C1.88655 16.172 1.92157 15.5398 2.3331 15.1715C3.54619 14.0858 4.60214 12.8288 5.4631 11.4389C4.90663 10.6499 4.40868 9.81652 3.97558 8.94503C3.7298 8.45045 3.93148 7.85027 4.42606 7.60449C4.92064 7.3587 5.52083 7.56039 5.76661 8.05497C6.00021 8.52502 6.25495 8.98278 6.52961 9.42699C6.947 8.49272 7.28247 7.51402 7.52698 6.5H3.00001C2.44772 6.5 2.00001 6.05228 2.00001 5.5C2.00001 4.94772 2.44772 4.5 3.00001 4.5H6.00001V3.5C6.00001 2.94772 6.44772 2.5 7.00001 2.5ZM13 8.5C13.3788 8.5 13.725 8.714 13.8944 9.05279L16.8854 15.0348C16.8919 15.0471 16.8982 15.0596 16.9041 15.0722L17.8944 17.0528C18.1414 17.5468 17.9412 18.1474 17.4472 18.3944C16.9532 18.6414 16.3526 18.4412 16.1056 17.9472L15.382 16.5H10.618L9.89444 17.9472C9.64745 18.4412 9.04677 18.6414 8.5528 18.3944C8.05882 18.1474 7.85859 17.5468 8.10558 17.0528L9.09589 15.0722C9.10187 15.0596 9.1081 15.0471 9.11458 15.0348L12.1056 9.05279C12.275 8.714 12.6212 8.5 13 8.5ZM11.618 14.5H14.382L13 11.7361L11.618 14.5Z"
      fill="#636363"
    />
  </svg>
);

const SliderPlanIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="21"
    viewBox="0 0 20 21"
    fill="none"
  >
    <path
      d="M11.25 4.25C11.25 3.91848 11.3817 3.60054 11.6161 3.36612C11.8505 3.1317 12.1685 3 12.5 3H16.25C16.5815 3 16.8995 3.1317 17.1339 3.36612C17.3683 3.60054 17.5 3.91848 17.5 4.25V14.875C17.5 15.7038 17.1708 16.4987 16.5847 17.0847C15.9987 17.6708 15.2038 18 14.375 18H2.5C2.16848 18 1.85054 17.8683 1.61612 17.6339C1.3817 17.3995 1.25 17.0815 1.25 16.75V13C1.25 12.6685 1.3817 12.3505 1.61612 12.1161C1.85054 11.8817 2.16848 11.75 2.5 11.75H6.25V9.25C6.25 8.91848 6.3817 8.60054 6.61612 8.36612C6.85054 8.1317 7.16848 8 7.5 8H11.25V4.25Z"
      fill="#636363"
    />
  </svg>
);

const SliderBillingIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="21"
    viewBox="0 0 20 21"
    fill="none"
  >
    <path
      d="M8.43338 7.91784C8.58818 7.81464 8.77939 7.7224 9 7.65101L9.00001 9.34899C8.77939 9.2776 8.58818 9.18536 8.43338 9.08216C8.06927 8.83942 8 8.6139 8 8.5C8 8.3861 8.06927 8.16058 8.43338 7.91784Z"
      fill="#636363"
    />
    <path
      d="M11 13.349L11 11.651C11.2206 11.7224 11.4118 11.8146 11.5666 11.9178C11.9308 12.1606 12 12.3861 12 12.5C12 12.6139 11.9308 12.8394 11.5666 13.0822C11.4118 13.1854 11.2206 13.2776 11 13.349Z"
      fill="#636363"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M10 18.5C14.4183 18.5 18 14.9183 18 10.5C18 6.08172 14.4183 2.5 10 2.5C5.58172 2.5 2 6.08172 2 10.5C2 14.9183 5.58172 18.5 10 18.5ZM11 5.5C11 4.94772 10.5523 4.5 10 4.5C9.44772 4.5 9 4.94772 9 5.5V5.59199C8.3784 5.70873 7.80348 5.93407 7.32398 6.25374C6.6023 6.73485 6 7.50933 6 8.5C6 9.49067 6.6023 10.2651 7.32398 10.7463C7.80348 11.0659 8.37841 11.2913 9.00001 11.408L9.00002 13.3492C8.60902 13.2223 8.31917 13.0319 8.15667 12.8446C7.79471 12.4275 7.16313 12.3827 6.74599 12.7447C6.32885 13.1067 6.28411 13.7382 6.64607 14.1554C7.20855 14.8036 8.05956 15.2308 9 15.4076L9 15.5C8.99999 16.0523 9.44769 16.5 9.99998 16.5C10.5523 16.5 11 16.0523 11 15.5L11 15.408C11.6216 15.2913 12.1965 15.0659 12.676 14.7463C13.3977 14.2651 14 13.4907 14 12.5C14 11.5093 13.3977 10.7348 12.676 10.2537C12.1965 9.93407 11.6216 9.70873 11 9.59199L11 7.65075C11.391 7.77771 11.6808 7.9681 11.8434 8.15538C12.2053 8.57252 12.8369 8.61726 13.254 8.2553C13.6712 7.89335 13.7159 7.26176 13.354 6.84462C12.7915 6.19637 11.9405 5.76915 11 5.59236V5.5Z"
      fill="#636363"
    />
  </svg>
);

const SliderPaymentsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="21"
    viewBox="0 0 20 21"
    fill="none"
  >
    <path
      d="M4 4.5C2.89543 4.5 2 5.39543 2 6.5V7.5H18V6.5C18 5.39543 17.1046 4.5 16 4.5H4Z"
      fill="#636363"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M18 9.5H2V14.5C2 15.6046 2.89543 16.5 4 16.5H16C17.1046 16.5 18 15.6046 18 14.5V9.5ZM4 13.5C4 12.9477 4.44772 12.5 5 12.5H6C6.55228 12.5 7 12.9477 7 13.5C7 14.0523 6.55228 14.5 6 14.5H5C4.44772 14.5 4 14.0523 4 13.5ZM9 12.5C8.44772 12.5 8 12.9477 8 13.5C8 14.0523 8.44772 14.5 9 14.5H10C10.5523 14.5 11 14.0523 11 13.5C11 12.9477 10.5523 12.5 10 12.5H9Z"
      fill="#636363"
    />
  </svg>
);
const SliderUserPermissionIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="21"
    viewBox="0 0 20 21"
    fill="none"
  >
    <path
      d="M10 9.5C11.6569 9.5 13 8.15685 13 6.5C13 4.84315 11.6569 3.5 10 3.5C8.34315 3.5 7 4.84315 7 6.5C7 8.15685 8.34315 9.5 10 9.5Z"
      fill="#636363"
    />
    <path
      d="M3 18.5C3 14.634 6.13401 11.5 10 11.5C13.866 11.5 17 14.634 17 18.5H3Z"
      fill="#636363"
    />
  </svg>
);
const SliderCheckoutIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="21"
    viewBox="0 0 20 21"
    fill="none"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M10 2.5C7.79086 2.5 6 4.29086 6 6.5V7.5H5C4.49046 7.5 4.06239 7.88314 4.00612 8.38957L3.00612 17.3896C2.97471 17.6723 3.06518 17.955 3.25488 18.1669C3.44458 18.3789 3.71556 18.5 4 18.5H16C16.2844 18.5 16.5554 18.3789 16.7451 18.1669C16.9348 17.955 17.0253 17.6723 16.9939 17.3896L15.9939 8.38957C15.9376 7.88314 15.5096 7.5 15 7.5H14V6.5C14 4.29086 12.2091 2.5 10 2.5ZM12 7.5V6.5C12 5.39543 11.1046 4.5 10 4.5C8.89543 4.5 8 5.39543 8 6.5V7.5H12ZM6 10.5C6 9.94772 6.44772 9.5 7 9.5C7.55228 9.5 8 9.94772 8 10.5C8 11.0523 7.55228 11.5 7 11.5C6.44772 11.5 6 11.0523 6 10.5ZM13 9.5C12.4477 9.5 12 9.94772 12 10.5C12 11.0523 12.4477 11.5 13 11.5C13.5523 11.5 14 11.0523 14 10.5C14 9.94772 13.5523 9.5 13 9.5Z"
      fill="#636363"
    />
  </svg>
);

const SliderTaxesIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="21"
    viewBox="0 0 20 21"
    fill="none"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M5 2.5C3.89543 2.5 3 3.39543 3 4.5V18.5L6.5 16.5L10 18.5L13.5 16.5L17 18.5V4.5C17 3.39543 16.1046 2.5 15 2.5H5ZM7.5 5.5C6.67157 5.5 6 6.17157 6 7C6 7.82843 6.67157 8.5 7.5 8.5C8.32843 8.5 9 7.82843 9 7C9 6.17157 8.32843 5.5 7.5 5.5ZM13.7071 5.79289C13.3166 5.40237 12.6834 5.40237 12.2929 5.79289L6.29289 11.7929C5.90237 12.1834 5.90237 12.8166 6.29289 13.2071C6.68342 13.5976 7.31658 13.5976 7.70711 13.2071L13.7071 7.20711C14.0976 6.81658 14.0976 6.18342 13.7071 5.79289ZM12.5 10.5C11.6716 10.5 11 11.1716 11 12C11 12.8284 11.6716 13.5 12.5 13.5C13.3284 13.5 14 12.8284 14 12C14 11.1716 13.3284 10.5 12.5 10.5Z"
      fill="#636363"
    />
  </svg>
);

const SliderLocationIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="21"
    viewBox="0 0 20 21"
    fill="none"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M5.05025 4.55025C7.78392 1.81658 12.2161 1.81658 14.9497 4.55025C17.6834 7.28392 17.6834 11.7161 14.9497 14.4497L10 19.3995L5.05025 14.4497C2.31658 11.7161 2.31658 7.28392 5.05025 4.55025ZM10 11.5C11.1046 11.5 12 10.6046 12 9.5C12 8.39543 11.1046 7.5 10 7.5C8.89543 7.5 8 8.39543 8 9.5C8 10.6046 8.89543 11.5 10 11.5Z"
      fill="#636363"
    />
  </svg>
);
const SliderCustomerRightsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="21"
    viewBox="0 0 20 21"
    fill="none"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M2.16611 5.49891C5.17437 5.45809 7.91528 4.31033 10 2.44446C12.0847 4.31033 14.8256 5.45809 17.8339 5.49891C17.9431 6.14968 18 6.81821 18 7.50003C18 12.7249 14.6608 17.1698 10 18.8172C5.33923 17.1698 2 12.7249 2 7.50003C2 6.81821 2.05686 6.14968 2.16611 5.49891ZM13.7071 9.20711C14.0976 8.81658 14.0976 8.18342 13.7071 7.79289C13.3166 7.40237 12.6834 7.40237 12.2929 7.79289L9 11.0858L7.70711 9.79289C7.31658 9.40237 6.68342 9.40237 6.29289 9.79289C5.90237 10.1834 5.90237 10.8166 6.29289 11.2071L8.29289 13.2071C8.68342 13.5976 9.31658 13.5976 9.70711 13.2071L13.7071 9.20711Z"
      fill="#636363"
    />
  </svg>
);

const SliderPoliciesIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="21"
    viewBox="0 0 20 21"
    fill="none"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M4 4.5C4 3.39543 4.89543 2.5 6 2.5H10.5858C11.1162 2.5 11.6249 2.71071 12 3.08579L15.4142 6.5C15.7893 6.87507 16 7.38378 16 7.91421V16.5C16 17.6046 15.1046 18.5 14 18.5H6C4.89543 18.5 4 17.6046 4 16.5V4.5ZM6 10.5C6 9.94772 6.44772 9.5 7 9.5H13C13.5523 9.5 14 9.94772 14 10.5C14 11.0523 13.5523 11.5 13 11.5H7C6.44772 11.5 6 11.0523 6 10.5ZM7 13.5C6.44772 13.5 6 13.9477 6 14.5C6 15.0523 6.44772 15.5 7 15.5H13C13.5523 15.5 14 15.0523 14 14.5C14 13.9477 13.5523 13.5 13 13.5H7Z"
      fill="#636363"
    />
  </svg>
);

const SliderPreferencesIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="21"
    viewBox="0 0 20 21"
    fill="none"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M2 5.5C2 4.39543 2.89543 3.5 4 3.5H16C17.1046 3.5 18 4.39543 18 5.5V7.5C18 8.60457 17.1046 9.5 16 9.5H4C2.89543 9.5 2 8.60457 2 7.5V5.5ZM16 6.5C16 7.05228 15.5523 7.5 15 7.5C14.4477 7.5 14 7.05228 14 6.5C14 5.94772 14.4477 5.5 15 5.5C15.5523 5.5 16 5.94772 16 6.5Z"
      fill="#636363"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M2 13.5C2 12.3954 2.89543 11.5 4 11.5H16C17.1046 11.5 18 12.3954 18 13.5V15.5C18 16.6046 17.1046 17.5 16 17.5H4C2.89543 17.5 2 16.6046 2 15.5V13.5ZM16 14.5C16 15.0523 15.5523 15.5 15 15.5C14.4477 15.5 14 15.0523 14 14.5C14 13.9477 14.4477 13.5 15 13.5C15.5523 13.5 16 13.9477 16 14.5Z"
      fill="#636363"
    />
  </svg>
);

const SettingsComponent: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState("Account");

  const menuItems = [
    { icon: <SliderIcon />, label: "Account", id: "account" },
    {
      icon: <SliderMarketIcon />,
      label: "Marketplace Defaults",
      id: "marketplace",
    },
    { icon: <SliderDomainIcon />, label: "Domain", id: "domain" },
    { icon: <SliderLanguagesIcon />, label: "Languages", id: "languages" },
    { icon: <SliderPlanIcon />, label: "Plan", id: "plan" },
    { icon: <SliderBillingIcon />, label: "Billing", id: "billing" },
    { icon: <SliderPaymentsIcon />, label: "Payments", id: "payments" },
    {
      icon: <SliderUserPermissionIcon />,
      label: "User Permission",
      id: "permission",
    },
    { icon: <SliderCheckoutIcon />, label: "Checkout", id: "checkout" },
    { icon: <SliderTaxesIcon />, label: "Taxes", id: "taxes" },
    { icon: <SliderLocationIcon />, label: "Location", id: "location" },
    {
      icon: <SliderCustomerRightsIcon />,
      label: "Customer Rights",
      id: "rights",
    },
    { icon: <SliderPoliciesIcon />, label: "Policies", id: "policies" },
    {
      icon: <SliderPreferencesIcon />,
      label: "Preferences",
      id: "preferences",
    },
  ];

  return (
    <div className="h-[calc(100vh-64px)] flex gap-8 bg-background-grey overflow-y-auto">
      {/* Left Panel - Fixed */}
      <div className="w-[290px] p-6 py-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">General</h2>
        <div className="space-y-2 bg-backgroundWhite p-4 pb-20  rounded-custom">
          {menuItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item.label)}
              className={`flex items-center p-3 ps-4 rounded-custom font-inter font-[14px] leading-[21px] font-[500px] cursor-pointer ${
                selectedItem === item.label
                  ? "bg-subMenus border-gray-200 rounded-custom"
                  : "hover:bg-gray-50 border-gray-200"
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              <span className="flex-1 text-[12px] font-inter font-[14px] leading-[21px] font-[400px]   text-verifyOtp">
                {item.label}
              </span>
              {/* <ChevronRight className="w-4 h-4 text-gray-400" /> */}
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-[675px] mt-10">
        {selectedItem === "Account" && <AccountForm />}
        {selectedItem === "Marketplace Defaults" && <MarketplaceDefaultsForm />}
        {selectedItem === "Domain" && <DomainForm />}
        {selectedItem === "Languages" && <LanguagesForm />}
        {selectedItem === "Plan" && <PlanForm />}
        {selectedItem === "Billing" && <BillingForm />}
      </div>
    </div>
  );
};

export default SettingsComponent;
