import React, { useState } from "react";
import { ChevronRight, ChevronLeft, PenSquare } from "lucide-react";
import CustomDataGrid from "../../../common/datagrid";
import CustomModal, { FieldDefinition } from "../../../common/modals";

interface Column {
  field: string;
  headerName: string;
}

interface BillingItem {
  id: string;
  billNumber: string;
  billType: string;
  status: "Paid" | "Pending" | "Failed";
  amount: number;
  date: string;
  time: string;
}

// Add these billing field definitions for modal
const billingFields: FieldDefinition[] = [
  {
    id: "billingAddress",
    label: "Billing Address",
    type: "text",
    placeholder: "Enter billing address",
    required: true,
  },
  {
    id: "billingName",
    label: "Billing Name",
    type: "text",
    placeholder: "Enter billing name",
    required: true,
  },
  {
    id: "taxInformation",
    label: "Tax Information",
    type: "text",
    placeholder: "e.g. GST",
    required: false,
  },
];

const BillingForm: React.FC = () => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [modalMode, setModalMode] = useState<
    "add" | "edit" | "view" | "delete"
  >("add");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddCardModalOpen, setIsAddCardModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<BillingItem | null>(null);
  const [showTransactionDetails, setShowTransactionDetails] = useState(false);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    fullName: "",
    address: "",
    street: "",
    zipCode: "",
  });
  const handleCardInputChange = (e: { target: { name: any; value: any } }) => {
    setCardDetails({
      ...cardDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleTransactionClick = (transaction: BillingItem) => {
    const selectedBilling = billingData.find(
      (item) => item.id === transaction.id
    );
    if (selectedBilling) {
      setSelectedTransaction(selectedBilling);
      setShowTransactionDetails(true);
    }
  };

  // const handleMenuClick = () => {
  //   setIsMenuModalOpen(!isMenuModalOpen);
  // };
  const handleMenuClick = () => {
    setOpenMenu(openMenu ? null : "card-menu");
  };
  const handleAddCard = () => {
    console.log("Card added:", cardDetails);
    setIsAddCardModalOpen(false);
    // Add logic to save card details
  };

  // Just for demo - this would normally show the main modal
  const handleOpenMainModal = () => {
    setIsModalOpen(true);
  };

  interface Tax {
    id: string;
    name: string;
    value: number;
    type: "Fixed" | "Percentage";
    applicableOn: "Marketplace" | "Product" | "Delivery" | "Store";
    enabled: boolean;
  }

  const [selectedBilling, setSelectedBilling] = useState<Tax | null>(null);

  const billingData: BillingItem[] = Array(10)
    .fill(null)
    .map((_, i) => {
      // Define an array of dates for each row
      const dates = [
        "January 26", // 1st row: Jan 2nd
        "February 26", // 2nd row: Feb 3rd
        "March 26", // 3rd row: March 4th
        "April 26", // 4th row: April 5th
        "May 26", // 5th row: May 6th
        "June 26", // 6th row: June 7th
        "July 26", // 7th row: July 8th
        "August 26", // 8th row: August 9th
        "September 26", // 9th row: September 10th
        "October 26", // 10th row: October 11th
      ];

      return {
        id: `row-${i}`,
        billNumber: "#327702783",
        billType: "Startup plan billing",
        status: i === 4 ? "Pending" : i === 5 ? "Failed" : "Paid",
        amount: 19.0,
        date: dates[i], // Assign the corresponding date from the array
        time: "06:30 PM",
      };
    });

  const columns: Column[] = [
    { field: "billNumber", headerName: "Billing Number" },

    { field: "billType", headerName: "Bill Type" },
    { field: "status", headerName: "Status" },
    { field: "amount", headerName: "Amount" },
    { field: "date", headerName: "Payment Date" },
  ];

  const openModal = (mode: "add" | "edit" | "view" | "delete") => {
    setModalMode(mode);
    setIsModalOpen(true);
  };

  const handleSaveBilling = (billingData: any) => {
    console.log("Billing data saved:", billingData);
    setIsModalOpen(false);
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.checked) {
      setSelectedRows(billingData.map((item) => item.id));
    } else {
      setSelectedRows([]);
    }
  };

  // Inside your BillingForm component, add this calculation:
  const calculateGrandTotal = (transaction: BillingItem) => {
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

  const handleSelectRow = (id: string): void => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  return (
    <div className="max-w-full rounded-custom12px p-6 md:p-0 sm:p-0 lg:p-0 xl:p-0 sm:max-h-full md:max-h-full lg:max-h-full xl:max-h-full max-h-[80vh] overflow-y-auto sm:overflow-visible md:overflow-visible lg:overflow-visible xl:overflow-visible mb-0">
      <div className="flex justify-between items-center mb-8 mt-0 sm:mt-6 md:mt-8 lg:mt-12 xl-mt-12">
        <h2 className="text-[14px] font-inter font-[600] text-headding-color">
          Billing
        </h2>
      </div>

      <div className="space-y-6">
        {/* Current Billing Cycle */}
        <div className="flex justify-between items-center bg-backgroundWhite rounded-custom12px p-6">
          <div>
            <h3 className="text-[12px] font-inter font-[500] text-paragraphBlack mb-2">
              Current billing cycle
            </h3>
            <p className="text-[12px] font-inter font-[500] text-headding-color ">
              Feb 1, 2025 - Mar 1, 2025
            </p>
          </div>

          <button
            className="px-4 py-2 text-cardValue border border-reloadBorder text-[12px] font-inter font-[600] bg-backgroundWhite rounded-custom"
            onClick={() => openModal("view")}
          >
            Billing Details
          </button>
        </div>

        {/* Credit Card Info */}
        <div className="flex items-center justify-between p-4 border border-gray-200 bg-backgroundWhite rounded-custom12px">
          <div className="flex items-center gap-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="56"
              height="34"
              viewBox="0 0 56 34"
              fill="none"
            >
              <rect
                x="0.5"
                y="0.5"
                width="55"
                height="33"
                rx="4.5"
                fill="white"
              />
              <rect
                x="0.5"
                y="0.5"
                width="55"
                height="33"
                rx="4.5"
                stroke="#DBDBDB"
              />
              <path
                d="M27.6697 11.7851L25.1509 22.6153H22.1053L24.6244 11.7851H27.6697ZM40.484 18.7782L42.0875 14.7111L43.0102 18.7782H40.484ZM43.8822 22.6153H46.6994L44.241 11.7851H41.6407C41.0564 11.7851 40.5634 12.0977 40.3439 12.5797L35.7744 22.6153H38.9729L39.6079 20.998H43.5155L43.8822 22.6153ZM35.9332 19.0792C35.9462 16.2207 31.6358 16.0634 31.6656 14.7865C31.6745 14.3975 32.0774 13.9847 32.9572 13.8788C33.3943 13.8264 34.5961 13.7863 35.9608 14.3639L36.4951 12.0672C35.7621 11.8225 34.819 11.587 33.6459 11.587C30.6356 11.587 28.5167 13.0592 28.4988 15.1673C28.4798 16.7263 30.0114 17.5963 31.1655 18.1146C32.352 18.6455 32.7508 18.9856 32.7455 19.4603C32.7377 20.1874 31.799 20.5075 30.9233 20.5202C29.3917 20.5425 28.5029 20.1401 27.7945 19.8364L27.2426 22.2094C27.954 22.51 29.2676 22.7712 30.6304 22.7846C33.8296 22.7846 35.9227 21.3305 35.9332 19.0792ZM23.3175 11.7851L18.3829 22.6153H15.1628L12.7346 13.9721C12.587 13.4397 12.4588 13.245 12.0105 13.0205C11.279 12.6554 10.0698 12.3123 9.00586 12.0998L9.07853 11.7851H14.261C14.9213 11.7851 15.5157 12.1896 15.6655 12.8892L16.9482 19.1566L20.1175 11.7851H23.3175Z"
                fill="#1434CB"
              />
            </svg>
            <div className="flex items-center gap-2 ">
              <span className="text-[14px] font-inter font-[500] text-paragraphBlack">
                Visa
              </span>
              <span className="text-[12px] font-inter font-[500] text-paragraphBlack">
                **** 1111
              </span>
              <span className="px-4 py-1 bg-primary text-[11px] font-inter font-[600] text-primary rounded-custom80px">
                Primary
              </span>
            </div>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
            >
              <path
                d="M9.50966 2.51006C10.0564 1.96332 10.9428 1.96332 11.4896 2.51006C12.0363 3.05679 12.0363 3.94322 11.4896 4.48996L10.9345 5.04498L8.95463 3.06508L9.50966 2.51006Z"
                fill="#333333"
              />
              <path
                d="M7.96468 4.05503L2.09961 9.92011V11.9H4.07951L9.94458 6.03493L7.96468 4.05503Z"
                fill="#333333"
              />
            </svg>
          </button>
        </div>

        {/* Past Bills */}
        <div className="bg-backgroundWhite border border-grey-border px-6 py-4 rounded-custom12px">
          <div>
            <h3 className="text-[12px] font-inter font-[500] text-paragraphBlack mb-4">
              Past bills
            </h3>

            <div className="overflow-x-auto">
              <CustomDataGrid
                columns={[
                  {
                    field: "billNumber",
                    headerName: "Billing Number",
                    renderCell: (value, row) => (
                      <div
                        className="text-billingNumber font-inter font-[600] cursor-pointer hover:underline"
                        onClick={() => handleTransactionClick(row)}
                      >
                        {value}
                      </div>
                    ),
                  },
                  { field: "billType", headerName: "Bill Type" },
                  { field: "status", headerName: "Status" },
                  { field: "amount", headerName: "Amount" },
                  { field: "date", headerName: "Payment Date" },
                ]}
                rows={billingData}
                pageSize={10}
                onSelectAll={handleSelectAll}
                onSelectRow={handleSelectRow}
                selectedRows={selectedRows}
                searchPlaceholder="Search Invoice"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Billing Details Modal */}
      <CustomModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
        title="Billing Details"
        fields={billingFields}
        onSave={handleSaveBilling}
        size="xl"
        confirmText="Save"
        customFooter={
          <div className="w-full flex flex-col gap-6">
            <div className="w-full">
              <h3 className="text-[14px] font-inter font-[500] text-paragraphBlack mb-2">
                Payment methods
              </h3>

              <div className="flex justify-between items-start mb-4">
                <p className="text-[12px] font-inter font-[500] text-headding-color">
                  For purchases and bills in Dhaam
                </p>
                <button
                  onClick={() => setIsAddCardModalOpen(true)}
                  className="px-4 py-2 text-[12px] border border-gray-300 text-xs font-inter font-[600] rounded-lg hover:bg-gray-50"
                >
                  Add new card
                </button>
              </div>

              <div className="border border-gray-200 rounded-lg p-4 mb-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="20"
                        viewBox="0 0 56 34"
                        fill="none"
                      >
                        <rect
                          x="0.5"
                          y="0.5"
                          width="31"
                          height="19"
                          rx="2"
                          fill="white"
                        />
                        <rect
                          x="0.5"
                          y="0.5"
                          width="31"
                          height="19"
                          rx="2"
                          stroke="#DBDBDB"
                        />
                        <path
                          d="M18.6697 6.7851L16.1509 17.6153H13.1053L15.6244 6.7851H18.6697ZM31.484 13.7782L33.0875 9.7111L34.0102 13.7782H31.484ZM34.8822 17.6153H37.6994L35.241 6.7851H32.6407C32.0564 6.7851 31.5634 7.0977 31.3439 7.5797L26.7744 17.6153H29.9729L30.6079 15.998H34.5155L34.8822 17.6153ZM26.9332 14.0792C26.9462 11.2207 22.6358 11.0634 22.6656 9.7865C22.6745 9.3975 23.0774 8.9847 23.9572 8.8788C24.3943 8.8264 25.5961 8.7863 26.9608 9.3639L27.4951 7.0672C26.7621 6.8225 25.819 6.587 24.6459 6.587C21.6356 6.587 19.5167 8.0592 19.4988 10.1673C19.4798 11.7263 21.0114 12.5963 22.1655 13.1146C23.352 13.6455 23.7508 13.9856 23.7455 14.4603C23.7377 15.1874 22.799 15.5075 21.9233 15.5202C20.3917 15.5425 19.5029 15.1401 18.7945 14.8364L18.2426 17.2094C18.954 17.51 20.2676 17.7712 21.6304 17.7846C24.8296 17.7846 26.9227 16.3305 26.9332 14.0792ZM14.3175 6.7851L9.3829 17.6153H6.1628L3.7346 8.9721C3.587 8.4397 3.4588 8.245 3.0105 8.0205C2.279 7.6554 1.0698 7.3123 0.00586 7.0998L0.07853 6.7851H5.261C5.9213 6.7851 6.5157 7.1896 6.6655 7.8892L7.9482 14.1566L11.1175 6.7851H14.3175Z"
                          fill="#1434CB"
                        />
                      </svg>
                      <div className="flex ml-2">
                        <span className="text-[14px] font-inter font-[500] text-paragraphBlack mr-2">
                          Visa
                        </span>
                        <span className="text-[12px] font-inter font-[500] text-paragraphBlack">
                          **** 1111
                        </span>
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-blue-100 text-[11px] font-inter font-[500] text-blue-600 rounded-full">
                      Primary
                    </span>
                  </div>
                  <div className="relative">
                    <button
                      className="text-gray-500 hover:text-gray-700"
                      onClick={() => handleMenuClick()}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
                          stroke="#636363"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z"
                          stroke="#636363"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z"
                          stroke="#636363"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    {openMenu === "card-menu" && (
                      <div className="absolute right-0 mt-1 w-36 bg-white rounded-md shadow-lg z-50 py-1 border border-gray-200">
                        <button
                          className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 text-[14px] font-inter font-[500]"
                          onClick={() => {
                            // Handle edit action
                            console.log("Edit clicked");
                            setOpenMenu(null);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 text-[14px] font-inter font-[500]"
                          onClick={() => {
                            // Handle delete action
                            console.log("Delete clicked");
                            setOpenMenu(null);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 font-[600] text-whiteColor bg-bgButton rounded-lg text-[14px] font-inter "
              >
                Save
              </button>
            </div>
          </div>
        }
      />

      
   
      {/* Add New Card Modal */}
      {isAddCardModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-4xl shadow-xl rounded-t-3xl">
            {" "}
            {/* Slightly wider */}
            <div className="px-6 py-4 flex justify-between bg-background-grey items-center border-b border-gray-200 rounded-t-3xl">
              <h2 className="text-[16px] font-inter font-[600] leading-[150%]">
                Add new card
              </h2>
              <button
                onClick={() => setIsAddCardModalOpen(false)}
                className="text-headding-color hover:text-gray-700 text-2xl font-extrabold"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <div className="mb-3">
                {" "}
                {/* Reduced spacing */}
                <div className="flex items-center border border-gray-300 rounded-lg p-3">
                  <div className="mr-2">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="2"
                        y="5"
                        width="20"
                        height="14"
                        rx="2"
                        stroke="#9CA3AF"
                        strokeWidth="2"
                      />
                      <path d="M2 10H22" stroke="#9CA3AF" strokeWidth="2" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="cardNumber"
                    value={cardDetails.cardNumber}
                    onChange={handleCardInputChange}
                    placeholder="Card Number"
                    className="flex-1 border-none focus:outline-none text-[14px] font-inter font-[400] leading-[150%]"
                  />
                </div>
              </div>

              <div className="flex mb-3 gap-4">
                {" "}
                {/* Reduced spacing */}
                <div className="flex-1">
                  <input
                    type="text"
                    name="expiry"
                    value={cardDetails.expiry}
                    onChange={handleCardInputChange}
                    placeholder="MM/YY"
                    className="w-full p-3 border border-gray-300 rounded-lg text-[14px] font-inter font-[400] leading-[150%]"
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    name="cvv"
                    value={cardDetails.cvv}
                    onChange={handleCardInputChange}
                    placeholder="CVV"
                    className="w-full p-3 border border-gray-300 rounded-lg text-[14px] font-inter font-[400] leading-[150%]"
                  />
                </div>
              </div>

              <div className="mb-3">
                {" "}
                {/* Reduced spacing */}
                <input
                  type="text"
                  name="fullName"
                  value={cardDetails.fullName}
                  onChange={handleCardInputChange}
                  placeholder="Full Name"
                  className="w-full p-3 border border-gray-300 rounded-lg text-[14px] font-inter font-[400] leading-[150%]"
                />
              </div>

              <div className="mb-3">
                {" "}
                {/* Reduced spacing */}
                <input
                  type="text"
                  name="address"
                  value={cardDetails.address}
                  onChange={handleCardInputChange}
                  placeholder="Address"
                  className="w-full p-3 border border-gray-300 rounded-lg text-[14px] font-inter font-[400] leading-[150%]"
                />
              </div>

              <div className="flex mb-3 gap-4">
                {" "}
                {/* Reduced spacing */}
                <div className="flex-1">
                  <input
                    type="text"
                    name="street"
                    value={cardDetails.street}
                    onChange={handleCardInputChange}
                    placeholder="Street"
                    className="w-full p-3 border border-gray-300 rounded-lg text-[14px] font-inter font-[400] leading-[150%]"
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    name="zipCode"
                    value={cardDetails.zipCode}
                    onChange={handleCardInputChange}
                    placeholder="Zip Code"
                    className="w-full p-3 border border-gray-300 rounded-lg text-[14px] font-inter font-[400] leading-[150%]"
                  />
                </div>
              </div>
            </div>
            <div className="p-4 flex justify-end">
              <button
                onClick={handleAddCard}
                className="px-6 py-2 bg-bgButton text-white rounded-lg text-[14px] font-inter font-[400] leading-[150%]"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {showTransactionDetails && selectedTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex justify-end">
          <div className="bg-white w-full sm:w-96 h-full overflow-y-auto mt-5 mr-2 rounded-custom12px">
            <div className="p-4 flex justify-between items-center border-b bg-background-grey">
              <div className="flex items-center gap-3">
                <h2 className="text-billingNumber font-inter font-[600] font-[16px] cursor-pointer hover:underline">
                  #{selectedTransaction.billNumber.replace("#", "")}
                </h2>
                <span
                  className={`px-3 py-1 text-[12px] font-inter font-[500] rounded-custom80px ${
                    selectedTransaction.status === "Paid"
                      ? "bg-green text-customWhiteColor"
                      : selectedTransaction.status === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {selectedTransaction.status}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M3 17C3 16.4477 3.44772 16 4 16H16C16.5523 16 17 16.4477 17 17C17 17.5523 16.5523 18 16 18H4C3.44772 18 3 17.5523 3 17ZM6.29289 9.29289C6.68342 8.90237 7.31658 8.90237 7.70711 9.29289L9 10.5858L9 3C9 2.44772 9.44771 2 10 2C10.5523 2 11 2.44771 11 3L11 10.5858L12.2929 9.29289C12.6834 8.90237 13.3166 8.90237 13.7071 9.29289C14.0976 9.68342 14.0976 10.3166 13.7071 10.7071L10.7071 13.7071C10.5196 13.8946 10.2652 14 10 14C9.73478 14 9.48043 13.8946 9.29289 13.7071L6.29289 10.7071C5.90237 10.3166 5.90237 9.68342 6.29289 9.29289Z"
                    fill="#212121"
                  />
                </svg>
              </div>
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
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.15225 5.15152C5.62088 4.68289 6.38068 4.68289 6.84931 5.15152L12.0008 10.303L17.1523 5.15152C17.6209 4.68289 18.3807 4.68289 18.8493 5.15152C19.3179 5.62015 19.3179 6.37995 18.8493 6.84858L13.6978 12L18.8493 17.1515C19.3179 17.6202 19.3179 18.3799 18.8493 18.8486C18.3807 19.3172 17.6209 19.3172 17.1523 18.8486L12.0008 13.6971L6.84931 18.8486C6.38068 19.3172 5.62088 19.3172 5.15225 18.8486C4.68362 18.3799 4.68362 17.6202 5.15225 17.1515L10.3037 12L5.15225 6.84858C4.68362 6.37995 4.68362 5.62015 5.15225 5.15152Z"
                    fill="#636363"
                  />
                </svg>
              </button>
            </div>

            <div className="p-4 mb-2">
              <div className="border-b border-gray-200 py-3">
                <p className="text-[12px] font-inter font-[500] text-paragraphBlack leading-[15.6px] mb-1">
                  Date
                </p>
                <p className="text-[12px] font-inter font-[500] text-paragraphBlack leading-[15.6px]">
                  {selectedTransaction.date}
                </p>
                <p className="text-[11px] font-inter font-[400] text-cardTitle leading-[14.3px]">
                  {selectedTransaction.time}
                </p>
              </div>

              <div className="border-b border-gray-200 py-3">
                <p className="text-[12px] font-inter font-[500] text-paragraphBlack leading-[15.6px] mb-1">
                  Bill Type
                </p>
                <p className="text-[14px] font-inter font-[400] text-verifyOtp leading-[15.6px]">
                  {selectedTransaction.billType}
                </p>
              </div>

              <div className="border-b border-gray-200 py-3">
                <p className="text-[12px] font-inter font-[500] text-paragraphBlack leading-[15.6px] mb-1">
                  Mode of Transfer
                </p>
                <p className="text-[14px] font-inter font-[400] text-verifyOtp leading-[15.6px]">
                  Card
                </p>
              </div>

              <div className="border-b border-gray-200 py-3">
                <p className="text-[12px] font-inter font-[500] text-paragraphBlack leading-[15.6px] mb-1">
                  Card Number
                </p>
                <p className="text-[14px] font-inter font-[400] text-verifyOtp leading-[15.6px]">
                  Visa **** 1111
                </p>
              </div>

              <div className="border-b border-gray-200 py-3">
                <p className="text-[12px] font-inter font-[500] text-paragraphBlack leading-[15.6px] mb-1">
                  Amount
                </p>
                <p className="text-[14px] font-inter font-[400] text-verifyOtp leading-[15.6px]">
                  ${selectedTransaction.amount.toFixed(2)}
                </p>
              </div>

              <div className="py-3">
                <p className="text-[12px] font-inter font-[500] text-paragraphBlack leading-[15.6px] mb-1">
                  Transaction Id
                </p>
                <p className="text-[14px] font-inter font-[400] text-verifyOtp leading-[15.6px] break-all">
                  ch_3R0nsWHTOIffEwwR1qNkYXAi
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BillingForm;
