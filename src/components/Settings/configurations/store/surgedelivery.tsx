import React, { useState } from "react";
import ToggleSwitch from "../../../common/toggleSwitch";
import CustomDropdown from "../../../common/customdropdown";
// Type definitions
type TimeSlot = {
  id: string;
  startTime: string;
  endTime: string;
  type: "Fixed" | "Percentage";
  value: string;
};

type DayConfig = {
  enabled: boolean;
  timeSlots: TimeSlot[];
};

type DayKey =
  | "sunday"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday";

type DaysConfig = {
  [key in DayKey]: DayConfig;
};

// Main component
const SurgeDelivery = () => {
  const [settings, setSettings] = useState({
    surgeDelivery: true,
  });

  // Initialize days configuration
  const [daysConfig, setDaysConfig] = useState<DaysConfig>({
    sunday: { enabled: false, timeSlots: [] },
    monday: {
      enabled: true,
      timeSlots: [
        {
          id: "mon1",
          startTime: "9:00am",
          endTime: "10:00am",
          type: "Fixed",
          value: "₹50",
        },
        {
          id: "mon2",
          startTime: "9:00am",
          endTime: "10:00am",
          type: "Fixed",
          value: "₹50",
        },
      ],
    },
    tuesday: {
      enabled: true,
      timeSlots: [
        {
          id: "tue1",
          startTime: "9:00am",
          endTime: "10:00am",
          type: "Fixed",
          value: "₹50",
        },
      ],
    },
    wednesday: {
      enabled: true,
      timeSlots: [
        {
          id: "wed1",
          startTime: "9:00am",
          endTime: "10:00am",
          type: "Fixed",
          value: "₹50",
        },
      ],
    },
    thursday: { enabled: false, timeSlots: [] },
    friday: { enabled: false, timeSlots: [] },
    saturday: { enabled: false, timeSlots: [] },
  });

  // Toggle main setting
  const toggleSetting = (setting: keyof typeof settings) => {
    setSettings({
      ...settings,
      [setting]: !settings[setting],
    });
  };

  // Toggle day enabled status
  const toggleDay = (day: DayKey) => {
    setDaysConfig((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        enabled: !prev[day].enabled,
      },
    }));
  };

  // Add new time slot to a day
  const addTimeSlot = (day: DayKey) => {
    setDaysConfig((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        timeSlots: [
          ...prev[day].timeSlots,
          {
            id: `${day}${prev[day].timeSlots.length + 1}`,
            startTime: "9:00am",
            endTime: "10:00am",
            type: "Fixed",
            value: "₹50",
          },
        ],
      },
    }));
  };

  // Copy a time slot
  const copyTimeSlot = (day: DayKey, slotId: string) => {
    const slotToCopy = daysConfig[day].timeSlots.find(
      (slot) => slot.id === slotId
    );
    if (slotToCopy) {
      setDaysConfig((prev) => ({
        ...prev,
        [day]: {
          ...prev[day],
          timeSlots: [
            ...prev[day].timeSlots,
            {
              ...slotToCopy,
              id: `${day}${prev[day].timeSlots.length + 1}`,
            },
          ],
        },
      }));
    }
  };

  // Delete a time slot
  const deleteTimeSlot = (day: DayKey, slotId: string) => {
    setDaysConfig((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        timeSlots: prev[day].timeSlots.filter((slot) => slot.id !== slotId),
      },
    }));
  };

  // Handle select change for time slots
  const handleTimeSlotChange = (
    day: DayKey,
    slotId: string,
    field: "startTime" | "endTime" | "type" | "value",
    value: string
  ) => {
    setDaysConfig((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        timeSlots: prev[day].timeSlots.map((slot) =>
          slot.id === slotId
            ? {
                ...slot,
                [field]:
                  field === "type" ? (value as "Fixed" | "Percentage") : value,
              }
            : slot
        ),
      },
    }));
  };

  return (
    <div className="bg-backgroundWhite rounded-custom12px max-w-full mx-auto">
      <div className="p-4">
        <div className="flex justify-between items-center ">
          <h2 className="text-[14px] font-[500] font-inter text-textHeading">
            Surge On Delivery
          </h2>
          <div className="mt-4 md:mt-0 sm:mt-0 lg:mt-0 xl:mt-0">
            <ToggleSwitch
              checked={settings.surgeDelivery}
              onChange={() => toggleSetting("surgeDelivery")}
              aria-labelledby="toggle-surge-delivery"
            />
          </div>
        </div>
        <p className="text-[12px] font-[500] font-inter text-cardTitle mt-1">
          Apply dynamic delivery charges based on demand and conditions.
        </p>

        {settings.surgeDelivery && (
          <div className="border border-reloadBorder rounded-custom12px mt-4">
            {/* Days of week */}
            {(Object.entries(daysConfig) as [DayKey, DayConfig][]).map(
              ([day, config]) => (
                <div key={day} className="border-b last:border-b-0">
                  <div className="flex items-center p-4 mt-5">
                    <div className="mt-4 md:mt-0 sm:mt-0 lg:mt-0 xl:mt-0">
                      <ToggleSwitch
                        checked={config.enabled}
                        onChange={() => toggleDay(day)}
                        aria-labelledby={`toggle-${day}`}
                      />
                    </div>
                    <span className="ml-4 capitalize text-[14px] font-[500] font-inter text-textHeading">
                      {day}
                    </span>
                  </div>

                  {config.enabled && (
                    <div className="px-4 pb-4">
                      {config.timeSlots.map((slot, index) => (
                        <div key={slot.id} className="mb-4">
                          {/* Time selectors - stacked on mobile, side by side on larger screens */}
                          <div className="flex flex-wrap md:flex-nowrap sm:flex-nowrap lg:flex-nowrap xl:flex-nowrap items-center mb-2">
                            <div className="flex items-center mr- mb-2 sm:mb-0 ">
                              <CustomDropdown
                                options={[
                                  "9:00am",
                                  "9:30am",
                                  "10:00am",
                                  "10:30am",
                                  "11:00am",
                                  "11:30am",
                                  "12:00pm",
                                ]}
                                value={slot.startTime}
                                onChange={(value) =>
                                  handleTimeSlotChange(
                                    day,
                                    slot.id,
                                    "startTime",
                                    value
                                  )
                                }
                                width="w-[104px] md:w-[104px] sm:w-[104px] lg:w-[104px] xl:w-[104px]"
                              />
                              {/* <div className="relative ">
                                <select
                                  className="appearance-none md:w-[104px] sm:w-[104px] lg:w-[104px] xl:w-[104px] border border-reloadBorder rounded-custom px-3 py-2 pr-8 focus:outline-none focus:ring-1 focus:ring-purple-500 text-[12px] font-[400] font-inter text-headding-color"
                                  value={slot.startTime}
                                  onChange={(e) =>
                                    handleTimeSlotChange(
                                      day,
                                      slot.id,
                                      "startTime",
                                      e.target.value
                                    )
                                  }
                                >
                                  <option value="9:00am" className="text-menuSubHeadingColor font-inter text-[12px] font-[500]">9:00am</option>
                                  <option value="10:00am" className="text-menuSubHeadingColor font-inter text-[12px] font-[500]">10:00am</option>
                                  <option value="11:00am" className="text-menuSubHeadingColor font-inter text-[12px] font-[500]">11:00am</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center px-2 text-gray-700">
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
                                      d="M4.23431 5.83392C4.54673 5.5215 5.05327 5.5215 5.36569 5.83392L8 8.46824L10.6343 5.83392C10.9467 5.5215 11.4533 5.5215 11.7657 5.83392C12.0781 6.14634 12.0781 6.65288 11.7657 6.96529L8.56569 10.1653C8.25327 10.4777 7.74673 10.4777 7.43431 10.1653L4.23431 6.96529C3.9219 6.65288 3.9219 6.14634 4.23431 5.83392Z"
                                      fill="#636363"
                                    />
                                  </svg>
                                </div>
                              </div> */}

                              <span className="mx-2">
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

                              <div className="relative">
                                {/* <select
                                  className="appearance-none md:w-[104px] sm:w-[104px] lg:w-[104px] xl:w-[104px] border border-reloadBorder rounded-custom px-3 py-2 pr-8 focus:outline-none focus:ring-1 focus:ring-purple-500 text-[12px] font-[400] font-inter text-headding-color"
                                  value={slot.endTime}
                                  onChange={(e) =>
                                    handleTimeSlotChange(
                                      day,
                                      slot.id,
                                      "endTime",
                                      e.target.value
                                    )
                                  }
                                >
                                  <option
                                    value="10:00am"
                                    className="text-menuSubHeadingColor font-inter text-[12px] font-[500]"
                                  >
                                    10:00am
                                  </option>
                                  <option
                                    value="11:00am"
                                    className="text-menuSubHeadingColor font-inter text-[12px] font-[500]"
                                  >
                                    11:00am
                                  </option>
                                  <option
                                    value="12:00pm"
                                    className="text-menuSubHeadingColor font-inter text-[12px] font-[500]"
                                  >
                                    12:00pm
                                  </option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center px-2 text-gray-700">
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
                                      d="M4.23431 5.83392C4.54673 5.5215 5.05327 5.5215 5.36569 5.83392L8 8.46824L10.6343 5.83392C10.9467 5.5215 11.4533 5.5215 11.7657 5.83392C12.0781 6.14634 12.0781 6.65288 11.7657 6.96529L8.56569 10.1653C8.25327 10.4777 7.74673 10.4777 7.43431 10.1653L4.23431 6.96529C3.9219 6.65288 3.9219 6.14634 4.23431 5.83392Z"
                                      fill="#636363"
                                    />
                                  </svg>
                                </div> */}
                                <CustomDropdown
                                  options={[
                                    "10:00am",
                                    "10:30am",
                                    "11:00am",
                                    "11:30am",
                                    "12:00pm",
                                    "12:30pm",
                                  ]}
                                  value={slot.endTime}
                                  onChange={(value) =>
                                    handleTimeSlotChange(
                                      day,
                                      slot.id,
                                      "endTime",
                                      value
                                    )
                                  }
                                  width="w-[104px] md:w-[104px] sm:w-[104px] lg:w-[104px] xl:w-[104px]"
                                />
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex flex-nowrap items-center">
                                <div className="relative md:mx-2 sm:mx-2 lg:mx-2 xl:mx-2 mx-0 ">
                                  {/* <select
                                    className="appearance-none w-[80px] md:w-[104px] sm:w-[104px] lg:w-[104px] xl:w-[104px] border border-reloadBorder rounded-custom px-3 py-2 pr-8 focus:outline-none focus:ring-1 focus:ring-purple-500 text-[12px] font-[400] font-inter text-headding-color"
                                    value={slot.type}
                                    onChange={(e) =>
                                      handleTimeSlotChange(
                                        day,
                                        slot.id,
                                        "type",
                                        e.target.value
                                      )
                                    }
                                  >
                                    <option
                                      value="Fixed"
                                      className="text-menuSubHeadingColor font-inter text-[12px] font-[500]"
                                    >
                                      Fixed
                                    </option>
                                    <option
                                      value="Percentage"
                                      className="text-menuSubHeadingColor font-inter text-[12px] font-[500]"
                                    >
                                      Percentage
                                    </option>
                                  </select>
                                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700  ">
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
                                        d="M4.23431 5.83392C4.54673 5.5215 5.05327 5.5215 5.36569 5.83392L8 8.46824L10.6343 5.83392C10.9467 5.5215 11.4533 5.5215 11.7657 5.83392C12.0781 6.14634 12.0781 6.65288 11.7657 6.96529L8.56569 10.1653C8.25327 10.4777 7.74673 10.4777 7.43431 10.1653L4.23431 6.96529C3.9219 6.65288 3.9219 6.14634 4.23431 5.83392Z"
                                        fill="#636363"
                                      />
                                    </svg>
                                  </div> */}
                                  <CustomDropdown
                                    options={["Fixed", "Percentage"]}
                                    value={slot.type}
                                    onChange={(value) =>
                                      handleTimeSlotChange(
                                        day,
                                        slot.id,
                                        "type",
                                        value
                                      )
                                    }
                                    width="w-[80px] md:w-[104px] sm:w-[104px] lg:w-[104px] xl:w-[104px]"
                                  />
                                </div>

                                <div className="relative md:mx-2 sm:mx-2 lg:mx-2 xl:mx-2 ">
                                  {/* <select
                                    className="appearance-none md:w-[104px] ms-4 sm:w-[104px] lg:w-[104px] xl:w-[104px] border border-reloadBorder rounded-custom px-3 py-2 pr-8 focus:outline-none focus:ring-1 focus:ring-purple-500 text-[12px] font-[400] font-inter text-headding-color"
                                    value={slot.value}
                                    onChange={(e) =>
                                      handleTimeSlotChange(
                                        day,
                                        slot.id,
                                        "value",
                                        e.target.value
                                      )
                                    }
                                  >
                                    {slot.type === "Fixed" ? (
                                      <>
                                        <option
                                          value="₹50"
                                          className="text-menuSubHeadingColor font-inter text-[12px] font-[500]"
                                        >
                                          ₹50
                                        </option>
                                        <option
                                          value="₹100"
                                          className="text-menuSubHeadingColor font-inter text-[12px] font-[500]"
                                        >
                                          ₹100
                                        </option>
                                      </>
                                    ) : (
                                      <>
                                        <option
                                          value="2%"
                                          className="text-menuSubHeadingColor font-inter text-[12px] font-[500]"
                                        >
                                          2%
                                        </option>
                                        <option
                                          value="5%"
                                          className="text-menuSubHeadingColor font-inter text-[12px] font-[500]"
                                        >
                                          5%
                                        </option>
                                        <option
                                          value="10%"
                                          className="text-menuSubHeadingColor font-inter text-[12px] font-[500]"
                                        >
                                          10%
                                        </option>
                                      </>
                                    )}
                                  </select>
                                  <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center px-2 text-gray-700">
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
                                        d="M4.23431 5.83392C4.54673 5.5215 5.05327 5.5215 5.36569 5.83392L8 8.46824L10.6343 5.83392C10.9467 5.5215 11.4533 5.5215 11.7657 5.83392C12.0781 6.14634 12.0781 6.65288 11.7657 6.96529L8.56569 10.1653C8.25327 10.4777 7.74673 10.4777 7.43431 10.1653L4.23431 6.96529C3.9219 6.65288 3.9219 6.14634 4.23431 5.83392Z"
                                        fill="#636363"
                                      />
                                    </svg>
                                  </div> */}
                                  <CustomDropdown
                                    options={
                                      slot.type === "Fixed"
                                        ? ["₹50", "₹100"]
                                        : ["2%", "5%", "10%"]
                                    }
                                    value={slot.value}
                                    onChange={(value) =>
                                      handleTimeSlotChange(
                                        day,
                                        slot.id,
                                        "value",
                                        value
                                      )
                                    }
                                    width="md:w-[104px] ms-4 sm:w-[104px] lg:w-[104px] xl:w-[104px]"
                                  />
                                </div>
                              </div>

                              {/* Action buttons */}
                              <div className="flex items-center">
                                {index === 0 && (
                                  <>
                                    <button
                                      className="text-gray-500 hover:text-gray-700 p-1"
                                      onClick={() => addTimeSlot(day)}
                                      aria-label="Add time slot"
                                    >
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
                                          d="M10 3C10.5523 3 11 3.44772 11 4V9H16C16.5523 9 17 9.44772 17 10C17 10.5523 16.5523 11 16 11H11V16C11 16.5523 10.5523 17 10 17C9.44772 17 9 16.5523 9 16V11H4C3.44772 11 3 10.5523 3 10C3 9.44771 3.44772 9 4 9L9 9V4C9 3.44772 9.44772 3 10 3Z"
                                          fill="#636363"
                                        />
                                      </svg>
                                    </button>
                                    <button
                                      className="text-gray-500 hover:text-gray-700 p-1 ml-1"
                                      onClick={() => copyTimeSlot(day, slot.id)}
                                      aria-label="Copy time slot"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                      >
                                        <path
                                          d="M6.66683 13.333H5.00016C4.07969 13.333 3.3335 12.5868 3.3335 11.6663V4.99967C3.3335 4.0792 4.07969 3.33301 5.00016 3.33301H11.6668C12.5873 3.33301 13.3335 4.0792 13.3335 4.99967V6.66634M8.3335 16.6663H15.0002C15.9206 16.6663 16.6668 15.9201 16.6668 14.9997V8.33301C16.6668 7.41253 15.9206 6.66634 15.0002 6.66634H8.3335C7.41302 6.66634 6.66683 7.41253 6.66683 8.33301V14.9997C6.66683 15.9201 7.41302 16.6663 8.3335 16.6663Z"
                                          stroke="#636363"
                                          stroke-width="1.5"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                        />
                                      </svg>
                                    </button>
                                  </>
                                )}
                                {index > 0 && (
                                  <button
                                    className="text-gray-500 hover:text-gray-700 p-1"
                                    onClick={() => deleteTimeSlot(day, slot.id)}
                                    aria-label="Delete time slot"
                                  >
                                    <svg
                                      className="h-5 w-5"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                      />
                                    </svg>
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Type and Value selectors - on same line for all screen sizes */}

                          {index < config.timeSlots.length - 1 && (
                            <div className="border-b my-4"></div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SurgeDelivery;
