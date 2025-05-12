import React, { useState, useRef, useEffect } from 'react';
import Toggle from '../shared/Toggle';
import TimePicker from '../shared/TimePicker';

interface FeaturedListingProps {
  initialEnabled?: boolean;
}

const FeaturedListing: React.FC<FeaturedListingProps> = ({ initialEnabled = true }) => {
  // Toggle state
  const [featuredListingEnabled, setFeaturedListingEnabled] = useState(initialEnabled);
  
  // Date picker state
  const [startDatePickerOpen, setStartDatePickerOpen] = useState(false);
  const [endDatePickerOpen, setEndDatePickerOpen] = useState(false);
  const [featureDates, setFeatureDates] = useState({
    startDate: new Date(2025, 3, 8), // April 8, 2025
    endDate: new Date(2025, 3, 8),
  });

  // Time picker state
  const [startTimeDropdownOpen, setStartTimeDropdownOpen] = useState(false);
  const [endTimeDropdownOpen, setEndTimeDropdownOpen] = useState(false);
  const [selectedTimes, setSelectedTimes] = useState({
    startTime: "9:00am",
    endTime: "10:00am",
  });

  // Refs for calendar and time dropdowns
  const startDatePickerRef = useRef<HTMLDivElement>(null);
  const endDatePickerRef = useRef<HTMLDivElement>(null);
  const startTimeDropdownRef = useRef<HTMLDivElement>(null);
  const endTimeDropdownRef = useRef<HTMLDivElement>(null);

  // Handle featured listing toggle
  const handleFeaturedListingToggle = () => {
    setFeaturedListingEnabled(!featuredListingEnabled);
  };

  // Time options for dropdowns
  const timeOptions = [
    "12:00am", "1:00am", "2:00am", "3:00am", "4:00am", "5:00am", "6:00am", "7:00am", 
    "8:00am", "9:00am", "10:00am", "11:00am", "12:00pm", "1:00pm", "2:00pm", "3:00pm", 
    "4:00pm", "5:00pm", "6:00pm", "7:00pm", "8:00pm", "9:00pm", "10:00pm", "11:00pm",
  ];

  // Handle time selection
  const handleTimeSelect = (time: string, type: "startTime" | "endTime") => {
    setSelectedTimes((prev) => ({
      ...prev,
      [type]: time,
    }));

    if (type === "startTime") {
      setStartTimeDropdownOpen(false);
    } else {
      setEndTimeDropdownOpen(false);
    }
  };

  // Handle feature date selection
  const handleFeatureDateSelect = (date: Date, type: "startDate" | "endDate"): void => {
    setFeatureDates((prev) => ({
      ...prev,
      [type]: date,
    }));

    if (type === "startDate") {
      setStartDatePickerOpen(false);
    } else {
      setEndDatePickerOpen(false);
    }
  };

  // Format date with suffix (e.g., "8th April 2025")
  const formatDateWithSuffix = (date: Date): string => {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      return "";
    }

    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();

    // Add suffix to day
    let suffix = "th";
    if (day % 10 === 1 && day !== 11) suffix = "st";
    else if (day % 10 === 2 && day !== 12) suffix = "nd";
    else if (day % 10 === 3 && day !== 13) suffix = "rd";

    return `${day}${suffix} ${month} ${year}`;
  };

  // Click outside to close dropdowns
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        startDatePickerRef.current &&
        !startDatePickerRef.current.contains(event.target as Node)
      ) {
        setStartDatePickerOpen(false);
      }
      if (
        endDatePickerRef.current &&
        !endDatePickerRef.current.contains(event.target as Node)
      ) {
        setEndDatePickerOpen(false);
      }
      if (
        startTimeDropdownRef.current &&
        !startTimeDropdownRef.current.contains(event.target as Node)
      ) {
        setStartTimeDropdownOpen(false);
      }
      if (
        endTimeDropdownRef.current &&
        !endTimeDropdownRef.current.contains(event.target as Node)
      ) {
        setEndTimeDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-white border border-reloadBorder rounded-custom8px mb-6">
      <div className="p-4">
        <div className="flex items-center mb-2">
          <button
            className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors focus:outline-none ${
              featuredListingEnabled ? "bg-bgButton" : "bg-gray-300"
            }`}
            onClick={handleFeaturedListingToggle}
            role="switch"
            aria-checked={featuredListingEnabled}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                featuredListingEnabled ? "translate-x-7" : "translate-x-1"
              }`}
            />
          </button>
          <span className="font-inter text-[12px] font-[600] text-textHeading ml-4">
            Featured Listing
          </span>
        </div>
        <p className="text-[12px] font-[500] font-inter text-cardTitle mb-4">
          Enable sponsorship to feature a merchant at the top of
          listings for increased visibility.
        </p>
        <div className="border border-grey-border mb-3"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 ">
          <div>
            <label className="block text-[12px] font-[600] font-inter text-paragraphBlack mb-2">
              Start and End date
            </label>
            <div className="flex items-center">
              {/* Start Date Input */}
              <div className="relative flex-1">
                <div
                  className="w-full py-3 pl-3 pr-8 border border-reloadBorder text-[12px] font-[400] font-inter text-headding-color rounded-custom cursor-pointer"
                  onClick={() => setStartDatePickerOpen(true)}
                >
                  {formatDateWithSuffix(featureDates.startDate)}
                </div>
                <div
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                  onClick={() => setStartDatePickerOpen(true)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M4.8001 1.59998C4.35827 1.59998 4.0001 1.95815 4.0001 2.39998V3.19998H3.2001C2.31644 3.19998 1.6001 3.91632 1.6001 4.79998V12.8C1.6001 13.6836 2.31644 14.4 3.2001 14.4H12.8001C13.6838 14.4 14.4001 13.6836 14.4001 12.8V4.79998C14.4001 3.91632 13.6838 3.19998 12.8001 3.19998H12.0001V2.39998C12.0001 1.95815 11.6419 1.59998 11.2001 1.59998C10.7583 1.59998 10.4001 1.95815 10.4001 2.39998V3.19998H5.6001V2.39998C5.6001 1.95815 5.24193 1.59998 4.8001 1.59998ZM4.8001 5.59998C4.35827 5.59998 4.0001 5.95815 4.0001 6.39998C4.0001 6.8418 4.35827 7.19998 4.8001 7.19998H11.2001C11.6419 7.19998 12.0001 6.8418 12.0001 6.39998C12.0001 5.95815 11.6419 5.59998 11.2001 5.59998H4.8001Z"
                      fill="#636363"
                    />
                  </svg>
                </div>

                {/* Start Date Picker Dropdown */}
                {startDatePickerOpen && (
                  <div
                    ref={startDatePickerRef}
                    className="absolute z-50 mt-1 bg-white border border-gray-200 rounded-md shadow-lg p-4 left-0 w-[300px]"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <button
                        className="p-1 hover:bg-purple-100 rounded-full text-purple-600"
                        onClick={() => {
                          const newDate = new Date(featureDates.startDate);
                          newDate.setMonth(newDate.getMonth() - 1);
                          setFeatureDates((prev) => ({
                            ...prev,
                            startDate: newDate,
                          }));
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                      </button>

                      <h3 className="text-textHeading font-inter font-[500] text-[14px]">
                        {featureDates.startDate.toLocaleString("default", {
                          month: "long"
                        })}{" "}
                        {featureDates.startDate.getFullYear()}
                      </h3>

                      <button
                        className="p-1 hover:bg-purple-100 rounded-full text-purple-600"
                        onClick={() => {
                          const newDate = new Date(featureDates.startDate);
                          newDate.setMonth(newDate.getMonth() + 1);
                          setFeatureDates((prev) => ({
                            ...prev,
                            startDate: newDate,
                          }));
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                      </button>
                    </div>

                    {/* Calendar Grid - Days of Week Header */}
                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                        <div
                          key={i}
                          className="text-center text-[12px] font-inter font-[500] text-gray-500"
                        >
                          {day}
                        </div>
                      ))}
                    </div>

                    {/* Calendar Days */}
                    <div className="grid grid-cols-7 gap-1">
                      {(() => {
                        const date = new Date(featureDates.startDate);
                        const firstDay = new Date(
                          date.getFullYear(),
                          date.getMonth(),
                          1
                        ).getDay();
                        const daysInMonth = new Date(
                          date.getFullYear(),
                          date.getMonth() + 1,
                          0
                        ).getDate();

                        const days = [];

                        // Add empty cells for days before the 1st of the month
                        for (let i = 0; i < firstDay; i++) {
                          days.push(
                            <div
                              key={`empty-${i}`}
                              className="text-center p-2"
                            ></div>
                          );
                        }

                        // Add days of the month
                        for (let day = 1; day <= daysInMonth; day++) {
                          const currentDate = new Date(
                            date.getFullYear(),
                            date.getMonth(),
                            day
                          );

                          days.push(
                            <button
                              key={`day-${day}`}
                              className={`
                                text-center text-[14px] font-inter font-[400] p-2 rounded-full
                                ${
                                  currentDate.getDate() === featureDates.startDate.getDate()
                                    ? "bg-bgButton text-white"
                                    : "hover:bg-purple-100"
                                }
                              `}
                              onClick={() => handleFeatureDateSelect(currentDate, "startDate")}
                            >
                              {day}
                            </button>
                          );
                        }

                        return days;
                      })()}
                    </div>
                  </div>
                )}
              </div>

              {/* Separator */}
              <span className="mx-4 text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M5 10C5 9.44772 5.44772 9 6 9L14 9C14.5523 9 15 9.44772 15 10C15 10.5523 14.5523 11 14 11L6 11C5.44772 11 5 10.5523 5 10Z"
                    fill="#2B2B2B"
                  />
                </svg>
              </span>

              {/* End Date Input */}
              <div className="relative flex-1">
                <div
                  className="w-full py-3 pl-3 pr-8 border border-reloadBorder text-[12px] font-[400] font-inter text-headding-color rounded-custom cursor-pointer"
                  onClick={() => setEndDatePickerOpen(true)}
                >
                  {formatDateWithSuffix(featureDates.endDate)}
                </div>
                <div
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                  onClick={() => setEndDatePickerOpen(true)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M4.8001 1.59998C4.35827 1.59998 4.0001 1.95815 4.0001 2.39998V3.19998H3.2001C2.31644 3.19998 1.6001 3.91632 1.6001 4.79998V12.8C1.6001 13.6836 2.31644 14.4 3.2001 14.4H12.8001C13.6838 14.4 14.4001 13.6836 14.4001 12.8V4.79998C14.4001 3.91632 13.6838 3.19998 12.8001 3.19998H12.0001V2.39998C12.0001 1.95815 11.6419 1.59998 11.2001 1.59998C10.7583 1.59998 10.4001 1.95815 10.4001 2.39998V3.19998H5.6001V2.39998C5.6001 1.95815 5.24193 1.59998 4.8001 1.59998ZM4.8001 5.59998C4.35827 5.59998 4.0001 5.95815 4.0001 6.39998C4.0001 6.8418 4.35827 7.19998 4.8001 7.19998H11.2001C11.6419 7.19998 12.0001 6.8418 12.0001 6.39998C12.0001 5.95815 11.6419 5.59998 11.2001 5.59998H4.8001Z"
                      fill="#636363"
                    />
                  </svg>
                </div>

                {/* End Date Picker Dropdown */}
                {endDatePickerOpen && (
                  <div
                    ref={endDatePickerRef}
                    className="absolute z-50 mt-1 bg-white border border-gray-200 rounded-md shadow-lg p-4 right-0 w-[300px]"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <button 
                        className="p-1 hover:bg-purple-100 rounded-full text-purple-600"
                        onClick={() => {
                          const newDate = new Date(featureDates.endDate);
                          newDate.setMonth(newDate.getMonth() - 1);
                          setFeatureDates((prev) => ({
                            ...prev,
                            endDate: newDate,
                          }));
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                      </button>
                      <h3 className="text-textHeading font-inter font-[500] text-[14px]">
                        {featureDates.endDate.toLocaleString("default", { 
                          month: "long" 
                        })}{" "}
                        {featureDates.endDate.getFullYear()}
                      </h3>
                      <button 
                        className="p-1 hover:bg-purple-100 rounded-full text-purple-600"
                        onClick={() => {
                          const newDate = new Date(featureDates.endDate);
                          newDate.setMonth(newDate.getMonth() + 1);
                          setFeatureDates((prev) => ({
                            ...prev,
                            endDate: newDate,
                          }));
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                      </button>
                    </div>
                    
                    {/* Calendar days of week header */}
                    <div className="grid grid-cols-7 gap-1 mb-2">
                      {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                        <div
                          key={i}
                          className="text-center text-[12px] font-inter font-[500] text-gray-500"
                        >
                          {day}
                        </div>
                      ))}
                    </div>
                    
                    {/* Calendar grid for end date */}
                    <div className="grid grid-cols-7 gap-1">
                      {(() => {
                        const date = new Date(featureDates.endDate);
                        const firstDay = new Date(
                          date.getFullYear(),
                          date.getMonth(),
                          1
                        ).getDay();
                        const daysInMonth = new Date(
                          date.getFullYear(),
                          date.getMonth() + 1,
                          0
                        ).getDate();

                        const days = [];

                        // Add empty cells for days before the 1st of the month
                        for (let i = 0; i < firstDay; i++) {
                          days.push(
                            <div
                              key={`empty-${i}`}
                              className="text-center p-2"
                            ></div>
                          );
                        }

                        // Add days of the month
                        for (let day = 1; day <= daysInMonth; day++) {
                          const currentDate = new Date(
                            date.getFullYear(),
                            date.getMonth(),
                            day
                          );

                          days.push(
                            <button
                              key={`day-${day}`}
                              className={`
                                text-center text-[14px] font-inter font-[400] p-2 rounded-full
                                ${
                                  currentDate.getDate() === featureDates.endDate.getDate()
                                    ? "bg-bgButton text-white"
                                    : "hover:bg-purple-100"
                                }
                              `}
                              onClick={() => handleFeatureDateSelect(currentDate, "endDate")}
                            >
                              {day}
                            </button>
                          );
                        }

                        return days;
                      })()}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div>
            <label className="block text-[12px] font-[600] font-inter text-paragraphBlack mb-2">
              Time
            </label>
            <div className="flex items-center">
              {/* Start Time Dropdown */}
              <div className="relative flex-1">
                <div
                  className="w-full py-3 pl-3 pr-8 border border-reloadBorder text-[16px] font-[500] font-inter text-black rounded-md cursor-pointer flex items-center justify-between"
                  onClick={() => setStartTimeDropdownOpen(!startTimeDropdownOpen)}
                >
                  <span className="text-[12px] font-[500] font-inter text-headding-color tracking-widest">
                    {selectedTimes.startTime}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    className="absolute right-3"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M4.23431 5.83429C4.54673 5.52187 5.05327 5.52187 5.36569 5.83429L8 8.4686L10.6343 5.83429C10.9467 5.52187 11.4533 5.52187 11.7657 5.83429C12.0781 6.14671 12.0781 6.65324 11.7657 6.96566L8.56569 10.1657C8.25327 10.4781 7.74673 10.4781 7.43431 10.1657L4.23431 6.96566C3.9219 6.65324 3.9219 6.14671 4.23431 5.83429Z"
                      fill="#636363"
                    />
                  </svg>
                </div>

                {/* Start Time Options Dropdown */}
                <TimePicker 
                  isOpen={startTimeDropdownOpen}
                  onClose={() => setStartTimeDropdownOpen(false)}
                  selectedTime={selectedTimes.startTime}
                  timeOptions={timeOptions}
                  onTimeSelect={(time) => handleTimeSelect(time, "startTime")}
                />
              </div>

              {/* Separator */}
              <span className="mx-4 text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M5 10C5 9.44772 5.44772 9 6 9L14 9C14.5523 9 15 9.44772 15 10C15 10.5523 14.5523 11 14 11L6 11C5.44772 11 5 10.5523 5 10Z"
                    fill="#2B2B2B"
                  />
                </svg>
              </span>

              {/* End Time Dropdown */}
              <div className="relative flex-1">
                <div
                  className="w-full py-3 pl-3 pr-8 border border-reloadBorder text-[16px] font-[500] font-inter text-black rounded-md cursor-pointer flex items-center justify-between"
                  onClick={() => setEndTimeDropdownOpen(!endTimeDropdownOpen)}
                >
                  <span className="text-[12px] font-[500] font-inter text-headding-color tracking-widest">
                    {selectedTimes.endTime}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="absolute right-3"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M4.23431 5.83429C4.54673 5.52187 5.05327 5.52187 5.36569 5.83429L8 8.4686L10.6343 5.83429C10.9467 5.52187 11.4533 5.52187 11.7657 5.83429C12.0781 6.14671 12.0781 6.65324 11.7657 6.96566L8.56569 10.1657C8.25327 10.4781 7.74673 10.4781 7.43431 10.1657L4.23431 6.96566C3.9219 6.65324 3.9219 6.14671 4.23431 5.83429Z"
                      fill="#636363"
                    />
                  </svg>
                </div>

                {/* End Time Options Dropdown */}
                <TimePicker 
                  isOpen={endTimeDropdownOpen}
                  onClose={() => setEndTimeDropdownOpen(false)}
                  selectedTime={selectedTimes.endTime}
                  timeOptions={timeOptions}
                  onTimeSelect={(time) => handleTimeSelect(time, "endTime")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedListing;