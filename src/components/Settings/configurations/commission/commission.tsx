import React, { useState } from "react";
import { PenSquare, Trash2 } from "lucide-react";
import CustomDataGrid from "../../../common/datagrid";
import ToggleSwitch from "../../../common/toggleSwitch";
import CustomModal, { FieldDefinition } from "../../../common/modals";
import {
  DisplayStoreTimingCard,
  EmailNotificationCard,
  DynamicCards,
  OrderControlCard,
  ScheduledOrderCard,
  InputCard,
  DeliveryMode,
} from "../../../common/cards";

// Define CommissionTier interface
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
const Commission: React.FC<TierBasedCommissionProps> = ({
  onSave,
  onCancel,
  onChange,
}) => {
  // State for tier-based commission
  const [tierBasedCommissionEnabled, setTierBasedCommissionEnabled] =
    useState(false);
  const [userLevelTagsToggle, setUserLevelTagsToggle] = useState(false);

  // State for commission settings
  const [commissionEnabled, setCommissionEnabled] = useState(true);
  const [rateType, setRateType] = useState<"Fixed" | "Percentage">("Fixed");
  const [commissionAmount, setCommissionAmount] = useState<string>("");
  const [paymentTransfer, setPaymentTransfer] = useState<"Online" | "Offline">(
    "Offline"
  );
  const [payoutSchedule, setPayoutSchedule] = useState<"Instant" | "Later">(
    "Later"
  );
  const [scheduleDay, setScheduleDay] = useState<string>("");

  // State for commission tiers
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

  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<
    "add" | "edit" | "view" | "delete"
  >("add");
  const [selectedTier, setSelectedTier] = useState<CommissionTier | null>(null);
  // Form state for the modal
  const [formType, setFormType] = useState<"Fixed" | "Percentage">("Fixed");
  const [formValue, setFormValue] = useState<string>("");
  const [formMinValue, setFormMinValue] = useState<string>("");
  const [formMaxValue, setFormMaxValue] = useState<string>("");
  // Selected rows for DataGrid
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [maxOrdersToggle, setMaxOrdersToggle] = useState(false);

  // Define fields for commission tier modal
  const tierFields: FieldDefinition[] = [
    {
      id: "Commission Type",
      label: "Commission Type",
      type: "number",
      placeholder: "Enter minimum order value",
      required: true,
    },
    {
      id: "Value",
      label: "Value",
      type: "number",
      placeholder: "Enter the value",
      required: true,
    },

    {
      id: "Minimum Order Value",
      label: "Minimum Order Value",
      type: "number",
      placeholder: "Enter commission value",
      required: true,
    },
    {
      id: "Maximum Order Value",
      label: "Minimum Order Value",
      type: "number",
      placeholder: "Enter commission value",
      required: true,
    },
  ];
  // Toggle commission status
  const toggleCommissionStatus = () => {
    const newStatus = !tierBasedCommissionEnabled;
    setTierBasedCommissionEnabled(newStatus);
    if (onChange) {
      onChange(newStatus, commissionTiers);
    }
  };
  // Open modal to add or edit a commission tier
  const openModal = (
    mode: "add" | "edit" | "view" | "delete",
    tier?: CommissionTier
  ) => {
    setModalMode(mode);
    setSelectedTier(tier || null);
    setIsModalOpen(true);
  };

  // Handle save from modal
  const handleSaveTier = () => {
    // Validate form data
    if (!formValue || !formMinValue || !formMaxValue) {
      return; // Don't save if fields are empty
    }

    // Create new tier
    const newTier: CommissionTier = {
      id: Date.now().toString(),
      type: formType,
      value: parseFloat(formValue),
      minOrderValue: parseFloat(formMinValue),
      maxOrderValue: parseFloat(formMaxValue),
    };

    // Update tiers
    const updatedTiers = [...commissionTiers, newTier];
    setCommissionTiers(updatedTiers);

    // Close modal
    setIsModalOpen(false);

    // Notify parent component
    if (onChange) {
      onChange(tierBasedCommissionEnabled, updatedTiers);
    }
  };
  const AddNewButton = (
    <button
      onClick={() => openModal("add")}
      className="w-full px-4 py-2 text-[12px] font-inter font-[600] text-cardValue bg-backgroundWhite border border-reloadBorder rounded-custom"
    >
      Add New
    </button>
  );
  // Handle editing tier
  const handleEditTier = (row: any) => {
    const tier = commissionTiers.find((t) => t.id === row.id);
    if (tier) {
      openModal("edit", tier);
    }
  };

  // Handle deleting tier
  const handleDeleteTier = (row: any) => {
    const updatedTiers = commissionTiers.filter((tier) => tier.id !== row.id);
    setCommissionTiers(updatedTiers);

    if (onChange) {
      onChange(tierBasedCommissionEnabled, updatedTiers);
    }
  };

  // Handle adding new tier
  const handleAddTier = () => {
    openModal("add");
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return `₹${amount.toFixed(2)}`;
  };
  // Format value based on type
  const formatValue = (type: "Fixed" | "Percentage", value: number) => {
    return type === "Fixed" ? formatCurrency(value) : `${value}%`;
  };

  // Define columns for the DataGrid
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
            <Trash2 className="w-5 h-5 text-gray-600" />
          </button>
          <button onClick={() => handleEditTier(row)} className="p-1 ml-2">
            <PenSquare className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      ),
    },
  ];

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

  // Get title for modal based on mode
  const getModalTitle = () => {
    switch (modalMode) {
      case "add":
        return "Add Commission Tier";
      case "edit":
        return "Edit Commission Tier";
      case "view":
        return "View Commission Tier";
      case "delete":
        return "Delete Commission Tier";
      default:
        return "Commission Tier";
    }
  };

  return (
    <div className="max-w-full rounded-custom12px p-6 md:p-0 sm:p-0 lg:p-0 xl:p-0 sm:max-h-full md:max-h-full lg:max-h-full xl:max-h-full max-h-[80vh] overflow-y-auto sm:overflow-visible md:overflow-visible lg:overflow-visible xl:overflow-visible">
      {/* Header */}
      <div className="flex justify-between items-center p-4 mt-0 sm:mt-6 md:mt-6 lg:mt-8 md:px-1 sm:px-1 lg:px-1 xl:px-1">
        <h1 className="text-[14px] font-inter font-[600] text-headding-color">
          Commission
        </h1>
        <div className="flex gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-[12px] font-inter font-[600] text-paragraphBlack"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 text-[12px] font-inter font-[600] text-paragraphBlack bg-backgroundWhite border border-reloadBorder rounded-custom"
          >
            Save
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="p-0 md:p-0 sm:p-0 lg:p-0 xl:p-0">
        {/* Commission Settings Section */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
          <DynamicCards
            checked={maxOrdersToggle}
            onChange={() => setMaxOrdersToggle(!maxOrdersToggle)}
            title="Commission Settings"
            description="Set commission rates for users per order. Choose between fixed or percentage-based commissions, applied online or offline."
            variant="default"
          />
          {/* <div>
            <h2 className="text-[14px] font-inter font-[600] text-textHeading">
              Commission Settings
              
            </h2>
            <p className="text-[12px] font-inter text-cardTitle mt-1">
              Set commission rates for users per order. Choose between fixed or percentage-based commissions, applied online or offline.
            </p>
          </div>
          <div className="flex items-center">
            <ToggleSwitch
              checked={commissionEnabled}
              onChange={() => setCommissionEnabled(!commissionEnabled)}
              aria-labelledby="commission-settings-label"
            />
          </div> */}
        </div>

        {commissionEnabled && (
          <>
            {/* Rate Configuration */}
            <div className="bg-backgroundWhite p-6 rounded-md">
              <h3 className="text-[14px] font-inter font-[500] text-textHeading mb-1">
                Rate Configuration
              </h3>
              <p className="text-[12px] font-inter font-[500]  text-cardTitle mb-4">
                Set commission rates for users to apply across all commission
                calculations.
              </p>

              {/* <div className="flex items-center gap-6 mt-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="rateType"
                    checked={rateType === "Fixed"}
                    onChange={() => setRateType("Fixed")}
                    className="w-4 h-4 mr-2 appearance-none checked:border-purple-600 checked:border-1 w-5 h-5 rounded-full border border-gray-300"
                  />
                  <span className="text-[14px] font-inter text-gray-700">
                    Fixed
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="rateType"
                    checked={rateType === "Percentage"}
                    onChange={() => setRateType("Percentage")}
                    className="w-4 h-4 mr-2 appearance-none checked:border-purple-600 checked:border-1 w-5 h-5 rounded-full border border-gray-300"
                  />
                  <span className="text-[14px] font-inter text-gray-700 focus:ring-purple-500">
                    Percentage
                  </span>
                </label>
              </div> */}
              <div className="flex items-center gap-6 mt-2">
                <label className="flex items-center cursor-pointer">
                  <div className="relative">
                    <input
                      type="radio"
                      name="rateType"
                      checked={rateType === "Fixed"}
                      onChange={() => setRateType("Fixed")}
                      className="sr-only" // Hide the actual input but keep it accessible
                    />
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        rateType === "Fixed"
                          ? "border-1 border-purple-600"
                          : "border border-gray-300"
                      }`}
                    >
                      {rateType === "Fixed" && (
                        <div className="w-3 h-3 rounded-full bg-purple-600"></div>
                      )}
                    </div>
                  </div>
                  <span className="ml-2 text-[14px] font-inter font-[500] text-gray-700">
                    Fixed
                  </span>
                </label>

                <label className="flex items-center cursor-pointer">
                  <div className="relative">
                    <input
                      type="radio"
                      name="rateType"
                      checked={rateType === "Percentage"}
                      onChange={() => setRateType("Percentage")}
                      className="sr-only" // Hide the actual input but keep it accessible
                    />
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                        rateType === "Percentage"
                          ? "border-1 border-purple-600"
                          : "border border-gray-300"
                      }`}
                    >
                      {rateType === "Percentage" && (
                        <div className="w-3 h-3 rounded-full bg-purple-600"></div>
                      )}
                    </div>
                  </div>
                  <span className="ml-2 text-[14px] font-inter text-gray-700 font-[500]">
                    Percentage
                  </span>
                </label>
              </div>

              {/* Commission Amount */}
              <div className="mt-6">
                <h3 className="text-[14px] font-inter font-[500] text-textHeading mb-3">
                  Commission Amount
                </h3>
                <select
                  value={commissionAmount}
                  onChange={(e) => setCommissionAmount(e.target.value)}
                  className="w-full p-3 border border-reloadBorder text-reloadBorder rounded-custom8px text-[14px] font-inter font-[400] appearance-none"
                >
                  <option value="" >Select</option>
                  {rateType === "Fixed" ? (
                    <>
                      <option value="100"  className="w-full p-3 border border-reloadBorder text-reloadBorder rounded-custom8px text-[14px] font-inter font-[400]">₹100</option>
                      <option value="200"  className="w-full p-3 border border-reloadBorder text-reloadBorder rounded-custom8px text-[14px] font-inter font-[400]">₹200</option>
                      <option value="300"  className="w-full p-3 border border-reloadBorder text-reloadBorder rounded-custom8px text-[14px] font-inter font-[400]">₹300</option>
                    </>
                  ) : (
                    <>
                      <option value="2">2%</option>
                      <option value="5">5%</option>
                      <option value="10">10%</option>
                    </>
                  )}
                </select>
              </div>
            </div>

            {/* Payment Transfer */}
            <div className="bg-white p-6 rounded-md">
              <h3 className="text-[14px] font-inter font-[500] text-textHeading mb-1">
                Payment Transfer
              </h3>
              <p className="text-[12px] font-inter font-[500] text-cardTitle mb-4">
                Set commission transfers via online or offline mode. Offline
                means cash settlement, while online transfers go to verified
                merchant accounts.
              </p>
              <div className="flex items-center gap-6 mt-2">
                <label className="flex items-center">
                  <div className="relative">
                    <input
                      type="radio"
                      name="paymentTransfer"
                      checked={paymentTransfer === "Online"}
                      onChange={() => setPaymentTransfer("Online")}
                      className="sr-only"
                    />
                    <div
                      className={`w-4 h-4 rounded-full border mr-2 flex items-center justify-center ${
                        paymentTransfer === "Online"
                          ? "border-1 border-purple-600"
                          : "border border-gray-300"
                      }`}
                    >
                      {paymentTransfer === "Online" && (
                        <div className="w-2 h-2 rounded-full bg-purple-600"></div>
                      )}
                    </div>
                  </div>
                  <span className="text-[14px] font-inter text-gray-700">
                    Online
                  </span>
                </label>
                <label className="flex items-center">
                  <div className="relative">
                    <input
                      type="radio"
                      name="paymentTransfer"
                      checked={paymentTransfer === "Offline"}
                      onChange={() => setPaymentTransfer("Offline")}
                      className="sr-only"
                    />
                    <div
                      className={`w-4 h-4 rounded-full border mr-2 flex items-center justify-center ${
                        paymentTransfer === "Offline"
                          ? "border-1 border-purple-600"
                          : "border border-gray-300"
                      }`}
                    >
                      {paymentTransfer === "Offline" && (
                        <div className="w-2 h-2 rounded-full bg-purple-600"></div>
                      )}
                    </div>
                  </div>
                  <span className="text-[14px] font-inter text-gray-700">
                    Offline
                  </span>
                </label>
              </div>

              {/* Payout Schedule */}
              <h3 className="text-[14px] font-inter font-[500] text-textHeading mt-6 mb-4">
                Payout Schedule
              </h3>
              <div className="flex items-center gap-6 mt-2">
                <label className="flex items-center">
                  <div className="relative">
                    <input
                      type="radio"
                      name="payoutSchedule"
                      checked={payoutSchedule === "Instant"}
                      onChange={() => setPayoutSchedule("Instant")}
                      className="sr-only"
                    />
                    <div
                      className={`w-4 h-4 rounded-full border mr-2 flex items-center justify-center ${
                        payoutSchedule === "Instant"
                          ? "border-1 border-purple-600"
                          : "border border-gray-300"
                      }`}
                    >
                      {payoutSchedule === "Instant" && (
                        <div className="w-2 h-2 rounded-full bg-purple-600"></div>
                      )}
                    </div>
                  </div>
                  <span className="text-[14px] font-inter text-gray-700">
                    Instant
                  </span>
                </label>
                <label className="flex items-center">
                  <div className="relative">
                    <input
                      type="radio"
                      name="payoutSchedule"
                      checked={payoutSchedule === "Later"}
                      onChange={() => setPayoutSchedule("Later")}
                      className="sr-only"
                    />
                    <div
                      className={`w-4 h-4 rounded-full border mr-2 flex items-center justify-center ${
                        payoutSchedule === "Later"
                          ? "border-1 border-purple-600"
                          : "border border-gray-300"
                      }`}
                    >
                      {payoutSchedule === "Later" && (
                        <div className="w-2 h-2 rounded-full bg-purple-600"></div>
                      )}
                    </div>
                  </div>
                  <span className="text-[14px] font-inter text-gray-700">
                    Later
                  </span>
                </label>
              </div>

              {/* Schedule Day */}
              {payoutSchedule === "Later" && (
                <div className="mt-6">
                  <h3 className="text-[14px] font-inter font-[500] text-textHeading mb-3">
                    Schedule day
                  </h3>
                  <input
                    type="text"
                    value={scheduleDay}
                    onChange={(e) => setScheduleDay(e.target.value)}
                    placeholder="Enter day"
                    className="w-full p-3 border border-gray-300 placeholder:text-reloadBorder rounded-custom8px placeholder:text-[14px] font-inter font-[400]"
                  />
                </div>
              )}
            </div>

            {/* Tier-Based Commission Section */}
            <div className="mb-6">
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
                <div className="mt-4">
                  <div className="border rounded-lg overflow-x-auto bg-backgroundWhite">
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
          </>
        )}
      </div>

      {/* Custom Modal for all operations */}
      {isModalOpen && (
        <CustomModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          mode="add"
          onSave={handleSaveTier}
          title="Add Tier-Based Commission"
          size="md"
          showToggle={false}
          confirmText="Add"
          formLayout="custom"
        >
          <div className="space-y-6">
            {/* Commission Type */}
            <div>
              <h3 className="text-[14px] font-inter font-[500] text-textHeading mb-3">
                Commission Type
              </h3>
              <div className="flex items-center space-x-6">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="type"
                    checked={formType === "Fixed"}
                    onChange={() => setFormType("Fixed")}
                    className="w-4 h-4 mr-2 text-blue-600"
                  />
                  <span className="text-[14px] font-inter font-[500] text-textHeading">Fixed</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="type"
                    checked={formType === "Percentage"}
                    onChange={() => setFormType("Percentage")}
                    className="w-4 h-4 mr-2 text-blue-600"
                  />
                  <span className="text-[14px] font-inter font-[500] text-textHeading">Percentage</span>
                </label>
              </div>
            </div>

            {/* Value */}
            <div>
              <label
                htmlFor="value"
                className="block text-[14px] font-inter font-[500] text-textHeading mb-2"
              >
                Value
              </label>
              <input
                type="text"
                id="value"
                value={formValue}
                onChange={(e) => setFormValue(e.target.value)}
                placeholder="Enter"
                className="w-full p-3 text-[14px] font-inter font-[400] text-reloadBorder rounded-custom8px border border-reloadBorder"
              />
            </div>

            {/* Order Value Range */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="minOrderValue"
                  className="block text-[14px] font-inter font-[500] text-textHeading mb-2"
                >
                  Minimum Order Value
                </label>
                <input
                  type="text"
                  id="minOrderValue"
                  value={formMinValue}
                  onChange={(e) => setFormMinValue(e.target.value)}
                  placeholder="Enter"
                  className="w-full p-3 text-[14px] font-inter font-[400] text-reloadBorder rounded-custom8px border border-reloadBorder"
                />
              </div>
              <div>
                <label
                  htmlFor="maxOrderValue"
                  className="block text-[14px] font-inter font-[500] text-textHeading mb-2"
                >
                  Maximum Order Value
                </label>
                <input
                  type="text"
                  id="maxOrderValue"
                  value={formMaxValue}
                  onChange={(e) => setFormMaxValue(e.target.value)}
                  placeholder="Enter"
                  className="w-full p-3 text-[14px] font-inter font-[400] text-reloadBorder rounded-custom8px border border-reloadBorder"
                />
              </div>
            </div>
          </div>
        </CustomModal>
      )}
    </div>
  );
};

export default Commission;
