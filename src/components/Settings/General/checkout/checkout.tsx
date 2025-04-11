import React, { useState } from "react";
import ToggleSwitch from "../../../common/toggleSwitch";
import { ChevronDown, Plus, X } from "lucide-react";
import { PlusCircle, Trash2, Edit } from "lucide-react";
import CustomModal from "../../../common/modals";

interface CustomField {
  id: number;
  title: string;
  placeholder: string;
  type: string;
  compulsory: boolean;
}
interface InputValue {
  id: number;
  amount: string;
  type: string;
}
interface CheckoutProps {
  onClose: () => void;
  onSave: (data: any) => void;
}

const Checkout: React.FC<CheckoutProps> = ({ onClose, onSave }) => {
  // State for all form fields
  const [sideOrder, setSideOrder] = useState(false);
  const [outstandingPayment, setOutstandingPayment] = useState(false);
  const [mandatoryOption, setMandatoryOption] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deliveryModes, setDeliveryModes] = useState({
    takeAway: true,
    homeDelivery: false,
  });
 
  const [inputValues, setInputValues] = useState<InputValue[]>([
    { id: 1, amount: '', type: 'Fixed' }
  ]);
  const [deliveryTime, setDeliveryTime] = useState("");
  const [customOrderFields, setCustomOrderFields] = useState(false);
  const [eta, setEta] = useState(false);
  const [googleMapApiKey, setGoogleMapApiKey] = useState("");
  const [deliveryCharge, setDeliveryCharge] = useState({
    amount: "",
    type: "Fixed",
  });
  const [tip, setTip] = useState({
    enabled: false,
    amount: "",
    allowManual: false,
  });
  const [multipleTipOptions, setMultipleTipOptions] = useState({
    enabled: false,
    options: ["10", "20", "30", "40", "50"],
  });
  const [showCustomFieldsModal, setShowCustomFieldsModal] = useState(false);

  // Add state for new tip option
  const [newTipOption, setNewTipOption] = useState("");
  const [newTipType, setNewTipType] = useState("Fixed");

  const [fields, setFields] = useState<CustomField[]>([
    {
      id: 1,
      title: "Delivery Instructions",
      placeholder: "Write here!",
      type: "Text area",
      compulsory: true,
    },
  ]);

  // Using the full CustomField type for newField
  const [newField, setNewField] = useState<CustomField>({
    id: Date.now(),
    title: "",
    placeholder: "",
    type: "Text",
    compulsory: false,
  });
  const addNewInputField = () => {
    const newId = inputValues.length > 0 ? Math.max(...inputValues.map(item => item.id)) + 1 : 1;
    setInputValues([...inputValues, { id: newId, amount: '', type: 'Fixed' }]);
  };
  
  // Function to handle input changes
  const handleInputChange = (id: number, field: keyof Omit<InputValue, 'id'>, value: string) => {
    setInputValues(prevValues => 
      prevValues.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };
  
  const handleFieldChange = (id: number, field: Partial<CustomField>) => {
    setFields(fields.map((f) => (f.id === id ? { ...f, ...field } : f)));
  };

  const addField = () => {
    if (newField.title.trim()) {
      const fieldToAdd = { ...newField, id: Date.now() };
      setFields([...fields, fieldToAdd]);
      setNewField({
        id: Date.now() + 1,
        title: "",
        placeholder: "",
        type: "Text",
        compulsory: false,
      });
    }
  };

  const removeField = (id: number) => {
    setFields(fields.filter((f) => f.id !== id));
  };

  const saveCustomFields = () => {
    setShowCustomFieldsModal(false);
  };

  // Add function to handle editing a field
  const handleEditField = (id: number) => {
    const fieldToEdit = fields.find((f) => f.id === id);
    if (fieldToEdit) {
      // Set the editing ID and populate the new field form with existing field data
      setEditingId(id);
      setNewField({ ...fieldToEdit });

      // Optional: You might want to scroll to the add/edit field section
      // This would require a ref or programmatic scrolling logic
    }
  };

  // Update the addField function to handle editing
  const handleSaveField = () => {
    if (newField.title.trim()) {
      if (editingId !== null) {
        // Update existing field
        setFields(
          fields.map((f) =>
            f.id === editingId
              ? {
                  ...newField,
                  id: editingId, // Preserve the original ID
                }
              : f
          )
        );
        // Reset editing state
        setEditingId(null);
      } else {
        // Add new field
        const fieldToAdd = {
          ...newField,
          id: Date.now(),
        };
        setFields([...fields, fieldToAdd]);
      }

      // Reset the new field state
      setNewField({
        id: Date.now(),
        title: "",
        placeholder: "",
        type: "Text",
        compulsory: false,
      });
    }
  };

  // Add function to handle adding a new tip option
  const addTipOption = () => {
    // Trim the new tip option and validate it
    const trimmedOption = newTipOption.trim();
    if (trimmedOption) {
      // Check if the option already exists to prevent duplicates
      if (!multipleTipOptions.options.includes(trimmedOption)) {
        setMultipleTipOptions((prev) => ({
          ...prev,
          options: [...prev.options, trimmedOption],
        }));
        // Reset the new tip option input
        setNewTipOption("");
      } else {
        // Optional: You might want to show an error or toast that the option already exists
        console.warn("Tip option already exists");
      }
    }
  };

  // Fix the handleToggle function in your Checkout component
  const handleToggle = (field: string) => (e: React.MouseEvent) => {
    // Always stop propagation to prevent event bubbling issues
    e.stopPropagation();

    console.log(`Toggling ${field}`); // Add logging for debugging

    switch (field) {
      case "sideOrder":
        setSideOrder(!sideOrder);
        break;
      case "outstandingPayment":
        setOutstandingPayment(!outstandingPayment);
        break;
      case "mandatoryOption":
        setMandatoryOption(!mandatoryOption);
        break;
      case "customOrderFields":
        setCustomOrderFields(!customOrderFields); // Fixed: was using wrong state variable
        break;
      case "eta":
        setEta(!eta);
        break;
      case "tip":
        setTip((prev) => ({ ...prev, enabled: !prev.enabled }));
        break;
      case "multipleTipOptions":
        setMultipleTipOptions((prev) => ({ ...prev, enabled: !prev.enabled }));
        break;
    }
  };

  const removeTipOption = (option: string) => {
    setMultipleTipOptions((prev) => ({
      ...prev,
      options: prev.options.filter((opt) => opt !== option),
    }));
  };

  // Function to handle saving the entire form
  const handleSaveForm = () => {
    onSave({
      sideOrder,
      outstandingPayment,
      mandatoryOption,
      deliveryModes,
      deliveryTime,
      customOrderFields,
      customFields: fields, // Include the custom fields data
      eta,
      googleMapApiKey,
      deliveryCharge,
      tip,
      multipleTipOptions,
    });
  };

  return (
    <div className="max-w-full rounded-custom12px p-1 md:p-0 sm:p-0 lg:p-0 xl:p-0 sm:max-h-full md:max-h-full lg:max-h-full xl:max-h-full max-h-[80vh] overflow-y-auto sm:overflow-visible md:overflow-visible lg:overflow-visible xl:overflow-visible ">
      <div className="flex items-center justify-between py-2 mt-0 sm:mt-4 md:mt-6 lg:mt-10 xl-mt-10">
        <h2 className="text-[14px] font-inter font-[600] text-headding-color">
          Checkout
        </h2>
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-[12px] font-inter font-[600] text-paragraphBlack"
          >
            Discard
          </button>
          <button
            onClick={handleSaveForm}
            className="px-4 py-2 text-[12px] font-inter font-[600] text-whiteColor bg-bgButton border border-reloadBorder rounded-custom"
          >
            Save
          </button>
        </div>
      </div>

      <div className="p-1 md:p-0 sm:p-0 lg:p-0 xl:p-0 space-y-6">
        {/* Side Order */}
        <div className="bg-backgroundWhite rounded-custom12px p-3 border border-gray-200 shadow-custom">
          <div className="flex items-center justify-between">
            <div>
              <h3
                id="side-order-title"
                className="text-[14px] font-inter font-[500] my-2 text-textHeading"
              >
                Side Order
              </h3>
              <p
                id="side-order-desc"
                className="text-[12px] font-inter font-[500] text-cardTitle"
              >
                Allow store add side items or categories to complement main
                orders.
              </p>
            </div>
            <ToggleSwitch
              checked={sideOrder}
              onChange={handleToggle("sideOrder")}
              aria-labelledby="side-order-title"
              aria-describedby="side-order-desc"
            />
          </div>
        </div>

        <div className="bg-backgroundWhite rounded-custom12px p-3 border border-gray-200 shadow-custom">
          <div className="flex items-center justify-between border-b border-grey-border pb-3">
            <div>
              <h3
                id="side-order-title"
                className="text-[14px] font-inter font-[500] my-2 text-textHeading"
              >
                Outstanding Payment
              </h3>
              <p
                id="side-order-desc"
                className="text-[12px] font-inter font-[500] text-cardTitle"
              >
                Add debt to a customer's account for outstanding payments,
                cancellation fees,
                <br /> or ad-hoc charges. This will be visible to the customer
                upon opening the web or mobile app.
              </p>
            </div>
            <ToggleSwitch
              checked={outstandingPayment}
              onChange={handleToggle("outstandingPayment")}
              aria-labelledby="side-order-title"
              aria-describedby="side-order-desc"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h3
                id="side-order-title"
                className="text-[14px] font-inter font-[500] my-2 text-textHeading"
              >
                Mandatory Option
              </h3>
              <p
                id="side-order-desc"
                className="text-[12px] font-inter font-[500] text-cardTitle"
              >
                If enabled, customers must clear their outstanding payments
                before placing a new order.
              </p>
            </div>
            <ToggleSwitch
              checked={mandatoryOption}
              onChange={handleToggle("mandatoryOption")}
              aria-labelledby="side-order-title"
              aria-describedby="side-order-desc"
            />
          </div>
        </div>

        {/* Delivery Mode */}
        <div className="p-2">
          <div className=" border border-reloadBorder rounded-tl-[12px] rounded-tr-[12px] p-1">
            <h3 className="text-[14px] font-inter font-[500] text-textHeading bg-background-grey p-2 ">
              Delivery Mode
            </h3>
            <p className="text-[12px] font-inter font-[500] text-cardTitle mb-4 bg-background-grey p-2">
              Choose delivery modes. Merchants can enable both Home Delivery and
              Takeaway
            </p>
          </div>
          <div className="space-y-4 bg-backgroundWhite p-2  rounded-bl-[12px] rounded-br-[12px] border">
            <div className="flex items-center gap-2 border-b py-3">
              <input
                type="checkbox"
                style={{ accentColor: "#7C43DF" }}
                checked={deliveryModes.takeAway}
                onChange={() =>
                  setDeliveryModes((prev) => ({
                    ...prev,
                    takeAway: !prev.takeAway,
                  }))
                }
              />
              <span className="text-[14px] font-inter text-gray-700">
                Take Away
              </span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={deliveryModes.homeDelivery}
                style={{ accentColor: "#7C43DF" }}
                onChange={() =>
                  setDeliveryModes((prev) => ({
                    ...prev,
                    homeDelivery: !prev.homeDelivery,
                  }))
                }
                className="rounded border-gray-300 text-purple-600"
              />
              <span className="text-[14px] font-inter text-gray-700">
                Home Delivery
              </span>
            </div>
          </div>
        </div>

        {/* Delivery Time */}
        <div className="bg-background-grey rounded-lg p-2">
          <div className="border border-reloadBorder rounded-tl-[12px] rounded-tr-[12px] p-1">
            <h3 className="text-[14px] font-inter font-[500] text-textHeading bg-background-grey p-2">
              Delivery Time
            </h3>
            <p className="text-[12px] font-inter font-[500] text-cardTitle mb-4 bg-background-grey p-2 mb-4">
              Set the default delivery time. If a restaurant handles its own
              delivery, they can enter their own delivery time.
            </p>
          </div>
          <div className="relative bg-backgroundWhite rounded-bl-[12px] rounded-br-[12px] p-3">
            <input
              type="text"
              placeholder="Select delivery time"
              value={deliveryTime}
              onChange={(e) => setDeliveryTime(e.target.value)}
              className="w-full p-3 pl-4 pr-10 border border-reloadBorder rounded-lg text-[14px] font-inter"
            />
            {/* Clock Icon */}
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M10 6.66667V10L12.5 12.5M17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C14.1421 2.5 17.5 5.85786 17.5 10Z"
                  stroke="#636363"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Custom Order Fields */}
        <div className="bg-backgroundWhite rounded-custom12px p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h3
                  id="custom-fields-title"
                  className="text-[14px] font-inter font-[500] text-textHeading py-2"
                >
                  Custom Order Fields
                </h3>
                <span
                  className="border border-reloadBorder p-1 rounded-custom cursor-pointer"
                  onClick={() => setShowCustomFieldsModal(true)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M5.10542 10.295C4.83205 10.0216 4.83205 9.57839 5.10542 9.30503L7.41044 7L5.10542 4.69497C4.83205 4.42161 4.83205 3.97839 5.10542 3.70503C5.37878 3.43166 5.822 3.43166 6.09537 3.70503L8.89537 6.50503C9.16873 6.77839 9.16873 7.22161 8.89537 7.49497L6.09537 10.295C5.822 10.5683 5.37878 10.5683 5.10542 10.295Z"
                      fill="#212121"
                    />
                  </svg>
                </span>
              </div>
              <p
                id="custom-fields-desc"
                className="text-[12px] font-inter text-cardTitle"
              >
                Allow customers to enter additional information during checkout.
              </p>
            </div>
            <ToggleSwitch
              checked={customOrderFields}
              onChange={handleToggle("customOrderFields")}
              aria-labelledby="custom-fields-title"
              aria-describedby="custom-fields-desc"
            />
          </div>
        </div>

        {/* Custom Fields Modal */}
        {showCustomFieldsModal && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-30 absolute inset-0 flex items-center justify-center">
            <div className="bg-white rounded-lg w-full max-w-full h-full m-4 overflow-y-auto shadow-lg relative z-10">
              {/* Header */}
              <div className="flex justify-between items-center px-6 py-4 border-b border-grey-border bg-background-grey">
                <h1 className="text-[16px] font-[600] font-inter">
                  Custom Order Fields
                </h1>
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setShowCustomFieldsModal(false);
                      setEditingId(null);
                      setNewField({
                        id: Date.now(),
                        title: "",
                        placeholder: "",
                        type: "Text",
                        compulsory: false,
                      });
                    }}
                    className="px-5 py-2 text-cardValue text-[12px] font-inter font-[600]"
                  >
                    Discard
                  </button>
                  <button
                    onClick={saveCustomFields}
                    className="px-6 py-2 bg-bgButton text-white border border-btnBorder rounded-custom text-[12px] font-inter font-[600]"
                  >
                    Save
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col sm:flex-row">
                {/* Left side - field editor */}
                <div className="w-full sm:w-2/3 md:w-2/3 sm:pr-6 md:pr-6 bg-white">
                  {/* Existing fields */}
                  <div className="space-y-4 mb-8">
                    {fields.map((field) => (
                      <div key={field.id}>
                        {/* Tablet view (sm) and Mobile view */}
                        <div className="md:hidden">
                          {/* Row 1: Title + Placeholder */}
                          <div className="flex gap-4 mb-3">
                            <div className="w-1/2">
                              <input
                                type="text"
                                value={field.title}
                                onChange={(e) =>
                                  handleFieldChange(field.id, {
                                    title: e.target.value,
                                  })
                                }
                                placeholder="Field Title"
                                className={`w-full px-4 py-3 border rounded-custom8px text-[14px] font-inter font-[400] focus:ring-1 focus:ring-red-300 transition-all duration-300 ease-in-out
                          ${
                            field.compulsory
                              ? "border-menuSubHeadingColor text-menuSubHeadingColor"
                              : "border-reloadBorder text-reloadBorder"
                          } focus:border-reloadBorder`}
                              />
                            </div>
                            <div className="w-1/2">
                              <input
                                type="text"
                                value={field.placeholder}
                                onChange={(e) =>
                                  handleFieldChange(field.id, {
                                    placeholder: e.target.value,
                                  })
                                }
                                placeholder="Field Placeholder"
                                className={`w-full px-4 py-3 border rounded-custom8px text-[14px] font-inter font-[400] focus:ring-1 focus:ring-red-300 transition-all duration-300 ease-in-out
                          ${
                            field.compulsory
                              ? "border-menuSubHeadingColor text-menuSubHeadingColor"
                              : "border-reloadBorder text-reloadBorder"
                          } focus:border-reloadBorder`}
                              />
                            </div>
                          </div>

                          {/* Row 2: Type + Delete + Compulsory */}
                          <div className="flex items-center mb-6">
                            <div className="w-[120px] mr-3">
                              <div className="relative">
                                <select
                                  value={field.type}
                                  onChange={(e) =>
                                    handleFieldChange(field.id, {
                                      type: e.target.value,
                                    })
                                  }
                                  className={`w-full px-4 py-3 border rounded-custom8px text-reloadBorde text-[14px] font-inter font-[400] focus:ring-1 focus:ring-red-300 transition-all duration-300 ease-in-out appearance-none
                            ${
                              field.compulsory
                                ? "border-menuSubHeadingColor text-menuSubHeadingColor"
                                : "border-reloadBorder text-reloadBorder"
                            } focus:border-reloadBorder`}
                                >
                                  <option
                                    value="Text"
                                    className="text-[14px] font-inter font-[400]"
                                  >
                                    Text
                                  </option>
                                  <option
                                    value="Text area"
                                    className="text-[14px] font-inter font-[400]"
                                  >
                                    Text area
                                  </option>
                                  <option
                                    value="Number"
                                    className="text-[14px] font-inter font-[400]"
                                  >
                                    Number
                                  </option>
                                </select>
                                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                                  <ChevronDown
                                    size={16}
                                    className="text-gray-500"
                                  />
                                </div>
                              </div>
                            </div>
                            <button
                              onClick={() => removeField(field.id)}
                              className="p-2 mr-3 rounded-custom8px border border-reloadBorder hover:text-red-500"
                            >
                              <Trash2 size={20} />
                            </button>
                            <div className="flex items-center gap-2">
                              <span className="text-[14px] font-inter font-[400]">
                                Compulsory
                              </span>
                              <div className="relative">
                                <input
                                  type="checkbox"
                                  checked={field.compulsory}
                                  onChange={() =>
                                    handleFieldChange(field.id, {
                                      compulsory: !field.compulsory,
                                    })
                                  }
                                  id={`compulsory-sm-${field.id}`}
                                  className="sr-only"
                                />
                                <label
                                  htmlFor={`compulsory-sm-${field.id}`}
                                  className={`block w-12 h-6 rounded-full transition-colors duration-200 ease-in-out ${
                                    field.compulsory
                                      ? "bg-bgButton"
                                      : "bg-gray-200"
                                  }`}
                                >
                                  <span
                                    className={`block w-5 h-5 mt-0.5 ml-0.5 bg-white rounded-full transform transition-transform duration-200 ease-in-out ${
                                      field.compulsory ? "translate-x-6" : ""
                                    }`}
                                  />
                                </label>
                              </div>
                            </div>
                          </div>

                          <div className="border-t border-gray-200 mb-4"></div>
                        </div>

                        {/* Original desktop/laptop layout */}
                        <div className="hidden md:flex items-center gap-4 md:flex-nowrap">
                          <div className="w-1/3">
                            <input
                              type="text"
                              value={field.title}
                              onChange={(e) =>
                                handleFieldChange(field.id, {
                                  title: e.target.value,
                                })
                              }
                              placeholder="Field Title"
                              className={`w-full px-4 py-3 border rounded-custom8px text-[14px] font-inter font-[400] focus:ring-1 focus:ring-red-300 transition-all duration-300 ease-in-out
                        ${
                          field.compulsory
                            ? "border-menuSubHeadingColor text-menuSubHeadingColor"
                            : "border-reloadBorder text-reloadBorder"
                        } focus:border-reloadBorder`}
                            />
                          </div>
                          <div className="w-1/3">
                            <input
                              type="text"
                              value={field.placeholder}
                              onChange={(e) =>
                                handleFieldChange(field.id, {
                                  placeholder: e.target.value,
                                })
                              }
                              placeholder="Field Placeholder"
                              className={`w-full px-4 py-3 border rounded-custom8px text-[14px] font-inter font-[400] focus:ring-1 focus:ring-red-300 transition-all duration-300 ease-in-out
                        ${
                          field.compulsory
                            ? "border-menuSubHeadingColor text-menuSubHeadingColor"
                            : "border-reloadBorder text-reloadBorder"
                        } focus:border-reloadBorder`}
                            />
                          </div>
                          <div className="w-[140px]">
                            <div className="relative">
                              <select
                                value={field.type}
                                onChange={(e) =>
                                  handleFieldChange(field.id, {
                                    type: e.target.value,
                                  })
                                }
                                className={`w-full px-4 py-3 border rounded-custom8px text-reloadBorde text-[14px] font-inter font-[400] focus:ring-1 focus:ring-red-300 transition-all duration-300 ease-in-out appearance-none
                          ${
                            field.compulsory
                              ? "border-menuSubHeadingColor text-menuSubHeadingColor"
                              : "border-reloadBorder text-reloadBorder"
                          } focus:border-reloadBorder`}
                              >
                                <option
                                  value="Text"
                                  className="text-[14px] font-inter font-[400]"
                                >
                                  Text
                                </option>
                                <option
                                  value="Text area"
                                  className="text-[14px] font-inter font-[400]"
                                >
                                  Text area
                                </option>
                                <option
                                  value="Number"
                                  className="text-[14px] font-inter font-[400]"
                                >
                                  Number
                                </option>
                              </select>
                              <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                                <ChevronDown
                                  size={16}
                                  className="text-gray-500"
                                />
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => removeField(field.id)}
                            className="p-2 rounded-custom8px border border-reloadBorder hover:text-red-500"
                          >
                            <Trash2 size={20} />
                          </button>
                          <div className="flex items-center gap-2 ml-auto">
                            <span className="rounded-custom8px text-[14px] font-inter font-[400]">
                              Compulsory
                            </span>
                            <div className="relative">
                              <input
                                type="checkbox"
                                checked={field.compulsory}
                                onChange={() =>
                                  handleFieldChange(field.id, {
                                    compulsory: !field.compulsory,
                                  })
                                }
                                id={`compulsory-${field.id}`}
                                className="sr-only"
                              />
                              <label
                                htmlFor={`compulsory-${field.id}`}
                                className={`block w-12 h-6 rounded-full transition-colors duration-200 ease-in-out ${
                                  field.compulsory
                                    ? "bg-bgButton"
                                    : "bg-gray-200"
                                }`}
                              >
                                <span
                                  className={`block w-5 h-5 mt-0.5 ml-0.5 bg-white rounded-full transform transition-transform duration-200 ease-in-out ${
                                    field.compulsory ? "translate-x-6" : ""
                                  }`}
                                />
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add new field form */}
                  <div className="p-0">
                    {/* Tablet view (sm) and Mobile view */}
                    <div className="md:hidden">
                      {/* Row 1: Title + Placeholder */}
                      <div className="flex gap-4 mb-3">
                        <div className="w-1/2">
                          <input
                            type="text"
                            value={newField.title}
                            onChange={(e) =>
                              setNewField({
                                ...newField,
                                title: e.target.value,
                              })
                            }
                            placeholder="Field Title"
                            className={`w-full px-4 py-3 border text-menuSubHeadingColor text-bgButton rounded-custom8px text-[14px] font-inter font-[400] focus:ring-1 focus:ring-red-300 transition-all duration-300 ease-in-out
                      ${
                        newField.compulsory
                          ? "border-menuSubHeadingColor text-menuSubHeadingColor placeholder:text-menuSubHeadingColor"
                          : "border-reloadBorder text-reloadBorder placeholder:text-reloadBorder"
                      } focus:border-reloadBorder`}
                          />
                        </div>
                        <div className="w-1/2">
                          <input
                            type="text"
                            value={newField.placeholder}
                            onChange={(e) =>
                              setNewField({
                                ...newField,
                                placeholder: e.target.value,
                              })
                            }
                            placeholder="Field Placeholder"
                            className={`w-full px-4 py-3 border rounded-custom8px text-[14px] font-inter font-[400] focus:ring-1 focus:ring-red-300 transition-all duration-300 ease-in-out
                      ${
                        newField.compulsory
                          ? "border-menuSubHeadingColor text-menuSubHeadingColor placeholder:text-menuSubHeadingColor"
                          : "border-reloadBorder text-reloadBorder placeholder:text-reloadBorder"
                      } focus:border-reloadBorder`}
                          />
                        </div>
                      </div>

                      {/* Row 2: Type + Add + Compulsory */}
                      <div className="flex items-center">
                        <div className="w-[120px] mr-3">
                          <div className="relative">
                            <select
                              value={newField.type}
                              onChange={(e) =>
                                setNewField({
                                  ...newField,
                                  type: e.target.value,
                                })
                              }
                              className={`w-full px-4 py-3 border rounded-custom8px text-[14px] font-inter font-[400] focus:ring-1 focus:ring-red-300 transition-all duration-300 ease-in-out appearance-none
                        ${
                          newField.compulsory
                            ? "border-menuSubHeadingColor text-menuSubHeadingColor"
                            : "border-reloadBorder text-reloadBorder"
                        } focus:border-reloadBorder`}
                            >
                              <option
                                value="Text"
                                className="text-[14px] font-inter font-[400]"
                              >
                                Text
                              </option>
                              <option
                                value="Text area"
                                className="text-[14px] font-inter font-[400]"
                              >
                                Text area
                              </option>
                              <option
                                value="Number"
                                className="text-[14px] font-inter font-[400]"
                              >
                                Number
                              </option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                              <ChevronDown
                                size={16}
                                className="text-gray-500"
                              />
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={handleSaveField}
                          className="p-2 mr-3 rounded-custom8px border border-reloadBorder hover:text-purple-600"
                        >
                          <PlusCircle size={24} />
                        </button>
                        <div className="flex items-center gap-2">
                          <span className="text-[14px] font-inter font-[400]">
                            Compulsory
                          </span>
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={newField.compulsory}
                              onChange={() =>
                                setNewField({
                                  ...newField,
                                  compulsory: !newField.compulsory,
                                })
                              }
                              id="compulsory-new-sm"
                              className="sr-only"
                            />
                            <label
                              htmlFor="compulsory-new-sm"
                              className={`block w-12 h-6 rounded-full transition-colors duration-200 ease-in-out ${
                                newField.compulsory
                                  ? "bg-bgButton"
                                  : "bg-gray-200"
                              }`}
                            >
                              <span
                                className={`block w-5 h-5 mt-0.5 ml-0.5 bg-white rounded-full transform transition-transform duration-200 ease-in-out ${
                                  newField.compulsory ? "translate-x-6" : ""
                                }`}
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Original desktop/laptop layout */}
                    <div className="hidden md:flex items-center gap-4 md:flex-nowrap">
                      <div className="w-1/3">
                        <input
                          type="text"
                          value={newField.title}
                          onChange={(e) =>
                            setNewField({ ...newField, title: e.target.value })
                          }
                          placeholder="Field Title"
                          className={`w-full px-4 py-3 border text-menuSubHeadingColor text-bgButton rounded-custom8px text-[14px] font-inter font-[400] focus:ring-1 focus:ring-red-300 transition-all duration-300 ease-in-out
                    ${
                      newField.compulsory
                        ? "border-menuSubHeadingColor text-menuSubHeadingColor placeholder:text-menuSubHeadingColor"
                        : "border-reloadBorder text-reloadBorder placeholder:text-reloadBorder"
                    } focus:border-reloadBorder`}
                        />
                      </div>
                      <div className="w-1/3">
                        <input
                          type="text"
                          value={newField.placeholder}
                          onChange={(e) =>
                            setNewField({
                              ...newField,
                              placeholder: e.target.value,
                            })
                          }
                          placeholder="Field Placeholder"
                          className={`w-full px-4 py-3 border rounded-custom8px text-[14px] font-inter font-[400] focus:ring-1 focus:ring-red-300 transition-all duration-300 ease-in-out
                    ${
                      newField.compulsory
                        ? "border-menuSubHeadingColor text-menuSubHeadingColor placeholder:text-menuSubHeadingColor"
                        : "border-reloadBorder text-reloadBorder placeholder:text-reloadBorder"
                    } focus:border-reloadBorder`}
                        />
                      </div>
                      <div className="w-[140px]">
                        <div className="relative">
                          <select
                            value={newField.type}
                            onChange={(e) =>
                              setNewField({ ...newField, type: e.target.value })
                            }
                            className={`w-full px-4 py-3 border rounded-custom8px text-[14px] font-inter font-[400] focus:ring-1 focus:ring-red-300 transition-all duration-300 ease-in-out appearance-none
                      ${
                        newField.compulsory
                          ? "border-menuSubHeadingColor text-menuSubHeadingColor"
                          : "border-reloadBorder text-reloadBorder"
                      } focus:border-reloadBorder`}
                          >
                            <option
                              value="Text"
                              className="text-[14px] font-inter font-[400]"
                            >
                              Text
                            </option>
                            <option
                              value="Text area"
                              className="text-[14px] font-inter font-[400]"
                            >
                              Text area
                            </option>
                            <option
                              value="Number"
                              className="text-[14px] font-inter font-[400]"
                            >
                              Number
                            </option>
                          </select>
                          <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                            <ChevronDown size={16} className="text-gray-500" />
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={handleSaveField}
                        className="p-2 rounded-custom8px border border-reloadBorder hover:text-purple-600"
                      >
                        <PlusCircle size={24} />
                      </button>
                      <div className="flex items-center gap-2 ml-auto">
                        <span className="rounded-custom8px text-[14px] font-inter font-[400]">
                          Compulsory
                        </span>
                        <div className="relative">
                          <input
                            type="checkbox"
                            checked={newField.compulsory}
                            onChange={() =>
                              setNewField({
                                ...newField,
                                compulsory: !newField.compulsory,
                              })
                            }
                            id="compulsory-new"
                            className="sr-only"
                          />
                          <label
                            htmlFor="compulsory-new"
                            className={`block w-12 h-6 rounded-full transition-colors duration-200 ease-in-out ${
                              newField.compulsory
                                ? "bg-bgButton"
                                : "bg-gray-200"
                            }`}
                          >
                            <span
                              className={`block w-5 h-5 mt-0.5 ml-0.5 bg-white rounded-full transform transition-transform duration-200 ease-in-out ${
                                newField.compulsory ? "translate-x-6" : ""
                              }`}
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right side - field preview */}
                <div className="w-full sm:w-1/3 md:w-1/3 border-l sm:pl-6 md:pl-6 mt-8 sm:mt-0 md:mt-0 p-3 h-screen bg-background-grey">
                  <div className="pt-4 md:pt-0">
                    <div className="space-y-4 h-full">
                      {fields.map((field) => (
                        <div key={field.id} className="mb-6">
                          <div className="mb-2">
                            <div className="border border-cardTitle p-3 rounded-custom8px">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="none"
                                    className="text-gray-400"
                                  >
                                    <path
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeWidth="1.5"
                                      d="M1.75 4h12.5M1.75 8h12.5M1.75 12h12.5"
                                    />
                                  </svg>
                                  <span className="text-sm font-medium text-gray-800">
                                    {field.title}
                                  </span>
                                </div>
                                <button
                                  className="text-gray-500 hover:text-blue-500"
                                  onClick={() => handleEditField(field.id)}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="w-4 h-4"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                    />
                                  </svg>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ETA */}
        <div className="">
          <div className="flex items-center justify-between border border-reloadBorder rounded-tl-[12px] rounded-tr-[12px] p-6">
            <div className="">
              <h3
                id="eta-title"
                className="text-[14px] font-inter text-textHeading"
              >
                ETA (Estimate Time of Arrival)
              </h3>
              <p
                id="eta-desc"
                className="text-[12px] font-inter text-cardTitle"
              >
                Turn on to show customers the expected delivery time.
              </p>
            </div>
            <div className="flex justify-between">
              <ToggleSwitch
                checked={eta}
                onChange={handleToggle("eta")}
                aria-labelledby="eta-title"
                aria-describedby="eta-desc"
              />
            </div>
          </div>

          {eta && (
            <div className="bg-backgroundWhite rounded-bl-[12px] rounded-br-[12px] p-3">
              <input
                type="text"
                placeholder="Google map API key"
                value={googleMapApiKey}
                onChange={(e) => setGoogleMapApiKey(e.target.value)}
                className="w-full p-3 border border-reloadBorder rounded-lg text-[14px] font-inter"
              />
            </div>
          )}
        </div>

        {/* Delivery Charge */}
        <div className="border border-reloadBorder rounded-[12px]  overflow-hidden">
          <div className="border-b border-reloadBorder p-6">
            <h3 className="text-[14px] font-inter text-textHeading">
              Delivery Charge
            </h3>
            <p className="text-[12px] font-inter text-cardTitle">
              Set the charge for delivery on orders.
            </p>
          </div>
          <div className="flex gap-4 p-6 bg-backgroundWhite">
            <input
              type="text"
              placeholder="Enter delivery charge amount"
              value={deliveryCharge.amount}
              onChange={(e) =>
                setDeliveryCharge((prev) => ({
                  ...prev,
                  amount: e.target.value,
                }))
              }
              className="flex-1 p-4 border border-reloadBorder rounded-lg text-[14px] font-inter focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
            <div className="relative w-full max-w-[280px]">
              <select
                value={deliveryCharge.type}
                onChange={(e) =>
                  setDeliveryCharge((prev) => ({
                    ...prev,
                    type: e.target.value,
                  }))
                }
                className="w-full h-full appearance-none p-4 border border-reloadBorder rounded-lg text-[14px] font-inter focus:outline-none focus:ring-1 focus:ring-purple-500"
              >
                <option className="w-full h-full appearance-none p-4 border border-reloadBorder rounded-lg text-[14px] font-inter focus:outline-none focus:ring-1 focus:ring-purple-500">
                  Fixed
                </option>
                <option className="w-full h-full appearance-none p-4 border border-reloadBorder rounded-lg text-[14px] font-inter focus:outline-none focus:ring-1 focus:ring-purple-500">
                  Percentage
                </option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Tip */}
        <div className="bg-white rounded-lg p-4 border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3
                id="tip-title"
                className="text-[14px] font-inter text-textHeading"
              >
                Tip
              </h3>
              <p
                id="tip-desc"
                className="text-[12px] font-inter text-cardTitle"
              >
                Set a minimum tip amount for deliveries across all merchants.
                Choose between a<br /> fixed amount or a percentage of the
                order.
              </p>
            </div>
            <ToggleSwitch
              checked={tip.enabled}
              onChange={handleToggle("tip")}
              aria-labelledby="tip-title"
              aria-describedby="tip-desc"
            />
          </div>

          {tip.enabled && (
            <div className="space-y-4">
              <div className="flex gap-4 flex-wrap justify-between">
                <input
                  type="text"
                  placeholder="Enter minimum tip amount"
                  value={tip.amount}
                  onChange={(e) =>
                    setTip((prev) => ({ ...prev, amount: e.target.value }))
                  }
                  className="flex-1 px-4 py-4 border border-gray-200 rounded-lg text-[14px] font-inter text-gray-400 placeholder-gray-400"
                />
                <div className="flex items-center justify-between flex-wrap border border-gray-200 rounded-lg w-80 px-4 py-3">
                  <span className="text-[14px] font-inter font-[500] text-black">
                    Allow manual tip entry
                  </span>
                  <ToggleSwitch
                    checked={tip.allowManual}
                    onChange={() =>
                      setTip((prev) => ({
                        ...prev,
                        allowManual: !prev.allowManual,
                      }))
                    }
                  />
                </div>
              </div>

              <div className="flex justify-end mr-40 ">
                <span className="text-[12px] font-inter font-[500] text-cardTitle">
                  Allow manual tip entry
                </span>
              </div>
              <div>
                <div className="flex items-center justify-between  mb-4 border-b py-4">
                  <h4 className="text-[14px] font-inter font-[500] text-textHeading">
                    Allow manual tip entry{" "}
                  </h4>
                  <ToggleSwitch
                    checked={multipleTipOptions.enabled}
                    onChange={handleToggle("multipleTipOptions")}
                  />
                </div>
                <div className="flex items-center justify-between  mb-4">
                  <h4 className="text-[14px] font-inter font-[500] text-textHeading">
                    Multiple tip options for customers
                  </h4>
                  <ToggleSwitch
                    checked={multipleTipOptions.enabled}
                    onChange={handleToggle("multipleTipOptions")}
                  />
                </div>

                {multipleTipOptions.enabled && (
  <div className="space-y-4">
    {/* Replace the single input with mapped inputs */}
    {inputValues.map((input) => (
      <div key={input.id} className="flex gap-4 flex-wrap">
        <input
          type="text"
          placeholder="Enter amount"
          value={input.amount}
          onChange={(e) => handleInputChange(input.id, 'amount', e.target.value)}
          className="flex-1 px-3 py-2 border border-reloadBorder rounded-lg text-[14px] font-inter"
        />
        
        {/* Show delete button only if there's more than one input */}
        {inputValues.length > 1 && (
          <button 
            className="p-2 border border-reloadBorder rounded-lg"
            onClick={() => setInputValues(prevValues => prevValues.filter(item => item.id !== input.id))}
          >
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
          </button>
        )}
        
        {/* Only show the add button on the last input */}
        {input.id === Math.max(...inputValues.map(item => item.id)) && (
          <button
            className="p-2 border border-reloadBorder rounded-lg"
            onClick={addNewInputField}
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
                d="M11.9996 3.59998C12.6624 3.59998 13.1996 4.13723 13.1996 4.79998V10.8H19.1996C19.8624 10.8 20.3996 11.3372 20.3996 12C20.3996 12.6627 19.8623 13.2 19.1996 13.2H13.1996V19.2C13.1996 19.8627 12.6624 20.4 11.9996 20.4C11.3369 20.4 10.7996 19.8627 10.7996 19.2V13.2H4.79961C4.13687 13.2 3.59961 12.6627 3.59961 12C3.59961 11.3372 4.13687 10.8 4.79961 10.8L10.7996 10.8V4.79998C10.7996 4.13723 11.3369 3.59998 11.9996 3.59998Z"
                fill="#212121"
              />
            </svg>
          </button>
        )}
        
        <div className="relative w-[200px]">
          <select 
            className="w-full px-3 py-4 border border-reloadBorder rounded-lg text-[14px] font-inter placeholder:font-[500] placeholder:text-reloadBorder appearance-none"
            value={input.type}
            onChange={(e) => handleInputChange(input.id, 'type', e.target.value)}
          >
            <option className="text-[14px] font-inter font-[500] text-reloadBorder">
              Fixed
            </option>
            <option className="text-[14px] font-inter font-[500] text-reloadBorder">
              Percentage
            </option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M4 6L8 10L12 6"
                stroke="#687182"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    ))}
    
    <p className="text-[12px] text-inter font-[500] ">
      <span className="text-cardTitle text-[12px] font-inter font-[500]">
        {" "}
        Default tip set to
      </span>{" "}
      <span className="text-menuSubHeadingColor text-[12px] text-inter font-[500]">
        ₹10
      </span>
    </p>
    <div className="flex flex-wrap gap-2">
      {multipleTipOptions.options.map((option) => (
        <div
          key={option}
          className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full"
        >
          <span className="text-[14px] font-inter text-gray-700">
            ₹{option}
          </span>
          {/* <button
            onClick={() => removeTipOption(option)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-4 h-4" />
          </button> */}
        </div>
      ))}
    </div>
  </div>
)}
                
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
