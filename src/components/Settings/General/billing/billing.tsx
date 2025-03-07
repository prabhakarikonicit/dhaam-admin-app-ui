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
  }
];

const BillingForm: React.FC = () => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [modalMode, setModalMode] = useState<
    "add" | "edit" | "view" | "delete"
  >("add");
  const [selectedBilling, setSelectedBilling] = useState<Tax | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  interface Tax {
    id: string;
    name: string;
    value: number;
    type: "Fixed" | "Percentage";
    applicableOn: "Marketplace" | "Product" | "Delivery" | "Store";
    enabled: boolean;
  }
  
  const billingData: BillingItem[] = Array(10)
    .fill(null)
    .map((_, i) => ({
      id: `row-${i}`,
      billNumber: "#327702783",
      billType: "Startup plan billing",
      status: i === 4 ? "Pending" : i === 5 ? "Failed" : "Paid",
      amount: 19.0,
      date: "January 26",
      time: "06:30 PM",
    }));

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

  const handleSelectRow = (id: string): void => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  return (
    <div className="max-w-4xl rounded-lg p-6 sm:max-h-full md:max-h-full lg:max-h-full xl:max-h-full max-h-[80vh] overflow-y-auto sm:overflow-visible md:overflow-visible lg:overflow-visible xl:overflow-visible">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-[14px] font-inter font-[600] text-headding-color">
          Billing
        </h2>
      </div>

      <div className="space-y-6">
        {/* Current Billing Cycle */}
        <div className="flex justify-between items-center bg-backgroundWhite rounded-custom12px p-6">
          <div>
            <h3 className="text-[14px] font-inter font-[500] text-paragraphBlack mb-2">
              Current billing cycle
            </h3>
            <p className="text-[12px] font-inter font-[500] text-headding-color ">
              Feb 1, 2025 - Mar 1, 2025
            </p>
          </div>

          <button
            className="px-4 py-2 text-gray-700 border border-reloadBorder text-[12px] font-inter font-medium bg-backgroundWhite rounded-lg hover:bg-gray-50"
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
              <span className="text-[14px] font-inter font-[500] text-paragraphBlack font-medium">
                Visa
              </span>
              <span className="text-[12px] font-inter font-[500] text-paragraphBlack">
                **** 1111
              </span>
              <span className="px-2 py-1 bg-primary text-[11px] font-inter font-[500] text-primary rounded-custom80px">
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
        <div>
          <h3 className="text-[14px] font-inter font-[500] text-paragraphBlack mb-4 ">
            Past bills
          </h3>

          <div className="border border-gray-200 rounded-lg overflow-x-auto ">

            <CustomDataGrid
              columns={[
                { field: "billNumber", headerName: "Billing Number" },
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
        <h3 className="text-[14px] font-inter font-[500] text-paragraphBlack mb-2">Payment methods</h3>
        
        <div className="flex justify-between items-start mb-4">
          <p className="text-[12px] font-inter font-[500] text-headding-color">
            For purchases and bills in Dhaam
          </p>
          <button className="px-4 py-2 mt-[-20px] border border-gray-300 text-[12px] font-inter font-medium rounded-lg hover:bg-gray-50">
            Add new card
          </button>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-4 mb-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="20" viewBox="0 0 56 34" fill="none">
                  <rect x="0.5" y="0.5" width="31" height="19" rx="2" fill="white"/>
                  <rect x="0.5" y="0.5" width="31" height="19" rx="2" stroke="#DBDBDB"/>
                  <path d="M18.6697 6.7851L16.1509 17.6153H13.1053L15.6244 6.7851H18.6697ZM31.484 13.7782L33.0875 9.7111L34.0102 13.7782H31.484ZM34.8822 17.6153H37.6994L35.241 6.7851H32.6407C32.0564 6.7851 31.5634 7.0977 31.3439 7.5797L26.7744 17.6153H29.9729L30.6079 15.998H34.5155L34.8822 17.6153ZM26.9332 14.0792C26.9462 11.2207 22.6358 11.0634 22.6656 9.7865C22.6745 9.3975 23.0774 8.9847 23.9572 8.8788C24.3943 8.8264 25.5961 8.7863 26.9608 9.3639L27.4951 7.0672C26.7621 6.8225 25.819 6.587 24.6459 6.587C21.6356 6.587 19.5167 8.0592 19.4988 10.1673C19.4798 11.7263 21.0114 12.5963 22.1655 13.1146C23.352 13.6455 23.7508 13.9856 23.7455 14.4603C23.7377 15.1874 22.799 15.5075 21.9233 15.5202C20.3917 15.5425 19.5029 15.1401 18.7945 14.8364L18.2426 17.2094C18.954 17.51 20.2676 17.7712 21.6304 17.7846C24.8296 17.7846 26.9227 16.3305 26.9332 14.0792ZM14.3175 6.7851L9.3829 17.6153H6.1628L3.7346 8.9721C3.587 8.4397 3.4588 8.245 3.0105 8.0205C2.279 7.6554 1.0698 7.3123 0.00586 7.0998L0.07853 6.7851H5.261C5.9213 6.7851 6.5157 7.1896 6.6655 7.8892L7.9482 14.1566L11.1175 6.7851H14.3175Z" fill="#1434CB"/>
                </svg>
                <div className="flex ml-2">
                  <span className="text-[14px] font-inter font-[500] text-paragraphBlack mr-2">Visa</span>
                  <span className="text-[12px] font-inter font-[500] text-paragraphBlack">**** 1111</span>
                </div>
              </div>
              <span className="px-2 py-1 bg-blue-100 text-[11px] font-inter font-[500] text-blue-600 rounded-full">
                Primary
              </span>
            </div>
            <button className="text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="#636363" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z" stroke="#636363" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z" stroke="#636363" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        <button 
          type="submit"
          className="px-6 py-2 bg-purple-600 text-white rounded-lg text-[14px] font-inter font-[500]"
        >
          Save
        </button>
      </div>
    </div>
  }
/>
    </div>
  );
};

export default BillingForm;