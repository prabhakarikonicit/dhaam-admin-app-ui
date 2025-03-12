import React, { useState } from "react";
import FileUpload from "../../../common/fileupload";
import ColorPicker from "../../../common/colorpicker";

// Example of how to use these components in a parent component
const CustomerAppDesign: React.FC = () => {
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
    <div className="p-6 bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Branding</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 text-sm">Cancel</button>
          <button className="px-4 py-2 text-sm bg-white border rounded-lg">
            Save
          </button>
        </div>
      </div>
      <div className="bg-background-grey p-5">
        <h2 className="text-[14px] font-inter font-[600] text-headding-color mb-1">
          Customer App Design
        </h2>
        <p className="text-[12px] font-inter text-cardTitle mb-6">
          Customize the visual identity of your marketplace by configuring
          colors, typography, and logos to ensure a consistent brand experience.
        </p>
      </div>
      <div className="bg-white rounded-lg p-6 mb-6">
        <ColorPicker
          label="App Primary Colour"
          description="Choose the main colour for the app theme."
          color={branding.headerColor}
          onChange={(color) => handleColorChange(color, "headerColor")}
        />

        <ColorPicker
          label="App Secondary Color"
          description="Select the secondary color for the app."
          color={branding.headerTextColor}
          onChange={(color) => handleColorChange(color, "headerTextColor")}
        />

        <ColorPicker
          label="App Button Color"
          description="Define button color for consistency."
          color={branding.headerTextColor}
          onChange={(color) => handleColorChange(color, "headerTextColor")}
        />
        <ColorPicker
          label="App Button Text Color"
          description="Set the text color for buttons."
          color={branding.headerTextColor}
          onChange={(color) => handleColorChange(color, "headerTextColor")}
        />
        <ColorPicker
          label="App Header Color"
          description="Set the background color of the marketplace."
          color={branding.headerTextColor}
          onChange={(color) => handleColorChange(color, "headerTextColor")}
        />
        <ColorPicker
          label="App Header Text Color)"
          description="Define text colors."
          color={branding.headerTextColor}
          onChange={(color) => handleColorChange(color, "headerTextColor")}
        />
      </div>

      <div className="bg-white rounded-lg p-6">
        <h2 className="text-lg font-medium mb-2">Onboarding Banner Carousel</h2>
        <p className="text-[12px] font-inter text-cardTitle ">
          {" "}
          Configure the onboarding experience by adding a set of carousel
          banners, titles, and descriptions to guide users through key
          marketplace features.
        </p>
        <div className="mb-6 mt-4">
          <div className="flex items-start mb-1">
            <h3 className="text-base font-medium">
              Onboarding Banner 1 (512 x 512 pixels)
            </h3>
            <button className="ml-2 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>
          <p className="text-sm text-gray-500 mb-2">
            Upload the first onboarding banner image.
          </p>
          {/* <input 
            type="text" 
            className="w-full border rounded-md p-2" 
            placeholder="Enter website title" 
          /> */}
        </div>

        {/* <FileUpload 
          label="Favicon" 
          dimensions="32×32 pixels" 
          description="Upload a small icon that represents your website in browser tabs and bookmarks." 
          fileInfo={branding.favicon}
          onUpload={(file) => handleFileUpload(file, 'favicon')}
          onDelete={() => handleFileDelete('favicon')}
        /> */}

        <FileUpload
          label=""
          dimensions=""
          description=""
          onUpload={(file) => handleFileUpload(file, "mainLogo")}
          onDelete={() => handleFileDelete("mainLogo")}
        />
        <div className="mb-3">
          <p className="text-sm text-gray-500 mb-2">Title 1</p>
          <input
            type="text"
            className="w-full border rounded-md p-2"
            placeholder="Enter website title"
          />
          <p className="text-sm text-gray-500 mb-2">Description 1</p>
          <input
            type="text"
            className="w-full border rounded-md p-2"
            placeholder="Enter website title"
          />
        </div>
        <FileUpload
          label="Onboarding Banner 2"
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

export default CustomerAppDesign;
