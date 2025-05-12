import React, { useState, useRef, useEffect } from "react";
import { DateRange, CurrentMonthState } from "../types";

const ActivityLog: React.FC = () => {
  // State for filter dropdown
  const [showAllDropdown, setShowAllDropdown] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const allDropdownRef = useRef<HTMLDivElement>(null);

  // State for date picker
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: new Date(2025, 4, 8), // May 8, 2025
    endDate: new Date(2025, 5, 11), // June 11, 2025
  });
  // State to control whether to show dates or placeholder
  const [showPlaceholder, setShowPlaceholder] = useState(true);

  const [selectionMode, setSelectionMode] = useState<"start" | "end">("start");
  const [currentMonth, setCurrentMonth] = useState<CurrentMonthState>({
    primaryMonth: new Date(2025, 4, 1), // May 2025
    secondaryMonth: new Date(2025, 5, 1), // June 2025
  });
  const datePickerRef = useRef<HTMLDivElement>(null);

  // Click outside to close dropdowns
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        allDropdownRef.current &&
        !allDropdownRef.current.contains(event.target as Node)
      ) {
        setShowAllDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Navigation functions for date picker
  const goToPreviousMonth = () => {
    setCurrentMonth((prev) => {
      const newPrimaryMonth = new Date(prev.primaryMonth);
      newPrimaryMonth.setMonth(newPrimaryMonth.getMonth() - 1);

      const newSecondaryMonth = new Date(prev.secondaryMonth);
      newSecondaryMonth.setMonth(newSecondaryMonth.getMonth() - 1);

      return {
        primaryMonth: newPrimaryMonth,
        secondaryMonth: newSecondaryMonth,
      };
    });
  };

  const goToNextMonth = () => {
    setCurrentMonth((prev) => {
      const newPrimaryMonth = new Date(prev.primaryMonth);
      newPrimaryMonth.setMonth(newPrimaryMonth.getMonth() + 1);

      const newSecondaryMonth = new Date(prev.secondaryMonth);
      newSecondaryMonth.setMonth(newSecondaryMonth.getMonth() + 1);

      return {
        primaryMonth: newPrimaryMonth,
        secondaryMonth: newSecondaryMonth,
      };
    });
  };

  // Handle date selection
  const handleDateSelect = (date: Date): void => {
    if (selectionMode === "start") {
      // We're selecting the start date
      setDateRange({
        startDate: date,
        endDate: date, // Initially set end date same as start
      });
      setSelectionMode("end"); // Switch to selecting end date next
      // When a date is selected, we want to show it
      setShowPlaceholder(false);
    } else {
      // We're selecting the end date
      if (date.getTime() < dateRange.startDate.getTime()) {
        // If selected end date is before start date, swap them
        setDateRange({
          startDate: date,
          endDate: dateRange.startDate,
        });
      } else {
        // Normal case: end date is after start date
        setDateRange((prev) => ({
          ...prev,
          endDate: date,
        }));
      }
      setSelectionMode("start"); // Reset selection mode for next time
      // Make sure we're showing the dates
      setShowPlaceholder(false);
    }
  };

  // Format date to display format (MM/DD/YYYY)
  const formatDateForDisplay = (date: Date): string => {
    // Ensure we're working with a valid Date object
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      return "";
    }
    return `${(date.getMonth() + 1).toString().padStart(2, "0")}/${date
      .getDate()
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;
  };

  // When Apply button is clicked on the date picker
  const handleApplyDate = () => {
    setShowDatePicker(false);
    setShowPlaceholder(false); // Show the actual dates after apply
  };

  return (
    <div className="bg-white border border-reloadBorder rounded-lg overflow-hidden">
      <div className="bg-background-grey p-4 pl-5 border-b border-reloadBorder">
        <h2 className="font-inter text-[14px] font-[600] text-textHeading mb-2">
          Store Activity Log
        </h2>
        <div className="flex justify-between items-center">
          <p className="text-[12px] font-[500] font-inter text-cardTitle">
            Track and view all actions and updates made by stores for better
            monitoring and accountability.
          </p>

          <div className="flex items-center space-x-2 -mt-8">
            <div className="relative w-80">
              <div
                className="w-full border border-reloadBorder rounded-custom px-4 py-3 flex items-center justify-between focus:outline-none bg-backgroundWhite cursor-pointer"
                onClick={() => setShowAllDropdown(!showAllDropdown)}
              >
                <span className="text-[12px] font-[600] font-inter text-black">
                  {selectedFilter}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="15"
                  viewBox="0 0 14 15"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M3.70503 5.60505C3.97839 5.33168 4.42161 5.33168 4.69497 5.60505L7 7.91007L9.30503 5.60505C9.57839 5.33168 10.0216 5.33168 10.295 5.60505C10.5683 5.87842 10.5683 6.32163 10.295 6.595L7.49497 9.395C7.22161 9.66837 6.77839 9.66837 6.50503 9.395L3.70503 6.595C3.43166 6.32163 3.43166 5.87842 3.70503 5.60505Z"
                    fill="#212121"
                  />
                </svg>
              </div>

              {/* All Dropdown Menu */}
              {showAllDropdown && (
                <div
                  ref={allDropdownRef}
                  className="absolute z-50 mt-1 bg-white border border-gray-200 rounded-md shadow-lg w-full"
                >
                  <ul className="py-1">
                    {["All", "Today", "This Week", "This Month", "Custom"].map(
                      (option) => (
                        <li
                          key={option}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-[14px] font-inter flex justify-between items-center"
                          onClick={() => {
                            setSelectedFilter(option);
                            setShowAllDropdown(false);
                          }}
                        >
                          {option}
                          {selectedFilter === option && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                            >
                              <path
                                d="M6.5 10.5L3.5 7.5L4.5 6.5L6.5 8.5L11.5 3.5L12.5 4.5L6.5 10.5Z"
                                fill="#212121"
                              />
                            </svg>
                          )}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}
            </div>

            {/* Date Range Selector */}
            <div className="relative w-80">
              <div
                className="w-full border border-reloadBorder rounded-custom font-inter px-4 py-3 flex items-center justify-between focus:outline-none bg-backgroundWhite cursor-pointer"
                onClick={() => {
                  setShowDatePicker(!showDatePicker);
                }}
              >
                <span className="text-[12px] font-[600] font-inter text-black">
                  {/* This is the key change - show "Date Range" text if showPlaceholder is true */}
                  {showPlaceholder
                    ? "Date Range"
                    : `${formatDateForDisplay(
                        dateRange.startDate
                      )} - ${formatDateForDisplay(dateRange.endDate)}`}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="15"
                  viewBox="0 0 14 15"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M4.1999 1.90002C3.8133 1.90002 3.4999 2.21343 3.4999 2.60002V3.30002H2.7999C2.0267 3.30002 1.3999 3.92683 1.3999 4.70002V11.7C1.3999 12.4732 2.0267 13.1 2.7999 13.1H11.1999C11.9731 13.1 12.5999 12.4732 12.5999 11.7V4.70002C12.5999 3.92683 11.9731 3.30002 11.1999 3.30002H10.4999V2.60002C10.4999 2.21343 10.1865 1.90002 9.7999 1.90002C9.4133 1.90002 9.0999 2.21343 9.0999 2.60002V3.30002H4.8999V2.60002C4.8999 2.21343 4.5865 1.90002 4.1999 1.90002ZM4.1999 5.40002C3.8133 5.40002 3.4999 5.71343 3.4999 6.10002C3.4999 6.48662 3.8133 6.80002 4.1999 6.80002H9.7999C10.1865 6.80002 10.4999 6.48662 10.4999 6.10002C10.4999 5.71343 10.1865 5.40002 9.7999 5.40002H4.1999Z"
                    fill="#212121"
                  />
                </svg>
              </div>

              {/* Date Picker Component */}
              {showDatePicker && (
                <div
                  ref={datePickerRef}
                  className="absolute z-50 mt-1 bg-white border border-gray-200 rounded-md shadow-lg p-4 right-0 w-[36rem]"
                  style={{ width: "630px" }}
                >
                  <div className="flex justify-between items-center mb-4 ">
                    <button
                      className="p-1 hover:bg-purple-100 rounded-full text-purple-600"
                      onClick={goToPreviousMonth}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
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

                    <div className="flex justify-center space-x-32">
                      <h3 className="text-textHeading font-inter font-[500] text-[16px]">
                        {getMonthName(currentMonth.primaryMonth)}{" "}
                        {currentMonth.primaryMonth.getFullYear()}
                      </h3>
                      <h3 className="text-textHeading font-inter font-[500] text-[16px]">
                        {getMonthName(currentMonth.secondaryMonth)}{" "}
                        {currentMonth.secondaryMonth.getFullYear()}
                      </h3>
                    </div>

                    <button
                      className="p-1 hover:bg-purple-100 rounded-full text-purple-600"
                      onClick={goToNextMonth}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
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

                  <div className="flex justify-between space-x-4 ">
                    {/* Primary Month */}
                    <div className="flex-1 ">
                      <div className="grid grid-cols-7 gap-1 mb-2 ">
                        {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                          <div
                            key={i}
                            className="text-center text-[12px] font-inter font-[500] text-gray-500"
                          >
                            {day}
                          </div>
                        ))}
                      </div>

                      <div className="grid grid-cols-7 gap-1 ">
                        {(() => {
                          // Helper functions
                          const getDaysInMonth = (date: Date): number => {
                            return new Date(
                              date.getFullYear(),
                              date.getMonth() + 1,
                              0
                            ).getDate();
                          };

                          const isSelectedDate = (date: Date): boolean => {
                            if (
                              !date ||
                              !dateRange.startDate ||
                              !dateRange.endDate
                            )
                              return false;
                            return (
                              isSameDay(date, dateRange.startDate) ||
                              isSameDay(date, dateRange.endDate)
                            );
                          };

                          const isInRange = (date: Date): boolean => {
                            if (
                              !date ||
                              !dateRange.startDate ||
                              !dateRange.endDate
                            )
                              return false;
                            const dateTime = date.getTime();
                            const startTime = dateRange.startDate.getTime();
                            const endTime = dateRange.endDate.getTime();
                            return dateTime > startTime && dateTime < endTime;
                          };

                          const isSameDay = (
                            date1: Date,
                            date2: Date
                          ): boolean => {
                            return (
                              date1.getDate() === date2.getDate() &&
                              date1.getMonth() === date2.getMonth() &&
                              date1.getFullYear() === date2.getFullYear()
                            );
                          };

                          // Get first day of month (0 = Sunday)
                          const firstDay = new Date(
                            currentMonth.primaryMonth.getFullYear(),
                            currentMonth.primaryMonth.getMonth(),
                            1
                          ).getDay();
                          const daysInMonth = getDaysInMonth(
                            currentMonth.primaryMonth
                          );

                          // Create array for days of month
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
                            const date = new Date(
                              currentMonth.primaryMonth.getFullYear(),
                              currentMonth.primaryMonth.getMonth(),
                              day
                            );

                            const isSelected = isSelectedDate(date);
                            const inRange = isInRange(date);

                            days.push(
                              <button
                                key={`day-${day}`}
                                className={`
                                  text-center text-[14px] font-inter font-[400] p-2 rounded-full
                                  ${isSelected ? "bg-bgButton text-white" : ""}
                                  ${inRange ? "bg-purple-100" : ""}
                                  ${
                                    !isSelected && !inRange
                                      ? "hover:bg-purple-100"
                                      : ""
                                  }
                                `}
                                onClick={() => handleDateSelect(date)}
                              >
                                {day}
                              </button>
                            );
                          }

                          return days;
                        })()}
                      </div>
                    </div>

                    {/* Secondary Month */}
                    <div className="flex-1 border-l border-grey-border">
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

                      <div className="grid grid-cols-7 gap-1 ">
                        {(() => {
                          // Helper functions
                          const getDaysInMonth = (date: Date): number => {
                            return new Date(
                              date.getFullYear(),
                              date.getMonth() + 1,
                              0
                            ).getDate();
                          };

                          const isSelectedDate = (date: Date): boolean => {
                            if (
                              !date ||
                              !dateRange.startDate ||
                              !dateRange.endDate
                            )
                              return false;
                            return (
                              isSameDay(date, dateRange.startDate) ||
                              isSameDay(date, dateRange.endDate)
                            );
                          };

                          const isInRange = (date: Date): boolean => {
                            if (
                              !date ||
                              !dateRange.startDate ||
                              !dateRange.endDate
                            )
                              return false;
                            const dateTime = date.getTime();
                            const startTime = dateRange.startDate.getTime();
                            const endTime = dateRange.endDate.getTime();
                            return dateTime > startTime && dateTime < endTime;
                          };

                          const isSameDay = (
                            date1: Date,
                            date2: Date
                          ): boolean => {
                            return (
                              date1.getDate() === date2.getDate() &&
                              date1.getMonth() === date2.getMonth() &&
                              date1.getFullYear() === date2.getFullYear()
                            );
                          };

                          // Get first day of month (0 = Sunday)
                          const firstDay = new Date(
                            currentMonth.secondaryMonth.getFullYear(),
                            currentMonth.secondaryMonth.getMonth(),
                            1
                          ).getDay();
                          const daysInMonth = getDaysInMonth(
                            currentMonth.secondaryMonth
                          );

                          // Create array for days of month
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
                            const date = new Date(
                              currentMonth.secondaryMonth.getFullYear(),
                              currentMonth.secondaryMonth.getMonth(),
                              day
                            );

                            const isSelected = isSelectedDate(date);
                            const inRange = isInRange(date);

                            days.push(
                              <button
                                key={`day-${day}`}
                                className={`
                                  text-center text-[14px] font-inter font-[400] p-2 rounded-full
                                  ${isSelected ? "bg-bgButton text-white" : ""}
                                  ${inRange ? "bg-purple-100" : ""}
                                  ${
                                    !isSelected && !inRange
                                      ? "hover:bg-purple-100"
                                      : ""
                                  }
                                `}
                                onClick={() => handleDateSelect(date)}
                              >
                                {day}
                              </button>
                            );
                          }

                          return days;
                        })()}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                      className="px-4 py-2 mr-2 text-[12px] font-[600] font-inter rounded-custom border border-reloadBorder"
                      onClick={() => setShowDatePicker(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-4 py-2 text-[12px] font-[600] font-inter rounded-custom bg-bgButton text-white border border-purple-700"
                      onClick={handleApplyDate}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="relative py-4">
        {/* Dashed vertical line */}
        <div
          className="absolute left-[23px] top-10 w-px h-[calc(100%-90px)] md:h-[calc(100%-100px)]  bottom-[100px] border-l border-gray-200 border-dashed"
          style={{ borderWidth: "1px" }}
        ></div>

        {/* Activity log entries */}
        {[1, 2, 3, 4].map((item, index) => (
          <div key={index} className="relative pl-16 py-5 z-10">
            <div className="absolute left-[16px] top-5 w-4 h-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <circle cx="8" cy="8" r="8" fill="#F2F2F2" />
                <circle cx="8" cy="8" r="4" fill="#949494" />
              </svg>
            </div>
            <p className="font-inter text-[14px] font-[600] text-textHeading mb-2">
              Today at 4:14 PM
            </p>
            <p className="text-[12px] font-[500] font-inter text-cardTitle">
              serving restriction in merchant delivery config is updated to no
              restriction by Admin (test TOPO 1686442)
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Helper function to get month name
function getMonthName(date: Date): string {
  return date.toLocaleString("default", { month: "long" });
}

export default ActivityLog;
