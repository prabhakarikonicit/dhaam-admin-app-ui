import React, { useState } from "react";
import { PenSquare, Trash2, X } from "lucide-react";
import CustomDataGrid from "../../../common/datagrid";
import ToggleSwitch from "../../../common/toggleSwitch";
import CustomModal, { FieldDefinition } from "../../../common/modals";

// Define the Tax interface
interface Tax {
  id: string;
  name: string;
  value: number;
  type: "Fixed" | "Percentage";
  applicableOn: "Marketplace" | "Product" | "Delivery" | "Store";
  enabled: boolean;
  applicableType?: string;
  serviceFeeAppliedOn?: string;
  selectMerchant?: string;
}

// Props for the TaxManagement component
interface TaxManagementProps {
  onSave?: () => void;
  onCancel?: () => void;
}

const TaxManagement: React.FC<TaxManagementProps> = ({ onSave, onCancel }) => {
  // State for the main toggle
  const [taxesEnabled, setTaxesEnabled] = useState(true);

  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<
    "add" | "edit" | "view" | "delete"
  >("add");
  const [selectedTax, setSelectedTax] = useState<Tax | null>(null);
  const [taxType, setTaxType] = useState<"store" | "marketplace">(
    "marketplace"
  );
  // Selected rows for DataGrid
  const [selectedMarketplaceRows, setSelectedMarketplaceRows] = useState<
    string[]
  >([]);
  const [selectedStoreRows, setSelectedStoreRows] = useState<string[]>([]);

  // Notification state
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  // Sample data for marketplace taxes
  const [marketplaceTaxes, setMarketplaceTaxes] = useState<Tax[]>([
    {
      id: "1",
      name: "GST",
      value: 10,
      type: "Fixed",
      applicableOn: "Marketplace",
      enabled: true,
    },
    {
      id: "2",
      name: "GST",
      value: 10,
      type: "Percentage",
      applicableOn: "Product",
      enabled: false,
    },
    {
      id: "3",
      name: "GST",
      value: 10,
      type: "Fixed",
      applicableOn: "Marketplace",
      enabled: true,
    },
    {
      id: "4",
      name: "GST",
      value: 10,
      type: "Fixed",
      applicableOn: "Product",
      enabled: false,
    },
    {
      id: "5",
      name: "GST",
      value: 10,
      type: "Percentage",
      applicableOn: "Delivery",
      enabled: true,
    },
    {
      id: "6",
      name: "GST",
      value: 10,
      type: "Fixed",
      applicableOn: "Marketplace",
      enabled: true,
    },
    {
      id: "7",
      name: "GST",
      value: 10,
      type: "Percentage",
      applicableOn: "Product",
      enabled: false,
    },
    {
      id: "8",
      name: "GST",
      value: 10,
      type: "Fixed",
      applicableOn: "Delivery",
      enabled: true,
    },
    {
      id: "9",
      name: "GST",
      value: 10,
      type: "Percentage",
      applicableOn: "Product",
      enabled: false,
    },
  ]);

  // Sample data for store taxes
  const [storeTaxes, setStoreTaxes] = useState<Tax[]>([
    {
      id: "1",
      name: "GST",
      value: 10,
      type: "Fixed",
      applicableOn: "Store",
      enabled: true,
    },
    {
      id: "2",
      name: "GST",
      value: 10,
      type: "Percentage",
      applicableOn: "Store",
      enabled: false,
    },
    {
      id: "3",
      name: "GST",
      value: 10,
      type: "Fixed",
      applicableOn: "Store",
      enabled: true,
    },
    {
      id: "4",
      name: "GST",
      value: 10,
      type: "Fixed",
      applicableOn: "Store",
      enabled: true,
    },
    {
      id: "5",
      name: "GST",
      value: 10,
      type: "Percentage",
      applicableOn: "Store",
      enabled: true,
    },
    {
      id: "6",
      name: "GST",
      value: 10,
      type: "Fixed",
      applicableOn: "Store",
      enabled: true,
    },
    {
      id: "7",
      name: "GST",
      value: 10,
      type: "Percentage",
      applicableOn: "Store",
      enabled: true,
    },
    {
      id: "8",
      name: "GST",
      value: 10,
      type: "Fixed",
      applicableOn: "Store",
      enabled: true,
    },
    {
      id: "9",
      name: "GST",
      value: 10,
      type: "Percentage",
      applicableOn: "Store",
      enabled: true,
    },
  ]);

  // Tax field definitions for modal
  const taxFields: FieldDefinition[] = [
    {
      id: "name",
      label: "Tax Name",
      type: "text",
      placeholder: "e.g. VAT",
      required: true,
    },
    {
      id: "type",
      label: "Type",

      placeholder: "e.g. Fixed",
      type: "select",
      options: [
        { value: "Marketplace", label: "Marketplace" },
        { value: "Product", label: "Product" },
        { value: "Delivery", label: "Delivery" },
        { value: "Store", label: "Store" },
      ],
      required: true,
    },

    {
      id: "value",
      label: "Tax Value",
      type: "number",
      placeholder: "e.g. 10",
      required: true,
      min: 0,
      max: 100,
    },
    {
      id: "applicableOn",
      label: "Applied On",
      type: "select",
      options: [
        { value: "Marketplace", label: "Marketplace" },
        { value: "Product", label: "Product" },
        { value: "Delivery", label: "Delivery" },
        { value: "Store", label: "Store" },
      ],
      required: true,
    },
    {
      id: "applicableType",
      label: "Applicable Type",
      type: "select",
      options: [
        { value: "Marketplace", label: "Marketplace" },
        { value: "Product", label: "Product" },
        { value: "Delivery", label: "Delivery" },
        { value: "Store", label: "Store" },
      ],
      required: true,
    },

    {
      id: "serviceFeeAppliedOn",
      label: "Service Fee Applied On",
      type: "select",
      options: [
        { value: "Marketplace", label: "Marketplace" },
        { value: "Product", label: "Product" },
        { value: "Delivery", label: "Delivery" },
        { value: "Store", label: "Store" },
      ],
      required: true,
    },

    {
      id: "selectMerchant",
      label: "Select Merchant",
      type: "text",
      placeholder: "e.g. VAT",
      required: true,
    },
  ];

  // Open modal to add or edit a tax
  const openModal = (
    mode: "add" | "edit" | "view" | "delete",
    tax?: Tax,
    taxType: "store" | "marketplace" = "marketplace"
  ) => {
    setModalMode(mode);
    setSelectedTax(tax || null);
    setTaxType(taxType);
    setIsModalOpen(true);
  };

  // Handle save from modal
  const handleSaveTax = (taxData: any) => {
    // Convert modal data to Tax format
    const newTax: Tax = {
      id: taxData.id || Date.now().toString(),
      name: taxData.name,
      value: Number(taxData.value),
      type: taxData.type as "Fixed" | "Percentage",
      applicableOn: taxData.applicableOn as
        | "Marketplace"
        | "Product"
        | "Delivery"
        | "Store",
      enabled: taxData.isActive || false,
    };

    if (modalMode === "add") {
      if (newTax.applicableOn === "Store") {
        setStoreTaxes([...storeTaxes, newTax]);
      } else {
        setMarketplaceTaxes([...marketplaceTaxes, newTax]);
      }

      // Show notification
      setNotificationMessage("New tax added successfully!");
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    } else if (modalMode === "edit" && selectedTax) {
      if (newTax.applicableOn === "Store") {
        setStoreTaxes(
          storeTaxes.map((tax) => (tax.id === newTax.id ? newTax : tax))
        );
      } else {
        setMarketplaceTaxes(
          marketplaceTaxes.map((tax) => (tax.id === newTax.id ? newTax : tax))
        );
      }

      setNotificationMessage("Tax updated successfully!");
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    } else if (modalMode === "delete" && selectedTax) {
      if (selectedTax.applicableOn === "Store") {
        setStoreTaxes(storeTaxes.filter((tax) => tax.id !== selectedTax.id));
      } else {
        setMarketplaceTaxes(
          marketplaceTaxes.filter((tax) => tax.id !== selectedTax.id)
        );
      }

      setNotificationMessage("Tax deleted successfully!");
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }

    setIsModalOpen(false);
  };

  // Toggle tax status
  // In your toggleTaxStatus function
  const toggleTaxStatus = (id: string, section: "marketplace" | "store") => {
    console.log(`Starting toggle for ID: ${id} in section: ${section}`);

    if (section === "marketplace") {
      const tax = marketplaceTaxes.find((t) => t.id === id);
      console.log(
        `Found tax in marketplace: ${tax?.name}, current enabled: ${tax?.enabled}`
      );

      setMarketplaceTaxes((prev) =>
        prev.map((tax) => {
          if (tax.id === id) {
            console.log(
              `Toggling ${tax.id} from ${tax.enabled} to ${!tax.enabled}`
            );
            return { ...tax, enabled: !tax.enabled };
          }
          return tax;
        })
      );
    } else {
      const tax = storeTaxes.find((t) => t.id === id);
      console.log(
        `Found tax in store: ${tax?.name}, current enabled: ${tax?.enabled}`
      );

      setStoreTaxes((prev) =>
        prev.map((tax) => {
          if (tax.id === id) {
            console.log(
              `Toggling ${tax.id} from ${tax.enabled} to ${!tax.enabled}`
            );
            return { ...tax, enabled: !tax.enabled };
          }
          return tax;
        })
      );
    }
  };

  // Handle editing tax
  const handleEditTax = (row: any, section: "marketplace" | "store") => {
    const tax =
      section === "marketplace"
        ? marketplaceTaxes.find((t) => t.id === row.id)
        : storeTaxes.find((t) => t.id === row.id);

    if (tax) {
      openModal("edit", tax);
    }
  };

  // Handle deleting tax
  const handleDeleteTax = (row: any) => {
    const tax = [...marketplaceTaxes, ...storeTaxes].find(
      (t) => t.id === row.id
    );
    if (tax) {
      openModal("delete", tax);
    }
  };

  // Define columns for the DataGrid
  const taxColumns = [
    { field: "name", headerName: "Tax Name", width: "20%" },
    { field: "value", headerName: "Tax", width: "15%" },
    {
      field: "type",
      headerName: "Type",
      width: "20%",
      renderCell: (value: string) => (
        <span
          className={`px-3 py-2 rounded-custom80px text-[12px] font-inter font-[600] ${
            value === "Geofence"
              ? "bg-primary text-primary text-center"
              : value === "Fixed"
              ? "bg-primary text-primary text-center"
              : value === "Percentage"
              ? "bg-customWhiteColor text-green text-left"
              : ""
          }`}
        >
          {value}
        </span>
      ),
    },
    { field: "applicableOn", headerName: "Applicable on", width: "25%" },
    {
      field: "action",
      headerName: "Action",
      width: "25%",
      renderCell: (value: any, row: any) => (
        <div className="flex items-center">
          <PenSquare
            className="w-4 h-4 text-gray-600 mr-3 cursor-pointer"
            onClick={() => {
              const section =
                row.applicableOn === "Store" ? "store" : "marketplace";
              handleEditTax(row, section);
            }}
          />
          {/* <Trash2
            className="w-4 h-4 text-red-600 cursor-pointer"
            onClick={() => handleDeleteTax(row)}
          /> */}
        </div>
      ),
    },
    {
      field: "enabled",
      headerName: "",
      width: "10%",
      renderCell: (value: boolean, row: any) => {
        // Create a unique ID for this specific toggle
        const toggleId = `toggle-${row.id}-${row.applicableOn}`;

        return (
          <ToggleSwitch
            key={toggleId}
            checked={value}
            onChange={(e) => {
              // Stop propagation to prevent the event from bubbling up
              e.stopPropagation();

              // Determine the section
              const section =
                row.applicableOn === "Store" ? "store" : "marketplace";

              // Log before update
              console.log(
                `Before toggle: ${row.id} in ${section}, current value: ${value}`
              );

              // Toggle the status
              toggleTaxStatus(row.id, section);
            }}
            aria-labelledby={`tax-status-${row.id}`}
          />
        );
      },
    },
  ];

  // SelectAll and SelectRow functions (unchanged from your original code)...
  const handleSelectAllMarketplace = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.checked) {
      setSelectedMarketplaceRows(marketplaceTaxes.map((tax) => tax.id));
    } else {
      setSelectedMarketplaceRows([]);
    }
  };

  const handleSelectRowMarketplace = (id: string) => {
    if (selectedMarketplaceRows.includes(id)) {
      setSelectedMarketplaceRows(
        selectedMarketplaceRows.filter((rowId) => rowId !== id)
      );
    } else {
      setSelectedMarketplaceRows([...selectedMarketplaceRows, id]);
    }
  };

  const handleSelectAllStore = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedStoreRows(storeTaxes.map((tax) => tax.id));
    } else {
      setSelectedStoreRows([]);
    }
  };

  const handleSelectRowStore = (id: string) => {
    if (selectedStoreRows.includes(id)) {
      setSelectedStoreRows(selectedStoreRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedStoreRows([...selectedStoreRows, id]);
    }
  };

  // Get title for modal based on mode
  const getModalTitle = () => {
    switch (modalMode) {
      case "add":
        return taxType === "store" ? "Store Tax" : "Marketplace Tax";
      case "edit":
        return "Edit Tax";
      case "view":
        return "View Tax Details";
      default:
        return "Tax";
    }
  };

  return (
    <div className="max-w-full rounded-custom12px p-1 md:p-0 sm:p-0 lg:p-0 xl:p-0 sm:max-h-full md:max-h-full lg:max-h-full xl:max-h-full max-h-[80vh] overflow-y-auto sm:overflow-visible md:overflow-visible lg:overflow-visible xl:overflow-visible">
      {/* Header */}
      <div className="flex justify-between items-center p-4 mt-0 sm:mt-6 md:mt-8 lg:mt-12 xl-mt-12">
        <h1 className="text-[14px] font-inter font-[600] text-headding-color">
          Taxes
        </h1>
        <div className="flex gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-[12px] font-inter font-[500] text-paragraphBlack "
          >
            Discard
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 text-[12px] font-inter font-[500] font-[600] text-whiteColor bg-bgButton rounded-lg border border-reloadBorder"
          >
            Save
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="p-1 md:p-0 sm:p-0 lg:p-0 xl:p-0">
        {/* Global tax toggle */}
        <div className="flex justify-between items-center mb-6 bg-backgroundWhite p-6 rounded-custom12px">
          <div>
            <h2
              className="text-[14px] font-inter font-[500] text-textHeading"
              id="tax-settings-label"
            >
              Taxes
            </h2>
            <p
              className="text-[12px] font-inter font-[500] text-cardTitle mt-1"
              id="tax-settings-description"
            >
              Configure tax rates for orders, store or merchant.
            </p>
          </div>
          <div className="flex items-center">
            <ToggleSwitch
              checked={taxesEnabled}
              onChange={(e) => {
                // Stop propagation
                e.stopPropagation();
                // Toggle
                setTaxesEnabled(!taxesEnabled);
              }}
              aria-labelledby="tax-settings-label"
              aria-describedby="tax-settings-description"
            />
          </div>
        </div>

        {/* Marketplace Section */}
        <div className="mt-8 bg-backgroundWhite p-5 rounded-custom12px">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[12px] font-inter font-[500] text-paragraphBlack">
              Marketplace
            </h2>
            <button
              onClick={() => openModal("add", undefined, "marketplace")}
              className="px-4 py-2 text-[12px] font-inter font-[600] bg-backgroundWhite border border-reloadBorder rounded-custom"
            >
              Add Tax
            </button>
          </div>

          <div className="overflow-x-auto">
            <CustomDataGrid
              columns={taxColumns}
              rows={marketplaceTaxes.filter(
                (tax) => tax.applicableOn !== "Store"
              )}
              selectedRows={selectedMarketplaceRows}
              onSelectAll={handleSelectAllMarketplace}
              onSelectRow={handleSelectRowMarketplace}
              searchPlaceholder="Search taxes"
              hideToolbar={false}
              //   showActionColumn={true}
              //   onEdit={(row) => handleEditTax(row, "marketplace")}
              //   onDelete={(row) => handleDeleteTax(row)}
            />
          </div>
        </div>

        {/* Store Section */}
        <div className="mt-8 bg-backgroundWhite p-6 rounded-custom12px">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[14px] font-inter font-[500] text-paragraphBlack">
              Store
            </h2>
            <button
              onClick={() => openModal("add", undefined, "store")}
              className="px-4 py-2 text-[12px] font-inter font-[600] bg-backgroundWhite border border-reloadBorder rounded-custom"
            >
              Add Tax
            </button>
          </div>

          <div className="overflow-x-auto">
            <CustomDataGrid
              columns={taxColumns}
              rows={storeTaxes.filter((tax) => tax.applicableOn === "Store")}
              selectedRows={selectedStoreRows}
              onSelectAll={handleSelectAllStore}
              onSelectRow={handleSelectRowStore}
              searchPlaceholder="Search taxes"
              hideToolbar={false}
              //   showActionColumn={true}
              //   onEdit={(row) => handleEditTax(row, "store")}
              //   onDelete={(row) => handleDeleteTax(row)}
            />
          </div>
        </div>
      </div>

      {/* Custom Modal for all operations */}
      {isModalOpen && (
        <CustomModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          mode={modalMode}
          fields={modalMode !== "delete" ? taxFields : []}
          item={
            selectedTax
              ? {
                  id: selectedTax.id,
                  name: selectedTax.name,
                  value: selectedTax.value,
                  type: selectedTax.type,
                  applicableOn: selectedTax.applicableOn,
                  applicableType: selectedTax.applicableType,
                  serviceFeeAppliedOn: selectedTax.serviceFeeAppliedOn,
                  selectMerchant: selectedTax.selectMerchant,
                  isActive: selectedTax.enabled,
                }
              : undefined
          }
          onSave={handleSaveTax}
          title={getModalTitle()}
          size="md"
          formLayout="custom"
          // gridColumns={2}
          customFooter={
            <div className="w-full max-w-5xl mx-auto mt-[-15px]">
              <div className="">
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  <div className="mb-1 mt-0">
                    <label className="block text-[12px] font-[500] font-inter text-paragraphBlack">
                      Tax Name
                    </label>
                    <input
                      type="text"
                      name="taxName"
                      placeholder="e.g. VAT"
                      className="mt-1 block w-full shadow-sm px-3 py-4 focus:border-indigo-300 rounded-custom8px border border-reloadBorder font-inter font-[14px] font-[400] text-reloadBorder focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </div>
                  <div className="mb-1">
                    <label className="block text-[12px] font-[500] font-inter text-paragraphBlack">
                      Type
                    </label>
                    <div className="relative">
                      <select
                        name="type"
                        className="mt-1 block w-full shadow-sm px-3 py-4 focus:border-indigo-300 rounded-custom8px border border-reloadBorder font-inter font-[14px] font-[400] text-reloadBorder focus:ring focus:ring-indigo-200 focus:ring-opacity-50 appearance-none"
                      >
                        <option
                          value=""
                          disabled
                          className="font-inter font-[14px] font-[400] text-reloadBorder"
                        >
                          e.g. Fixed
                        </option>
                        <option
                          value="fixed"
                          className="font-inter font-[14px] font-[400] text-reloadBorder"
                        >
                          Fixed
                        </option>
                        <option
                          value="percentage"
                          className="font-inter font-[14px] font-[400] text-reloadBorder"
                        >
                          Percentage
                        </option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2  mt-1">
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
                            d="M5.29289 7.29289C5.68342 6.90237 6.31658 6.90237 6.70711 7.29289L10 10.5858L13.2929 7.29289C13.6834 6.90237 14.3166 6.90237 14.7071 7.29289C15.0976 7.68342 15.0976 8.31658 14.7071 8.70711L10.7071 12.7071C10.3166 13.0976 9.68342 13.0976 9.29289 12.7071L5.29289 8.70711C4.90237 8.31658 4.90237 7.68342 5.29289 7.29289Z"
                            fill="#949494"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="mb-1">
                    <label className="block text-[12px] font-[500] font-inter text-paragraphBlack">
                      Tax
                    </label>
                    <input
                      type="text"
                      name="tax"
                      placeholder="e.g. 10"
                      className="mt-1 block w-full shadow-sm px-3 py-4 focus:border-indigo-300 rounded-custom8px border border-reloadBorder font-inter font-[14px] font-[400] text-reloadBorder focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </div>
                  <div className="mb-1">
                    <label className="block text-[12px] font-[500] font-inter text-paragraphBlack">
                      Applied On
                    </label>
                    <div className="relative">
                      <select
                        name="appliedOn"
                        className="mt-1 block w-full shadow-sm px-3 py-4 focus:border-indigo-300 rounded-custom8px border border-reloadBorder font-inter font-[14px] font-[400] text-reloadBorder focus:ring focus:ring-indigo-200 focus:ring-opacity-50 appearance-none"
                      >
                        <option
                          value=""
                          disabled
                          className="font-inter font-[14px] font-[400] text-reloadBorder"
                        >
                          e.g.Store
                        </option>
                        <option
                          value="store"
                          className="font-inter font-[14px] font-[400] text-reloadBorder"
                        >
                          Store
                        </option>
                        <option
                          value="product"
                          className="font-inter font-[14px] font-[400] text-reloadBorder"
                        >
                          Product
                        </option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 mt-1">
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
                            d="M5.29289 7.29289C5.68342 6.90237 6.31658 6.90237 6.70711 7.29289L10 10.5858L13.2929 7.29289C13.6834 6.90237 14.3166 6.90237 14.7071 7.29289C15.0976 7.68342 15.0976 8.31658 14.7071 8.70711L10.7071 12.7071C10.3166 13.0976 9.68342 13.0976 9.29289 12.7071L5.29289 8.70711C4.90237 8.31658 4.90237 7.68342 5.29289 7.29289Z"
                            fill="#949494"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="mb-1">
                    <label className="block text-[12px] font-[500] font-inter text-paragraphBlack">
                      Applicable Type
                    </label>
                    <div className="relative">
                      <select
                        name="applicableType"
                        className="mt-1 block w-full shadow-sm px-3 py-4 focus:border-indigo-300 rounded-custom8px border border-reloadBorder font-inter font-[14px] font-[400] text-reloadBorder focus:ring focus:ring-indigo-200 focus:ring-opacity-50 appearance-none"
                      >
                        <option
                          value=""
                          disabled
                          className="font-inter font-[14px] font-[400] text-reloadBorder"
                        >
                          Select
                        </option>
                        <option
                          value="type1"
                          className="font-inter font-[14px] font-[400] text-reloadBorder"
                        >
                          Type 1
                        </option>
                        <option
                          value="type2"
                          className="font-inter font-[14px] font-[400] text-reloadBorder"
                        >
                          Type 2
                        </option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 mt-1">
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
                            d="M5.29289 7.29289C5.68342 6.90237 6.31658 6.90237 6.70711 7.29289L10 10.5858L13.2929 7.29289C13.6834 6.90237 14.3166 6.90237 14.7071 7.29289C15.0976 7.68342 15.0976 8.31658 14.7071 8.70711L10.7071 12.7071C10.3166 13.0976 9.68342 13.0976 9.29289 12.7071L5.29289 8.70711C4.90237 8.31658 4.90237 7.68342 5.29289 7.29289Z"
                            fill="#949494"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="mb-1">
                    <label className="block text-[12px] font-[500] font-inter text-paragraphBlack">
                      Service Fee Applied On
                    </label>
                    <div className="relative">
                      <select
                        name="serviceFeeAppliedOn"
                        className="mt-1 block w-full shadow-sm px-3 py-4 focus:border-indigo-300 rounded-custom8px border border-reloadBorder font-inter font-[14px] font-[400] text-reloadBorder focus:ring focus:ring-indigo-200 focus:ring-opacity-50 appearance-none"
                      >
                        <option
                          value=""
                          disabled
                          className="font-inter font-[14px] font-[400] text-reloadBorder"
                        >
                          Select
                        </option>
                        <option
                          value="fee1"
                          className="font-inter font-[14px] font-[400] text-reloadBorder"
                        >
                          Fee Type 1
                        </option>
                        <option
                          value="fee2"
                          className="font-inter font-[14px] font-[400] text-reloadBorder"
                        >
                          Fee Type 2
                        </option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 mt-1">
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
                            d="M5.29289 7.29289C5.68342 6.90237 6.31658 6.90237 6.70711 7.29289L10 10.5858L13.2929 7.29289C13.6834 6.90237 14.3166 6.90237 14.7071 7.29289C15.0976 7.68342 15.0976 8.31658 14.7071 8.70711L10.7071 12.7071C10.3166 13.0976 9.68342 13.0976 9.29289 12.7071L5.29289 8.70711C4.90237 8.31658 4.90237 7.68342 5.29289 7.29289Z"
                            fill="#949494"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="mb-1 col-span-2">
                    <label className="block text-[12px] font-[500] font-inter text-paragraphBlack">
                      Select Merchant
                    </label>
                    <div className="relative">
                      <select
                        name="merchant"
                        className="mt-1 block w-full shadow-sm px-3 py-4 focus:border-indigo-300 rounded-custom8px border border-reloadBorder font-inter font-[14px] font-[400] text-reloadBorder focus:ring focus:ring-indigo-200 focus:ring-opacity-50 appearance-none"
                      >
                        <option
                          value=""
                          disabled
                          className="font-inter font-[14px] font-[400] text-reloadBorder"
                        >
                          Select
                        </option>
                        <option
                          value="merchant1"
                          className="font-inter font-[14px] font-[400] text-reloadBorder"
                        >
                          Merchant 1
                        </option>
                        <option
                          value="merchant2"
                          className="font-inter font-[14px] font-[400] text-reloadBorder"
                        >
                          Merchant 2
                        </option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 mt-1">
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
                            d="M5.29289 7.29289C5.68342 6.90237 6.31658 6.90237 6.70711 7.29289L10 10.5858L13.2929 7.29289C13.6834 6.90237 14.3166 6.90237 14.7071 7.29289C15.0976 7.68342 15.0976 8.31658 14.7071 8.70711L10.7071 12.7071C10.3166 13.0976 9.68342 13.0976 9.29289 12.7071L5.29289 8.70711C4.90237 8.31658 4.90237 7.68342 5.29289 7.29289Z"
                            fill="#949494"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-custom border border-btnBorder shadow-sm px-4 py-2 bg-bgButton text-[12px] font-[600] font-inter text-paragraphBlack text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    onClick={() => handleSaveTax({})}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          }
          showToggle={modalMode !== "add" && modalMode !== "delete"}
          toggleLabel="Active"
          confirmText={
            modalMode === "add"
              ? "Save"
              : modalMode === "edit"
              ? "Save Changes"
              : modalMode === "delete"
              ? "Delete"
              : modalMode === "view"
              ? "Close"
              : "OK"
          }
        >
          {modalMode === "delete" && (
            <p className="text-gray-600">
              This action cannot be undone. This will permanently delete the tax
              <span className="font-medium"> {selectedTax?.name}</span> and
              remove all associated data.
            </p>
          )}
        </CustomModal>
      )}

      {/* Notification */}
      {showNotification && (
        <div className="fixed bottom-4 inset-x-0 flex justify-center z-50">
          <div className="bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2">
            <span>{notificationMessage}</span>
            <button
              className="ml-4 text-white"
              onClick={() => setShowNotification(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaxManagement;
