
import React from "react";
import { SelectedItemType } from "./categorytypes";

interface ProductViewProps {
  selectedItem: SelectedItemType | null;
  onAddProduct: () => void;
}

const ProductView: React.FC<ProductViewProps> = ({ selectedItem, onAddProduct }) => {
  if (!selectedItem) return null;
  
  // Placeholder for actual product data
  const products: any[] = [];

  return (
    <div className="w-full h-full">
      <div className="flex justify-between items-center py-3 px-4 border-b border-gray-200">
        <h2 className="text-lg">
          ({products.length}) products in <span className="font-medium">{selectedItem.name}</span>
        </h2>
        <div className="flex space-x-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products"
              className="border border-gray-300 rounded-md pl-10 pr-4 py-2 w-64"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <button
            onClick={onAddProduct}
            className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          >
            Add
          </button>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-32 h-32 mb-6">
            <img
              src="/Images/empty-box.svg"
              alt="No products"
              className="w-full h-full"
            />
          </div>
          <h3 className="text-xl font-medium mb-2">No products added yet</h3>
          <p className="text-gray-500 mb-6">
            Add your first product to get started!
          </p>
          <button
            onClick={onAddProduct}
            className="px-6 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Add
          </button>
        </div>
      ) : (
        <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Product cards would go here */}
        </div>
      )}
    </div>
  );
};

export default ProductView;