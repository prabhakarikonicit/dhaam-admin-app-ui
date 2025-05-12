import React, { useState } from "react";
import { PenSquare, Trash2 } from "lucide-react";
import CustomDataGrid from "../../../common/datagrid";
import ToggleSwitch from "../../../common/toggleSwitch";
import CustomModal, { FieldDefinition } from "../../../common/modals";

import LoctionImg from "../../../../lib/Images/location.png";

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
            description: "This zone is i...",
            chargeType: "Fixed",
            isActive: true,
          },
          {
            id: "2",
            name: "Delhi",
            description: "This zone is i...",
            chargeType: "Fixed",
            isActive: false,
          },
          {
            id: "3",
            name: "Delhi",
            description: "This zone is i...",
            chargeType: "Fixed",
            isActive: true,
          },
          {
            id: "4",
            name: "Delhi",
            description: "This zone is i...",
            chargeType: "Fixed",
            isActive: true,
          },
          {
            id: "5",
            name: "Delhi",
            description: "This zone is i...",
            chargeType: "Fixed",
            isActive: true,
          },
          {
            id: "6",
            name: "Delhi",
            description: "This zone is i...",
            chargeType: "Fixed",
            isActive: true,
          },
          {
            id: "7",
            name: "Delhi",
            description: "This zone is i...",
            chargeType: "Fixed",
            isActive: true,
          },
          {
            id: "8",
            name: "Delhi",
            description: "This zone is i...",
            chargeType: "Fixed",
            isActive: true,
          },
          {
            id: "9",
            name: "Delhi",
            description: "This zone is i...",
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
            description: "This zone is i...",
            type: "Geofence",
            createdOn: "Mar 1, 2025",
            isActive: true,
          },
          {
            id: "2",
            name: "Green zone - 1",
            description: "This zone is i...",
            type: "Percentage",
            createdOn: "Mar 1, 2025",
            isActive: false,
          },
          {
            id: "3",
            name: "Green zone - 1",
            description: "This zone is i...",
            type: "Fixed",
            createdOn: "Mar 1, 2025",
            isActive: true,
          },
          {
            id: "4",
            name: "Green zone - 1",
            description: "This zone is i...",
            type: "Percentage",
            createdOn: "Mar 1, 2025",
            isActive: true,
          },
          {
            id: "5",
            name: "Green zone - 1",
            description: "This zone is i...",
            type: "Fixed",
            createdOn: "Mar 1, 2025",
            isActive: true,
          },
          {
            id: "6",
            name: "Green zone - 1",
            description: "This zone is i...",
            type: "Percentage",
            createdOn: "Mar 1, 2025",
            isActive: true,
          },
          {
            id: "7",
            name: "Green zone - 1",
            description: "This zone is i...",
            type: "Fixed",
            createdOn: "Mar 1, 2025",
            isActive: true,
          },
          {
            id: "8",
            name: "Green zone - 1",
            description: "This zone is i...",
            type: "Percentage",
            createdOn: "Mar 1, 2025",
            isActive: true,
          },
          {
            id: "9",
            name: "Green zone - 1",
            description: "This zone is i...",
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
      type: "text",
      placeholder: "Enter description",
      required: true,
      rows: 3,
    },
    {
      id: "Assign Geofence",
      label: "Assign Geofence",
      type: "select",
      options: [
        { value: "Fixed", label: "Fixed" },
        { value: "Percentage", label: "Percentage" },
      ],
      required: true,
      rows: 1,
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
    console.log(`Toggling ${section} item with ID: ${id}`);

    if (section === "cities") {
      setCities((prevCities) =>
        prevCities.map((city) => {
          if (city.id === id) {
            console.log(
              `Toggling city ${city.name} from ${
                city.isActive
              } to ${!city.isActive}`
            );
            return { ...city, isActive: !city.isActive };
          }
          return city;
        })
      );
    } else {
      setGeofences((prevGeofences) =>
        prevGeofences.map((geo) => {
          if (geo.id === id) {
            console.log(
              `Toggling geofence ${geo.name} from ${
                geo.isActive
              } to ${!geo.isActive}`
            );
            return { ...geo, isActive: !geo.isActive };
          }
          return geo;
        })
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
    {
      field: "name",
      headerName: "Name",
      width: "5%",
      renderCell: (value: string, row: string) => (
        <div className="font-inter font-[500] text-[12px] text-cardValue text-whitespace-nowrap overflow-hidden text-ellipsis">
          {value}
        </div>
      ),
    },
    {
      field: "description",
      headerName: "Description",
      width: "28%",
      renderCell: (value: string, row: string) => (
        <div className="font-inter font-[500] text-[12px] text-cardValue text-whitespace-nowrap overflow-hidden text-ellipsis">
          {value}
        </div>
      ),
    },
    {
      field: "isActive",
      headerName: "Status",
      width: "25%",
      renderCell: (value: boolean) => (
        <span
          className={`px-3 py-1 rounded-custom80px text-[12px] font-inter ${
            value
              ? "bg-customBackgroundColor text-green"
              : "bg-primary text-primary"
          }`}
        >
          {value ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      field: "chargeType",
      headerName: "Charge Type",
      width: "20%",
      renderCell: (value: string, row: string) => (
        <div className="font-inter font-[500] text-[12px] text-cardValue text-whitespace-nowrap overflow-hidden text-ellipsis">
          {value}
        </div>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      width: "10%",
      renderCell: (value: any, row: any) => (
        <div
          className="flex items-center"
          onClick={() => handleEditItem(row, "cities")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M13.931 2.06863C13.3061 1.44379 12.2931 1.44379 11.6682 2.06863L5.59961 8.13726V10.4H7.86235L13.931 4.33137C14.5558 3.70653 14.5558 2.69347 13.931 2.06863Z"
              fill="#2B2B2B"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M1.59961 4.8C1.59961 3.91634 2.31595 3.2 3.19961 3.2H6.39961C6.84144 3.2 7.19961 3.55817 7.19961 4C7.19961 4.44183 6.84144 4.8 6.39961 4.8H3.19961V12.8H11.1996V9.6C11.1996 9.15817 11.5578 8.8 11.9996 8.8C12.4414 8.8 12.7996 9.15817 12.7996 9.6V12.8C12.7996 13.6837 12.0833 14.4 11.1996 14.4H3.19961C2.31595 14.4 1.59961 13.6837 1.59961 12.8V4.8Z"
              fill="#2B2B2B"
            />
          </svg>
          {/* <PenSquare
            className="w-4 h-4 text-gray-600 mr-3 cursor-pointer"
            onClick={() => handleEditItem(row, "cities")}
          /> */}
        </div>
      ),
    },
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
    {
      field: "name",
      headerName: "Geofence Name",
      width: "20%",
      renderCell: (value: string, row: string) => (
        <div className="font-inter font-[500] text-[12px] text-cardValue text-whitespace-nowrap overflow-hidden text-ellipsis">
          {value}
        </div>
      ),
    },
    { field: "description", headerName: "Description", width: "25%" },
    {
      field: "type",
      headerName: "Type",
      width: "15%",
      renderCell: (value: string) => (
        <span
          className={`px-3 py-2 rounded-custom80px text-[12px] font-inter font-[500] ${
            value === "Geofence"
              ? "bg-primary text-primary"
              : value === "Fixed"
              ? "bg-primary text-primary"
              : "bg-customWhiteColor text-green"
          }`}
        >
          {value}
        </span>
      ),
    },

    {
      field: "createdOn",
      headerName: "Created on",
      width: "15%",
      renderCell: (value: string, row: string) => (
        <div className="font-inter font-[500] text-[12px] text-cardValue text-whitespace-nowrap overflow-hidden text-ellipsis">
          {value}
        </div>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      width: "20%", // Increased width to accommodate both toggle and edit icon
      renderCell: (value: any, row: any) => (
        <div className="flex items-center justify-between w-full">
          <div onClick={() => handleEditItem(row, "geofence")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M13.931 2.06863C13.3061 1.44379 12.2931 1.44379 11.6682 2.06863L5.59961 8.13726V10.4H7.86235L13.931 4.33137C14.5558 3.70653 14.5558 2.69347 13.931 2.06863Z"
                fill="#2B2B2B"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M1.59961 4.8C1.59961 3.91634 2.31595 3.2 3.19961 3.2H6.39961C6.84144 3.2 7.19961 3.55817 7.19961 4C7.19961 4.44183 6.84144 4.8 6.39961 4.8H3.19961V12.8H11.1996V9.6C11.1996 9.15817 11.5578 8.8 11.9996 8.8C12.4414 8.8 12.7996 9.15817 12.7996 9.6V12.8C12.7996 13.6837 12.0833 14.4 11.1996 14.4H3.19961C2.31595 14.4 1.59961 13.6837 1.59961 12.8V4.8Z"
                fill="#2B2B2B"
              />
            </svg>
            {/* <PenSquare
              className="w-4 h-4 text-gray-600 mr-3 cursor-pointer"
              onClick={() => handleEditItem(row, "geofence")}
            /> */}
          </div>
          <div>
            <ToggleSwitch
              checked={row.isActive}
              onChange={() => toggleItemStatus(row.id, "geofence")}
              aria-labelledby={`geofence-status-${row.id}`}
            />
          </div>
        </div>
      ),
    },
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
    <div className="max-w-full rounded-custom12px p-1 md:p-0 sm:p-0 lg:p-0 xl:p-0 sm:max-h-full md:max-h-full lg:max-h-full xl:max-h-full max-h-[75vh] overflow-y-auto sm:overflow-visible md:overflow-visible lg:overflow-visible xl:overflow-visible">
      {/* Header */}
      <div className="flex justify-between items-center p-4 mt-0 sm:mt-6 md:mt-7 -ms-4">
        <h1 className="text-[14px] font-inter font-[600] text-headding-color">
          Location
        </h1>
      </div>

      {/* Main content */}
      <div className="p-1 md:p-0 sm:p-0 lg:p-0 xl:p-0">
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
              // showActionColumn={true}
              onEdit={(row) => handleEditItem(row, "geofence")}
              showCheckboxes={false}
              // onDelete={(row) => handleDeleteItem(row, "geofence")}
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
              // showActionColumn={true}
              onEdit={(row) => handleEditItem(row, "cities")}
              // onDelete={(row) => handleDeleteItem(row, "cities")}
              showCheckboxes={false}
            />
          </div>
        </div>
      </div>

      {/* Full-width Modal for Geofence operations */}
      {isModalOpen &&
        currentSection === "geofence" &&
        modalMode !== "delete" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto " style={{ 
            scrollbarWidth: 'thin',
            scrollbarColor: '#d1d5db transparent'
          }}>
            <div className="bg-white w-full rounded-lg shadow-lg m-4 overflow-hidden mt-44 md:mt-28 sm:mt-28 lg:mt-28 xl:mt-28">
              <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <h2 className="text-[16px] font-[600] font-inter text-black">
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
                    className="px-4 py-2 text-[12px] font-inter font-[600] text-whiteColor bg-bgButton border boder-btnBorder rounded-custom"
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div>
                    <label className="block text-[12px] font-inter font-[500] text-paragraphBlack mb-1">
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
                    <div className="relative font-inter">
                      <select
                        id="geofence-type"
                        className="w-full px-3 py-4 border borde-reloadBorder text-[12px] font-inter placeholder:text-reloadBorder placeholder:text-[14px] placeholder:font-[400] rounded-custom8px text-black appearance-none bg-white pr-10"
                        defaultValue={selectedItem?.type || "Geofence"}
                        required
                      >
                        <option
                          value="Geofence"
                          className="text-[12px] font-inter"
                        >
                          Geofence
                        </option>
                        <option
                          value="Fixed"
                          className="text-[12px] font-inter"
                        >
                          Fixed
                        </option>
                        <option
                          value="Percentage"
                          className="text-[12px] font-inter"
                        >
                          Percentage
                        </option>
                      </select>

                      {/* Tightly stacked up/down arrows */}
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex flex-col items-center justify-center px-2 text-gray-700 h-full space-y-0">
                        <svg
                          className="fill-current h-5 w-5 -mb-3" // Negative margin bottom
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M5.293 7.293l1.414 1.414L10 5.414l3.293 3.293 1.414-1.414L10 2.586l-4.707 4.707z" />
                        </svg>
                        <svg
                          className="fill-current h-5 w-5 -mt-0.5" // Negative margin top
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M14.707 12.707l-1.414-1.414L10 14.586l-3.293-3.293-1.414 1.414L10 17.414l4.707-4.707z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Map Component that takes up the full width */}
                <div
                  className="border rounded-md overflow-hidden"
                  style={{ height: "calc(100vh - 400px)", minHeight: "400px" }}
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
                      src={LoctionImg}
                      alt="Map for geofence selection"
                      className="w-full h-full object-cover"
                    />
                  </div>
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
            formLayout="custom"
            gridColumns={2}
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
            {modalMode === "delete" ? (
              <p className="text-gray-600">
                This action cannot be undone. This will permanently delete the{" "}
                {currentSection === "cities" ? "city" : "geofence"}
                <span className="font-medium"> {selectedItem?.name}</span> and
                remove all associated data.
              </p>
            ) : currentSection === "cities" &&
              (modalMode === "add" || modalMode === "edit") ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[12px] font-inter font-[500] text-paragraphBlack mb-1">
                      Name
                    </label>
                    <input
                      id="city-name"
                      type="text"
                      className="w-full px-3 py-4 border border-reloadBorder font-inter placeholder:text-reloadBorder placeholder:text-[14px] placeholder:font-[400] rounded-custom8px text-reloadBorder"
                      placeholder="Enter Name"
                      defaultValue={selectedItem?.name || ""}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-inter font-[500] text-paragraphBlack mb-1">
                      Description
                    </label>
                    <input
                      id="city-description"
                      type="text"
                      className="w-full px-3 py-4 border border-reloadBorder font-inter placeholder:text-reloadBorder placeholder:text-[14px] placeholder:font-[400] rounded-custom8px text-reloadBorder"
                      placeholder="Enter Description"
                      defaultValue={selectedItem?.description || ""}
                    />
                  </div>
                </div>

                <div className="w-full">
                  <label className="block text-[12px] font-inter font-[500] text-paragraphBlack mb-1">
                    Assign Geofence*
                  </label>
                  <div className="relative font-inter">
                    <select
                      id="city-geofence"
                      className="w-full px-3 py-4 border border-reloadBorder text-[12px] text-reloadBorder font-inter placeholder:text-reloadBorder placeholder:text-[14px] placeholder:font-[400] rounded-custom8px text-black appearance-none bg-white pr-10"
                      defaultValue=""
                      required
                    >
                      <option
                        value=""
                        disabled
                        className="text-[12px] font-inter font-[500] text-paragraphBlack"
                      >
                        Select
                      </option>
                      <option
                        value="Fixed"
                        className="text-[12px] font-inter font-[500] text-paragraphBlack"
                      >
                        Fixed
                      </option>
                      <option
                        value="Percentage"
                        className="text-[12px] font-inter font-[500] text-paragraphBlack"
                      >
                        Percentage
                      </option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="border border-reloadBorder rounded-custom10px p-3 pb-5 divide-y divide-gray-30">
                  <div className="py-3">
                    {" "}
                    {/* Added py-3 for vertical padding */}
                    <label className="flex items-center text-sm">
                      <div className="flex-1">
                        <span className="text-[12px] font-inter font-[500] text-textHeading">
                          Enable this toggle to define Delivery Charges for
                          Order at City Level
                        </span>
                      </div>
                      <div>
                        <ToggleSwitch
                          checked={false}
                          onChange={() => {}}
                          aria-labelledby="delivery-charges-toggle"
                        />
                      </div>
                    </label>
                  </div>

                  <div className="pt-4 pb-3">
                    {" "}
                    {/* Added pt-4 and pb-3 for vertical padding */}
                    <label className="flex items-center text-sm">
                      <div className="flex-1">
                        <span className="text-[12px] font-inter font-[500] text-textHeading">
                          Enable this toggle to define Delivery for Custom Order
                          at City Level
                        </span>
                      </div>
                      <div>
                        <ToggleSwitch
                          checked={false}
                          onChange={() => {}}
                          aria-labelledby="custom-order-toggle"
                        />
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            ) : null}
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
              {/* ✕ */}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationManagement;
