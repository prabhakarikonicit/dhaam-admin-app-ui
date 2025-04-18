import React, { useState } from "react";
// import Espresso from "../../../lib/Images/"
// Define product interface
interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  dateAdded: string;
  isActive: boolean;
  image?: string;
}

const ProductsTable: React.FC = () => {
  // Sample data based on the image
  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Espresso",
      description: "Strong and bold shot of pure coffee essence",
      price: "$3.99",
      category: "Beverages",
      dateAdded: "Mar 6, 2025",
      isActive: true,
    },
    {
      id: "2",
      name: "Cappuccino",
      description: "Creamy espresso with steamed milk and frothy foam.",
      price: "$4.49",
      category: "Beverages",
      dateAdded: "Mar 6, 2025",
      isActive: true,
    },
    {
      id: "3",
      name: "Latte",
      description: "Smooth espresso mixed with silky steamed milk.",
      price: "$4.99",
      category: "Beverages",
      dateAdded: "Mar 6, 2025",
      isActive: true,
    },
    {
      id: "4",
      name: "Mocha",
      description: "Espresso blended with chocolate and steamed milk.",
      price: "$5.29",
      category: "Beverages",
      dateAdded: "Mar 6, 2025",
      isActive: true,
    },
    {
      id: "5",
      name: "Caramel Macchiato",
      description: "Layered espresso with caramel and milk foam.",
      price: "$5.49",
      category: "Beverages",
      dateAdded: "Mar 6, 2025",
      isActive: true,
    },
    {
      id: "6",
      name: "Americano",
      description: "Espresso diluted with hot water for a smooth taste.",
      price: "$3.99",
      category: "Beverages",
      dateAdded: "Mar 6, 2025",
      isActive: true,
    },
  ]);

  // State for selected items
  const [selectedItems, setSelectedItems] = useState<string[]>(["2"]); // Cappuccino is selected by default

  // Toggle selection of a single item
  const toggleSelect = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item) => item !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  // Toggle active status
  const toggleActive = (id: string) => {
    setProducts(
      products.map((product) =>
        product.id === id
          ? { ...product, isActive: !product.isActive }
          : product
      )
    );
  };

  return (
    <div className="bg-white rounded-lg border border-reloadBorder overflow-hidden mb-24">
      {/* Header */}

      {/* Table */}
      <div className="overflow-y-auto">
        <table className="min-w-full divide-y divide-reloadBorder  ">
          <thead className="bg-background-grey">
            <tr>
              <th scope="col" className="w-12 px-4 py-3 text-left">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-bgButton accent-bgButton rounded border-gray-300"
                  onChange={() => {}}
                />
              </th>
              <th
                scope="col"
                className="px-4 ps-20 py-4 text-left text-[12px] font-inter font-[600] text-headding-color"
              >
                File name
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-[12px] font-inter font-[600] text-headding-color"
              >
                Category
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-[12px] font-inter font-[600] text-headding-color"
              >
                Date added
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-[12px] font-inter font-[600] text-headding-color"
              >
                Price
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-[12px] font-inter font-[600] text-headding-color"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-center text-[12px] font-inter font-[600] text-headding-color"
              >
                Action
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-4 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-bgButton accent-bgButton rounded border-gray-300"
                    checked={selectedItems.includes(product.id)}
                    onChange={() => toggleSelect(product.id)}
                  />
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center">
                    <div className="h-12 w-12 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden mr-3">
                      <img
                        src={`https://source.unsplash.com/100x100/?coffee,${product.name}`}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-[12px] font-inter font-[500] text-cardValue">
                        {product.name}
                      </div>
                      <div className="text-[12px] font-inter font-[400] text-cardTitle mt-1">
                        {product.description}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2.5 py-0.5 text-[12px] font-inter font-[500] text-cardValue underline decoration-solid hover:underline">
                    {product.category}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className="text-[12px] font-inter font-[500] text-cardValue">
                    {product.dateAdded}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className="text-[12px] font-inter font-[500] text-cardValue">
                    {product.price}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={product.isActive}
                      onChange={() => toggleActive(product.id)}
                    />
                    <div
                      className={`w-12 h-6 rounded-full transition ${
                        product.isActive ? "bg-bgButton" : "bg-gray-300"
                      }`}
                    >
                      <div
                        className={`absolute w-4 h-4 bg-white rounded-full transition-transform ${
                          product.isActive ? "translate-x-7" : "translate-x-1"
                        } top-1`}
                      ></div>
                    </div>
                  </label>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-center">
                  <button className="text-gray-500 hover:text-gray-700">
                    <svg
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsTable;
