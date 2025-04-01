import React, { useState, useEffect } from "react";
import { ChevronDown, Plus, Check, X } from "lucide-react";
import CustomDataGrid from "../common/datagrid";
import CustomModal, { FieldDefinition } from "../common/modals";
import StatCard from "../common/statCard";

interface Store {
  id: string;
  storeId: string;
  name: string;
  address: string;
  rating: number;
  status: "Active" | "Inactive";
}

const Stores: React.FC = () => {
  // State management
  const [stores, setStores] = useState<Store[]>([]);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [paginatedData, setPaginatedData] = useState<Store[]>([]);
  const [density, setDensity] = useState<
      "compact" | "standard" | "comfortable"
    >("standard");
  // Sample data initialization
  useEffect(() => {
    const mockStores: Store[] = [
      {
        id: "1",
        storeId: "#20345",
        name: "Queenstown Public House",
        address: "6391 Elgin St. Celina, Delaware 10299",
        rating: 4.21,
        status: "Active",
      },
      {
        id: "2",
        storeId: "#20345",
        name: "Plumed Horse",
        address: "8502 Preston Rd. Inglewood, Maine 98380",
        rating: 4.21,
        status: "Active",
      },
      {
        id: "3",
        storeId: "#20345",
        name: "King Lee's",
        address: "3517 W. Gray St. Utica, Pennsylvania 57867",
        rating: 4.21,
        status: "Active",
      },
      {
        id: "4",
        storeId: "#20345",
        name: "Marina Kitchen",
        address: "4140 Parker Rd. Allentown, New Mexico 31134",
        rating: 4.21,
        status: "Active",
      },
      {
        id: "5",
        storeId: "#20345",
        name: "The Aviary",
        address: "4517 Washington Ave. Manchester, Kentucky 39495",
        rating: 4.21,
        status: "Active",
      },
      {
        id: "6",
        storeId: "#20345",
        name: "Crab Hut",
        address: "2715 Ash Dr. San Jose, South Dakota 83475",
        rating: 4.21,
        status: "Active",
      },
      {
        id: "7",
        storeId: "#20345",
        name: "Brass Tacks",
        address: "2972 Westheimer Rd. Santa Ana, Illinois 85486",
        rating: 4.21,
        status: "Active",
      },
      {
        id: "8",
        storeId: "#20345",
        name: "Bean Around the World Coffees",
        address: "2715 Ash Dr. San Jose, South Dakota 83475",
        rating: 4.21,
        status: "Active",
      },
      {
        id: "9",
        storeId: "#20345",
        name: "Chewy Balls",
        address: "1901 Thornridge Cir. Shiloh, Hawaii 81063",
        rating: 4.21,
        status: "Active",
      },
      {
        id: "10",
        storeId: "#20345",
        name: "Proxi",
        address: "2118 Thornridge Cir. Syracuse, Connecticut 35624",
        rating: 4.21,
        status: "Active",
      },
    ];
    setStores(mockStores);
    setPaginatedData(mockStores);
  }, []);

  // Define Column type to match your CustomDataGrid expectations
  interface Column {
    field: string;
    headerName: string;
    width: string;
    renderCell?: (value: any, row: any) => React.ReactNode;
  }

  // DataGrid column definitions
  const columns: Column[] = [
    {
      field: "storeId",
      headerName: "Store ID",
      width: "120px",
      renderCell: (value, row) => (
        <div className="flex items-center">
          {value}
          <button className="ml-2">
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
                d="M4.23431 5.83432C4.54673 5.5219 5.05327 5.5219 5.36569 5.83432L8 8.46864L10.6343 5.83432C10.9467 5.5219 11.4533 5.5219 11.7657 5.83432C12.0781 6.14674 12.0781 6.65327 11.7657 6.96569L8.56569 10.1657C8.25327 10.4781 7.74673 10.4781 7.43431 10.1657L4.23431 6.96569C3.9219 6.65327 3.9219 6.14674 4.23431 5.83432Z"
                fill="#2B2B2B"
              />
            </svg>
          </button>
        </div>
      ),
    },
    {
      field: "name",
      headerName: "Store",
      width: "250px",
    },
    {
      field: "status",
      headerName: "Status",
      width: "120px",
      renderCell: (value, row) => (
        <div className="flex items-center space-x-2">
          <button className="p-1 rounded-custom border border-borderCrossIcon bg-bgCrossIcon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="14"
              viewBox="0 0 15 14"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3.50501 3.00501C3.77838 2.73165 4.2216 2.73165 4.49496 3.00501L7.49999 6.01004L10.505 3.00501C10.7784 2.73165 11.2216 2.73165 11.495 3.00501C11.7683 3.27838 11.7683 3.7216 11.495 3.99496L8.48994 6.99999L11.495 10.005C11.7683 10.2784 11.7683 10.7216 11.495 10.995C11.2216 11.2683 10.7784 11.2683 10.505 10.995L7.49999 7.98994L4.49496 10.995C4.2216 11.2683 3.77838 11.2683 3.50501 10.995C3.23165 10.7216 3.23165 10.2784 3.50501 10.005L6.51004 6.99999L3.50501 3.99496C3.23165 3.7216 3.23165 3.27838 3.50501 3.00501Z"
                fill="#620E0E"
              />
            </svg>
          </button>
          <button className="p-1 rounded-custom border border-borderGreeen bg-customBackgroundColor">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="14"
              viewBox="0 0 15 14"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12.1949 3.70503C12.4683 3.97839 12.4683 4.42161 12.1949 4.69497L6.59495 10.295C6.32158 10.5683 5.87837 10.5683 5.605 10.295L2.805 7.49497C2.53163 7.22161 2.53163 6.77839 2.805 6.50503C3.07837 6.23166 3.52158 6.23166 3.79495 6.50503L6.09998 8.81005L11.205 3.70503C11.4784 3.43166 11.9216 3.43166 12.1949 3.70503Z"
                fill="#125E1B"
              />
            </svg>
          </button>
        </div>
      ),
    },
    {
      field: "address",
      headerName: "Store Address",
      width: "400px",
    },
    {
      field: "rating",
      headerName: "Rating",
      width: "120px",
      renderCell: (value, row) => (
        <div className="flex items-center">
          <span className="text-yellow-500 mr-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="16"
              viewBox="0 0 17 16"
              fill="none"
            >
              <path
                d="M7.88206 3.14165C8.12154 2.4046 9.16427 2.40461 9.40375 3.14165L10.2594 5.77509C10.3665 6.10471 10.6737 6.32788 11.0203 6.32788H13.7892C14.5642 6.32788 14.8864 7.31957 14.2594 7.77509L12.0193 9.40265C11.7389 9.60636 11.6216 9.96745 11.7287 10.2971L12.5843 12.9305C12.8238 13.6676 11.9802 14.2805 11.3533 13.8249L9.11314 12.1974C8.83275 11.9937 8.45307 11.9937 8.17268 12.1974L5.93254 13.8249C5.30557 14.2805 4.46199 13.6676 4.70147 12.9305L5.55713 10.2971C5.66423 9.96745 5.5469 9.60636 5.26651 9.40265L3.02637 7.77509C2.3994 7.31957 2.72162 6.32788 3.4966 6.32788H6.26556C6.61214 6.32788 6.91931 6.10471 7.02641 5.77509L7.88206 3.14165Z"
                fill="#125E1B"
              />
            </svg>
          </span>
          {value}
        </div>
      ),
    },
    {
      field: "activeStatus",
      headerName: "Status",
      width: "120px",
      renderCell: (value, row) => (
        <div className="px-3 py-1 rounded-custom4px bg-bgActive text-customWhiteColor font[12px] font-[600] font-inter text-center">
          {row.status}
        </div>
      ),
    },
  ];

  // Modal field definitions
  const modalFields: FieldDefinition[] = [
    { id: "name", label: "Store Name", type: "text", required: true },
    { id: "address", label: "Store Address", type: "text", required: true },
    {
      id: "status",
      label: "Status",
      type: "select",
      options: [
        { value: "Active", label: "Active" },
        { value: "Inactive", label: "Inactive" },
      ],
      required: true,
    },
  ];

  // Event handlers
  const handleSelectRow = (id: string) => {
    setSelectedRows((prev) => {
      if (prev.includes(id)) {
        return prev.filter((rowId) => rowId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isSelected = event.target.checked;
    if (isSelected) {
      setSelectedRows(stores.map((store) => store.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleAddStore = () => {
    setModalMode("add");
    setIsModalOpen(true);
  };

  const handleSave = (data: any) => {
    if (modalMode === "add") {
      const newStore: Store = {
        id: Math.random().toString(36).substr(2, 9),
        storeId: `#${Math.floor(10000 + Math.random() * 90000)}`,
        name: data.name,
        address: data.address,
        rating: 0,
        status: data.status as "Active" | "Inactive",
      };
      setStores((prev) => [...prev, newStore]);
      setPaginatedData((prev) => [...prev, newStore]);
    } else {
      // Handle edit functionality if needed
    }
    setIsModalOpen(false);
  };

  return (
    <div className="p-0 max-w-full rounded-lg p-1 md:p-6 lg:p-6 xl:p-6 sm:max-h-full md:max-h-full lg:max-h-full xl:max-h-full max-h-[80vh] overflow-y-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 px-8 pt-8">
        <h1 className="text-[20px] font-inter font-[600] text-cardValue">
          Stores
        </h1>
        <div className="flex space-x-2 relative">
          {/* More actions dropdown */}
          <div className="relative">
            <button
              className="bg-backgroundWhite rounded-custom px-4 py-2 flex items-center text-menuSubHeadingColor font-inter font-[12px] font-[500] border border-reloadBorder shadow-sm"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              More actions
              <div className="ml-2">
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
                    d="M3.70503 5.10503C3.97839 4.83166 4.42161 4.83166 4.69497 5.10503L7 7.41005L9.30503 5.10503C9.57839 4.83166 10.0216 4.83166 10.295 5.10503C10.5683 5.37839 10.5683 5.82161 10.295 6.09498L7.49497 8.89498C7.22161 9.16834 6.77839 9.16834 6.50503 8.89498L3.70503 6.09498C3.43166 5.82161 3.43166 5.37839 3.70503 5.10503Z"
                    fill="#636363"
                  />
                </svg>
              </div>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 left- top-12 bg-white shadow-lg rounded-custom border border-reloadBorder w-43 z-10">
                <div className="py-1">
                  <a
                    href="#"
                    className="block px-4 py-2 text-menuSubHeadingColor font-inter font-[12px] font-[500] "
                  >
                    Import stores
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-menuSubHeadingColor font-inter font-[12px] font-[500] "
                  >
                    Create new view
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-menuSubHeadingColor font-inter font-[12px] font-[500] "
                  >
                    Hide analytics
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Add store button */}
          <button
            className="bg-bgButton text-whiteColor font-inter font-[12px] font-[600] border border-btnBorder rounded-md px-4 py-2 flex items-center shadow-sm"
            onClick={handleAddStore}
          >
            {/* <Plus size={16} className="mr-1" /> */}
            Add store
            <div className="ml-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M7.00004 2.33334V11.6667M11.6667 7L2.33337 7"
                  stroke="#D9D9D9"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </button>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-3 md:grid-cols-6 sm:grid-cols-6 lg:grid-cols-6 xl:grid-cols-6 gap-2 mb-6 px-8">
        <StatCard
          value="213"
          description="Active Store"
          descriptionFirst={true}
        />
        <StatCard
          value="245"
          description="Inactive Stores"
          descriptionFirst={true}
        />
        <StatCard
          value="111"
          description="Open Stores"
          descriptionFirst={true}
        />
        <StatCard
          value="164"
          description="Closed Store"
          descriptionFirst={true}
        />
        <StatCard value="164" description="Verified" descriptionFirst={true} />
        <StatCard value="50" description="Customers per month" />
      </div>

      {/* Data grid section */}
      <div className="px-8 pb-8 overflow-x-auto">
        <CustomDataGrid
          rows={paginatedData}
          columns={columns}
          selectedRows={selectedRows}
          onSelectRow={handleSelectRow}
          onSelectAll={handleSelectAll}
          searchPlaceholder="Search store"
          hideToolbar={false}
          densityFirst={true} // Change to false if you want export button before density

          densityOptions={{
            currentDensity: density,
            onDensityChange: (newDensity) => {
              setDensity(newDensity);
              // Apply any density-related styling changes here if needed
            },
          }}
        />
      </div>

      {/* Modal */}
      {isModalOpen && (
        <CustomModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          mode={modalMode}
          onSave={handleSave}
          title={modalMode === "add" ? "Add Store" : "Edit Store"}
          fields={modalFields}
          size="md"
          showToggle={false}
          confirmText={modalMode === "add" ? "Add" : "Save"}
        />
      )}
    </div>
  );
};

export default Stores;
