import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, Plus, Check, X } from "lucide-react";
import CustomDataGrid from "../common/datagrid";
import CustomModal, { FieldDefinition } from "../common/modals";
import StatCard from "../common/statCard";
import UnifiedPopover from "../common/DetailsModal";

interface Store {
  id: string;
  storeId: string;
  name: string;
  address: string;
  rating: number;
  status: "Active" | "Inactive";
  amount: string; // Add this property as optional
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
  const [popoverStore, setPopoverStore] = useState<Store | null>(null);
  const [density, setDensity] = useState<
    "compact" | "standard" | "comfortable"
  >("standard");

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
    setPaginatedData(mockStores);
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
    // {
    //   field: "status",
    //   headerName: "Status",
    //   width: "120px",
    //   renderCell: (value, row) => (
    //     <div className="flex items-center space-x-2">
    //       <button className="p-1 rounded-custom border border-borderCrossIcon bg-bgCrossIcon">
    //         <svg
    //           xmlns="http://www.w3.org/2000/svg"
    //           width="15"
    //           height="14"
    //           viewBox="0 0 15 14"
    //           fill="none"
    //         >
    //           <path
    //             fill-rule="evenodd"
    //             clip-rule="evenodd"
    //             d="M3.50501 3.00501C3.77838 2.73165 4.2216 2.73165 4.49496 3.00501L7.49999 6.01004L10.505 3.00501C10.7784 2.73165 11.2216 2.73165 11.495 3.00501C11.7683 3.27838 11.7683 3.7216 11.495 3.99496L8.48994 6.99999L11.495 10.005C11.7683 10.2784 11.7683 10.7216 11.495 10.995C11.2216 11.2683 10.7784 11.2683 10.505 10.995L7.49999 7.98994L4.49496 10.995C4.2216 11.2683 3.77838 11.2683 3.50501 10.995C3.23165 10.7216 3.23165 10.2784 3.50501 10.005L6.51004 6.99999L3.50501 3.99496C3.23165 3.7216 3.23165 3.27838 3.50501 3.00501Z"
    //             fill="#620E0E"
    //           />
    //         </svg>
    //       </button>
    //       <button className="p-1 rounded-custom border border-borderGreeen bg-customBackgroundColor">
    //         <svg
    //           xmlns="http://www.w3.org/2000/svg"
    //           width="15"
    //           height="14"
    //           viewBox="0 0 15 14"
    //           fill="none"
    //         >
    //           <path
    //             fill-rule="evenodd"
    //             clip-rule="evenodd"
    //             d="M12.1949 3.70503C12.4683 3.97839 12.4683 4.42161 12.1949 4.69497L6.59495 10.295C6.32158 10.5683 5.87837 10.5683 5.605 10.295L2.805 7.49497C2.53163 7.22161 2.53163 6.77839 2.805 6.50503C3.07837 6.23166 3.52158 6.23166 3.79495 6.50503L6.09998 8.81005L11.205 3.70503C11.4784 3.43166 11.9216 3.43166 12.1949 3.70503Z"
    //             fill="#125E1B"
    //           />
    //         </svg>
    //       </button>
    //     </div>
    //   ),
    // },
    {
      field: "address",
      headerName: "Store Address",
      width: "700px",
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
        <div className="px-1 py-1 rounded-custom4px bg-bgActive text-customWhiteColor text-[12px] font-[600] font-inter text-center">
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

  return (
    <div className="p-0 max-w-full rounded-l sm:max-h-full md:max-h-full lg:max-h-full xl:max-h-full max-h-[80vh] overflow-y-auto bg-background-grey">
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
      <div className="  ">
        <div className="grid grid-cols-2 md:grid-cols-6 sm:grid-cols-6 lg:grid-cols-6 xl:grid-cols-6 gap-1 bg-backgroundWhite mx-8 ps-3 py-3 pe-3  rounded-custom8px">
          
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
                  d="M20.4 6.28571C20.4 5.02857 19.32 4 18 4H15.6C14.94 4 14.4 4.51429 14.4 5.14286C14.4 5.77143 14.94 6.28571 15.6 6.28571H18V9.31429L13.824 14.2857H9.6V9.71429C9.6 9.08571 9.06 8.57143 8.4 8.57143H4.8C2.148 8.57143 0 10.6171 0 13.1429V15.4286C0 16.0571 0.54 16.5714 1.2 16.5714H2.4C2.4 18.4686 4.008 20 6 20C7.992 20 9.6 18.4686 9.6 16.5714H13.824C14.556 16.5714 15.24 16.2514 15.696 15.7143L19.872 10.7429C20.22 10.3314 20.4 9.82857 20.4 9.31429V6.28571ZM6 17.7143C5.34 17.7143 4.8 17.2 4.8 16.5714H7.2C7.2 17.2 6.66 17.7143 6 17.7143Z"
                  fill="#636363"
                />
                <path
                  d="M4.8 5.14286H8.4C9.06 5.14286 9.6 5.65714 9.6 6.28571C9.6 6.91429 9.06 7.42857 8.4 7.42857H4.8C4.14 7.42857 3.6 6.91429 3.6 6.28571C3.6 5.65714 4.14 5.14286 4.8 5.14286ZM20.4 13.1429C18.408 13.1429 16.8 14.6743 16.8 16.5714C16.8 18.4686 18.408 20 20.4 20C22.392 20 24 18.4686 24 16.5714C24 14.6743 22.392 13.1429 20.4 13.1429ZM20.4 17.7143C19.74 17.7143 19.2 17.2 19.2 16.5714C19.2 15.9429 19.74 15.4286 20.4 15.4286C21.06 15.4286 21.6 15.9429 21.6 16.5714C21.6 17.2 21.06 17.7143 20.4 17.7143Z"
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
                <g clip-path="url(#clip0_6994_51368)">
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
                  <clipPath id="clip0_6994_51368">
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
            value="50"
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
                <g clip-path="url(#clip0_6994_51368)">
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
                  <clipPath id="clip0_6994_51368">
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
        </div>

        {/* Data grid section */}
        <div className="px-8 pb-8 overflow-x-auto bg-background-grey ">
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

        <UnifiedPopover
          isOpen={popoverOpen}
          onClose={() => setPopoverOpen(false)}
          data={popoverStore}
          type="store"
          anchorEl={popoverAnchorEl}
        />

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

    </div>
  );
};

export default Stores;