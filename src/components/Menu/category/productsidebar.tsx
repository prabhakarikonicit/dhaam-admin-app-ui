import React, { useState } from "react";
import { SelectedItemType, ProductItem } from "./categorytypes";

interface ProductSidebarProps {
  isOpen: boolean;
  selectedItem: SelectedItemType | null;
  onClose: () => void;
  onSave: () => void;
  onAddNewProduct: () => void;
}

const CategoryProductSidebar: React.FC<ProductSidebarProps> = ({
  isOpen,
  selectedItem,
  onClose,
  onSave,
  onAddNewProduct,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showProductSidebar, setShowProductSidebar] = useState<boolean>(false);
  // Sample products - would be loaded from API in a real app
  const [products, setProducts] = useState<ProductItem[]>([
    {
      id: "prod-1",
      name: "Espresso",
      price: 3.99,
      image: "/images/espresso.jpg",
    },
    {
      id: "prod-2",
      name: "Espresso",
      price: 3.99,
      image: "/images/espresso.jpg",
    },
    {
      id: "prod-3",
      name: "Espresso",
      price: 3.99,
      image: "/images/espresso.jpg",
    },
  ]);
  const handleProductSave = (product: any) => {
    console.log("New product saved:", product);
    // console.log("New product saved:", product);
    setShowProductSidebar(true);
    // Here you might want to add the new product to your products array
    // setProducts([...products, product]);
  };
  if (!isOpen || !selectedItem) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex">
      <div className="ml-auto h-full w-full max-w-md bg-white shadow-xl flex flex-col">
        {/* Header */}
        <div className="bg-purple-700 text-white p-4 flex justify-between items-center">
          <h3 className="font-medium">Add Product in {selectedItem.name}</h3>
          <div className="flex space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-1 bg-white text-gray-800 rounded"
            >
              Cancel
            </button>
            <button
              onClick={onSave}
              className="px-4 py-1 bg-purple-500 text-white rounded"
            >
              Save
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 overflow-auto flex-grow">
          {/* Add new product button */}
          <button
            className="w-full py-3 border border-gray-300 rounded mb-4 text-center"
            onClick={onAddNewProduct}
          >
            Add new product
          </button>

          <div className="text-center text-gray-500 my-4">Or</div>

          {/* Search */}
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

          {/* Product List */}
          <div className="product-list space-y-3">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex justify-between items-center p-3 border border-gray-200 rounded-md"
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-200 rounded mr-3 overflow-hidden">
                    {product.image && (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div>
                    <div className="font-medium">{product.name}</div>
                    <div className="text-sm text-gray-500">
                      ${product.price.toFixed(2)}
                    </div>
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
        </div>
      </div>
    </div>
  );
};

export default CategoryProductSidebar;
