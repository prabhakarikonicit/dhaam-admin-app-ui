import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, Plus, X } from "lucide-react";
import CustomDataGrid from "../common/datagrid";
import CustomModal, { FieldDefinition } from "../common/modals";
import StatCard from "../common/statCard";
import UnifiedPopover from "../common/DetailsModal";
interface Order {
  id: string;
  orderId: string;
  amount: string;
  status?:
    | ""
    | "Pending"
    | "Completed"
    | "Dispatched"
    | "Cancelled"
    | "Out for delivery";
  store: string;
  deliveryAddress: string;
  deliveryMode: string;
  scheduleTime: string;
  scheduleDate: string;
  paymentMethod: "Cash" | "UPI" | "Credit Card";
  createdDate?: string; // Added for date filtering
  items?: OrderItem[]; // Optional items for detailed view
}

interface OrderItem {
  name: string;
  quantity: number;
  price: string;
}

const Orders: React.FC = () => {
  // State management
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOrderDetailsModalOpen, setIsOrderDetailsModalOpen] = useState(false);
  const [selectedOrderDetails, setSelectedOrderDetails] =
    useState<Order | null>(null);
  const [modalMode, setModalMode] = useState<
    "add" | "edit" | "view" | "payment"
  >("add");
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [popoverAnchorEl, setPopoverAnchorEl] = useState<HTMLElement | null>(
    null
  );
  const [popoverOrder, setPopoverOrder] = useState<Order | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [storesDropdownOpen, setStoresDropdownOpen] = useState(false);
  const [actionsDropdownOpen, setActionsDropdownOpen] = useState(false);
  const [paginatedData, setPaginatedData] = useState<Order[]>([]);
  const [searchText, setSearchText] = useState("");

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [startDate, setStartDate] = useState("2025-02-10");
  const [endDate, setEndDate] = useState("2025-02-28");
  const [density, setDensity] = useState<
    "compact" | "standard" | "comfortable"
  >("standard");
  const [showDensityMenu, setShowDensityMenu] = useState(false);
  const [showColumnMenu, setShowColumnMenu] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [visibleColumns, setVisibleColumns] = useState<string[]>([]);
  const [activeFilters, setActiveFilters] = useState<
    { field: string; value: string }[]
  >([]);

  // Refs for outside click handling
  const densityMenuRef = useRef<HTMLDivElement>(null);
  const columnMenuRef = useRef<HTMLDivElement>(null);
  const filterMenuRef = useRef<HTMLDivElement>(null);
  const datePickerRef = useRef<HTMLDivElement>(null);
  const storesDropdownRef = useRef<HTMLDivElement>(null);
  const actionsDropdownRef = useRef<HTMLDivElement>(null);
  const exportDropdownRef = useRef<HTMLDivElement>(null);

  // Sample data initialization with createdDate field
  // Sample data initialization with proper status values
  useEffect(() => {
    const mockOrders: Order[] = [
      {
        id: "1",
        orderId: "#20345",
        amount: "₹100.00",
        status: "", // First row shows "Pending"
        store: "Queenstown Public House",
        deliveryAddress: "6391 Elgin St. Celina, Delaware 10299",
        deliveryMode: "Home delivery",
        scheduleTime: "06:30 PM",
        scheduleDate: "January 26",
        paymentMethod: "Cash",
        // createdDate: "2025-02-12",
      },
      {
        id: "2",
        orderId: "#20345",
        amount: "₹100.00",
        status: "Pending", // Will show reject/accept icons
        store: "Plumed Horse",
        deliveryAddress: "8502 Preston Rd. Inglewood, Maine 98380",
        deliveryMode: "Home delivery",
        scheduleTime: "06:30 PM",
        scheduleDate: "January 26",
        paymentMethod: "UPI",
        createdDate: "2025-02-15",
      },
      {
        id: "3",
        orderId: "#20345",
        amount: "₹100.00",
        status: "", // Will show reject/accept icons
        store: "King Lee's",
        deliveryAddress: "3517 W. Gray St. Utica, Pennsylvania 57867",
        deliveryMode: "Home delivery",
        scheduleTime: "06:30 PM",
        scheduleDate: "January 26",
        paymentMethod: "Credit Card",
        createdDate: "2025-02-18",
      },
      {
        id: "4",
        orderId: "#20345",
        amount: "₹100.00",
        status: "", // Will show reject/accept icons
        store: "Marina Kitchen",
        deliveryAddress: "4140 Parker Rd. Allentown, New Mexico 31134",
        deliveryMode: "Home delivery",
        scheduleTime: "06:30 PM",
        scheduleDate: "January 26",
        paymentMethod: "Cash",
        createdDate: "2025-02-20",
      },
      {
        id: "5",
        orderId: "#20345",
        amount: "₹100.00",
        status: "", // Will show reject/accept icons
        store: "The Aviary",
        deliveryAddress: "4517 Washington Ave. Manchester, Kentucky 39495",
        deliveryMode: "Home delivery",
        scheduleTime: "06:30 PM",
        scheduleDate: "January 26",
        paymentMethod: "UPI",
        createdDate: "2025-02-22",
      },
      {
        id: "6",
        orderId: "#20345",
        amount: "₹100.00",
        status: "", // Show as status badge
        store: "Crab Hut",
        deliveryAddress: "2715 Ash Dr. San Jose, South Dakota 83475",
        deliveryMode: "Home delivery",
        scheduleTime: "06:30 PM",
        scheduleDate: "January 26",
        paymentMethod: "Credit Card",
        createdDate: "2025-02-24",
      },
      {
        id: "7",
        orderId: "#20345",
        amount: "₹100.00",
        status: "Completed", // Show as status badge
        store: "Brass Tacks",
        deliveryAddress: "2972 Westheimer Rd. Santa Ana, Illinois 85486",
        deliveryMode: "Home delivery",
        scheduleTime: "06:30 PM",
        scheduleDate: "January 26",
        paymentMethod: "Cash",
        createdDate: "2025-02-25",
      },
      {
        id: "8",
        orderId: "#20345",
        amount: "₹100.00",
        status: "Out for delivery", // Show as status badge
        store: "Bean Around the World Coffees",
        deliveryAddress: "2715 Ash Dr. San Jose, South Dakota 83475",
        deliveryMode: "Home delivery",
        scheduleTime: "06:30 PM",
        scheduleDate: "January 26",
        paymentMethod: "UPI",
        createdDate: "2025-02-26",
      },
      
      {
        id: "9",
        orderId: "#20345",
        amount: "₹100.00",
        status: "Cancelled", // Show as status badge
        store: "Chewy Balls",
        deliveryAddress: "1901 Thornridge Cir. Shiloh, Hawaii 81063",
        deliveryMode: "Home delivery",
        scheduleTime: "06:30 PM",
        scheduleDate: "January 26",
        paymentMethod: "Credit Card",
        createdDate: "2025-02-27",
      },
      {
        id: "10",
        orderId: "#20345",
        amount: "₹100.00",
        status: "Out for delivery", // Show as status badge
        store: "Proxi",
        deliveryAddress: "2118 Thornridge Cir. Syracuse, Connec...",
        deliveryMode: "Home delivery",
        scheduleTime: "06:30 PM",
        scheduleDate: "January 26",
        paymentMethod: "Cash",
        createdDate: "2025-02-27",
      },
    ];
    setOrders(mockOrders);

    // Filter by date range initially
    const filtered = filterByDateRange(mockOrders, startDate, endDate);
    setPaginatedData(filtered);

    // Initialize visible columns
    const allColumnFields = columns.map((col) => col.field);
    setVisibleColumns(allColumnFields);
  }, []);

  const handleOpenOrderDetailsModal = (order: Order) => {
    setSelectedOrderDetails(order);
    setIsOrderDetailsModalOpen(true);
  };

  // Define Column type to match your CustomDataGrid expectations
  interface Column {
    field: string;
    headerName: string;
    width: string;
    renderCell?: (value: any, row: any) => React.ReactNode;
    type?: "text" | "date" | "number";
  }

  // Function to render status with appropriate styling
  const renderStatus = (
    value: string,
    row: Order,
    rowIndex?: number
  ): React.ReactNode => {
    // Status styles for status badges
    const statusStyles: {
      [key: string]: {
        textColor: string;
        bgColor: string;
      };
    } = {
      Pending: {
        textColor: "text-yellow",
        bgColor: "bg-orangeColor",
      },
      Completed: {
        textColor: "text-green",
        bgColor: "bg-customBackgroundColor",
      },
      "Out for delivery": {
        textColor: "text-primary",
        bgColor: "bg-primary",
      },
      Cancelled: {
        textColor: "text-maroon",
        bgColor: "bg-bgCrossIcon",
      },
    };

    // Reject icon (red X)
    const rejectIcon = (
      <div className="flex justify-center items-center w-8 h-8 rounded-custom border border-borderCrossIcon bg-bgCrossIcon">
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
      </div>
    );

    // Accept icon (green checkmark)
    const acceptIcon = (
      <div className="flex justify-center items-center w-8 h-8 rounded-custom border border-borderGreeen bg-customBackgroundColor ml-2">
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
      </div>
    );

    // For rows that should show status text badges (Pending, Completed, Out for delivery, Cancelled)
    if (
      value &&
      ["Pending", "Completed", "Cancelled", "Out for delivery"].includes(value)
    ) {
      const statusConfig = statusStyles[value] || {
        textColor: "text-gray-600",
        bgColor: "bg-gray-100",
      };

      return (
        <div
          className={`px-3 py-1 rounded-custom80px  ${statusConfig.bgColor} ${statusConfig.textColor} 
          font-inter text-[12px] font-[600] whitespace-nowrap inline-block`}
        >
          {value}
        </div>
      );
    }

    // For rows that should show the reject/accept icons (empty status value)
    return (
      <div className="flex items-center">
        {rejectIcon}
        {acceptIcon}
      </div>
    );
  };

  // Function to render payment method with appropriate styling
  const renderPaymentMethod = (method: string, row: any) => {
    const methodStyles: { [key: string]: string } = {
      Cash: "bg-[#1A8917] text-white cursor-pointer hover:bg-[#157512]",
      UPI: "bg-[#DD9E06] text-white",
      "Credit Card": "bg-[#3172D7] text-white",
    };

    // Only make Cash payment method clickable
    if (method === "Cash") {
      return (
        <div
          className={`px-2 py-1 text-center whitespace-nowrap rounded-custom4px font-inter text-[12px] font-[500] ${
            methodStyles[method] || ""
          }`}
          onClick={() => handleOpenPaymentModal(row)}
          role="button"
          aria-label="View payment details"
        >
          {method}
        </div>
      );
    }

    return (
      <div
        className={`px-2 py-1 text-center whitespace-nowrap rounded-custom4px font-inter text-[12px] font-[500] ${
          methodStyles[method] || ""
        }`}
      >
        {method}
      </div>
    );
  };

  // Handler for opening the payment modal
  const handleOpenPaymentModal = (order: Order) => {
    setSelectedOrder(order);
    setModalMode("payment");
    setIsModalOpen(true);
  };
  const handleOrderIdClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    order: Order
  ) => {
    event.stopPropagation();

    const orderWithItems = {
      ...order,
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
    setPopoverOrder(orderWithItems);
    setPopoverOpen(true);
  };

  // Function to prepare payment details for the modal
  const preparePaymentDetails = () => {
    if (!selectedOrder) return undefined;

    // Create sample items for the order (simulate what would come from your data)
    const items = [
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
    ];

    return {
      orderId: selectedOrder.orderId,
      paymentMethod: selectedOrder.paymentMethod,
      items: items,
      total: "₹300.00",
      store: selectedOrder.store,
      storeAddress: "Queenstown Public House",
      deliveryAddress: selectedOrder.deliveryAddress,
    };
  };

  // DataGrid column definitions
  const columns: Column[] = [
    {
      field: "orderId",
      headerName: "Order ID",
      width: "20px",
      type: "text",
      renderCell: (value, row) => (
        <div className="flex items-center text-cardValue font-inter font-[500] text-[12px]">
          {value}
          <button className="ml-2" onClick={(e) => handleOrderIdClick(e, row)}>
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
      field: "amount",
      headerName: "Amount",
      width: "20px",
      type: "text",
    },
    {
      field: "status",
      headerName: "Status",
      width: "20px",
      type: "text",
      renderCell: renderStatus,
    },
    {
      field: "store",
      headerName: "Store",
      width: "50px",
      type: "text",
      renderCell: (value, row) => (
        <div className="text-[12px] font-inter font-[500] text-cardValue whitespace-nowrap overflow-hidden text-ellipsis">
          {value}
        </div>
      ),
    },
    {
      field: "deliveryAddress",
      headerName: "Delivery Address",
      width: "300px",
      type: "text",
    },
    {
      field: "deliveryMode",
      headerName: "Delivery Mode",
      width: "300px",
      type: "text",
    },
    {
      field: "scheduleTime",
      headerName: "Schedule Time",
      width: "200px",
      type: "text",
      renderCell: (value, row) => (
        <div>
          <div className="text-[14px] font-inter font-[500] text-cardValue leading-[21px]">
            {row.scheduleDate}
          </div>
          <div className="text-[11px] font-[400] font-inter text-cardTitle ">
            {value}
            
          </div>
        </div>
      ),
    },
    // {
    //   field: "createdDate",
    //   headerName: "Created Date",
    //   width: "150px",
    //   type: "date",
    //   renderCell: (value, row) => (
    //     <div className="text-[14px] font-inter font-[500] text-cardValue">
    //       {value}
    //     </div>
    //   ),
    // },
    {
      field: "paymentMethod",
      headerName: "Payment Method",
      width: "100px",
      type: "text",
      renderCell: (value, row) => renderPaymentMethod(value, row),
    },
  ];

  // Modal field definitions
  const modalFields: FieldDefinition[] = [
    {
      id: "store",
      label: "Store",
      type: "select",
      options: [
        { value: "Queenstown Public House", label: "Queenstown Public House" },
        { value: "Plumed Horse", label: "Plumed Horse" },
        { value: "King Lee's", label: "King Lee's" },
      ],
      required: true,
    },
    { id: "amount", label: "Amount", type: "text", required: true },
    {
      id: "deliveryAddress",
      label: "Delivery Address",
      type: "text",
      required: true,
    },
    {
      id: "deliveryMode",
      label: "Delivery Mode",
      type: "select",
      options: [
        { value: "Home delivery", label: "Home delivery" },
        { value: "Pickup", label: "Pickup" },
      ],
      required: true,
    },
    {
      id: "scheduleDate",
      label: "Schedule Date",
      type: "date",
      required: true,
    },
    {
      id: "scheduleTime",
      label: "Schedule Time",
      type: "time",
      required: true,
    },
    {
      id: "status",
      label: "Status",
      type: "select",
      options: [
        { value: "Pending", label: "Pending" },
        { value: "Completed", label: "Completed" },
        { value: "Dispatched", label: "Dispatched" },
        { value: "Cancelled", label: "Cancelled" },
        { value: "Out for delivery", label: "Out for delivery" },
      ],
      required: true,
    },
    {
      id: "paymentMethod",
      label: "Payment Method",
      type: "select",
      options: [
        { value: "Cash", label: "Cash" },
        { value: "UPI", label: "UPI" },
        { value: "Credit Card", label: "Credit Card" },
      ],
      required: true,
    },
    { id: "createdDate", label: "Created Date", type: "date", required: true },
  ];

  // Function to filter orders by date range
  const filterByDateRange = (
    ordersToFilter: Order[],
    start: string,
    end: string
  ): Order[] => {
    return ordersToFilter.filter((order) => {
      if (!order.createdDate) return true;

      const orderDate = new Date(order.createdDate);
      const startDateObj = new Date(start);
      const endDateObj = new Date(end);

      return orderDate >= startDateObj && orderDate <= endDateObj;
    });
  };

  // Function to apply all filters (search, date range, and column filters)
  const applyAllFilters = () => {
    let filteredData = [...orders];

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
      filteredData = filteredData.filter((order) => {
        return activeFilters.every((filter) => {
          const value = order[filter.field as keyof Order];
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
      setSelectedRows(paginatedData.map((order) => order.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleCreateOrder = () => {
    setModalMode("add");
    setIsModalOpen(true);
  };

  const handleSave = (data: any) => {
    if (modalMode === "payment") {
      // Handle saving changes from the payment modal
      console.log("Saving payment changes:", data);

      // Here you would update the order status or other details as needed
      if (selectedOrder) {
        const updatedOrders = orders.map((order) =>
          order.id === selectedOrder.id
            ? { ...order, status: data.status || order.status }
            : order
        );
        setOrders(updatedOrders);
        applyAllFilters(); // Reapply filters
      }
    } else if (modalMode === "add") {
      const newOrder: Order = {
        id: Math.random().toString(36).substr(2, 9),
        orderId: `#${Math.floor(10000 + Math.random() * 90000)}`,
        amount: `₹${parseFloat(data.amount).toFixed(2)}`,
        status: data.status as
          | "Pending"
          | "Completed"
          | "Dispatched"
          | "Cancelled"
          | "Out for delivery",
        store: data.store,
        deliveryAddress: data.deliveryAddress,
        deliveryMode: data.deliveryMode,
        scheduleTime: data.scheduleTime,
        scheduleDate: data.scheduleDate,
        paymentMethod: data.paymentMethod as "Cash" | "UPI" | "Credit Card",
        createdDate: data.createdDate || new Date().toISOString().split("T")[0],
      };
      setOrders((prev) => [...prev, newOrder]);
      applyAllFilters(); // Reapply filters after adding new order
    } else if (modalMode === "edit") {
      // Handle edit functionality
      if (selectedOrder) {
        const updatedOrders = orders.map((order) =>
          order.id === selectedOrder.id ? { ...order, ...data } : order
        );
        setOrders(updatedOrders);
        applyAllFilters();
      }
    }
    setIsModalOpen(false);
  };

  // Handle column visibility toggle
  const toggleColumnVisibility = (field: string) => {
    setVisibleColumns((prev) => {
      if (prev.includes(field)) {
        return prev.filter((f) => f !== field);
      } else {
        return [...prev, field];
      }
    });
  };

  // Handle adding a filter
  const addFilter = (field: string, value: string) => {
    if (!value) return;

    // Check if filter for this field already exists
    const existingFilterIndex = activeFilters.findIndex(
      (f) => f.field === field
    );

    if (existingFilterIndex >= 0) {
      // Update existing filter
      const updatedFilters = [...activeFilters];
      updatedFilters[existingFilterIndex] = { field, value };
      setActiveFilters(updatedFilters);
    } else {
      // Add new filter
      setActiveFilters([...activeFilters, { field, value }]);
    }

    setShowFilterMenu(false);
  };

  // Handle clear all filters
  const clearAllFilters = () => {
    setActiveFilters([]);
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
    <div className="p-0 max-w-full rounded-lg p-1 md:p-6 lg:p-0 xl:p-0 sm:max-h-full md:max-h-full lg:max-h-full xl:max-h-full max-h-[80vh] overflow-y-auto bg-background-grey">
      {/* Header with search and buttons */}
      <div className="flex justify-between items-center mb-6 px-8 pt-8 ">
        <h1 className="text-[16px] md:text-[20px] lg:text-[20px] sm:text-[20px] xl:text-[20px] font-inter font-[600] text-cardValue">
          Orders
        </h1>

        <div className="flex items-center space-x-2">
          {/* Search field */}
          <div className="relative mr-2 bg-backgroundWhite border border-reloadBorder p-2 rounded-custom">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <g clip-path="url(#clip0_6819_55)">
                <path
                  d="M14.66 15.6599C13.352 16.9694 11.6305 17.7848 9.78879 17.9673C7.94705 18.1497 6.09901 17.688 4.55952 16.6607C3.02004 15.6334 1.88436 14.1042 1.34597 12.3334C0.807587 10.5627 0.899804 8.66009 1.60691 6.94973C2.31402 5.23937 3.59227 3.8271 5.22389 2.95351C6.85551 2.07992 8.73954 1.79908 10.555 2.15882C12.3705 2.51856 14.005 3.49664 15.1802 4.92641C16.3554 6.35618 16.9985 8.14919 17 9.99995H15C15.0012 8.61175 14.521 7.26608 13.6413 6.19224C12.7615 5.1184 11.5366 4.38285 10.1753 4.11091C8.81404 3.83898 7.40056 4.04749 6.17577 4.70092C4.95098 5.35436 3.99066 6.41227 3.45845 7.6944C2.92625 8.97653 2.85509 10.4035 3.25711 11.7322C3.65913 13.061 4.50944 14.2092 5.66315 14.9812C6.81687 15.7532 8.20259 16.1013 9.58419 15.9662C10.9658 15.831 12.2578 15.2209 13.24 14.2399L14.66 15.6599ZM12 9.99995H20L16 13.9999L12 9.99995Z"
                  fill="#636363"
                />
              </g>
              <defs>
                <clipPath id="clip0_6819_55">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>

          {/* All stores dropdown */}
          <div className="relative mr-2" ref={storesDropdownRef}>
            <button
              className="bg-backgroundWhite rounded-custom px-4 py-2 flex items-center text-menuSubHeadingColor font-inter text-[10px] md:text-[12px] lg:text-[12px] sm:text-[12px] xl:text-[12px] font-[500] border border-reloadBorder shadow-sm"
              onClick={() => setStoresDropdownOpen(!storesDropdownOpen)}
            >
              All stores
              <ChevronDown className="ml-2 h-4 w-4" />
            </button>

            {storesDropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-custom border border-reloadBorder w-43 z-10">
                <div className="py-1">
                  <a
                    href="#"
                    className="block px-4 py-2 text-menuSubHeadingColor font-inter text-[12px] font-[500]"
                  >
                    All stores
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-menuSubHeadingColor font-inter text-[12px] font-[500]"
                  >
                    Queenstown Public House
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-menuSubHeadingColor font-inter text-[12px] font-[500]"
                  >
                    Plumed Horse
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-menuSubHeadingColor font-inter text-[12px] font-[500]"
                  >
                    King Lee's
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* More actions dropdown */}
          <div className="relative mr-2" ref={actionsDropdownRef}>
            <button
              className="bg-backgroundWhite rounded-custom px-4 py-2 flex items-center text-menuSubHeadingColor font-inter text-[10px] md:text-[12px] lg:text-[12px] sm:text-[12px] xl:text-[12px] font-[500] border border-reloadBorder shadow-sm"
              onClick={() => setActionsDropdownOpen(!actionsDropdownOpen)}
            >
              More actions
              <ChevronDown className="ml-2 h-4 w-4" />
            </button>

            {actionsDropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-custom border border-reloadBorder w-43 z-10">
                <div className="py-1">
                  <a
                    href="#"
                    className="block px-4 py-2 text-menuSubHeadingColor font-inter text-[12px] font-[500]"
                  >
                    Import orders
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-menuSubHeadingColor font-inter text-[12px] font-[500]"
                  >
                    Create new view
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-menuSubHeadingColor font-inter text-[12px] font-[500]"
                  >
                    Hide analytics
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Create order button */}
          <button
            className="bg-bgButton text-whiteColor font-inter text-[10px] md:text-[12px] lg:text-[12px] sm:text-[12px] xl:text-[12px] font-[600] border border-btnBorder rounded-md px-4 py-2 flex items-center shadow-sm"
            onClick={handleCreateOrder}
          >
            Create order
            <Plus className="ml-1 h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 md:grid-cols-6 sm:grid-cols-6 lg:grid-cols-6 xl:grid-cols-6 gap-2  px-8">
        <StatCard
          value="213"
          description="New Orders"
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
                d="M3.9998 20V7.1L2.0498 2.85L3.8498 2L6.1998 7.05H17.7998L20.1498 2L21.9498 2.85L19.9998 7.1V20H3.9998ZM9.9998 13H13.9998C14.2831 13 14.5208 12.904 14.7128 12.712C14.9048 12.52 15.0005 12.2827 14.9998 12C14.9991 11.7173 14.9031 11.48 14.7118 11.288C14.5205 11.096 14.2831 11 13.9998 11H9.9998C9.71647 11 9.47914 11.096 9.2878 11.288C9.09647 11.48 9.00047 11.7173 8.9998 12C8.99914 12.2827 9.09514 12.5203 9.2878 12.713C9.48047 12.9057 9.7178 13.0013 9.9998 13Z"
                fill="#7C43DF"
              />
            </svg>
          }
        />

        <StatCard
          value="245"
          description="All Orders"
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
                d="M14.449 20C14.0043 20 13.624 19.8417 13.308 19.525C12.992 19.2083 12.8337 18.8283 12.833 18.385V14.115C12.833 13.671 12.9913 13.291 13.308 12.975C13.6247 12.659 14.0047 12.5007 14.448 12.5H18.718C19.162 12.5 19.542 12.6583 19.858 12.975C20.174 13.2917 20.3323 13.6717 20.333 14.115V18.385C20.333 18.829 20.1747 19.209 19.858 19.525C19.5413 19.841 19.1613 19.9993 18.718 20H14.449ZM14.449 11.5C14.0043 11.5 13.624 11.3417 13.308 11.025C12.992 10.7083 12.8337 10.3283 12.833 9.885V5.615C12.833 5.171 12.9913 4.791 13.308 4.475C13.6247 4.159 14.0047 4.00067 14.448 4H18.718C19.162 4 19.542 4.15833 19.858 4.475C20.174 4.79167 20.3323 5.17167 20.333 5.615V9.885C20.333 10.329 20.1747 10.709 19.858 11.025C19.5413 11.341 19.1613 11.4993 18.718 11.5H14.449ZM5.94901 11.5C5.50434 11.5 5.12401 11.3417 4.80801 11.025C4.49201 10.7083 4.33367 10.3283 4.33301 9.885V5.615C4.33301 5.171 4.49134 4.791 4.80801 4.475C5.12467 4.159 5.50467 4.00067 5.94801 4H10.218C10.662 4 11.042 4.15833 11.358 4.475C11.674 4.79167 11.8323 5.17167 11.833 5.615V9.885C11.833 10.329 11.6747 10.709 11.358 11.025C11.0413 11.341 10.6613 11.4993 10.218 11.5H5.94901ZM5.94901 20C5.50434 20 5.12401 19.8417 4.80801 19.525C4.49201 19.2083 4.33367 18.8287 4.33301 18.386V14.116C4.33301 13.672 4.49134 13.292 4.80801 12.976C5.12467 12.66 5.50467 12.5017 5.94801 12.501H10.218C10.662 12.501 11.042 12.6593 11.358 12.976C11.674 13.2927 11.8323 13.6727 11.833 14.116V18.386C11.833 18.83 11.6747 19.21 11.358 19.526C11.0413 19.842 10.6613 20 10.218 20H5.94901Z"
                fill="#636363"
              />
            </svg>
          }
        />
        <StatCard
          value="111"
          description="Pending"
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
                d="M17.667 22C16.2837 22 15.1047 21.5123 14.13 20.537C13.1553 19.5617 12.6677 18.3827 12.667 17C12.6663 15.6173 13.154 14.4383 14.13 13.463C15.106 12.4877 16.285 12 17.667 12C19.049 12 20.2283 12.4877 21.205 13.463C22.1817 14.4383 22.669 15.6173 22.667 17C22.665 18.3827 22.1773 19.562 21.204 20.538C20.2307 21.514 19.0517 22.0013 17.667 22ZM18.167 16.8V14.5C18.167 14.3667 18.117 14.25 18.017 14.15C17.917 14.05 17.8003 14 17.667 14C17.5337 14 17.417 14.05 17.317 14.15C17.217 14.25 17.167 14.3667 17.167 14.5V16.775C17.167 16.9083 17.192 17.0377 17.242 17.163C17.292 17.2883 17.367 17.4007 17.467 17.5L18.992 19.025C19.092 19.125 19.2087 19.175 19.342 19.175C19.4753 19.175 19.592 19.125 19.692 19.025C19.792 18.925 19.842 18.8083 19.842 18.675C19.842 18.5417 19.792 18.425 19.692 18.325L18.167 16.8ZM5.66699 21C5.11699 21 4.64633 20.8043 4.25499 20.413C3.86366 20.0217 3.66766 19.5507 3.66699 19V5C3.66699 4.45 3.86299 3.97933 4.25499 3.588C4.64699 3.19667 5.11766 3.00067 5.66699 3H9.84199C10.0253 2.41667 10.3837 1.93767 10.917 1.563C11.4503 1.18833 12.0337 1.00067 12.667 1C13.3337 1 13.9297 1.18767 14.455 1.563C14.9803 1.93833 15.3343 2.41733 15.517 3H19.667C20.217 3 20.688 3.196 21.08 3.588C21.472 3.98 21.6677 4.45067 21.667 5V9C21.667 9.28333 21.571 9.521 21.379 9.713C21.187 9.905 20.9497 10.0007 20.667 10C20.3843 9.99933 20.147 9.90333 19.955 9.712C19.763 9.52067 19.667 9.28333 19.667 9V5H17.667V7C17.667 7.28333 17.571 7.521 17.379 7.713C17.187 7.905 16.9497 8.00067 16.667 8H8.66699C8.38366 8 8.14633 7.904 7.95499 7.712C7.76366 7.52 7.66766 7.28267 7.66699 7V5H5.66699V19H10.167C10.4503 19 10.688 19.096 10.88 19.288C11.072 19.48 11.1677 19.7173 11.167 20C11.1663 20.2827 11.0703 20.5203 10.879 20.713C10.6877 20.9057 10.4503 21.0013 10.167 21H5.66699ZM12.667 5C12.9503 5 13.188 4.904 13.38 4.712C13.572 4.52 13.6677 4.28267 13.667 4C13.6663 3.71733 13.5703 3.48 13.379 3.288C13.1877 3.096 12.9503 3 12.667 3C12.3837 3 12.1463 3.096 11.955 3.288C11.7637 3.48 11.6677 3.71733 11.667 4C11.6663 4.28267 11.7623 4.52033 11.955 4.713C12.1477 4.90567 12.385 5.00133 12.667 5Z"
                fill="#636363"
              />
            </svg>
          }
        />
        <StatCard
          value="164"
          description="Dispatched"
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
          value="255"
          description="Completed"
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
                d="M12.333 10.5811L19.1005 3.77705L17.333 2L12.333 7.02702L9.83301 4.51351L8.06551 6.29056L12.333 10.5811ZM9.83301 11.946H2.33301V22H22.333V11.946H14.833V14.4595H9.83301V11.946ZM17.333 16.973V14.4595H19.833V19.4865H4.83301V14.4595H7.33301V16.973H17.333Z"
                fill="#636363"
              />
            </svg>
          }
        />
        <StatCard
          value="25"
          description="Cancelled"
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
                d="M20.417 8.5V11.425C19.2524 10.8301 17.9292 10.6194 16.6374 10.8233C15.3456 11.0272 14.1517 11.6352 13.2269 12.5599C12.3022 13.4847 11.6942 14.6786 11.4903 15.9704C11.2864 17.2622 11.4971 18.5854 12.092 19.75H7.47949C6.73357 19.75 6.0182 19.4537 5.49075 18.9262C4.96331 18.3988 4.66699 17.6834 4.66699 16.9375V8.5H20.417ZM17.6045 4C18.3504 4 19.0658 4.29632 19.5932 4.82376C20.1207 5.35121 20.417 6.06658 20.417 6.8125V7.375H4.66699V6.8125C4.66699 6.06658 4.96331 5.35121 5.49075 4.82376C6.0182 4.29632 6.73357 4 7.47949 4H17.6045ZM22.667 16.9375C22.667 18.2802 22.1336 19.5678 21.1842 20.5172C20.2348 21.4666 18.9472 22 17.6045 22C16.2618 22 14.9742 21.4666 14.0248 20.5172C13.0754 19.5678 12.542 18.2802 12.542 16.9375C12.542 15.5948 13.0754 14.3072 14.0248 13.3578C14.9742 12.4084 16.2618 11.875 17.6045 11.875C18.9472 11.875 20.2348 12.4084 21.1842 13.3578C22.1336 14.3072 22.667 15.5948 22.667 16.9375ZM17.6045 17.7329L18.8937 19.0233C18.946 19.0755 19.0081 19.117 19.0765 19.1453C19.1448 19.1736 19.218 19.1882 19.292 19.1882C19.366 19.1882 19.4392 19.1736 19.5075 19.1453C19.5759 19.117 19.6379 19.0755 19.6902 19.0233C19.7425 18.971 19.784 18.9089 19.8123 18.8405C19.8406 18.7722 19.8552 18.699 19.8552 18.625C19.8552 18.551 19.8406 18.4778 19.8123 18.4095C19.784 18.3411 19.7425 18.279 19.6902 18.2267L18.3999 16.9375L19.6902 15.6483C19.7959 15.5426 19.8552 15.3994 19.8552 15.25C19.8552 15.1006 19.7959 14.9574 19.6902 14.8517C19.5846 14.7461 19.4414 14.6868 19.292 14.6868C19.1426 14.6868 18.9994 14.7461 18.8937 14.8517L17.6045 16.1421L16.3152 14.8517C16.2096 14.7461 16.0664 14.6868 15.917 14.6868C15.7676 14.6868 15.6244 14.7461 15.5187 14.8517C15.4131 14.9574 15.3538 15.1006 15.3538 15.25C15.3538 15.3994 15.4131 15.5426 15.5187 15.6483L16.8091 16.9375L15.5187 18.2267C15.4664 18.279 15.425 18.3411 15.3967 18.4095C15.3683 18.4778 15.3538 18.551 15.3538 18.625C15.3538 18.699 15.3683 18.7722 15.3967 18.8405C15.425 18.9089 15.4664 18.971 15.5187 19.0233C15.571 19.0755 15.6331 19.117 15.7015 19.1453C15.7698 19.1736 15.843 19.1882 15.917 19.1882C15.991 19.1882 16.0642 19.1736 16.1325 19.1453C16.2009 19.117 16.2629 19.0755 16.3152 19.0233L17.6045 17.7329Z"
                fill="#636363"
              />
            </svg>
          }
        />
      </div>

      {/* Data grid section */}
      <div className="px-8 pb-8 overflow-x-auto">
        <CustomDataGrid
          rows={paginatedData}
          columns={columns}
          selectedRows={selectedRows}
          onSelectRow={handleSelectRow}
          onSelectAll={handleSelectAll}
          searchPlaceholder="Search order"
          hideToolbar={false}
          showActionColumn={false}
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
              const filtered = filterByDateRange(orders, start, end);
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

      {/* Column visibility menu */}
      {showColumnMenu && (
        <div
          className="fixed inset-0 z-30 flex items-start justify-center pt-20"
          onClick={() => setShowColumnMenu(false)}
        >
          <div
            ref={columnMenuRef}
            className="bg-white shadow-lg rounded-md w-64 p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-semibold mb-2">Visible Columns</h3>
            <div className="space-y-2">
              {columns.map((column) => (
                <div key={column.field} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`col-${column.field}`}
                    checked={visibleColumns.includes(column.field)}
                    onChange={() => toggleColumnVisibility(column.field)}
                    className="mr-2"
                  />
                  <label htmlFor={`col-${column.field}`}>
                    {column.headerName}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Filter menu */}
      {showFilterMenu && (
        <div
          className="fixed inset-0 z-30 flex items-start justify-center pt-20"
          onClick={() => setShowFilterMenu(false)}
        >
          <div
            ref={filterMenuRef}
            className="bg-white shadow-lg rounded-md w-80 p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-semibold mb-2">Filter Orders</h3>
            <div className="space-y-4">
              {columns.map((column) => (
                <div key={column.field} className="space-y-1">
                  <label className="block text-sm font-medium">
                    {column.headerName}
                  </label>
                  <input
                    type="text"
                    placeholder={`Filter by ${column.headerName.toLowerCase()}`}
                    className="w-full border border-gray-300 rounded-md px-3 py-2"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        addFilter(
                          column.field,
                          (e.target as HTMLInputElement).value
                        );
                      }
                    }}
                  />
                </div>
              ))}
              <div className="flex justify-between">
                <button
                  className="px-3 py-1 bg-gray-100 rounded-md"
                  onClick={clearAllFilters}
                >
                  Clear All
                </button>
                <button
                  className="px-3 py-1 bg-blue-600 text-white rounded-md"
                  onClick={() => setShowFilterMenu(false)}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <UnifiedPopover
        isOpen={popoverOpen}
        onClose={() => setPopoverOpen(false)}
        data={popoverOrder}
        type="order"
        anchorEl={popoverAnchorEl}
      />

      {/* Modal */}
      {isModalOpen &&
        (modalMode === "payment" ? (
          <CustomModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            mode="payment"
            onSave={handleSave}
            title={selectedOrder?.orderId || "Order Details"}
            size="sm"
            showFooter={true}
            paymentDetails={preparePaymentDetails()}
            confirmText="Save"
          />
        ) : (
          <CustomModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            mode={modalMode}
            onSave={handleSave}
            title={modalMode === "add" ? "Create Order" : "Edit Order"}
            fields={modalFields}
            size="sm"
            showToggle={false}
            confirmText={modalMode === "add" ? "Create" : "Save"}
          />
        ))}
    </div>
  );
};

export default Orders;
