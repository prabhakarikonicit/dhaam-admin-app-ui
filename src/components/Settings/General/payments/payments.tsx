import React, { useState } from "react";
import { Download, LayoutGrid, Filter, Search } from "lucide-react";
import CustomDataGrid from "../../../common/datagrid";
import StatCard from "../../../common/statCard";
interface PaymentTransaction {
  id: string;
  transactionId: string;
  transactionDate: string;
  time: string;
  status: string;
  store: string;
  amount: number;
}

const PaymentsForm: React.FC = () => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const transactionsData: PaymentTransaction[] = Array(10)
    .fill(null)
    .map((_, i) => ({
      id: `row-${i}`,
      transactionId: "#327702783",
      transactionDate: "January 26",
      time: "06:30 PM",
      status: "Paid",
      store: "Giant E-Store",
      amount: 129.0,
    }));

  const columns = [
    { field: "transactionId", headerName: "Transaction ID" },
    { field: "transactionDate", headerName: "Transaction Date" },
    { field: "status", headerName: "Status" },
    { field: "store", headerName: "Store" },
    { field: "amount", headerName: "Amount" },
  ];

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.checked) {
      setSelectedRows(transactionsData.map((item) => item.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id: string): void => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  return (
    <div className="max-w-3xl rounded-custom12px p-6 md:p-0 sm:p-0 lg:p-0 xl:p-0 sm:max-h-full md:max-h-full lg:max-h-full xl:max-h-full max-h-[80vh] overflow-y-auto sm:overflow-visible md:overflow-visible lg:overflow-visible xl:overflow-visible">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-[14px] font-inter font-[600] text-headding-color">
          Payments
        </h2>
      </div>

      <div className="space-y-6">
        {/* Earnings Section */}
        <div className="hidden md:block sm:block lg:block bg-backgroundWhite rounded-custom12px p-6">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[16px] font-inter font-[500] text-green ">
                $9873.00
              </span>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[12px] font-inter font-[600] text-cardValue">
                  Your Earnings
                </span>
                <span className="text-[12px] font-inter font-[400] text-headding-color">
                  Feb 1, 2025 - Mar 1, 2025
                </span>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 text-[12px] font-inter font-[600] text-cardValue border border-reloadBorder rounded-custom flex items-center bg-backgroundWhite gap-2">
                Invoice
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
                    d="M2.09961 11.9C2.09961 11.5134 2.41301 11.2 2.79961 11.2H11.1996C11.5862 11.2 11.8996 11.5134 11.8996 11.9C11.8996 12.2866 11.5862 12.6 11.1996 12.6H2.79961C2.41301 12.6 2.09961 12.2866 2.09961 11.9ZM4.40463 6.50502C4.678 6.23165 5.12122 6.23165 5.39458 6.50502L6.29961 7.41004L6.29961 2.09999C6.29961 1.71339 6.61301 1.39999 6.99961 1.39999C7.38621 1.39999 7.69961 1.71339 7.69961 2.09999L7.69961 7.41004L8.60463 6.50502C8.878 6.23165 9.32122 6.23165 9.59458 6.50502C9.86795 6.77839 9.86795 7.2216 9.59458 7.49497L7.49458 9.59497C7.36331 9.72624 7.18526 9.79999 6.99961 9.79999C6.81396 9.79999 6.63591 9.72624 6.50463 9.59497L4.40463 7.49497C4.13127 7.2216 4.13127 6.77839 4.40463 6.50502Z"
                    fill="#212121"
                  />
                </svg>
              </button>
              <button className="px-4 py-2 text-[12px] font-inter font-[600] text-whiteColor bg-bgButton rounded-custom ">
                Withdraw
              </button>
            </div>
          </div>
        </div>

        <div className="block md:hidden sm:hidden lg:hidden bg-backgroundWhite rounded-custom12px p-6">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[12px] font-inter font-[600] text-green ">
                $9873.00
              </span>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] font-inter font-[600] text-cardValue">
                  Your Earnings
                </span>
                <span className="text-[10px] font-inter text-headding-color">
                  Feb 1, 2025 - Mar 1, 2025
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap w-full gap-1 mt-3">
            <button className="px-8 py-2 text-[12px] font-inter text-cardValue border border-gray-200 rounded-lg flex items-center gap-1">
              Invoice
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
                  d="M2.09961 11.9C2.09961 11.5134 2.41301 11.2 2.79961 11.2H11.1996C11.5862 11.2 11.8996 11.5134 11.8996 11.9C11.8996 12.2866 11.5862 12.6 11.1996 12.6H2.79961C2.41301 12.6 2.09961 12.2866 2.09961 11.9ZM4.40463 6.50502C4.678 6.23165 5.12122 6.23165 5.39458 6.50502L6.29961 7.41004L6.29961 2.09999C6.29961 1.71339 6.61301 1.39999 6.99961 1.39999C7.38621 1.39999 7.69961 1.71339 7.69961 2.09999L7.69961 7.41004L8.60463 6.50502C8.878 6.23165 9.32122 6.23165 9.59458 6.50502C9.86795 6.77839 9.86795 7.2216 9.59458 7.49497L7.49458 9.59497C7.36331 9.72624 7.18526 9.79999 6.99961 9.79999C6.81396 9.79999 6.63591 9.72624 6.50463 9.59497L4.40463 7.49497C4.13127 7.2216 4.13127 6.77839 4.40463 6.50502Z"
                  fill="#212121"
                />
              </svg>
            </button>
            <button className="px-8 py-2 text-[12px] font-inter font-[600] text-whiteColor bg-bgButton rounded-custom ">
              Withdraw
            </button>
          </div>
        </div>

        {/* Payout Balance Section */}
        <div className="bg-white rounded-custom12px border border-gray-200 p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <span className="text-[32px] font-inter font-[600] text-headingBlack">
                $1203.00
              </span>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[16px] font-inter font-[500] text-black">
                  Payout
                </span>
                <span className="text-[14px] font-inter font-[400] text-headding-color">
                  balance
                </span>
              </div>
            </div>
            <button className="px-4 py-2 text-[12px] font-inter font-[600] text-cardValue border border-reloadBorder rounded-custom">
              View Details
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <StatCard value="1000" description="Orders this month" />
            <StatCard value="20" description="Stores" />
            <StatCard value="300" description="Cancelled orders" />
          </div>
        </div>

        {/* Transactions Section */}
        <div>
          <h3 className="text-[14px] font-inter font-[500] text-paragraphBlack mb-4 ms-2">
            Payout transactions
          </h3>

          <div className="overflow-x-auto">
            {/* <CustomDataGrid
              columns={columns}
              rows={transactionsData}
              pageSize={10}
              onSelectAll={handleSelectAll}
              onSelectRow={handleSelectRow}
              selectedRows={selectedRows}
            /> */}
            <CustomDataGrid
              columns={[
                {
                  field: "transactionId",
                  headerName: "Transaction ID",
                  width: "200px",
                },
                {
                  field: "transactionDate",
                  headerName: "Transaction Date",
                  width: "150px",
                },
                {
                  field: "status",
                  headerName: "Status",
                  width: "120px",
                },
                {
                  field: "store",
                  headerName: "Store",
                  width: "200px",
                },
                {
                  field: "amount",
                  headerName: "Amount",
                  width: "120px",
                },
              ]}
              rows={transactionsData}
              pageSize={10}
              onSelectAll={handleSelectAll}
              onSelectRow={handleSelectRow}
              selectedRows={selectedRows}
              searchPlaceholder="Search payout"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentsForm;
