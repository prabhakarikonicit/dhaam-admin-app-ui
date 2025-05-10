import React, { useState } from "react";
import { ProductItem, SelectedItemType } from "./categorytypes";

interface ProductPanelProps {
  selectedItem: SelectedItemType | null;
  onClose: () => void;
}

const ProductPanel: React.FC<ProductPanelProps> = ({ selectedItem, onClose }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [products, setProducts] = useState<ProductItem[]>([
    { id: "prod-1", name: "Espresso", price: 3.99, image: "/Images/espresso.jpg" },
    { id: "prod-2", name: "Espresso", price: 3.99, image: "/Images/espresso.jpg" },
    { id: "prod-3", name: "Espresso", price: 3.99, image: "/Images/espresso.jpg" },
  ]);

  if (!selectedItem) return null;

  return (
    <div className="h-full w-full">
      <div className="bg-purple-700 text-white py-3 px-4 flex justify-between items-center">
        <h2 className="text-lg font-medium">Add Product in {selectedItem.name}</h2>
        <div className="flex space-x-2">
          <button 
            onClick={onClose}
            className="px-4 py-1 bg-white text-gray-800 rounded"
          >
            Cancel
          </button>
          <button className="px-4 py-1 bg-purple-500 text-white rounded">
            Save
          </button>
        </div>
      </div>

      <div className="p-4">
        <button className="w-full py-3 border border-gray-300 rounded mb-4 text-center">
          Add new product
        </button>

        <div className="text-center text-gray-500 mb-4">Or</div>

        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search product"
            className="w-full border border-gray-300 rounded-md py-2 px-3 pr-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
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

        <div className="product-list">
          {products.map((product) => (
            <div key={product.id} className="flex justify-between items-center p-3 border border-gray-200 rounded-md mb-3">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-200 rounded mr-3 overflow-hidden">
                  {product.image && (
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  )}
                </div>
                <div>
                  <div className="font-medium">{product.name}</div>
                  <div className="text-sm text-gray-500">${product.price.toFixed(2)}</div>
                </div>
              </div>
              <button className="text-red-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-8">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-1">No products added yet</h3>
            <p className="text-gray-500">Add your first product to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPanel;