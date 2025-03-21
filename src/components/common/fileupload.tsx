import React, { useRef, useState } from "react";

// File Upload Component with optional delete icon
const FileUpload: React.FC<{
  label: string;
  description?: string;
  dimensions?: string;
  fileInfo?: { name: string; size: string };
  placeholderText?: string;
  onUpload?: (file: File) => void;
  onDelete?: () => void;
}> = ({
  label,
  description,
  dimensions,
  fileInfo,
  placeholderText = "Choose a file or drag & drop your file here",
  onUpload,
  onDelete,
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Handle click on the upload area
    const handleClick = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    };

    // Handle file selection through the file input
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const selectedFile = e.target.files[0];
        if (onUpload) {
          onUpload(selectedFile);
        }
      }
    };

    // Handle drop event
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const droppedFile = e.dataTransfer.files[0];
        if (onUpload) {
          onUpload(droppedFile);
        }
      }
    };

    return (
      <div className="mb-6 bg-backgroundWhite">
        <div className="flex items-center mb-1">
          <h3 className="text-[12px] md:text-[14px] sm:text-[14px] lg:text-[14px] xl:text-[14px] font-inter font-[600] text-headding-color">
            {label}
          </h3>
          {dimensions && (
            <span className="text-[10px] md:text-[12px] sm:text-[12px] lg:text-[12px] xl:text-[12px] font-inter text-textHeading ml-2">
              ({dimensions})
            </span>
          )}
        </div>
        {description && (
          <p className="text-[10px] md:text-[12px] sm:text-[12px] lg:text-[12px] xl:text-[12px] font-inter text-cardTitle mb-2">
            {description}
          </p>
        )}

        {fileInfo ? (
          <div
            className={`border-2 border rounded-md p-3 flex items-center ${label.toLowerCase().includes("favicon")
                ? "w-[50%] md:w-[40%] lg:w-[30%]" // Custom width for favicon
                : "w-full" // Default width
              }`}
          >
            <div className="flex items-center flex-1">
              {label.toLowerCase().includes("favicon") ? (
                <div className="w-12 h-12 bg-red-100 flex items-center justify-center rounded mr-2">
                  <span className="text-red-600 text-lg font-bold">A</span>
                </div>
              ) : (
                <div className="w-12 h-12 bg-gray-100 flex items-center justify-end rounded mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              )}
              <div>
                <p className="text-[12px] font-inter text-cardTitle">{fileInfo.name}</p>
                <p className="text-[12px] font-inter text-cardTitle">{fileInfo.size}</p>
              </div>
            </div>
            <button onClick={onDelete} className="text-red-500 hover:text-red-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M15.833 5.83333L15.1102 15.9521C15.0479 16.8243 14.3222 17.5 13.4478 17.5H6.55154C5.67714 17.5 4.95141 16.8243 4.88911 15.9521L4.16634 5.83333M8.33301 9.16667V14.1667M11.6663 9.16667V14.1667M12.4997 5.83333V3.33333C12.4997 2.8731 12.1266 2.5 11.6663 2.5H8.33301C7.87277 2.5 7.49967 2.8731 7.49967 3.33333V5.83333M3.33301 5.83333H16.6663"
                  stroke="#DB1F1F"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        ) : (
          <div
            className="border-2 border-dashed rounded-md p-6 flex items-center justify-between text-start cursor-pointer hover:bg-gray-50"
            onClick={handleClick}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            <div className="flex items-center">
              <p className="text-[12px] font-inter text-cardTitle">{placeholderText}</p>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept="image/*"
              />
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M3.33301 13.3337L3.33301 14.167C3.33301 15.5477 4.4523 16.667 5.83301 16.667L14.1663 16.667C15.5471 16.667 16.6663 15.5477 16.6663 14.167L16.6663 13.3337M13.333 6.66699L9.99967 3.33366M9.99967 3.33366L6.66634 6.66699M9.99967 3.33366L9.99967 13.3337" stroke="#636363" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </div>
        )}

      </div>
    );
  };

export default FileUpload;
