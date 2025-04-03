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
  .map((_, i) => {
    // Only modify the date part
    const months = [
      "January", "February", "March",
      "April", "May", "June",
      "July", "August", "September",
      "October", "November", "December"
    ];
    const monthIndex = i % 12; // Cycle through months
    const transactionDate = `${months[monthIndex]} 26`;

    // Keep EVERYTHING ELSE exactly the same as original
    return {
      id: `row-${i}`,
      transactionId: "#327702783",  // Same as original
      transactionDate: transactionDate, // Only this changes
      time: "06:30 PM",  // Same as original
      status: "Paid",    // Same as original
      store: "Giant E-Store",  // Same as original
      amount: 129.0      // Same as original
    };
  });

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
  const [selectedTransaction, setSelectedTransaction] =
    useState<PaymentTransaction | null>(null);
  const [showTransactionDetails, setShowTransactionDetails] = useState(false);

  const handleTransactionClick = (transaction: PaymentTransaction) => {
    setSelectedTransaction(transaction);
    setShowTransactionDetails(true);
  };
  const calculateGrandTotal = (transaction: PaymentTransaction) => {
    const tax = transaction.amount * 0.18; // Assuming 18% tax
    const processingFee = 2.0;
    const platformFee = 1.0;

    return {
      subtotal: transaction.amount,
      tax,
      processingFee,
      platformFee,
      grandTotal: transaction.amount + tax + processingFee + platformFee,
    };
  };
  return (
    <div className="max-w-full rounded-custom12px p-6 md:p-0 sm:p-0 lg:p-0 xl:p-0 sm:max-h-full md:max-h-full lg:max-h-full xl:max-h-full max-h-[80vh] overflow-y-auto sm:overflow-visible md:overflow-visible lg:overflow-visible xl:overflow-visible">
      <div className="flex justify-between items-center mb-6 mt-0 sm:mt-6 md:mt-8 lg:mt-12 xl-mt-12">
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
        <div className="bg-backgroundWhite border border-grey-border px-6 py-4 rounded-custom12px">
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
                    renderCell: (value, row) => (
                      <div
                        className="text-billingNumber font-inter font-[600] cursor-pointer hover:underline"
                        onClick={() => handleTransactionClick(row)}
                      >
                        {value}
                      </div>
                    ),
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

      {showTransactionDetails && selectedTransaction &&  (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex justify-end ">
          <div className="bg-white w-full sm:w-96 h-full overflow-y-auto mt-5 mr-2 rounded-custom12px">
            <div className="p-3 flex justify-between border-b  bg-background-grey mb-5">
              <h2 className="text-billingNumber font-inter font-[600] cursor-pointer hover:underline">
                {selectedTransaction?.transactionId}
                <span className="ml-2 px-2 py-1 text-[12px] font-inter rounded-custom80px bg-green text-customWhiteColor">
                  {selectedTransaction?.status}
                </span>
              </h2>
              <button
                onClick={() => setShowTransactionDetails(false)}
                className="text-gray-500 hover:text-gray-700"
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
                    d="M5.15225 5.15152C5.62088 4.68289 6.38068 4.68289 6.84931 5.15152L12.0008 10.303L17.1523 5.15152C17.6209 4.68289 18.3807 4.68289 18.8493 5.15152C19.3179 5.62015 19.3179 6.37995 18.8493 6.84858L13.6978 12L18.8493 17.1515C19.3179 17.6202 19.3179 18.3799 18.8493 18.8486C18.3807 19.3172 17.6209 19.3172 17.1523 18.8486L12.0008 13.6971L6.84931 18.8486C6.38068 19.3172 5.62088 19.3172 5.15225 18.8486C4.68362 18.3799 4.68362 17.6202 5.15225 17.1515L10.3037 12L5.15225 6.84858C4.68362 6.37995 4.68362 5.62015 5.15225 5.15152Z"
                    fill="#636363"
                  />
                </svg>
              </button>
            </div>

            <div className="p-4 mb-4">
              <div className="mb-4">
                <p className="text-[12px] font-inter font-[500] text-paragraphBlack leading-[15.6px]">
                  From
                </p>
                <p className="text-[12px] font-inter font-[500] text-paragraphBlack leading-[15.6px]">
                  {selectedTransaction?.transactionDate}
                </p>
                <p className="text-[11px] font-inter font-[400] text-cardTitle leading-[14.3px]">
                  {selectedTransaction?.time}
                </p>
              </div>

              <div className="mb-4">
                <p className="text-[12px] font-inter font-[500] text-paragraphBlack leading-[15.6px]">
                  To
                </p>
                <p className="text-[12px] font-inter font-[500] text-paragraphBlack leading-[15.6px]">
                  March 6, 2025
                </p>
                <p className="text-[11px] font-inter font-[400] text-cardTitle leading-[14.3px]">
                  06:30 PM
                </p>
              </div>

              <div className="mb-4">
                <p className="text-[12px] font-inter font-[500] text-paragraphBlack leading-[15.6px]">
                  Store
                </p>
                <p className="text-[14px] font-inter font-[400] text-verifyOtp leading-[15.6px]">
                  {selectedTransaction?.store}
                </p>
              </div>

              <div className="mb-4">
                <p className="text-[12px] font-inter font-[500] text-paragraphBlack leading-[15.6px]">
                  Mode of Transfer
                </p>
                <p className="text-[14px] font-inter font-[400] text-verifyOtp leading-[15.6px]">
                  Cash
                </p>
              </div>

              <div className="mb-4">
                <p className="text-[12px] font-inter font-[500] text-paragraphBlack leading-[15.6px]">
                  Total Amount
                </p>
                <p className="text-[14px] font-inter font-[400] text-verifyOtp leading-[15.6px]">
                  ${selectedTransaction?.amount.toFixed(2)}
                </p>
              </div>

              <div className="mb-4">
                <p className="text-[12px] font-inter font-[500] text-paragraphBlack leading-[15.6px]">
                  Admin Commission
                </p>
                <p className="text-[12px] font-inter font-[400] text-verifyOtp leading-[15.6px]">
                  $17.64 (*Incl. of Delivery charge $12.00)
                </p>
              </div>

              <div className="mb-4">
                <p className="text-[12px] font-inter font-[500] text-paragraphBlack leading-[15.6px]">
                  Merchant Earning
                </p>
                <p className="text-[14px] font-inter font-[400] text-verifyOtp leading-[15.6px]">
                  $22.56
                </p>
              </div>

              <div className="mb-4">
                <p className="text-[12px] font-inter font-[500] text-paragraphBlack leading-[15.6px]">
                  Agent Earning
                </p>
                <p className="text-[14px] font-inter font-[400] text-verifyOtp leading-[15.6px]">
                  $0.00
                </p>
              </div>

              <div className="mb-4">
                <p className="text-[12px] font-inter font-[500] text-paragraphBlack leading-[15.6px]">
                  Transaction Id
                </p>
                <p className="text-[14px] font-inter font-[400] text-verifyOtp leading-[15.6px] break-all">
                  ch_3R0nsWHTGIffEwwR1qNkYXAi
                </p>
              </div>

              <div className="mb-4">
                <p className="text-[12px] font-inter font-[500] text-paragraphBlack leading-[15.6px]">
                  Transaction Id
                </p>
                <p className="text-[14px] font-inter font-[400] text-verifyOtp leading-[15.6px] break-all">
                  ch_3R0nsWHTGIffEwwR1qNkYXAi
                </p>
              </div>

              <div className="mt-8 p-4 bg-backgroundWhite border border-grey-border rounded-custom8px">
                <h3 className="text-[12px] font-inter font-[500]  mb-2 text-headding-color">
                  Bill Summary
                </h3>
                <div className="flex justify-between mb-2 ">
                  <span className="text-[12px] font-inter font-[500]  mb-2 text-cardValue">
                    Item Total:
                  </span>
                  <span className="text-[12px] font-inter font-[500]  mb-2 text-cardValue">
                    $300.00
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-[12px] font-inter font-[500]  mb-2 text-cardValue">
                    GST:
                  </span>
                  <span className="text-[12px] font-inter font-[500]  mb-2 text-cardValue">
                    $36.00
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-[12px] font-inter font-[500]  mb-2 text-cardValue">
                    Processing Fee:
                  </span>
                  <span className="text-[12px] font-inter font-[500]  mb-2 text-cardValue">
                    $2.00
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-[12px] font-inter font-[500]  mb-2 text-cardValue">
                    Platform Fee:
                  </span>
                  <span className="text-[12px] font-inter font-[500]  mb-2 text-cardValue">
                    $1.00
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-[12px] font-inter font-[500]  mb-2 text-cardValue">
                    Delivery Charge:
                  </span>
                  <span className="text-[12px] font-inter font-[500]  mb-2 text-cardValue">
                    $10.00
                  </span>
                </div>
                <div className="flex justify-between text-red-500 border-b border-grey-border">
                  <span className="text-[12px] font-inter font-[500]  mb-2 text-discountColor">
                    Discount:
                  </span>
                  <span className="text-[12px] font-inter font-[500]  mb-2 text-discountColor">
                    - $30.00
                  </span>
                </div>
                <div className="flex justify-between bg-background-grey py-2 px-2 mt-2">
                  <span className="font-inter font-[14px] font-[600] text-grandTotal">Grand Total:</span>
                  <span className="font-inter font-[14px] font-[600] text-grandTotal">
                    $
                    {(
                      selectedTransaction.amount +
                      selectedTransaction.amount * 0.18 +
                      2.0 +
                      1.0
                    ).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentsForm;