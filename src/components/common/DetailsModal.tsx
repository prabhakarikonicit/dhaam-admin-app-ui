import React, { useState, useEffect, useRef } from "react";

import { ChevronDown, Plus, X } from "lucide-react";

interface Order {
    id: string;
    orderId: string;
    amount: string;
    status:
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

  interface OrderItem {
    name: string;
    quantity: number;
    price: string;
  }
  

  // Order Popover Component
  const OrderPopover: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    order: Order | null;
    anchorEl: HTMLElement | null;
  }> = ({ isOpen, onClose, order, anchorEl }) => {
    const popoverRef = useRef<HTMLDivElement>(null);
  
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
          onClose();
        }
      };
  
      if (isOpen) {
        document.addEventListener("mousedown", handleClickOutside);
      }
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [isOpen, onClose]);
  
    if (!isOpen || !order || !anchorEl) return null;
  
    // Calculate position based on the anchor element
    const anchorRect = anchorEl.getBoundingClientRect();
    const popoverStyle = {
      top: `${anchorRect.bottom + window.scrollY + 5}px`,
      left: `${anchorRect.left + window.scrollX}px`,
    };
  
    // Get items from the order or default to empty array
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
        const priceValue = parseFloat(item.price.replace(/[^0-9.]/g, ''));
        return sum + (priceValue * item.quantity);
      }, 0);
      
      // Format with same currency symbol as in the order amount
      const currencySymbol = order.amount.match(/[^0-9.]/g)?.[0] || '₹';
      return `${currencySymbol}${total.toFixed(2)}`;
    };
    
    const total = calculateTotal();
  
    return (
      <div 
        ref={popoverRef}
        className="fixed z-50 bg-white rounded-lg shadow-xl w-[350px] border border-gray-200"
        style={popoverStyle}
      >
        {/* Order ID Header */}
        <div className="flex justify-between items-center p-3 border-b">
          <h2 className="text-lg font-medium text-gray-800">{order.orderId}</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
  
        {/* Item Ordered Section */}
        <div className="p-4">
          <h3 className="text-gray-600 font-medium mb-3">Item Ordered</h3>
          
          {/* Item list */}
          <div className="space-y-4">
            {items.length > 0 ? (
              items.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-md overflow-hidden mr-3 flex items-center justify-center">
                      <img 
                        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1idXJnZXIiPjxsaW5lIHgxPSIzIiB5MT0iNiIgeDI9IjIxIiB5Mj0iNiIvPjxsaW5lIHgxPSIzIiB5MT0iMTIiIHgyPSIyMSIgeTI9IjEyIi8+PGxpbmUgeDE9IjMiIHkxPSIxOCIgeDI9IjIxIiB5Mj0iMTgiLz48L3N2Zz4=" 
                        alt={item.name} 
                        className="w-8 h-8"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{item.name}</p>
                      <p className="text-gray-500 text-sm">x {item.quantity}</p>
                    </div>
                  </div>
                  <div className="font-medium">{item.price}</div>
                </div>
              ))
            ) : (
              // If no items are available, show a message or fallback
              <div className="text-center py-2 text-gray-500">
                {order.status === "Completed" ? 
                  "Order completed" : 
                  "No item details available"}
              </div>
            )}
          </div>
  
          {/* Grand Total */}
          <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
            <span className="font-medium text-gray-800">Grand Total</span>
            <span className="font-bold text-gray-800">{total}</span>
          </div>
        </div>
      </div>
    );
  };
  

  
  export default OrderPopover;