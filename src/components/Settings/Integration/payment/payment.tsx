import React, { useState } from "react";
import CustomModal, { FieldDefinition } from "../../../common/modals";

// Arrow Right Icon component
const ArrowRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14"></path>
    <path d="m12 5 7 7-7 7"></path>
  </svg>
);

// Define the type for payment gateway items
interface PaymentGateway {
  id: string;
  name: string;
  apiKey: string;
  secretKey: string;
  isActive: boolean;
  environment: "sandbox" | "production";
  supportedCurrencies: string[];
  webhookUrl?: string;
  isDefault?: boolean;
}

// CloseIcon component
const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

// Eye Icon component
const EyeIcon = () => (
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
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

// Edit Icon component
const EditIcon = () => (
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
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
  </svg>
);

// Chevron Down Icon component
const ChevronDownIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const Payment: React.FC = () => {
  // State for managing the modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<PaymentGateway | undefined>(
    undefined
  );
  const [modalMode, setModalMode] = useState<"add" | "edit" | "view">("add");
  const [selectedGateway, setSelectedGateway] = useState<string>("");
  const [secretApiKey, setSecretApiKey] = useState<string>("");
  const [isDefault, setIsDefault] = useState<boolean>(false);

  // Sample payment gateway for demonstration
  const sampleGateway: PaymentGateway = {
    id: "stripe-1",
    name: "Stripe",
    apiKey: "pk_test_sample",
    secretKey: "sk_test_sample",
    isActive: true,
    environment: "sandbox",
    supportedCurrencies: ["USD", "EUR", "GBP"],
    webhookUrl: "https://example.com/webhook/stripe",
    isDefault: true,
  };

  // Define fields for the modal
  const fields: FieldDefinition[] = [
    {
      id: "name",
      label: "Gateway Name",
      type: "text",
      placeholder: "Enter gateway name",
      required: true,
    },
    {
      id: "apiKey",
      label: "API Key",
      type: "text",
      placeholder: "Enter API key",
      required: true,
      helperText: "This is the public key provided by your payment gateway",
    },
    {
      id: "secretKey",
      label: "Secret Key",
      type: "password",
      placeholder: "Enter secret key",
      required: true,
      helperText: "Keep this confidential and secure",
    },
    {
      id: "environment",
      label: "Environment",
      type: "select",
      options: [
        { value: "sandbox", label: "Sandbox / Test" },
        { value: "production", label: "Production" },
      ],
      required: true,
    },
    {
      id: "supportedCurrencies",
      label: "Supported Currencies",
      type: "text",
      placeholder: "USD, EUR, GBP",
      helperText: "Comma-separated list of supported currency codes",
    },
    {
      id: "webhookUrl",
      label: "Webhook URL",
      type: "text",
      placeholder: "https://your-site.com/webhook/gateway",
      helperText: "URL to receive payment notifications",
    },
  ];

  // Available payment gateways
  const availableGateways = [
    { value: "stripe", label: "Stripe" },
    { value: "paypal", label: "PayPal" },
    { value: "razorpay", label: "Razorpay" },
    { value: "custom", label: "Custom Gateway" },
  ];

  // Handler for opening the modal
  const handleOpenModal = (
    mode: "add" | "edit" | "view",
    item?: PaymentGateway
  ) => {
    setModalMode(mode);
    setCurrentItem(item);
    setIsModalOpen(true);
  };

  // Handler for opening the custom gateway modal
  const handleOpenCustomModal = () => {
    setIsCustomModalOpen(true);
  };

  // Handler for saving the form data
  const handleSave = (item: PaymentGateway) => {
    console.log("Saving payment gateway:", item);
    // Here you would implement the actual save logic
    // For example, API call to add or update the payment gateway
  };

  // Handler for saving custom gateway
  const handleSaveCustomGateway = () => {
    console.log("Saving custom gateway:", {
      gateway: selectedGateway,
      secretApiKey,
      isDefault,
    });
    setIsCustomModalOpen(false);
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-full rounded-custom12px p-1 md:p-0 sm:p-0 lg:p-0 xl:p-0 sm:max-h-full md:max-h-full lg:max-h-full xl:max-h-full max-h-[80vh] overflow-y-auto sm:overflow-visible md:overflow-visible lg:overflow-visible xl:overflow-visible">
        <div className="flex justify-between items-center p-0 mb-6 mt-0 sm:mt-6 md:mt-8 lg:mt-12">
          <h2 className="text-headding-color font-inter text-[14px] font-[600] leading-[21px]">
            Payment Gateway 
          </h2>
          <div className="flex space-x-4">
            <button
              className="px-4 py-2 text-[12px] font-inter font-[600] text-paragraphBlack"
              onClick={() => setIsCustomModalOpen(false)}
            >
              Discard
            </button>
            <button
              className="px-4 py-2 text-[12px] font-inter font-[600] text-whiteColor bg-bgButton rounded-custom border-[1px] border-reloadBorder "
              onClick={handleSaveCustomGateway}
            >
              Save
            </button>
          </div>
        </div>
        <div className="p-8 md:p-4 sm:p-4 lg:p-4 xl:p-4 rounded-custom12px shadow-sm bg-backgroundWhite">
          
          {/* Available Payment Gateway */}
          <div className="mb-8 bg-backgroundWhite">
            <h3 className="text-[14px] font-inter font-[500] text-paragraphBlack mb-2">
              Available Payment Gateway
            </h3>

            <div className="relative ">
              <select
                value={selectedGateway}
                onChange={(e) => setSelectedGateway(e.target.value)}
                className="w-full p-3 text-[12px] font-inter border border-menuSubHeadingColor rounded-custom8px font-[500px] text-menuSubHeadingColor pr-10 appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option
                  value=""
                  className="text-[14px] font-inter font-[400] "
                >
                  Select payment gateway
                </option>
                {availableGateways.map((gateway) => (
                  <option
                    key={gateway.value}
                    className="text-[12px] font-inter font-[500] text-paragraphBlack"
                    value={gateway.value}
                  >
                    {gateway.label}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
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
                    d="M10 3C10.2652 3 10.5196 3.10536 10.7071 3.29289L13.7071 6.29289C14.0976 6.68342 14.0976 7.31658 13.7071 7.70711C13.3166 8.09763 12.6834 8.09763 12.2929 7.70711L10 5.41421L7.70711 7.70711C7.31658 8.09763 6.68342 8.09763 6.29289 7.70711C5.90237 7.31658 5.90237 6.68342 6.29289 6.29289L9.29289 3.29289C9.48043 3.10536 9.73478 3 10 3ZM6.29289 12.2929C6.68342 11.9024 7.31658 11.9024 7.70711 12.2929L10 14.5858L12.2929 12.2929C12.6834 11.9024 13.3166 11.9024 13.7071 12.2929C14.0976 12.6834 14.0976 13.3166 13.7071 13.7071L10.7071 16.7071C10.3166 17.0976 9.68342 17.0976 9.29289 16.7071L6.29289 13.7071C5.90237 13.3166 5.90237 12.6834 6.29289 12.2929Z"
                    fill="#636363"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 my-6"></div>

          {/* Active Payment Gateway */}
          <div className="mb-8">
            <h3 className="text-[14px] font-inter font-[500] text-textHeading mb-4">
              Active Payment Gateway
            </h3>

            <div className="border border-gray-200 rounded-md p-4 flex justify-between items-center">
              <div className="flex items-center">
                <div className="text-indigo-600 text-[12px] font-inter font-[500px mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="56"
                    height="34"
                    viewBox="0 0 56 34"
                    fill="none"
                  >
                    <rect
                      x="0.91791"
                      y="0.91791"
                      width="54.1642"
                      height="32.1642"
                      rx="4.08209"
                      fill="white"
                    />
                    <rect
                      x="0.91791"
                      y="0.91791"
                      width="54.1642"
                      height="32.1642"
                      rx="4.08209"
                      stroke="#C2C2C2"
                      stroke-width="0.164179"
                    />
                    <path
                      d="M29.6172 10.9072L27.0109 11.5098V9.23311L29.6172 8.6416V10.9072Z"
                      fill="#635BFF"
                    />
                    <path
                      d="M19.0256 9.93609L16.492 10.5164L16.4816 19.4549C16.4816 21.1065 17.6342 22.3228 19.171 22.3228C20.0225 22.3228 20.6455 22.1554 20.9882 21.9546V19.6892C20.6559 19.8343 19.0153 20.3476 19.0153 18.6961V14.7346H20.9882V12.3576H19.0153L19.0256 9.93609Z"
                      fill="#635BFF"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M46.7607 17.2787C46.7607 14.422 45.4731 12.1678 43.0122 12.1678C40.5408 12.1678 39.0456 14.422 39.0456 17.2564C39.0456 20.6153 40.8108 22.3115 43.3444 22.3115C44.5801 22.3115 45.5146 22.0102 46.2207 21.5862V19.3543C45.5146 19.7338 44.7047 19.9681 43.6767 19.9681C42.6695 19.9681 41.7765 19.5887 41.6623 18.2719H46.7399C46.7399 18.2104 46.7436 18.0707 46.7479 17.9097L46.748 17.9093L46.748 17.909L46.748 17.9087C46.7538 17.6902 46.7607 17.4328 46.7607 17.2787ZM41.631 16.2187C41.631 14.9576 42.3475 14.4331 43.0017 14.4331C43.6351 14.4331 44.31 14.9576 44.31 16.2187H41.631Z"
                      fill="#635BFF"
                    />
                    <path
                      d="M12.8891 14.5896C12.3388 14.5896 12.0065 14.7569 12.0065 15.1922C12.0065 15.6673 12.5783 15.8764 13.2878 16.1357C14.4444 16.5584 15.9666 17.1149 15.9731 19.176C15.9731 21.1735 14.4882 22.3229 12.3284 22.3229C11.4354 22.3229 10.4593 22.1332 9.49362 21.6868V19.0309C10.3659 19.5442 11.4665 19.9237 12.3284 19.9237C12.9099 19.9237 13.3252 19.7563 13.3252 19.243C13.3252 18.7166 12.7053 18.476 11.9569 18.1856C10.8172 17.7432 9.37939 17.1852 9.37939 15.3261C9.37939 13.3509 10.7812 12.168 12.8891 12.168C13.751 12.168 14.6024 12.3131 15.4643 12.6813V15.3037C14.6751 14.8462 13.6783 14.5896 12.8891 14.5896Z"
                      fill="#635BFF"
                    />
                    <path
                      d="M24.2177 13.1834L24.0516 12.3576H21.8087V22.1219H24.4046V15.5045C25.0173 14.6452 26.0556 14.8014 26.3775 14.9242V12.3576C26.0453 12.2237 24.8304 11.9782 24.2177 13.1834Z"
                      fill="#635BFF"
                    />
                    <path
                      d="M27.0107 12.3577H29.617V22.122H27.0107V12.3577Z"
                      fill="#635BFF"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M33.0021 13.0382C33.3655 12.6811 34.0197 12.1678 35.0373 12.1678C36.8544 12.1678 38.5677 13.931 38.5781 17.1671C38.5781 20.7046 36.8856 22.3115 35.0269 22.3115C34.1131 22.3115 33.5628 21.8987 33.189 21.6085L33.1786 24.7666L30.5826 25.358V12.3464H32.8671L33.0021 13.0382ZM33.189 19.3325C33.4382 19.6227 33.8017 19.8571 34.4143 19.8571C35.3696 19.8571 36.0134 18.741 36.0134 17.2455C36.0134 15.7835 35.3592 14.6451 34.4143 14.6451C33.8224 14.6451 33.4486 14.8684 33.1786 15.192L33.189 19.3325Z"
                      fill="#635BFF"
                    />
                  </svg>
                </div>
                <div className="text-gray-800 font-inter font-[500] text-[#26203B] text-[14px]">Stripe</div>
                <span className="px-3 py-1 text-sm rounded-full bg-[#EAEDFB] text-primary ml-3 rounded-custom80px">
                  Primary
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none border-1 border border-reloadBorder rounded-customborder-1 border border-reloadBorder rounded-custom"
                  onClick={() => handleOpenModal("edit", sampleGateway)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <path
                      d="M12.1899 1.81044C11.6431 1.26371 10.7567 1.26371 10.21 1.81044L4.8999 7.12049V9.10039H6.8798L12.1899 3.79034C12.7366 3.24361 12.7366 2.35718 12.1899 1.81044Z"
                      fill="#212121"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M1.3999 4.20039C1.3999 3.42719 2.0267 2.80039 2.7999 2.80039H5.5999C5.9865 2.80039 6.2999 3.11379 6.2999 3.50039C6.2999 3.88699 5.9865 4.20039 5.5999 4.20039H2.7999V11.2004H9.7999V8.40039C9.7999 8.01379 10.1133 7.70039 10.4999 7.70039C10.8865 7.70039 11.1999 8.01379 11.1999 8.40039V11.2004C11.1999 11.9736 10.5731 12.6004 9.7999 12.6004H2.7999C2.0267 12.6004 1.3999 11.9736 1.3999 11.2004V4.20039Z"
                      fill="#212121"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          
        </div>
        <div className="bg-backgroundWhite p-6 mt-2 rounded-custom12px">
        {/* Add Custom Payment Gateway */}
        <div className="">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-[14px] font-inter font-[500] text-textHeading">
                  Add Custom Payment Gateway
                </h3>
                <p className="text-[12px] font-inter font-[500] text-cardTitle">
                  Integrate and configure a custom payment gateway for your
                  platform.
                </p>
              </div>
              <button
                className="p-2 text-gray-600 hover:text-gray-800 focus:outline-none border-1 border border-reloadBorder rounded-custom"
                onClick={handleOpenCustomModal}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="15"
                  viewBox="0 0 14 15"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M5.10493 10.795C4.83156 10.5216 4.83156 10.0784 5.10493 9.80503L7.40995 7.5L5.10493 5.19497C4.83156 4.92161 4.83156 4.47839 5.10493 4.20503C5.37829 3.93166 5.82151 3.93166 6.09488 4.20503L8.89488 7.00503C9.16824 7.27839 9.16824 7.72161 8.89488 7.99497L6.09488 10.795C5.82151 11.0683 5.37829 11.0683 5.10493 10.795Z"
                    fill="#212121"
                  />
                </svg>
              </button>
            </div>
          </div>
          </div>
          {/* Add/Edit/View Modal */}
          <CustomModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            mode={modalMode}
            fields={fields}
            item={currentItem}
            onSave={handleSave}
            title={`${modalMode === "add"
                ? "Add"
                : modalMode === "edit"
                  ? "Edit"
                  : "View"
              } Payment Gateway`}
            size="lg"
            showToggle={modalMode !== "add"}
            toggleLabel="Gateway Active"
          />

          {/* Custom Gateway Modal */}
          {isCustomModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white rounded-custom18px w-full max-w-lg sm:max-w-xl lg:max-w-[600px]">
                <div className=" bg-background-grey flex justify-between items-center p-4 rounded-t-custom18px">
                  <h3 className="text-[16px] font-inter font-[600] text-[#000000]">
                    Add Payment Gateway
                  </h3>
                  <button
                    onClick={() => setIsCustomModalOpen(false)}
                    className="text-gray-500 hover:text-gray-700 focus:outline-none"
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
                        d="M5.15152 5.15128C5.62015 4.68265 6.37995 4.68265 6.84858 5.15128L12 10.3027L17.1515 5.15128C17.6202 4.68265 18.3799 4.68265 18.8486 5.15128C19.3172 5.61991 19.3172 6.3797 18.8486 6.84833L13.6971 11.9998L18.8486 17.1513C19.3172 17.6199 19.3172 18.3797 18.8486 18.8483C18.3799 19.317 17.6202 19.317 17.1515 18.8483L12 13.6969L6.84858 18.8483C6.37995 19.317 5.62015 19.317 5.15152 18.8483C4.68289 18.3797 4.68289 17.6199 5.15152 17.1513L10.303 11.9998L5.15152 6.84833C4.68289 6.3797 4.68289 5.61991 5.15152 5.15128Z"
                        fill="#636363"
                      />
                    </svg>
                  </button>
                </div>

                <div className="p-4">
                  {/* Available Payment Gateway */}
                  <div className="mb-4">
                    <label className="block text-gray-700 text-[14px] font-inter font-[500] text-textHeading mb-1">
                      Available Payment Gateway
                    </label>
                    <div className="relative">
                      <select
                        value={selectedGateway}
                        onChange={(e) => setSelectedGateway(e.target.value)}
                        className="block w-full rounded-custom8px cursor-pointer border border-menuSubHeadingColor py-2 pl-3 pr-10 text-[12px] font-inter font-[500] text-menuSubHeadingColor border border-menuSubHeadingColor focus:border-blue-500 focus:outline-none focus:ring-blue-500 appearance-none"
                      >
                        <option value="" className="text-[12px] font-inter font-[500] text-paragraphBlack">Select payment gateway</option>
                        {availableGateways.map((gateway) => (
                          <option key={gateway.value} className="text-[12px] font-inter font-[500px] text-paragraphBlack" value={gateway.value}>
                            {gateway.label}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
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
                            d="M10 3C10.2652 3 10.5196 3.10536 10.7071 3.29289L13.7071 6.29289C14.0976 6.68342 14.0976 7.31658 13.7071 7.70711C13.3166 8.09763 12.6834 8.09763 12.2929 7.70711L10 5.41421L7.70711 7.70711C7.31658 8.09763 6.68342 8.09763 6.29289 7.70711C5.90237 7.31658 5.90237 6.68342 6.29289 6.29289L9.29289 3.29289C9.48043 3.10536 9.73478 3 10 3ZM6.29289 12.2929C6.68342 11.9024 7.31658 11.9024 7.70711 12.2929L10 14.5858L12.2929 12.2929C12.6834 11.9024 13.3166 11.9024 13.7071 12.2929C14.0976 12.6834 14.0976 13.3166 13.7071 13.7071L10.7071 16.7071C10.3166 17.0976 9.68342 17.0976 9.29289 16.7071L6.29289 13.7071C5.90237 13.3166 5.90237 12.6834 6.29289 12.2929Z"
                            fill="#636363"
                          />
                        </svg>
                      </div>

                    </div>
                  </div>

                  {/* Secret API Key */}
                  <div className="mb-4">
                    <label className="block text-[12px] font-inter font-[500] text-paragraphBlack mb-1">
                      Secret API
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        value={secretApiKey}
                        onChange={(e) => setSecretApiKey(e.target.value)}
                        className="block w-full rounded-md border border-reloadBorder py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                        placeholder="Enter here"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-500"
                      >
                        <EyeIcon />
                      </button>
                    </div>
                  </div>

                  {/* Set as default */}
                  <div className="mb-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="default-gateway"
                        checked={isDefault}
                        onChange={(e) => setIsDefault(e.target.checked)}
                        className="h-4 w-4 rounded border-cardValue text-blue-600 focus:ring-blue-500"
                      />
                      <label
                        htmlFor="default-gateway"
                        className="ml-2 block text-[14px] font-inter font-[500] text-textHeading"
                      >
                        Set as default
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 justify-end p-4 border-t">
                  <button
                    onClick={() => setIsCustomModalOpen(false)}
                    className="px-4  py-2  text-[12px] font-inter font-[600] text-cardValue hover:bg-gray-50 focus:outline-none"
                  >
                    Learn More
                  </button>
                  <button
                    onClick={handleSaveCustomGateway}
                    className="px-4 py-2 text-[12px] font-inter font-[600] bg-bgButton text-whiteColor rounded-md  focus:outline-none"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default Payment;
