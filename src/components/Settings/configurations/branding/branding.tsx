import React, { useRef, useState } from "react";
import ToggleSwitch from "../../../common/toggleSwitch";
import FileUpload from "../../../common/fileupload";
import ColorPicker from "../../../common/colorpicker";

// Input Field Component
const InputField: React.FC<{
  label: string;
  description?: string;
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  infoIcon?: boolean;
  success?: boolean;
}> = ({
  label,
  description,
  placeholder,
  value = "",
  onChange,
  infoIcon = false,
  success = false,
}) => {
  return (
    <div className="mb-6 ">
      <div className="flex items-center mb-1 ">
        <h3 className="text-[14px] font-inter font-[500] text-textHeading">
          {label}
        </h3>
        {infoIcon && (
          <span className="ml-2 text-gray-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
            >
              <path
                d="M8.66667 11.1667H8V8.5H7.33333M8 5.83333H8.00667M14 8.5C14 11.8137 11.3137 14.5 8 14.5C4.68629 14.5 2 11.8137 2 8.5C2 5.18629 4.68629 2.5 8 2.5C11.3137 2.5 14 5.18629 14 8.5Z"
                stroke="#636363"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </span>
        )}
      </div>
      {description && (
        <p className="text-[12px] font-inter font-[500] text-cardTitle mb-2">
          {description}
        </p>
      )}
      <div className="relative ">
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full border border-grey-border rounded-custom px-3 py-2 focus:outline-none focus:ring-2 placeholder-text-[12px] font-inter placeholder:text-cardTitle text-cardTitle   focus:ring-purple-500"
        />
        {success && (
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7.99961 14.3996C11.5342 14.3996 14.3996 11.5342 14.3996 7.99961C14.3996 4.46499 11.5342 1.59961 7.99961 1.59961C4.46499 1.59961 1.59961 4.46499 1.59961 7.99961C1.59961 11.5342 4.46499 14.3996 7.99961 14.3996ZM10.9653 6.96529C11.2777 6.65288 11.2777 6.14634 10.9653 5.83392C10.6529 5.5215 10.1463 5.5215 9.83392 5.83392L7.19961 8.46824L6.16529 7.43392C5.85288 7.1215 5.34634 7.1215 5.03392 7.43392C4.7215 7.74634 4.7215 8.25287 5.03392 8.56529L6.63392 10.1653C6.94634 10.4777 7.45288 10.4777 7.76529 10.1653L10.9653 6.96529Z"
                fill="#22B433"
              />
            </svg>
          </span>
        )}
      </div>
    </div>
  );
};

// Branding Component
export const Branding: React.FC = () => {
  const [formState, setFormState] = useState({
    email: "Contact@design-mart.com",
    signature: "",
    customerAppUrl: "",
    merchantAppUrl: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-3xl rounded-custom12px p-0 md:p-0 sm:p-0 lg:p-0 xl:p-0 sm:max-h-full md:max-h-full lg:max-h-full xl:max-h-full max-h-[80vh] overflow-y-auto sm:overflow-visible md:overflow-visible lg:overflow-visible xl:overflow-visible">
      <div className="flex justify-between items-center p-4  mt-0 sm:mt-8 md:mt-8 lg:mt-8 xl:8 md:px-1 sm:px-1 lg:px-1 xl:px-1 ">
        <h1 className="text-[14px] font-inter font-[600] text-headding-color">
          Branding
        </h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 text-[12px] font-inter font-[500] text-paragraphBlack">
            Cancel
          </button>
          <button className="px-4 py-2 text-[12px] font-inter font-[500] text-paragraphBlack bg-backgroundWhite rounded-lg border border-reloadBorder">
            Save
          </button>
        </div>
      </div>
      <div className="p-6 rounded-tl-custom8px rounded-tr-custom8px border border-reloadBorder">
        <h2 className="text-[14px] font-inter font-[500] text-textHeading mb-1">
          Website
        </h2>
        <p className="text-[12px] font-inter font-[500] text-cardTitle mb-4">
          Manage your website's branding, including logos, favicons, and visual
          identity settings.
        </p>
      </div>
      <div className="p-6 bg-backgroundWhite rounded-bl-custom8px rounded-br-custom8px">
        {/* Website Section */}
        <div className="mb-8">
          <div className="bg-backgroundWhite ">
            <FileUpload
              label="Website logo"
              dimensions="140×40 pixels"
              description="Upload and manage your website's logo for branding and visibility."
            />

            <FileUpload
              label="Favicon"
              dimensions="32×32 pixels"
              description="Upload a small icon that represents your website in browser tabs and bookmarks."
              fileInfo={{ name: "favicon.png", size: "139.0 KB" }}
            />
          </div>
        </div>

        {/* Email Section */}
        <div className="mb-8 bg-backgroundWhite">
          <InputField
            label="Mailer Email"
            description="Set the email address used for sending system notifications and communications."
            placeholder="Enter email address"
            value={formState.email}
            onChange={handleInputChange}
            infoIcon={true}
            success={true}
          />

          <InputField
            label="Mailer Signature"
            description="Customize the email signature included in system-generated emails."
            placeholder="Enter mailer signature"
            value={formState.signature}
            onChange={handleInputChange}
            infoIcon={true}
          />
        </div>

        {/* App URLs Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-backgroundWhite ">
          <div>
            <InputField
              label="Customer App Smart URL"
              description="Provide a universal link that directs customers to the appropriate app store or web version based on their device."
              placeholder="Enter the customer app smart URL"
              value={formState.customerAppUrl}
              onChange={handleInputChange}
              infoIcon={true}
            />
          </div>

          <div>
            <InputField
              label="Merchant App Smart URL"
              description="Provide a universal link that directs merchants to the appropriate app store or web version based on their device."
              placeholder="Enter the merchant app smart URL"
              value={formState.merchantAppUrl}
              onChange={handleInputChange}
              infoIcon={true}
            />
          </div>
        </div>
      </div>
      <LoginPage />
    </div>
  );
};

// Login Page Settings Component
export const LoginPage: React.FC = () => {
  const [formState, setFormState] = useState({
    dashboardTitle: "",
    loginTitle: "",
    loginDescription: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-6 mt-4 max-w-full rounded-custom12px p-6 md:p-0 sm:p-0 lg:p-0 xl:p-0 sm:max-h-full md:max-h-full lg:max-h-full xl:max-h-full max-h-[80vh] overflow-y-auto sm:overflow-visible md:overflow-visible lg:overflow-visible xl:overflow-visible">
      <div>
        <div className="rounded-tl-custom8px rounded-tr-custom8px border border-reloadBorder p-6">
          <h2 className="text-[14px] font-inter font-[500] text-headding-color mb-1">
            Dashboard Login Page Settings
          </h2>

          <p className="text-[12px] font-inter font-[500] text-cardTitle mb-6">
            Customize the login page with a title, description, banner,
            background image, background color, and branding elements like logos
            and favicons.
          </p>
        </div>
        {/* Dashboard Login Page Settings Card */}
        <div className="bg-backgroundWhite p-6 rounded-bl-custom8px rounded-br-custom8px border">
          <InputField
            label="Dashboard Page Title"
            description="Set the title that appears on the browser tab for the dashboard."
            placeholder="Enter dashboard title"
            value={formState.dashboardTitle}
            onChange={handleInputChange}
            infoIcon={true}
          />

          <FileUpload
            label="Dashboard Logo"
            dimensions="140×44 pixels"
            description="Upload your dashboard logo to maintain brand consistency."
            fileInfo={{ name: "Website logo main.png", size: "1.0 MB" }}
          />

          <FileUpload
            label="Dashboard Favicon"
            dimensions="32×32 pixels"
            description="Set a small icon for browser tabs and bookmarks."
            fileInfo={{ name: "favicon.png", size: "139.0 KB" }}
          />

          <ColorPicker
            label="Theme colour"
            description="Customize the primary colors of your platform to match your brand identity and enhance the user experience."
            color="#7C43DF"
          />
        </div>
      </div>
      <div>
        <div className="p-6 rounded-tl-custom8px rounded-tr-custom8px border border-reloadBorder mb-0">
          <h2 className="text-[14px] font-inter font-[500] text-textHeading my-0">
            Login Page
          </h2>
          <p className="text-[12px] font-inter font-[500] text-cardTitle mb-4">
            Customize the appearance of your login page with a personalized
            title, description, banner, background image, colors, and logos to
            enhance your brand identity.
          </p>
        </div>
        {/* Login Page Card */}
        <div className="bg-white rounded-lg p-6 my-0">
          <FileUpload
            label="Login Logo"
            dimensions="180×40 pixels"
            description="Upload a logo specifically for the login screen."
            fileInfo={{ name: "Website logo main.png", size: "1.0 MB" }}
          />

          <InputField
            label="Login Page Title"
            description="Set the title displayed on the dashboard login page."
            placeholder="Enter login page title"
            value={formState.loginTitle}
            onChange={handleInputChange}
            infoIcon={true}
          />

          <InputField
            label="Login Page Description"
            description="Add a short description to provide context or instructions for users."
            placeholder="Enter a short description"
            value={formState.loginDescription}
            onChange={handleInputChange}
            infoIcon={true}
          />

          <FileUpload
            label="Banner Image"
            dimensions="512×512 pixels"
            description="Upload a banner image to enhance the login page design."
            fileInfo={{ name: "banner.png", size: "139.0 KB" }}
          />

          <FileUpload
            label="Background Image"
            dimensions="1080×1200 pixels"
            description="Set a custom background image for the login page."
          />
          <div className="mt-14">
            <ColorPicker
              label="Background Colour"
              description="Choose a background color to match your brand theme."
              color="#00F5FF"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default {
  Branding,
  LoginPage,
};
