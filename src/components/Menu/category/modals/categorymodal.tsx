import React, { useState } from "react";
import CustomModal from "../../../common/modals";
import {
  CategoryItem,
  SubcategoryItem,
  FormData,
  ModalProps,
} from "../categorytypes";
import EditSubSubcategoryModal from "./editsubsubcategorymodal";
interface CategoryModalProps extends ModalProps {
  mode: "add" | "edit";
  currentItem: CategoryItem | null;
}

const CategoryModal: React.FC<CategoryModalProps> = ({
  isOpen,
  onClose,
  onSave,
  mode,
  currentItem,
}) => {
  // interface EditSubcategoryModalProps extends ModalProps {
  //   currentParentCategory: CategoryItem | null;
  //   currentSubcategoryItem: SubcategoryItem | null;
  // }
  const [showSubCategory, setShowSubCategory] = useState(false);
  const [showSubSubCategory, setShowSubSubCategory] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "addSubCategory") {
      setShowSubCategory(e.target.checked);
      // console.log("showSubCategory")
    } else if (e.target.name === "addSubSubCategory") {
      console.log("showSubSubCategory", showSubSubCategory);
      setShowSubSubCategory(e.target.checked);
      console.log("After showSubSubCategory", showSubSubCategory);
    }
  };
  // const [formData, setFormData] = useState<FormData>({
  //   name: currentSubcategoryItem?.name || "",
  //   description: currentSubcategoryItem?.description || "",
  //   // product: currentSubcategoryItem?.product || "",
  //   addMore: false,
  // });
  const handleSave = () => {
    // Get form data manually with null checks
    const nameElement = document.getElementById("name") as HTMLInputElement;
    const descriptionElement = document.getElementById("description") as HTMLTextAreaElement;
    const productElement = document.getElementById("product") as HTMLSelectElement;
    const addSubCategoryElement = document.getElementById("addSubCategory") as HTMLInputElement;
    const addSubSubCategoryElement = document.getElementById("addSubSubCategory") as HTMLInputElement;
  
    const data: FormData = {
      name: nameElement ? nameElement.value : "",
      description: descriptionElement ? descriptionElement.value : "",
      product: productElement ? productElement.value : "",
      addSubCategory: addSubCategoryElement ? addSubCategoryElement.checked : false,
      addSubSubCategory: addSubSubCategoryElement ? addSubSubCategoryElement.checked : false,
    };
  
    onSave(data);
  };

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      mode={mode}
      title={mode === "add" ? "Add New Category" : "Edit Category"}
      fields={[]} // Empty fields since we're using customFooter
      onSave={onSave}
      size="lg"
      formLayout="custom"
      showFooter={true}
      confirmText="Save"
      customFooter={
        <div className="w-full max-w-5xl mx-auto mt-[-15px] ">
          <div className="">
            <div className="bg-store-card p-4 rounded-custom border border-store-card">
              <div className="mb-4">
                <label className="block mb-2">
                  <span className="text-paragraphBlack font-inter font-[500] text-[12px]">
                    Category Name <span className="text-danger">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Name"
                  defaultValue={currentItem?.name || ""}
                  className="w-full px-3 py-3 border border-reloadBorder rounded-custom8px text-paragraphBlack font-inter focus:outline-none focus:ring-1 focus:ring-bgButton"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block mb-2">
                  <span className="text-paragraphBlack font-inter font-[500] text-[12px]">
                    Description
                  </span>
                </label>
                <div className="relative">
                  <textarea
                    id="description"
                    name="description"
                    placeholder="Write here"
                    defaultValue={currentItem?.description || ""}
                    className="w-full px-3 py-2 border border-reloadBorder rounded-custom8px text-paragraphBlack font-inter focus:outline-none focus:ring-1 focus:ring-bgButton"
                    rows={3}
                  />
                  <div className="absolute top-2 right-2 text-purple-500">
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
                        d="M6.43751 4C6.88624 4 7.25001 4.33579 7.25001 4.75V5.5H8.06251C8.51125 5.5 8.87502 5.83579 8.87502 6.25C8.87502 6.66421 8.51125 7 8.06251 7H7.25001V7.75C7.25001 8.16421 6.88624 8.5 6.43751 8.5C5.98878 8.5 5.62501 8.16421 5.62501 7.75V7H4.8125C4.36377 7 4 6.66421 4 6.25C4 5.83579 4.36377 5.5 4.8125 5.5H5.62501V4.75C5.62501 4.33579 5.98878 4 6.43751 4ZM6.43751 11.5C6.88624 11.5 7.25001 11.8358 7.25001 12.25V13H8.06251C8.51125 13 8.87502 13.3358 8.87502 13.75C8.87502 14.1642 8.51125 14.5 8.06251 14.5H7.25001V15.25C7.25001 15.6642 6.88624 16 6.43751 16C5.98878 16 5.62501 15.6642 5.62501 15.25V14.5H4.8125C4.36377 14.5 4 14.1642 4 13.75C4 13.3358 4.36377 13 4.8125 13H5.62501V12.25C5.62501 11.8358 5.98878 11.5 6.43751 11.5Z"
                        fill="#7C43DF"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M12.125 4C12.4936 4 12.8161 4.22911 12.9104 4.55808L13.8686 7.8992L16.5935 9.35036C16.845 9.4843 17 9.73197 17 10C17 10.268 16.845 10.5157 16.5935 10.6496L13.8686 12.1008L12.9104 15.4419C12.8161 15.7709 12.4936 16 12.125 16C11.7563 16 11.4339 15.7709 11.3395 15.4419L10.3814 12.1008L7.65648 10.6496C7.40497 10.5157 7.25001 10.268 7.25001 10C7.25001 9.73197 7.40497 9.48431 7.65648 9.35036L10.3814 7.8992L11.3395 4.55808C11.4339 4.22911 11.7563 4 12.125 4Z"
                        fill="#7C43DF"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <label className="block mb-2">
                  <span className="text-paragraphBlack font-inter font-[500] text-[12px]">
                    Assign Product
                  </span>
                </label>
                <div className="relative">
                  <select
                    id="product"
                    name="product"
                    // value={formData.product}
                    // onChange={handleChange}

                    className="w-full px-3 py-3 border border-reloadBorder rounded-custom8px text-paragraphBlack font-inter focus:outline-none focus:ring-1 focus:ring-bgButton appearance-none"
                  >
                    <option
                      value=""
                      disabled
                      selected
                      className="text-paragraphBlack font-inter font-[500] text-[12px]"
                    >
                      Select Product
                    </option>
                    <option
                      value="product1"
                      className="text-paragraphBlack font-inter font-[500] text-[12px]"
                    >
                      Product 1
                    </option>
                    <option
                      value="product2"
                      className="text-paragraphBlack font-inter font-[500] text-[12px]"
                    >
                      Product 2
                    </option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="fill-current h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
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

              <div className="mb-4">
                {/* Use flex-col by default (mobile first) and flex-row for md and up */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-start w-full">
                  {/* File upload area - takes full width on mobile, 3/5 width on desktop */}
                  <div className="border-2 border-dashed border-gray-300 p-5 rounded-md text-center w-full md:w-3/5 mb-6 md:mb-0">
                    <div className="flex items-center justify-center">
                      <span className="text-paragraphBlack font-inter font-[500] text-[11px] md:text-[12px] sm:text-[12px] lg:text-[12px] xl:text-[12px]">
                        Choose a file or drag & drop your image here
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        className="ml-2"
                      >
                        <path
                          d="M3.33398 13.3337L3.33398 14.167C3.33398 15.5477 4.45327 16.667 5.83398 16.667L14.1673 16.667C15.548 16.667 16.6673 15.5477 16.6673 14.167L16.6673 13.3337M13.334 6.66699L10.0006 3.33366M10.0006 3.33366L6.66732 6.66699M10.0006 3.33366L10.0006 13.3337"
                          stroke="#636363"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* "Add Sub Category" checkbox - stacked below on mobile, beside on desktop */}
                  <div className="flex items-center md:ml-4 w-full md:w-auto">
                    <div
                      className={`flex items-center p-2 rounded-md ${
                        showSubCategory ? "bg-purple p-3 text-white" : ""
                      }`}
                    >
                      <input
                        type="checkbox"
                        id="addSubCategory"
                        name="addSubCategory"
                        // checked={formData.addSubCategory}
                        onChange={handleChange}
                        className="h-4 w-4 text-purple-600 accent-bgButton rounded border-gray-300 focus:ring-purple-500"
                      />
                      <label
                        htmlFor="addSubCategory"
                        className="ml-2 text-paragraphBlack pr-24 rounded-custom8px font-inter font-[500] text-[12px]"
                      >
                        Add Sub Category
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              {/* Only show the lines when subcategory is shown */}
              {showSubCategory && (
                <div className="hidden md:block absolute left-4 top-0 bottom-0 border-l h-[calc(100%-158px)] border-grey-border"></div>
              )}
              {showSubCategory && (
                <div className="mt-4 bg-white p-0 rounded-md">
                  {/* Horizontal connector to subcategory */}
                  <div className="hidden md:block absolute left-4 top-56 w-12 border-t border-grey-border"></div>
                  <div className="bg-store-card p-4 rounded-custom border border-store-card md:ml-24">
                    <div className="mb-4">
                      <label className="block mb-2">
                        <span className="text-paragraphBlack font-inter font-[500] text-[12px]">
                          Sub Category Name{" "}
                          <span className="text-danger">*</span>
                        </span>
                      </label>
                      <input
                        type="text"
                        name="subCategoryName"
                        placeholder="Name"
                        defaultValue={currentItem?.name || ""}
                        className="w-full px-3 py-3 border border-reloadBorder rounded-custom8px text-paragraphBlack font-inter focus:outline-none focus:ring-1 focus:ring-bgButton"
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block mb-2">
                        <span className="text-paragraphBlack font-inter font-[500] text-[12px]">
                          Description
                        </span>
                      </label>
                      <div className="relative">
                        <textarea
                          name="subCategoryDescription"
                          placeholder="Write here"
                          defaultValue={currentItem?.description || ""}
                          className="w-full px-3 py-2 border border-reloadBorder rounded-custom8px text-paragraphBlack font-inter focus:outline-none focus:ring-1 focus:ring-bgButton"
                          rows={3}
                        />
                        <div className="absolute top-2 right-2 text-purple-500">
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
                              d="M6.43751 4C6.88624 4 7.25001 4.33579 7.25001 4.75V5.5H8.06251C8.51125 5.5 8.87502 5.83579 8.87502 6.25C8.87502 6.66421 8.51125 7 8.06251 7H7.25001V7.75C7.25001 8.16421 6.88624 8.5 6.43751 8.5C5.98878 8.5 5.62501 8.16421 5.62501 7.75V7H4.8125C4.36377 7 4 6.66421 4 6.25C4 5.83579 4.36377 5.5 4.8125 5.5H5.62501V4.75C5.62501 4.33579 5.98878 4 6.43751 4ZM6.43751 11.5C6.88624 11.5 7.25001 11.8358 7.25001 12.25V13H8.06251C8.51125 13 8.87502 13.3358 8.87502 13.75C8.87502 14.1642 8.51125 14.5 8.06251 14.5H7.25001V15.25C7.25001 15.6642 6.88624 16 6.43751 16C5.98878 16 5.62501 15.6642 5.62501 15.25V14.5H4.8125C4.36377 14.5 4 14.1642 4 13.75C4 13.3358 4.36377 13 4.8125 13H5.62501V12.25C5.62501 11.8358 5.98878 11.5 6.43751 11.5Z"
                              fill="#7C43DF"
                            />
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M12.125 4C12.4936 4 12.8161 4.22911 12.9104 4.55808L13.8686 7.8992L16.5935 9.35036C16.845 9.4843 17 9.73197 17 10C17 10.268 16.845 10.5157 16.5935 10.6496L13.8686 12.1008L12.9104 15.4419C12.8161 15.7709 12.4936 16 12.125 16C11.7563 16 11.4339 15.7709 11.3395 15.4419L10.3814 12.1008L7.65648 10.6496C7.40497 10.5157 7.25001 10.268 7.25001 10C7.25001 9.73197 7.40497 9.48431 7.65648 9.35036L10.3814 7.8992L11.3395 4.55808C11.4339 4.22911 11.7563 4 12.125 4Z"
                              fill="#7C43DF"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block mb-2">
                        <span className="text-paragraphBlack font-inter font-[500] text-[12px]">
                          Assign Product
                        </span>
                      </label>
                      <div className="relative">
                        <select
                          name="subCategoryProduct"
                          className="w-full px-3 py-3 border border-reloadBorder rounded-custom8px text-paragraphBlack font-inter focus:outline-none focus:ring-1 focus:ring-bgButton appearance-none"
                        >
                          <option
                            value=""
                            disabled
                            selected
                            className="text-paragraphBlack font-inter font-[500] text-[12px]"
                          >
                            Select Product
                          </option>
                          <option
                            value="product1"
                            className="text-paragraphBlack font-inter font-[500] text-[12px]"
                          >
                            Product 1
                          </option>
                          <option
                            value="product2"
                            className="text-paragraphBlack font-inter font-[500] text-[12px]"
                          >
                            Product 2
                          </option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <svg
                            className="fill-current h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
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

                    <div className="mb-4">
                      {/* Use flex-col by default (mobile first) and flex-row for md and up */}
                      <div className="flex flex-col md:flex-row items-start md:items-center justify-start w-full">
                        {/* File upload area - takes full width on mobile, 3/5 width on desktop */}
                        <div className="border-2 border-dashed border-gray-300 p-5 rounded-md text-center w-full md:w-3/5 mb-6 md:mb-0">
                          <div className="flex items-center justify-between">
                            <span className="text-paragraphBlack font-inter font-[500] text-[11px] md:text-[12px] sm:text-[12px] lg:text-[12px] xl:text-[12px] ">
                              Choose a file or drag & drop your image here
                            </span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              className="ml-2"
                            >
                              <path
                                d="M3.33398 13.3337L3.33398 14.167C3.33398 15.5477 4.45327 16.667 5.83398 16.667L14.1673 16.667C15.548 16.667 16.6673 15.5477 16.6673 14.167L16.6673 13.3337M13.334 6.66699L10.0006 3.33366M10.0006 3.33366L6.66732 6.66699M10.0006 3.33366L10.0006 13.3337"
                                stroke="#636363"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        </div>

                        {/* "Add Sub Category" checkbox - stacked below on mobile, beside on desktop */}
                        <div className="flex items-center md:mx-5 w-full md:w-auto">
                          <div
                            className={`flex items-center p-2 pe-6  rounded-md ${
                              showSubSubCategory ? "bg-purple text-white" : ""
                            }`}
                          >
                            <input
                              type="checkbox"
                              id="addSubSubCategory"
                              name="addSubSubCategory"
                              // checked={formData.addSubCategory}

                              onChange={handleChange}
                              className="h-4 w-4 text-purple-600 accent-bgButton rounded border-gray-300 focus:ring-purple-500"
                            />
                            <label
                              htmlFor="addSubCategory"
                              className="ml-4 text-paragraphBlack rounded-custom8px py-1 font-inter font-[500] text-[12px]"
                            >
                              Add Sub Sub Category
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="relative ">
              {showSubCategory && showSubSubCategory && (
                <div className="hidden md:block absolute left-16 top-[calc(100%-360px)] h-[calc(100%-216px)]  bottom-10 border-l border-grey-border ml-14"></div>
              )}
              {showSubSubCategory && (
                <div className="mt-4 bg-white p-0 rounded-md ">
                  {/* Horizontal connector to sub-subcategory */}
                  <div className="hidden md:block absolute -left-[-90px] top-56 w-12 border-t border-grey-border"></div>
                  <div className="bg-store-card p-4 rounded-custom border border-store-card md:ml-48">
                    <div className="mb-4">
                      <label className="block mb-2">
                        <span className="text-paragraphBlack font-inter font-[500] text-[12px]">
                          Sub Sub Category Name{" "}
                          <span className="text-danger">*</span>
                        </span>
                      </label>
                      <input
                        type="text"
                        name="subCategoryName"
                        placeholder="Name"
                        defaultValue={currentItem?.name || ""}
                        className="w-full px-3 py-3 border border-reloadBorder rounded-custom8px text-paragraphBlack font-inter focus:outline-none focus:ring-1 focus:ring-bgButton"
                        required
                      />
                    </div>

                    <div className="mb-4">
                      <label className="block mb-2">
                        <span className="text-paragraphBlack font-inter font-[500] text-[12px]">
                          Description
                        </span>
                      </label>
                      <div className="relative">
                        <textarea
                          name="subCategoryDescription"
                          placeholder="Write here"
                          defaultValue={currentItem?.description || ""}
                          className="w-full px-3 py-2 border border-reloadBorder rounded-custom8px text-paragraphBlack font-inter focus:outline-none focus:ring-1 focus:ring-bgButton"
                          rows={3}
                        />
                        <div className="absolute top-2 right-2 text-purple-500">
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
                              d="M6.43751 4C6.88624 4 7.25001 4.33579 7.25001 4.75V5.5H8.06251C8.51125 5.5 8.87502 5.83579 8.87502 6.25C8.87502 6.66421 8.51125 7 8.06251 7H7.25001V7.75C7.25001 8.16421 6.88624 8.5 6.43751 8.5C5.98878 8.5 5.62501 8.16421 5.62501 7.75V7H4.8125C4.36377 7 4 6.66421 4 6.25C4 5.83579 4.36377 5.5 4.8125 5.5H5.62501V4.75C5.62501 4.33579 5.98878 4 6.43751 4ZM6.43751 11.5C6.88624 11.5 7.25001 11.8358 7.25001 12.25V13H8.06251C8.51125 13 8.87502 13.3358 8.87502 13.75C8.87502 14.1642 8.51125 14.5 8.06251 14.5H7.25001V15.25C7.25001 15.6642 6.88624 16 6.43751 16C5.98878 16 5.62501 15.6642 5.62501 15.25V14.5H4.8125C4.36377 14.5 4 14.1642 4 13.75C4 13.3358 4.36377 13 4.8125 13H5.62501V12.25C5.62501 11.8358 5.98878 11.5 6.43751 11.5Z"
                              fill="#7C43DF"
                            />
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M12.125 4C12.4936 4 12.8161 4.22911 12.9104 4.55808L13.8686 7.8992L16.5935 9.35036C16.845 9.4843 17 9.73197 17 10C17 10.268 16.845 10.5157 16.5935 10.6496L13.8686 12.1008L12.9104 15.4419C12.8161 15.7709 12.4936 16 12.125 16C11.7563 16 11.4339 15.7709 11.3395 15.4419L10.3814 12.1008L7.65648 10.6496C7.40497 10.5157 7.25001 10.268 7.25001 10C7.25001 9.73197 7.40497 9.48431 7.65648 9.35036L10.3814 7.8992L11.3395 4.55808C11.4339 4.22911 11.7563 4 12.125 4Z"
                              fill="#7C43DF"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block mb-2">
                        <span className="text-paragraphBlack font-inter font-[500] text-[12px]">
                          Assign Product
                        </span>
                      </label>
                      <div className="relative">
                        <select
                          name="subCategoryProduct"
                          className="w-full px-3 py-3 border border-reloadBorder rounded-custom8px text-paragraphBlack font-inter focus:outline-none focus:ring-1 focus:ring-bgButton appearance-none"
                        >
                          <option
                            value=""
                            disabled
                            selected
                            className="text-paragraphBlack font-inter font-[500] text-[12px]"
                          >
                            Select Product
                          </option>
                          <option
                            value="product1"
                            className="text-paragraphBlack font-inter font-[500] text-[12px]"
                          >
                            Product 1
                          </option>
                          <option
                            value="product2"
                            className="text-paragraphBlack font-inter font-[500] text-[12px]"
                          >
                            Product 2
                          </option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <svg
                            className="fill-current h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
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

                    <div className="mb-4">
                      <div className="border-2 border-dashed border-gray-300 p-5 rounded-md text-center w-full">
                        <div className="flex items-center justify-between ">
                          <span className="text-paragraphBlack font-inter font-[500] text-[11px] md:text-[12px] sm:text-[12px] lg:text-[12px] xl:text-[12px]">
                            Choose a file or drag & drop your image here
                          </span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            className="ml-2"
                          >
                            <path
                              d="M3.33398 13.3337L3.33398 14.167C3.33398 15.5477 4.45327 16.667 5.83398 16.667L14.1673 16.667C15.548 16.667 16.6673 15.5477 16.6673 14.167L16.6673 13.3337M13.334 6.66699L10.0006 3.33366M10.0006 3.33366L6.66732 6.66699M10.0006 3.33366L10.0006 13.3337"
                              stroke="#636363"
                              strokeWidth="2"
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

              <div className="flex justify-end mt-6">
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-4 py-2 bg-bgButton text-white rounded-custom font-inter border border-btnBorder hover:bg-purple-700"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
};

export default CategoryModal;
