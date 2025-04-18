import React, { useState, useEffect, useRef } from "react";
import AddOnsModal from "./addonsmodal";
import Food from "../../../lib/Images/food.png";
// Define product interface
interface Product {
  id: string;
  name: string;
  price: string;
  comparePrice?: string;
  description?: string;
  category?: string;
  addOns?: string[];
  preparationTime?: string;
  sku?: string;
  minQuantity?: number;
  maxQuantity?: number;
  discount?: string;
  relatedProducts?: string[];
  images?: File[];
  isActive: boolean;
  variants?: {
    optionName: string;
    values: string[];
  }[];
  taxable?: boolean;
}
interface FileItem {
  name: string;
  size: string;
  id: number;
}
interface VariantOption {
  id: string;
  value: string;
  color?: string;
}

interface VariantProps {
  onDone?: (optionName: string, values: string[]) => void;
}

const ProductSidebar: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
}> = ({ isOpen, onClose, onSave }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  console.log(isSidebarOpen);
  const [isAddOnsModalOpen, setIsAddOnsModalOpen] = useState(false); // Add this line
  const [formData, setFormData] = useState<Product>({
    id: Date.now().toString(),
    name: "",
    price: "",
    comparePrice: "",
    description: "",
    taxable: true,
    isActive: true,
  });

  const [optionName, setOptionName] = useState<string>("");
  const [optionValues, setOptionValues] = useState<VariantOption[]>([
    { id: "1", value: "Small" },
    { id: "2", value: "Medium" },
    { id: "3", value: "Large" },
  ]);

  const handleRemoveOption = (id: string) => {
    setOptionValues(optionValues.filter((option) => option.id !== id));
  };

  const handleDeleteAll = () => {
    setOptionValues([]);
  };

  const handleDone = () => {
    // Create a new variant object
    const newVariant = {
      optionName: optionName,
      values: optionValues.map((option) => option.value),
    };

    // Update the formData with the new variant
    setFormData((prev) => {
      // If there are existing variants, add to them
      if (prev.variants) {
        return {
          ...prev,
          variants: [...prev.variants, newVariant],
        };
      }
      // Otherwise create a new variants array
      else {
        return {
          ...prev,
          variants: [newVariant],
        };
      }
    });

    // Optional: Clear the inputs after saving
    // setOptionName('');
    // setOptionValues([]);
  };

  const handleAddAnotherOption = () => {
    // This would typically open a new option panel or add a new field section
    console.log("Add another option clicked");
  };
  const [files, setFiles] = useState<FileItem[]>([
    { name: "Food.png", size: "2.0 MB", id: 1 },
    { name: "Food.png", size: "2.0 MB", id: 2 },
    { name: "Food.png", size: "2.0 MB", id: 3 },
  ]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    if (e.dataTransfer.files.length) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFiles = (newFiles: FileList): void => {
    const filesArray = Array.from(newFiles).map((file, index) => ({
      name: file.name,
      size: formatFileSize(file.size),
      id: Date.now() + index,
    }));

    setFiles([...files, ...filesArray]);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return parseFloat((bytes / Math.pow(1024, i)).toFixed(1)) + " " + sizes[i];
  };

  const handleRemove = (id: number): void => {
    setFiles(files.filter((file) => file.id !== id));
  };

  const handleClick = (): void => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (e.target.files && e.target.files.length) {
      handleFiles(e.target.files);
    }
  };
  // Add these handlers
  const handleOpenAddOnsModal = () => {
    setIsAddOnsModalOpen(true);
    // onClose(); // This will call the parent's onClose function which sets isSidebarOpen to false
  };
  const handleSaveAddOns = () => {
    // Add logic to save the add-ons here
    setIsAddOnsModalOpen(false);
  };

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex justify-end p-1">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      ></div>

      {/* Sidebar */}
      <div className="relative w-full max-w-4xl bg-white shadow-xl overflow-auto h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-reloadBorder bg-background-grey">
          <h2 className="text-[16px] font-[600] font-inter ">
            Add New Product
          </h2>
          <div className="flex items-center space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-[12px] font-[600] font-inter text-cardValue bg-white border border-reloadBorder rounded-custom hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-6 py-2 text-[12px] font-[600] font-inter text-whiteColor bg-bgButton border border-btnBorder rounded-custom hover:bg-purple-700"
            >
              Save
            </button>
          </div>
        </div>

        {/* Form Content */}
        <div className="py-4 px-10  space-y-4">
          {/* Product Name */}
          <div>
            <label className="block text-[12px] font-inter font-[500] text-paragraphBlack mb-2">
              Product Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Product name"
              className="w-full px-3 py-4 border border-reloadBorder rounded-custom8px font-[14px] font-inter font-[400] text-paragraphBlack focus:outline-none focus:ring-1 focus:ring-purple-600"
              required
            />
          </div>

          {/* Price */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-inter font-[500] text-paragraphBlack mb-2">
                Price <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.price}
                onChange={(e) => handleChange("price", e.target.value)}
                placeholder="Price"
                className="w-full px-3 py-4 border border-reloadBorder rounded-custom8px font-[14px] font-inter font-[400] text-paragraphBlack focus:outline-none focus:ring-1 focus:ring-purple-600"
                required
              />
            </div>
            <div>
              <label className="block text-[12px] font-inter font-[500] text-paragraphBlack mb-2">
                Compare-at price
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={formData.comparePrice || ""}
                  onChange={(e) => handleChange("comparePrice", e.target.value)}
                  placeholder="Compare price"
                  className="w-full px-3 py-4 border border-reloadBorder rounded-custom8px font-[14px] font-inter font-[400] text-paragraphBlack focus:outline-none focus:ring-1 focus:ring-purple-600"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M10.8333 13.3333H10V10H9.16667M10 6.66667H10.0083M17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C14.1421 2.5 17.5 5.85786 17.5 10Z"
                      stroke="#C2C2C2"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Tax Checkbox */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="taxable"
              checked={formData.taxable || false}
              onChange={(e) => handleChange("taxable", e.target.checked)}
              className="h-4 w-4 text-bgButton rounded border-gray-300 accent-bgButton focus:ring-purple-500"
            />
            <label
              htmlFor="taxable"
              className="ml-2 pt-2 text-[14px] font-inter font-[500] text-textHeading mb-2"
            >
              Charge tax on this product
            </label>
            <button className="ml-2 text-[12px] font-inter font-[600] text-cardValue underline decoration-solid decoration-auto underline-offset-auto">
              Setup Tax
            </button>
          </div>

          {/* Description with Icon in Top-Right */}
          <div>
            <label className="block text-[12px] font-inter font-[500] text-paragraphBlack mb-2">
              Description
            </label>
            <div className="relative">
              <textarea
                value={formData.description || ""}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Write here"
                rows={4}
                className="w-full px-3 py-2 border border-reloadBorder rounded-custom8px font-[14px] font-inter font-[400] text-paragraphBlack focus:outline-none focus:ring-1 focus:ring-purple-600"
              />
              <div className="absolute top-2 right-2">
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
                    d="M6.43751 4.5C6.88624 4.5 7.25001 4.83579 7.25001 5.25V6H8.06251C8.51125 6 8.87502 6.33579 8.87502 6.75C8.87502 7.16421 8.51125 7.5 8.06251 7.5H7.25001V8.25C7.25001 8.66421 6.88624 9 6.43751 9C5.98878 9 5.62501 8.66421 5.62501 8.25V7.5H4.8125C4.36377 7.5 4 7.16421 4 6.75C4 6.33579 4.36377 6 4.8125 6H5.62501V5.25C5.62501 4.83579 5.98878 4.5 6.43751 4.5ZM6.43751 12C6.88624 12 7.25001 12.3358 7.25001 12.75V13.5H8.06251C8.51125 13.5 8.87502 13.8358 8.87502 14.25C8.87502 14.6642 8.51125 15 8.06251 15H7.25001V15.75C7.25001 16.1642 6.88624 16.5 6.43751 16.5C5.98878 16.5 5.62501 16.1642 5.62501 15.75V15H4.8125C4.36377 15 4 14.6642 4 14.25C4 13.8358 4.36377 13.5 4.8125 13.5H5.62501V12.75C5.62501 12.3358 5.98878 12 6.43751 12Z"
                    fill="#4F4F4F"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12.125 4.5C12.4936 4.5 12.8161 4.72911 12.9104 5.05808L13.8686 8.3992L16.5935 9.85036C16.845 9.9843 17 10.232 17 10.5C17 10.768 16.845 11.0157 16.5935 11.1496L13.8686 12.6008L12.9104 15.9419C12.8161 16.2709 12.4936 16.5 12.125 16.5C11.7563 16.5 11.4339 16.2709 11.3395 15.9419L10.3814 12.6008L7.65648 11.1496C7.40497 11.0157 7.25001 10.768 7.25001 10.5C7.25001 10.232 7.40497 9.98431 7.65648 9.85036L10.3814 8.3992L11.3395 5.05808C11.4339 4.72911 11.7563 4.5 12.125 4.5Z"
                    fill="#4F4F4F"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Map with Category */}
          {/* Category and Add-Ons in same line */}
          <div className="grid grid-cols-2 gap-4">
            {/* Map with Category */}
            <div>
              <label className="block text-[12px] font-inter font-[500] text-paragraphBlack mb-2">
                Map with Category
              </label>
              <div className="relative">
                <select
                  value={formData.category || ""}
                  onChange={(e) => handleChange("category", e.target.value)}
                  className={`w-full px-3 py-3 border border-reloadBorder ${
                    formData.category
                      ? "text-paragraphBlack"
                      : "text-reloadBorder"
                  } text-[14px] font-inter font-[400] rounded-custom8px focus:outline-none focus:ring-1 focus:ring-bgButton appearance-none`}
                >
                  <option
                    value=""
                    disabled
                    className="text-paragraphBlack text-[14px] font-inter font-[400] rounded-custom8px"
                  >
                    Select category
                  </option>
                  <option
                    value="category1"
                    className="text-paragraphBlack text-[14px] font-inter font-[400] rounded-custom8px"
                  >
                    Category 1
                  </option>
                  <option
                    value="category2"
                    className="text-paragraphBlack text-[14px] font-inter font-[400] rounded-custom8px"
                  >
                    Category 2
                  </option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
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
                      d="M5.29289 7.29289C5.68342 6.90237 6.31658 6.90237 6.70711 7.29289L10 10.5858L13.2929 7.29289C13.6834 6.90237 14.3166 6.90237 14.7071 7.29289C15.0976 7.68342 15.0976 8.31658 14.7071 8.70711L10.7071 12.7071C10.3166 13.0976 9.68342 13.0976 9.29289 12.7071L5.29289 8.70711C4.90237 8.31658 4.90237 7.68342 5.29289 7.29289Z"
                      fill="#949494"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Select Add-Ons */}
            <div>
              <label className="block text-[12px] font-inter font-[500] text-paragraphBlack mb-2">
                Select Add-Ons
              </label>
              <div className="relative">
                <select
                  value={formData.addOns?.[0] || ""}
                  onChange={(e) => handleChange("addOns", [e.target.value])}
                  className={`w-full px-3 py-3 border border-reloadBorder ${
                    formData.addOns &&
                    formData.addOns.length > 0 &&
                    formData.addOns[0] !== ""
                      ? "text-paragraphBlack"
                      : "text-reloadBorder"
                  } text-[14px] font-inter font-[400] rounded-custom8px focus:outline-none focus:ring-1 focus:ring-bgButton appearance-none`}
                >
                  <option
                    value=""
                    disabled
                    className="text-paragraphBlack text-[14px] font-inter font-[400] rounded-custom8px"
                  >
                    Select Add-Ons
                  </option>
                  <option
                    value="addon1"
                    className="text-paragraphBlack text-[14px] font-inter font-[400] rounded-custom8px"
                  >
                    Add-On 1
                  </option>
                  <option
                    value="addon2"
                    className="text-paragraphBlack text-[14px] font-inter font-[400] rounded-custom8px"
                  >
                    Add-On 2
                  </option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
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
                      d="M5.29289 7.29289C5.68342 6.90237 6.31658 6.90237 6.70711 7.29289L10 10.5858L13.2929 7.29289C13.6834 6.90237 14.3166 6.90237 14.7071 7.29289C15.0976 7.68342 15.0976 8.31658 14.7071 8.70711L10.7071 12.7071C10.3166 13.0976 9.68342 13.0976 9.29289 12.7071L5.29289 8.70711C4.90237 8.31658 4.90237 7.68342 5.29289 7.29289Z"
                      fill="#949494"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Preparation Time & SKU */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-inter font-[500] text-paragraphBlack mb-2">
                Preparation Time
              </label>
              <input
                type="text"
                value={formData.preparationTime || ""}
                onChange={(e) =>
                  handleChange("preparationTime", e.target.value)
                }
                placeholder="Enter time"
                className="w-full px-3 py-3 border border-reloadBorder text-paragraphBlack text-[14px] font-inter font-[400] rounded-custom8px focus:outline-none focus:ring-1 focus:ring-purple-600"
              />
            </div>
            <div>
              <label className="block text-[12px] font-inter font-[500] text-paragraphBlack mb-2">
                SKU
              </label>
              <input
                type="text"
                value={formData.sku || ""}
                onChange={(e) => handleChange("sku", e.target.value)}
                placeholder="SKU"
                className="w-full px-3 py-3 border border-reloadBorder text-paragraphBlack text-[14px] font-inter font-[400] rounded-custom8px focus:outline-none focus:ring-1 focus:ring-purple-600"
              />
            </div>
          </div>

          {/* Min/Max Quantity */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-inter font-[500] text-paragraphBlack mb-2">
                Minimum Quantity to Order
              </label>
              <input
                type="number"
                value={formData.minQuantity || 1}
                onChange={(e) => handleChange("minQuantity", e.target.value)}
                placeholder="1"
                min={1}
                className="w-full px-3 py-3 border border-reloadBorder text-paragraphBlack text-[14px] font-inter font-[400] rounded-custom8px focus:outline-none focus:ring-1 focus:ring-purple-600"
              />
            </div>
            <div>
              <label className="block text-[12px] font-inter font-[500] text-paragraphBlack mb-2">
                Maximum Quantity to Order
              </label>
              <input
                type="number"
                value={formData.maxQuantity || ""}
                onChange={(e) => handleChange("maxQuantity", e.target.value)}
                placeholder="Enter"
                className="w-full px-3 py-3 border border-reloadBorder text-paragraphBlack text-[14px] font-inter font-[400] rounded-custom8px focus:outline-none focus:ring-1 focus:ring-purple-600"
              />
            </div>
          </div>

          {/* Discount & Related Products */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[12px] font-inter font-[500] text-paragraphBlack mb-2">
                Select Discount
              </label>
              <div className="relative">
                <select
                  value={formData.discount || ""}
                  onChange={(e) => handleChange("discount", e.target.value)}
                  className={`w-full px-3 py-3 border border-reloadBorder ${
                    formData.discount
                      ? "text-paragraphBlack"
                      : "text-reloadBorder"
                  } text-[14px] font-inter font-[400] rounded-custom8px focus:outline-none focus:ring-1 focus:ring-bgButton appearance-none`}
                >
                  <option
                    value=""
                    disabled
                    className="text-paragraphBlack text-[14px] font-inter font-[400] rounded-custom8px"
                  >
                    Select discount
                  </option>
                  <option
                    value="discount1"
                    className="text-paragraphBlack text-[14px] font-inter font-[400] rounded-custom8px"
                  >
                    Discount 1
                  </option>
                  <option
                    value="discount2"
                    className="text-paragraphBlack text-[14px] font-inter font-[400] rounded-custom8px"
                  >
                    Discount 2
                  </option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M5.29289 7.29289C5.68342 6.90237 6.31658 6.90237 6.70711 7.29289L10 10.5858L13.2929 7.29289C13.6834 6.90237 14.3166 6.90237 14.7071 7.29289C15.0976 7.68342 15.0976 8.31658 14.7071 8.70711L10.7071 12.7071C10.3166 13.0976 9.68342 13.0976 9.29289 12.7071L5.29289 8.70711C4.90237 8.31658 4.90237 7.68342 5.29289 7.29289Z"
                      fill="#949494"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-[12px] font-inter font-[500] text-paragraphBlack mb-2">
                Frequently Bought Together
                <span className="inline-block ml-1 h-4 w-4 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M8.66667 10.6667H8V8H7.33333M8 5.33333H8.00667M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8Z"
                      stroke="#636363"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </span>
              </label>
              <div className="relative">
                <select
                  value={formData.relatedProducts?.[0] || ""}
                  onChange={(e) =>
                    handleChange("relatedProducts", [e.target.value])
                  }
                  className={`w-full px-3 py-3 border border-reloadBorder ${
                    formData.relatedProducts &&
                    formData.relatedProducts.length > 0 &&
                    formData.relatedProducts[0] !== ""
                      ? "text-paragraphBlack"
                      : "text-reloadBorder"
                  } text-[14px] font-inter font-[400] rounded-custom8px focus:outline-none focus:ring-1 focus:ring-bgButton appearance-none`}
                >
                  <option
                    value=""
                    disabled
                    className="text-paragraphBlack text-[14px] font-inter font-[400] rounded-custom8px"
                  >
                    Select product
                  </option>
                  <option
                    value="product1"
                    className="text-paragraphBlack text-[14px] font-inter font-[400] rounded-custom8px"
                  >
                    Product 1
                  </option>
                  <option
                    value="product2"
                    className="text-paragraphBlack text-[14px] font-inter font-[400] rounded-custom8px"
                  >
                    Product 2
                  </option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M5.29289 7.29289C5.68342 6.90237 6.31658 6.90237 6.70711 7.29289L10 10.5858L13.2929 7.29289C13.6834 6.90237 14.3166 6.90237 14.7071 7.29289C15.0976 7.68342 15.0976 8.31658 14.7071 8.70711L10.7071 12.7071C10.3166 13.0976 9.68342 13.0976 9.29289 12.7071L5.29289 8.70711C4.90237 8.31658 4.90237 7.68342 5.29289 7.29289Z"
                      fill="#949494"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Image Upload */}
          <div>
            {/* File Drop Area */}
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer mb-4"
              onClick={handleClick}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <div className="flex items-center justify-center">
                <span className="text-reloadBorder font-inter font-[400] font-[14px] mx-3">
                  Choose a file or drag & drop your image here
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="21"
                  height="20"
                  viewBox="0 0 21 20"
                  fill="none"
                >
                  <path
                    d="M3.83301 13.3332L3.83301 14.1665C3.83301 15.5472 4.9523 16.6665 6.33301 16.6665L14.6663 16.6665C16.0471 16.6665 17.1663 15.5472 17.1663 14.1665L17.1663 13.3332M13.833 6.6665L10.4997 3.33317M10.4997 3.33317L7.16634 6.6665M10.4997 3.33317L10.4997 13.3332"
                    stroke="#636363"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <input
                type="file"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileInputChange}
                multiple
              />
            </div>
            <div>
              {/* File Previews - Perfectly matching the screenshot */}
              <div className="flex space-x-4">
                {files.map((file) => (
                  <div
                    key={file.id}
                    className="border border-grey-border rounded-custom8px p-4 bg-white"
                    style={{ width: "220px" }}
                  >
                    <div className="flex items-center">
                      {/* File Thumbnail */}
                      <div className="h-12 w-12 mr-3">
                        <img
                          src={Food}
                          alt={file.name}
                          className="h-full w-full object-cover rounded-custom border border-grey-border"
                        />
                      </div>

                      {/* File Name and Size */}
                      <div className="flex flex-col flex-grow">
                        <span className="text-textHeading font-inter text-[12px] font-[500] mb-1">
                          {file.name}
                        </span>
                        <span className="text-cardTitle font-inter text-[11px] font-[500] ">
                          {file.size}
                        </span>
                      </div>

                      {/* Delete Button */}
                      <button
                        type="button"
                        onClick={() => handleRemove(file.id)}
                        className="text-red-500 mb-8"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="21"
                          height="20"
                          viewBox="0 0 21 20"
                          fill="none"
                        >
                          <path
                            d="M16.5 5.83333L15.7772 15.9521C15.7149 16.8243 14.9892 17.5 14.1148 17.5H7.21853C6.34413 17.5 5.6184 16.8243 5.5561 15.9521L4.83333 5.83333M9 9.16667V14.1667M12.3333 9.16667V14.1667M13.1667 5.83333V3.33333C13.1667 2.8731 12.7936 2.5 12.3333 2.5H9C8.53976 2.5 8.16667 2.8731 8.16667 3.33333V5.83333M4 5.83333H17.3333"
                            stroke="#DB1F1F"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>


          {/* Make Live Toggle - Fixed Version */}
          <div className="flex items-center ms-5 border-t border-b border-reloadBorder">
            <span className="text-[14px] font-inter font-[500] text-textHeading py-6">
              Make this product live
            </span>
            <label
              htmlFor="isActive"
              className="relative inline-block w-12 h-6 mx-4 cursor-pointer"
            >
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => handleChange("isActive", e.target.checked)}
                className="sr-only"
              />
              <div
                className={`absolute left-0 top-0 w-12 h-6 rounded-full transition-colors duration-200 ease-in-out ${
                  formData.isActive ? "bg-bgButton" : "bg-gray-300"
                }`}
              ></div>
              <div
                className={`absolute w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-200 ease-in-out ${
                  formData.isActive ? "translate-x-7" : "translate-x-1"
                } top-1`}
              ></div>
            </label>
          </div>

          {/* Variants Section */}
          <div className="p-5 bg-backgroundWhite shadow-custom border border-subMenus">
            <h3 className="text-[14px] font-inter font-[500] text-textHeading mb-4">
              Variants
            </h3>
            <div className="border border-gray-200 rounded-md p-4">
              <div className="mb-4">
                <label className="block text-[12px] font-inter font-[500] text-paragraphBlack mb-2">
                  Option name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Size"
                  value={optionName}
                  onChange={(e) => setOptionName(e.target.value)}
                  className="w-full px-3 py-3 border border-reloadBorder text-paragraphBlack text-[14px] font-inter font-[400] rounded-custom8px focus:outline-none focus:ring-1 focus:ring-purple-600"
                />
              </div>

              <div className="mb-4">
                <label className="block text-[12px] font-inter font-[500] text-paragraphBlack mb-2">
                  Option values
                </label>
                <div className="space-y-2">
                  {optionValues.map((option) => (
                    <div
                      key={option.id}
                      className="flex items-center  border border-gray-200 rounded-md p-2"
                    >
                      <div className="cursor-move mr-2">
                        <svg
                          className="h-4 w-4 text-gray-400"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8 10H16M8 14H16M9 18L12 21L15 18M9 6L12 3L15 6"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <span className="flex-1 text-[12px] font-inter font-[400] text-menuSubHeadingColor">
                        {option.value}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveOption(option.id)}
                        className="text-gray-500 hover:text-gray-700"
                        aria-label="Remove option"
                      >
                        <svg
                          className="h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end ">
                <button
                  type="button"
                  onClick={handleDeleteAll}
                  className="px-5 py-2 text-[12px] font-inter font-[600] border border-reloadBorder bg-backgroundWhite rounded-custom text-maroon hover:text-maroon mx-4"
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={handleDone}
                  className="px-5 py-2 text-[12px] font-inter font-[600] border border-reloadBorder bg-bgButton rounded-custom text-whiteColor hover:bg-purple-700 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Done
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={handleOpenAddOnsModal}
              className="mt-2 inline-flex items-center px-4 py-2 border border-reloadBorder text-[12px] font-inter font-[600] rounded-custom text-cardValue bg-backgroundWhite hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-purple-500"
            >
              <svg
                className="mr-2 -ml-1 h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Add another option
            </button>

            {/* Variant Pricing */}
            <div className="mt-6 border-t py-3  ">
              <h4 className="text-[14px] font-inter font-[500] rounded-custom text-cardValue mb-4">
                Small
              </h4>
              <div className="bg-backgroundWhite mb-4 overflow-hidden">
                {/* Small variant */}
                <div className="border border-reloadBorder rounded-custom mb-2">
                  <div className="grid grid-cols-3 items-center">
                    <div className="flex items-center p-4">
                      <div className="flex items-center justify-center w-10 h-10 mr-3 bg-gray-50 rounded-md border border-gray-200">
                        <svg
                          className="w-5 h-5 text-purple-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          ></path>
                        </svg>
                      </div>
                      <span className="text-[12px] font-inter font-[500] text-cardValue">
                        Small
                      </span>
                    </div>
                    <div className="p-2">
                      <input
                        type="text"
                        placeholder="Price"
                        className="w-full px-4 py-3 border border-reloadBorder font-[12px] font-inter font-[400] rounded-custom text-paragraphBlack focus:outline-none focus:ring-1 focus:ring-purple-600"
                      />
                    </div>
                    <div className="p-2">
                      <input
                        type="text"
                        placeholder="Compare Price"
                        className="w-full px-4 py-3 border border-reloadBorder font-[12px] font-inter font-[400] rounded-custom text-paragraphBlack focus:outline-none focus:ring-1 focus:ring-purple-600"
                      />
                    </div>
                  </div>
                </div>

                {/* Medium variant */}
                <div className="border border-reloadBorder rounded-custom mb-2">
                  <div className="grid grid-cols-3 items-center">
                    <div className="flex items-center p-4">
                      <div className="flex items-center justify-center w-10 h-10 mr-3 bg-gray-50 rounded-md border border-gray-200">
                        <svg
                          className="w-5 h-5 text-purple-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          ></path>
                        </svg>
                      </div>
                      <span className="text-[12px] font-inter font-[500] text-cardValue">
                        Medium
                      </span>
                    </div>
                    <div className="p-2">
                      <input
                        type="text"
                        placeholder="Price"
                        className="w-full px-4 py-3 border border-reloadBorder font-[12px] font-inter font-[400] rounded-custom text-paragraphBlack focus:outline-none focus:ring-1 focus:ring-purple-600"
                      />
                    </div>
                    <div className="p-2">
                      <input
                        type="text"
                        placeholder="Compare Price"
                        className="w-full px-4 py-3 border border-reloadBorder font-[12px] font-inter font-[400] rounded-custom text-paragraphBlack focus:outline-none focus:ring-1 focus:ring-purple-600"
                      />
                    </div>
                  </div>
                </div>

                {/* Large variant */}
                <div className="border border-reloadBorder rounded-custom mb-2">
                  <div className="grid grid-cols-3 items-center">
                    <div className="flex items-center p-4">
                      <div className="flex items-center justify-center w-10 h-10 mr-3 bg-gray-50 rounded-md border border-gray-200">
                        <svg
                          className="w-5 h-5 text-purple-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          ></path>
                        </svg>
                      </div>
                      <span className="text-[12px] font-inter font-[500] text-cardValue">
                        Large
                      </span>
                    </div>
                    <div className="p-2">
                      <input
                        type="text"
                        placeholder="Price"
                        className="w-full px-4 py-3 border border-reloadBorder font-[12px] font-inter font-[400] rounded-custom text-paragraphBlack focus:outline-none focus:ring-1 focus:ring-purple-600"
                      />
                    </div>
                    <div className="p-2">
                      <input
                        type="text"
                        placeholder="Compare Price"
                        className="w-full px-4 py-3 border border-reloadBorder font-[12px] font-inter font-[400] rounded-custom text-paragraphBlack focus:outline-none focus:ring-1 focus:ring-purple-600"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <AddOnsModal
            isOpen={isAddOnsModalOpen}
            onClose={() => setIsAddOnsModalOpen(false)}
            onSave={handleSaveAddOns}
            productName="product_name"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductSidebar;
