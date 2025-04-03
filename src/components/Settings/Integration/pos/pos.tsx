import React, { useState } from "react";
import CustomModal, { FieldDefinition } from "../../../common/modals";
import { CustomCards, CardItem, DynamicField } from "../../../common/customcards";

// POS Component
const POS: React.FC = () => {
  // State for dynamic fields values
  const [dynamicFieldsValues, setDynamicFieldsValues] = useState({
    selectedPOS: "",
    apiVersion: "v1",
    environment: "production"
  });

  // Dynamic fields definition
  const dynamicFields: DynamicField[] = [
    {
      id: "selectedPOS",
      type: "select",
      label: "",
      placeholder: "Select POS",
      options: [
        { value: "", label: "Select POS" },
        { value: "square", label: "Square" },
        { value: "clover", label: "Clover" },
        { value: "toast", label: "Toast" }
      ],
      required: true
    },

  ];

  // State for POS items
  const [posItems, setPosItems] = useState<CardItem[]>([
    {
      id: "1",
      name: "Deliverect",
      isConnected: false,
      isActive: false,
      logoType: "deliverect"
    },
    {
      id: "2",
      name: "MealMe",
      isConnected: true,
      isActive: true,
      logoType: "mealme"
    },
  ]);

  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<CardItem | null>(null);
  const [modalMode, setModalMode] = useState<
    "add" | "edit" | "view" | "delete" | "confirm"
  >("view");

  // Field definitions for the modal
  const posFields: FieldDefinition[] = [
    {
      id: "acccountId",
      label: "Account Id",
      placeholder: "Enter account id",
      type: "text",
      
      required: true,
    },
    {
      id: "LocationId",
      label: "Location Id",
      type: "text",
      placeholder: "Enter location id",
      required: true,
    },
    {
      id: "apiEndpoint",
      label: "Secret API",
      type: "text",
      placeholder: "Enter here",
      required: true,
    },
  ];

  // Handle dynamic field changes
  const handleDynamicFieldChange = (fieldId: string, value: any) => {
    setDynamicFieldsValues(prev => ({
      ...prev,
      [fieldId]: value
    }));
  };

  // Toggle connection state for a POS
  const handleToggleConnection = (id: string) => {
    setPosItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, isConnected: !item.isConnected } : item
      )
    );
  };

  // Open edit modal for a POS
  const handleEditClick = (item: CardItem) => {
    setCurrentItem(item);
    setModalMode("edit");
    setIsModalOpen(true);
  };

  // Handle save from modal
  const handleSave = (item: CardItem) => {
    if (modalMode === "edit") {
      setPosItems((items) =>
        items.map((posItem) => (posItem.id === item.id ? item : posItem))
      );
    } else if (modalMode === "add") {
      setPosItems((items) => [...items, item]);
    }
    setIsModalOpen(false);
  };

  // Logo component for each POS provider
  const renderLogo = (logoType: string) => {
    if (logoType === "deliverect") {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="15" viewBox="0 0 48 15" fill="none">
          <path d="M5.41353 10.6334C6.18016 10.6334 6.8016 10.0235 6.8016 9.27116C6.8016 8.51884 6.18016 7.909 5.41353 7.909C4.6469 7.909 4.02543 8.51884 4.02543 9.27116C4.02543 10.0235 4.6469 10.6334 5.41353 10.6334ZM5.41353 7.09169C6.18016 7.09169 6.8016 6.48181 6.8016 5.72949C6.8016 4.97717 6.18016 4.3673 5.41353 4.3673C4.6469 4.3673 4.02543 4.97717 4.02543 5.72949C4.02543 6.48181 4.6469 7.09169 5.41353 7.09169ZM9.02256 10.6334C9.78918 10.6334 10.4107 10.0235 10.4107 9.27116C10.4107 8.51884 9.78918 7.909 9.02256 7.909C8.25593 7.909 7.63445 8.51884 7.63445 9.27116C7.63445 10.0235 8.25593 10.6334 9.02256 10.6334ZM9.02256 7.09169C9.78918 7.09169 10.4107 6.48181 10.4107 5.72949C10.4107 4.97717 9.78918 4.3673 9.02256 4.3673C8.25593 4.3673 7.63445 4.97717 7.63445 5.72949C7.63445 6.48181 8.25593 7.09169 9.02256 7.09169ZM7.21805 0.416992C11.1278 0.416992 14.4361 3.66353 14.4361 7.50033C14.4361 11.3371 11.1278 14.5837 7.21805 14.5837C3.30828 14.5837 0 11.3371 0 7.50033C0 3.66357 3.30829 0.416992 7.21805 0.416992ZM7.21805 2.32404C4.31321 2.32404 1.94332 4.56917 1.94332 7.40523C1.94332 10.2413 4.31321 12.6766 7.21805 12.6766C10.1229 12.6766 12.4928 10.2413 12.4928 7.40523C12.4928 4.56917 10.1229 2.32404 7.21805 2.32404ZM22.6231 11.7231H24.8912C24.9728 11.7231 25.0078 11.6888 25.0311 11.6087L25.7822 8.88745L26.5109 11.6087C26.5342 11.6888 26.5692 11.7231 26.6508 11.7231H28.9179C29.0112 11.7231 29.0695 11.6888 29.0928 11.6087L30.6771 5.83847V11.5858C30.6771 11.6659 30.7354 11.7231 30.817 11.7231H33.3122C33.3938 11.7231 33.4521 11.6659 33.4521 11.5858V5.59438C33.4521 5.51427 33.3938 5.45707 33.3122 5.45707L28.4502 5.45753C28.3686 5.45753 28.3219 5.49188 28.2986 5.5834L27.7479 8.35302L27.1933 5.5834C27.1817 5.50332 27.1234 5.45753 27.0418 5.45753H24.5739C24.4922 5.45753 24.4339 5.50332 24.4223 5.5834L23.8823 8.35302L23.344 5.5834C23.3207 5.49188 23.274 5.45753 23.1924 5.45753L19.5081 5.45707V3.416C19.5081 3.31301 19.4359 3.26725 19.3193 3.30157L17.0029 4.03481C16.9213 4.05768 16.8747 4.12636 16.8747 4.20643L16.872 5.16832C16.872 5.40862 16.7437 5.51157 16.4988 5.51157H15.9C15.8184 5.51157 15.7601 5.56877 15.7601 5.64888V7.36358C15.7601 7.44369 15.8184 7.50089 15.9 7.50089H16.7959V9.58336C16.7959 11.0594 17.3877 11.8936 19.195 11.8936C19.8946 11.8936 20.4665 11.8054 20.7697 11.6681C20.8629 11.6223 20.8962 11.5651 20.8962 11.4736V9.85245C20.8962 9.7609 20.8046 9.71514 20.688 9.77234C20.5365 9.84101 20.361 9.85245 20.1861 9.85245C19.7197 9.85245 19.5709 9.68082 19.5709 9.1087V7.50089H20.6573C20.739 7.50089 20.7933 7.44784 20.7933 7.36776V5.83847L22.4482 11.6087C22.4715 11.6888 22.5298 11.7231 22.6231 11.7231ZM30.6771 4.77512C30.6771 4.85523 30.7354 4.91247 30.817 4.91247H33.3122C33.3938 4.91247 33.4521 4.85523 33.4521 4.77512V3.416C33.4521 3.33589 33.3938 3.27869 33.3122 3.27869H30.817C30.7354 3.27869 30.6771 3.33589 30.6771 3.416V4.77512ZM34.0078 11.5858C34.0078 11.6659 34.0661 11.7231 34.1477 11.7231H36.6457C36.7272 11.7231 36.7853 11.6659 36.7853 11.5858V3.416C36.7853 3.33589 36.7272 3.27869 36.6457 3.27869H34.1477C34.0661 3.27869 34.0078 3.33589 34.0078 3.416V11.5858ZM37.3408 11.5858C37.3408 11.6659 37.3992 11.7231 37.4808 11.7231H39.9717C40.0537 11.7231 40.1118 11.6659 40.1118 11.5858L40.1103 5.59438C40.1103 5.51427 40.0522 5.45707 39.9706 5.45707H37.4793C37.3978 5.45707 37.3397 5.51427 37.3397 5.59438L37.3408 11.5858ZM37.3397 4.77512C37.3397 4.85523 37.3978 4.91247 37.4793 4.91247H39.9717C40.0537 4.91247 40.1118 4.85523 40.1118 4.77512L40.1103 3.416C40.1103 3.33589 40.0522 3.27869 39.9706 3.27869H37.4793C37.3978 3.27869 37.3397 3.33589 37.3397 3.416V4.77512ZM40.5481 8.6451C40.5481 10.5102 42.0072 11.9138 44.1412 11.9138C46.2749 11.9138 47.7214 10.5102 47.7214 8.6451V8.49635C47.7214 6.63127 46.2749 5.26635 44.1412 5.26635C42.0072 5.26635 40.5481 6.63127 40.5481 8.49635V8.6451ZM43.2249 8.65002V8.53828C43.2249 7.68014 43.628 7.34449 44.1412 7.34449C44.6541 7.34449 45.0594 7.68014 45.0594 8.53828V8.65002C45.0594 9.49676 44.6541 9.85089 44.1412 9.85089C43.628 9.85089 43.2249 9.49676 43.2249 8.65002Z" fill="#F22F46"/>
        </svg>
      );
    } else if (logoType === "mealme") {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="48"
          height="9"
          viewBox="0 0 48 9"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.67312 7.09359C10.3443 7.09359 10.8478 6.79047 11.1162 6.39754L12.1119 6.98132C11.5973 7.74474 10.7583 8.20503 9.66193 8.20503C7.81606 8.20503 6.61905 6.93642 6.61905 5.25242C6.61905 3.56842 7.81606 2.2998 9.57243 2.2998C11.3288 2.2998 12.3804 3.647 12.3804 5.26364C12.3804 5.43204 12.358 5.61167 12.3356 5.76884H7.88319C8.07337 6.64452 8.77815 7.09359 9.67312 7.09359ZM11.161 4.7809C10.9932 3.8154 10.2884 3.40002 9.56125 3.40002C8.65509 3.40002 8.03981 3.9389 7.872 4.7809H11.161Z"
            fill="#05CA79"
          />
          <path
            d="M13.1635 0.0733986H14.3717V8.0593H13.1635V0.0733986ZM15.2256 0.829327C15.2256 0.402714 15.5724 0.0546875 15.9975 0.0546875C16.4226 0.0546875 16.7694 0.402714 16.7694 0.829327C16.7694 1.25594 16.4226 1.60397 15.9975 1.60397C15.5724 1.60397 15.2256 1.24471 15.2256 0.829327ZM15.3934 2.44597H16.6016V8.0593H15.3934V2.44597ZM23.0155 2.44597L20.834 8.0593H19.4357L17.2542 2.44597H18.5743L20.1405 6.7121L21.6955 2.44597H23.0155Z"
            fill="#05CA79"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M26.0584 7.09359C26.7297 7.09359 27.2331 6.79047 27.5016 6.39754L28.4972 6.98132C27.9826 7.74474 27.1436 8.20503 26.0472 8.20503C24.2014 8.20503 23.0044 6.93642 23.0044 5.25242C23.0044 3.56842 24.2014 2.2998 25.9577 2.2998C27.7141 2.2998 28.7657 3.647 28.7657 5.26364C28.7657 5.43204 28.7433 5.61167 28.721 5.76884H24.2685C24.4587 6.64452 25.1635 7.09359 26.0584 7.09359ZM27.5463 4.7809C27.3785 3.8154 26.6737 3.40002 25.9466 3.40002C25.0404 3.40002 24.4251 3.9389 24.2573 4.7809H27.5463Z"
            fill="#05CA79"
          />
          <path
            d="M32.3344 2.34473V3.65825C31.5401 3.60211 30.6116 3.97259 30.6116 5.22998V8.0591H29.4034V2.44577H30.6116V3.38881C30.9472 2.62539 31.6296 2.34473 32.3344 2.34473Z"
            fill="#05CA79"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M35.5413 7.09359C36.2125 7.09359 36.716 6.79047 36.9844 6.39754L37.9801 6.98132C37.4655 7.74474 36.6265 8.20503 35.5301 8.20503C33.6843 8.20503 32.4872 6.93642 32.4872 5.25242C32.4872 3.56842 33.6843 2.2998 35.4406 2.2998C37.197 2.2998 38.2486 3.647 38.2486 5.26364C38.2486 5.43204 38.2262 5.61167 38.2038 5.76884H33.7514C33.9416 6.64452 34.6463 7.09359 35.5413 7.09359ZM37.0292 4.7809C36.8614 3.8154 36.1566 3.40002 35.4294 3.40002C34.5233 3.40002 33.908 3.9389 33.7402 4.7809H37.0292Z"
            fill="#05CA79"
          />
          <path
            d="M38.7259 5.25174C38.7259 3.57896 39.9901 2.29912 41.6793 2.29912C42.7756 2.29912 43.7265 2.87168 44.174 3.74736L43.1336 4.3536C42.8875 3.82595 42.3393 3.48915 41.6681 3.48915C40.6837 3.48915 39.9341 4.24134 39.9341 5.25174C39.9341 6.26214 40.6837 7.01432 41.6681 7.01432C42.3393 7.01432 42.8875 6.6663 43.156 6.14987L44.1964 6.74488C43.7265 7.63179 42.7756 8.20435 41.6793 8.20435C39.9901 8.20435 38.7259 6.91328 38.7259 5.25174ZM46.6128 3.61264V6.30704C46.6128 7.02555 47.0827 7.01432 48 6.96942V8.0584C46.1429 8.28294 45.4046 7.76651 45.4046 6.30704V3.61264H44.3754V2.44507H45.4046V0.768555H46.6128V2.44507H48V3.61264H46.6128Z"
            fill="#05CA79"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.9105 0.0732422V5.25248C5.9105 6.91402 4.59043 8.20509 2.95711 8.20509C1.3238 8.20509 0 6.92525 0 5.25248C0 3.5797 1.3238 2.29986 2.95711 2.29986C3.61715 2.29986 4.22871 2.50569 4.71721 2.86494V0.0732422H5.9105ZM4.7023 5.25248C4.7023 4.23085 3.94158 3.47866 2.95711 3.47866C1.97265 3.47866 1.21193 4.23085 1.21193 5.25248C1.21193 6.2741 1.97265 7.02629 2.95711 7.02629C3.94158 7.02629 4.7023 6.2741 4.7023 5.25248Z"
            fill="#05CA79"
          />
        </svg>
      );
    } else {
      // Default placeholder for unknown logo types
      return <div className="w-8 h-8 bg-gray-200 rounded flex items-center justify-center">{logoType.charAt(0).toUpperCase()}</div>;
    }
  };

  return (
    <div className="max-w-full rounded-custom12px p-6 md:p-0 sm:p-0 lg:p-0 xl:p-0 sm:max-h-full md:max-h-full lg:max-h-full xl:max-h-full max-h-[80vh] overflow-y-auto sm:overflow-visible md:overflow-visible lg:overflow-visible xl:overflow-visible">
      <div className="rounded-lg mt-0 sm:mt-6 md:mt-6 lg:mt-8">
        <div className="p-4 md:px-1 sm:px-1 lg:px-1 xl:px-1 border-b flex justify-between items-center">
          <h2 className="text-[14px] font-inter font-[600] text-headding-color">POS</h2>
          <div className="flex space-x-4">
            <button className="px-4 py-2 text-[12px] font-inter font-[600] text- cardValue">Cancel</button>
            <button className="px-4 py-2 text-[12px] font-inter font-[600] text-cardValue  border-[1px] border-reloadBorder bg-backgroundWhite rounded-custom">
              Save
            </button>
          </div>
        </div>
        <div className="p-0 md:p-0 sm:p-0 lg:p-0 xl:p-0">
        <div className="p-4 bg-backgroundWhite rounded-custom12px">
          <h3 className="text-[14px] font-inter font-[500] text-textHeading mb-4">Available POS for you</h3>
          {/* Using the enhanced CustomCards component with dynamic fields */}
          <CustomCards
            items={posItems}
            onToggle={handleToggleConnection}
            onEdit={handleEditClick}
            renderLogo={renderLogo}
            title="POS on your account"
            dynamicFields={dynamicFields}
            dynamicFieldsValues={dynamicFieldsValues}
            onDynamicFieldChange={handleDynamicFieldChange}
            showDynamicFieldsAtTop={true}
          />
        </div>
        </div>
      </div>

      {/* Modal for editing POS */}
      {isModalOpen && currentItem && (
        <CustomModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          mode={modalMode}
          fields={posFields}
          item={currentItem}
          onSave={handleSave}
          title={`${modalMode === "edit" ? "Configuring" : "Add"} Deliverect POS`}
          additionalButton={{
            label: "Learn More",
            onClick: () => {
              console.log("New button clicked!");
              
            },
            className: "bg-transperant", 
            disabled: false, 
          }}
          
         
        />
      )}
    </div>
  );
};

export default POS;