import React, { useState } from "react";
import { PenSquare, Trash2 } from "lucide-react";
import CustomDataGrid from "../../../common/datagrid";
import ToggleSwitch from "../../../common/toggleSwitch";
import CustomModal, { FieldDefinition } from "../../../common/modals";

// Define the Location interface
interface Location {
  id: string;
  name: string;
  description: string;
  type: "Geofence" | "Fixed" | "Percentage";
  createdOn: string;
  isActive: boolean;
}

// Define the City interface
interface City {
  id: string;
  name: string;
  description: string;
  chargeType: "Fixed" | "Percentage";
  isActive: boolean;
}

// Props for the LocationManagement component
interface LocationManagementProps {
  onSave?: () => void;
  onCancel?: () => void;
  initialCities?: City[];
  initialGeofences?: Location[];
}

const LocationManagement: React.FC<LocationManagementProps> = ({
  onSave,
  onCancel,
  initialCities = [],
  initialGeofences = [],
}) => {
  // State for enabled/disabled
  const [locationsEnabled, setLocationsEnabled] = useState(true);

  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<
    "add" | "edit" | "view" | "delete"
  >("add");
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [currentSection, setCurrentSection] = useState<"cities" | "geofence">(
    "cities"
  );

  // Selected rows for DataGrid
  const [selectedCityRows, setSelectedCityRows] = useState<string[]>([]);
  const [selectedGeofenceRows, setSelectedGeofenceRows] = useState<string[]>(
    []
  );

  // Notification state
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  // Sample data for cities
  const [cities, setCities] = useState<City[]>(
    initialCities.length > 0
      ? initialCities
      : [
          {
            id: "1",
            name: "Delhi",
            description:
              "This zone is ideal for outdoor activities and gatherings.",
            chargeType: "Fixed",
            isActive: true,
          },
          {
            id: "2",
            name: "Delhi",
            description:
              "This zone is ideal for outdoor activities and gatherings.",
            chargeType: "Fixed",
            isActive: false,
          },
          {
            id: "3",
            name: "Delhi",
            description:
              "This zone is ideal for outdoor activities and gatherings.",
            chargeType: "Fixed",
            isActive: true,
          },
        ]
  );

  // Sample data for geofences
  const [geofences, setGeofences] = useState<Location[]>(
    initialGeofences.length > 0
      ? initialGeofences
      : [
          {
            id: "1",
            name: "Green zone - 1",
            description:
              "This zone is ideal for outdoor activities and gatherings.",
            type: "Geofence",
            createdOn: "Mar 1, 2025",
            isActive: true,
          },
          {
            id: "2",
            name: "Green zone - 1",
            description:
              "This zone is ideal for outdoor activities and gatherings.",
            type: "Percentage",
            createdOn: "Mar 1, 2025",
            isActive: false,
          },
          {
            id: "3",
            name: "Green zone - 1",
            description:
              "This zone is ideal for outdoor activities and gatherings.",
            type: "Fixed",
            createdOn: "Mar 1, 2025",
            isActive: true,
          },
        ]
  );

  // City field definitions for modal
  const cityFields: FieldDefinition[] = [
    {
      id: "name",
      label: "City Name",
      type: "text",
      placeholder: "Enter city name",
      required: true,
    },
    {
      id: "description",
      label: "Description",
      type: "textarea",
      placeholder: "Enter description",
      required: true,
      rows: 3,
    },
    {
      id: "chargeType",
      label: "Charge Type",
      type: "select",
      options: [
        { value: "Fixed", label: "Fixed" },
        { value: "Percentage", label: "Percentage" },
      ],
      required: true,
    },
  ];

  // Geofence field definitions for modal
  const geofenceFields: FieldDefinition[] = [
    {
      id: "name",
      label: "Geofence Name",
      type: "text",
      placeholder: "Enter geofence name",
      required: true,
    },
    {
      id: "description",
      label: "Description",
      type: "textarea",
      placeholder: "Enter description",
      required: true,
      rows: 3,
    },
    {
      id: "type",
      label: "Type",
      type: "select",
      options: [
        { value: "Geofence", label: "Geofence" },
        { value: "Fixed", label: "Fixed" },
        { value: "Percentage", label: "Percentage" },
      ],
      required: true,
    },
  ];

  // Open modal to add or edit a location
  const openModal = (
    mode: "add" | "edit" | "view" | "delete",
    section: "cities" | "geofence",
    item?: any
  ) => {
    setModalMode(mode);
    setCurrentSection(section);
    setSelectedItem(item || null);
    setIsModalOpen(true);
  };

  // Show temporary "Saved" notification (as seen in image 1)
  const showSavedNotification = () => {
    const notification = document.createElement("div");
    notification.className =
      "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center";

    const text = document.createElement("span");
    text.textContent = "Saved";
    notification.appendChild(text);

    const closeBtn = document.createElement("button");
    closeBtn.innerHTML = "✕";
    closeBtn.className = "ml-4 text-white";
    closeBtn.onclick = () => document.body.removeChild(notification);
    notification.appendChild(closeBtn);

    document.body.appendChild(notification);
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 2000);
  };

  // Handle save from modal
  const handleSaveItem = (itemData: any) => {
    if (currentSection === "cities") {
      // Convert modal data to City format
      const newCity: City = {
        id: itemData.id || Date.now().toString(),
        name: itemData.name,
        description: itemData.description,
        chargeType: itemData.chargeType as "Fixed" | "Percentage",
        isActive: itemData.isActive !== undefined ? itemData.isActive : true,
      };

      if (modalMode === "add") {
        setCities([...cities, newCity]);
        setNotificationMessage("New city added successfully!");
      } else if (modalMode === "edit" && selectedItem) {
        setCities(
          cities.map((city) => (city.id === newCity.id ? newCity : city))
        );
        setNotificationMessage("City updated successfully!");
      } else if (modalMode === "delete" && selectedItem) {
        setCities(cities.filter((city) => city.id !== selectedItem.id));
        setNotificationMessage("City deleted successfully!");
      }
    } else {
      // Convert modal data to Geofence format
      const newGeofence: Location = {
        id: itemData.id || Date.now().toString(),
        name: itemData.name,
        description: itemData.description,
        type: itemData.type as "Geofence" | "Fixed" | "Percentage",
        createdOn:
          itemData.createdOn ||
          new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
        isActive: itemData.isActive !== undefined ? itemData.isActive : true,
      };

      if (modalMode === "add") {
        setGeofences([...geofences, newGeofence]);
        setNotificationMessage("New geofence added successfully!");
      } else if (modalMode === "edit" && selectedItem) {
        setGeofences(
          geofences.map((geo) =>
            geo.id === newGeofence.id ? newGeofence : geo
          )
        );
        setNotificationMessage("Geofence updated successfully!");
      } else if (modalMode === "delete" && selectedItem) {
        setGeofences(geofences.filter((geo) => geo.id !== selectedItem.id));
        setNotificationMessage("Geofence deleted successfully!");
      }
    }

    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
    setIsModalOpen(false);

    // Show a saved notification (like in image 1)
    if (modalMode === "edit") {
      showSavedNotification();
    }
  };

  // Toggle item status
  const toggleItemStatus = (id: string, section: "cities" | "geofence") => {
    if (section === "cities") {
      setCities(
        cities.map((city) =>
          city.id === id ? { ...city, isActive: !city.isActive } : city
        )
      );
    } else {
      setGeofences(
        geofences.map((geo) =>
          geo.id === id ? { ...geo, isActive: !geo.isActive } : geo
        )
      );
    }
  };

  // Handle editing item
  const handleEditItem = (row: any, section: "cities" | "geofence") => {
    const item =
      section === "cities"
        ? cities.find((city) => city.id === row.id)
        : geofences.find((geo) => geo.id === row.id);

    if (item) {
      openModal("edit", section, item);
    }
  };

  // Handle deleting item
  const handleDeleteItem = (row: any, section: "cities" | "geofence") => {
    const item =
      section === "cities"
        ? cities.find((city) => city.id === row.id)
        : geofences.find((geo) => geo.id === row.id);

    if (item) {
      openModal("delete", section, item);
    }
  };

  // Define columns for the cities DataGrid
  const cityColumns = [
    { field: "name", headerName: "Name", width: "15%" },
    { field: "description", headerName: "Description", width: "35%" },
    {
      field: "isActive",
      headerName: "Status",
      width: "15%",
      renderCell: (value: boolean) => (
        <span
          className={`px-3 py-1 rounded-full text-sm ${
            value ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
          }`}
        >
          {value ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      field: "chargeType",
      headerName: "Charge Type",
      width: "15%",
    },
    // {
    //   field: "action",
    //   headerName: "Action",
    //   width: "10%",
    //   renderCell: (value: any, row: any) => (
    //     <div className="flex items-center">
    //       <PenSquare
    //         className="w-4 h-4 text-gray-600 mr-3 cursor-pointer"
    //         onClick={() => handleEditItem(row, "cities")}
    //       />
    //     </div>
    //   ),
    // },
    {
      field: "toggle",
      headerName: "",
      width: "10%",
      renderCell: (value: any, row: any) => (
        <ToggleSwitch
          checked={row.isActive}
          onChange={() => toggleItemStatus(row.id, "cities")}
          aria-labelledby={`city-status-${row.id}`}
        />
      ),
    },
  ];

  // Define columns for the geofence DataGrid
  const geofenceColumns = [
    { field: "name", headerName: "Geofence Name", width: "15%" },
    { field: "description", headerName: "Description", width: "30%" },
    {
      field: "type",
      headerName: "Type",
      width: "15%",
      renderCell: (value: string) => (
        <span
          className={`px-3 py-1 rounded-full text-sm ${
            value === "Geofence"
              ? "bg-blue-100 text-blue-800"
              : value === "Fixed"
              ? "bg-blue-100 text-blue-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {value}
        </span>
      ),
    },
    
    { field: "createdOn", headerName: "Created on", width: "15%" },
    // {
    //   field: "action",
    //   headerName: "Action",
    //   width: "10%",
    //   renderCell: (value: any, row: any) => (
    //     <div className="flex items-center">
    //       <PenSquare
    //         className="w-4 h-4 text-gray-600 mr-3 cursor-pointer"
    //         onClick={() => handleEditItem(row, "geofence")}
    //       />
    //     </div>
    //   ),
    // },
    
  ];

  // SelectAll and SelectRow functions
  const handleSelectAllCities = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedCityRows(cities.map((city) => city.id));
    } else {
      setSelectedCityRows([]);
    }
  };

  const handleSelectRowCities = (id: string) => {
    if (selectedCityRows.includes(id)) {
      setSelectedCityRows(selectedCityRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedCityRows([...selectedCityRows, id]);
    }
  };

  const handleSelectAllGeofences = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedGeofenceRows(geofences.map((geo) => geo.id));
    } else {
      setSelectedGeofenceRows([]);
    }
  };

  const handleSelectRowGeofences = (id: string) => {
    if (selectedGeofenceRows.includes(id)) {
      setSelectedGeofenceRows(
        selectedGeofenceRows.filter((rowId) => rowId !== id)
      );
    } else {
      setSelectedGeofenceRows([...selectedGeofenceRows, id]);
    }
  };

  // Get title for modal based on mode and section
  const getModalTitle = () => {
    const itemType = currentSection === "cities" ? "City" : "Geofence";

    switch (modalMode) {
      case "add":
        return `Add New ${itemType}`;
      case "edit":
        return `Edit ${itemType}`;
      case "view":
        return `View ${itemType} Details`;
      case "delete":
        return `Delete ${itemType}`;
      default:
        return itemType;
    }
  };

  // This function is no longer needed as we're rendering the map directly in the modal
  // Keeping it as a comment for reference
  /*
  const MapComponent = () => (
    <div className="mt-4 border rounded-md overflow-hidden" style={{ height: '400px' }}>
      <div className="w-full h-full bg-gray-100 relative">
        <div 
          className="absolute" 
          style={{
            top: '50%',
            left: '70%',
            width: '200px',
            height: '150px',
            background: 'rgba(138, 43, 226, 0.3)',
            border: '2px solid rgba(138, 43, 226, 0.7)',
            transform: 'translate(-50%, -50%)',
            zIndex: 10
          }}
        ></div>
        
        <img 
          src="/api/placeholder/1200/400" 
          alt="Map for geofence selection" 
          className="w-full h-full object-cover"
          style={{ opacity: 0.9 }}
        />
      </div>
    </div>
  );
  */

  return (
    <div className="max-w-3xl rounded-custom12px p-6 md:p-0 sm:p-0 lg:p-0 xl:p-0 sm:max-h-full md:max-h-full lg:max-h-full xl:max-h-full max-h-[80vh] overflow-y-auto sm:overflow-visible md:overflow-visible lg:overflow-visible xl:overflow-visible">
      {/* Header */}
      <div className="flex justify-between items-center p-4 ">
        <h1 className="text-[14px] font-inter font-[600] text-headding-color">
          Location
        </h1>
      </div>

      {/* Main content */}
      <div className="p-6 md:p-0 sm:p-0 lg:p-0 xl:p-0">
        {/* Geofence Section */}
        <div className="bg-backgroundWhite p-5 rounded-custom12px">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[14px] font-inter font-[500] text-textHeading">
              Geofence Settings
            </h2>
            <button
              onClick={() => openModal("add", "geofence")}
              className="px-4 py-2 text-[12px] font-inter font-[600] bg-backgroundWhite border border-reloadBorder rounded-custom"
            >
              Add New
            </button>
          </div>
          <p className="text-[12px] font-inter font-[500] text-cardTitle mb-4">
            Define virtual boundaries within a city for location-based services.
          </p>

          <div className="overflow-x-auto">
            <CustomDataGrid
              columns={geofenceColumns}
              rows={geofences}
              selectedRows={selectedGeofenceRows}
              onSelectAll={handleSelectAllGeofences}
              onSelectRow={handleSelectRowGeofences}
              searchPlaceholder="Search geofences"
              hideToolbar={false}
              showActionColumn={true}
              onEdit={(row) => handleEditItem(row, "geofence")}
              onDelete={(row) => handleDeleteItem(row, "geofence")}
            />
          </div>
        </div>
        {/* Cities Section */}
        <div className="mt-8 bg-backgroundWhite p-5 rounded-custom12px">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[14px] font-inter font-[500] text-paragraphBlack">
              Manage Cities
            </h2>
            <button
              onClick={() => openModal("add", "cities")}
              className="px-4 py-2 text-[12px] font-inter font-[600] bg-backgroundWhite border border-reloadBorder rounded-custom"
            >
              Add New
            </button>
          </div>
          <p className="text-[12px] font-inter font-[500] text-cardTitle mb-4">
            Add, edit, and manage cities for your platform.
          </p>

          <div className="overflow-x-auto">
            <CustomDataGrid
              columns={cityColumns}
              rows={cities}
              selectedRows={selectedCityRows}
              onSelectAll={handleSelectAllCities}
              onSelectRow={handleSelectRowCities}
              searchPlaceholder="Search cities"
              hideToolbar={false}
              showActionColumn={true}
              onEdit={(row) => handleEditItem(row, "cities")}
              onDelete={(row) => handleDeleteItem(row, "cities")}
            />
          </div>
        </div>
      </div>

      {/* Full-width Modal for Geofence operations */}
      {isModalOpen &&
        currentSection === "geofence" &&
        modalMode !== "delete" && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-white">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h2 className="text-xl font-medium text-gray-800">
                {getModalTitle()}
              </h2>
              <div className="flex gap-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-[12px] font-inter font-[600] text-cardValue bg-backgroundWhite"
                >
                  Discard
                </button>
                <button
                  onClick={() => {
                    const nameInput = document.getElementById(
                      "geofence-name"
                    ) as HTMLInputElement;
                    const descriptionInput = document.getElementById(
                      "geofence-description"
                    ) as HTMLInputElement;
                    const typeSelect = document.getElementById(
                      "geofence-type"
                    ) as HTMLSelectElement;

                    const newGeofence = {
                      id: selectedItem?.id || Date.now().toString(),
                      name: nameInput?.value || "New Geofence",
                      description: descriptionInput?.value || "",
                      type:
                        (typeSelect?.value as
                          | "Geofence"
                          | "Fixed"
                          | "Percentage") || "Geofence",
                      createdOn:
                        selectedItem?.createdOn ||
                        new Date().toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }),
                      isActive:
                        selectedItem?.isActive !== undefined
                          ? selectedItem.isActive
                          : true,
                    };
                    handleSaveItem(newGeofence);
                  }}
                  className="px-4 py-2 text-[12px] font-inter font-[600] text-whiteColor border boder-btnBorder bg-bgButton rounded-custom"
                >
                  Save
                </button>
              </div>
            </div>

            <div className="p-6">
              <p className="text-[12px] font-inter font-[500] text-cardTitle mb-6">
                Define virtual boundaries within a city for location-based
                services.
              </p>

              <div className="grid grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-[12px] font-inter font-[500] text-paragraphBlack  mb-1">
                    Geofence Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="geofence-name"
                    type="text"
                    className="w-full px-3 py-4 border borde-reloadBorder font-inter placeholder:text-reloadBorder placeholder:text-[14px] placeholder:font-[400] rounded-custom8px text-reloadBorder"
                    placeholder="Green zone - 1"
                    defaultValue={selectedItem?.name || ""}
                    required
                  />
                </div>

                <div>
                  <label className="block text-[12px] font-inter font-[500] text-paragraphBlack mb-1">
                    Description
                  </label>
                  <input
                    id="geofence-description"
                    type="text"
                    className="w-full px-3 py-4 border borde-reloadBorder font-inter placeholder:text-reloadBorder placeholder:text-[14px] placeholder:font-[400] rounded-custom8px text-reloadBorder"
                    placeholder="This zone is ideal for outdoor activities and gatherings, providing a safe space for families and friends to enjoy..."
                    defaultValue={selectedItem?.description || ""}
                  />
                </div>

                <div>
                  <label className="block text-[12px] font-inter font-[500] text-paragraphBlack mb-1">
                    Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="geofence-type"
                    className="w-full px-3 py-4 border borde-reloadBorder font-inter placeholder:text-reloadBorder placeholder:text-[14px] placeholder:font-[400] rounded-custom8px text-reloadBorder appearance-none bg-white"
                    defaultValue={selectedItem?.type || "Geofence"}
                    required
                  >
                    <option value="Geofence">Geofence</option>
                    <option value="Fixed">Fixed</option>
                    <option value="Percentage">Percentage</option>
                    
                  </select>
                 
                </div>
              </div>

              {/* Map Component that takes up the full width */}
              <div
                className="border rounded-md overflow-hidden"
                style={{ height: "calc(100vh - 300px)", minHeight: "500px" }}
              >
                <div className="w-full h-full bg-gray-100 relative">
                  {/* The purple overlay shape as seen in the image */}
                  <div
                    className="absolute"
                    style={{
                      top: "60%",
                      left: "70%",
                      width: "200px",
                      height: "150px",
                      background: "rgba(138, 43, 226, 0.3)",
                      border: "2px solid rgba(138, 43, 226, 0.7)",
                      transform: "translate(-50%, -50%)",
                      zIndex: 10,
                    }}
                  ></div>

                  {/* Map placeholder - in a real implementation, this would be replaced with an actual map component */}
                  <img
                    src="/api/placeholder/1600/800"
                    alt="Map for geofence selection"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

      {/* Regular Modal for Cities and Delete operations */}
      {isModalOpen &&
        (currentSection !== "geofence" || modalMode === "delete") && (
          <CustomModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            mode={modalMode}
            fields={
              modalMode !== "delete"
                ? currentSection === "cities"
                  ? cityFields
                  : geofenceFields
                : []
            }
            item={
              selectedItem
                ? {
                    ...selectedItem,
                    isActive: selectedItem.isActive,
                  }
                : undefined
            }
            onSave={handleSaveItem}
            title={getModalTitle()}
            subtitle={
              modalMode === "delete"
                ? `Are you sure you want to delete ${selectedItem?.name}?`
                : undefined
            }
            size="md"
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
                This action cannot be undone. This will permanently delete the{" "}
                {currentSection === "cities" ? "city" : "geofence"}
                <span className="font-medium"> {selectedItem?.name}</span> and
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

export default LocationManagement;
