import React, {useState} from "react";
import Burger from "../../lib/Images/Burger.png";

interface OrderItem {
  name: string;
  quantity: number;
  price: string;
  image?: string;
}

interface Order {
  id: string;
  orderId: string;
  customerName: string;
  address: string;
  orderDate: string;
  orderTime: string;
  status: string;
  amount: string;
  items?: OrderItem[];
  storeName?: string;
  createdDate?: string;
}

interface OrderPopoverProps {
  popoverOpen: boolean;
  popoverOrder: Order | null;
  popoverAnchorEl: HTMLElement | null;
  showOrderDetailsView: boolean;
  handleShowFullDetails: () => void;

}

const OrderPopover: React.FC<OrderPopoverProps> = ({
  popoverOpen,
  popoverOrder,
  popoverAnchorEl,
  showOrderDetailsView,
  handleShowFullDetails
}) => {

    
  if (!popoverOpen || !popoverOrder) return null;

  // If showOrderDetailsView is true, don't show the popover
  if (showOrderDetailsView) return null;

  // Calculate position based on the anchor element
  const anchorRect = popoverAnchorEl
    ? popoverAnchorEl.getBoundingClientRect()
    : null;
  const popoverStyle = anchorRect
    ? {
        position: "fixed" as const,
        top: `${anchorRect.bottom + window.scrollY + 5}px`,
        left: `${anchorRect.left + window.scrollX}px`,
        zIndex: 1000,
      }
    : {};

  const order = popoverOrder;
  const items = order.items || [];

  // Calculate total dynamically if items exist
  const calculateTotal = () => {
    if (items.length === 0) {
      return order.amount;
    }

    const total = items.reduce((sum, item) => {
      const priceValue = parseFloat(item.price.replace(/[^0-9.]/g, ""));
      return sum + priceValue * item.quantity;
    }, 0);

    const currencySymbol = order.amount.match(/[^0-9.]/g)?.[0] || "₹";
    return `${currencySymbol}${total.toFixed(2)}`;
  };

  const total = calculateTotal();

  return (
    <div
      className="fixed z-50 bg-white rounded-lg shadow-xl w-[300px] border border-gray-200"
      style={popoverStyle}
      onClick={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
    >
      {/* Order ID Header */}
      <div className="flex justify-between items-center p-3 border-b">
        <div>
          <h2 className="text-headding-color text-[12px] font-inter font-[500]">
            {order.orderId}
          </h2>
          <p className="text-gray-500 text-[10px]">
            {order.orderDate} at {order.orderTime}
          </p>
        </div>
        <button
          onClick={handleShowFullDetails}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
          onMouseDown={(e) => e.stopPropagation()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
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

      {/* Order Details Section */}
      <div className="p-4">
        {/* Customer Info */}
        <div className="mb-4">
          <p className="text-[12px] font-inter font-[500] text-cardValue">
            {order.customerName}
          </p>
          {order.storeName && (
            <p className="text-[11px] font-inter text-gray-600">
              From: {order.storeName}
            </p>
          )}
          <div className="mt-2 flex items-center">
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
              order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
              order.status === 'Processing' ? 'bg-blue-100 text-blue-800' : 
              order.status === 'Cancelled' ? 'bg-red-100 text-red-800' : 
              'bg-yellow-100 text-yellow-800'
            }`}>
              {order.status}
            </span>
          </div>
        </div>

        {/* Ordered Items Section */}
        {items.length > 0 && (
          <div>
            <div className="flex justify-between items-center">
              <span className="text-headding-color text-[12px] font-inter font-[500] mb-3">
                Ordered Items
              </span>
            </div>

            <div className="space-y-4 mt-3">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-md overflow-hidden mr-3 flex items-center justify-center">
                      <img src={item.image || Burger} alt={item.name} className="w-8 h-8" />
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

              <div className="flex justify-between items-center mt-4 pt-4 border-t border-grey-border">
                <span className="text-[12px] font-inter font-[500] text-cardValue">
                  Grand Total
                </span>
                <span className="text-[12px] font-inter font-[500] text-cardValue">
                  {total}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderPopover;