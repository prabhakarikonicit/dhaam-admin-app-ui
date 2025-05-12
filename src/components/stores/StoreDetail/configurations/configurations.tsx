import React, { useState } from "react";
import ToggleSwitch from "../../../common/toggleSwitch";
import CustomDataGrid from "../../../common/datagrid";

import SurgeDelivery from "../../../Settings/configurations/store/surgedelivery";
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
interface CommissionTier {
  id: string;
  minOrderValue: number;
  maxOrderValue: number;
  type: "Fixed" | "Percentage";
  value: number;
}

// Define props interface for TierBasedCommission
interface TierBasedCommissionProps {
  onChange?: (enabled: boolean, tiers: CommissionTier[]) => void;
  onSave: () => void;
  onCancel: () => void;
}
interface ConfigurationsProps {
  onClose: () => void;
  // Use the more flexible version of onSave that can accept data
  onSave: (data?: any) => void;
  onCancel: () => void;
  onChange?: (enabled: boolean, tiers: CommissionTier[]) => void;
  hideHeader?: boolean;
}

// Store settings component
const Configurations: React.FC<ConfigurationsProps> = ({
  onClose,
  onSave,
  onCancel,
  onChange,
  hideHeader = false,
}) => {
  // Format currency
  const formatCurrency = (amount: number) => {
    return `₹${amount.toFixed(2)}`;
  };
  // Format value based on type
  const formatValue = (type: "Fixed" | "Percentage", value: number) => {
    return type === "Fixed" ? formatCurrency(value) : `${value}%`;
  };
  const [selectedDayOption, setSelectedDayOption] =
    useState<string>("everyday");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [tierBasedCommissionEnabled, setTierBasedCommissionEnabled] =
    useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedTier, setSelectedTier] = useState<CommissionTier | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [selectedTimeOption, setSelectedTimeOption] =
    useState<string>("fullTime");
  const [modalMode, setModalMode] = useState<
    "add" | "edit" | "view" | "delete"
  >("add");
  const [cardData, setCardData] = useState([
    { title: "Minimum Order Amount", placeholder: "Enter amount" },
    { title: "Minimum Pickup Amount", placeholder: "Enter amount" },
  ]);
  // State for all toggles
  const [settings, setSettings] = useState({
    surgeDelivery: true,
    displayStoreTiming: false,
    emailNotification: false,
    maxOrdersPerSlot: false,
    customOrderFields: false,

    orderControl: true,
    productMultiSelection: false,
    scheduledOrderTimeRange: false,
    setMinimumOrderAmount: false,
    scheduledOrderReminders: false,
  });
  const [commissionTiers, setCommissionTiers] = useState<CommissionTier[]>([
    {
      id: "1",
      minOrderValue: 300,
      maxOrderValue: 1200,
      type: "Percentage",
      value: 2,
    },
    {
      id: "2",
      minOrderValue: 300,
      maxOrderValue: 1200,
      type: "Fixed",
      value: 20,
    },
    {
      id: "3",
      minOrderValue: 300,
      maxOrderValue: 1200,
      type: "Percentage",
      value: 2,
    },
    {
      id: "4",
      minOrderValue: 300,
      maxOrderValue: 1200,
      type: "Fixed",
      value: 20,
    },
    {
      id: "5",
      minOrderValue: 300,
      maxOrderValue: 1200,
      type: "Percentage",
      value: 2,
    },
    {
      id: "6",
      minOrderValue: 300,
      maxOrderValue: 1200,
      type: "Fixed",
      value: 20,
    },
  ]);
  const handleEditTier = (row: any) => {
    const tier = commissionTiers.find((t) => t.id === row.id);
    if (tier) {
      openModal("edit", tier);
    }
  };
  
  const tierColumns = [
    {
      field: "minOrderValue",
      headerName: "Minimum order value",
      width: "25%",
      renderCell: (value: number) => formatCurrency(value),
    },
    {
      field: "maxOrderValue",
      headerName: "Maximum order value",
      width: "25%",
      renderCell: (value: number) => formatCurrency(value),
    },
    { field: "type", headerName: "Type", width: "20%" },
    {
      field: "value",
      headerName: "Value",
      width: "15%",
      renderCell: (value: number, row: any) => formatValue(row.type, value),
    },
    {
      field: "action",
      headerName: "Action",
      width: "15%",
      renderCell: (value: any, row: any) => (
        <div className="flex items-center justify-center">
          <button onClick={() => handleDeleteTier(row)} className="p-1">
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
                d="M7.1999 1.59961C6.89689 1.59961 6.61988 1.77081 6.48436 2.04184L5.90548 3.19961H3.1999C2.75807 3.19961 2.3999 3.55778 2.3999 3.99961C2.3999 4.44144 2.75807 4.79961 3.1999 4.79961L3.1999 12.7996C3.1999 13.6833 3.91625 14.3996 4.7999 14.3996H11.1999C12.0836 14.3996 12.7999 13.6833 12.7999 12.7996V4.79961C13.2417 4.79961 13.5999 4.44144 13.5999 3.99961C13.5999 3.55778 13.2417 3.19961 12.7999 3.19961H10.0943L9.51545 2.04184C9.37993 1.77081 9.10292 1.59961 8.7999 1.59961H7.1999ZM5.5999 6.39961C5.5999 5.95778 5.95807 5.59961 6.3999 5.59961C6.84173 5.59961 7.1999 5.95778 7.1999 6.39961V11.1996C7.1999 11.6414 6.84173 11.9996 6.3999 11.9996C5.95807 11.9996 5.5999 11.6414 5.5999 11.1996V6.39961ZM9.5999 5.59961C9.15807 5.59961 8.7999 5.95778 8.7999 6.39961V11.1996C8.7999 11.6414 9.15807 11.9996 9.5999 11.9996C10.0417 11.9996 10.3999 11.6414 10.3999 11.1996V6.39961C10.3999 5.95778 10.0417 5.59961 9.5999 5.59961Z"
                fill="#2B2B2B"
              />
            </svg>
          </button>
          <button onClick={() => handleEditTier(row)} className="p-1 ml-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M13.9315 2.06824C13.3066 1.4434 12.2936 1.4434 11.6687 2.06824L5.6001 8.13687V10.3996H7.86284L13.9315 4.33098C14.5563 3.70614 14.5563 2.69308 13.9315 2.06824Z"
                fill="#2B2B2B"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M1.6001 4.79961C1.6001 3.91595 2.31644 3.19961 3.2001 3.19961H6.4001C6.84193 3.19961 7.2001 3.55778 7.2001 3.99961C7.2001 4.44144 6.84193 4.79961 6.4001 4.79961H3.2001V12.7996H11.2001V9.59961C11.2001 9.15778 11.5583 8.79961 12.0001 8.79961C12.4419 8.79961 12.8001 9.15778 12.8001 9.59961V12.7996C12.8001 13.6833 12.0838 14.3996 11.2001 14.3996H3.2001C2.31644 14.3996 1.6001 13.6833 1.6001 12.7996V4.79961Z"
                fill="#2B2B2B"
              />
            </svg>
          </button>
        </div>
      ),
    },
  ];
  const handleDeleteTier = (row: any) => {
    const updatedTiers = commissionTiers.filter((tier) => tier.id !== row.id);
    setCommissionTiers(updatedTiers);

    if (onChange) {
      onChange(tierBasedCommissionEnabled, updatedTiers);
    }
  };
  // SelectAll and SelectRow functions (for DataGrid)
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedRows(commissionTiers.map((tier) => tier.id));
    } else {
      setSelectedRows([]);
    }
  };
  const handleSelectRow = (id: string) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };
  const toggleCommissionStatus = () => {
    const newStatus = !tierBasedCommissionEnabled;
    setTierBasedCommissionEnabled(newStatus);
    if (onChange) {
      onChange(newStatus, commissionTiers);
    }
  };
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
  // Open modal to add or edit a commission tier
  const openModal = (
    mode: "add" | "edit" | "view" | "delete",
    tier?: CommissionTier
  ) => {
    console.log("openModal called with:", { mode, tier });
    setModalMode(mode);
    setSelectedTier(tier || null);
    setIsModalOpen(true);
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
  const AddNewButton = (
    <button
      onClick={() => {
        console.log("Add New button clicked");
        openModal("add");
      }}
      className="w-full px-4 py-2 text-[12px] font-inter font-[600] text-cardValue bg-backgroundWhite border border-reloadBorder rounded-custom"
    >
      Add New
    </button>
  );
  
  return (
    <div className="max-w-full rounded-custom12px p-1 md:p-0 sm:p-0 lg:p-0 xl:p-0 sm:max-h-full md:max-h-full lg:max-h-full xl:max-h-full max-h-[70vh] overflow-y-auto sm:overflow-visible md:overflow-visible lg:overflow-visible xl:overflow-visible">
      {/* Header */}
      {!hideHeader && (
        <div className="flex justify-between items-center mb-2 p-4 rounded-md mt-0 sm:mt-4 md:mt-4 md:px-1 sm:px-1 lg:px-1 xl:px-1">
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
        <div className="border border-reloadBorder rounded-custom12px">
          <SurgeDelivery
            showBorder={true}
            title="Surge On Delivery"
            description="Apply dynamic delivery charges based on demand and conditions."
          />
        </div>
      </div>

      {/* Order Settings */}
      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
        {/* First Column */}
        <div className="space-y-4">
          {/* Minimum Order Amount */}
          <InputCardGrid cards={cardData} showBorder={true} />
          {/* Order Placement Email Notification */}
          <EmailNotificationCard
            showBorder={true}
            checked={settings.emailNotification}
            onChange={() => toggleSetting("emailNotification")}
          />

          {/* Maximum Orders Per Slot */}
          {/* <DynamicCards
            checked={settings.maxOrdersPerSlot}
            onChange={() => toggleSetting("maxOrdersPerSlot")}
            title="Maximum Orders Per Slot" // Customize the title
            description="Set the maximum number of orders allowed per time slot." // Customize the description
            maxOrderLabel="Max Orders per Slot" // Optional: Change the label inside the expanded content
            maxOrderPlaceholder="Enter the maximum order limit per slot" // Optional: Change the placeholder
            value={maxOrdersValue} // Track the input value
            variant="WithInputBelow"
            onValueChange={(e) => setMaxOrdersValue(e.target.value)} // Handle value changes
          /> */}

          {/* Order Control with Product Multi-Selection */}
          {/* <OrderControlCard
            showBorder={true}
            orderControlChecked={settings.orderControl}
            onOrderControlChange={() => toggleSetting("orderControl")}
            productMultiSelectionChecked={settings.productMultiSelection}
            onProductMultiSelectionChange={() =>
              toggleSetting("productMultiSelection")
            }
          /> */}
        </div>
        <DynamicCards
          checked={settings.displayStoreTiming}
          onChange={() => toggleSetting("displayStoreTiming")}
          title="Display Store Timing" // Customize the title
          description="Enable to show store operating hours on the listing." // Customize the description
          maxOrderLabel="Order Limit" // Optional: Change the label inside the expanded content
          maxOrderPlaceholder="Enter limit (e.g., 50)" // Optional: Change the placeholder
          value={maxOrdersValue} // Track the input value
          showBorder={true}
          onValueChange={(e) => setMaxOrdersValue(e.target.value)} // Handle value changes
        />
        {/* Second Column */}
        <div className="space-y-4">
          {/* Display Store Timing */}
          {/* <DisplayStoreTimingCard
            checked={settings.displayStoreTiming}
            onChange={() => toggleSetting("displayStoreTiming")}
          /> */}

          {/* Preparation Time */}
          <div className="bg-white rounded-custom12px p-6 mb-4 border border-reloadBorder">
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
          showBorder ={true}
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
            showBorder={true}
            onSave={() => console.log("Delivery mode settings saved")}
          />
          <DeliveryMode
            showBorder={true}
            onSave={() => console.log("Delivery mode settings saved")}
          />

          <div className="mb-6 border border-reloadBorder rounded-custom12px">
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4 ">
              <DynamicCards
                checked={tierBasedCommissionEnabled}
                onChange={toggleCommissionStatus}
                title="Tier-Based Commission"
                description="Apply different commission rates based on order amount. Default rates apply if no tier matches."
                actionButton={AddNewButton}
                variant="compact"
              />
            </div>

            {tierBasedCommissionEnabled && (
              <div className="mt-4 overflow-hidden">
                <div className="p-4 ">
                  <CustomDataGrid
                    columns={tierColumns}
                    rows={commissionTiers}
                    selectedRows={selectedRows}
                    onSelectAll={handleSelectAll}
                    onSelectRow={handleSelectRow}
                    searchPlaceholder=""
                    hideToolbar={true}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Custom Order Fields Card */}
          <div className="bg-white rounded-custom12px p-6 border border-reloadBorder">
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

export default Configurations;
