import React, { useState, useEffect } from "react";

const AddOnsModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  productName: string;
}> = ({ isOpen, onClose, onSave, productName }) => {
  // State to track default options for each section
  const [singleDefault, setSingleDefault] = useState(1);
  const [checkbox1Default, setCheckbox1Default] = useState(1);
  const [checkbox2Default, setCheckbox2Default] = useState(1);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-custom10px  w-full max-w-3xl mx-4 z-10">
        {/* Header */}
        
        <div className="flex items-center justify-between p-4 border-b border-reloadBorder bg-background-grey rounded-custom10px ">
          <h2 className="text-[16px] font-inter font-[600] text-black">
          Adding Add-Ons in {`{productName}`}
          </h2>
         <div className="hidden md:flex space-x-2">
            <button
              onClick={onClose}
              className="px-5 py-2 bg-white text-cardValue rounded-custom font-inter border border-reloadBorder"
            >
              Discard
            </button>
            <button
              onClick={onSave}
              className="px-5 py-2 bg-bgButton text-whiteColor rounded-custom font-inter border border-reloadBorder"
            >
              Save
            </button>
          </div>
        </div>
        {/* Body */}
        <div className="p-4 max-h-[calc(100vh-200px)] overflow-y-auto ">
          {/* Single Selection */}
          <div className="mb-6 bg-store-card border border-subMenus p-6 rounded-custom8px">
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                id="singleSelection"
                className="h-4 w-4 text-purple-600 rounded border-gray-300 accent-bgButton focus:ring-purple-500"
              />
              <label
                htmlFor="singleSelection"
                className="ml-2 font-inter font-[500] text-[14px] text-textHeading"
              >
                {"{add_on}"} Single Selection
              </label>
            </div>

            <div className="mt-3 border-t border-grey-border">
              <div className="grid grid-cols-12 mb-3 pt-8">
                <div className="col-span-2 -ms-3 md:pr-16 md:ps-4 sm:ps-4 lg:ps-4 xl:ps-4 font-inter text-[12px] font-[500] text-paragraphBlack">
                  Default
                </div>
                <div className="col-span-6 pl-0 md:pl-0 font-inter text-[12px] font-[500] text-paragraphBlack">
                  Options
                </div>
                <div className="col-span-4 ps-2 font-inter text-[12px] font-[500] text-paragraphBlack">
                  Price
                </div>
              </div>

              {[1, 2, 3, 4].map((i) => (
                <div
                  key={`single-${i}`}
                  className="grid grid-cols-12 gap-4 mb-2 items-center"
                >
                  <div className="col-span-2 flex items-center justify-center">
                    <input
                      type="radio"
                      name="singleDefault"
                      checked={singleDefault === i}
                      onChange={() => setSingleDefault(i)}
                      className={`h-4 w-4 ${
                        singleDefault === i
                          ? "accent-bgButton"
                          : "border-gray-300"
                      } focus:ring-0`}
                    />
                  </div>
                  <div className="col-span-6">
                    <input
                      type="text"
                      placeholder="Option 1"
                      className="w-full px-3 py-3 border border-grey-border font-inter font-[400] rounded-custom text-paragraphBlack bg-store-card focus:outline-none focus:ring-purple-600"
                    />
                  </div>
                  <div className="col-span-4">
                    <input
                      type="text"
                      placeholder="Price"
                      className="w-full px-3 py-3 border border-grey-border font-inter font-[400] rounded-custom bg-store-card focus:outline-none focus:ring-purple-600"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Checkbox Selection 1 */}
          <div className="mb-6 bg-store-card border border-subMenus p-6 rounded-custom8px">
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                id="checkboxSelection1"
                className="h-4 w-4 text-purple-600 rounded accent-bgButton border-gray-300 focus:ring-purple-500"
              />
              <label
                htmlFor="checkboxSelection1"
                className="ml-2 font-inter font-[500] text-[14px] text-textHeading"
              >
                {"{add_on}"} Checkbox Selection
              </label>
            </div>

            <div className="mt-3  border-t border-grey-border">
              <div className="grid grid-cols-12 mb-2 pt-8">
              <div className="col-span-2 -ms-3 md:pr-16 md:ps-4 sm:ps-4 lg:ps-4 xl:ps-4 font-inter text-[12px] font-[500] text-paragraphBlack">
                  Default
                </div>
                <div className="col-span-6 pl-0 md:pl-0 font-inter text-[12px] font-[500] text-paragraphBlack">
                  Options
                </div>
                <div className="col-span-4 ps-2 font-inter text-[12px] font-[500] text-paragraphBlack">
                  Price
                </div>
              </div>

              {[1, 2, 3, 4].map((i) => (
                <div
                  key={`checkbox1-${i}`}
                  className="grid grid-cols-12 gap-4 mb-2 items-center"
                >
                  <div className="col-span-2 flex items-center justify-center">
                    <input
                      type="radio"
                      name="checkbox1Default"
                      checked={checkbox1Default === i}
                      onChange={() => setCheckbox1Default(i)}
                      className={`h-4 w-4 ${
                        checkbox1Default === i
                          ? "accent-bgButton"
                          : "border-gray-300"
                      } focus:ring-0`}
                    />
                  </div>
                  <div className="col-span-6">
                    <input
                      type="text"
                      placeholder="Option 1"
                      className="w-full px-3 py-3 border border-grey-border font-inter font-[400] rounded-custom text-paragraphBlack bg-store-card focus:outline-none focus:ring-purple-600"
                    />
                  </div>
                  <div className="col-span-4">
                    <input
                      type="text"
                      placeholder="Price"
                      className="w-full px-3 py-3 border border-grey-border font-inter font-[400] rounded-custom bg-store-card focus:outline-none focus:ring-purple-600"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Checkbox Selection 2 */}
          <div className="mb-6 bg-store-card border border-subMenus p-6 rounded-custom8px">
            <div className="flex items-center mb-2">
              <input
                type="checkbox"
                id="checkboxSelection2"
                className="h-4 w-4 text-purple-600 rounded accent-bgButton border-gray-300 focus:ring-purple-500"
              />
              <label
                htmlFor="checkboxSelection2"
                className="ml-2 font-inter font-[500] text-[14px] text-textHeading"
              >
                {"{add_on}"} Checkbox Selection
              </label>
            </div>

            <div className="mt-3 border-t border-grey-border">
              <div className="grid grid-cols-12 mb-2 pt-8">
              <div className="col-span-2 -ms-3 md:pr-16 md:ps-4 sm:ps-4 lg:ps-4 xl:ps-4 font-inter text-[12px] font-[500] text-paragraphBlack">
                  Default
                </div>
                <div className="col-span-6 pl-0 md:pl-0 font-inter text-[12px] font-[500] text-paragraphBlack">
                  Options
                </div>
                <div className="col-span-4 ps-2 font-inter text-[12px] font-[500] text-paragraphBlack">
                  Price
                </div>
              </div>

              {[1, 2, 3, 4].map((i) => (
                <div
                  key={`checkbox2-${i}`}
                  className="grid grid-cols-12 gap-4 mb-2 items-center"
                >
                  <div className="col-span-2 flex items-center justify-center">
                    <input
                      type="radio"
                      name="checkbox2Default"
                      checked={checkbox2Default === i}
                      onChange={() => setCheckbox2Default(i)}
                      className={`h-4 w-4 ${
                        checkbox2Default === i
                          ? "accent-bgButton"
                          : "border-gray-300"
                      } focus:ring-0`}
                    />
                  </div>
                  <div className="col-span-6">
                    <input
                      type="text"
                      placeholder="Option 1"
                      className="w-full px-3 py-3 border border-grey-border font-inter font-[400] rounded-custom text-paragraphBlack bg-store-card focus:outline-none focus:ring-purple-600"
                    />
                  </div>
                  <div className="col-span-4">
                    <input
                      type="text"
                      placeholder="Price"
                      className="w-full px-3 py-3 border border-grey-border font-inter font-[400] rounded-custom bg-store-card focus:outline-none focus:ring-purple-600"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Mobile buttons at bottom - only visible on mobile */}

        <div className="md:hidden mt-14 shadow-custom-top bg-background-grey grid grid-cols-2 gap-3 p-4">
            <button
              onClick={onClose}
              className="py-3 bg-white text-cardValue rounded-custom8px font-inter border border-reloadBorder text-center"
            >
              Discard
            </button>
            <button
              onClick={onSave}
              className="py-3 bg-bgButton text-white rounded-custom8px font-inter text-center"
            >
              Save
            </button>
          </div>
      </div>
    </div>
  );
};

export default AddOnsModal;
