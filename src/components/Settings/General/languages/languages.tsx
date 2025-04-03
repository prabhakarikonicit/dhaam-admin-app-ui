import React, { useState } from "react";
interface LanguageOption {
  value: string;
  label: string;
  checked?: boolean;
}
const ArrowsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 3C10.2652 3 10.5196 3.10536 10.7071 3.29289L13.7071 6.29289C14.0976 6.68342 14.0976 7.31658 13.7071 7.70711C13.3166 8.09763 12.6834 8.09763 12.2929 7.70711L10 5.41421L7.70711 7.70711C7.31658 8.09763 6.68342 8.09763 6.29289 7.70711C5.90237 7.31658 5.90237 6.68342 6.29289 6.29289L9.29289 3.29289C9.48043 3.10536 9.73478 3 10 3ZM6.29289 12.2929C6.68342 11.9024 7.31658 11.9024 7.70711 12.2929L10 14.5858L12.2929 12.2929C12.6834 11.9024 13.3166 11.9024 13.7071 12.2929C14.0976 12.6834 14.0976 13.3166 13.7071 13.7071L10.7071 16.7071C10.3166 17.0976 9.68342 17.0976 9.29289 16.7071L6.29289 13.7071C5.90237 13.3166 5.90237 12.6834 6.29289 12.2929Z"
      fill="#636363"
    />
  </svg>
);

const MoreVerticalIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
  >
    <path
      d="M7.0001 4.19999C6.2269 4.19999 5.6001 3.57319 5.6001 2.79999C5.6001 2.0268 6.2269 1.39999 7.0001 1.39999C7.7733 1.39999 8.4001 2.0268 8.4001 2.79999C8.4001 3.57319 7.7733 4.19999 7.0001 4.19999Z"
      fill="#212121"
    />
    <path
      d="M7.0001 8.39999C6.2269 8.39999 5.6001 7.77319 5.6001 6.99999C5.6001 6.2268 6.2269 5.59999 7.0001 5.59999C7.7733 5.59999 8.4001 6.2268 8.4001 6.99999C8.4001 7.77319 7.7733 8.39999 7.0001 8.39999Z"
      fill="#212121"
    />
    <path
      d="M7.0001 12.6C6.2269 12.6 5.6001 11.9732 5.6001 11.2C5.6001 10.4268 6.2269 9.79999 7.0001 9.79999C7.7733 9.79999 8.4001 10.4268 8.4001 11.2C8.4001 11.9732 7.7733 12.6 7.0001 12.6Z"
      fill="#212121"
    />
  </svg>
);

const ChevronRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.10493 10.295C4.83156 10.0216 4.83156 9.57839 5.10493 9.30503L7.40995 7L5.10493 4.69497C4.83156 4.42161 4.83156 3.97839 5.10493 3.70503C5.37829 3.43166 5.82151 3.43166 6.09488 3.70503L8.89488 6.50503C9.16824 6.77839 9.16824 7.22161 8.89488 7.49497L6.09488 10.295C5.82151 10.5683 5.37829 10.5683 5.10493 10.295Z"
      fill="#212121"
    />
  </svg>
);

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.4001 3.20001C4.63279 3.20001 3.2001 4.63269 3.2001 6.40001C3.2001 8.16732 4.63279 9.60001 6.4001 9.60001C8.16741 9.60001 9.6001 8.16732 9.6001 6.40001C9.6001 4.63269 8.16741 3.20001 6.4001 3.20001ZM1.6001 6.40001C1.6001 3.74904 3.74913 1.60001 6.4001 1.60001C9.05106 1.60001 11.2001 3.74904 11.2001 6.40001C11.2001 7.43667 10.8715 8.39658 10.3127 9.18123L14.1658 13.0343C14.4782 13.3467 14.4782 13.8533 14.1658 14.1657C13.8534 14.4781 13.3468 14.4781 13.0344 14.1657L9.18133 10.3126C8.39667 10.8714 7.43676 11.2 6.4001 11.2C3.74913 11.2 1.6001 9.05097 1.6001 6.40001Z"
      fill="#949494"
    />
  </svg>
);

const InfoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
  >
    <path
      d="M9.75 12H9V9H8.25M9 6H9.0075M15.75 9C15.75 12.7279 12.7279 15.75 9 15.75C5.27208 15.75 2.25 12.7279 2.25 9C2.25 5.27208 5.27208 2.25 9 2.25C12.7279 2.25 15.75 5.27208 15.75 9Z"
      stroke="#949494"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
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
    <div className="max-w-full rounded-custom12px p-6 md:p-2 sm:p-2 lg:p-0 xl:p-0 sm:max-h-full md:max-h-full lg:max-h-full xl:max-h-full max-h-[80vh] overflow-y-auto sm:overflow-visible md:overflow-visible lg:overflow-visible xl:overflow-visible mt-0 sm:mt-6 md:mt-8 lg:mt-12 xl-mt-12">
      <h2 className="text-[14px] font-inter font-[600] text-headding-color mb-3">
        Languages
      </h2>

      <div className="space-y-4 ">
        <div className="bg-backgroundWhite rounded-custom p-6">
          <label className="block text-[12px] font-inter font-[500] text-paragraphBlack mb-3">
            Published language for website
          </label>
          <div className="relative">
            <select className="w-full p-3 pl-4 pr-10 font-inter text-reloadBorder appearance-none  border border-reloadBorder rounded-custom8px text-[12px] bg-white ">
              <option className="font-inter text-reloadBorder">Default | English</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <ArrowsIcon />
            </div>
          </div>

          <div className="bg-backgroundWhite mt-4">
          <label className="block text-[12px] font-inter font-[500] text-paragraphBlack mb-3">
            Published language for admin dashboard
          </label>
          <div className="relative">
            <select className="w-full p-3 pl-4 pr-10 font-inter text-reloadBorder appearance-none border border-reloadBorder rounded-custom8px text-[12px] bg-white">
              <option className="font-inter text-reloadBorder">Default | English</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <ArrowsIcon />
            </div>
          </div>
        </div>
        </div>

        <div className="flex items-center justify-between p-3 bg-backgroundWhite border border-gray-200 rounded-custom">
          <span className="text-[12px] font-inter font-[500] text-paragraphBlack mb-3 mt-2">
            Add more language
          </span>
          <div className="bg-backgroundWhite p-2 rounded-lg border border-reloadBorder">
            <MoreVerticalIcon />
          </div>
        </div>

        <div className="flex items-center justify-between p-3 bg-backgroundWhite border border-gray-200 rounded-lg">
          <span className="text-[12px] font-inter font-[500] text-paragraphBlack mb-3 mt-2">
            Add translation
          </span>
          <div className="bg-backgroundWhite p-2 rounded-lg border border-reloadBorder">
            <ChevronRightIcon />
          </div>
        </div>

        <div className="bg-backgroundWhite p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-[12px] font-inter font-[500] text-paragraphBlack mb-3 mt-2">
                Language for your customers
              </span>
              <InfoIcon />
            </div>

            <div className="relative ml-7">
              <input
                type="text"
                placeholder="Search language"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-[250px] sm:w-[250px] lg:w-[250px] pl-3 pr-10  py-2 border border-gray-200 text-[12px] font-inter font-[500] rounded-lg  placeholder:text-reloadBorder focus:ring-1 focus:ring-menuSubHeadingColor"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <SearchIcon />
              </div>
            </div>
          </div>
       {/* Divider */}
       <hr className="my-4 border-t border-gray-200" />
          <div className="grid md:grid-cols-5 sm:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 grid-cols-2  gap-2 ">
            {filteredLanguages.map((lang) => (
              <div key={lang.value} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={lang.value}
                  checked={lang.checked}
                  onChange={() => handleLanguageToggle(lang.value)}
                  className="h-4 w-4 rounded accent-bgButton focus:ring-bgButton transition"
                />
                <label
                  htmlFor={lang.value}
                  className="text-[12px] font-inter font-[500] rounded-lg"
                >
                  {lang.label}
                </label>
              </div>
            ))}
          </div>
        </div>


      </div>
      <div className="mt-8 bg-backgroundWhite p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[12px] font-inter font-[500] text-paragraphBlack mb-3">
            Learn about how to change language and translation
          </span>
          <button className="text-[12px] font-inter font-[600] text-paragraphBlack mb-3">
            Learn More
          </button>
        </div>

        <div className="relative w-full h-[220px] bg-black rounded-lg overflow-hidden">
          <img
            src="/api/placeholder/800/450"
            alt="Video thumbnail"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="47"
                height="47"
                viewBox="0 0 47 47"
                fill="none"
              >
                <rect
                  x="0.5"
                  y="0.0953369"
                  width="46"
                  height="46"
                  rx="23"
                  fill="white"
                  fillOpacity="0.26"
                />
                <path
                  d="M32.909 20.5437C33.3893 20.7991 33.791 21.1804 34.0712 21.6467C34.3514 22.113 34.4994 22.6468 34.4994 23.1907C34.4994 23.7347 34.3514 24.2685 34.0712 24.7348C33.791 25.201 33.3893 25.5823 32.909 25.8377L20.097 32.8047C18.034 33.9277 15.5 32.4677 15.5 30.1587V16.2237C15.5 13.9137 18.034 12.4547 20.097 13.5757L32.909 20.5437Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguagesForm;
