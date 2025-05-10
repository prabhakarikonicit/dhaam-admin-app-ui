import React, { useState, useRef } from "react";

// Define combo interface
interface Combo {
  id: string;
  name: string;
  price: string;
  description: string;
  products: string[];
  image?: File;
}

interface FileItem {
  name: string;
  size: string;
  id: number;
}

const ComboSidebar: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSave: (combo: Combo) => void;
}> = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState<Combo>({
    id: Date.now().toString(),
    name: "",
    price: "",
    description: "",
    products: [],
  });

  const [selectedProducts, setSelectedProducts] = useState<string[]>([
    "Chicken Biryani",
    "Raita",
    "Salad",
    "Gulab Jamun",
  ]);

  const [files, setFiles] = useState<FileItem[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedProduct, setSelectedProduct] = useState<string>("");

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

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddProduct = () => {
    if (selectedProduct && !selectedProducts.includes(selectedProduct)) {
      setSelectedProducts([...selectedProducts, selectedProduct]);
      setSelectedProduct("");
    }
  };

  const handleRemoveProduct = (product: string) => {
    setSelectedProducts(selectedProducts.filter((p) => p !== product));
  };

  const handleSubmit = () => {
    // Update products list in formData before saving
    const updatedFormData = {
      ...formData,
      products: selectedProducts,
    };
    onSave(updatedFormData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      ></div>

      {/* Sidebar */}
      <div className="relative w-full max-w-3xl bg-white shadow-xl overflow-auto h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-reloadBorder bg-background-grey">
          <h2 className="text-[16px] font-[600] font-inter text-paragraphBlack">
            Create New Combo
          </h2>
          {/* Desktop buttons - hide on mobile */}
          <div className="hidden md:flex space-x-2">
            <button
              onClick={onClose}
              className="px-5 py-2 bg-white text-cardValue rounded-custom font-inter border border-reloadBorder"
            >
              Discard
            </button>
            <button
              onClick={handleSubmit}
              className="px-5 py-2 bg-bgButton text-whiteColor rounded-custom font-inter border border-reloadBorder"
            >
              Save
            </button>
          </div>
        </div>

        {/* Form Content */}
        <div className="py-6 px-6 space-y-6">
          <div className="flex space-x-4">
            {/* Combo Name */}
            <div className="flex-1 ">
              <label className="block text-[12px] font-inter font-[500] text-paragraphBlack mb-2">
                Combo Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Biryani Feast"
                className="w-full px-3 py-3 border border-reloadBorder rounded-custom8px font-[14px] font-inter font-[400] text-paragraphBlack focus:outline-none focus:ring-1 focus:ring-purple-600"
                required
              />
            </div>

            {/* Combo Price */}
            <div className="flex-1">
              <label className="block text-[12px] font-inter font-[500] text-paragraphBlack mb-2">
                Combo Price
              </label>
              <input
                type="text"
                value={formData.price}
                onChange={(e) => handleChange("price", e.target.value)}
                placeholder="$13.99"
                className="w-full px-3 py-3 border border-reloadBorder rounded-custom8px font-[14px] font-inter font-[400] text-paragraphBlack focus:outline-none focus:ring-1 focus:ring-purple-600"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-[12px] font-inter font-[500] text-paragraphBlack mb-2">
              Description
            </label>
            <div className="relative">
              <textarea
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Write here"
                rows={4}
                className="w-full px-3 py-3 border border-reloadBorder rounded-custom8px font-[14px] font-inter font-[400] text-paragraphBlack focus:outline-none focus:ring-1 focus:ring-purple-600"
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

          {/* Select Product */}
          <div>
            <label className="block text-[12px] font-inter font-[500] text-paragraphBlack mb-2">
              Select Product
            </label>
            <div className="relative">
              <select
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
                className={`w-full px-3 py-3 border border-reloadBorder ${
                  selectedProduct ? "text-paragraphBlack" : "text-reloadBorder"
                } text-[14px] font-inter font-[400] rounded-custom8px focus:outline-none focus:ring-1 focus:ring-purple-600 appearance-none`}
              >
                <option
                  value=""
                  disabled
                  className="text-paragraphBlack text-[14px] font-inter font-[400] rounded-custom8px"
                >
                  Select
                </option>
                <option
                  value="Chicken Biryani"
                  className="text-paragraphBlack text-[14px] font-inter font-[400] rounded-custom8px"
                >
                  Chicken Biryani
                </option>
                <option
                  value="Vegetable Biryani"
                  className="text-paragraphBlack text-[14px] font-inter font-[400] rounded-custom8px"
                >
                  Vegetable Biryani
                </option>
                <option
                  value="Raita"
                  className="text-paragraphBlack text-[14px] font-inter font-[400] rounded-custom8px"
                >
                  Raita
                </option>
                <option
                  value="Salad"
                  className="text-paragraphBlack text-[14px] font-inter font-[400] rounded-custom8px"
                >
                  Salad
                </option>
                <option
                  value="Gulab Jamun"
                  className="text-paragraphBlack text-[14px] font-inter font-[400] rounded-custom8px"
                >
                  Gulab Jamun
                </option>
                <option
                  value="Kheer"
                  className="text-paragraphBlack text-[14px] font-inter font-[400] rounded-custom8px"
                >
                  Kheer
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

          {/* Selected Products */}
          <div>
            <label className="block text-[12px] font-inter font-[500] text-paragraphBlack mb-2">
              Selected Product
            </label>
            <div className="space-y-2">
              {selectedProducts.map((product, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between px-3 py-3 border border-reloadBorder rounded-custom8px"
                >
                  <span className="text-[12px] font-inter font-[400] text-paragraphBlack">
                    {product}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveProduct(product)}
                    className="text-gray-400"
                  >
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
                        d="M7.20039 1.6001C6.89737 1.6001 6.62036 1.7713 6.48485 2.04233L5.90596 3.2001H3.20039C2.75856 3.2001 2.40039 3.55827 2.40039 4.0001C2.40039 4.44193 2.75856 4.8001 3.20039 4.8001L3.20039 12.8001C3.20039 13.6838 3.91674 14.4001 4.80039 14.4001H11.2004C12.084 14.4001 12.8004 13.6838 12.8004 12.8001V4.8001C13.2422 4.8001 13.6004 4.44193 13.6004 4.0001C13.6004 3.55827 13.2422 3.2001 12.8004 3.2001H10.0948L9.51593 2.04233C9.38042 1.7713 9.10341 1.6001 8.80039 1.6001H7.20039ZM5.60039 6.4001C5.60039 5.95827 5.95856 5.6001 6.40039 5.6001C6.84222 5.6001 7.20039 5.95827 7.20039 6.4001V11.2001C7.20039 11.6419 6.84222 12.0001 6.40039 12.0001C5.95856 12.0001 5.60039 11.6419 5.60039 11.2001V6.4001ZM9.60039 5.6001C9.15856 5.6001 8.80039 5.95827 8.80039 6.4001V11.2001C8.80039 11.6419 9.15856 12.0001 9.60039 12.0001C10.0422 12.0001 10.4004 11.6419 10.4004 11.2001V6.4001C10.4004 5.95827 10.0422 5.6001 9.60039 5.6001Z"
                        fill="#949494"
                      />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Image Upload */}
          <div>
            {/* File Drop Area */}
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer"
              onClick={handleClick}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <div className="flex items-center justify-center">
                <span className="text-reloadBorder font-inter font-[400] text-[10px] md:text-[12px] sm:text-[12px] lg:text-[12px] xl:text-[12px] mx-3 whitespace-nowrap mx-3">
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
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <input
                type="file"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileInputChange}
                accept="image/*"
              />
            </div>
          </div>
        </div>
        {/* Mobile buttons at bottom - only visible on mobile */}

        <div className="md:hidden mt-14 shadow-custom-top bg-background-grey grid grid-cols-2 gap-3 p-4">

          <button
            onClick={onClose}
            className="py-3 bg-backgroundWhite text-cardValue rounded-custom8px font-inter border border-reloadBorder text-center"
          >
            Discard
          </button>
          <button
            onClick={handleSubmit}
            className="py-3 bg-bgButton text-white rounded-custom8px font-inter text-center"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComboSidebar;
