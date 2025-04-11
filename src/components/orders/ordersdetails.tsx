import React, { useState, useEffect, useRef } from "react";
import { MoreVertical, X } from "lucide-react";
import Burger from "../../lib/Images/Burger.png";
interface OrderItem {
  name: string;
  quantity: number;
  price: string;
  image?: string;
}

interface OrderDetailsProps {
  orderId: string;
  orderStatus: "Prepaid" | "COD" | "Pending" | "Completed";
  orderDate: string;
  orderTime: string;
  storeName: string;
  items: OrderItem[];
  customerId: string;
  storePhone: string;
  customerEmail: string;
  customerRating: string;
  deliveryMode: string;
  homeDelivery: string;

  // Bill details
  itemTotal: string;
  gst: string;
  processingFee: string;
  platformFee: string;
  deliveryCharge: string;
  discount: string;
  grandTotal: string;

  // Action callbacks
  onBackClick?: () => void;
  onReject?: () => void;
  onAccept?: () => void;
  onMoreActions?: () => void;
  onPrint?: () => void;
}

const OrderDetails: React.FC<OrderDetailsProps> = ({
  orderId,
  orderStatus,
  orderDate,
  orderTime,
  storeName,
  items,
  customerId,
  storePhone,
  customerEmail,
  customerRating,
  deliveryMode,
  homeDelivery,
  itemTotal,
  gst,
  processingFee,
  platformFee,
  deliveryCharge,
  discount,
  grandTotal,
  onBackClick,
  onReject,
  onAccept,
  onMoreActions,
  onPrint,
}) => {
  // Default burger image
  const [dropdownOpen, setDropdownOpen] = useState(false);
   const [showMobileMenu, setShowMobileMenu] = useState(false);
   const mobileMenuRef = useRef<HTMLDivElement>(null);
  // console.log(dropdownOpen);
   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          mobileMenuRef.current &&
          !mobileMenuRef.current.contains(event.target as Node)
        ) {
          
          setShowMobileMenu(false);
        }
      };
  
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);
  return (
    <div className="w-full min-h-screen mt-3">
      {/* Header with back button, order ID, and action buttons */}
      <div className="flex items-center px-2 md:px-6 sm:px-6 lg:px-6 xl:px-6 py-4 bg-background-grey">
        <button
          className="mr-4 text-gray-600"
          onClick={() => {
            // console.log("INSIDE ORDER");
            if (typeof onBackClick === "function") onBackClick();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M11.6484 20.0486C11.1798 20.5173 10.42 20.5173 9.95138 20.0486L2.75137 12.8486C2.28274 12.38 2.28274 11.6202 2.75137 11.1516L9.95138 3.95157C10.42 3.48294 11.1798 3.48294 11.6484 3.95157C12.1171 4.4202 12.1171 5.18 11.6484 5.64863L6.49696 10.8001H20.3999C21.0626 10.8001 21.5999 11.3374 21.5999 12.0001C21.5999 12.6628 21.0626 13.2001 20.3999 13.2001L6.49696 13.2001L11.6484 18.3516C12.1171 18.8202 12.1171 19.58 11.6484 20.0486Z"
              fill="#2B2B2B"
            />
          </svg>
        </button>
        <div className="flex-1">
          <div className="flex items-center">
            <h1 className="text-[20px] font-inter font-[600] text-cardValue">
              {orderId}
            </h1>
            <span
              className={`ml-2 px-3 py-1 text-[12px] font-inter font-[600] text-customWhiteColor bg-green rounded-custom80px leading-[15.6px] ${
                orderStatus === "Prepaid"
                  ? "bg-green-800 text-white"
                  : orderStatus === "COD"
                  ? "bg-blue-800 text-white"
                  : orderStatus === "Completed"
                  ? "bg-gray-800 text-white"
                  : "bg-yellow-800 text-white"
              }`}
            >
              {orderStatus}
            </span>
          </div>
          <p className="text-[12px] font-inter font-[500] text-menuSubHeadingColor">
            {orderDate} at {orderTime} from{" "}
            <span className="text-[12px] font-inter font-[600] text-menuSubHeadingColor">
              {storeName}
            </span>
          </p>
        </div>
         {/* Desktop view buttons */}
        <div className="hidden md:flex flex items-center space-x-4 mb-3">
          <button
            className="px-4 py-2 border border-borderCrossIcon text-[12px] font-inter font-[500] text-reject bg-bgCrossIcon rounded-custom38px flex items-center"
            onClick={onReject}
          >
            Print{" "}
            <span className="ml-2 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3.00483 3.00507C3.2782 2.73171 3.72141 2.73171 3.99478 3.00507L6.9998 6.0101L10.0048 3.00507C10.2782 2.73171 10.7214 2.73171 10.9948 3.00507C11.2681 3.27844 11.2681 3.72166 10.9948 3.99502L7.98975 7.00005L10.9948 10.0051C11.2681 10.2784 11.2681 10.7217 10.9948 10.995C10.7214 11.2684 10.2782 11.2684 10.0048 10.995L6.9998 7.99L3.99478 10.995C3.72141 11.2684 3.2782 11.2684 3.00483 10.995C2.73146 10.7217 2.73146 10.2784 3.00483 10.0051L6.00986 7.00005L3.00483 3.99502C2.73146 3.72166 2.73146 3.27844 3.00483 3.00507Z"
                  fill="#620E0E"
                />
              </svg>
            </span>
          </button>
          <button
            className="px-4 py-2 border border-acceptButton text-[12px] font-inter font-[500] text-green bg-customBackgroundColor rounded-custom38px flex items-center"
            onClick={onAccept}
          >
            Accept{" "}
            <span className="ml-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M11.6951 3.70503C11.9684 3.97839 11.9684 4.42161 11.6951 4.69497L6.09507 10.295C5.82171 10.5683 5.37849 10.5683 5.10512 10.295L2.30512 7.49497C2.03176 7.22161 2.03176 6.77839 2.30512 6.50503C2.57849 6.23166 3.02171 6.23166 3.29507 6.50503L5.6001 8.81005L10.7051 3.70503C10.9785 3.43166 11.4217 3.43166 11.6951 3.70503Z"
                  fill="#125E1B"
                />
              </svg>
            </span>
          </button>
          <div className="relative">
            <button
              className="px-4 py-2 bg-backgroundWhite rounded-custom px-4 py-2 flex items-center text-menuSubHeadingColor font-inter text-[10px] md:text-[12px] lg:text-[12px] sm:text-[12px] xl:text-[12px] font-[500] border border-reloadBorder shadow-sm flex items-center"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              More actions{" "}
              <span className="ml-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M3.70503 5.10493C3.97839 4.83156 4.42161 4.83156 4.69497 5.10493L7 7.40995L9.30503 5.10493C9.57839 4.83156 10.0216 4.83156 10.295 5.10493C10.5683 5.37829 10.5683 5.82151 10.295 6.09488L7.49497 8.89488C7.22161 9.16824 6.77839 9.16824 6.50503 8.89488L3.70503 6.09488C3.43166 5.82151 3.43166 5.37829 3.70503 5.10493Z"
                    fill="#636363"
                  />
                </svg>
              </span>
              {dropdownOpen && (
                <div className="absolute right-0 left- top-12 bg-white shadow-lg rounded-custom border border-reloadBorder w-43 z-10">
                  <div className="py-1">
                    <a
                      href="#"
                      className="block px-4 py-2 text-menuSubHeadingColor font-inter font-[12px] font-[500] whitespace-nowrap hover:bg-background-grey hover:underline"
                    >
                      Import stores
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-menuSubHeadingColor font-inter font-[12px] font-[500] whitespace-nowrap hover:bg-background-grey hover:underline"
                    >
                      Create new view
                    </a>
                    <a
                      href="#"
                      className="block px-4 py-2 text-menuSubHeadingColor font-inter font-[12px] font-[500] whitespace-nowrap hover:bg-background-grey hover:underline"
                    >
                      Hide analytics
                    </a>
                  </div>
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Mobile view 3-dots menu */}
        <div className="md:hidden relative mt-[-48px] ">
          <button
            className="p-2 rounded-custom border border-grey-border bg-backgroundWhite"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            <MoreVertical size={20} />
          </button>

          {showMobileMenu && (
            <div
              ref={mobileMenuRef}
              className="absolute right-0 top-10 bg-white shadow-lg rounded-md border border-gray-200 w-48 z-20"
            >
              <div className="flex justify-between items-center p-2 border-b">
                <h3 className="text-menuSubHeadingColor font-inter font-[12px] font-[500]">
                  Actions
                </h3>
                <button
                  className="p-1 text-menuSubHeadingColor font-inter font-[12px] font-[500]"
                  onClick={() => setShowMobileMenu(false)}
                >
                  <X size={16} />
                </button>
              </div>
              <div className="py-1">
                <button
                  onClick={() => {
                    onReject?.();
                    setShowMobileMenu(false);
                  }}
                  className="w-full  text-lef px-4 py-2 text-red-600 font-medium text-sm hover:bg-red-50 flex items-center"
                >
                  <span className="px-2 border border-borderCrossIcon text-[12px] font-inter font-[500] text-reject bg-bgCrossIcon rounded-custom38px">
                    Reject
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    className="ml-2"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3.00483 3.00507C3.2782 2.73171 3.72141 2.73171 3.99478 3.00507L6.9998 6.0101L10.0048 3.00507C10.2782 2.73171 10.7214 2.73171 10.9948 3.00507C11.2681 3.27844 11.2681 3.72166 10.9948 3.99502L7.98975 7.00005L10.9948 10.0051C11.2681 10.2784 11.2681 10.7217 10.9948 10.995C10.7214 11.2684 10.2782 11.2684 10.0048 10.995L6.9998 7.99L3.99478 10.995C3.72141 11.2684 3.2782 11.2684 3.00483 10.995C2.73146 10.7217 2.73146 10.2784 3.00483 10.0051L6.00986 7.00005L3.00483 3.99502C2.73146 3.72166 2.73146 3.27844 3.00483 3.00507Z"
                      fill="#620E0E"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => {
                    onAccept?.();
                    setShowMobileMenu(false);
                  }}
                  className="w-full text-lef px-4 py-2 text-green-600 font-medium text-sm hover:bg-green-50 flex items-center"
                >
                  <span className="px-2 border border-acceptButton text-[12px] font-inter font-[500] text-green bg-customBackgroundColor rounded-custom38px">
                    Accept
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    className="ml-2"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M11.6951 3.70503C11.9684 3.97839 11.9684 4.42161 11.6951 4.69497L6.09507 10.295C5.82171 10.5683 5.37849 10.5683 5.10512 10.295L2.30512 7.49497C2.03176 7.22161 2.03176 6.77839 2.30512 6.50503C2.57849 6.23166 3.02171 6.23166 3.29507 6.50503L5.6001 8.81005L10.7051 3.70503C10.9785 3.43166 11.4217 3.43166 11.6951 3.70503Z"
                      fill="#125E1B"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => {
                    onMoreActions?.();
                    setShowMobileMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 bg-backgroundWhite rounded-custom px-4 py-2 flex items-center text-menuSubHeadingColor font-inter text-[12px] font-[500] "
                >
                  More actions
                </button>
                <div className="border-t my-1"></div>
                <button
                  onClick={() => {
                    setShowMobileMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 bg-backgroundWhite rounded-custom px-4 py-2 flex items-center text-menuSubHeadingColor font-inter text-[12px] font-[500] "
                >
                  Import stores
                </button>
                <button
                  onClick={() => {
                    setShowMobileMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 bg-backgroundWhite rounded-custom px-4 py-2 flex items-center text-menuSubHeadingColor font-inter text-[12px] font-[500] "
                >
                  Create new view
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      

      {/* Main content - Two column layout */}
      <div className="flex flex-col md:flex-row p-1 md:p-4 sm:p-4 lg:p-4 xl:p-4  " id="printableArea">
        {/* Left column - Order items */}
        <div className="w-full md:w-1/2 p-6 rounded-custom12px border border-subMenus  bg-white">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[12px] font-inter font-[500] text-headding-color">
              Item Ordered
            </h2>
            <button className="px-3 py-1 border border-reloadBorder font-inter text-headding-color rounded-custom38px text-[12px] font-[500] flex items-center">
              Print{" "}
              <span className="">
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M3.4999 2.7999V4.8999H2.7999C2.0267 4.8999 1.3999 5.5267 1.3999 6.2999V8.3999C1.3999 9.1731 2.0267 9.7999 2.7999 9.7999H3.4999V11.1999C3.4999 11.9731 4.1267 12.5999 4.8999 12.5999H9.0999C9.8731 12.5999 10.4999 11.9731 10.4999 11.1999V9.7999H11.1999C11.9731 9.7999 12.5999 9.1731 12.5999 8.3999V6.2999C12.5999 5.5267 11.9731 4.8999 11.1999 4.8999H10.4999V2.7999C10.4999 2.0267 9.8731 1.3999 9.0999 1.3999H4.8999C4.1267 1.3999 3.4999 2.0267 3.4999 2.7999ZM9.0999 2.7999H4.8999V4.8999H9.0999V2.7999ZM9.0999 8.3999H4.8999V11.1999H9.0999V8.3999Z"
                    fill="#636363"
                  />
                </svg>
              </span>
            </button>
          </div>

          {/* Items list */}
          <div className="space-y-4">
            {items.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-1"
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 mr-4 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
                    <img
                      src={item.image || Burger}
                      alt={item.name}
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  <div>
                    <span className="flex items-center space-x-4">
                      <p className="text-[12px] font-inter font-[500] text-cardValue">
                        {item.name}
                      </p>
                      <p className="text-[12px] font-inter font-[500] text-headding-color">
                        x {item.quantity}
                      </p>
                    </span>
                  </div>
                </div>
                <div className="text-[12px] font-inter font-[500] text-cardValue">
                  {item.price}
                </div>
              </div>
            ))}
          </div>

          {/* Total amount */}
          <div className="mt-6 pt-4 border-t ">
            <div className="flex justify-between font-medium text-lg">
              <span className="text-[14px] font-inter font-[600] text-cardValue">
                Total amount
              </span>
              <span className="text-[14px] font-inter font-[500] text-cardValue">
                {itemTotal}
              </span>
            </div>
          </div>

          {/* Bill Summary */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-[12px] font-inter font-[500] text-headding-color mb-4 ">
              Bill Summary
            </h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-[12px] font-inter font-[500] text-cardValue">
                  Item Total:
                </span>
                <span className="text-[12px] font-inter font-[500] text-cardValue">
                  {itemTotal}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[12px] font-inter font-[500] text-cardValue">
                  GST:
                </span>
                <span className="text-[12px] font-inter font-[500] text-cardValue">
                  {gst}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[12px] font-inter font-[500] text-cardValue">
                  Processing Fee:
                </span>
                <span className="text-[12px] font-inter font-[500] text-cardValue">
                  {processingFee}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[12px] font-inter font-[500] text-cardValue">
                  Platform Fee:
                </span>
                <span className="text-[12px] font-inter font-[500] text-cardValue">
                  {platformFee}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[12px] font-inter font-[500] text-cardValue">
                  Delivery Charge:
                </span>
                <span className="text-[12px] font-inter font-[500] text-cardValue">
                  {deliveryCharge}
                </span>
              </div>
              <div className="flex justify-between text-red-500">
                <span className="text-[12px] font-inter font-[500] text-discountColor">
                  Discount:
                </span>
                <span className="text-[12px] font-inter font-[500] text-discountColor">
                  {discount}
                </span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t flex justify-between font-inter p-4 rounded-custom4x bg-background-grey">
              <span className="text-[14px] font-inter font-[600] text-grandTotal ">
                Grand Total
              </span>
              <span className="text-[14px] font-inter font-[600] text-grandTotal ">
                {grandTotal}
              </span>
            </div>
          </div>
        </div>

        {/* Right column - Order details */}
        <div className="w-full md:w-1/2 px-4">
          <div className="bg-white p-4 rounded-custom12px border border-subMenus px-4">
            <div className="space-y-8  p-4 rounded-custom12px border border-subMenus h-[300px] pr-40">
              <div className="grid grid-cols-2 gap-y-6 gap-x-0">
                <div>
                  <h3 className="text-[12px] font-[500] font-inter text-menuSubHeadingColor">
                    Customer Id
                  </h3>
                  <p className="text-[12px] font-[500] font-inter text-cardValue">
                    {customerId}
                  </p>
                </div>

                <div>
                  <h3 className="text-[12px] font-[500] font-inter text-menuSubHeadingColor">
                    Store Name
                  </h3>
                  <p className="text-[12px] font-[500] font-inter text-cardValue">
                    {storeName}
                  </p>
                </div>

                <div>
                  <h3 className="text-[12px] font-[500] font-inter text-menuSubHeadingColor">
                    Order Time
                  </h3>
                  <p className="text-[12px] font-[500] font-inter text-cardValue">
                    {orderDate} at {orderTime}
                  </p>
                </div>

                <div>
                  <h3 className="text-[12px] font-[500] font-inter text-menuSubHeadingColor">
                    Store Phone No.
                  </h3>
                  <p className="text-[12px] font-[500] font-inter text-cardValue">
                    {storePhone}
                  </p>
                </div>

                <div>
                  <h3 className="text-[12px] font-[500] font-inter text-menuSubHeadingColor">
                    Customer Rating
                  </h3>
                  <p className="text-[12px] font-[500] font-inter text-cardValue">
                    {customerRating}
                  </p>
                </div>

                <div>
                  <h3 className="text-[12px] font-[500] font-inter text-menuSubHeadingColor">
                    Email
                  </h3>
                  <p className="text-[12px] font-[500] font-inter text-cardValue">
                    {customerEmail}
                  </p>
                </div>

                <div>
                  <h3 className="text-[12px] font-[500] font-inter text-menuSubHeadingColor">
                    Delivery Mode
                  </h3>
                  <p className="text-[12px] font-[500] font-inter text-cardValue">
                    {homeDelivery}
                  </p>
                </div>

                <div>
                  <h3 className="text-[12px] font-[500] font-inter text-menuSubHeadingColor">
                    Customer Rating
                  </h3>
                  <p className="text-[12px] font-[500] font-inter text-cardValue">
                    {customerRating}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
