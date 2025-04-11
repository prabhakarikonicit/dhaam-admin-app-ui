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
    <div className="max-w-full rounded-lg p-1 md:p-0  lg:p-0 lg:p-0 xl:p-0 sm:max-h-full md:max-h-full lg:max-h-full xl:max-h-full max-h-[80vh] overflow-y-auto sm:overflow-visible md:overflow-visible lg:overflow-visible xl:overflow-visible">
      <div className="flex justify-between items-center mb-6 mt-0 sm:mt-10 md:mt-10 lg:mt-10 xl:10 md:px-1 sm:px-1 lg:px-1 xl:px-1">
        <h1 className="md:text-[14px] sm:text-[14px] lg:text-[14px] xl:text-[14px] text-[12px] font-inter font-[600] text-headding-color">Branding</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 text-[12px] font-inter font-[600] text-paragraphBlack">Discard</button>
          <button className="px-4 py-2 text-[12px] font-inter font-[600] text-whiteColor bg-bgButton rounded-lg border border-reloadBorder">
            Save
          </button>
        </div>
      </div>
      <div className="bg-background-grey p-5 border border-reloadBorder rounded-tl-[12px] rounded-tr-[12px] p-1">
        <h2 className="text-[12px] md:text-[14px] sm:text-[14px] lg:text-[14px] xl:text-[14px] font-inter font-[600] text-headding-color mb-1">
          Customer App Design
        </h2>
        <p className="text-[10px] md:text-[12px] sm:text-[12px] lg:text-[12px] xl:text-[12px] font-inter text-cardTitle mb-6">
          Customize the visual identity of your marketplace by configuring
          colors, typography, and logos to ensure a consistent brand experience.
        </p>
      </div>
      <div className="bg-white rounded-lg p-5 mb-6">
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
        <h2 className="text-[12px] md:text-[14px] sm:text-[14px] lg:text-[14px] xl:text-[14px] font-inter font-[600] text-headding-color mb-2">Onboarding Banner Carousel</h2>
        <p className="text-[10px] md:text-[12px] sm:text-[12px] lg:text-[12px] xl:text-[12px] font-inter text-cardTitle ">
          {" "}
          Configure the onboarding experience by adding a set of carousel
          banners, titles, and descriptions to guide users through key
          marketplace features.
        </p>
        <div className="mb-6 mt-4">
          <div className="flex items-start mb-1">
            <h3 className="text-[12px] md:text-[14px] font-inter sm:text-[14px]font-inter text-textHeading lg:text-[14px] text-textHeading font-inter xl:text-[14px] font-inter text-textHeading mt-3">
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
          <p className="text-[10px] md:text-[12px] font-inter sm:text-[12px] lg:text-[12px] font-inter xl:text-[12px] font-inter text-gray-500 mb-2">
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
          <p className="text-[12px] md:text-[14px] sm:text-[14px] lg:text-[14px] xl:text-[14px] font-inter font-[500] text-headding-color mb-2">Title 1</p>
          <p className="text-[8px] md:text-[10px] sm:text-[12px] lg:text-[12px] xl:text-[12px] font-inter text-cardTitle mb-2">
          Enter the title for the first onboarding step.
</p>
          <input
            type="text"
            className="w-full text-[10px] md:text-[12px] sm:text-[12px] lg:text-[12px] xl:text-[12px] font-inter text-cardTitle rounded-md p-2 mb-2 border border-gray-300 focus:outline-none"
            placeholder="Enter website title"
          />

          <p className="text-[10px] md:text-[12px] sm:text-[12px] lg:text-[12px] xl:text-[12px] md:text-[14px] sm:text-[14px] lg:text-[14px] xl:text-[14px] font-inter font-[5`00] text-headding-color mb-2">Description 1</p>
          <p className="text-[8px] md:text-[10px] sm:text-[12px] lg:text-[10px] xl:text-[12px] font-inter text-cardTitle mb-2">
          Provide a short description for the first step.
</p>
          <input
            type="text"
            className="w-full text-[10px] md:text-[12px] sm:text-[12px] lg:text-[12px] xl:text-[12px] font-inter text-cardTitle rounded-md p-2 mb-2 border border-gray-300 focus:outline-none"
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
        <div className="mb-3">
          <p className="text-[12px] md:text-[14px] sm:text-[14px] lg:text-[14px] xl:text-[14px] font-inter font-[500] text-headding-color mb-2">Title 2</p>
          <p className="text-[8px] md:text-[10px] sm:text-[12px] lg:text-[10px] xl:text-[12px] font-inter text-cardTitle mb-2">
          Enter the title for the first onboarding step.
</p>
          <input
            type="text"
            className="w-full text-[10px] md:text-[12px] sm:text-[12px] lg:text-[12px] xl:text-[12px] font-inter text-cardTitle rounded-md p-2 mb-2 border border-gray-300 focus:outline-none"
            placeholder="Enter website title"
          />

          <p className="text-[10px] md:text-[12px] sm:text-[12px] lg:text-[12px] xl:text-[12px] md:text-[14px] sm:text-[14px] lg:text-[14px] xl:text-[14px] font-inter font-[500] text-headding-color mb-2">Description 2</p>
          <p className="text-[8px] md:text-[10px] sm:text-[12px] lg:text-[10px] xl:text-[12px] font-inter text-cardTitle mb-2">
          Provide a short description for the first step.
</p>
          <input
            type="text"
            className="w-full text-[10px] md:text-[12px] sm:text-[12px] lg:text-[12px] xl:text-[12px] font-inter text-cardTitle rounded-md p-2 mb-2 border border-gray-300 focus:outline-none"
            placeholder="Enter website title"
          />

        </div>
        <FileUpload
          label="Onboarding Banner 3"
          dimensions="1080 × 1200 pixels"
          description="Upload the first onboarding banner image.."
          onUpload={(file) => handleFileUpload(file, "thankYouBanner")}
          onDelete={() => handleFileDelete("thankYouBanner")}
        />

        <div className="mb-3">
          <p className="text-[12px] md:text-[14px] sm:text-[14px] lg:text-[14px] xl:text-[14px] font-inter font-[500] text-headding-color mb-2">Title 3</p>
          <p className="text-[8px] md:text-[10px] sm:text-[12px] lg:text-[10px] xl:text-[12px] font-inter text-cardTitle mb-2">
          Enter the title for the first onboarding step.
</p>
          <input
            type="text"
            className="w-full text-[10px] md:text-[12px] sm:text-[12px] lg:text-[12px] xl:text-[12px] font-inter text-cardTitle rounded-md p-2 mb-2 border border-gray-300 focus:outline-none"
            placeholder="Enter website title"
          />

          <p className="text-[12px] md:text-[14px] sm:text-[14px] lg:text-[14px] xl:text-[14px] font-inter font-[500] text-headding-color mb-2">Description 3</p>
         
          <p className="text-[8px] md:text-[10px] sm:text-[12px] lg:text-[10px] xl:text-[12px] font-inter text-cardTitle mb-2">
          Provide a short description for the first step.
</p><input
            type="text"
            className="w-full text-[10px] md:text-[12px] sm:text-[12px] lg:text-[12px] xl:text-[12px] font-inter text-cardTitle rounded-md p-2 mb-2 border border-gray-300 focus:outline-none"
            placeholder="Enter website title"
          />

        </div>
      </div>
    </div>
  );
};

export default CustomerAppDesign;
