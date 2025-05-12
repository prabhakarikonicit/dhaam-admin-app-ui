import React from "react";
import Burger from "../../lib/Images/Burger.png";

interface OrderCardProps {
  row: any;
  handleOrderIdClick: (event: React.MouseEvent<HTMLButtonElement>, order: any) => void;
}

const OrderMobileView: React.FC<OrderCardProps> = ({ row, handleOrderIdClick }) => {
  const orderData = {
    id: row.id || "",
    orderId: row.orderId || row.id || "",
    amount: row.amount || "100.00",
    status:
      (row.status as
        | ""
        | "Pending"
        | "Completed"
        | "Dispatched"
        | "Cancelled"
        | "Out for delivery") || "Pending",
    store: row.store || "Queenstown Public House",
    deliveryAddress:
      row.deliveryAddress || "6391 Elgin St. Celina, Delaware 10299",
    deliveryMode: row.deliveryMode || "Home delivery",
    scheduleTime: row.scheduleTime || "Jan 26 at 06:30 PM",
    scheduleDate: row.scheduleDate || "",
    paymentMethod:
      (row.paymentMethod as "Cash" | "UPI" | "Credit Card") || "Cash",
  };

  // Payment method color mapping
  const paymentMethodColors = {
    Cash: "bg-bgActive rounded-custom4x text-customWhiteColor font-inter font-[600]",
    UPI: "bg-yellow rounded-custom4x text-yellow font-inter font-[600]",
    "Credit Card":
      "bg-blueCredit rounded-custom4x text-primaryCredit font-inter font-[600]",
  };
  
  const statusStyleMap = {
    Completed: "bg-customBackgroundColor text-green",
    "Out for delivery": "bg-primary text-primary",
    Cancelled: "bg-bgCrossIcon text-maroon",
    Pending: "bg-orangeColor text-yellow",
  };
  
  // Get payment method color class or default to green
  const paymentColor =
    paymentMethodColors[
      orderData.paymentMethod as keyof typeof paymentMethodColors
    ] || "bg-green";
    
  // Decide whether to show action buttons or status
  const showActionButtons = !row.status || row.status === "";

  return (
    <div className="bg-white rounded-md mb-3 ">
      <div className="p-3">
        {/* Row 1: Order ID and Amount */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="text-cardTitle text-[12px] font-inter font-[500] pb-2">
              Order ID
            </div>
            <div className="text-cardValue font-inter font-[500] text-[16px] flex items-center">
              {row.orderId || row.id}
              <button
                className="ml-2"
                onClick={(e) => handleOrderIdClick(e, orderData)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
          <div>
            <div className="text-cardTitle text-[12px] font-inter font-[500] text-right pb-2">
              Amount
            </div>
            <div className="flex items-center justify-end">
              <div className="text-cardValue font-inter font-[500] text-[16px] mr-2">
                {row.amount || "100.00"}
              </div>
              <div
                className={`${paymentColor} text-white px-2 py-1 rounded-custom4px text-[14px] font-inter font-[500]`}
              >
                {row.paymentMethod || "Cash"}
              </div>
            </div>
          </div>
        </div>
        {/* Row 2: Store and Schedule Time */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="text-cardTitle text-[12px] font-inter font-[500] pb-2">
              Store
            </div>
            <div className="text-cardValue font-inter font-[500] text-[14px]">
              {row.store || "Queenstown Public House"}
            </div>
          </div>
          <div>
            <div className="text-cardTitle text-[12px] font-inter font-[500] text-right">
              Schedule Time
            </div>
            <div className="text-cardValue font-inter font-[500] text-[12px] text-right">
              {row.scheduleTime || "Jan 26 at 06:30 PM"}
            </div>
          </div>
        </div>
        {/* Row 3: Delivery Mode and Delivery Address */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="text-cardTitle text-[12px] font-inter font-[500] pb-2">
              Delivery Mode
            </div>
            <div className="bg-subMenus py-1 px-3 rounded-custom80px text-center whitespace-nowrap text-cardValue font-inter font-[600] text-[12px] inline-block">
              {row.deliveryMode || "Home delivery"}
            </div>
          </div>
          <div>
            <div className="text-cardTitle text-[12px] font-inter font-[500] text-right pb-2">
              Delivery Address
            </div>
            <div className="text-cardValue font-inter font-[500] text-[12px] text-right">
              {row.deliveryAddress ||
                "6391 Elgin St. Celina, Delaware 10299"}
            </div>
          </div>
        </div>
      </div>
      {/* Conditional rendering based on status */}
      {showActionButtons && (
        <div className="flex border-b border-grey-border py-2">
          <button className="flex bg-bgred text-white py-3 flex items-center justify-center font-inter font-[500] text-[12px] rounded-custom mx-4 px-4">
            Reject
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 ml-4"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3.00483 3.00507C3.2782 2.73171 3.72141 2.73171 3.99478 3.00507L6.9998 6.0101L10.0048 3.00507C10.2782 2.73171 10.7214 2.73171 10.9948 3.00507C11.2681 3.27844 11.2681 3.72166 10.9948 3.99502L7.98975 7.00005L10.9948 10.0051C11.2681 10.2784 11.2681 10.7217 10.9948 10.995C10.7214 11.2684 10.2782 11.2684 10.0048 10.995L6.9998 7.99L3.99478 10.995C3.72141 11.2684 3.2782 11.2684 3.00483 10.995C2.73146 10.7217 2.73146 10.2784 3.00483 10.0051L6.00986 7.00005L3.00483 3.99502C2.73146 3.72166 2.73146 3.27844 3.00483 3.00507Z"
                fill="white"
              />
            </svg>
          </button>
          <button className="flex-1 bg-bgActive text-white py-3 flex items-center justify-center font-inter font-[500] text-[12px] rounded-custom">
            Accept
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 ml-4"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M11.6946 3.70503C11.968 3.97839 11.968 4.42161 11.6946 4.69497L6.09458 10.295C5.82122 10.5683 5.378 10.5683 5.10463 10.295L2.30463 7.49497C2.03127 7.22161 2.03127 6.77839 2.30463 6.50503C2.578 6.23166 3.02122 6.23166 3.29458 6.50503L5.59961 8.81005L10.7046 3.70503C10.978 3.43166 11.4212 3.43166 11.6946 3.70503Z"
                fill="white"
              />
            </svg>
          </button>
        </div>
      )}
      {/* For any other status, we could add similar conditions */}
      {row.status && row.status !== "" && (
        <div
          className={`px-3 mx-3 py-2 rounded-custom80px text-center font-inter text-[12px] font-[600] whitespace-nowrap border-t border-gray-200 ${
            statusStyleMap[row.status as keyof typeof statusStyleMap] ||
            "bg-gray-100 text-gray-800"
          }`}
        >
          {row.status}
        </div>
      )}
    </div>
  );
};

export default OrderMobileView;