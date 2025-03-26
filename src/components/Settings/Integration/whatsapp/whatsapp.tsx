import React, { useState } from "react";
import CustomModal, { FieldDefinition } from "../../../common/modals";

interface WhatsAppProps {
  onLearnMore?: () => void;
}

const WhatsApp: React.FC<WhatsAppProps> = ({ onLearnMore }) => {
  const [phoneNumber, setPhoneNumber] = useState("+91 8102308108");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"edit" | "add">("edit");

  // Current item for the modal
  const [currentItem, setCurrentItem] = useState({
    id: "whatsapp-number",
    name: phoneNumber,
    isActive: true
  });

  // Fields for the modal
  const whatsappFields: FieldDefinition[] = [
    {
      id: "name",
      label: "Phone Number",
      type: "text",
      placeholder: "Enter phone number (e.g. +91 8102308108)",
      required: true,
    }
  ];

  const handleChange = () => {
    setModalMode("edit");
    setCurrentItem({
      id: "whatsapp-number",
      name: phoneNumber,
      isActive: true
    });
    setIsModalOpen(true);
  };

  const handleSave = (data: any) => {
    if (data && data.name) {
      setPhoneNumber(data.name);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-full rounded-custom12px p-6 md:p-0 sm:p-0 lg:p-0 xl:p-0 sm:max-h-full md:max-h-full lg:max-h-full xl:max-h-full max-h-[80vh] overflow-y-auto sm:overflow-visible md:overflow-visible lg:overflow-visible xl:overflow-visible">
      <div className="p-4 rounded-md">
        <div className="flex justify-between items-center">
          <h1 className="text-[14px] font-inter font-[500] text-hverifyOtp">WhatsApp</h1>
          <button
            onClick={onLearnMore}
            className="text-[12px] font-inter font-[600] text-cardValue"
          >
            Learn More
          </button>
        </div>

        <div className="mt-4 flex items-center bg-backgroundWhite p-6 rounded-custom12px justify-between">
          <div className="flex items-center">
            <div className="bg-green-500 w-12 h-12 rounded-md flex items-center justify-center mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
              >
                <g clipPath="url(#clip0_5600_57546)">
                  <path
                    d="M32 23.8795C32 24.0548 31.9945 24.4329 31.9836 24.7288C31.9562 25.4466 31.9014 26.3726 31.8137 26.7945C31.6822 27.4301 31.4904 28.0274 31.2329 28.526C30.9315 29.1178 30.5479 29.6438 30.0877 30.0986C29.6329 30.5534 29.1068 30.937 28.5151 31.2384C28.0164 31.4959 27.4137 31.6877 26.7726 31.8192C26.3562 31.9014 25.4356 31.9616 24.7233 31.9836C24.4274 31.9945 24.0493 32 23.874 32H8.11507C7.93973 32 7.56164 31.9945 7.26575 31.9836C6.54795 31.9562 5.62192 31.9014 5.2 31.8137C4.56438 31.6822 3.96712 31.4904 3.46849 31.2329C2.87671 30.9315 2.35068 30.5479 1.89589 30.0877C1.4411 29.6329 1.05753 29.1068 0.756164 28.5151C0.49863 28.0164 0.306849 27.4137 0.175342 26.7726C0.0931507 26.3562 0.0328767 25.4356 0.0109589 24.7233C0.00547945 24.4329 0 24.0548 0 23.8795V8.12055C0 7.94521 0.00547945 7.56712 0.0164384 7.27123C0.0438356 6.55342 0.0986301 5.6274 0.186301 5.20548C0.317808 4.56986 0.509589 3.9726 0.767123 3.47397C1.06849 2.88219 1.45205 2.35616 1.90685 1.90137C2.36164 1.44658 2.88767 1.06301 3.47945 0.761644C3.97808 0.50411 4.58082 0.312329 5.22192 0.180822C5.63836 0.0986301 6.5589 0.0383562 7.27123 0.0164384C7.56712 0.00547945 7.94521 0 8.12055 0H23.8795C24.0548 0 24.4329 0.00547945 24.7288 0.0164384C25.4466 0.0438356 26.3726 0.0986301 26.7945 0.186301C27.4301 0.317808 28.0274 0.509589 28.526 0.767123C29.1178 1.06849 29.6438 1.45205 30.0986 1.91233C30.5534 2.36712 30.937 2.89315 31.2384 3.48493C31.4959 3.98356 31.6877 4.5863 31.8192 5.2274C31.9014 5.64384 31.9616 6.56438 31.9836 7.27671C31.9945 7.5726 32 7.95069 32 8.12603V23.8795Z"
                    fill="url(#paint0_linear_5600_57546)"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M24.4164 7.65985C22.2629 5.50642 19.3972 4.31738 16.3451 4.31738C10.0547 4.31738 4.94238 9.43519 4.9369 15.7201C4.9369 17.7311 5.46293 19.6927 6.46019 21.4188L4.84375 27.3311L10.8931 25.7475C12.5588 26.6571 14.4328 27.1338 16.3451 27.1338H16.3506C22.6355 27.1338 27.7533 22.016 27.7588 15.7311C27.7588 12.679 26.5698 9.81327 24.4164 7.65985ZM16.3506 25.2051C14.6465 25.2051 12.9753 24.7448 11.5232 23.8845L11.178 23.6818L7.58896 24.6242L8.54786 21.1283L8.3232 20.7722C7.37526 19.2653 6.87115 17.5174 6.87115 15.7256C6.87115 10.4982 11.1287 6.24615 16.3561 6.24615C18.8876 6.24615 21.2711 7.23245 23.0574 9.02423C24.8492 10.816 25.8355 13.1996 25.83 15.7311C25.8246 20.953 21.5725 25.2051 16.3506 25.2051ZM21.5506 18.1092C21.2657 17.9667 19.8629 17.2763 19.6054 17.1831C19.3424 17.09 19.1561 17.0407 18.9643 17.3256C18.7725 17.6105 18.2301 18.2516 18.0602 18.4434C17.8958 18.6352 17.7259 18.6571 17.441 18.5146C17.1561 18.3722 16.2355 18.0708 15.1506 17.1009C14.3013 16.3448 13.7314 15.4133 13.567 15.1283C13.4027 14.8434 13.5506 14.69 13.6931 14.5475C13.8191 14.4215 13.978 14.2133 14.1205 14.0489C14.2629 13.8845 14.3122 13.764 14.4054 13.5722C14.4985 13.3804 14.4547 13.216 14.3835 13.0735C14.3122 12.9311 13.7424 11.5283 13.5068 10.9585C13.2766 10.4051 13.041 10.4763 12.8657 10.4708C12.7013 10.4598 12.5095 10.4598 12.3177 10.4598C12.1259 10.4598 11.8191 10.5311 11.5561 10.816C11.2931 11.1009 10.5588 11.7914 10.5588 13.1941C10.5588 14.5968 11.578 15.9503 11.7205 16.142C11.8629 16.3338 13.7314 19.2105 16.5917 20.4434C17.2711 20.7393 17.8027 20.9146 18.2191 21.0461C18.904 21.2653 19.5232 21.2325 20.0164 21.1612C20.5643 21.079 21.704 20.4708 21.9396 19.8078C22.1753 19.1448 22.1753 18.5694 22.104 18.4544C22.0218 18.3229 21.8355 18.2516 21.5506 18.1092Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <linearGradient
                    id="paint0_linear_5600_57546"
                    x1="16.0012"
                    y1="32.0024"
                    x2="16.0012"
                    y2="0"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#25CF43" />
                    <stop offset="1" stopColor="#61FD7D" />
                  </linearGradient>
                  <clipPath id="clip0_5600_57546">
                    <rect width="32" height="32" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <span className="text-[14px] font-inter font-[600] text-paragraphBlack">{phoneNumber}</span>
          </div>
          <button
            onClick={handleChange}
            className="px-4 py-2 border border-reloadBorder rounded-custom bg-white text-[12px] font-inter font-[600] text-cardValue"
          >
            Change
          </button>
        </div>
      </div>

      {/* Using CustomModal for changing phone number */}
      {isModalOpen && currentItem && (
        <CustomModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          mode={modalMode}
          fields={whatsappFields}
          item={currentItem}
          onSave={handleSave}
          title="Change WhatsApp Number"
          showToggle={false}
          toggleLabel="Active"
          confirmText="Save"
          size="md"
        />
      )}
    </div>
  );
};

export default WhatsApp;