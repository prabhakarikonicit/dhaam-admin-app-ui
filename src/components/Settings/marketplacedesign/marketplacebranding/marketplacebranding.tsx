import React, { useState } from "react";
import FileUpload from "../../../common/fileupload";
import ColorPicker from "../../../common/colorpicker";

// Example of how to use these components in a parent component
const BrandingPage: React.FC = () => {
  const [branding, setBranding] = useState({
    headerColor: "#7C43DF",
    headerTextColor: "#FFFFFF",
    headerButtonColor: "#FFFFFF",
    headerButtonTextColor: "#FFFFFF",
    mainBackgroundColor: "#FFFFFF",
    textColor: "#FFFFFF",
    primaryColor: "#FFFFFF",
    secondaryColor: "#FFFFFF",
    accentColor: "#FFFFFF",
    buttonColor: "#FFFFFF",
    buttonTextColor: "#FFFFFF",
    websiteLogo: null as File | null,
    favicon: { name: "favicon.png", size: "139.0 KB" },
    mainLogo: null as File | null,
    ogImage: null as File | null,
    thankYouBanner: null as File | null,
  });

  const handleFileUpload = (file: File, field: string) => {
    setBranding((prev) => ({
      ...prev,
      [field]: file,
    }));
  };

  const handleFileDelete = (field: string) => {
    setBranding((prev) => ({
      ...prev,
      [field]: null,
    }));
  };

  const handleColorChange = (color: string, field: string) => {
    setBranding((prev) => ({
      ...prev,
      [field]: color,
    }));
  };

  return (
    <div className="p-0 max-w-full rounded-lg md:p-0  lg:p-0 lg:p-0 xl:p-0 sm:max-h-full md:max-h-full lg:max-h-full xl:max-h-full max-h-[80vh] overflow-y-auto sm:overflow-visible md:overflow-visible lg:overflow-visible xl:overflow-visible">
      <div className="flex justify-between items-center mb-4 mt-0 sm:mt-10 md:mt-10 lg:mt-10 xl:10 md:px-1 sm:px-1 lg:px-1 xl:px-1">
        <h1 className="md:text-[14px] sm:text-[14px] lg:text-[14px] xl:text-[14px] text-[12px] font-inter font-[600] text-headding-color">
          Branding
        </h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 text-[12px] md:text-[12 px] font-inter font-[500] text-paragraphBlack xl:text-[12px] text-[12px] font-inter font-[600] text-cardValue">
            Discard
          </button>
          <button className="px-4 py-2 text-[12px] font-inter font-[500] text-paragraphBlack bg-backgroundWhite rounded-lg border border-reloadBorderxl:text-[12px] text-[12px] font-inter font-[600] text-whiteColor bg-bgButton">
            Save
          </button>
        </div>
      </div>
      <div className="bg-background-grey p-5 border border-reloadBorder rounded-tl-[12px] rounded-tr-[12px] p-1">
        <h2 className="text-[12px] md:text-[14px] sm:text-[14px] lg:text-[14px] xl:text-[14px] font-inter font-[600] text-headding-color mb-1">
          Marketplace Branding
        </h2>
        <p className="text-[10px] md:text-[12px] sm:text-[12px] lg:text-[12px] xl:text-[12px] font-inter text-cardTitle mb-">
          Customize the visual identity of your marketplace by configuring
          colors, typography, and logos to ensure a consistent brand experience.
        </p>
      </div>
      <div className="bg-white rounded-lg p-4 border border-reloadBorder">
      <div className="bg-backgroundWhite  rounded-lg p-3 mb-6 text-[14px] font-[500]">
        <ColorPicker
          label="Header Color"
          description="Set the background color of the marketplace header."
          color={branding.headerColor}
          onChange={(color) => handleColorChange(color, "headerColor")}
        />

        <ColorPicker
          label="Header Text Color"
          description="Set the text color for the marketplace header."
          color={branding.headerTextColor}
          onChange={(color) => handleColorChange(color, "headerTextColor")}
        />

        <ColorPicker
          label="Header Button Color"
          description="Choose a color for buttons in the header."
          color={branding.headerTextColor}
          onChange={(color) => handleColorChange(color, "headerTextColor")}
        />
        <ColorPicker
          label="Header Button Text Color"
          description="Set the text color for header buttons."
          color={branding.headerTextColor}
          onChange={(color) => handleColorChange(color, "headerTextColor")}
        />
        <ColorPicker
          label="Main Webpage Background Color"
          description="Set the background color of the marketplace."
          color={branding.headerTextColor}
          onChange={(color) => handleColorChange(color, "headerTextColor")}
        />
        <ColorPicker
          label="Text Color (Headings, Titles, Descriptions)"
          description="Define text colors."
          color={branding.headerTextColor}
          onChange={(color) => handleColorChange(color, "headerTextColor")}
        />
        <ColorPicker
          label="Primary Color"
          description="Choose the primary theme color."
          color={branding.headerTextColor}
          onChange={(color) => handleColorChange(color, "headerTextColor")}
        />
        <ColorPicker
          label="Secondary Color"
          description="Choose the secondary theme color."
          color={branding.headerTextColor}
          onChange={(color) => handleColorChange(color, "headerTextColor")}
        />
        <ColorPicker
          label="Accent Color"
          description="Select an accent color to highlight elements."
          color={branding.headerTextColor}
          onChange={(color) => handleColorChange(color, "headerTextColor")}
        />

        <ColorPicker
          label="Button Color"
          description="Set the default button color."
          color={branding.headerTextColor}
          onChange={(color) => handleColorChange(color, "headerTextColor")}
        />
        <ColorPicker
          label="Button Text Color"
          description="Choose the text color for buttons."
          color={branding.headerTextColor}
          onChange={(color) => handleColorChange(color, "headerTextColor")}
        />
        <ColorPicker
          label="Footer Color"
          description="Set the footer background color."
          color={branding.headerTextColor}
          onChange={(color) => handleColorChange(color, "headerTextColor")}
        />
        <ColorPicker
          label="Footer Text Color"
          description="Define the text color for the footer."
          color={branding.headerTextColor}
          onChange={(color) => handleColorChange(color, "headerTextColor")}
        />
      </div>

      
        {/* <h2 className="text-[12px] md:text-[14px] sm:text-[14px] lg:text-[14px] xl:text-[14px] font-inter font-[500] text-textHeading mb-6">
          Website Settings
        </h2> */}

        <div className="mb-6">
          <div className="flex items-start mb-1">
            <h3 className="text-[12px] md:text-[14px] sm:text-[14px] font-inter lg:text-[14px]font-inter xl:text-[14px]font-inter text-textHeading">
              Website Page Title
            </h3>
            <button className="ml-2 text-gray-400">
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
            </button>
          </div>
          <p className="text-[12px] font-inter text-cardTitle mb-2">
            Set the title displayed on browser tabs.
          </p>
          <input
            type="text"
            className="w-full border rounded-md text-[12px] font-inter text-cardTitle p-2"
            placeholder="Enter website title"
          />
        </div>

        <FileUpload
          label="Favicon"
          dimensions="32×32 pixels"
          description="Upload a small icon that represents your website in browser tabs and bookmarks."
          fileInfo={branding.favicon}
          onUpload={(file) => handleFileUpload(file, "favicon")}
          onDelete={() => handleFileDelete("favicon")}
        />

        <FileUpload
          label="Main Logo"
          dimensions="140×40 pixels"
          description="Upload the primary logo for the marketplace."
          onUpload={(file) => handleFileUpload(file, "mainLogo")}
          onDelete={() => handleFileDelete("mainLogo")}
        />

        <FileUpload
          label="OG Image"
          dimensions="1200 × 630 pixels"
          description="Upload an Open Graph image for social sharing previews."
          onUpload={(file) => handleFileUpload(file, "ogImage")}
          onDelete={() => handleFileDelete("ogImage")}
        />

        <FileUpload
          label="Thank You Page Banner"
          dimensions="1080 × 1200 pixels"
          description="Set a banner for the order confirmation page."
          onUpload={(file) => handleFileUpload(file, "thankYouBanner")}
          onDelete={() => handleFileDelete("thankYouBanner")}
        />
      </div>
    </div>
  );
};

export default BrandingPage;
