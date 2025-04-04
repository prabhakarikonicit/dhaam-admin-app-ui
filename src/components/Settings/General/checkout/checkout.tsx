import React, { useState } from "react";
import ToggleSwitch from "../../../common/toggleSwitch";
import { ChevronDown, Plus, X } from "lucide-react";
import CustomModal from "../../../common/modals";

interface CheckoutProps {
  onClose: () => void;
  onSave: (data: any) => void;
}
interface CustomField {
  id: number;
  title: string;
  placeholder: string;
  type: string;
  compulsory: boolean;
}
const Checkout: React.FC<CheckoutProps> = ({ onClose, onSave }) => {
  // State for all form fields
  const [sideOrder, setSideOrder] = useState(false);
  const [outstandingPayment, setOutstandingPayment] = useState(false);
  const [mandatoryOption, setMandatoryOption] = useState(false);

  const [deliveryModes, setDeliveryModes] = useState({
    takeAway: true,
    homeDelivery: false,
  });
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
  const [customFields, setCustomFields] = useState([
    {
      id: 1,
      title: "Delivery Instructions",
      placeholder: "Write here!",
      type: "Text area",
      compulsory: true,
    },
  ]);
  const [newField, setNewField] = useState({
    title: "",
    placeholder: "",
    type: "Text",
    compulsory: false,
  });

  // Add this function to handle adding a new field
  const addCustomField = () => {
    if (newField.title.trim()) {
      setCustomFields([...customFields, { ...newField, id: Date.now() }]);
      setNewField({
        title: "",
        placeholder: "",
        type: "Text",
        compulsory: false,
      });
    }
  };

  // Add this function to handle removing a field
  const removeCustomField = (id: number) => {
    setCustomFields(customFields.filter((field) => field.id !== id));
  };
  const handleToggle = (field: string) => (e: React.MouseEvent) => {
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
        setCustomOrderFields(!mandatoryOption);
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

  return (
    <div className="max-w-full rounded-custom12px p-6 md:p-0 sm:p-0 lg:p-0 xl:p-0 sm:max-h-full md:max-h-full lg:max-h-full xl:max-h-full max-h-[80vh] overflow-y-auto sm:overflow-visible md:overflow-visible lg:overflow-visible xl:overflow-visible ">
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
            onClick={() =>
              onSave({
                sideOrder,
                outstandingPayment,
                mandatoryOption,
                deliveryModes,
                deliveryTime,
                customOrderFields,
                eta,
                googleMapApiKey,
                deliveryCharge,
                tip,
                multipleTipOptions,
              })
            }
            className="px-4 py-2 text-[12px] font-inter font-[600] text-whiteColor bg-bgButton border border-reloadBorder rounded-custom"
          >
            Save
          </button>
        </div>
      </div>

      <div className="p-6 md:p-0 sm:p-0 lg:p-0 xl:p-0 space-y-6">
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
          <div className="flex items-center justify-between">
            <div>
              <h3
                id="side-order-title"
                className="text-[14px] font-inter font-[500] my-2 text-textHeading"
              >
                Outstanding Payment
              </h3>
              <p
                id="side-order-desc"
                className="text-[12px] font-inter font-[500] text-cardTitle border-b pb-3"
              >
                Add debt to a customer’s account for outstanding payments,
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
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
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
                      fill-rule="evenodd"
                      clip-rule="evenodd"
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
  <CustomModal
    title="Custom Order Fields"
    isOpen={showCustomFieldsModal}
    mode="edit"
    onClose={() => setShowCustomFieldsModal(false)}
    onSave={() => {
      // Save the custom fields data
      setShowCustomFieldsModal(false);
    }}
  >
            <div className="w-full p-6">
              {/* Existing fields */}
              {customFields.map((field, index) => (
                <div key={field.id} className="mb-4 flex items-center gap-4">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={field.title}
                      onChange={(e) => {
                        const updatedFields = [...customFields];
                        updatedFields[index].title = e.target.value;
                        setCustomFields(updatedFields);
                      }}
                      placeholder="Field Title"
                      className="w-full p-3 border border-gray-200 rounded-lg text-[14px] font-inter"
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      value={field.placeholder}
                      onChange={(e) => {
                        const updatedFields = [...customFields];
                        updatedFields[index].placeholder = e.target.value;
                        setCustomFields(updatedFields);
                      }}
                      placeholder="Field Placeholder"
                      className="w-full p-3 border border-gray-200 rounded-lg text-[14px] font-inter"
                    />
                  </div>
                  <div className="w-40">
                    <div className="relative">
                      <select
                        value={field.type}
                        onChange={(e) => {
                          const updatedFields = [...customFields];
                          updatedFields[index].type = e.target.value;
                          setCustomFields(updatedFields);
                        }}
                        className="w-full p-3 border border-gray-200 rounded-lg text-[14px] font-inter appearance-none pr-10"
                      >
                        <option value="Text">Text</option>
                        <option value="Text area">Text area</option>
                        <option value="Number">Number</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <ChevronDown size={16} className="text-gray-500" />
                      </div>
                    </div>
                  </div>
                  <div className="w-10">
                    <button
                      className="p-2 text-gray-500 hover:text-red-500"
                      onClick={() => removeCustomField(field.id)}
                    >
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
                        <path d="M3 6h18"></path>
                        <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
                      </svg>
                    </button>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2 text-[14px] font-inter">
                      Compulsory
                    </span>
                    <div className="relative inline-block w-10 align-middle select-none">
                      <input
                        type="checkbox"
                        checked={field.compulsory}
                        onChange={() => {
                          const updatedFields = [...customFields];
                          updatedFields[index].compulsory =
                            !updatedFields[index].compulsory;
                          setCustomFields(updatedFields);
                        }}
                        className="sr-only"
                        id={`compulsory-${field.id}`}
                      />
                      <label
                        htmlFor={`compulsory-${field.id}`}
                        className={`block h-6 rounded-full ${
                          field.compulsory ? "bg-[#7E3AF2]" : "bg-gray-300"
                        } cursor-pointer`}
                      >
                        <span
                          className={`absolute w-4 h-4 mt-1 transform bg-white rounded-full transition-transform duration-200 ease-in-out ${
                            field.compulsory
                              ? "translate-x-5 ml-1"
                              : "translate-x-1"
                          }`}
                        ></span>
                      </label>
                    </div>
                  </div>
                </div>
              ))}

              {/* Add new field form */}
              <div className="mt-6 flex items-center gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    value={newField.title}
                    onChange={(e) =>
                      setNewField({ ...newField, title: e.target.value })
                    }
                    placeholder="Field Title"
                    className="w-full p-3 border border-gray-200 rounded-lg text-[14px] font-inter"
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    value={newField.placeholder}
                    onChange={(e) =>
                      setNewField({ ...newField, placeholder: e.target.value })
                    }
                    placeholder="Field Placeholder"
                    className="w-full p-3 border border-gray-200 rounded-lg text-[14px] font-inter"
                  />
                </div>
                <div className="w-40">
                  <div className="relative">
                    <select
                      value={newField.type}
                      onChange={(e) =>
                        setNewField({ ...newField, type: e.target.value })
                      }
                      className="w-full p-3 border border-gray-200 rounded-lg text-[14px] font-inter appearance-none pr-10"
                    >
                      <option value="Text">Text</option>
                      <option value="Text area">Text area</option>
                      <option value="Number">Number</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <ChevronDown size={16} className="text-gray-500" />
                    </div>
                  </div>
                </div>
                <div className="w-10">
                  <button
                    className="p-2 text-gray-500 hover:text-green-500"
                    onClick={addCustomField}
                  >
                    <Plus size={20} />
                  </button>
                </div>
                <div className="flex items-center">
                  <span className="mr-2 text-[14px] font-inter">
                    Compulsory
                  </span>
                  <div className="relative inline-block w-10 align-middle select-none">
                    <input
                      type="checkbox"
                      checked={newField.compulsory}
                      onChange={() =>
                        setNewField({
                          ...newField,
                          compulsory: !newField.compulsory,
                        })
                      }
                      className="sr-only"
                      id="compulsory-new"
                    />
                    <label
                      htmlFor="compulsory-new"
                      className={`block h-6 rounded-full ${
                        newField.compulsory ? "bg-[#7E3AF2]" : "bg-gray-300"
                      } cursor-pointer`}
                    >
                      <span
                        className={`absolute w-4 h-4 mt-1 transform bg-white rounded-full transition-transform duration-200 ease-in-out ${
                          newField.compulsory
                            ? "translate-x-5 ml-1"
                            : "translate-x-1"
                        }`}
                      ></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </CustomModal>
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
        <div className="">
          <div className="border border-reloadBorder rounded-tl-[12px] rounded-tr-[12px] p-6">
            <h3 className="text-[14px] font-inter text-textHeading">
              Delivery Charge
            </h3>
            <p className="text-[12px] font-inter text-cardTitle mb-4">
              Set the charge for delivery on orders.
            </p>
          </div>
          <div className="flex gap-4 p-4 bg-backgroundWhite border rounded-bl-[12px] rounded-br-[12px]">
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
              className="flex-1 p-4 border border-reloadBorder w-10 rounded-lg text-[14px] font-inter"
            />
            <select
              value={deliveryCharge.type}
              onChange={(e) =>
                setDeliveryCharge((prev) => ({ ...prev, type: e.target.value }))
              }
              className="px-3 py-2 border border-reloadBorder rounded-lg text-[14px] font-inter"
            >
              <option>Fixed</option>
              <option>Percentage</option>
            </select>
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
                    <div className="flex gap-4 flex-wrap">
                      <input
                        type="text"
                        placeholder="Enter amount"
                        className="flex-1 px-3 py-2 border border-reloadBorder rounded-lg text-[14px] font-inter"
                      />
                      <button className="p-2 border border-reloadBorder rounded-lg">
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
                            d="M11.9996 3.59998C12.6624 3.59998 13.1996 4.13723 13.1996 4.79998V10.8H19.1996C19.8624 10.8 20.3996 11.3372 20.3996 12C20.3996 12.6627 19.8623 13.2 19.1996 13.2H13.1996V19.2C13.1996 19.8627 12.6624 20.4 11.9996 20.4C11.3369 20.4 10.7996 19.8627 10.7996 19.2V13.2H4.79961C4.13687 13.2 3.59961 12.6627 3.59961 12C3.59961 11.3372 4.13687 10.8 4.79961 10.8L10.7996 10.8V4.79998C10.7996 4.13723 11.3369 3.59998 11.9996 3.59998Z"
                            fill="#212121"
                          />
                        </svg>
                      </button>
                      <select className="px-3 py-2 border border-reloadBorder rounded-lg text-[14px] font-inter placeholder:font-[500] placeholder:text-reloadBorder">
                        <option className="text-[14px] font-inter font-[500] text-reloadBorder">
                          Fixed
                        </option>
                        <option className="text-[14px] font-inter font-[500] text-reloadBorder">
                          Percentage
                        </option>
                      </select>
                    </div>
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
