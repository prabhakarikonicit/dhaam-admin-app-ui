import React from "react";
import CustomModal from "../../../common/modals";
import { CategoryItem, SubcategoryItem, SubSubcategoryItem, FormData, ModalProps } from "../categorytypes";

interface EditSubSubcategoryModalProps extends ModalProps {
  currentParentCategory: CategoryItem | null;
  currentSubcategoryItem: SubcategoryItem | null;
  currentSubSubcategoryItem: SubSubcategoryItem | null;
}

const EditSubSubcategoryModal: React.FC<EditSubSubcategoryModalProps> = ({
  isOpen,
  onClose,
  onSave,
  currentParentCategory,
  currentSubcategoryItem,
  currentSubSubcategoryItem
}) => {
  const handleSave = () => {
    // Get form data manually without form submission
    const name = (document.getElementById("edit-subsubcat-name") as HTMLInputElement).value;
    const description = (
      document.getElementById("edit-subsubcat-description") as HTMLTextAreaElement
    ).value;
    const product = (
      document.getElementById("edit-subsubcat-product") as HTMLSelectElement
    ).value;

    const data: FormData = {
      name: name,
      description: description,
      product: product,
    };

    onSave(data);
  };

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={onClose}
      mode="edit"
      title={`Edit Sub-subcategory in ${currentSubcategoryItem?.name}`}
      fields={[]} // Empty fields since we're using customFooter
      onSave={onSave}
      size="md"
      formLayout="custom"
      showFooter={true}
      confirmText="Save"
      customFooter={
        <div className="w-full max-w-5xl mx-auto mt-[-15px]">
          <div>
            <div className="mb-4">
              <label className="block mb-2">
                <span className="text-gray-700">
                  Sub-subcategory Name <span className="text-red-500">*</span>
                </span>
              </label>
              <input
                type="text"
                id="edit-subsubcat-name"
                name="name"
                placeholder="Name"
                defaultValue={currentSubSubcategoryItem?.name || ""}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2">
                <span className="text-gray-700">Description</span>
              </label>
              <textarea
                id="edit-subsubcat-description"
                name="description"
                placeholder="Write here"
                defaultValue={currentSubSubcategoryItem?.description || ""}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                rows={3}
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2">
                <span className="text-gray-700">Assign Product</span>
              </label>
              <select
                id="edit-subsubcat-product"
                name="product"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 appearance-none"
              >
                <option value="" disabled selected>
                  Select Product
                </option>
                <option value="product1">Product 1</option>
                <option value="product2">Product 2</option>
              </select>
            </div>

            <div className="mb-4">
              <div className="border-2 border-dashed border-gray-300 p-6 rounded-md text-center mb-3">
                <div className="flex flex-col items-center">
                  <svg
                    className="h-6 w-6 text-gray-400 mb-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <span className="text-gray-500">
                    Choose a file or drag & drop your image here
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                type="button"
                onClick={onClose}
                className="mr-2 px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      }
    />
  );
};

export default EditSubSubcategoryModal;