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
  status: "Active" | "Inactive" | "Pending";
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
      className="fixed z-50 bg-white shadow-xl w-[270px] rounded-custom12px shadow-popoverShadow"
      style={popoverStyle}
      onClick={(e) => e.stopPropagation()}
      onMouseDown={(e) => e.stopPropagation()}
    >
      {/* Store ID Header */}
      <div className="flex justify-between items-center p-3 border-b border-grey-border">
      <h2 className="text-cardValue text-[12px] font-inter font-[500] mb-3">
          {store.storeId}
        </h2>
        <button
          onClick={handleShowFullDetails}
           className="w-8 h-8 flex items-center justify-center rounded-custom border border-grey-border hover:bg-gray-100"
          onMouseDown={(e) => e.stopPropagation()}
        >
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
                d="M5.10542 10.295C4.83205 10.0216 4.83205 9.57839 5.10542 9.30503L7.41044 7L5.10542 4.69497C4.83205 4.42161 4.83205 3.97839 5.10542 3.70503C5.37878 3.43166 5.822 3.43166 6.09537 3.70503L8.89537 6.50503C9.16873 6.77839 9.16873 7.22161 8.89537 7.49497L6.09537 10.295C5.822 10.5683 5.37878 10.5683 5.10542 10.295Z"
                fill="#636363"
              />
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
                  <div className="w-12 h-12 overflow-hidden mr-3 flex items-center justify-center">
                        <img
                          src={Burger}
                          alt={item.name}
                          className="w-12 h-12 border rounded-custom border-grey-border bg-white pb-1"
                        />
                      </div>
                      <div>
                        <span className="flex items-center space-x-4">
                          <p className="text-[12px] font-inter font-[500] text-cardValue">
                            {item.name}
                          </p>
                          <p className="text-[12px] font-inter font-[500] text-headding-color">
                            x{" "}
                            <span className="text-[12px] font-inter font-[500] text-cardValue">
                              {item.quantity}
                            </span>
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