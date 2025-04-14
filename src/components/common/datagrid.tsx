import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  Search,
  PenSquare,
  Trash2,
  Filter,
  Download,
  Check,
  X,
} from "lucide-react";
import Burger from "../../lib/Images/Burger.png";
import SortIcon from "../../lib/Images/Icon.svg";
import OrderDetailPage from "../orders/ordersdetails";
interface Column {
  field: string;
  headerName: string;
  width?: string;
  renderCell?: (value: any, row: any) => React.ReactNode;
  visible?: boolean;
  type?: "text" | "date" | "number"; // Added type property to identify date columns
}

interface Row {
  id: string;
  [key: string]: any;
}

interface Filter {
  field: string;
  value: string;
  type?: "text" | "date" | "number";
  dateOperator?: "equals" | "before" | "after" | "between";
  endDate?: string;
}

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

// Interface for DataGridProps with new props
interface DataGridProps {
  columns: Column[];
  rows: Row[];
  pageSize?: number;
  onSelectAll: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectRow: (id: string) => void;
  selectedRows: string[];
  searchPlaceholder?: string;
  hideToolbar?: boolean;
  showActionColumn?: boolean;
  onEdit?: (row: Row) => void;
  onDelete?: (row: Row) => void;
  enableDateFilters?: boolean;
  showCheckboxes?: boolean;

  // Add new props for date range and density
  dateRange?: {
    label: string;
    startDate: string;
    endDate: string;
    onDateChange: (startDate: string, endDate: string) => void;
  };

  densityOptions?: {
    currentDensity: "compact" | "standard" | "comfortable";
    onDensityChange: (density: "compact" | "standard" | "comfortable") => void;
  };

  // New prop to control ordering of toolbar buttons
  densityFirst?: boolean;
}

// Mobile view detection hook
const useMobileView = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 500);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
};

const CustomDataGrid: React.FC<DataGridProps> = ({
  columns: initialColumns,
  rows,
  pageSize = 10,
  onSelectAll,
  onSelectRow,
  selectedRows,
  searchPlaceholder = "Search",
  hideToolbar = false,
  showActionColumn = false,
  onEdit,
  onDelete,
  enableDateFilters = false,
  dateRange,
  densityOptions,
  densityFirst = false, // Default to false for backward compatibility
  showCheckboxes = false,
}) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [columns, setColumns] = useState(
    initialColumns.map((column) => ({
      ...column,
      visible: true,
      type: column.type || "text", // Default type to text if not specified
    }))
  );
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [activeFilters, setActiveFilters] = useState<Filter[]>([]);
  const [currentPageSize, setCurrentPageSize] = useState(pageSize);
  const [showColumnMenu, setShowColumnMenu] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [showDensityMenu, setShowDensityMenu] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedFilterField, setSelectedFilterField] = useState("");
  const [selectedFilterType, setSelectedFilterType] = useState<
    "text" | "date" | "number"
  >("text");
  const [showOrderDetailsView, setShowOrderDetailsView] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
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
  const [dateOperator, setDateOperator] = useState<
    "equals" | "before" | "after" | "between"
  >("equals");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [localStartDate, setLocalStartDate] = useState("");
  const [localEndDate, setLocalEndDate] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);

  // Check if we're on mobile
  const isMobile = useMobileView();

  // Refs for handling outside clicks
  const columnMenuRef = useRef<HTMLDivElement>(null);
  const filterMenuRef = useRef<HTMLDivElement>(null);
  const densityMenuRef = useRef<HTMLDivElement>(null);
  const datePickerRef = useRef<HTMLDivElement>(null);

  // Helper function to compare dates
  const compareDates = (
    rowDate: string,
    filterDate: string,
    operator: string
  ): boolean => {
    try {
      const date1 = new Date(rowDate).getTime();
      const date2 = new Date(filterDate).getTime();

      if (isNaN(date1) || isNaN(date2)) return false;

      switch (operator) {
        case "equals":
          // Only compare yyyy-mm-dd part for equality
          return rowDate.split("T")[0] === filterDate.split("T")[0];
        case "before":
          return date1 < date2;
        case "after":
          return date1 > date2;
        default:
          return false;
      }
    } catch (e) {
      return false;
    }
  };
  useEffect(() => {
    console.log(
      "State updated - sortColumn:",
      sortColumn,
      "sortOrder:",
      sortOrder
    );
    // This empty useEffect will help verify that state changes are happening
  }, [sortColumn, sortOrder]);

  // Filter rows based on search value and active filters
  const filteredRows = useMemo(() => {
    console.log(
      "Recalculating filteredRows with sortColumn:",
      sortColumn,
      "sortOrder:",
      sortOrder
    );
    let filtered = [...rows]; // Start with a fresh copy

    // Apply search filter
    if (searchValue) {
      const searchLower = searchValue.toLowerCase();
      filtered = filtered.filter((row) => {
        return columns.some((column) => {
          if (!column.visible) return false;
          const value = row[column.field];
          if (value == null) return false;
          return String(value).toLowerCase().includes(searchLower);
        });
      });
    }

    // Apply column-specific filters
    if (activeFilters.length > 0) {
      filtered = filtered.filter((row) => {
        return activeFilters.every((filter) => {
          const value = row[filter.field];
          if (value == null) return false;

          // Handle date filters
          if (filter.type === "date") {
            if (filter.dateOperator === "between" && filter.endDate) {
              const rowDate = new Date(value).getTime();
              const startFilterDate = new Date(filter.value).getTime();
              const endFilterDate = new Date(filter.endDate).getTime();

              return rowDate >= startFilterDate && rowDate <= endFilterDate;
            } else {
              return compareDates(
                value,
                filter.value,
                filter.dateOperator || "equals"
              );
            }
          }

          // Handle text and number filters
          return String(value)
            .toLowerCase()
            .includes(filter.value.toLowerCase());
        });
      });
    }
    if (sortOrder) {
      console.log("Applying sort:", sortColumn, sortOrder);

      filtered = [...filtered].sort((a, b) => {
        let valueA, valueB;

        // When Store ID is clicked, sort by name instead
        if (sortColumn === "Store ID") {
          console.log("Store ID clicked, sorting by name");
          valueA = a.name || "";
          valueB = b.name || "";
        } else if (sortColumn === "Order ID") {
          valueA = a.store || "";
          valueB = b.deliveryAddress || "";
        }
        // else {
        //   // Fallback to previous behavior
        //   valueA = a.name || a.storeId || a.store || "";
        //   valueB = b.name || b.storeId || b.store || "";
        // }
        // Debug values
        console.log("Comparing:", valueA, valueB);

        // Handle case where both values are empty
        if (!valueA && !valueB) return 0;
        if (!valueA) return 1;
        if (!valueB) return -1;

        // Apply sort direction
        const compareResult = valueA
          .toString()
          .localeCompare(valueB.toString());
        return sortOrder === "desc" ? compareResult : -compareResult;
      });
    }
    return filtered;
  }, [rows, columns, searchValue, activeFilters, sortOrder, sortColumn]);

  // Handle column visibility toggle
  const toggleColumnVisibility = (field: string) => {
    setColumns((prev) =>
      prev.map((col) =>
        col.field === field ? { ...col, visible: !col.visible } : col
      )
    );
  };

  // Handle field selection for filters
  const handleFilterFieldChange = (field: string) => {
    setSelectedFilterField(field);
    const selectedColumn = columns.find((col) => col.field === field);
    setSelectedFilterType(selectedColumn?.type || "text");

    // Reset date-specific states when changing fields
    if (selectedColumn?.type !== "date") {
      setDateOperator("equals");
      setStartDate("");
      setEndDate("");
    }
  };
  // Handle adding a filter
  const addFilter = (field: string, value: string) => {
    if (!field || field === "" || !value) return;
    const column = columns.find((col) => col.field === field);
    if (!column) return;
    // Check if filter already exists
    const existingFilterIndex = activeFilters.findIndex(
      (f) => f.field === field
    );

    const newFilter: Filter = {
      field,
      value,
      type: column.type || "text",
    };

    // Add date-specific properties if it's a date filter
    if (column.type === "date") {
      newFilter.dateOperator = dateOperator;
      if (dateOperator === "between") {
        newFilter.endDate = endDate;
      }
    }

    if (existingFilterIndex >= 0) {
      // Update existing filter
      const updatedFilters = [...activeFilters];
      updatedFilters[existingFilterIndex] = newFilter;
      setActiveFilters(updatedFilters);
    } else {
      // Add new filter
      setActiveFilters([...activeFilters, newFilter]);
    }
    // Reset filter form
    setShowFilterMenu(false);
    setSelectedFilterField("");
    setDateOperator("equals");
    setStartDate("");
    setEndDate("");
  };

  // Handle removing a filter
  const removeFilter = (field: string) => {
    setActiveFilters(activeFilters.filter((f) => f.field !== field));
  };
  // Handle export to CSV
  const exportToCSV = () => {
    // Get visible columns
    const visibleColumns = columns.filter((col) => col.visible);
    // Create header row
    const headerRow = visibleColumns.map((col) => col.headerName);
    // Create data rows
    const dataRows = filteredRows.map((row) => {
      return visibleColumns.map((col) => {
        const value = row[col.field];

        // Handle special cases
        if (col.field === "status") {
          return value;
        } else if (col.field === "amount" && typeof value === "number") {
          return value.toFixed(2);
        } else if (
          col.field === "date" ||
          col.field === "transactionDate" ||
          col.field === "createdOn"
        ) {
          return value;
        } else {
          return value !== null && value !== undefined ? String(value) : "";
        }
      });
    });

    // Combine header and data rows
    const csvContent = [
      headerRow.join(","),
      ...dataRows.map((row) => row.join(",")),
    ].join("\n");

    // Create blob and download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "DataExport.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Close menus when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
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
        densityMenuRef.current &&
        !densityMenuRef.current.contains(event.target as Node)
      ) {
        setShowDensityMenu(false);
      }
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target as Node)
      ) {
        setShowDatePicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchValue, activeFilters]);

  // Initialize local date state from props when component mounts
  React.useEffect(() => {
    if (dateRange) {
      setLocalStartDate(dateRange.startDate);
      setLocalEndDate(dateRange.endDate);
    }
  }, [dateRange]);

  const renderStatus = (status: string) => {
    const statusStyles = {
      Paid: "text-customWhiteColor bg-green border border-custom80px",
      Pending: "text-yellow bg-yellow border border-custom80px",
      Failed: "text-customWhite bg-maroon border border-custom80px",
    };
    return (
      <span
        className={`px-3 py-1 rounded-full text-[14px] font-inter font-[500] ${
          statusStyles[status as keyof typeof statusStyles]
        }`}
      >
        {status}
      </span>
    );
  };

  const renderCell = (column: Column, row: Row) => {
    if (column.renderCell) {
      return column.renderCell(row[column.field], row);
    }
    if (column.field === "status") {
      return renderStatus(row[column.field]);
    }
    if (
      column.field === "date" ||
      column.field === "transactionDate" ||
      column.field === "createdOn"
    ) {
      return (
        <div>
          <div className="text-[14px] font-inter font-[500] text-cardValue leading-[21px]">
            {row[column.field]}
          </div>
          <div className="text-[11px] font-[400] font-inter text-cardTitle">
            {row.time}
          </div>
        </div>
      );
    }
    if (column.field === "amount") {
      return `${
        typeof row[column.field] === "number"
          ? row[column.field].toFixed(2)
          : row[column.field]
      }`;
    }

    return row[column.field];
  };
  const handleOrderIdClick = (
    event: React.MouseEvent<HTMLButtonElement>,
    order: Order
  ) => {
    console.log("hiOrer");
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

  // Function to prepare payment details for the modal

  // Handler for popover arrow click (show full details)
  const handleShowFullDetails = () => {
    console.log("datagrid");
    setShowOrderDetailsView(true); // Now we hide the main view
  };
  // Handler for closing store details view
  const handleCloseOrderDetails = () => {
    // console.log("BACKBUTTON ORDER")
    setPopoverOpen(false);
    setShowOrderDetailsView(false);
  };

  // Custom StorePopover component for the initial click
  const OrderPopover = () => {
    console.log("POPOVER");
    if (!popoverOpen || !popoverOrder) return null;
    // If showOrderDetailsView is true, don't show the popover
    if (showOrderDetailsView) return null;
    // Calculate position based on the anchor element
    const anchorRect = popoverAnchorEl
      ? popoverAnchorEl.getBoundingClientRect()
      : null;
    // Different positioning for mobile vs desktop
    const popoverStyle = anchorRect
      ? {
          position: "fixed" as const,
          top: isMobile
            ? "50%" // Center vertically on mobile
            : `${anchorRect.bottom + window.scrollY + 1}px`, // Normal positioning on desktop
          left: isMobile
            ? "20px" // Fixed distance from left edge on mobile
            : `${anchorRect.left + window.scrollX}px`, // Normal positioning on desktop
          transform: isMobile
            ? "translateY(-50%)" // Center vertically on mobile
            : "none", // No transform on desktop
          width: isMobile ? "85%" : "300px", // Wider on desktop
          maxWidth: "350px",
          zIndex: 1000,
        }
      : {};
    const store = popoverOrder;
    const items = store.items || [];
    // Calculate total dynamically if items exist
    const calculateTotal = () => {
      if (items.length === 0) {
        return store.amount;
      }
      const total = items.reduce((sum, item) => {
        const priceValue = parseFloat(item.price.replace(/[^0-9.]/g, ""));
        return sum + priceValue * item.quantity;
      }, 0);
      const currencySymbol = store.amount.match(/[^0-9.]/g)?.[0] || "₹";
      return `${currencySymbol}${(total / 2).toFixed(2)}`;
    };
    const total = calculateTotal();
    return (
      <div
        className={`fixed z-50 bg-white rounded-lg shadow-xl border border-gray-200 ${
          isMobile ? "max-h-[80vh] overflow-auto" : ""
        }`}
        style={popoverStyle}
        onClick={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* Store ID Header */}
        <div className="flex justify-between items-center p-3 border-b">
          <h2 className="text-headding-color text-[12px] font-inter font-[500]">
            {store.orderId}
          </h2>
          <button
            onClick={handleShowFullDetails}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
        {/* Store Details Section */}
        <div className="p-4">
          {/* Popular Items Section (if items exist) */}
          {items.length > 0 && (
            <div>
              <div className="flex justify-between items-center">
                <span className="text-headding-color text-[12px] font-inter font-[500] mb-3">
                  Store Items
                </span>
              </div>
              <div className="space-y-4 mt-3">
                {items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gray-100 rounded-md overflow-hidden mr-3 flex items-center justify-center">
                        <img src={Burger} alt={item.name} className="w-8 h-8" />
                      </div>
                      <div>
                        <span>
                          <p className="text-[12px] font-inter font-[500] text-cardValue">
                            {item.name}
                          </p>
                          <p className="text-[12px] font-inter font-[500] text-headding-color">
                            x {item.quantity}
                          </p>
                        </span>
                      </div>
                    </div>
                    <div className="text-[12px] font-inter font-[500] text-cardValue">
                      {item.price}
                    </div>
                  </div>
                ))}
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-grey-border">
                  <span className="text-[12px] font-inter font-[500] text-cardValue">
                    Grand Total
                  </span>
                  <span className="text-[12px] font-inter font-[500] text-cardValue">
                    {total}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  if (showOrderDetailsView && popoverOrder) {
    return (
      <div className="p-0 max-w-full rounded-l sm:max-h-full md:max-h-full lg:max-h-full xl:max-h-full max-h-[80vh] overflow-y-auto bg-background-grey">
        <OrderDetailPage
          orderId={popoverOrder.orderId}
          orderStatus="Prepaid" // Assuming default status
          orderDate={popoverOrder.scheduleDate}
          orderTime={popoverOrder.scheduleTime}
          storeName={popoverOrder.store}
          items={popoverOrder.items || []}
          customerId="#987678390" // Example or placeholder values
          storePhone="+91 810 230 8108"
          customerEmail="amanofficial0502@gmail.com"
          customerRating="N/A"
          deliveryMode={popoverOrder.deliveryMode}
          homeDelivery="Home Delivery" // Add this as it's in your OrderDetailsExact interface
          itemTotal={popoverOrder.amount}
          gst="₹36.00"
          processingFee="₹2.00"
          platformFee="₹1.00"
          deliveryCharge="₹10.00"
          discount="- ₹30.00"
          grandTotal="₹319.00"
          onBackClick={handleCloseOrderDetails}
        />
      </div>
    );
  }
  // Mobile card view rendering
  const renderMobileCard = (row: Row) => {
  const visibleColumns = columns.filter((col) => col.visible);
    // Check if this is a store card or order card
    const isStoreCard = row.storeId !== undefined || row.rating !== undefined;
    const isOrderCard =
      row.orderId !== undefined ||
      (row.amount !== undefined && row.deliveryMode !== undefined);
    // Store Card (Image 1)
    if (isStoreCard) {
      // Status style mapping
      const statusStyles = {
        "Active": "bg-green text-white",
        "Pending": "bg-yellow text-white",
        // Add other status styles as needed
      };
      // Get status style or default to Active style
      const statusStyle = statusStyles[row.status as keyof typeof statusStyles] || statusStyles["Active"];
      return (
        <div className="bg-white rounded-md shadow-sm mb-3 border border-gray-100">
          <div className="p-4">
            {/* Row 1: Store ID and Ratings */}
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center">
                {showCheckboxes && (
                  <div className="mr-3">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(row.id)}
                      onChange={() => onSelectRow(row.id)}
                      className="h-5 w-5 rounded border-gray-300 text-green-600 accent-bgButton focus:ring-bgButton transition"
                    />
                  </div>
                )}
                <div>
                  <div className="text-cardTitle text-[12px] font-inter font-[500] pb-2">
                    Store ID
                  </div>
                  <div className="text-cardValue font-inter font-[600] text-[16px]">
                    {row.storeId || row.id}
                  </div>
                </div>
              </div>
              <div>
                <div className="text-cardTitle text-[12px] font-inter font-[500] pb-2 text-right">
                  Ratings
                </div>
                <div className="bg-bgActive px-3 py-1 rounded-md text-customWhiteColor font-inter font-[600] text-[12px] flex items-center">
                  {row.rating || "3.5"}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4 ml-1"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
            {/* Row 2: Status and Store */}
            <div className="flex justify-between items-start">
              <div>
                <div className="text-cardTitle text-[12px] font-inter font-[500] pb-2">
                  Status
                </div>
                <div className={`${row.status === "Pending" ? "bg-yellow text-yellow" : "bg-green"} text-customWhiteColor font-inter font-[500] text-[14px] px-3 py-1 rounded-md inline-block`}>
                  {row.status || "Active"}
                </div>
              </div>
              <div>
                <div className="text-cardTitle text-[12px] font-inter font-[500] pb-2 text-right">
                  Store
                </div>
                <div className="text-cardValue font-inter font-[500] text-[14px] text-right">
                  {row.store || "Queenstown Public House"}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    else if (isOrderCard) {
      const orderData: Order = {
        id: row.id || "",
        orderId: row.orderId || row.id || "",
        amount: row.amount || "100.00",
        status:
          (row.status as
            | ""
            | "Pending"
            | "Completed"
            | "Dispatched"
            | "Cancelled"
            | "Out for delivery") || "Pending",
        store: row.store || "Queenstown Public House",
        deliveryAddress:
          row.deliveryAddress || "6391 Elgin St. Celina, Delaware 10299",
        deliveryMode: row.deliveryMode || "Home delivery",
        scheduleTime: row.scheduleTime || "Jan 26 at 06:30 PM",
        scheduleDate: row.scheduleDate || "",
        paymentMethod:
          (row.paymentMethod as "Cash" | "UPI" | "Credit Card") || "Cash",
      };
      // Payment method color mapping
      const paymentMethodColors = {
        Cash: "bg-bgActive rounded-custom4x text-customWhiteColor font-inter font-[600]",
        UPI: "bg-yellow rounded-custom4x text-yellow font-inter font-[600]",
        "Credit Card": "bg-blueCredit rounded-custom4x text-primaryCredit font-inter font-[600]",
      };
      const statusStyleMap = {
        Completed: "bg-customBackgroundColor text-green",
        "Out for delivery": "bg-primary text-primary",
        Cancelled: "bg-bgCrossIcon text-maroon",
        Pending: "bg-orangeColor text-yellow",
        // Add any other statuses you need
      };
      // Get payment method color class or default to green
      const paymentColor =
        paymentMethodColors[
          orderData.paymentMethod as keyof typeof paymentMethodColors
        ] || "bg-green";
      // Decide whether to show action buttons or status
      const showActionButtons = !row.status || row.status === "";

      return (
        <div className="bg-white rounded-md mb-3 ">
          <div className="p-3">
            {/* Row 1: Order ID and Amount */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="text-cardTitle text-[12px] font-inter font-[500] pb-2">
                  Order ID
                </div>
                <div className="text-cardValue font-inter font-[500] text-[16px] flex items-center">
                  {row.orderId || row.id}
                  <button
                    className="ml-2"
                    onClick={(e) => handleOrderIdClick(e, orderData)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                </div>
              </div>
              <div>
                <div className="text-cardTitle text-[12px] font-inter font-[500] text-right pb-2">
                  Amount
                </div>
                <div className="flex items-center justify-end">
                  <div className="text-cardValue font-inter font-[500] text-[16px] mr-2">
                    {row.amount || "100.00"}
                  </div>
                  <div
                    className={`${paymentColor} text-white px-2 py-1 rounded-custom4px text-[14px] font-inter font-[500]`}
                  >
                    {row.paymentMethod || "Cash"}
                  </div>
                </div>
              </div>
            </div>
            {/* Row 2: Store and Schedule Time */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="text-cardTitle text-[12px] font-inter font-[500] pb-2">
                  Store
                </div>
                <div className="text-cardValue font-inter font-[500] text-[14px]">
                  {row.store || "Queenstown Public House"}
                </div>
              </div>
              <div>
                <div className="text-cardTitle text-[12px] font-inter font-[500] text-right">
                  Schedule Time
                </div>
                <div className="text-cardValue font-inter font-[500] text-[12px] text-right">
                  {row.scheduleTime || "Jan 26 at 06:30 PM"}
                </div>
              </div>
            </div>
            {/* Row 3: Delivery Mode and Delivery Address */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="text-cardTitle text-[12px] font-inter font-[500] pb-2">
                  Delivery Mode
                </div>
                <div className="bg-subMenus py-1 px-3 rounded-custom80px text-center whitespace-nowrap text-cardValue font-inter font-[600] text-[12px] inline-block">
                  {row.deliveryMode || "Home delivery"}
                </div>
              </div>
              <div>
                <div className="text-cardTitle text-[12px] font-inter font-[500] text-right pb-2">
                  Delivery Address
                </div>
                <div className="text-cardValue font-inter font-[500] text-[12px] text-right">
                  {row.deliveryAddress ||
                    "6391 Elgin St. Celina, Delaware 10299"}
                </div>
              </div>
            </div>
          </div>
          {/* Conditional rendering based on status */}
          {showActionButtons && (
            <div className="flex border-b border-grey-border py-2">
              <button className="flex bg-bgred text-white py-3 flex items-center justify-center font-inter font-[500] text-[12px] rounded-custom mx-4 px-4">
                Reject
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 ml-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <button className="flex-1 bg-bgActive text-white py-3 flex items-center justify-center font-inter font-[500] text-[12px] rounded-custom">
                Accept
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 ml-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              </button>
            </div>
          )}
          {/* For any other status, we could add similar conditions */}
          {row.status && row.status !== "" && (
            <div
              className={`px-3 mx-3 py-2 rounded-custom80px text-center font-inter text-[12px] font-[600] whitespace-nowrap border-t border-gray-200 ${
                statusStyleMap[row.status as keyof typeof statusStyleMap] ||
                "bg-gray-100 text-gray-800"
              }`}
            >
              {row.status}
            </div>
          )}
        </div>
      );
    }
    else {
      const displayFields = visibleColumns.filter(col => col.visible);
      // A simple function to chunk the array into pairs
      const chunkedFields = [];
      for (let i = 0; i < displayFields.length; i += 2) {
        chunkedFields.push(displayFields.slice(i, i + 2));
      }
      return (
        <div className="bg-white rounded-md shadow-sm mb-3 border border-gray-100">
          <div className="p-4">
            {chunkedFields.map((pair, index) => (
              <div key={index} className="flex justify-between mb-6">
                {/* First column */}
                <div>
                  <div className="text-gray-500 text-[14px] font-inter pb-5 px-3">
                    {pair[0].headerName}
                  </div>
                  <div className="text-cardValue font-inter font-[500] text-[14px] ">
                    {renderCell(pair[0], row)}
                  </div>
                </div>
                
                {/* Second column (if exists) */}
                {pair.length > 1 && (
                  <div>
                    <div className="text-gray-500 text-[14px] font-inter text-right pb-6">
                      {pair[1].headerName}
                    </div>
                    <div className="text-cardValue font-inter font-[500] text-[14px] text-right">
                      {renderCell(pair[1], row)}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }

    // Fallback for other card types - simplified version of your original
    // else {
    //   const displayFields = visibleColumns.map((col) => ({
    //     field: col.field,
    //     headerName: col.headerName,
    //     column: col,
    //   }));

    //   return (
    //     <div className="bg-white rounded-md shadow-sm mb-3 border border-gray-100">
    //       <div className="p-3">
    //         {/* Two-column layout for mobile */}
    //         {displayFields
    //           .filter((item) => ![""].includes(item.field))
    //           .map((item, index) => (
    //             <div
    //               key={item.field}
    //               className={`flex justify-between items-start mb-2 pb-2 ${
    //                 index !== displayFields.length - 1
    //                   ? "border-b border-gray-100"
    //                   : ""
    //               }`}
    //             >
    //               <div className="text-gray-500 text-[14px] font-inter">
    //                 {item.headerName}
    //               </div>
    //               <div className="text-cardValue font-inter font-[500] text-[14px] text-right ml-2">
    //                 {renderCell(item.column, row)}
    //               </div>
    //             </div>
    //           ))}
    //       </div>
    //     </div>
    //   );
    // }
  };

  // Function to format filter display text
  const formatFilterDisplay = (filter: Filter): string => {
    if (filter.type === "date") {
      switch (filter.dateOperator) {
        case "equals":
          return `equals ${filter.value}`;
        case "before":
          return `before ${filter.value}`;
        case "after":
          return `after ${filter.value}`;
        case "between":
          return `between ${filter.value} and ${filter.endDate}`;
        default:
          return filter.value;
      }
    }
    return filter.value;
  };

  // Render density button
  const renderDensityButton = () => {
    if (!densityOptions) return null;

    return (
      <div className="relative">
        <button
          className="flex items-center gap-2 text-[14px] font-inter font-[500] text-textHeading"
          onClick={() => setShowDensityMenu(!showDensityMenu)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
          >
            <path
              d="M12.25 4.66659H1.75V2.33325H12.25V4.66659ZM12.25 5.83325H1.75V8.16659H12.25V5.83325ZM12.25 9.33325H1.75V11.6666H12.25V9.33325Z"
              fill="#636363"
            />
          </svg>
          {isMobile && (
            <span className="text-[14px] font-inter font-[500] text-textHeading">
              Density
            </span>
          )}
          {!isMobile && (
            <span className="text-[14px] font-inter font-[500] text-textHeading">
              Density
            </span>
          )}
        </button>

        {showDensityMenu && (
          <div
            className="absolute z-10 mt-2 w-40 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            ref={densityMenuRef}
          >
            <div className="py-1">
              <button
                className={`block w-full text-left px-4 py-2 text-[12px] font-inter font-[500] text-textHeading ${
                  densityOptions.currentDensity === "comfortable"
                    ? "bg-gray-100"
                    : ""
                }`}
                onClick={() => {
                  densityOptions.onDensityChange("comfortable");
                  setShowDensityMenu(false);
                }}
              >
                Comfortable
              </button>
              <button
                className={`block w-full text-left px-4 py-2 text-[12px] font-inter font-[500] text-textHeading ${
                  densityOptions.currentDensity === "standard"
                    ? "bg-gray-100"
                    : ""
                }`}
                onClick={() => {
                  densityOptions.onDensityChange("standard");
                  setShowDensityMenu(false);
                }}
              >
                Standard
              </button>
              <button
                className={`block w-full text-left px-4 py-2 text-[12px] font-inter font-[500] text-textHeading ${
                  densityOptions.currentDensity === "compact"
                    ? "bg-gray-100"
                    : ""
                }`}
                onClick={() => {
                  densityOptions.onDensityChange("compact");
                  setShowDensityMenu(false);
                }}
              >
                Compact
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };
  // Render date range selector
  const renderDateRangeSelector = () => {
    if (!dateRange) return null;
    return (
      <div className="relative">
        <button
          className="flex items-center gap-2 text-[12px] font-inter font-[500] text-textHeading px-3 py-1"
          onClick={() => setShowDatePicker(!showDatePicker)}
        >
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
              d="M4.20039 1.3999C3.81379 1.3999 3.50039 1.7133 3.50039 2.0999V2.7999H2.80039C2.02719 2.7999 1.40039 3.4267 1.40039 4.1999V11.1999C1.40039 11.9731 2.02719 12.5999 2.80039 12.5999H11.2004C11.9736 12.5999 12.6004 11.9731 12.6004 11.1999V4.1999C12.6004 3.4267 11.9736 2.7999 11.2004 2.7999H10.5004V2.0999C10.5004 1.7133 10.187 1.3999 9.80039 1.3999C9.41379 1.3999 9.10039 1.7133 9.10039 2.0999V2.7999H4.90039V2.0999C4.90039 1.7133 4.58699 1.3999 4.20039 1.3999ZM4.20039 4.8999C3.81379 4.8999 3.50039 5.2133 3.50039 5.5999C3.50039 5.9865 3.81379 6.2999 4.20039 6.2999H9.80039C10.187 6.2999 10.5004 5.9865 10.5004 5.5999C10.5004 5.2133 10.187 4.8999 9.80039 4.8999H4.20039Z"
              fill="#636363"
            />
          </svg>
          {dateRange.label}
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
              d="M3.70503 5.10493C3.97839 4.83156 4.42161 4.83156 4.69497 5.10493L7 7.40995L9.30503 5.10493C9.57839 4.83156 10.0216 4.83156 10.295 5.10493C10.5683 5.37829 10.5683 5.82151 10.295 6.09488L7.49497 8.89488C7.22161 9.16824 6.77839 9.16824 6.50503 8.89488L3.70503 6.09488C3.43166 5.82151 3.43166 5.37829 3.70503 5.10493Z"
              fill="#212121"
            />
          </svg>
        </button>
        {showDatePicker && (
          <div
            className="absolute z-10 mt-2 p-4 bg-white shadow-lg rounded-md border border-gray-200"
            ref={datePickerRef}
          >
            <div className="space-y-4">
              <div>
                <label className="block text-[12px] font-inter font-[500] text-textHeading mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  className="block w-full rounded-md border-gray-300 text-[12px] font-inter font-[500] text-textHeading shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={localStartDate}
                  onChange={(e) => setLocalStartDate(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-[12px] font-inter font-[500] text-textHeading mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  className="block w-full text-[12px] font-inter font-[500] text-textHeading rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={localEndDate}
                  onChange={(e) => setLocalEndDate(e.target.value)}
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-[12px] font-inter font-[500]  rounded-md shadow-sm text-whiteColor bg-bgButton hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => {
                    if (localStartDate && localEndDate) {
                      dateRange.onDateChange(localStartDate, localEndDate);
                      setShowDatePicker(false);
                    }
                  }}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  // Desktop pagination
  const renderPagination = () => {
    return (
      <div className="p-4 flex justify-between sm:w-full items-center border-t border-gray-200">
        <span className="text-[14px] font-inter font-[500] text-headding-color">
          Showing result {Math.min(currentPageSize, filteredRows.length)} out of{" "}
          {rows.length}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            className="p-2 hover:bg-gray-100 rounded"
            disabled={currentPage === 1}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.7071 5.29289C13.0976 5.68342 13.0976 6.31658 12.7071 6.70711L9.41421 10L12.7071 13.2929C13.0976 13.6834 13.0976 14.3166 12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L7.29289 10.7071C6.90237 10.3166 6.90237 9.68342 7.29289 9.29289L11.2929 5.29289C11.6834 4.90237 12.3166 4.90237 12.7071 5.29289Z"
                fill="#4A4A4A"
              />
            </svg>
          </button>
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="p-2 hover:bg-gray-100 rounded"
            disabled={currentPage * currentPageSize >= filteredRows.length}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.29289 14.7071C6.90237 14.3166 6.90237 13.6834 7.29289 13.2929L10.5858 10L7.29289 6.70711C6.90237 6.31658 6.90237 5.68342 7.29289 5.29289C7.68342 4.90237 8.31658 4.90237 8.70711 5.29289L12.7071 9.29289C13.0976 9.68342 13.0976 10.3166 12.7071 10.7071L8.70711 14.7071C8.31658 15.0976 7.68342 15.0976 7.29289 14.7071Z"
                fill="#4A4A4A"
              />
            </svg>
          </button>
          <select
            className="ml-2 px-4 py-4 border border-gray-200 rounded-custom text-[12px] bg-reloadBackground"
            value={currentPageSize}
            onChange={(e) => {
              setCurrentPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            <option value={10} className="text-[12px] bg-reloadBackground">
              10
            </option>
            <option value={20} className="text-[12px] bg-reloadBackground">
              20
            </option>
            <option value={50} className="text-[12px] bg-reloadBackground">
              50
            </option>
          </select>
        </div>
      </div>
    );
  };
  return (
    <div className="w-full border border-grey-border bg-backgroundWhite rounded-custom8px mb-10">
      {popoverOpen && <OrderPopover />}
      {isMobile && (
        <div className="p-4 bg-white border-b border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-[14px] font-inter font-[500] text-gray-700">
              Showing result 10 out of 50
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                className="p-1 hover:bg-gray-100 rounded"
                disabled={currentPage === 1}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12.7071 5.29289C13.0976 5.68342 13.0976 6.31658 12.7071 6.70711L9.41421 10L12.7071 13.2929C13.0976 13.6834 13.0976 14.3166 12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L7.29289 10.7071C6.90237 10.3166 6.90237 9.68342 7.29289 9.29289L11.2929 5.29289C11.6834 4.90237 12.3166 4.90237 12.7071 5.29289Z"
                    fill="#4A4A4A"
                  />
                </svg>
              </button>
              <button
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="p-1 hover:bg-gray-100 rounded"
                disabled={currentPage * currentPageSize >= filteredRows.length}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.29289 14.7071C6.90237 14.3166 6.90237 13.6834 7.29289 13.2929L10.5858 10L7.29289 6.70711C6.90237 6.31658 6.90237 5.68342 7.29289 5.29289C7.68342 4.90237 8.31658 4.90237 8.70711 5.29289L12.7071 9.29289C13.0976 9.68342 13.0976 10.3166 12.7071 10.7071L8.70711 14.7071C8.31658 15.0976 7.68342 15.0976 7.29289 14.7071Z"
                    fill="#4A4A4A"
                  />
                </svg>
              </button>
              <div className="relative">
                <select
                  className="appearance-none px-4 py-2 border border-gray-200 rounded-md text-[14px] bg-gray-100 pr-8"
                  value={currentPageSize}
                  onChange={(e) => {
                    setCurrentPageSize(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M4 6L8 10L12 6"
                      stroke="#687182"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {!hideToolbar && (
        <div className="p-4 border-b border-gray-200 flex flex-wrap justify-between items-center gap-2">
          <div className="flex flex-wrap items-center gap-5">
            {/* Column toggle button */}
            <div className="relative">
              <button
                className="flex items-center gap-2 text-[14px] font-inter font-[500] text-textHeading"
                onClick={() => {
                  setShowColumnMenu(!showColumnMenu);
                  setShowFilterMenu(false);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    d="M8.5575 2.91666V11.0833H5.4425V2.91666H8.5575ZM9.14083 11.0833H12.25V2.91666H9.14083V11.0833ZM4.85917 11.0833V2.91666H1.75V11.0833H4.85917Z"
                    fill="#636363"
                  />
                </svg>
                {isMobile && (
                  <span className="text-[14px] font-inter font-[500] text-textHeading">
                    Column
                  </span>
                )}
                {!isMobile && (
                  <span className="text-[14px] font-inter font-[500] text-textHeading">
                    Column
                  </span>
                )}
              </button>

              {showColumnMenu && (
                <div
                  ref={columnMenuRef}
                  className="absolute z-10 mt-2 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <div className="py-1 px-2">
                    {columns.map((column) => (
                      <div
                        key={column.field}
                        className="flex items-center px-2 py-2"
                      >
                        <input
                          type="checkbox"
                          id={`column-${column.field}`}
                          checked={column.visible}
                          onChange={() => toggleColumnVisibility(column.field)}
                          className="h-4 w-4 rounded border-gray-300 focus:ring-bgButton accent-bgButton"
                        />
                        <label
                          htmlFor={`column-${column.field}`}
                          className="ml-2 text-[12px] text-reloadButton font-inter"
                        >
                          {column.headerName}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {/* Filter button */}
            <div className="relative">
              <button
                className="flex items-center gap-2 text-[14px] font-inter font-[500] text-textHeading"
                onClick={() => {
                  setShowFilterMenu(!showFilterMenu);
                  setShowColumnMenu(false);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    d="M4.085 9.49926C4.1883 9.20657 4.37987 8.95312 4.6333 8.77384C4.88673 8.59456 5.18954 8.49828 5.5 8.49828C5.81046 8.49828 6.11327 8.59456 6.3667 8.77384C6.62013 8.95312 6.8117 9.20657 6.915 9.49926H12V10.499H6.915C6.8117 10.7917 6.62013 11.0452 6.3667 11.2244C6.11327 11.4037 5.81046 11.5 5.5 11.5C5.18954 11.5 4.88673 11.4037 4.6333 11.2244C4.37987 11.0452 4.1883 10.7917 4.085 10.499H2V9.49926H4.085ZM7.085 6.00012C7.1883 5.70743 7.37987 5.45397 7.6333 5.27469C7.88673 5.09542 8.18954 4.99914 8.5 4.99914C8.81046 4.99914 9.11327 5.09542 9.3667 5.27469C9.62013 5.45397 9.8117 5.70743 9.915 6.00012H12V6.99988H9.915C9.8117 7.29257 9.62013 7.54603 9.3667 7.72531C9.11327 7.90458 8.81046 8.00086 8.5 8.00086C8.18954 8.00086 7.88673 7.90458 7.6333 7.72531C7.37987 7.54603 7.1883 7.29257 7.085 6.99988H2V6.00012H7.085ZM4.085 2.50098C4.1883 2.20829 4.37987 1.95483 4.6333 1.77555C4.88673 1.59627 5.18954 1.5 5.5 1.5C5.81046 1.5 6.11327 1.59627 6.3667 1.77555C6.62013 1.95483 6.8117 2.20829 6.915 2.50098H12V3.50073H6.915C6.8117 3.79343 6.62013 4.04688 6.3667 4.22616C6.11327 4.40544 5.81046 4.50171 5.5 4.50171C5.18954 4.50171 4.88673 4.40544 4.6333 4.22616C4.37987 4.04688 4.1883 3.79343 4.085 3.50073H2V2.50098H4.085Z"
                    fill="#636363"
                  />
                </svg>
                {isMobile && (
                  <span className="text-[14px] font-inter font-[500] text-textHeading">
                    Filter
                  </span>
                )}
                {!isMobile && (
                  <span className="text-[14px] font-inter font-[500] text-textHeading">
                    Filter
                  </span>
                )}
              </button>
              {showFilterMenu && (
                <div
                  ref={filterMenuRef}
                  className="absolute z-10 mt-2 w-64 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  {/* Filter menu content */}
                  {showFilterMenu && (
                    <div
                      ref={filterMenuRef}
                      className="absolute z-10 mt-2 w-64 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    >
                      <div className="py-1 px-2">
                        <div className="py-2">
                          <select
                            className="block w-full rounded-md text-[12px] font-inter font-[500] py-2 pl-3 pr-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                            id="filter-field"
                            value={selectedFilterField}
                            onChange={(e) =>
                              handleFilterFieldChange(e.target.value)
                            }
                          >
                            <option
                              value=""
                              disabled
                              className="text-[14px] font-inter font-[500]"
                            >
                              Select field
                            </option>
                            {columns.map((column) => (
                              <option
                                key={column.field}
                                className="text-[12px] font-inter font-[500]"
                                value={column.field}
                              >
                                {column.headerName}
                              </option>
                            ))}
                          </select>
                        </div>
                        {/* Date filter specific controls */}
                        {selectedFilterType === "date" && enableDateFilters && (
                          <div className="py-2">
                            <select
                              className="block w-full rounded-md text-[12px] font-inter font-[500] py-2 pl-3 pr-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                              value={dateOperator}
                              onChange={(e) =>
                                setDateOperator(e.target.value as any)
                              }
                            >
                              <option value="equals">Equals</option>
                              <option value="before">Before</option>
                              <option value="after">After</option>
                              <option value="between">Between</option>
                            </select>
                          </div>
                        )}
                        {/* Regular filter input or start date for date filters */}
                        <div className="py-2">
                          {selectedFilterType === "date" &&
                          enableDateFilters ? (
                            <input
                              type="date"
                              id="filter-date"
                              value={startDate}
                              onChange={(e) => setStartDate(e.target.value)}
                              className="block w-full rounded-md border-reloadBorder border py-2 pl-3 pr-3 text-[12px] font-inter font-[500] 
            focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                            />
                          ) : (
                            <input
                              type="text"
                              id="filter-value"
                              placeholder="Filter value"
                              className="block w-full rounded-md border-reloadBorder border py-2 pl-3 pr-3 text-[12px] font-inter font-[500] 
            focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                            />
                          )}
                        </div>

                        {/* End date input for "between" date operator */}
                        {selectedFilterType === "date" &&
                          dateOperator === "between" &&
                          enableDateFilters && (
                            <div className="py-2">
                              <label className="block text-[12px] font-inter font-[500] mb-1">
                                End Date
                              </label>
                              <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="block w-full rounded-md border-reloadBorder border py-2 pl-3 pr-3 text-[12px] font-inter font-[500] 
            focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                              />
                            </div>
                          )}
                        <div className="py-2">
                          <button
                            type="button"
                            className="inline-flex w-full justify-center rounded-md border border-transparent bg-bgButton px-4 py-2 text-sm font-inter text-whiteColor font-[12px] shadow-sm focus:outline-none focus:ring-2 focus:ring-bgButton focus:ring-offset-2"
                            onClick={() => {
                              if (
                                selectedFilterType === "date" &&
                                enableDateFilters
                              ) {
                                addFilter(selectedFilterField, startDate);
                              } else {
                                const valueElement = document.getElementById(
                                  "filter-value"
                                ) as HTMLInputElement;
                                if (valueElement) {
                                  addFilter(
                                    selectedFilterField,
                                    valueElement.value
                                  );
                                  valueElement.value = "";
                                }
                              }
                            }}
                          >
                            Apply Filter
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
            {/* Render density button before export if densityFirst is true */}
            {densityFirst && renderDensityButton()}

            {/* Export button */}
            <button
              className="flex items-center gap-2 text-[14px] font-inter font-[500] text-textHeading"
              onClick={exportToCSV}
            >
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
                  d="M2.09961 11.9C2.09961 11.5134 2.41301 11.2 2.79961 11.2H11.1996C11.5862 11.2 11.8996 11.5134 11.8996 11.9C11.8996 12.2866 11.5862 12.6 11.1996 12.6H2.79961C2.41301 12.6 2.09961 12.2866 2.09961 11.9ZM4.40463 6.50502C4.678 6.23165 5.12122 6.23165 5.39458 6.50502L6.29961 7.41004L6.29961 2.09999C6.29961 1.71339 6.61301 1.39999 6.99961 1.39999C7.38621 1.39999 7.69961 1.71339 7.69961 2.09999L7.69961 7.41004L8.60463 6.50502C8.878 6.23165 9.32122 6.23165 9.59458 6.50502C9.86795 6.77839 9.86795 7.2216 9.59458 7.49497L7.49458 9.59497C7.36331 9.72624 7.18526 9.79999 6.99961 9.79999C6.81396 9.79999 6.63591 9.72624 6.50463 9.59497L4.40463 7.49497C4.13127 7.2216 4.13127 6.77839 4.40463 6.50502Z"
                  fill="#636363"
                />
              </svg>
              {isMobile && (
                <span className="text-[14px] font-inter font-[500] text-textHeading">
                  Export
                </span>
              )}
              {!isMobile && (
                <span className="text-[14px] font-inter font-[500] text-textHeading">
                  Export
                </span>
              )}
            </button>
            {/* Render density button after export if densityFirst is false */}
            {!densityFirst && renderDensityButton()}
            {/* Date Range Selector */}
            {!isMobile && renderDateRangeSelector()}
          </div>
          {/* Search box */}
          {isMobile ? (
            <div className="w-full flex flex-row gap-2 items-center mt-2">
              <div className="relative flex-1">
                <span className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-grey-border">
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
                      d="M6.39961 3.2001C4.6323 3.2001 3.19961 4.63279 3.19961 6.4001C3.19961 8.16741 4.6323 9.6001 6.39961 9.6001C8.16692 9.6001 9.59961 8.16741 9.59961 6.4001C9.59961 4.63279 8.16692 3.2001 6.39961 3.2001ZM1.59961 6.4001C1.59961 3.74913 3.74864 1.6001 6.39961 1.6001C9.05058 1.6001 11.1996 3.74913 11.1996 6.4001C11.1996 7.43676 10.871 8.39667 10.3122 9.18133L14.1653 13.0344C14.4777 13.3468 14.4777 13.8534 14.1653 14.1658C13.8529 14.4782 13.3463 14.4782 13.0339 14.1658L9.18084 10.3127C8.39618 10.8715 7.43627 11.2001 6.39961 11.2001C3.74864 11.2001 1.59961 9.05106 1.59961 6.4001Z"
                      fill="#949494"
                    />
                  </svg>
                </span>
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder={searchPlaceholder}
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-[12px] font-inter font-[400] text-cardTitle w-full"
                />
              </div>
              {/* Date range selector - simplified for mobile */}
              <div className="flex-none">{renderDateRangeSelector()}</div>
            </div>
          ) : (
            // Desktop view - keep original layout
            <div className="relative w-full sm:w-auto mt-2 sm:mt-0">
              <span className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-grey-border">
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
                    d="M6.39961 3.2001C4.6323 3.2001 3.19961 4.63279 3.19961 6.4001C3.19961 8.16741 4.6323 9.6001 6.39961 9.6001C8.16692 9.6001 9.59961 8.16741 9.59961 6.4001C9.59961 4.63279 8.16692 3.2001 6.39961 3.2001ZM1.59961 6.4001C1.59961 3.74913 3.74864 1.6001 6.39961 1.6001C9.05058 1.6001 11.1996 3.74913 11.1996 6.4001C11.1996 7.43676 10.871 8.39667 10.3122 9.18133L14.1653 13.0344C14.4777 13.3468 14.4777 13.8534 14.1653 14.1658C13.8529 14.4782 13.3463 14.4782 13.0339 14.1658L9.18084 10.3127C8.39618 10.8715 7.43627 11.2001 6.39961 11.2001C3.74864 11.2001 1.59961 9.05106 1.59961 6.4001Z"
                    fill="#949494"
                  />
                </svg>
              </span>
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder={searchPlaceholder}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-[12px] font-inter font-[400] text-cardTitle w-full sm:w-64 md:w-80 lg:w-96 xl:w-120"
              />
            </div>
          )}
        </div>
      )}
      {/* Data grid content - conditionally render based on isMobile */}
      {isMobile ? (
        // Mobile card view - We're removing the renderMobilePagination call here since it's already at the top
        <div className="px-0 p-3 bg-background-grey">
          {/* Render each row as a card */}
          {filteredRows
            .slice(
              (currentPage - 1) * currentPageSize,
              currentPage * currentPageSize
            )
            .map((row) => renderMobileCard(row))}
        </div>
      ) : (
        // Desktop table view
        <>
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="border-b table-auto border-gray-200 bg-background-grey">
                {showCheckboxes && (
                  <th className="p-4 w-[56px] text-center">
                    <input
                      type="checkbox"
                      checked={
                        selectedRows.length === filteredRows.length &&
                        filteredRows.length > 0
                      }
                      onChange={onSelectAll}
                      className="h-4 w-4 rounded border-btnBorder focus:ring-bgButton accent-bgButton"
                    />
                  </th>
                )}
                {columns
                  .filter((column) => column.visible)
                  .map((col) => (
                    <th
                      key={col.field}
                      className="text-left p-2 font-inter font-[600] text-headding-color bg-background-grey whitespace-nowra"
                      style={{ width: col.width }}
                    >
                      <div className="flex items-center">
                        <span className="font-inter font-[600] text-headding-color">
                          {col.headerName}
                        </span>
                        {(col.headerName === "Store ID" ||
                          col.headerName === "Order ID") && (
                          <button
                            onClick={() => {
                              console.log("Sort click on:", col.headerName);

                              // Check if we're clicking on the same column as before
                              if (sortColumn === col.headerName) {
                                // If same column, cycle through: null -> asc -> desc -> null
                                setSortOrder((prev) => {
                                  if (prev === null) return "asc";
                                  if (prev === "asc") return "desc";
                                  return null; // if prev === "desc"
                                });
                              } else {
                                // If different column, start with ascending sort
                                setSortColumn(col.headerName);
                                setSortOrder("asc");
                              }
                            }}
                            className="ml-2"
                          >
                            {/* Conditional icon rendering based on sort state */}
                            {sortColumn === col.headerName ? (
                              sortOrder === "asc" ? (
                                // Ascending sort icon (pointing down for ascending)
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                >
                                  <path d="M8 12L12 8H4L8 12Z" fill="#1A1A1A" />
                                </svg>
                              ) : sortOrder === "desc" ? (
                                // Descending sort icon (pointing up for descending)
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                >
                                  <path d="M8 4L4 8H12L8 4Z" fill="#1A1A1A" />
                                </svg>
                              ) : (
                                // Default icon when sort is null but column is selected
                                <img
                                  src={SortIcon}
                                  alt="Sort Icon"
                                  className="w-[16px] h-[16px] cursor-pointer"
                                />
                              )
                            ) : (
                              // Default unsorted icon
                              <img
                                src={SortIcon}
                                alt="Sort Icon"
                                className="w-[16px] h-[16px] cursor-pointer"
                              />
                            )}
                          </button>
                        )}
                      </div>
                    </th>
                  ))}
                {showActionColumn && (
                  <th className="text-left p-4 font-inter font-[600] text-headding-color bg-background-grey">
                    Action
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {filteredRows
                .slice(
                  (currentPage - 1) * currentPageSize,
                  currentPage * currentPageSize
                )
                .map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-gray-200 bg-store-card"
                  >
                    {showCheckboxes && (
                      <td className="p-4 w-[56px] text-center">
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(row.id)}
                          onChange={() => onSelectRow(row.id)}
                          className="h-4 w-4 rounded border border-gray-300 focus:ring-bgButton accent-bgButton"
                        />
                      </td>
                    )}
                    {columns
                      .filter((column) => column.visible)
                      .map((col) => (
                        <td
                          key={col.field}
                          className="p-4 text-[12px] font-inter font-[500] text-cardValue"
                        >
                          {renderCell(col, row)}
                        </td>
                      ))}
                    {showActionColumn && (
                      <td className="p-4">
                        <div className="flex gap-2">
                          {onEdit && (
                            <button
                              onClick={() => onEdit(row)}
                              className="p-1 hover:bg-gray-100 rounded"
                            >
                              <PenSquare size={14} />
                            </button>
                          )}
                          {onDelete && (
                            <button
                              onClick={() => onDelete(row)}
                              className="p-1 hover:bg-gray-100 rounded"
                            >
                              <Trash2 size={14} />
                            </button>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              {/* Pagination row inside the table */}
              <tr className="border-b border-reloadBorder bg-tableFooter">
                <td
                  colSpan={
                    showCheckboxes
                      ? columns.filter((column) => column.visible).length +
                        (showActionColumn ? 2 : 1)
                      : columns.filter((column) => column.visible).length +
                        (showActionColumn ? 1 : 0)
                  }
                >
                  <div className="p-4 flex flex-wrap sm:flex-nowrap justify-between items-center">
                    {/* Text showing results - responsive on small screens */}
                    <span className="text-[14px] font-inter font-[500] text-headding-color w-full sm:w-auto mb-3 sm:mb-0">
                      Showing result{" "}
                      {Math.min(currentPageSize, filteredRows.length)} out of{" "}
                      {rows.length}
                    </span>

                    {/* Pagination controls - always aligned right */}
                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                      <button
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(1, prev - 1))
                        }
                        className="p-2 hover:bg-gray-100 rounded"
                        disabled={currentPage === 1}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M12.7071 5.29289C13.0976 5.68342 13.0976 6.31658 12.7071 6.70711L9.41421 10L12.7071 13.2929C13.0976 13.6834 13.0976 14.3166 12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L7.29289 10.7071C6.90237 10.3166 6.90237 9.68342 7.29289 9.29289L11.2929 5.29289C11.6834 4.90237 12.3166 4.90237 12.7071 5.29289Z"
                            fill="#4A4A4A"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                        className="p-2 hover:bg-gray-100 rounded"
                        disabled={
                          currentPage * currentPageSize >= filteredRows.length
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7.29289 14.7071C6.90237 14.3166 6.90237 13.6834 7.29289 13.2929L10.5858 10L7.29289 6.70711C6.90237 6.31658 6.90237 5.68342 7.29289 5.29289C7.68342 4.90237 8.31658 4.90237 8.70711 5.29289L12.7071 9.29289C13.0976 9.68342 13.0976 10.3166 12.7071 10.7071L8.70711 14.7071C8.31658 15.0976 7.68342 15.0976 7.29289 14.7071Z"
                            fill="#4A4A4A"
                          />
                        </svg>
                      </button>
                      <div className="relative">
                        <select
                          className="appearance-none ml-2 px-4 py-2 border border-gray-200 rounded-custom text-[12px] bg-reloadBackground pr-8"
                          value={currentPageSize}
                          onChange={(e) => {
                            setCurrentPageSize(Number(e.target.value));
                            setCurrentPage(1);
                          }}
                        >
                          <option
                            value={10}
                            className="text-[12px] bg-reloadBackground"
                          >
                            10
                          </option>
                          <option
                            value={20}
                            className="text-[12px] bg-reloadBackground"
                          >
                            20
                          </option>
                          <option
                            value={50}
                            className="text-[12px] bg-reloadBackground"
                          >
                            50
                          </option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <path
                              d="M4 6L8 10L12 6"
                              stroke="#687182"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};
export default CustomDataGrid;
