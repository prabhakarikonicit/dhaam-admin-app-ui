import React, { useState } from "react";
import { PenSquare, Trash2 } from "lucide-react";
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
  const [modalMode, setModalMode] = useState<"add" | "edit" | "view" | "delete">("add");
  const [selectedTax, setSelectedTax] = useState<Tax | null>(null);
  
  // Selected rows for DataGrid
  const [selectedMarketplaceRows, setSelectedMarketplaceRows] = useState<string[]>([]);
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
      type: "Fixed",
      applicableOn: "Product",
      enabled: false,
    },
    {
      id: "8",
      name: "GST",
      value: 10,
      type: "Percentage",
      applicableOn: "Delivery",
      enabled: true,
    }
  ]);
  
  // Sample data for store taxes
  const [storeTaxes, setStoreTaxes] = useState<Tax[]>([
    {
      id: "10",
      name: "GST",
      value: 10,
      type: "Fixed",
      applicableOn: "Store",
      enabled: true,
    },
    {
      id: "11",
      name: "GST",
      value: 10,
      type: "Percentage",
      applicableOn: "Store",
      enabled: false,
    },
    {
      id: "12",
      name: "GST",
      value: 10,
      type: "Fixed",
      applicableOn: "Store",
      enabled: true,
    }
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
  const openModal = (mode: "add" | "edit" | "view" | "delete", tax?: Tax) => {
    setModalMode(mode);
    setSelectedTax(tax || null);
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
      applicableOn: taxData.applicableOn as "Marketplace" | "Product" | "Delivery" | "Store",
      enabled: taxData.isActive || false
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
          marketplaceTaxes.map((tax) =>
            tax.id === newTax.id ? newTax : tax
          )
        );
      }
      
      setNotificationMessage("Tax updated successfully!");
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    } else if (modalMode === "delete" && selectedTax) {
      if (selectedTax.applicableOn === "Store") {
        setStoreTaxes(storeTaxes.filter((tax) => tax.id !== selectedTax.id));
      } else {
        setMarketplaceTaxes(marketplaceTaxes.filter((tax) => tax.id !== selectedTax.id));
      }
      
      setNotificationMessage("Tax deleted successfully!");
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }

    setIsModalOpen(false);
  };
  
  // Toggle tax status
  const toggleTaxStatus = (id: string, section: "marketplace" | "store") => {
    if (section === "marketplace") {
      setMarketplaceTaxes(
        marketplaceTaxes.map((tax) =>
          tax.id === id ? { ...tax, enabled: !tax.enabled } : tax
        )
      );
    } else {
      setStoreTaxes(
        storeTaxes.map((tax) =>
          tax.id === id ? { ...tax, enabled: !tax.enabled } : tax
        )
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
    const tax = [...marketplaceTaxes, ...storeTaxes].find(t => t.id === row.id);
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
          className={`px-3 py-1 rounded-full text-sm ${
            value === "Fixed"
              ? "bg-blue-100 text-blue-800"
              : "bg-green-100 text-green-800"
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
          <Trash2
            className="w-4 h-4 text-red-600 cursor-pointer"
            onClick={() => handleDeleteTax(row)}
          />
        </div>
      ),
    },
    {
      field: "enabled",
      headerName: "",
      width: "10%",
      renderCell: (value: boolean, row: any) => (
        <ToggleSwitch
          checked={value}
          onChange={() => {
            const section =
              row.applicableOn === "Store" ? "store" : "marketplace";
            toggleTaxStatus(row.id, section);
          }}
          aria-labelledby={`tax-status-${row.id}`}
        />
      ),
    },
  ];

  // SelectAll and SelectRow functions (unchanged from your original code)...
  const handleSelectAllMarketplace = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      case "add": return "Add New Tax";
      case "edit": return "Edit Tax";
      case "view": return "View Tax Details";
      case "delete": return "Delete Tax";
      default: return "Tax";
    }
  };

  return (
    <div className="max-w-full rounded-custom12px p-6 md:p-0 sm:p-0 lg:p-0 xl:p-0 sm:max-h-full md:max-h-full lg:max-h-full xl:max-h-full max-h-[80vh] overflow-y-auto sm:overflow-visible md:overflow-visible lg:overflow-visible xl:overflow-visible">
      {/* Header */}
      <div className="flex justify-between items-center p-4">
        <h1 className="text-[14px] font-inter font-[600] text-headding-color">Taxes</h1>
        <div className="flex gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-[12px] font-inter font-[500] text-paragraphBlack "
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 text-[12px] font-inter font-[500] text-paragraphBlack bg-backgroundWhite rounded-lg border border-reloadBorder"
          >
            Save
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="p-6 md:p-0 sm:p-0 lg:p-0 xl:p-0">
        {/* Global tax toggle */}
        <div className="flex justify-between items-center mb-6 bg-backgroundWhite p-6 rounded-custom12px">
          <div>
            <h2
              className="text-[14px] font-inter font-[500] text-textHeading"
              id="tax-settings-label"
            >
              Taxes
            </h2>
            <p className="text-[12px] font-inter font-[500] text-cardTitle mt-1" id="tax-settings-description">
              Configure tax rates for orders, store or merchant.
            </p>
          </div>
          <div className="flex items-center">
            <ToggleSwitch
              checked={taxesEnabled}
              onChange={() => setTaxesEnabled(!taxesEnabled)}
              aria-labelledby="tax-settings-label"
              aria-describedby="tax-settings-description"
            />
          </div>
        </div>

        {/* Marketplace Section */}
        <div className="mt-8 bg-backgroundWhite p-5 rounded-custom12px">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[12px] font-inter font-[500] text-paragraphBlack">Marketplace</h2>
            <button
              onClick={() => openModal("add")}
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
            <h2 className="text-[14px] font-inter font-[500] text-paragraphBlack">Store</h2>
            <button
              onClick={() => openModal("add")}
              className="px-4 py-2 text-[12px] font-inter font-[600] bg-backgroundWhite border border-reloadBorder rounded-custom"
            >
              Add Tax
            </button>
          </div>

          <div className="overflow-x-auto">
            <CustomDataGrid
              columns={taxColumns}
              rows={storeTaxes.filter(
                (tax) => tax.applicableOn === "Store"
              )}
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
          item={selectedTax ? {
            id: selectedTax.id,
            name: selectedTax.name,
            value: selectedTax.value,
            type: selectedTax.type,
            applicableOn: selectedTax.applicableOn,
            applicableType: selectedTax.applicableType,
            serviceFeeAppliedOn: selectedTax.serviceFeeAppliedOn,
            selectMerchant: selectedTax.selectMerchant,
            isActive: selectedTax.enabled
          } : undefined}
          onSave={handleSaveTax}
          title={getModalTitle()}
          subtitle={modalMode === "delete" ? `Are you sure you want to delete ${selectedTax?.name}?` : undefined}
          // size="md"
          formLayout="grid"
        gridColumns={2}

          showToggle={modalMode !== "add" && modalMode !== "delete"}
          toggleLabel="Active"
          confirmText={
            modalMode === "add" ? "Save" : 
            modalMode === "edit" ? "Save Changes" : 
            modalMode === "delete" ? "Delete" : 
            modalMode === "view" ? "Close" : "OK"
          }
        >
          {modalMode === "delete" && (
            <p className="text-gray-600">
              This action cannot be undone. This will permanently delete the tax 
              <span className="font-medium"> {selectedTax?.name}</span> and remove all associated data.
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