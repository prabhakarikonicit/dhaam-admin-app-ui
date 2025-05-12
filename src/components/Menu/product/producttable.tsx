import React, { useState } from "react";
import Espresso from "../../../lib/Images/Espresso.png"
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
  const [productsMobile, setProductsMobile] = useState<Product[]>([
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
      description: "Creamy espresso with steamed milk and frothy",
      price: "$4.49",
      category: "Beverages",
      dateAdded: "Mar 6, 2025",
      isActive: true,
    },
    {
      id: "3",
      name: "Latte",
      description: "Smooth espresso mixed with silky steamed",
      price: "$4.99",
      category: "Beverages",
      dateAdded: "Mar 6, 2025",
      isActive: true,
    },
    {
      id: "4",
      name: "Mocha",
      description: "Espresso blended with chocolate and steamed",
      price: "$5.29",
      category: "Beverages",
      dateAdded: "Mar 6, 2025",
      isActive: true,
    },
    {
      id: "5",
      name: "Caramel Macchiato",
      description: "Layered espresso with caramel and milk",
      price: "$5.49",
      category: "Beverages",
      dateAdded: "Mar 6, 2025",
      isActive: true,
    },
    {
      id: "6",
      name: "Americano",
      description: "Espresso diluted with hot water for a smooth .",
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
    setProducts(
      productsMobile.map((productMobile) =>
        productMobile.id === id
          ? { ...productMobile, isActive: !productMobile.isActive }
          : productMobile
      )
    );
  };

  // Render mobile view
  const renderMobileView = () => (
    <div className="md:hidden flex flex-col gap-y-4 py-1 bg-white rounded-custom12px mb-32">
      {/* Header with search and add button */}
      {/* <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-cardValue text-[20px] font-inter font-[600]">
            Product
          </h2>
          <div className="relative">
            <select className="appearance-none block w-full bg-white border border-reloadBorder rounded-custom8px py-3 pl-3 pr-10 text-verifyOtp text-[12px] font-inter font-[400] placeholder: focus:outline-none focus:ring-purple-500 focus:border-purple-500">
              <option className="border border-reloadBorder py-2 pl-3 pr-10 text-verifyOtp text-[12px] font-inter font-[400] ">
                Queenstown Public House
              </option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
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
                  d="M4.23431 5.83441C4.54673 5.52199 5.05327 5.52199 5.36569 5.83441L8 8.46873L10.6343 5.83441C10.9467 5.52199 11.4533 5.52199 11.7657 5.83441C12.0781 6.14683 12.0781 6.65336 11.7657 6.96578L8.56569 10.1658C8.25327 10.4782 7.74673 10.4782 7.43431 10.1658L4.23431 6.96578C3.9219 6.65336 3.9219 6.14683 4.23431 5.83441Z"
                  fill="#949494"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
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
                  d="M6.39961 3.2001C4.6323 3.2001 3.19961 4.63279 3.19961 6.4001C3.19961 8.16741 4.6323 9.6001 6.39961 9.6001C8.16692 9.6001 9.59961 8.16741 9.59961 6.4001C9.59961 4.63279 8.16692 3.2001 6.39961 3.2001ZM1.59961 6.4001C1.59961 3.74913 3.74864 1.6001 6.39961 1.6001C9.05058 1.6001 11.1996 3.74913 11.1996 6.4001C11.1996 7.43676 10.871 8.39667 10.3122 9.18133L14.1653 13.0344C14.4777 13.3468 14.4777 13.8534 14.1653 14.1658C13.8529 14.4782 13.3463 14.4782 13.0339 14.1658L9.18084 10.3127C8.39618 10.8715 7.43627 11.2001 6.39961 11.2001C3.74864 11.2001 1.59961 9.05106 1.59961 6.4001Z"
                  fill="#949494"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search Products"
              className="block w-full md:w-[213px] pl-10 pr-3 py-2 border border-grey-border rounded-custom7px leading-5 text-[12px] text-cardTitle font-inter font-[500] bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-[12px]"
            />
          </div>
          <button className="px-5 py-2 border border-btnBorder text-[12px] font-[600] font-inter rounded-custom text-whiteColor bg-bgButton hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
            Add Product
          </button>
          <button className="p-2 border border-reloadBorder rounded-custom">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </button>
        </div>
      </div> */}

      {/* Product Cards */}
      {productsMobile.map((product) => (
        <div
          key={product.id}
          className="bg-white border border-gray-200 rounded-lg p-4"
        >
          <div className="flex justify-between items-start">
            <div className="flex gap-x-2">
              <img
                src={`${Espresso}`}
                alt={product.name}
                className="h-12 w-12 object-cover rounded-md"
              />
              <div>
                <h3 className="text-[12px] font-inter font-[500] text-cardValue flex items-center justify-between">
                  {product.name}
                </h3>
                <p className="text-[11px] font-inter font-[400] text-cardTitle mt-2 whitespace-nowrap">
                  {product.description}
                </p>
              </div>
            </div>
            <button className="text-gray-500 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M8.00039 4.8001C7.11674 4.8001 6.40039 4.08375 6.40039 3.2001C6.40039 2.31644 7.11674 1.6001 8.00039 1.6001C8.88405 1.6001 9.60039 2.31644 9.60039 3.2001C9.60039 4.08375 8.88405 4.8001 8.00039 4.8001Z"
                  fill="#2B2B2B"
                />
                <path
                  d="M8.00039 9.6001C7.11674 9.6001 6.40039 8.88375 6.40039 8.0001C6.40039 7.11644 7.11674 6.4001 8.00039 6.4001C8.88405 6.4001 9.60039 7.11644 9.60039 8.0001C9.60039 8.88375 8.88405 9.6001 8.00039 9.6001Z"
                  fill="#2B2B2B"
                />
                <path
                  d="M8.00039 14.4001C7.11674 14.4001 6.40039 13.6838 6.40039 12.8001C6.40039 11.9164 7.11674 11.2001 8.00039 11.2001C8.88405 11.2001 9.60039 11.9164 9.60039 12.8001C9.60039 13.6838 8.88405 14.4001 8.00039 14.4001Z"
                  fill="#2B2B2B"
                />
              </svg>
            </button>
          </div>

          <div className="mt-4 border-t border-greyBorder ">
            <div className="flex justify-between items-center mb-2 mt-2">
              <span className="text-[12px] font-inter font-[500] text-headding-color">
                Dated added :{" "}
                <span className="text-[12px] font-inter font-[500] text-cardValue">
                  {product.dateAdded}
                </span>
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[12px] font-inter font-[500] text-headding-color">
                Price :{" "}
                <span className="text-[12px] font-inter font-[500] text-cardValue">
                  {product.price}
                </span>
              </span>
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
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // Render desktop table view
  const renderDesktopView = () => (
    <div className="hidden md:block bg-white rounded-lg border border-reloadBorder overflow-hidden mb-24">
      <div className="overflow-y-auto">
        <table className="min-w-full divide-y divide-reloadBorder">
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
                        src={`${Espresso}`}
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

  return (
    <>
      {renderMobileView()}
      {renderDesktopView()}
    </>
  );
};

export default ProductsTable;
