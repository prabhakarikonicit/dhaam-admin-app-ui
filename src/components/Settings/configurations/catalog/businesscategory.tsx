import React, { useState, useRef } from "react";
import { PenSquare, Trash2, Search, ChevronLeft } from "lucide-react";
import CustomDataGrid from "../../../common/datagrid";
import ToggleSwitch from "../../../common/toggleSwitch";
import CustomModal, { FieldDefinition } from "../../../common/modals";
import Food from "../../../../lib/Images/food.png"
import FileUpload from "../../../common/fileupload";
// Define BusinessCategory interface
interface BusinessCategory {
  id: string;
  order: number;
  name: string;
  image: string;
  enabled: boolean;
}
interface UploadedFile {
  name: string;
  size: number;
  // Add other properties your File object might have
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
  const fileInputRef = useRef<HTMLInputElement>(null);
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  // State for modal

  const [formData, setFormData] = useState<{
    order: string;
    name: string;
    image: UploadedFile | null;
    isActive: boolean;
  }>({
    order: "",
    name: "",
    image: null,
    isActive: false,
  });

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
  const handleFileUpload = (file: UploadedFile) => {
    setFormData({
      ...formData,
      image: file,
    });
  };
  // Function to handle file deletion
  const handleFileDelete = () => {
    setFormData({
      ...formData,
      image: null,
    });
  };

  // Handle form field changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle saving the categor

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
                d="M7.20003 1.59961C6.89701 1.59961 6.62 1.77081 6.48448 2.04184L5.9056 3.19961H3.20002C2.7582 3.19961 2.40002 3.55778 2.40002 3.99961C2.40002 4.44144 2.7582 4.79961 3.20002 4.79961L3.20002 12.7996C3.20002 13.6833 3.91637 14.3996 4.80002 14.3996H11.2C12.0837 14.3996 12.8 13.6833 12.8 12.7996V4.79961C13.2419 4.79961 13.6 4.44144 13.6 3.99961C13.6 3.55778 13.2419 3.19961 12.8 3.19961H10.0945L9.51557 2.04184C9.38005 1.77081 9.10304 1.59961 8.80003 1.59961H7.20003ZM5.60002 6.39961C5.60002 5.95778 5.9582 5.59961 6.40002 5.59961C6.84185 5.59961 7.20002 5.95778 7.20002 6.39961V11.1996C7.20002 11.6414 6.84185 11.9996 6.40002 11.9996C5.9582 11.9996 5.60002 11.6414 5.60002 11.1996V6.39961ZM9.60003 5.59961C9.1582 5.59961 8.80002 5.95778 8.80002 6.39961V11.1996C8.80002 11.6414 9.1582 11.9996 9.60003 11.9996C10.0419 11.9996 10.4 11.6414 10.4 11.1996V6.39961C10.4 5.95778 10.0419 5.59961 9.60003 5.59961Z"
                fill="#2B2B2B"
              />
            </svg>
          </button>
          <button onClick={() => handleEditCategory(row)} className="p-1 ml-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M13.9313 2.06824C13.3065 1.4434 12.2934 1.4434 11.6686 2.06824L5.59998 8.13687V10.3996H7.86271L13.9313 4.33098C14.5562 3.70614 14.5562 2.69308 13.9313 2.06824Z"
                fill="#2B2B2B"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M1.59998 4.79961C1.59998 3.91595 2.31632 3.19961 3.19998 3.19961H6.39998C6.8418 3.19961 7.19998 3.55778 7.19998 3.99961C7.19998 4.44144 6.8418 4.79961 6.39998 4.79961H3.19998V12.7996H11.2V9.59961C11.2 9.15778 11.5581 8.79961 12 8.79961C12.4418 8.79961 12.8 9.15778 12.8 9.59961V12.7996C12.8 13.6833 12.0836 14.3996 11.2 14.3996H3.19998C2.31632 14.3996 1.59998 13.6833 1.59998 12.7996V4.79961Z"
                fill="#2B2B2B"
              />
            </svg>
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
    <div className="max-w-full rounded-lg p-1 md:p-0 lg:p-0 lg:p-0 xl:p-0 sm:max-h-full md:max-h-full lg:max-h-full xl:max-h-full max-h-[80vh] overflow-y-auto sm:overflow-visible md:overflow-visible lg:overflow-visible xl:overflow-visible mt-0 sm:mt-8 md:mt-8 lg:mt-12 xl:12">
      {/* Header */}
      <div className="flex items-center justify-between p-6 rounded-custom12px bg-backgroundWhite">
        <div className="flex items-center">
          <button
            onClick={onClose}
            className="p-1 mr-2 rounded-custom bg-backgroundWhite border border border-reloadBorder"
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
          <h2 className="text-paragraphBlack font-inter text-[14px] font-[600] leading-[21px] ms-4">
            Business Category
          </h2>
        </div>
        <button
          onClick={onClose}
          className="text-cardValue font-inter text-[14px] font-[600] leading-[21px] hover:underline"
        >
          Learn More
        </button>
      </div>

      {/* Main content */}

      <div className="p-4 border border-grey-border mt-2 rounded-custom12px  bg-backgroundWhite">
        <div className="flex justify-end items-center p-6">
          <button
            onClick={handleAddCategory}
            className="px-4 py-2 text-[12px] font-inter font-[600] text-cardValue bg-backgroundWhite border border-reloadBorder rounded-custom"
          >
            Add New
          </button>
        </div>
        {/* Actions bar */}
        <div className="flex justify-between items-center mb-4 ">
          <div className="flex">
            <button
              onClick={() => setActiveFilter("All")}
              className={`px-4 py-2 text-[12px] rounded-custom4px font-inter text-textHeading  ${
                activeFilter === "All"
                  ? "bg-subMenus font-inter border-1 border border-cardTitle"
                  : "bg-white"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveFilter("Active")}
              className={`px-4 py-2 text-[12px] font-inter rounded-custom4px text-textHeading ${
                activeFilter === "Active"
                  ? "bg-subMenus font-inter border-2 border border-cardTitle"
                  : "bg-white"
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setActiveFilter("Inactive")}
              className={`px-4 py-2 text-[12px] font-inter rounded-custom4px text-textHeading ${
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
              {/* <Search className="h-4 w-4 text-gray-400" /> */}
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
                  d="M6.39998 3.19961C4.63266 3.19961 3.19998 4.6323 3.19998 6.39961C3.19998 8.16692 4.63266 9.59961 6.39998 9.59961C8.16729 9.59961 9.59998 8.16692 9.59998 6.39961C9.59998 4.6323 8.16729 3.19961 6.39998 3.19961ZM1.59998 6.39961C1.59998 3.74864 3.74901 1.59961 6.39998 1.59961C9.05094 1.59961 11.2 3.74864 11.2 6.39961C11.2 7.43627 10.8713 8.39618 10.3126 9.18084L14.1657 13.0339C14.4781 13.3463 14.4781 13.8529 14.1657 14.1653C13.8532 14.4777 13.3467 14.4777 13.0343 14.1653L9.1812 10.3122C8.39655 10.871 7.43664 11.1996 6.39998 11.1996C3.74901 11.1996 1.59998 9.05058 1.59998 6.39961Z"
                  fill="#949494"
                />
              </svg>
            </div>
            <input
              type="text"
              className="pl-10 pr-24 py-2 w-full border border-gray-300 font-inter font-[400]  rounded-custom7px text-[12px]"
              placeholder="Search Business Category"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Data Grid */}
        <div className="overflow-x-auto">
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
        formLayout="custom"
        customFooter={
          <div className="w-full px-2 pt-0 pb-4">
            {/* Form Content */}
            <div className="mb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* Order Field */}
                <div>
                  <label className="block text-[12px] font-[500] font-inter text-paragraphBlack mb-2">
                    Order
                  </label>
                  <div className="relative">
                    <select
                      name="order"
                      value={formData.order}
                      onChange={handleInputChange}
                      className="block w-full px-3 py-4 focus:border-indigo-300 rounded-custom8px border border-reloadBorder font-inter font-[14px] font-[400] text-reloadBorder focus:ring focus:ring-indigo-200 focus:ring-opacity-50 appearance-none "
                    >
                      <option value="" className="text-paragraphBlack">Select</option>
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                        <option key={num} value={num} className="text-paragraphBlack">
                          {num}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="21"
                        viewBox="0 0 20 21"
                        fill="none"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M5.29289 7.79289C5.68342 7.40237 6.31658 7.40237 6.70711 7.79289L10 11.0858L13.2929 7.79289C13.6834 7.40237 14.3166 7.40237 14.7071 7.79289C15.0976 8.18342 15.0976 8.81658 14.7071 9.20711L10.7071 13.2071C10.3166 13.5976 9.68342 13.5976 9.29289 13.2071L5.29289 9.20711C4.90237 8.81658 4.90237 8.18342 5.29289 7.79289Z"
                          fill="#636363"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Name Field */}
                <div>
                  <label className="block text-[12px] font-[500] font-inter text-paragraphBlack mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Name"
                    className="block w-full px-3 py-4 focus:border-indigo-300 rounded-custom8px border border-reloadBorder font-inter font-[14px] font-[400] text-reloadBorder focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
              </div>

              {/* Upload Business Category Image Label */}
              <label className="block text-[12px] font-[500] font-inter text-paragraphBlack mb-2">
                Upload Business Category Image
              </label>

              {/* Upload Component - Dashed border area */}
              <div
                className="border-[2px] border-dashed border-reloadBorder rounded-custom10px p-6 flex items-center justify-between text-start cursor-pointer hover:bg-gray-50 mb-4"
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                    handleFileUpload(
                      e.dataTransfer.files[0] as unknown as UploadedFile
                    );
                  }
                }}
              >
                <div className="flex items-center">
                  <p className="text-[12px] font-[500] font-inter text-reloadBorder">
                    Drop item here or Browse file
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        handleFileUpload(
                          e.target.files[0] as unknown as UploadedFile
                        );
                      }
                    }}
                    accept="image/*"
                  />
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                >
                  <path
                    d="M3.33334 13.8337L3.33334 14.667C3.33334 16.0477 4.45263 17.167 5.83334 17.167L14.1667 17.167C15.5474 17.167 16.6667 16.0477 16.6667 14.667L16.6667 13.8337M13.3333 7.16699L10 3.83366M10 3.83366L6.66668 7.16699M10 3.83366L10 13.8337"
                    stroke="#636363"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>

              {/* Displayed file after upload */}
              {formData.image && (
                <div className="border border-grey-border rounded-custom8px p-3 flex items-center w-[45%] md:w-[50%]">
                  <div className="flex items-center flex-1">
                    <div className="w-12 h-12 bg-orange-100 rounded-md flex items-center justify-center mr-3 overflow-hidden">
                      <img
                        src={Food}
                        alt="Food"
                        className="w-12 h-12"
                      />
                    </div>
                    <div>
                      <p className="text-[13px] font-inter text-gray-700">
                        {formData.image.name}
                      </p>
                      <p className="text-[12px] font-inter text-gray-500">
                        {(formData.image.size / (1024 * 1024)).toFixed(1)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleFileDelete}
                    className="ml-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
  <path d="M15.8333 6.33333L15.1105 16.4521C15.0482 17.3243 14.3225 18 13.4481 18H6.55184C5.67745 18 4.95171 17.3243 4.88941 16.4521L4.16665 6.33333M8.33331 9.66667V14.6667M11.6666 9.66667V14.6667M12.5 6.33333V3.83333C12.5 3.3731 12.1269 3 11.6666 3H8.33331C7.87308 3 7.49998 3.3731 7.49998 3.83333V6.33333M3.33331 6.33333H16.6666" stroke="#DB1F1F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
                  </button>
                </div>
              )}
            </div>

            {/* Footer buttons */}
            <div className="pt-4 pb-0 flex justify-end">
              <button
                onClick={handleSaveCategory}
                className="rounded-custom border border-btnBorder shadow-sm px-4 py-2 bg-bgButton text-[12px] font-[600] font-inter text-paragraphBlack text-white"
              >
                Save
              </button>
            </div>
          </div>
        }
        showToggle={false}
        confirmText="Save"
      />
    </div>
  );
};

export default BusinessCategory;
