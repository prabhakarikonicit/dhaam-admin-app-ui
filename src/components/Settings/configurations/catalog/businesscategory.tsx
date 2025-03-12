import React, { useState } from "react";
import { PenSquare, Trash2, Search, ChevronLeft } from "lucide-react";
import CustomDataGrid from "../../../common/datagrid";
import ToggleSwitch from "../../../common/toggleSwitch";
import CustomModal, { FieldDefinition } from "../../../common/modals";

// Define BusinessCategory interface
interface BusinessCategory {
  id: string;
  order: number;
  name: string;
  image: string;
  enabled: boolean;
}

// Define props interface for BusinessCategoryManagement
export interface BusinessCategoryManagementProps {
  onClose: () => void;
  onSave: (data: any) => void;
}

const BusinessCategory: React.FC<BusinessCategoryManagementProps> = ({
  onClose,
  onSave,
}) => {
  // State for categories
  const [categories, setCategories] = useState<BusinessCategory[]>([
    { id: "1", order: 1, name: "Food", image: "/food.png", enabled: true },
    {
      id: "2",
      order: 2,
      name: "Pharmacy",
      image: "/pharmacy.png",
      enabled: false,
    },
    { id: "3", order: 3, name: "Home", image: "/home.png", enabled: true },
    {
      id: "4",
      order: 4,
      name: "Personal Care",
      image: "/personal-care.png",
      enabled: false,
    },
    {
      id: "5",
      order: 5,
      name: "Convenience Items",
      image: "/convenience.png",
      enabled: true,
    },
    {
      id: "6",
      order: 6,
      name: "Gifts & Flowers",
      image: "/gifts.png",
      enabled: false,
    },
  ]);

  // Filter states
  const [activeFilter, setActiveFilter] = useState<
    "All" | "Active" | "Inactive"
  >("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Selected rows for DataGrid
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<BusinessCategory | null>(null);

  // Category fields for the modal
  const categoryFields: FieldDefinition[] = [
    {
      id: "order",
      label: "Order",
      type: "select",
      options: [
        { value: "1", label: "1" },
        { value: "2", label: "2" },
        { value: "3", label: "3" },
        { value: "4", label: "4" },
        { value: "5", label: "5" },
        { value: "6", label: "6" },
        { value: "7", label: "7" },
        { value: "8", label: "8" },
        { value: "9", label: "9" },
        { value: "10", label: "10" },
      ],
      required: true,
    },
    {
      id: "name",
      label: "Name",
      type: "text",
      placeholder: "Name",
      required: true,
    },
    {
      id: "image",
      label: "Upload Business Category Image",
      type: "file", // Note: This may need to be adjusted based on your CustomModal implementation
      required: false,
    },
  ];

  // Handler for toggling category status
  const toggleCategoryStatus = (id: string) => {
    setCategories(
      categories.map((category) => {
        if (category.id === id) {
          return { ...category, enabled: !category.enabled };
        }
        return category;
      })
    );
  };

  // Open modal to add a new category
  const handleAddCategory = () => {
    setSelectedCategory(null);
    setIsModalOpen(true);
  };

  // Handle editing category
  const handleEditCategory = (row: any) => {
    const category = categories.find((c) => c.id === row.id);
    if (category) {
      setSelectedCategory(category);
      setIsModalOpen(true);
    }
  };

  // Handle deleting category
  const handleDeleteCategory = (row: any) => {
    setCategories(categories.filter((category) => category.id !== row.id));
  };

  // Handle save from modal
  const handleSaveCategory = (data: any) => {
    if (selectedCategory) {
      // Update existing category
      setCategories(
        categories.map((category) =>
          category.id === selectedCategory.id
            ? {
                ...category,
                order: parseInt(data.order) || category.order,
                name: data.name || category.name,
                image: data.image || category.image,
              }
            : category
        )
      );
    } else {
      // Add new category
      const newCategory: BusinessCategory = {
        id: Date.now().toString(),
        order: parseInt(data.order) || categories.length + 1,
        name: data.name || "New Category",
        image: data.image || "/placeholder.png",
        enabled: true,
      };
      setCategories([...categories, newCategory]);
    }
    setIsModalOpen(false);
  };

  // Filter categories based on active filter and search term
  const getFilteredCategories = () => {
    let filtered = [...categories];

    // Apply active/inactive filter
    if (activeFilter === "Active") {
      filtered = filtered.filter((category) => category.enabled);
    } else if (activeFilter === "Inactive") {
      filtered = filtered.filter((category) => !category.enabled);
    }

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter((category) =>
        category.name.toLowerCase().includes(term)
      );
    }

    return filtered;
  };

  const filteredCategories = getFilteredCategories();

  // SelectAll and SelectRow functions
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedRows(filteredCategories.map((category) => category.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id: string) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  // Define columns for the DataGrid
  const categoryColumns = [
    { field: "order", headerName: "Order", width: "10%" },
    {
      field: "image",
      headerName: "Image",
      width: "15%",
      renderCell: (value: string) => (
        <div className="w-10 h-10 rounded-md overflow-hidden flex items-center justify-center bg-gray-100">
          <img
            src={value}
            alt="Category"
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://via.placeholder.com/40";
            }}
          />
        </div>
      ),
    },
    { field: "name", headerName: "Event", width: "45%" },
    {
      field: "action",
      headerName: "Action",
      width: "15%",
      renderCell: (value: any, row: any) => (
        <div className="flex items-center">
          <button onClick={() => handleDeleteCategory(row)} className="p-1">
            <Trash2 className="w-5 h-5 text-gray-600" />
          </button>
          <button onClick={() => handleEditCategory(row)} className="p-1 ml-2">
            <PenSquare className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      ),
    },
    {
      field: "enabled",
      headerName: "",
      width: "15%",
      renderCell: (value: boolean, row: any) => (
        <ToggleSwitch
          checked={value}
          onChange={() => toggleCategoryStatus(row.id)}
          aria-labelledby={`category-status-${row.id}`}
        />
      ),
    },
  ];

  // Handle final save
  const handleSaveAll = () => {
    onSave(categories);
  };

  return (
    <div className="rounded-lg p-4 ">
      {/* Header */}
      <div className="flex items-center justify-between p-6  border border-grey-border mt-2 rounded-custom12px bg-backgroundWhite">
        <div className="flex items-center">
          <button
            onClick={onClose}
            className="p-1 mr-2 rounded-custom6px hover:bg-gray-100 border border-reloadBorder"
          >
            {/* <ChevronLeft className="w-5 h-5 text-gray-600" /> */}
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
                d="M6.79488 11.6946C6.52151 11.968 6.0783 11.968 5.80493 11.6946L1.60493 7.49458C1.33156 7.22122 1.33156 6.778 1.60493 6.50463L5.80493 2.30463C6.0783 2.03127 6.52151 2.03127 6.79488 2.30463C7.06825 2.578 7.06825 3.02122 6.79488 3.29458L3.78985 6.29961H11.8999C12.2865 6.29961 12.5999 6.61301 12.5999 6.99961C12.5999 7.38621 12.2865 7.69961 11.8999 7.69961L3.78985 7.69961L6.79488 10.7046C7.06824 10.978 7.06824 11.4212 6.79488 11.6946Z"
                fill="#212121"
              />
            </svg>
          </button>
          <h2 className="text-paragraphBlack font-inter text-[14px] font-[600px] leading-[21px]">
            Business Category
          </h2>
        </div>
        <button
          onClick={onClose}
          className="text-paragraphBlack font-inter text-[14px] font-[600px] leading-[21px] hover:underline"
        >
          Learn More
        </button>
      </div>

      {/* Main content */}

      <div className="p-6 border border-grey-border mt-2 rounded-custom12px  bg-backgroundWhite">
        <div className="flex justify-end items-center p-6">
          <button
            onClick={handleAddCategory}
            className="px-4 py-2 text-[12px] font-inter font-[500] text-paragraphBlack bg-backgroundWhite rounded-lg border border-reloadBorder"
          >
            Add New
          </button>
        </div>
        {/* Actions bar */}
        <div className="flex justify-between items-center mb-4 ">
          <div className="flex">
            <button
              onClick={() => setActiveFilter("All")}
              className={`px-4 py-2 text-[12px] rounded-custom4px text-textHeading  ${
                activeFilter === "All"
                  ? "bg-subMenus font-inter border-2 border border-cardTitle"
                  : "bg-white"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveFilter("Active")}
              className={`px-4 py-2 text-[12px] rounded-custom4px text-textHeading ${
                activeFilter === "Active"
                  ? "bg-subMenus font-inter border-2 border border-cardTitle"
                  : "bg-white"
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setActiveFilter("Inactive")}
              className={`px-4 py-2 text-[12px] rounded-custom4px text-textHeading ${
                activeFilter === "Inactive"
                  ? "bg-subMenus font-inter border-2 border border-cardTitle"
                  : "bg-white"
              }`}
            >
              Inactive
            </button>
          </div>

          {/* Search bar */}
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="pl-10 pr-24  py-2 w-full border border-gray-300 rounded-lg text-sm"
              placeholder="Search Business Category"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Data Grid */}
        <div className="border rounded-lg overflow-x-auto">
          <CustomDataGrid
            columns={categoryColumns}
            rows={filteredCategories}
            selectedRows={selectedRows}
            onSelectAll={handleSelectAll}
            onSelectRow={handleSelectRow}
            searchPlaceholder=""
            hideToolbar={true}
          />
        </div>
      </div>

      {/* Custom Modal for category operations */}
      <CustomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={selectedCategory ? "edit" : "add"}
        fields={categoryFields}
        item={
          selectedCategory
            ? {
                id: selectedCategory.id,
                order: selectedCategory.order,
                name: selectedCategory.name,
                image: selectedCategory.image,
                isActive: selectedCategory.enabled,
              }
            : undefined
        }
        onSave={handleSaveCategory}
        title={
          selectedCategory ? "Edit Business Category" : "Add Business Category"
        }
        size="md"
        formLayout="grid"
        gridColumns={2}
        showToggle={false}
        confirmText="Save"
      />
    </div>
  );
};

export default BusinessCategory;
