import React from "react";

interface HeaderProps {
  storeId: string;
  storeName: string;
  status: string;
  onBackClick: () => void;
}

const Header: React.FC<HeaderProps> = ({
  storeId,
  storeName,
  status,
  onBackClick,
}) => {
  return (
    <div className="flex justify-between items-center p-4 bg-background-grey">
      <div className="flex items-center">
        <button
          onClick={onBackClick}
          className="mr-4 border border-reloadBorder bg-backgroundWhite p-3 rounded-custom"
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
              d="M6.79488 11.695C6.52151 11.9683 6.0783 11.9683 5.80493 11.695L1.60493 7.49497C1.33156 7.22161 1.33156 6.77839 1.60493 6.50502L5.80493 2.30502C6.0783 2.03166 6.52151 2.03166 6.79488 2.30502C7.06825 2.57839 7.06825 3.02161 6.79488 3.29497L3.78985 6.3H11.8999C12.2865 6.3 12.5999 6.6134 12.5999 7C12.5999 7.3866 12.2865 7.7 11.8999 7.7L3.78985 7.7L6.79488 10.705C7.06825 10.9784 7.06825 11.4216 6.79488 11.695Z"
              fill="#212121"
            />
          </svg>
        </button>
        <div>
          <div className="flex items-center">
            <h1 className="text-[20px] font-inter font-[600] text-menuSubHeadingColor">
              {storeName}
            </h1>
            <span
              className={`ml-2 px-4 py-1 text-[12px] font-[600] font-inter rounded-custom80px ${
                status === "Active"
                  ? "bg-green text-customWhiteColor"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {status}
            </span>
          </div>
          <p className="text-[12px] font-inter font-[500] text-cardValue">
            {storeId}
          </p>
        </div>
      </div>

      <div className="flex space-x-2 -mt-2 ">
        <button className="px-4 py-2 border border-reloadBorder text-cardValue font-[600] font-inter text-[12px] rounded-custom flex items-center">
          English{" "}
          <span className="ml-1">
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
                d="M3.70503 5.10503C3.97839 4.83166 4.42161 4.83166 4.69497 5.10503L7 7.41005L9.30503 5.10503C9.57839 4.83166 10.0216 4.83166 10.295 5.10503C10.5683 5.37839 10.5683 5.82161 10.295 6.09498L7.49497 8.89498C7.22161 9.16834 6.77839 9.16834 6.50503 8.89498L3.70503 6.09498C3.43166 5.82161 3.43166 5.37839 3.70503 5.10503Z"
                fill="#212121"
              />
            </svg>
          </span>
        </button>
        <button className="px-4 py-2 border border-reloadBorder text-cardValue font-[600] font-inter text-[12px] rounded-custom flex items-center">
          Visit Store{" "}
          <span className="ml-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
            >
              <path
                d="M7.7001 2.1C7.3135 2.1 7.0001 2.4134 7.0001 2.8C7.0001 3.1866 7.3135 3.5 7.7001 3.5H9.51015L5.10512 7.90502C4.83176 8.17839 4.83176 8.62161 5.10512 8.89497C5.37849 9.16834 5.82171 9.16834 6.09507 8.89497L10.5001 4.48995V6.3C10.5001 6.6866 10.8135 7 11.2001 7C11.5867 7 11.9001 6.6866 11.9001 6.3V2.8C11.9001 2.4134 11.5867 2.1 11.2001 2.1H7.7001Z"
                fill="#212121"
              />
              <path
                d="M3.5001 3.5C2.7269 3.5 2.1001 4.1268 2.1001 4.9V10.5C2.1001 11.2732 2.7269 11.9 3.5001 11.9H9.1001C9.8733 11.9 10.5001 11.2732 10.5001 10.5V8.4C10.5001 8.0134 10.1867 7.7 9.8001 7.7C9.4135 7.7 9.1001 8.0134 9.1001 8.4V10.5H3.5001V4.9L5.6001 4.9C5.9867 4.9 6.3001 4.5866 6.3001 4.2C6.3001 3.8134 5.9867 3.5 5.6001 3.5H3.5001Z"
                fill="#212121"
              />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
};

export default Header;
