import React from "react";

interface StoreCardProps {
  row: any;
  selectedRows: string[];
  onSelectRow: (id: string) => void;
  showCheckboxes: boolean;
}

const StoreMobileView: React.FC<StoreCardProps> = ({
  row,
  selectedRows,
  onSelectRow,
  showCheckboxes,
}) => {
  return (
    <div className="bg-white rounded-md shadow-sm mb-3 border border-gray-100">
      <div className="p-4">
        {/* Row 1: Store ID and Ratings */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center">
            {showCheckboxes && (
              <div className="mr-3">
                <input
                  type="checkbox"
                  checked={selectedRows.includes(row.id)}
                  onChange={() => onSelectRow(row.id)}
                  className="h-5 w-5 rounded border-gray-300 text-green-600 accent-bgButton focus:ring-bgButton transition"
                />
              </div>
            )}
            <div>
              <div className="text-cardTitle text-[12px] font-inter font-[500] pb-2">
                Store ID
              </div>
              <div className="text-cardValue font-inter font-[600] text-[16px]">
                {row.storeId || row.id}
              </div>
            </div>
          </div>
          <div>
            <div className="text-cardTitle text-[12px] font-inter font-[500] pb-2 text-right">
              Ratings
            </div>
            <div className="bg-bgActive px-3 py-1 rounded-md text-customWhiteColor font-inter font-[600] text-[12px] flex items-center">
              {row.rating || "3.5"}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4 ml-1"
              >
                <path
                  fillRule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
        {/* Row 2: Status and Store */}
        <div className="flex justify-between items-start">
          <div>
            <div className="text-cardTitle text-[12px] font-inter font-[500] pb-2">
              Status
            </div>
            <div
              className={`${
                row.status === "Pending"
                  ? "bg-yellow text-yellow"
                  : "bg-green"
              } text-customWhiteColor font-inter font-[500] text-[14px] px-3 py-1 rounded-md inline-block`}
            >
              {row.status || "Active"}
            </div>
          </div>
          <div>
            <div className="text-cardTitle text-[12px] font-inter font-[500] pb-2 text-right">
              Store
            </div>
            <div className="text-cardValue font-inter font-[500] text-[14px] text-right">
              {row.store || "Queenstown Public House"}
            </div>
          </div>
        </div>

        {/* Reject and Approve buttons - only show for pending items */}
        {row.status === "Pending" && (
          <div className="flex justify-between mt-6 pt-3 border-t border-reloadBorder">
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
      </div>
    </div>
  );
};

export default StoreMobileView;