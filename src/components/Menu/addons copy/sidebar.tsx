import React, { useState, useRef } from "react";
import Food from "../../../lib/Images/food.png";

// Define addon interface
interface Addon {
  id: string;
  name: string;
  selectionType: "single" | "multi";
  options: Array<{
    name: string;
    price: string;
    isDefault?: boolean;
  }>;
  mandatoryOption: boolean;
  image?: File;
  products: string[];
}

interface FileItem {
  name: string;
  size: string;
  id: number;
}

const AddonSidebar: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSave: (addon: Addon) => void;
}> = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState<Addon>({
    id: Date.now().toString(),
    name: "",
    selectionType: "single",
    options: [
      { name: "", price: "" },
      { name: "", price: "" },
      { name: "", price: "" },
    ],
    mandatoryOption: true,
    products: [],
  });

  const [files, setFiles] = useState<FileItem[]>([]);
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

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleOptionChange = (index: number, field: string, value: string) => {
    setFormData((prev) => {
      const updatedOptions = [...prev.options];
      updatedOptions[index] = { ...updatedOptions[index], [field]: value };
      return { ...prev, options: updatedOptions };
    });
  };

  const handleAddOption = () => {
    setFormData((prev) => ({
      ...prev,
      options: [...prev.options, { name: "", price: "" }],
    }));
  };

  const handleRemoveOption = (index: number) => {
    if (formData.options.length <= 1) return;

    setFormData((prev) => {
      const updatedOptions = prev.options.filter((_, i) => i !== index);
      return { ...prev, options: updatedOptions };
    });
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
      <div className="relative w-full max-w-3xl bg-white shadow-xl overflow-y-auto h-[calc(100vh-10px)] max-h-[900px]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-reloadBorder bg-background-grey">
          <h2 className="text-[16px] font-[600] font-inter">Add New Add-On</h2>
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
        <div className="py-4 px-10 space-y-6">
          {/* Add-On Name */}
          <div>
            <label className="block text-[12px] font-inter font-[500] text-paragraphBlack mb-2">
              Add-On Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Add-On name"
              className="w-full px-3 py-4 border border-reloadBorder rounded-custom8px font-[14px] font-inter font-[400] text-paragraphBlack focus:outline-none focus:ring-1 focus:ring-purple-600"
              required
            />
          </div>

          {/* Selection Type */}
          <div>
            <div className="flex space-x-4 items-center">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="singleSelection"
                  name="selectionType"
                  checked={formData.selectionType === "single"}
                  onChange={() => handleChange("selectionType", "single")}
                  className="h-5 w-5 accent-bgButton focus:ring-bgButton"
                />
                <label
                  htmlFor="singleSelection"
                  className="ml-2 text-[14px] font-inter font-[500] text-textHeading"
                >
                  Single Selection
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="multiSelection"
                  name="selectionType"
                  checked={formData.selectionType === "multi"}
                  onChange={() => handleChange("selectionType", "multi")}
                  className="h-5 w-5 accent-bgButton focus:ring-bgButton"
                />
                <label
                  htmlFor="multiSelection"
                  className="ml-2 text-[14px] font-inter font-[500] text-textHeading"
                >
                  Multi Selection
                </label>
              </div>
            </div>
          </div>

          {/* Options */}
          {formData.options.map((option, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center mb-2">
                <label className="block text-[12px] font-inter font-[500] text-paragraphBlack">
                  Options {index + 1}
                </label>
                <span className="text-bgButton cursor-pointer ml-1">
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
              </div>
              <div className="flex gap-4">
                <div className="w-3/5">
                  <input
                    type="text"
                    value={option.name}
                    onChange={(e) =>
                      handleOptionChange(index, "name", e.target.value)
                    }
                    placeholder={`Option ${index + 1}`}
                    className="w-full px-3 py-2 border border-reloadBorder rounded-lg font-[14px] font-inter font-[400] text-paragraphBlack focus:outline-none focus:ring-1 focus:ring-purple-600"
                  />
                </div>
                <div className="w-2/5">
                  <input
                    type="text"
                    value={option.price}
                    onChange={(e) =>
                      handleOptionChange(index, "price", e.target.value)
                    }
                    placeholder="Price"
                    className="w-full px-3 py-2 border border-reloadBorder rounded-lg font-[14px] font-inter font-[400] text-paragraphBlack focus:outline-none focus:ring-1 focus:ring-purple-600"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    <label
                      htmlFor={`toggle-${index}`}
                      className="relative inline-block w-10 h-6 cursor-pointer"
                    >
                      <input
                        id={`toggle-${index}`}
                        type="checkbox"
                        className="sr-only"
                      />
                      <div className="w-10 h-6 bg-gray-200 rounded-full"></div>
                      <div className="absolute w-4 h-4 transition-transform bg-white rounded-full dot left-1 top-1"></div>
                    </label>
                  </div>
                  {/* Show plus icon for the last option, delete icon for others */}
                  {index === formData.options.length - 1 ? (
                    <button
                      type="button"
                      onClick={handleAddOption}
                      className="text-bgButton"
                    >
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
                          d="M10 3C10.5523 3 11 3.44772 11 4V9H16C16.5523 9 17 9.44772 17 10C17 10.5523 16.5523 11 16 11H11V16C11 16.5523 10.5523 17 10 17C9.44772 17 9 16.5523 9 16V11H4C3.44772 11 3 10.5523 3 10C3 9.44771 3.44772 9 4 9L9 9V4C9 3.44772 9.44772 3 10 3Z"
                          fill="#636363"
                        />
                      </svg>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleRemoveOption(index)}
                      className="text-gray-500"
                      disabled={formData.options.length <= 1}
                    >
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
                          d="M9 2C8.62123 2 8.27497 2.214 8.10557 2.55279L7.38197 4H4C3.44772 4 3 4.44772 3 5C3 5.55228 3.44772 6 4 6L4 16C4 17.1046 4.89543 18 6 18H14C15.1046 18 16 17.1046 16 16V6C16.5523 6 17 5.55228 17 5C17 4.44772 16.5523 4 16 4H12.618L11.8944 2.55279C11.725 2.214 11.3788 2 11 2H9ZM7 8C7 7.44772 7.44772 7 8 7C8.55228 7 9 7.44772 9 8V14C9 14.5523 8.55228 15 8 15C7.44772 15 7 14.5523 7 14V8ZM12 7C11.4477 7 11 7.44772 11 8V14C11 14.5523 11.4477 15 12 15C12.5523 15 13 14.5523 13 14V8C13 7.44772 12.5523 7 12 7Z"
                          fill="#636363"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Mandatory Option */}
          <div className="flex items-center space-x-3">
            <label className="text-[14px] font-inter font-[500] text-textHeading">
              One option is mandatory
            </label>
            <label
              htmlFor="mandatoryOption"
              className="relative inline-block w-12 h-6 cursor-pointer"
            >
              <input
                type="checkbox"
                id="mandatoryOption"
                checked={formData.mandatoryOption}
                onChange={(e) =>
                  handleChange("mandatoryOption", e.target.checked)
                }
                className="sr-only"
              />
              <div
                className={`absolute left-0 top-0 w-12 h-6 rounded-full transition-colors duration-200 ease-in-out ${
                  formData.mandatoryOption ? "bg-bgButton" : "bg-gray-300"
                }`}
              ></div>
              <div
                className={`absolute w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-200 ease-in-out ${
                  formData.mandatoryOption ? "translate-x-7" : "translate-x-1"
                } top-1`}
              ></div>
            </label>
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
                <span className="text-reloadBorder font-inter font-[400] text-[10px] md:text-[12px] sm:text-[12px] lg:text-[12px] xl:text-[12px] mx-3 whitespace-nowrap">
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
              />
            </div>

            {/* File Previews */}
            {files.length > 0 && (
              <div className="flex space-x-4">
                {files.map((file) => (
                  <div
                    key={file.id}
                    className="border border-grey-border rounded-custom8px p-4 bg-white"
                    style={{ width: "220px" }}
                  >
                    <div className="flex items-center">
                      <div className="h-12 w-12 mr-3">
                        <img
                          src={Food}
                          alt={file.name}
                          className="h-full w-full object-cover rounded-custom border border-grey-border"
                        />
                      </div>
                      <div className="flex flex-col flex-grow">
                        <span className="text-textHeading font-inter text-[12px] font-[500] mb-1">
                          {file.name}
                        </span>
                        <span className="text-cardTitle font-inter text-[11px] font-[500]">
                          {file.size}
                        </span>
                      </div>
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
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Assign to Product */}
          <div>
            <label className="block text-[12px] font-inter font-[500] text-paragraphBlack mb-2">
              Assign to Product
            </label>
            <div className="relative">
              <select
                value={formData.products[0] || ""}
                onChange={(e) => handleChange("products", [e.target.value])}
                className={`w-full px-3 py-3 border border-reloadBorder text-[14px] font-inter font-[400] rounded-custom8px focus:outline-none focus:ring-1 focus:ring-purple-600 appearance-none ${
                  formData.products.length > 0
                    ? "text-paragraphBlack"
                    : "text-reloadBorder"
                }`}
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

export default AddonSidebar;
