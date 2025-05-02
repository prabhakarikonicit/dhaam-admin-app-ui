import React, { useState } from "react";
import { SelectedItemType, ProductItem } from "./categorytypes";
import Espresso from "../../../lib/Images/Espresso.png";
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
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex p-2">
      <div className="ml-auto h-full w-full max-w-xl bg-white shadow-xl flex flex-col">
        {/* Header */}
        <div className="bg-background-grey border border-reloadBorder text-white p-5 flex justify-between items-center">
          <h3 className="font-inter text-[16px] font-[600] text-black">
            Add Product in{" "}
            <span className="underline decoration-solid decoration-skip-ink decoration-auto underline-offset-auto font-inter font-[16px] font-[600]">
              {selectedItem.name}
            </span>
          </h3>
          {/* Desktop buttons - hide on mobile */}
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

        {/* Content */}
        <div className="p-6 overflow-auto flex-grow">
          {/* Add new product button */}
          <button
            className="w-full py-3 border border-reloadBorder rounded-custom mb-4 text-center text-cardValue font-inter text-[12px] font-[600] bg-backgroundWhite"
            onClick={onAddNewProduct}
          >
            Add new product
          </button>

          <div className="flex items-center justify-center text-center my-4">
            <div className="w-28 md:w-36 border-t border-cardTitle"></div>
            <div className="mx-2 md:mx-4 text-cardTitle font-inter font-[500] text-[12px]">
              Or
            </div>
            <div className="w-28 md:w-36 border-t border-cardTitle"></div>
          </div>
          {/* Search */}
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search product"
              className="w-full border border-reloadBorder rounded-custom8px font-[400] font-inter  text-[14px] text-reloadBorder py-4 px-3 pr-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M17.5 17.5L12.5 12.5M14.1667 8.33333C14.1667 11.555 11.555 14.1667 8.33333 14.1667C5.11167 14.1667 2.5 11.555 2.5 8.33333C2.5 5.11167 5.11167 2.5 8.33333 2.5C11.555 2.5 14.1667 5.11167 14.1667 8.33333Z"
                  stroke="#949494"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Product List */}
          <div className="product-list space-y-3 bg-subMenus rounded-custom p-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex justify-between items-center p-4 border border-grey-border rounded-custom8px shadow-custom bg-backgroundWhite"
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-200 rounded mr-3 overflow-hidden">
                    {product.image && (
                      <img
                        src={Espresso}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div>
                    <div className="font-inter font-[500] text-[12px] text-textHeading mb-2">
                      {product.name}
                    </div>
                    <div className="font-inter font-[500] text-[11px] text-cardTitle">
                      ${product.price.toFixed(2)}
                    </div>
                  </div>
                </div>
                <button className="text-red-500 -mt-8">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M15.834 5.83333L15.1112 15.9521C15.0489 16.8243 14.3232 17.5 13.4488 17.5H6.55252C5.67812 17.5 4.95238 16.8243 4.89009 15.9521L4.16732 5.83333M8.33398 9.16667V14.1667M11.6673 9.16667V14.1667M12.5007 5.83333V3.33333C12.5007 2.8731 12.1276 2.5 11.6673 2.5H8.33398C7.87375 2.5 7.50065 2.8731 7.50065 3.33333V5.83333M3.33398 5.83333H16.6673"
                      stroke="#DB1F1F"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
         {/* Mobile buttons at bottom - only visible on mobile */}
         <div className="md:hidden mt-auto shadow-custom-top bg-background-grey grid grid-cols-2 gap-3 p-4">
          <button
            onClick={onClose}
            className="py-3 bg-white text-cardValue rounded-md font-inter border border-reloadBorder text-center"
          >
            Discard
          </button>
          <button
            onClick={onSave}
            className="py-3 bg-bgButton text-white rounded-md font-inter text-center"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryProductSidebar;
