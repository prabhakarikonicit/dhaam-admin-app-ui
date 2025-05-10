import React, { useState } from "react";
import ToggleSwitch from "../../../common/toggleSwitch";
import SurgeDelivery from "./surgedelivery";
import { ChevronDown, Plus, X } from "lucide-react";
import { PlusCircle, Trash2, Edit } from "lucide-react";
import {
  DisplayStoreTimingCard,
  EmailNotificationCard,
  DynamicCards,
  OrderControlCard,
  ScheduledOrderCard,
  InputCardGrid,
  InputCard,
  StoreTimingAvailability,
  DeliveryMode,
} from "../../../common/cards";
interface CustomField {
  id: number;
  title: string;
  placeholder: string;
  type: string;
  compulsory: boolean;
}

interface CheckoutProps {
  onClose: () => void;
  onSave: (data: any) => void;
  hideHeader?: boolean;
}

// Store settings component
const Store: React.FC<CheckoutProps> = ({
  onClose,
  onSave,
  hideHeader = false,
}) => {
  // State for all toggles
  const [settings, setSettings] = useState({
    surgeDelivery: true,
    displayStoreTiming: false,
    emailNotification: false,
    maxOrdersPerSlot: false,
    customOrderFields: false,

    orderControl: false,
    productMultiSelection: false,
    scheduledOrderTimeRange: false,
    setMinimumOrderAmount: false,
    scheduledOrderReminders: false,
  });
  const [selectedDayOption, setSelectedDayOption] =
    useState<string>("everyday");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [selectedTimeOption, setSelectedTimeOption] =
    useState<string>("fullTime");
  const [cardData, setCardData] = useState([
    { title: "Minimum Order Amount", placeholder: "Enter amount" },
    { title: "Minimum Pickup Amount", placeholder: "Enter amount" },
  ]);

  const handleSaveField = () => {
    if (newField.title.trim()) {
      if (editingId !== null) {
        // Update existing field
        setFields(
          fields.map((f) =>
            f.id === editingId
              ? {
                  ...newField,
                  id: editingId, // Preserve the original ID
                }
              : f
          )
        );
        // Reset editing state
        setEditingId(null);
      } else {
        // Add new field
        const fieldToAdd = {
          ...newField,
          id: Date.now(),
        };
        setFields([...fields, fieldToAdd]);
      }

      // Reset the new field state
      setNewField({
        id: Date.now(),
        title: "",
        placeholder: "",
        type: "Text",
        compulsory: false,
      });
    }
  };
  // Add function to handle editing a field
  const handleEditField = (id: number) => {
    const fieldToEdit = fields.find((f) => f.id === id);
    if (fieldToEdit) {
      // Set the editing ID and populate the new field form with existing field data
      setEditingId(id);
      setNewField({ ...fieldToEdit });

      // Optional: You might want to scroll to the add/edit field section
      // This would require a ref or programmatic scrolling logic
    }
  };

  const [customFields, setCustomFields] = useState([
    {
      id: 1,
      title: "Delivery Instructions",
      placeholder: "Write here!",
      type: "Text area",
      compulsory: true,
    },
  ]);
  const removeCustomField = (id: number) => {
    setCustomFields(customFields.filter((field) => field.id !== id));
  };
  const [fields, setFields] = useState<CustomField[]>([
    {
      id: 1,
      title: "Delivery Instructions",
      placeholder: "Write here!",
      type: "Text area",
      compulsory: true,
    },
  ]);
  const [maxOrdersValue, setMaxOrdersValue] = useState("");
  const [showCustomFieldsModal, setShowCustomFieldsModal] = useState(false);
  // Toggle setting state
  const toggleSetting = (setting: keyof typeof settings) => {
    setSettings({
      ...settings,
      [setting]: !settings[setting],
    });
  };
  // Using the full CustomField type for newField
  const [newField, setNewField] = useState<CustomField>({
    id: Date.now(),
    title: "",
    placeholder: "",
    type: "Text",
    compulsory: false,
  });
  // Add this function to handle adding a new field
  const addField = () => {
    if (newField.title.trim()) {
      const fieldToAdd = { ...newField, id: Date.now() };
      setFields([...fields, fieldToAdd]);
      setNewField({
        id: Date.now() + 1,
        title: "",
        placeholder: "",
        type: "Text",
        compulsory: false,
      });
    }
  };

  const handleFieldChange = (id: number, field: Partial<CustomField>) => {
    setFields(fields.map((f) => (f.id === id ? { ...f, ...field } : f)));
  };

  const removeField = (id: number) => {
    setFields(fields.filter((f) => f.id !== id));
  };

  const saveCustomFields = () => {
    setShowCustomFieldsModal(false);
  };

  return (
    <div className="max-w-full rounded-custom12px p-1 md:p-0 sm:p-0 lg:p-0 xl:p-0 sm:max-h-full md:max-h-full lg:max-h-full xl:max-h-full max-h-[70vh] overflow-y-auto sm:overflow-visible md:overflow-visible lg:overflow-visible xl:overflow-visible">
      {/* Header */}
      {!hideHeader && (
        <div className="flex justify-between items-center mb-2 p-4 rounded-md mt-0 sm:mt-8 md:mt-8 lg:mt-8 xl:8 md:px-1 sm:px-1 lg:px-1 xl:px-1">
          <h1 className="text-[14px] font-inter font-[600] text-headding-color">
            Store
          </h1>
          <div className="flex space-x-2">
            <button className="px-4 py-2 text-[12px] font-inter font-[600] text-paragraphBlack">
              Discard
            </button>
            <button className="px-4 py-2 text-[12px] font-inter font-[600] text-whiteColor bg-bgButton border border-reloadBorder rounded-custom">
              Save
            </button>
          </div>
        </div>
      )}
      {/* Surge Delivery Section */}
      <div className="rounded-lg p-0 md:p-0 sm:p-0 lg:p-0 xl:p-0 mb-4">
        <div className="mb-10">
          <StoreTimingAvailability
            selectedDayOption={selectedDayOption}
            setSelectedDayOption={setSelectedDayOption}
            selectedTimeOption={selectedTimeOption}
            setSelectedTimeOption={setSelectedTimeOption}
          />
        </div>

        <SurgeDelivery
          title="Surge On Delivery"
          description="Apply dynamic delivery charges based on demand and conditions."
        />
      </div>

      {/* Order Settings */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
        {/* First Column */}
        <div className="space-y-4">
          {/* Minimum Order Amount */}
          <InputCardGrid cards={cardData} />
          {/* Order Placement Email Notification */}
          <EmailNotificationCard
            checked={settings.emailNotification}
            onChange={() => toggleSetting("emailNotification")}
          />

          {/* Maximum Orders Per Slot */}
          <DynamicCards
            checked={settings.maxOrdersPerSlot}
            onChange={() => toggleSetting("maxOrdersPerSlot")}
            title="Maximum Orders Per Slot" // Customize the title
            description="Set the maximum number of orders allowed per time slot." // Customize the description
            maxOrderLabel="Max Orders per Slot" // Optional: Change the label inside the expanded content
            maxOrderPlaceholder="Enter the maximum order limit per slot" // Optional: Change the placeholder
            value={maxOrdersValue} // Track the input value
            variant="WithInputBelow"
            onValueChange={(e) => setMaxOrdersValue(e.target.value)} // Handle value changes
          />

          {/* Order Control with Product Multi-Selection */}
          <OrderControlCard
            orderControlChecked={settings.orderControl}
            onOrderControlChange={() => toggleSetting("orderControl")}
            productMultiSelectionChecked={settings.productMultiSelection}
            onProductMultiSelectionChange={() =>
              toggleSetting("productMultiSelection")
            }
          />
        </div>
        <DynamicCards
          checked={settings.displayStoreTiming}
          onChange={() => toggleSetting("displayStoreTiming")}
          title="Display Store Timing" // Customize the title
          description="Enable to show store operating hours on the listing." // Customize the description
          maxOrderLabel="Order Limit" // Optional: Change the label inside the expanded content
          maxOrderPlaceholder="Enter limit (e.g., 50)" // Optional: Change the placeholder
          value={maxOrdersValue} // Track the input value
          onValueChange={(e) => setMaxOrdersValue(e.target.value)} // Handle value changes
        />
        {/* Second Column */}
        <div className="space-y-4">
          {/* Display Store Timing */}
          <DisplayStoreTimingCard
            checked={settings.displayStoreTiming}
            onChange={() => toggleSetting("displayStoreTiming")}
          />

          {/* Preparation Time */}
          <div className="bg-white rounded-lg p-6 mb-4">
            <h2 className="text-[14px] font-inter font-[500] text-textHeading mb-2">
              Preparation Time
            </h2>
            <p className="text-[12px] font-inter font-[500] text-cardTitle mb-4">
              Set the default order preparation time. Adjust it for specific
              orders in the order list before accepting. Requires accept/reject
              enabled for edits after order placement.
            </p>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter preparation time in minutes"
                className="w-full border border-reloadBorder rounded-custom8px px-3 py-4 pr-10 text-[14px] font-inter font-[400] placeholder:text-reloadBorder focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M10 6.66667V10L12.5 12.5M17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C14.1421 2.5 17.5 5.85786 17.5 10Z"
                    stroke="#949494"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Scheduled Order Time Range */}

          <ScheduledOrderCard
            timeRangeChecked={settings.scheduledOrderTimeRange}
            onTimeRangeChange={() => toggleSetting("scheduledOrderTimeRange")}
            minOrderChecked={settings.setMinimumOrderAmount}
            onMinOrderChange={() => toggleSetting("setMinimumOrderAmount")}
            remindersChecked={settings.scheduledOrderReminders}
            onRemindersChange={() => toggleSetting("scheduledOrderReminders")}
          />

          {/* <DisplayStoreTimingCard
            checked={settings.displayStoreTiming}
            onChange={() => toggleSetting("displayStoreTiming")}
          /> */}

          <DeliveryMode
            onSave={() => console.log("Delivery mode settings saved")}
          />
          {/* Custom Order Fields Card */}
          <div className="bg-white rounded-lg p-6">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center space-x-2">
                <h2 className="text-[14px] font-inter font-[500] text-textHeading">
                  Custom Order Fields
                </h2>
                <button
                  className="rounded-custom p-1 border border-reloadBorder text-"
                  onClick={() => setShowCustomFieldsModal(true)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M5.10493 10.295C4.83156 10.0216 4.83156 9.57839 5.10493 9.30503L7.40995 7L5.10493 4.69497C4.83156 4.42161 4.83156 3.97839 5.10493 3.70503C5.37829 3.43166 5.82151 3.43166 6.09488 3.70503L8.89488 6.50503C9.16824 6.77839 9.16824 7.22161 8.89488 7.49497L6.09488 10.295C5.82151 10.5683 5.37829 10.5683 5.10493 10.295Z"
                      fill="#212121"
                    />
                  </svg>
                </button>
              </div>
              <ToggleSwitch
                checked={settings.customOrderFields}
                onChange={() => toggleSetting("customOrderFields")}
                aria-labelledby="custom-order-fields"
              />
            </div>

            <p className="text-[12px] font-inter font-[500] text-cardTitle">
              Allow customers to enter additional information during checkout.
            </p>
          </div>

          {/* Custom Fields Modal */}
          {showCustomFieldsModal && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-30 absolute inset-0 flex items-center justify-center">
              <div className="bg-white rounded-lg w-full max-w-full h-full m-4 overflow-y-auto shadow-lg relative z-10">
                {/* Header */}
                <div className="flex justify-between items-center px-6 py-4 border-b border-grey-border bg-background-grey">
                  <h1 className="text-[16px] font-[600] font-inter">
                    Custom Order Fields
                  </h1>
                  <div className="flex gap-3">
                    <button
                      onClick={() => {
                        setShowCustomFieldsModal(false);
                        setEditingId(null);
                        setNewField({
                          id: Date.now(),
                          title: "",
                          placeholder: "",
                          type: "Text",
                          compulsory: false,
                        });
                      }}
                      className="px-5 py-2 text-cardValue text-[12px] font-inter font-[600]"
                    >
                      Discard
                    </button>
                    <button
                      onClick={saveCustomFields}
                      className="px-6 py-2 bg-bgButton text-white border border-btnBorder rounded-custom text-[12px] font-inter font-[600]"
                    >
                      Save
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col sm:flex-row">
                  {/* Left side - field editor */}
                  <div className="w-full sm:w-2/3 md:w-2/3 sm:pr-6 md:pr-6 bg-white">
                    {/* Existing fields */}
                    <div className="space-y-4 mb-8">
                      {fields.map((field) => (
                        <div key={field.id}>
                          {/* Tablet view (sm) and Mobile view */}
                          <div className="md:hidden">
                            {/* Row 1: Title + Placeholder */}
                            <div className="flex gap-4 mb-3">
                              <div className="w-1/2">
                                <input
                                  type="text"
                                  value={field.title}
                                  onChange={(e) =>
                                    handleFieldChange(field.id, {
                                      title: e.target.value,
                                    })
                                  }
                                  placeholder="Field Title"
                                  className={`w-full px-4 py-3 border rounded-custom8px text-[14px] font-inter font-[400] focus:ring-1 focus:ring-red-300 transition-all duration-300 ease-in-out
                          ${
                            field.compulsory
                              ? "border-menuSubHeadingColor text-menuSubHeadingColor"
                              : "border-reloadBorder text-reloadBorder"
                          } focus:border-reloadBorder`}
                                />
                              </div>
                              <div className="w-1/2">
                                <input
                                  type="text"
                                  value={field.placeholder}
                                  onChange={(e) =>
                                    handleFieldChange(field.id, {
                                      placeholder: e.target.value,
                                    })
                                  }
                                  placeholder="Field Placeholder"
                                  className={`w-full px-4 py-3 border rounded-custom8px text-[14px] font-inter font-[400] focus:ring-1 focus:ring-red-300 transition-all duration-300 ease-in-out
                          ${
                            field.compulsory
                              ? "border-menuSubHeadingColor text-menuSubHeadingColor"
                              : "border-reloadBorder text-reloadBorder"
                          } focus:border-reloadBorder`}
                                />
                              </div>
                            </div>

                            {/* Row 2: Type + Delete + Compulsory */}
                            <div className="flex items-center mb-6">
                              <div className="w-[120px] mr-3">
                                <div className="relative">
                                  <select
                                    value={field.type}
                                    onChange={(e) =>
                                      handleFieldChange(field.id, {
                                        type: e.target.value,
                                      })
                                    }
                                    className={`w-full px-4 py-3 border rounded-custom8px text-reloadBorde text-[14px] font-inter font-[400] focus:ring-1 focus:ring-red-300 transition-all duration-300 ease-in-out appearance-none
                            ${
                              field.compulsory
                                ? "border-menuSubHeadingColor text-menuSubHeadingColor"
                                : "border-reloadBorder text-reloadBorder"
                            } focus:border-reloadBorder`}
                                  >
                                    <option
                                      value="Text"
                                      className="text-[14px] font-inter font-[400]"
                                    >
                                      Text
                                    </option>
                                    <option
                                      value="Text area"
                                      className="text-[14px] font-inter font-[400]"
                                    >
                                      Text area
                                    </option>
                                    <option
                                      value="Number"
                                      className="text-[14px] font-inter font-[400]"
                                    >
                                      Number
                                    </option>
                                  </select>
                                  <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                                    <ChevronDown
                                      size={16}
                                      className="text-gray-500"
                                    />
                                  </div>
                                </div>
                              </div>
                              <button
                                onClick={() => removeField(field.id)}
                                className="p-2 mr-3 rounded-custom8px border border-reloadBorder hover:text-red-500"
                              >
                                <Trash2 size={20} />
                              </button>
                              <div className="flex items-center gap-2">
                                <span className="text-[14px] font-inter font-[400]">
                                  Compulsory
                                </span>
                                <div className="relative">
                                  <input
                                    type="checkbox"
                                    checked={field.compulsory}
                                    onChange={() =>
                                      handleFieldChange(field.id, {
                                        compulsory: !field.compulsory,
                                      })
                                    }
                                    id={`compulsory-sm-${field.id}`}
                                    className="sr-only"
                                  />
                                  <label
                                    htmlFor={`compulsory-sm-${field.id}`}
                                    className={`block w-12 h-6 rounded-full transition-colors duration-200 ease-in-out ${
                                      field.compulsory
                                        ? "bg-bgButton"
                                        : "bg-gray-200"
                                    }`}
                                  >
                                    <span
                                      className={`block w-5 h-5 mt-0.5 ml-0.5 bg-white rounded-full transform transition-transform duration-200 ease-in-out ${
                                        field.compulsory ? "translate-x-6" : ""
                                      }`}
                                    />
                                  </label>
                                </div>
                              </div>
                            </div>

                            <div className="border-t border-gray-200 mb-4"></div>
                          </div>

                          {/* Original desktop/laptop layout */}
                          <div className="hidden md:flex items-center gap-4 md:flex-nowrap">
                            <div className="w-1/3">
                              <input
                                type="text"
                                value={field.title}
                                onChange={(e) =>
                                  handleFieldChange(field.id, {
                                    title: e.target.value,
                                  })
                                }
                                placeholder="Field Title"
                                className={`w-full px-4 py-3 border rounded-custom8px text-[14px] font-inter font-[400] focus:ring-1 focus:ring-red-300 transition-all duration-300 ease-in-out
                        ${
                          field.compulsory
                            ? "border-menuSubHeadingColor text-menuSubHeadingColor"
                            : "border-reloadBorder text-reloadBorder"
                        } focus:border-reloadBorder`}
                              />
                            </div>
                            <div className="w-1/3">
                              <input
                                type="text"
                                value={field.placeholder}
                                onChange={(e) =>
                                  handleFieldChange(field.id, {
                                    placeholder: e.target.value,
                                  })
                                }
                                placeholder="Field Placeholder"
                                className={`w-full px-4 py-3 border rounded-custom8px text-[14px] font-inter font-[400] focus:ring-1 focus:ring-red-300 transition-all duration-300 ease-in-out
                        ${
                          field.compulsory
                            ? "border-menuSubHeadingColor text-menuSubHeadingColor"
                            : "border-reloadBorder text-reloadBorder"
                        } focus:border-reloadBorder`}
                              />
                            </div>
                            <div className="w-[140px]">
                              <div className="relative">
                                <select
                                  value={field.type}
                                  onChange={(e) =>
                                    handleFieldChange(field.id, {
                                      type: e.target.value,
                                    })
                                  }
                                  className={`w-full px-4 py-3 border rounded-custom8px text-reloadBorde text-[14px] font-inter font-[400] focus:ring-1 focus:ring-red-300 transition-all duration-300 ease-in-out appearance-none
                          ${
                            field.compulsory
                              ? "border-menuSubHeadingColor text-menuSubHeadingColor"
                              : "border-reloadBorder text-reloadBorder"
                          } focus:border-reloadBorder`}
                                >
                                  <option
                                    value="Text"
                                    className="text-[14px] font-inter font-[400]"
                                  >
                                    Text
                                  </option>
                                  <option
                                    value="Text area"
                                    className="text-[14px] font-inter font-[400]"
                                  >
                                    Text area
                                  </option>
                                  <option
                                    value="Number"
                                    className="text-[14px] font-inter font-[400]"
                                  >
                                    Number
                                  </option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                                  <ChevronDown
                                    size={16}
                                    className="text-gray-500"
                                  />
                                </div>
                              </div>
                            </div>
                            <button
                              onClick={() => removeField(field.id)}
                              className="p-2 rounded-custom8px border border-reloadBorder hover:text-red-500"
                            >
                              <Trash2 size={20} />
                            </button>
                            <div className="flex items-center gap-2 ml-auto">
                              <span className="rounded-custom8px text-[14px] font-inter font-[400]">
                                Compulsory
                              </span>
                              <div className="relative">
                                <input
                                  type="checkbox"
                                  checked={field.compulsory}
                                  onChange={() =>
                                    handleFieldChange(field.id, {
                                      compulsory: !field.compulsory,
                                    })
                                  }
                                  id={`compulsory-${field.id}`}
                                  className="sr-only"
                                />
                                <label
                                  htmlFor={`compulsory-${field.id}`}
                                  className={`block w-12 h-6 rounded-full transition-colors duration-200 ease-in-out ${
                                    field.compulsory
                                      ? "bg-bgButton"
                                      : "bg-gray-200"
                                  }`}
                                >
                                  <span
                                    className={`block w-5 h-5 mt-0.5 ml-0.5 bg-white rounded-full transform transition-transform duration-200 ease-in-out ${
                                      field.compulsory ? "translate-x-6" : ""
                                    }`}
                                  />
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Add new field form */}
                    <div className="p-0">
                      {/* Tablet view (sm) and Mobile view */}
                      <div className="md:hidden">
                        {/* Row 1: Title + Placeholder */}
                        <div className="flex gap-4 mb-3">
                          <div className="w-1/2">
                            <input
                              type="text"
                              value={newField.title}
                              onChange={(e) =>
                                setNewField({
                                  ...newField,
                                  title: e.target.value,
                                })
                              }
                              placeholder="Field Title"
                              className={`w-full px-4 py-3 border text-menuSubHeadingColor text-bgButton rounded-custom8px text-[14px] font-inter font-[400] focus:ring-1 focus:ring-red-300 transition-all duration-300 ease-in-out
                      ${
                        newField.compulsory
                          ? "border-menuSubHeadingColor text-menuSubHeadingColor placeholder:text-menuSubHeadingColor"
                          : "border-reloadBorder text-reloadBorder placeholder:text-reloadBorder"
                      } focus:border-reloadBorder`}
                            />
                          </div>
                          <div className="w-1/2">
                            <input
                              type="text"
                              value={newField.placeholder}
                              onChange={(e) =>
                                setNewField({
                                  ...newField,
                                  placeholder: e.target.value,
                                })
                              }
                              placeholder="Field Placeholder"
                              className={`w-full px-4 py-3 border rounded-custom8px text-[14px] font-inter font-[400] focus:ring-1 focus:ring-red-300 transition-all duration-300 ease-in-out
                      ${
                        newField.compulsory
                          ? "border-menuSubHeadingColor text-menuSubHeadingColor placeholder:text-menuSubHeadingColor"
                          : "border-reloadBorder text-reloadBorder placeholder:text-reloadBorder"
                      } focus:border-reloadBorder`}
                            />
                          </div>
                        </div>

                        {/* Row 2: Type + Add + Compulsory */}
                        <div className="flex items-center">
                          <div className="w-[120px] mr-3">
                            <div className="relative">
                              <select
                                value={newField.type}
                                onChange={(e) =>
                                  setNewField({
                                    ...newField,
                                    type: e.target.value,
                                  })
                                }
                                className={`w-full px-4 py-3 border rounded-custom8px text-[14px] font-inter font-[400] focus:ring-1 focus:ring-red-300 transition-all duration-300 ease-in-out appearance-none
                        ${
                          newField.compulsory
                            ? "border-menuSubHeadingColor text-menuSubHeadingColor"
                            : "border-reloadBorder text-reloadBorder"
                        } focus:border-reloadBorder`}
                              >
                                <option
                                  value="Text"
                                  className="text-[14px] font-inter font-[400]"
                                >
                                  Text
                                </option>
                                <option
                                  value="Text area"
                                  className="text-[14px] font-inter font-[400]"
                                >
                                  Text area
                                </option>
                                <option
                                  value="Number"
                                  className="text-[14px] font-inter font-[400]"
                                >
                                  Number
                                </option>
                              </select>
                              <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                                <ChevronDown
                                  size={16}
                                  className="text-gray-500"
                                />
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={handleSaveField}
                            className="p-2 mr-3 rounded-custom8px border border-reloadBorder hover:text-purple-600"
                          >
                            <PlusCircle size={24} />
                          </button>
                          <div className="flex items-center gap-2">
                            <span className="text-[14px] font-inter font-[400]">
                              Compulsory
                            </span>
                            <div className="relative">
                              <input
                                type="checkbox"
                                checked={newField.compulsory}
                                onChange={() =>
                                  setNewField({
                                    ...newField,
                                    compulsory: !newField.compulsory,
                                  })
                                }
                                id="compulsory-new-sm"
                                className="sr-only"
                              />
                              <label
                                htmlFor="compulsory-new-sm"
                                className={`block w-12 h-6 rounded-full transition-colors duration-200 ease-in-out ${
                                  newField.compulsory
                                    ? "bg-bgButton"
                                    : "bg-gray-200"
                                }`}
                              >
                                <span
                                  className={`block w-5 h-5 mt-0.5 ml-0.5 bg-white rounded-full transform transition-transform duration-200 ease-in-out ${
                                    newField.compulsory ? "translate-x-6" : ""
                                  }`}
                                />
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Original desktop/laptop layout */}
                      <div className="hidden md:flex items-center gap-4 md:flex-nowrap">
                        <div className="w-1/3">
                          <input
                            type="text"
                            value={newField.title}
                            onChange={(e) =>
                              setNewField({
                                ...newField,
                                title: e.target.value,
                              })
                            }
                            placeholder="Field Title"
                            className={`w-full px-4 py-3 border text-menuSubHeadingColor text-bgButton rounded-custom8px text-[14px] font-inter font-[400] focus:ring-1 focus:ring-red-300 transition-all duration-300 ease-in-out
                    ${
                      newField.compulsory
                        ? "border-menuSubHeadingColor text-menuSubHeadingColor placeholder:text-menuSubHeadingColor"
                        : "border-reloadBorder text-reloadBorder placeholder:text-reloadBorder"
                    } focus:border-reloadBorder`}
                          />
                        </div>
                        <div className="w-1/3">
                          <input
                            type="text"
                            value={newField.placeholder}
                            onChange={(e) =>
                              setNewField({
                                ...newField,
                                placeholder: e.target.value,
                              })
                            }
                            placeholder="Field Placeholder"
                            className={`w-full px-4 py-3 border rounded-custom8px text-[14px] font-inter font-[400] focus:ring-1 focus:ring-red-300 transition-all duration-300 ease-in-out
                    ${
                      newField.compulsory
                        ? "border-menuSubHeadingColor text-menuSubHeadingColor placeholder:text-menuSubHeadingColor"
                        : "border-reloadBorder text-reloadBorder placeholder:text-reloadBorder"
                    } focus:border-reloadBorder`}
                          />
                        </div>
                        <div className="w-[140px]">
                          <div className="relative">
                            <select
                              value={newField.type}
                              onChange={(e) =>
                                setNewField({
                                  ...newField,
                                  type: e.target.value,
                                })
                              }
                              className={`w-full px-4 py-3 border rounded-custom8px text-[14px] font-inter font-[400] focus:ring-1 focus:ring-red-300 transition-all duration-300 ease-in-out appearance-none
                      ${
                        newField.compulsory
                          ? "border-menuSubHeadingColor text-menuSubHeadingColor"
                          : "border-reloadBorder text-reloadBorder"
                      } focus:border-reloadBorder`}
                            >
                              <option
                                value="Text"
                                className="text-[14px] font-inter font-[400]"
                              >
                                Text
                              </option>
                              <option
                                value="Text area"
                                className="text-[14px] font-inter font-[400]"
                              >
                                Text area
                              </option>
                              <option
                                value="Number"
                                className="text-[14px] font-inter font-[400]"
                              >
                                Number
                              </option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                              <ChevronDown
                                size={16}
                                className="text-gray-500"
                              />
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={handleSaveField}
                          className="p-2 rounded-custom8px border border-reloadBorder hover:text-purple-600"
                        >
                          <PlusCircle size={24} />
                        </button>
                        <div className="flex items-center gap-2 ml-auto">
                          <span className="rounded-custom8px text-[14px] font-inter font-[400]">
                            Compulsory
                          </span>
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={newField.compulsory}
                              onChange={() =>
                                setNewField({
                                  ...newField,
                                  compulsory: !newField.compulsory,
                                })
                              }
                              id="compulsory-new"
                              className="sr-only"
                            />
                            <label
                              htmlFor="compulsory-new"
                              className={`block w-12 h-6 rounded-full transition-colors duration-200 ease-in-out ${
                                newField.compulsory
                                  ? "bg-bgButton"
                                  : "bg-gray-200"
                              }`}
                            >
                              <span
                                className={`block w-5 h-5 mt-0.5 ml-0.5 bg-white rounded-full transform transition-transform duration-200 ease-in-out ${
                                  newField.compulsory ? "translate-x-6" : ""
                                }`}
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right side - field preview */}
                  <div className="w-full sm:w-1/3 md:w-1/3 border-l sm:pl-6 md:pl-6 mt-8 sm:mt-0 md:mt-0 p-3 h-screen bg-background-grey">
                    <div className="pt-4 md:pt-0">
                      <div className="space-y-4 h-full">
                        {fields.map((field) => (
                          <div key={field.id} className="mb-6">
                            <div className="mb-2">
                              <div className="border border-cardTitle p-3 rounded-custom8px">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      fill="none"
                                      className="text-gray-400"
                                    >
                                      <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeWidth="1.5"
                                        d="M1.75 4h12.5M1.75 8h12.5M1.75 12h12.5"
                                      />
                                    </svg>
                                    <span className="text-sm font-medium text-gray-800">
                                      {field.title}
                                    </span>
                                  </div>
                                  <button
                                    className="text-gray-500 hover:text-blue-500"
                                    onClick={() => handleEditField(field.id)}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                      className="w-4 h-4"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                      />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Store;
