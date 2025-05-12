import React, { useState, useEffect, useRef } from "react";
import CustomDataGrid from "../common/datagrid";
import CustomModal, { FieldDefinition } from "../common/modals";
import StatCard from "../common/statCard";
import StoreDetailPage from "../stores/storedetails";
import StorePopover from "../stores/storepopover";
import { MoreVertical } from "lucide-react";


interface Store {
  id: string;
  storeId: string;
  name: string;
  address: string;
  rating: number;
  status: "Active" | "Inactive";
  amount: string;
  createdDate?: string;
  items?: StoreItem[];
}

interface StoreItem {
  name: string;
  quantity: number;
  price: string;
}

const Stores: React.FC = () => {
  // State management
  const [stores, setStores] = useState<Store[]>([]);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [paginatedData, setPaginatedData] = useState<Store[]>([]);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [popoverAnchorEl, setPopoverAnchorEl] = useState<HTMLElement | null>(
    null
  );
  const [showMobileMenu, setShowMobileMenu] = useState(false);
const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [popoverStore, setPopoverStore] = useState<Store | null>(null);
  const [density, setDensity] = useState<
    "compact" | "standard" | "comfortable"
  >("standard");

  const [visibleColumns, setVisibleColumns] = useState<string[]>([]);
  const [activeFilters, setActiveFilters] = useState<
    { field: string; value: string }[]
  >([]);
  const [searchText, setSearchText] = useState("");
  const [startDate, setStartDate] = useState("2025-02-10");
  const [endDate, setEndDate] = useState("2025-02-28");
  // Add this new state to control view visibility
  const [showStoreDetailsView, setShowStoreDetailsView] = useState(false);
  // Refs for outside click handling
  const densityMenuRef = useRef<HTMLDivElement>(null);
  const columnMenuRef = useRef<HTMLDivElement>(null);
  const filterMenuRef = useRef<HTMLDivElement>(null);
  const datePickerRef = useRef<HTMLDivElement>(null);
  const storesDropdownRef = useRef<HTMLDivElement>(null);
  const actionsDropdownRef = useRef<HTMLDivElement>(null);
  const exportDropdownRef = useRef<HTMLDivElement>(null);

  // UI state for dropdowns (adding these to fix the existing useEffect)
  const [showDensityMenu, setShowDensityMenu] = useState(false);
  const [showColumnMenu, setShowColumnMenu] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [storesDropdownOpen, setStoresDropdownOpen] = useState(false);
  const [actionsDropdownOpen, setActionsDropdownOpen] = useState(false);




// Add this useEffect for handling clicks outside the mobile menu
useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (
      mobileMenuRef.current &&
      !mobileMenuRef.current.contains(event.target as Node)
    ) {
      setShowMobileMenu(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

  // Function to filter orders by date range
  const filterByDateRange = (
    ordersToFilter: Store[],
    start: string,
    end: string
  ): Store[] => {
    return ordersToFilter.filter((store) => {
      if (!store.createdDate) return true;

      const orderDate = new Date(store.createdDate);
      const startDateObj = new Date(start);
      const endDateObj = new Date(end);

      return orderDate >= startDateObj && orderDate <= endDateObj;
    });
  };
  // Function to apply all filters (search, date range, and column filters)
  const applyAllFilters = () => {
    let filteredData = [...stores];
    // Apply date range filter
    filteredData = filterByDateRange(filteredData, startDate, endDate);

    // Apply search filter
    if (searchText) {
      const searchLower = searchText.toLowerCase();
      filteredData = filteredData.filter((order) => {
        return Object.entries(order).some(([key, value]) => {
          // Skip id field
          if (key === "id") return false;

          // Check if column is visible
          const column = columns.find((col) => col.field === key);
          if (column && !visibleColumns.includes(key)) return false;

          // Check if value contains search text
          if (value == null) return false;
          return String(value).toLowerCase().includes(searchLower);
        });
      });
    }

    // Apply column-specific filters
    if (activeFilters.length > 0) {
      filteredData = filteredData.filter((store) => {
        return activeFilters.every((filter) => {
          const value = store[filter.field as keyof Store];
          if (value == null) return false;
          return String(value)
            .toLowerCase()
            .includes(filter.value.toLowerCase());
        });
      });
    }

    setPaginatedData(filteredData);
  };

  // Apply filters whenever filter conditions change
  useEffect(() => {
    applyAllFilters();
  }, [searchText, startDate, endDate, activeFilters, visibleColumns]);
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
        amount: "₹300.00",
      },
      {
        id: "2",
        storeId: "#20345",
        name: "Plumed Horse",
        address: "8502 Preston Rd. Inglewood, Maine 98380",
        rating: 4.21,
        status: "Active",
        amount: "₹300.00",
      },
      {
        id: "3",
        storeId: "#20345",
        name: "King Lee's",
        address: "3517 W. Gray St. Utica, Pennsylvania 57867",
        rating: 4.21,
        status: "Active",
        amount: "₹300.00",
      },
      {
        id: "4",
        storeId: "#20345",
        name: "Marina Kitchen",
        address: "4140 Parker Rd. Allentown, New Mexico 31134",
        rating: 4.21,
        status: "Active",
        amount: "₹300.00",
      },
      {
        id: "5",
        storeId: "#20345",
        name: "The Aviary",
        address: "4517 Washington Ave. Manchester, Kentucky 39495",
        rating: 4.21,
        status: "Active",
        amount: "₹300.00",
      },
      {
        id: "6",
        storeId: "#20345",
        name: "Crab Hut",
        address: "2715 Ash Dr. San Jose, South Dakota 83475",
        rating: 4.21,
        status: "Active",
        amount: "₹300.00",
      },
      {
        id: "7",
        storeId: "#20345",
        name: "Brass Tacks",
        address: "2972 Westheimer Rd. Santa Ana, Illinois 85486",
        rating: 4.21,
        status: "Active",
        amount: "₹300.00",
      },
      {
        id: "8",
        storeId: "#20345",
        name: "Bean Around the World Coffees",
        address: "2715 Ash Dr. San Jose, South Dakota 83475",
        rating: 4.21,
        status: "Active",
        amount: "₹300.00",
      },
      {
        id: "9",
        storeId: "#20345",
        name: "Chewy Balls",
        address: "1901 Thornridge Cir. Shiloh, Hawaii 81063",
        rating: 4.21,
        status: "Active",
        amount: "₹300.00",
      },
      {
        id: "10",
        storeId: "#20345",
        name: "Proxi",
        address: "2118 Thornridge Cir. Syracuse, Connecticut 35624",
        rating: 4.21,
        status: "Active",
        amount: "₹300.00",
      },
    ];
    setStores(mockStores);
    // Filter by date range initially
    const filtered = filterByDateRange(mockStores, startDate, endDate);
    setPaginatedData(filtered);

    // Initialize visible columns
    const allColumnFields = columns.map((col) => col.field);
    setVisibleColumns(allColumnFields);
  }, []);
  // Define Column type to match your CustomDataGrid expectations
  interface Column {
    field: string;
    headerName: string;
    width: string;
    renderCell?: (value: any, row: any) => React.ReactNode;
  }

  const handleStoreIdClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    store: Store
  ) => {
    event.stopPropagation();

    const storeWithItems = {
      ...store,
      amount: "₹300.00", // Add this line to include amount
      items: [
        {
          name: "Chicken Burger",
          quantity: 2,
          price: "₹100.00",
        },
        {
          name: "Chicken Burger",
          quantity: 2,
          price: "₹100.00",
        },
        {
          name: "Chicken Burger",
          quantity: 2,
          price: "₹100.00",
        },
      ],
    };

    setPopoverAnchorEl(event.currentTarget);
    setPopoverStore(storeWithItems);
    setPopoverOpen(true);
  };

  // Handler for popover arrow click (show full details)
  const handleShowFullDetails = () => {
    setShowStoreDetailsView(true); // Now we hide the main view
  };

  // DataGrid column definitions
  const columns: Column[] = [
    {
      field: "storeId",
      headerName: "Store ID",
      width: "120px",
      renderCell: (value, row) => (
        <div className="flex items-center text-cardValue font-inter font-[500] text-[12px]">
          {value}
          <button className="ml-2" onClick={(e) => handleStoreIdClick(e, row)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
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
      field: "address",
      headerName: "Store Address",
      width: "472px",
    },
    {
      field: "rating",
      headerName: "Rating",
      width: "120px",
      renderCell: (value, row) => (
        <div className="flex items-center text-cardValue font-inter font-[500] text-[12px]">
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
      width: "85px",
      renderCell: (value, row) => (
        <div className="w-[60px] px-1 py-1 rounded-custom4px bg-bgActive text-customWhiteColor text-[12px] font-[600] font-inter text-center">
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
        amount: "₹300.00",
      };
      setStores((prev) => [...prev, newStore]);
      setPaginatedData((prev) => [...prev, newStore]);
    } else {
      // Handle edit functionality if needed
    }
    setIsModalOpen(false);
  };

  // Close dropdown menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        densityMenuRef.current &&
        !densityMenuRef.current.contains(event.target as Node)
      ) {
        setShowDensityMenu(false);
      }
      if (
        columnMenuRef.current &&
        !columnMenuRef.current.contains(event.target as Node)
      ) {
        setShowColumnMenu(false);
      }
      if (
        filterMenuRef.current &&
        !filterMenuRef.current.contains(event.target as Node)
      ) {
        setShowFilterMenu(false);
      }
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target as Node)
      ) {
        setShowDatePicker(false);
      }
      if (
        storesDropdownRef.current &&
        !storesDropdownRef.current.contains(event.target as Node)
      ) {
        setStoresDropdownOpen(false);
      }
      if (
        actionsDropdownRef.current &&
        !actionsDropdownRef.current.contains(event.target as Node)
      ) {
        setActionsDropdownOpen(false);
      }
      if (
        exportDropdownRef.current &&
        !exportDropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popoverOpen &&
        popoverAnchorEl &&
        event.target instanceof Node &&
        !popoverAnchorEl.contains(event.target)
      ) {
        setPopoverOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popoverOpen, popoverAnchorEl]);
  const handleReject = () => {
    console.log("Store rejected");
    alert("Store rejected");
    // Add your reject logic here
  };

  const handleAccept = () => {
    console.log("Store accepted");
    alert("Store accepted");
    // Add your accept logic here
  };

  const handleMoreActions = () => {
    console.log("More actions requested");
    alert("More actions menu");
    // Implement menu display or other actions
  };

  // Handler for closing store details view
  const handleCloseStoreDetails = () => {
    setPopoverOpen(false);
    setShowStoreDetailsView(false);
  };

  const handlePrint = () => {
    console.log("Print button clicked");
    // The component will handle printing with the default implementation
    // If you want custom printing logic, uncomment and modify the code below:

    const printWindow = window.open("", "_blank");
    if (!printWindow) {
      alert("Please allow popups for printing functionality");
      return;
    }

    // Make sure we have the store data from popoverStore
    if (!popoverStore) {
      alert("No store data available to print");
      return;
    }

    // Custom print content
    printWindow.document.write(`
      <html>
        <head>
          <title>Store Details - ${popoverStore.storeId}</title>
          <style>
            body { font-family: Arial, sans-serif; }
            .print-header { text-align: center; margin-bottom: 20px; }
        
          </style>
        </head>
        <body>
          <div class="print-header">
            <h1>Store #${popoverStore.storeId}</h1>
            <p>${popoverStore.name}</p>
          </div>
      
          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
      </html>
    `);

    printWindow.document.close();
  };

  // If store details view is active, only show the StoreDetailPage
  if (showStoreDetailsView && popoverStore) {
    return (
      <div className="p-0 max-w-full rounded-l sm:max-h-full md:max-h-full lg:max-h-full xl:max-h-full max-h-[80vh] overflow-y-auto bg-background-grey">
        <StoreDetailPage
          storeId={popoverStore.storeId}
          storeName={popoverStore.name}
          storeAddress={popoverStore.address}
          rating={popoverStore.rating}
          status={popoverStore.status}
          phoneNumber="+91 810 230 8108" // Example or placeholder
          email="info@designmart.com" // Example or placeholder
          storeItems={popoverStore.items}
          onBackClick={handleCloseStoreDetails}
          onPrint={handlePrint}
          onReject={handleReject}
          onAccept={handleAccept}
          onMoreActions={handleMoreActions}
        />
      </div>
    );
  }

  return (
    <div className="p-0 max-w-full rounded-lg p-1 md:p-6 lg:p-0 xl:p-0 sm:max-h-full md:max-h-full lg:max-h-full xl:max-h-full max-h-[80vh] overflow-y-auto bg-background-grey">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 px-4 md:px-8 pt-8">
  <h1 className="text-[20px] font-inter font-[600] text-cardValue">
    Stores
  </h1>
  <div className="flex space-x-2 relative">
    {/* For Mobile: Three Dots Menu */}
    <div className="md:hidden relative">
      <button
        className="p-2 rounded-full hover:bg-gray-200"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        <MoreVertical size={20} />
      </button>
      
      {showMobileMenu && (
        <div 
          ref={mobileMenuRef}
          className="absolute right-0 top-10 bg-white shadow-lg rounded-md border border-gray-200 w-48 z-20"
        >
          <div className="py-1">
            <button
              onClick={() => {
                setShowMobileMenu(false);
                setDropdownOpen(!dropdownOpen);
              }}
              className="w-full text-left px-4 py-2 text-gray-700 font-medium text-sm hover:bg-gray-50"
            >
              More actions
            </button>
            <button
              onClick={() => {
                setShowMobileMenu(false);
                handleAddStore();
              }}
              className="w-full text-left px-4 py-2 text-gray-700 font-medium text-sm hover:bg-gray-50"
            >
              Add store
            </button>
          </div>
        </div>
      )}
    </div>

    {/* For Desktop: Normal Buttons */}
    <div className="hidden md:block relative">
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
              fillRule="evenodd"
              clipRule="evenodd"
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
              className="block px-4 py-2 text-menuSubHeadingColor font-inter font-[12px] font-[500] whitespace-nowrap"
            >
              Import stores
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-menuSubHeadingColor font-inter font-[12px] font-[500] whitespace-nowrap"
            >
              Create new view
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-menuSubHeadingColor font-inter font-[12px] font-[500] whitespace-nowrap"
            >
              Hide analytics
            </a>
          </div>
        </div>
      )}
    </div>

    {/* Add store button - visible only on desktop */}
    <button
      className="hidden md:flex bg-bgButton text-whiteColor font-inter font-[12px] font-[600] border border-btnBorder rounded-md px-4 py-2 items-center shadow-sm"
      onClick={handleAddStore}
    >
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
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </button>
  </div>
</div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 md:grid-cols-6 sm:grid-cols-3 lg:grid-cols-6 xl:grid-cols-6 gap-1 bg-backgroundWhite mx-8 ps-3 py-3 pe-3 rounded-custom8px">
        <StatCard
          value="213"
          description="Active Store"
          descriptionFirst={true}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M4 6V4H20V6H4ZM4 20V14H3V12L4 7H20L21 12V14H20V20H18V14H14V20H4ZM6 18H12V14H6V18Z"
                fill="#636363"
              />
            </svg>
          }
        />
        <StatCard
          value="245"
          description="Inactive Stores"
          descriptionFirst={true}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
            >
              <path
                d="M9.5333 6L7.5333 4H20.3333V6H9.5333ZM20.3333 16.8V14H21.3333V12L20.3333 7H10.5333L17.5333 14H18.3333V14.8L20.3333 16.8ZM22.4433 21.46L21.1733 22.73L14.3333 15.89V20H4.3333V14H3.3333V12L4.3333 7H5.4433L1.4433 3L2.7233 1.73L22.4433 21.46ZM12.3333 14H6.3333V18H12.3333V14Z"
                fill="#636363"
              />
            </svg>
          }
        />
        <StatCard
          value="111"
          description="Open Stores"
          descriptionFirst={true}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
            >
              <path
                d="M4.66669 6V4H20.6667V6H4.66669ZM4.66669 20V14H3.66669V12L4.66669 7H20.6667L21.6667 12V14H20.6667V20H18.6667V14H14.6667V20H4.66669ZM6.66669 18H12.6667V14H6.66669V18Z"
                fill="#636363"
              />
            </svg>
          }
        />

        <StatCard
          value="164"
          description="Closed Store"
          descriptionFirst={true}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M20.4 6.28571C20.4 5.02857 19.32 4 18 4H15.6C14.94 4 14.4 4.51429 14.4 5.14286C14.4 5.77143 14.94 6.28571 15.6 6.28571H18V9.31429L13.824 14.2857H9.6V9.71429C9.6 9.08571 9.06 8.57143 8.4 8.57143H4.8C2.148 8.57143 0 10.6171 0 13.1429V15.4286C0 16.0571 0.54 16.5714 1.2 16.5714H2.4C2.4 18.4571 3.972 20 5.88 20C7.788 20 9.36 18.4571 9.36 16.5714H14.64C14.64 18.4571 16.212 20 18.12 20C20.028 20 21.6 18.4571 21.6 16.5714H22.8C23.46 16.5714 24 16.0571 24 15.4286V13.1429C24 9.02857 22.536 6.28571 20.4 6.28571ZM5.88 18.2857C4.944 18.2857 4.2 17.5429 4.2 16.5714C4.2 15.6 4.944 14.8571 5.88 14.8571C6.816 14.8571 7.56 15.6 7.56 16.5714C7.56 17.5429 6.816 18.2857 5.88 18.2857ZM18.12 18.2857C17.184 18.2857 16.44 17.5429 16.44 16.5714C16.44 15.6 17.184 14.8571 18.12 14.8571C19.056 14.8571 19.8 15.6 19.8 16.5714C19.8 17.5429 19.056 18.2857 18.12 18.2857ZM21.6 10.8571H14.4V8.57143H19.0848C19.32 8.57143 19.532 8.72 19.62 8.94286L21.6 10.8571Z"
                fill="#636363"
              />
            </svg>
          }
        />

        <StatCard
          value="164"
          description="Verified"
          descriptionFirst={true}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="24"
              viewBox="0 0 25 24"
              fill="none"
            >
              <g clip-path="url(#clip0_7339_55668)">
                <path
                  d="M20.7333 6.28571C20.7333 5.02857 19.6533 4 18.3333 4H15.9333C15.2733 4 14.7333 4.51429 14.7333 5.14286C14.7333 5.77143 15.2733 6.28571 15.9333 6.28571H18.3333V9.31429L14.1573 14.2857H9.93325V9.71429C9.93325 9.08571 9.39325 8.57143 8.73325 8.57143H5.13325C2.48125 8.57143 0.333252 10.6171 0.333252 13.1429V15.4286C0.333252 16.0571 0.873252 16.5714 1.53325 16.5714H2.73325C2.73325 18.4686 4.34125 20 6.33325 20C8.32525 20 9.93325 18.4686 9.93325 16.5714H14.1573C14.8893 16.5714 15.5733 16.2514 16.0293 15.7143L20.2053 10.7429C20.5533 10.3314 20.7333 9.82857 20.7333 9.31429V6.28571ZM6.33325 17.7143C5.67325 17.7143 5.13325 17.2 5.13325 16.5714H7.53325C7.53325 17.2 6.99325 17.7143 6.33325 17.7143Z"
                  fill="#636363"
                />
                <path
                  d="M5.13325 5.14286H8.73325C9.39325 5.14286 9.93325 5.65714 9.93325 6.28571C9.93325 6.91429 9.39325 7.42857 8.73325 7.42857H5.13325C4.47325 7.42857 3.93325 6.91429 3.93325 6.28571C3.93325 5.65714 4.47325 5.14286 5.13325 5.14286ZM20.7333 13.1429C18.7413 13.1429 17.1333 14.6743 17.1333 16.5714C17.1333 18.4686 18.7413 20 20.7333 20C22.7253 20 24.3333 18.4686 24.3333 16.5714C24.3333 14.6743 22.7253 13.1429 20.7333 13.1429ZM20.7333 17.7143C20.0733 17.7143 19.5333 17.2 19.5333 16.5714C19.5333 15.9429 20.0733 15.4286 20.7333 15.4286C21.3933 15.4286 21.9333 15.9429 21.9333 16.5714C21.9333 17.2 21.3933 17.7143 20.7333 17.7143Z"
                  fill="#636363"
                />
              </g>
              <defs>
                <clipPath id="clip0_7339_55668">
                  <rect
                    width="24"
                    height="24"
                    fill="white"
                    transform="translate(0.333252)"
                  />
                </clipPath>
              </defs>
            </svg>
          }
        />

        <StatCard
          value="23"
          description="Verified"
          descriptionFirst={true}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M21 16.5C21 16.8978 20.842 17.2794 20.5607 17.5607C20.2794 17.842 19.8978 18 19.5 18C19.1022 18 18.7206 17.842 18.4393 17.5607C18.158 17.2794 18 16.8978 18 16.5C18 16.1022 18.158 15.7206 18.4393 15.4393C18.7206 15.158 19.1022 15 19.5 15C19.8978 15 20.2794 15.158 20.5607 15.4393C20.842 15.7206 21 16.1022 21 16.5ZM21 9C21 9.39782 20.842 9.77936 20.5607 10.0607C20.2794 10.342 19.8978 10.5 19.5 10.5C19.1022 10.5 18.7206 10.342 18.4393 10.0607C18.158 9.77936 18 9.39782 18 9C18 8.60218 18.158 8.22064 18.4393 7.93934C18.7206 7.65804 19.1022 7.5 19.5 7.5C19.8978 7.5 20.2794 7.65804 20.5607 7.93934C20.842 8.22064 21 8.60218 21 9ZM15 12.75C15 13.1478 14.842 13.5294 14.5607 13.8107C14.2794 14.092 13.8978 14.25 13.5 14.25C13.1022 14.25 12.7206 14.092 12.4393 13.8107C12.158 13.5294 12 13.1478 12 12.75C12 12.3522 12.158 11.9706 12.4393 11.6893C12.7206 11.408 13.1022 11.25 13.5 11.25C13.8978 11.25 14.2794 11.408 14.5607 11.6893C14.842 11.9706 15 12.3522 15 12.75ZM15 5.25C15 5.64782 14.842 6.02936 14.5607 6.31066C14.2794 6.59196 13.8978 6.75 13.5 6.75C13.1022 6.75 12.7206 6.59196 12.4393 6.31066C12.158 6.02936 12 5.64782 12 5.25C12 4.85218 12.158 4.47064 12.4393 4.18934C12.7206 3.90804 13.1022 3.75 13.5 3.75C13.8978 3.75 14.2794 3.90804 14.5607 4.18934C14.842 4.47064 15 4.85218 15 5.25ZM15 20.25C15 20.6478 14.842 21.0294 14.5607 21.3107C14.2794 21.592 13.8978 21.75 13.5 21.75C13.1022 21.75 12.7206 21.592 12.4393 21.3107C12.158 21.0294 12 20.6478 12 20.25C12 19.8522 12.158 19.4706 12.4393 19.1893C12.7206 18.908 13.1022 18.75 13.5 18.75C13.8978 18.75 14.2794 18.908 14.5607 19.1893C14.842 19.4706 15 19.8522 15 20.25ZM9 16.5C9 16.8978 8.84196 17.2794 8.56066 17.5607C8.27936 17.842 7.89782 18 7.5 18C7.10218 18 6.72064 17.842 6.43934 17.5607C6.15804 17.2794 6 16.8978 6 16.5C6 16.1022 6.15804 15.7206 6.43934 15.4393C6.72064 15.158 7.10218 15 7.5 15C7.89782 15 8.27936 15.158 8.56066 15.4393C8.84196 15.7206 9 16.1022 9 16.5ZM9 9C9 9.39782 8.84196 9.77936 8.56066 10.0607C8.27936 10.342 7.89782 10.5 7.5 10.5C7.10218 10.5 6.72064 10.342 6.43934 10.0607C6.15804 9.77936 6 9.39782 6 9C6 8.60218 6.15804 8.22064 6.43934 7.93934C6.72064 7.65804 7.10218 7.5 7.5 7.5C7.89782 7.5 8.27936 7.65804 8.56066 7.93934C8.84196 8.22064 9 8.60218 9 9ZM19.125 3.75H4.875C4.17904 3.75 3.51169 4.02656 3.02252 4.51573C2.53335 5.0049 2.25679 5.67225 2.25679 6.36821C2.25679 7.06416 2.53335 7.73152 3.02252 8.22069C3.51169 8.70985 4.17904 8.98641 4.875 8.98641H19.125C19.821 8.98641 20.4883 8.70985 20.9775 8.22069C21.4667 7.73152 21.7432 7.06416 21.7432 6.36821C21.7432 5.67225 21.4667 5.0049 20.9775 4.51573C20.4883 4.02656 19.821 3.75 19.125 3.75Z"
                fill="#636363"
              />
            </svg>
          }
        />
      </div>

      {/* Main content */}
      <div className="px-8 pb-8 overflow-x-auto">
        <CustomDataGrid
          rows={paginatedData}
          columns={columns}
          selectedRows={selectedRows}
          onSelectRow={handleSelectRow}
          onSelectAll={handleSelectAll}
          searchPlaceholder="Search store"
          hideToolbar={false}
          showActionColumn={false}
          showCheckboxes={true}
          enableDateFilters={true}
          densityFirst={true} // Change to false if you want export button before density
          dateRange={{
            label: `Feb 10–31, 2025`,
            startDate: startDate,
            endDate: endDate,
            onDateChange: (start, end) => {
              setStartDate(start);
              setEndDate(end);
              // Format the date range for display
              const startObj = new Date(start);
              const endObj = new Date(end);
              const formattedStart = startObj.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              });
              const formattedEnd = endObj.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              });
              // Apply date range filter
              const filtered = filterByDateRange(stores, start, end);
              setPaginatedData(filtered);
            },
          }}
          densityOptions={{
            currentDensity: density,
            onDensityChange: (newDensity) => {
              setDensity(newDensity);
              // Apply any density-related styling changes here if needed
            },
          }}
        />
      </div>
      {/* StorePopover component */}
      <StorePopover
        popoverOpen={popoverOpen}
        popoverStore={popoverStore}
        popoverAnchorEl={popoverAnchorEl}
        showStoreDetailsView={showStoreDetailsView}
        handleShowFullDetails={handleShowFullDetails}
      />
      {/* Add/Edit Modal */}
      <CustomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalMode === "add" ? "Add Store" : "Edit Store"}
        fields={modalFields}
        onSave={handleSave}
        mode={modalMode} // Add this missing required prop
      />
    </div>
  );
};

export default Stores;
