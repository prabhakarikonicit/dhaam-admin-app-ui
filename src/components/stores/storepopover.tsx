import React from "react";
import Burger from "../../lib/Images/Burger.png";

interface StoreItem {
  name: string;
  quantity: number;
  price: string;
}

interface Store {
  id: string;
  storeId: string;
  name: string;
  address: string;
  rating: number;
  status: "Active" | "Inactive";
  amount: string;
  createdDate?: string;
  items?: StoreItem[];
}

interface StorePopoverProps {
  popoverOpen: boolean;
  popoverStore: Store | null;
  popoverAnchorEl: HTMLElement | null;
  showStoreDetailsView: boolean;
  handleShowFullDetails: () => void;
}

const StorePopover: React.FC<StorePopoverProps> = ({
  popoverOpen,
  popoverStore,
  popoverAnchorEl,
  showStoreDetailsView,
  handleShowFullDetails
}) => {
  if (!popoverOpen || !popoverStore) return null;

  // If showStoreDetailsView is true, don't show the popover
  if (showStoreDetailsView) return null;

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

  const store = popoverStore;
  const items = store.items || [];

  // Calculate total dynamically if items exist
  const calculateTotal = () => {
    if (items.length === 0) {
      return store.amount;
    }

    const total = items.reduce((sum, item) => {
      const priceValue = parseFloat(item.price.replace(/[^0-9.]/g, ""));
      return sum + priceValue * item.quantity;
    }, 0);

    const currencySymbol = store.amount.match(/[^0-9.]/g)?.[0] || "₹";
    return `${currencySymbol}${(total / 2).toFixed(2)}`;
  };

  const total = calculateTotal();

  return (
    <div
      className="fixed z-50 bg-white rounded-lg shadow-xl w-[300px] border border-gray-200"
      style={popoverStyle}
      onClick={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
    >
      {/* Store ID Header */}
      <div className="flex justify-between items-center p-3 border-b">
        <h2 className="text-headding-color text-[12px] font-inter font-[500] mb-3">
          {store.storeId}
        </h2>
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

export default StorePopover;