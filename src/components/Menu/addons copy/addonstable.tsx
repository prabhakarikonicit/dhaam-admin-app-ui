import React, { useState, useRef, useEffect } from "react";
import Espresso from "../../../lib/Images/Espresso.png";

// Define interfaces
interface Addon {
  id: string;
  name: string;
  description: string;
  assignedTo: {
    name: string;
    count: number;
  };
  type: "Single Section" | "Multi Section";
  dateAdded: string;
  isActive: boolean;
}

const AddonsTable: React.FC = () => {
  // Sample data based on the image
  const [addons, setAddons] = useState<Addon[]>([
    {
      id: "1",
      name: "Extra Cheese",
      description: "Add a rich and creamy cheese layer for enhanced flavor.",
      assignedTo: { name: "Farmhouse Pizza", count: 5 },
      type: "Single Section",
      dateAdded: "Mar 6, 2025",
      isActive: true,
    },
    {
      id: "2",
      name: "Sauces & Dips",
      description: "Elevate your dish with flavorful dips and sauces.",
      assignedTo: { name: "Farmhouse Pizza", count: 5 },
      type: "Multi Section",
      dateAdded: "Mar 6, 2025",
      isActive: true,
    },
    {
      id: "3",
      name: "Protein Boost",
      description: "Power up your meal with an extra dose of protein.",
      assignedTo: { name: "Farmhouse Pizza", count: 5 },
      type: "Single Section",
      dateAdded: "Mar 6, 2025",
      isActive: true,
    },
    {
      id: "4",
      name: "Bread Choice",
      description: "Choose your favorite type of bread for the perfect bite.",
      assignedTo: { name: "Farmhouse Pizza", count: 5 },
      type: "Single Section",
      dateAdded: "Mar 6, 2025",
      isActive: true,
    },
    {
      id: "5",
      name: "Sweeteners for Beverages",
      description: "Customize your drink with your preferred sweetener.",
      assignedTo: { name: "Farmhouse Pizza", count: 5 },
      type: "Multi Section",
      dateAdded: "Mar 6, 2025",
      isActive: true,
    },
    {
      id: "6",
      name: "Spice Level",
      description: "Adjust the heat of your dish to your taste preference.",
      assignedTo: { name: "Farmhouse Pizza", count: 5 },
      type: "Single Section",
      dateAdded: "Mar 6, 2025",
      isActive: true,
    },
    {
      id: "7",
      name: "Milk Alternatives",
      description: "Swap out regular milk for a dairy-free alternative.",
      assignedTo: { name: "Farmhouse Pizza", count: 5 },
      type: "Multi Section",
      dateAdded: "Mar 6, 2025",
      isActive: true,
    },
    {
      id: "8",
      name: "Toppings for Desserts",
      description: "Add a delicious finishing touch to your desserts.",
      assignedTo: { name: "Farmhouse Pizza", count: 5 },
      type: "Multi Section",
      dateAdded: "Mar 6, 2025",
      isActive: true,
    },
    {
      id: "9",
      name: "Side Dishes",
      description: "Complement your meal with a tasty side dish.",
      assignedTo: { name: "Farmhouse Pizza", count: 5 },
      type: "Single Section",
      dateAdded: "Mar 6, 2025",
      isActive: true,
    },
    {
      id: "10",
      name: "Serving Size",
      description: "Choose the right portion to match your appetite.",
      assignedTo: { name: "Farmhouse Pizza", count: 5 },
      type: "Multi Section",
      dateAdded: "Mar 6, 2025",
      isActive: true,
    },
  ]);

  // State for selected items
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [visibleColumns, setVisibleColumns] = useState({
    addons: true,
    assignedTo: true,
    type: true,
    dateAdded: true,
    status: true,
    action: true,
  });
  const [showColumnMenu, setShowColumnMenu] = useState<boolean>(false);
  const [showExportMenu, setShowExportMenu] = useState<boolean>(false);
  const [showFilterMenu, setShowFilterMenu] = useState<boolean>(false);
  const [filters, setFilters] = useState({
    type: "",
    isActive: "",
  });

  // Refs for click outside handling
  const columnMenuRef = useRef<HTMLDivElement>(null);
  const filterMenuRef = useRef<HTMLDivElement>(null);
  const exportMenuRef = useRef<HTMLDivElement>(null);

  // Click outside handler
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
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
        exportMenuRef.current &&
        !exportMenuRef.current.contains(event.target as Node)
      ) {
        setShowExportMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Column visibility toggle
  const toggleColumnVisibility = (column: keyof typeof visibleColumns) => {
    setVisibleColumns({
      ...visibleColumns,
      [column]: !visibleColumns[column],
    });
  };

  // Export functions
  const exportToCSV = () => {
    // Prepare CSV data
    const headers = [
      "ID",
      "Name",
      "Description",
      "Assigned To",
      "Type",
      "Date Added",
      "Status",
    ];
    const csvData = addons.map((addon) => [
      addon.id,
      addon.name,
      addon.description,
      `${addon.assignedTo.name} & ${addon.assignedTo.count} more products`,
      addon.type,
      addon.dateAdded,
      addon.isActive ? "Active" : "Inactive",
    ]);

    // Convert to CSV string
    const csvString = [
      headers.join(","),
      ...csvData.map((row) => row.join(",")),
    ].join("\n");

    // Create download link
    const downloadLink = document.createElement("a");
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.download = "addons.csv";

    // Simulate click and clean up
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(url);

    // Close menu after export
    setShowExportMenu(false);
  };

  // Search handler
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Filter handlers
  const handleFilterChange = (field: keyof typeof filters, value: string) => {
    setFilters({
      ...filters,
      [field]: value,
    });
    setCurrentPage(1); // Reset to first page when filtering
  };

  // Filter and search the data
  const filteredAddons = addons.filter((addon) => {
    // Search filter
    const matchesSearch =
      addon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      addon.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      addon.assignedTo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      addon.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      addon.dateAdded.toLowerCase().includes(searchQuery.toLowerCase());

    // Type filter
    const matchesType = filters.type === "" || addon.type === filters.type;

    // Status filter
    const matchesStatus =
      filters.isActive === "" ||
      (filters.isActive === "active" && addon.isActive) ||
      (filters.isActive === "inactive" && !addon.isActive);

    return matchesSearch && matchesType && matchesStatus;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAddons.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredAddons.length / itemsPerPage);

  // Pagination handlers
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  // Toggle selection of all items
  const toggleSelectAll = () => {
    if (selectedItems.length === addons.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(addons.map((addon) => addon.id));
    }
  };

  // Toggle selection of a single item
  const toggleSelect = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  // Toggle active status
  const toggleActive = (id: string) => {
    setAddons(
      addons.map((addon) =>
        addon.id === id ? { ...addon, isActive: !addon.isActive } : addon
      )
    );
  };

  // Render mobile view
  const renderMobileView = () => (
    <div className="md:hidden flex flex-col p-0 bg-background-gre rounded-custom12px mb-32">
      <div className="flex flex-col gap-4">
        {/* Header with title and dropdown */}
        <div className="flex items-center justify-between">
          <h2 className="text-cardValue text-[20px] font-inter font-[600]">
            Add-ons
          </h2>
          <div className="relative">
            <select className="appearance-none block w-full bg-white border border-reloadBorder rounded-custom8px py-3 pl-3 pr-10 text-verifyOtp text-[12px] font-inter font-[400] placeholder: focus:outline-none focus:ring-purple-500 focus:border-purple-500">
              <option className="border border-reloadBorder py-2 pl-3 pr-10 text-verifyOtp text-[12px] font-inter font-[400] ">
                Queenstown Public House
              </option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
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
                  d="M4.23431 5.83441C4.54673 5.52199 5.05327 5.52199 5.36569 5.83441L8 8.46873L10.6343 5.83441C10.9467 5.52199 11.4533 5.52199 11.7657 5.83441C12.0781 6.14683 12.0781 6.65336 11.7657 6.96578L8.56569 10.1658C8.25327 10.4782 7.74673 10.4782 7.43431 10.1658L4.23431 6.96578C3.9219 6.65336 3.9219 6.14683 4.23431 5.83441Z"
                  fill="#949494"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Search and Action buttons */}
        <div className="bg-backgroundWhite p-4 py-3 rounded-custom12px">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
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
                    d="M6.39961 3.2001C4.6323 3.2001 3.19961 4.63279 3.19961 6.4001C3.19961 8.16741 4.6323 9.6001 6.39961 9.6001C8.16692 9.6001 9.59961 8.16741 9.59961 6.4001C9.59961 4.63279 8.16692 3.2001 6.39961 3.2001ZM1.59961 6.4001C1.59961 3.74913 3.74864 1.6001 6.39961 1.6001C9.05058 1.6001 11.1996 3.74913 11.1996 6.4001C11.1996 7.43676 10.871 8.39667 10.3122 9.18133L14.1653 13.0344C14.4777 13.3468 14.4777 13.8534 14.1653 14.1658C13.8529 14.4782 13.3463 14.4782 13.0339 14.1658L9.18084 10.3127C8.39618 10.8715 7.43627 11.2001 6.39961 11.2001C3.74864 11.2001 1.59961 9.05106 1.59961 6.4001Z"
                    fill="#949494"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search Add-on"
                className="block w-full md:w-[213px] pl-10 pr-3 py-2 border border-grey-border rounded-custom7px leading-5 text-[12px] text-cardTitle font-inter font-[500] bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-[12px]"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            <button className="px-5 py-2 border border-btnBorder text-[12px] font-[600] font-inter rounded-custom text-whiteColor bg-bgButton hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
              Create New
            </button>
          </div>

          {/* Divider */}
          <div className="border-b border-grey-border my-4"></div>

          {/* Product Cards */}
          {currentItems.map((addon) => (
            <div
              key={addon.id}
              className="bg-white border border-gray-200 rounded-lg p-4 mb-3 mt-4"
            >
              <div className="flex justify-between items-start">
                <div className="flex gap-3">
                  <div className="h-10 w-10 flex-shrink-0 bg-gray-100 rounded-md flex items-center justify-center">
                    <img
                      src={`${Espresso}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-[12px] font-inter font-[600] text-cardValue flex items-center justify-between">
                      {addon.name}
                    </h3>
                    <p className="text-[11px] font-inter font-[400] text-cardTitle mt-2 mt-1">
                      {addon.description}
                    </p>
                  </div>
                </div>
                <button className="text-gray-500">
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>
              </div>

              <div className="mt-2 border-t border-greyBorder ">
                <div className="flex justify-between items-center mb-2 mt-2">
                  <span className="text-[12px] font-inter font-[500] text-headding-color">
                    Dated added :{" "}
                    <span className="text-[12px] font-inter font-[500] text-cardValue">
                      {addon.dateAdded}
                    </span>
                  </span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[12px] font-inter font-[500] text-headding-color">
                    Type :{" "}
                    <span className="text-[12px] font-inter font-[500] text-cardValue">
                      {addon.type.replace("Section", "Selection")}
                    </span>
                  </span>
                </div>
                <div className="border-t border-greyBorder">
                  <div className="flex justify-between items-center mb-2 mt-2">
                    <div className="">
                      <div className="flex items-center ">
                        <span className="text-[12px] font-inter font-[500] text-cardValue mb-1 ">
                          {addon.assignedTo.name}
                        </span>
                        <button className="ml-2 text-gray-400">
                          <svg
                            className="h-4 w-4"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                      <span className="text-[12px] font-inter font-[400] text-cardTitle">
                        & {addon.assignedTo.count} more products
                      </span>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={addon.isActive}
                        onChange={() => toggleActive(addon.id)}
                      />
                      <div
                        className={`w-12 h-6 rounded-full transition ${
                          addon.isActive ? "bg-bgButton" : "bg-gray-300"
                        }`}
                      >
                        <div
                          className={`absolute w-4 h-4 bg-white rounded-full transition-transform ${
                            addon.isActive ? "translate-x-7" : "translate-x-1"
                          } top-1`}
                        ></div>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Render desktop view (original table)
  const renderDesktopView = () => (
    <div className=" bg-white rounded-lg border border-reloadBorder overflow-hidden mb-24">
      {/* Header section */}
      <div className="py-4 px-3 flex justify-between items-center bg-white border-b border-reloadBorder ">
        <div className="flex items-center">
          <span className="text-[14px] font-inter font-[600] text-textHeading">
            Add-ons{" "}
            <span className="text-[14px] font-inter font-[600] text-textHeading ml-1">
              ({filteredAddons.length})
            </span>
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button
              className="flex items-center text-[14px] font-inter font-[500] text-textHeading"
              onClick={() => setShowColumnMenu(!showColumnMenu)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M8.5575 2.91675V11.0834H5.4425V2.91675H8.5575ZM9.14083 11.0834H12.25V2.91675H9.14083V11.0834ZM4.85917 11.0834V2.91675H1.75V11.0834H4.85917Z"
                  fill="#636363"
                />
              </svg>
              <span className="text-[12px] font-inter font-[500] text-textHeading ps-2">
                Column
              </span>
            </button>
            {/* Column menu dropdown */}
            {showColumnMenu && (
              <div
                ref={columnMenuRef}
                className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10"
              >
                {/* Column toggle options would go here */}
              </div>
            )}
          </div>
          <div className="relative">
            <button
              className="flex items-center text-[12px] font-inter font-[500] text-textHeading"
              onClick={() => setShowFilterMenu(!showFilterMenu)}
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
              <span className="text-[12px] font-inter font-[500] text-textHeading ps-2">
                Filter
              </span>
            </button>
            {/* Filter menu dropdown */}
            {showFilterMenu && (
              <div
                ref={filterMenuRef}
                className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10"
              >
                {/* Filter options would go here */}
              </div>
            )}
          </div>
          <div className="relative">
            <button
              className="flex items-center text-[12px] font-inter font-[500] text-textHeading"
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
                  d="M2.09961 11.8999C2.09961 11.5133 2.41301 11.1999 2.79961 11.1999H11.1996C11.5862 11.1999 11.8996 11.5133 11.8996 11.8999C11.8996 12.2865 11.5862 12.5999 11.1996 12.5999H2.79961C2.41301 12.5999 2.09961 12.2865 2.09961 11.8999ZM4.40463 6.50493C4.678 6.23156 5.12122 6.23156 5.39458 6.50493L6.29961 7.40995L6.29961 2.0999C6.29961 1.7133 6.61301 1.3999 6.99961 1.3999C7.38621 1.3999 7.69961 1.7133 7.69961 2.0999L7.69961 7.40995L8.60463 6.50493C8.878 6.23156 9.32122 6.23156 9.59458 6.50493C9.86795 6.77829 9.86795 7.22151 9.59458 7.49488L7.49458 9.59488C7.36331 9.72615 7.18526 9.7999 6.99961 9.7999C6.81396 9.7999 6.63591 9.72615 6.50463 9.59488L4.40463 7.49488C4.13127 7.22151 4.13127 6.77829 4.40463 6.50493Z"
                  fill="#636363"
                />
              </svg>
              <span className="text-[12px] font-inter font-[500] text-textHeading ps-2">
                Export
              </span>
            </button>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search Add-ons"
              className="pl-10 pr-4 py-2 border border-grey-border rounded-custom7px text-[14px] font-inter font-[400] text-paragraphBlack focus:outline-none focus:ring-1 focus:ring-bgButton"
              value={searchQuery}
              onChange={handleSearch}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
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
                  d="M6.40156 3.2001C4.63425 3.2001 3.20156 4.63279 3.20156 6.4001C3.20156 8.16741 4.63425 9.6001 6.40156 9.6001C8.16887 9.6001 9.60156 8.16741 9.60156 6.4001C9.60156 4.63279 8.16887 3.2001 6.40156 3.2001ZM1.60156 6.4001C1.60156 3.74913 3.7506 1.6001 6.40156 1.6001C9.05253 1.6001 11.2016 3.74913 11.2016 6.4001C11.2016 7.43676 10.8729 8.39667 10.3142 9.18133L14.1672 13.0344C14.4797 13.3468 14.4797 13.8534 14.1672 14.1658C13.8548 14.4782 13.3483 14.4782 13.0359 14.1658L9.18279 10.3127C8.39813 10.8715 7.43823 11.2001 6.40156 11.2001C3.7506 11.2001 1.60156 9.05106 1.60156 6.4001Z"
                  fill="#949494"
                />
              </svg>
            </div>
          </div>
          <button className="px-5 py-2 bg-bgButton text-white rounded-custom text-[12px] font-inter font-[600]">
            Create New
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-y-auto">
        <table className="min-w-full divide-y divide-reloadBorder">
          <thead className="bg-background-grey">
            <tr>
              <th scope="col" className="w-12 px-6 py-3 text-left">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-bgButton accent-bgButton rounded border-gray-300"
                  checked={
                    selectedItems.length === addons.length && addons.length > 0
                  }
                  onChange={toggleSelectAll}
                />
              </th>
              {visibleColumns.addons && (
                <th
                  scope="col"
                  className="px-16 py-3 text-left text-[12px] font-inter font-[600] text-headding-color"
                >
                  Add-ons
                </th>
              )}
              {visibleColumns.assignedTo && (
                <th
                  scope="col"
                  className="px-2 py-3 text-left text-[12px] font-inter font-[600] text-headding-color "
                >
                  Assigned to
                </th>
              )}
              {visibleColumns.type && (
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-[12px] font-inter font-[600] text-headding-color"
                >
                  Type
                </th>
              )}
              {visibleColumns.dateAdded && (
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-[12px] font-inter font-[600] text-headding-color"
                >
                  Date added
                </th>
              )}
              {visibleColumns.status && (
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-[12px] font-inter font-[600] text-headding-color"
                >
                  Status
                </th>
              )}
              {visibleColumns.action && (
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-[12px] font-inter font-[600] text-headding-color"
                >
                  Action
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems.map((addon) => (
              <tr key={addon.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-bgButton accent-bgButton rounded border-gray-300"
                    checked={selectedItems.includes(addon.id)}
                    onChange={() => toggleSelect(addon.id)}
                  />
                </td>
                {visibleColumns.addons && (
                  <td className="px-2 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 bg-gray-100 rounded-md flex items-center justify-center mr-3">
                        <svg
                          className="h-6 w-6 text-gray-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16m-7 6h7"
                          />
                        </svg>
                      </div>
                      <div>
                        <div className="ps-1 text-[12px] font-inter font-[500] text-textHeading">
                          {addon.name}
                        </div>
                        <div className="ps-1 text-[12px] font-inter font-[400] text-cardTitle mt-1">
                          {addon.description}
                        </div>
                      </div>
                    </div>
                  </td>
                )}
                {visibleColumns.assignedTo && (
                  <td className="px-2 py-4">
                    <div className="flex flex-col">
                      <div className="flex items-center">
                        <span className="text-[12px] font-inter font-[500] text-textHeading">
                          {addon.assignedTo.name}
                        </span>
                        <button className="ml-6 mt-4 text-gray-400">
                          <svg
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                      <span className="text-[12px] font-inter font-[400] text-cardTitle mt-1">
                        & {addon.assignedTo.count} more products
                      </span>
                    </div>
                  </td>
                )}
                {visibleColumns.type && (
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-[14px] font-inter font-[500] text-textHeading">
                      {addon.type}
                    </span>
                  </td>
                )}
                {visibleColumns.dateAdded && (
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-[14px] font-inter font-[500] text-textHeading">
                      {addon.dateAdded}
                    </span>
                  </td>
                )}
                {visibleColumns.status && (
                  <td className="px-6 py-4 whitespace-nowrap">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={addon.isActive}
                        onChange={() => toggleActive(addon.id)}
                      />
                      <div
                        className={`w-12 h-6 rounded-full transition ${
                          addon.isActive ? "bg-bgButton" : "bg-gray-300"
                        }`}
                      >
                        <div
                          className={`absolute w-4 h-4 bg-white rounded-full transition-transform ${
                            addon.isActive ? "translate-x-7" : "translate-x-1"
                          } top-1`}
                        ></div>
                      </div>
                    </label>
                  </td>
                )}
                {visibleColumns.action && (
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <button className="text-gray-500 hover:text-gray-700 inline-flex justify-center">
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="bg-tableFooter px-4 py-3 flex items-center justify-between border-t border-gray-200 ">
        <div className="flex-1 flex justify-between items-center">
          <div>
            <p className="text-[12px] font-inter font-[500] text-headding-color">
              Showing results {indexOfFirstItem + 1}-
              {Math.min(indexOfLastItem, filteredAddons.length)} out of{" "}
              {filteredAddons.length}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              className={`px-2 py-1  rounded-md  text-cardValue ${
                currentPage === 1 ? "opacity-50 " : ""
              }`}
              onClick={goToPreviousPage}
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
              className={`px-2 py-1  rounded-md  text-cardValue ${
                currentPage === totalPages ? "opacity-50 " : ""
              }`}
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
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
                className="appearance-none block w-20 px-4 py-3 border border-gray-300 bg-reloadBackground rounded-custom text-cardValue text-[12px] font-inter font-[400]"
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
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
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Render tablet view with More dropdown
  const renderTabletView = () => (
    <div className="hidden sm:block  lg:hidden bg-white rounded-lg border border-reloadBorder overflow-hidden mb-24">
      {/* Header section with More dropdown */}
      <div className="py-4 px-3 flex justify-between items-center bg-white border-b border-reloadBorder">
        <div className="flex items-center">
          <span className="text-[14px] font-inter font-[600] text-textHeading">
            Add-ons{" "}
            <span className="text-[14px] font-inter font-[600] text-textHeading ml-1">
              ({filteredAddons.length})
            </span>
          </span>
        </div>
        <div className="flex items-center space-x-4">
          {/* More dropdown */}
          <div className="relative">
            <button
              className="flex items-center text-[14px] font-inter font-[500] text-textHeading"
              onClick={() => setShowColumnMenu(!showColumnMenu)}
            >
              <span className="text-[14px] font-inter font-[500] text-textHeading">
                More
              </span>
              <svg
                className="ml-2 h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {showColumnMenu && (
              <div
                ref={columnMenuRef}
                className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 py-1"
              >
                <button
                  className="flex items-center px-4 py-2 text-[12px] font-inter font-[500] text-textHeading w-full text-left hover:bg-gray-100"
                  onClick={() => setShowColumnMenu(false)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    className="mr-2"
                  >
                    <path
                      d="M8.5575 2.91675V11.0834H5.4425V2.91675H8.5575ZM9.14083 11.0834H12.25V2.91675H9.14083V11.0834ZM4.85917 11.0834V2.91675H1.75V11.0834H4.85917Z"
                      fill="#636363"
                    />
                  </svg>
                  <span>Column</span>
                </button>
                <button
                  className="flex items-center px-4 py-2 text-[12px] font-inter font-[500] text-textHeading w-full text-left hover:bg-gray-100"
                  onClick={() => {
                    setShowColumnMenu(false);
                    setShowFilterMenu(true);
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    className="mr-2"
                  >
                    <path
                      d="M4.085 9.49926C4.1883 9.20657 4.37987 8.95312 4.6333 8.77384C4.88673 8.59456 5.18954 8.49828 5.5 8.49828C5.81046 8.49828 6.11327 8.59456 6.3667 8.77384C6.62013 8.95312 6.8117 9.20657 6.915 9.49926H12V10.499H6.915C6.8117 10.7917 6.62013 11.0452 6.3667 11.2244C6.11327 11.4037 5.81046 11.5 5.5 11.5C5.18954 11.5 4.88673 11.4037 4.6333 11.2244C4.37987 11.0452 4.1883 10.7917 4.085 10.499H2V9.49926H4.085ZM7.085 6.00012C7.1883 5.70743 7.37987 5.45397 7.6333 5.27469C7.88673 5.09542 8.18954 4.99914 8.5 4.99914C8.81046 4.99914 9.11327 5.09542 9.3667 5.27469C9.62013 5.45397 9.8117 5.70743 9.915 6.00012H12V6.99988H9.915C9.8117 7.29257 9.62013 7.54603 9.3667 7.72531C9.11327 7.90458 8.81046 8.00086 8.5 8.00086C8.18954 8.00086 7.88673 7.90458 7.6333 7.72531C7.37987 7.54603 7.1883 7.29257 7.085 6.99988H2V6.00012H7.085ZM4.085 2.50098C4.1883 2.20829 4.37987 1.95483 4.6333 1.77555C4.88673 1.59627 5.18954 1.5 5.5 1.5C5.81046 1.5 6.11327 1.59627 6.3667 1.77555C6.62013 1.95483 6.8117 2.20829 6.915 2.50098H12V3.50073H6.915C6.8117 3.79343 6.62013 4.04688 6.3667 4.22616C6.11327 4.40544 5.81046 4.50171 5.5 4.50171C5.18954 4.50171 4.88673 4.40544 4.6333 4.22616C4.37987 4.04688 4.1883 3.79343 4.085 3.50073H2V2.50098H4.085Z"
                      fill="#636363"
                    />
                  </svg>
                  <span>Filter</span>
                </button>
                <button
                  className="flex items-center px-4 py-2 text-[12px] font-inter font-[500] text-textHeading w-full text-left hover:bg-gray-100"
                  onClick={() => {
                    setShowColumnMenu(false);
                    exportToCSV();
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    className="mr-2"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M2.09961 11.8999C2.09961 11.5133 2.41301 11.1999 2.79961 11.1999H11.1996C11.5862 11.1999 11.8996 11.5133 11.8996 11.8999C11.8996 12.2865 11.5862 12.5999 11.1996 12.5999H2.79961C2.41301 12.5999 2.09961 12.2865 2.09961 11.8999ZM4.40463 6.50493C4.678 6.23156 5.12122 6.23156 5.39458 6.50493L6.29961 7.40995L6.29961 2.0999C6.29961 1.7133 6.61301 1.3999 6.99961 1.3999C7.38621 1.3999 7.69961 1.7133 7.69961 2.0999L7.69961 7.40995L8.60463 6.50493C8.878 6.23156 9.32122 6.23156 9.59458 6.50493C9.86795 6.77829 9.86795 7.22151 9.59458 7.49488L7.49458 9.59488C7.36331 9.72615 7.18526 9.7999 6.99961 9.7999C6.81396 9.7999 6.63591 9.72615 6.50463 9.59488L4.40463 7.49488C4.13127 7.22151 4.13127 6.77829 4.40463 6.50493Z"
                      fill="#636363"
                    />
                  </svg>
                  <span>Export</span>
                </button>
              </div>
            )}
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search Add-ons"
              className="pl-10 pr-4 py-2 border border-grey-border rounded-custom7px text-[14px] font-inter font-[400] text-paragraphBlack focus:outline-none focus:ring-1 focus:ring-bgButton"
              value={searchQuery}
              onChange={handleSearch}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
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
                  d="M6.40156 3.2001C4.63425 3.2001 3.20156 4.63279 3.20156 6.4001C3.20156 8.16741 4.63425 9.6001 6.40156 9.6001C8.16887 9.6001 9.60156 8.16741 9.60156 6.4001C9.60156 4.63279 8.16887 3.2001 6.40156 3.2001ZM1.60156 6.4001C1.60156 3.74913 3.7506 1.6001 6.40156 1.6001C9.05253 1.6001 11.2016 3.74913 11.2016 6.4001C11.2016 7.43676 10.8729 8.39667 10.3142 9.18133L14.1672 13.0344C14.4797 13.3468 14.4797 13.8534 14.1672 14.1658C13.8548 14.4782 13.3483 14.4782 13.0359 14.1658L9.18279 10.3127C8.39813 10.8715 7.43823 11.2001 6.40156 11.2001C3.7506 11.2001 1.60156 9.05106 1.60156 6.4001Z"
                  fill="#949494"
                />
              </svg>
            </div>
          </div>
          <button className="px-5 py-2 bg-bgButton text-white rounded-custom text-[12px] font-inter font-[600]">
            Create New
          </button>
        </div>
      </div>

      {/* Table - Same as desktop view */}
      <div className="overflow-y-auto">
        <table className="min-w-full divide-y divide-reloadBorder">
          <thead className="bg-background-grey">
            <tr>
              <th scope="col" className="w-12 px-6 py-3 text-left">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-bgButton accent-bgButton rounded border-gray-300"
                  checked={
                    selectedItems.length === addons.length && addons.length > 0
                  }
                  onChange={toggleSelectAll}
                />
              </th>
              {visibleColumns.addons && (
                <th
                  scope="col"
                  className="px-16 py-3 text-left text-[12px] font-inter font-[600] text-headding-color"
                >
                  Add-ons
                </th>
              )}
              {visibleColumns.assignedTo && (
                <th
                  scope="col"
                  className="px-2 py-3 text-left text-[12px] font-inter font-[600] text-headding-color "
                >
                  Assigned to
                </th>
              )}
              {visibleColumns.type && (
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-[12px] font-inter font-[600] text-headding-color"
                >
                  Type
                </th>
              )}
              {visibleColumns.dateAdded && (
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-[12px] font-inter font-[600] text-headding-color"
                >
                  Date added
                </th>
              )}
              {visibleColumns.status && (
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-[12px] font-inter font-[600] text-headding-color"
                >
                  Status
                </th>
              )}
              {visibleColumns.action && (
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-[12px] font-inter font-[600] text-headding-color"
                >
                  Action
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems.map((addon) => (
              <tr key={addon.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-bgButton accent-bgButton rounded border-gray-300"
                    checked={selectedItems.includes(addon.id)}
                    onChange={() => toggleSelect(addon.id)}
                  />
                </td>
                {visibleColumns.addons && (
                  <td className="px-2 py-4">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0 bg-gray-100 rounded-md flex items-center justify-center mr-3">
                        <svg
                          className="h-6 w-6 text-gray-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16m-7 6h7"
                          />
                        </svg>
                      </div>
                      <div>
                        <div className="ps-1 text-[12px] font-inter font-[500] text-textHeading">
                          {addon.name}
                        </div>
                        <div className="ps-1 text-[12px] font-inter font-[400] text-cardTitle mt-1">
                          {addon.description}
                        </div>
                      </div>
                    </div>
                  </td>
                )}
                {visibleColumns.assignedTo && (
                  <td className="px-2 py-4">
                    <div className="flex flex-col">
                      <div className="flex items-center">
                        <span className="text-[12px] font-inter font-[500] text-textHeading">
                          {addon.assignedTo.name}
                        </span>
                        <button className="ml-6 mt-4 text-gray-400">
                          <svg
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                      <span className="text-[12px] font-inter font-[400] text-cardTitle mt-1">
                        & {addon.assignedTo.count} more products
                      </span>
                    </div>
                  </td>
                )}
                {visibleColumns.type && (
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-[14px] font-inter font-[500] text-textHeading">
                      {addon.type}
                    </span>
                  </td>
                )}
                {visibleColumns.dateAdded && (
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-[14px] font-inter font-[500] text-textHeading">
                      {addon.dateAdded}
                    </span>
                  </td>
                )}
                {visibleColumns.status && (
                  <td className="px-6 py-4 whitespace-nowrap">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={addon.isActive}
                        onChange={() => toggleActive(addon.id)}
                      />
                      <div
                        className={`w-12 h-6 rounded-full transition ${
                          addon.isActive ? "bg-bgButton" : "bg-gray-300"
                        }`}
                      >
                        <div
                          className={`absolute w-4 h-4 bg-white rounded-full transition-transform ${
                            addon.isActive ? "translate-x-7" : "translate-x-1"
                          } top-1`}
                        ></div>
                      </div>
                    </label>
                  </td>
                )}
                {visibleColumns.action && (
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <button className="text-gray-500 hover:text-gray-700 inline-flex justify-center">
                      <svg
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination - Same as desktop view */}
      <div className="bg-tableFooter px-4 py-3 flex items-center justify-between border-t border-gray-200 ">
        <div className="flex-1 flex justify-between items-center">
          <div>
            <p className="text-[12px] font-inter font-[500] text-headding-color">
              Showing results {indexOfFirstItem + 1}-
              {Math.min(indexOfLastItem, filteredAddons.length)} out of{" "}
              {filteredAddons.length}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              className={`px-2 py-1 rounded-md text-cardValue ${
                currentPage === 1 ? "opacity-50" : ""
              }`}
              onClick={goToPreviousPage}
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
              className={`px-2 py-1 rounded-md text-cardValue ${
                currentPage === totalPages ? "opacity-50" : ""
              }`}
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
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
                className="appearance-none block w-20 px-4 py-3 border border-gray-300 bg-reloadBackground rounded-custom text-cardValue text-[12px] font-inter font-[400]"
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
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
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="">
      {renderMobileView()}
      {renderTabletView()}
      <div className="hidden lg:block">{renderDesktopView()}</div>
    </div>
  );
};

export default AddonsTable;
