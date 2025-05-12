import React, { useState, useEffect, useRef } from "react";
import Burger from "../../lib/Images/Burger.png";
import OrderDetailsExact from "../orders/ordersdetails"; // Update path as needed
import StoreDetailPage from "../stores/storedetails";
import Store from "../stores/stores";
import Orders from "../orders/orders";
interface Store {
  id: string;
  storeId: string;
  amount: string;
  name: string;
  address: string;
  rating: number;
  status: "Active" | "Inactive";
  items?: StoreItem[]; // Optional items for detailed view
}

interface Order {
  id: string;
  orderId: string;
  amount: string;
  status?:
    | ""
    | "Pending"
    | "Completed"
    | "Dispatched"
    | "Cancelled"
    | "Out for delivery";
  store: string;
  deliveryAddress: string;
  deliveryMode: string;
  scheduleTime: string;
  scheduleDate: string;
  paymentMethod: "Cash" | "UPI" | "Credit Card";
  createdDate?: string; // Added for date filtering
  items?: OrderItem[]; // Optional items for detailed view
}

interface StoreItem {
  name: string;
  quantity: number;
  price: string;
}

interface OrderItem {
  name: string;
  quantity: number;
  price: string;
}

// Unified Popover Component
const UnifiedPopover: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  data: Store | Order | null;
  type: "store" | "order";
  anchorEl: HTMLElement | null;
}> = ({ isOpen, onClose, data, type, anchorEl }) => {
  const popoverRef = useRef<HTMLDivElement>(null);
  const [currentView, setCurrentView] = useState<"details" | "summary">("details");
  const [showFullPage, setShowFullPage] = useState(false);
  
  useEffect(() => {
    if (isOpen) {
      setCurrentView("details");
      setShowFullPage(false);
    }
  }, [isOpen]);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        !showFullPage
      ) {
        onClose();
      }
    };

    if (isOpen && !showFullPage) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose, showFullPage]);

  if (!isOpen || !data) return null;
  
  // If we're showing the full page view, render that instead of the popover
  if (showFullPage) {
    if (type === "order") {
      const order = data as Order;
      return (
        <OrderDetailsExact
          orderId={order.orderId}
          orderStatus="Prepaid" // Assuming default status
          orderDate={order.scheduleDate}
          orderTime={order.scheduleTime}
          storeName={order.store}
          items={order.items || []}
          customerId="#987678390" // Example or placeholder values
          storePhone="+91 810 230 8108"
          customerEmail="amanofficial0502@gmail.com"
          customerRating="N/A"
          deliveryMode={order.deliveryMode}
          homeDelivery="Home Delivery" // Add this as it's in your OrderDetailsExact interface
          itemTotal={order.amount}
          gst="₹36.00"
          processingFee="₹2.00"
          platformFee="₹1.00"
          deliveryCharge="₹10.00"
          discount="- ₹30.00"
          grandTotal="₹319.00"
          onBackClick={() => setShowFullPage(false)}
        />
      );
    } else {
      const store = data as Store;
      return (
        <StoreDetailPage
          storeId={store.storeId}
          storeName={store.name}
          storeAddress={store.address}
          rating={store.rating}
          status={store.status}
          phoneNumber="+91 810 230 8108" // Example or placeholder
          email="info@designmart.com" // Example or placeholder
          storeItems={store.items}
          onBackClick={() => setShowFullPage(false)}
        />
      );
    }
  }

  // Calculate position based on the anchor element
  const anchorRect = anchorEl ? anchorEl.getBoundingClientRect() : null;
  const popoverStyle = anchorRect ? {
    top: `${anchorRect.bottom + window.scrollY + 5}px`,
    left: `${anchorRect.left + window.scrollX}px`,
  } : {};

  // Toggle between details and summary views
  const toggleView = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // If we're in summary view, go to full page instead of back to details
    if (currentView === "summary") {
      setShowFullPage(true);
    } else {
      setCurrentView("summary");
    }
  };

  // Prevent clicks inside the popover from closing it
  const handlePopoverClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };


  // Render Store Items View (Popover)
  const renderStoreItemsView = () => {
    const store = data as Store;
    const items = store.items || [];

    // Calculate total dynamically if items exist
    const calculateTotal = () => {
      if (items.length === 0) {
        // If no items, just use the order amount
        return store.amount;
      }

      // Otherwise calculate from items
      const total = items.reduce((sum, item) => {
        // Extract numeric value from price string (removing currency symbol)
        const priceValue = parseFloat(item.price.replace(/[^0-9.]/g, ""));
        return sum + priceValue * item.quantity;
      }, 0);

      // Format with same currency symbol as in the order amount
      const currencySymbol = store.amount.match(/[^0-9.]/g)?.[0] || "₹";
      return `${currencySymbol}${(total / 2).toFixed(2)}`;
    };

    const total = calculateTotal();

    return (
      <>
        {/* Store ID Header */}
        <div className="flex justify-between items-center p-3 border-b">
          <h2 className="text-headding-color text-[12px] font-inter font-[500] mb-3">
            {store.storeId}
          </h2>
          <button
            onClick={(e) => toggleView(e)} 
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
            onMouseDown={(e) => e.stopPropagation()} // Prevent mousedown from bubbling
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

        {/* Store Details Section */}
        <div className="p-4">
          {/* Popular Items Section (if items exist) */}
          {items.length > 0 && (
            <div>
              <div className="flex justify-between items-center">
                <span className="text-headding-color text-[12px] font-inter font-[500] mb-3">
                  Store Items
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
                        <img src={Burger} alt={item.name} className="w-8 h-8" />
                      </div>
                      <div>
                        <span>
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
      </>
    );
  };
  
  // Render Order Items View (Popover)
  const renderOrderItemsView = () => {
    const order = data as Order;
    const items = order.items || [];

    // Calculate total dynamically if items exist
    const calculateTotal = () => {
      if (items.length === 0) {
        // If no items, just use the order amount
        return order.amount;
      }

      // Otherwise calculate from items
      const total = items.reduce((sum, item) => {
        // Extract numeric value from price string (removing currency symbol)
        const priceValue = parseFloat(item.price.replace(/[^0-9.]/g, ""));
        return sum + priceValue * item.quantity;
      }, 0);

      // Format with same currency symbol as in the order amount
      const currencySymbol = order.amount.match(/[^0-9.]/g)?.[0] || "₹";
      return `${currencySymbol}${(total / 2).toFixed(2)}`;
    };

    const total = calculateTotal();

    return (
      <>
        {/* Header */}
        <div className="flex justify-between items-center p-3 border-b">
          <h2 className="text-[14px] font-inter font-[400] text-cardValue">
            {order.orderId}
          </h2>
          <button
            onClick={(e) => toggleView(e)} 
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
            onMouseDown={(e) => e.stopPropagation()} // Prevent mousedown from bubbling
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

        {/* Item Ordered Section */}
        <div className="p-4">
          <h3 className="text-headding-color text-[12px] font-inter font-[500] mb-3">
            Item Ordered
          </h3>

          {/* Item list */}
          <div className="space-y-4">
            {items.length > 0 ? (
              items.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-md overflow-hidden mr-3 flex items-center justify-center">
                      <img src={Burger} alt={item.name} className="w-8 h-8" />
                    </div>
                    <div>
                      <span>
                        {" "}
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
              ))
            ) : (
              // If no items are available, show a message or fallback
              <div className="text-center py-2 text-gray-500">
                {order.status === "Completed"
                  ? "Order completed"
                  : "No item details available"}
              </div>
            )}
          </div>

          {/* Grand Total */}
          <div className="flex justify-between items-center mt-4 pt-4 border-t border-grey-border">
            <span className="text-[12px] font-inter font-[500] text-cardValue">
              Grand Total
            </span>
            <span className="text-[12px] font-inter font-[500] text-cardValue">
              {total}
            </span>
          </div>
        </div>
      </>
    );
  };

  return (
    <div
      ref={popoverRef}
      className="fixed z-50 bg-white rounded-lg shadow-xl w-[300px] border border-gray-200"
      style={popoverStyle}
      onClick={handlePopoverClick}
      onMouseDown={(e) => e.stopPropagation()}
    >
      {currentView === "details" ? (
        // Items view (original content)
        type === "order" ? renderOrderItemsView() : renderStoreItemsView()
      ) : (
        // Summary view (metadata)
        type === "store" ? renderOrderItemsView() : renderStoreItemsView()
      )}
    </div>
  );
};

// For backward compatibility, provide these exported components
export const OrderPopover: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
  anchorEl: HTMLElement | null;
}> = (props) => {
  return (
    <UnifiedPopover
      isOpen={props.isOpen}
      onClose={props.onClose}
      data={props.order}
      type="order"
      anchorEl={props.anchorEl}
    />
  );
};

export const StorePopover: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  store: Store | null;
  anchorEl: HTMLElement | null;
}> = (props) => {
  return (
    <UnifiedPopover
      isOpen={props.isOpen}
      onClose={props.onClose}
      data={props.store}
      type="store"
      anchorEl={props.anchorEl}
    />
  );
};

export default UnifiedPopover;