import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import ToggleSwitch from "../../../common/toggleSwitch";

interface CustomerRightsProps {
  onClose: () => void;
  onSave: (data: any) => void;
}
const CustomerRights: React.FC<CustomerRightsProps> = ({ onClose, onSave }) => {
  const [selectedAction, setSelectedAction] = useState("");
  const [description, setDescription] = useState("");
  const [allowGDPRAccess, setAllowGDPRAccess] = useState(false);

  const handleSubmit = () => {
    onSave({
      action: selectedAction,
      description,
      allowGDPRAccess,
    });
  };

  const handleToggle = (e: React.MouseEvent) => {
    setAllowGDPRAccess(!allowGDPRAccess);
  };

  return (
    <div className="max-w-full rounded-custom12px p-6 md:p-0 sm:p-0 lg:p-0 xl:p-0 sm:max-h-full md:max-h-full lg:max-h-full xl:max-h-full max-h-[80vh] overflow-y-auto sm:overflow-visible md:overflow-visible lg:overflow-visible xl:overflow-visible">
      {/* Header */}
      <div className="flex items-center justify-between py-1 mt-0 sm:mt-6 md:mt-8 lg:mt-12 xl-mt-12">
        <h2 className="text-[14px] font-inter font-[600] text-headding-color">
          Customer Rights
        </h2>
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-[12px] font-inter font-[600] text-paragraphBlack"
          >
            Discard
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-[12px] font-inter font-[600] text-whiteColor bg-bgButton border border-reloadBorder rounded-custom"
          >
            Save
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="">
        <div className="space-y-6 p-6 bg-backgroundWhite rounded-custom12px">
          {/* GDPR Section */}
          <div>
            <h3 className="text-[14px] font-inter font-[500] text-textHeading">
              GDPR User Rights
            </h3>
            <p className="text-[12px] font-inter font-[500] text-cardTitle mt-1">
              GDPR gives EU citizens more control over their data and simplifies
              regulations for businesses in the digital economy.
            </p>
          </div>

          {/* Action Dropdown */}
          <div>
            <label className="block text-[12px] font-inter font-[500] text-paragraphBlack mb-2">
              What do you want to get done?{" "}
              <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                value={selectedAction}
                onChange={(e) => setSelectedAction(e.target.value)}
                className={`
                  w-full px-3 py-4 text-[14px] font-[400] text-reloadBorder rounded-custom8px font-inter bg-white 
                  border border-gray-200 rounded-lg appearance-none pr-10
                  ${
                    selectedAction ? "text-paragraphBlack" : "text-reloadBorder"
                  }
                `}
              >
                <option
                  value=""
                  className="text-[14px] font-inter font-[500] text-paragraphBlack"
                >
                  Right to be forgotten
                </option>
                <option
                  value="access"
                  className="text-[14px] font-inter font-[500] text-paragraphBlack"
                >
                  Right to access
                </option>
                <option
                  value="rectification"
                  className="text-[14px] font-inter font-[500] text-paragraphBlack"
                >
                  Right to rectification
                </option>
                <option
                  value="erasure"
                  className="text-[14px] font-inter font-[500] text-paragraphBlack"
                >
                  Right to erasure
                </option>
              </select>

              <div className="absolute right-5 top-1/3 transform -translate-y-1/2 text-gray-500 w-4 h-4">
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
                    d="M5.29289 7.29289C5.68342 6.90237 6.31658 6.90237 6.70711 7.29289L10 10.5858L13.2929 7.29289C13.6834 6.90237 14.3166 6.90237 14.7071 7.29289C15.0976 7.68342 15.0976 8.31658 14.7071 8.70711L10.7071 12.7071C10.3166 13.0976 9.68342 13.0976 9.29289 12.7071L5.29289 8.70711C4.90237 8.31658 4.90237 7.68342 5.29289 7.29289Z"
                    fill="#949494"
                  />
                </svg>
              </div>
              {/* <ChevronDown  /> */}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-[12px] font-inter font-[500] text-paragraphBlack mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description here..."
              className="w-full px-3 py-2 placeholder:text-[14px] placeholder:font-[400] border border-reloadBorder placeholder:text-reloadBorder rounded-custom8px font-inter min-h-[100px] resize-none"
            />
          </div>
        </div>
        {/* Toggle Section */}
        <div className="flex items-center justify-between py-6 p-6 bg-backgroundWhite rounded-custom12px mt-4">
          <span
            id="gdpr-access-label"
            className="text-[14px] font-inter font-[500] text-textHeading"
          >
            Allow customers to access their GDPR User Rights
          </span>
          <ToggleSwitch
            checked={allowGDPRAccess}
            onChange={handleToggle}
            // aria-labelledby="gdpr-access-label"
          />
        </div>
      </div>
    </div>
  );
};

export default CustomerRights;
