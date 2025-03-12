import React, { useState } from 'react';
import FileUpload from '../../../common/fileupload';
import ColorPicker from '../../../common/colorpicker';

// Example of how to use these components in a parent component
const BrandingPage: React.FC = () => {
  const [branding, setBranding] = useState({
    headerColor: '#7C43DF',
    headerTextColor: '#FFFFFF',
    headerButtonColor: '#FFFFFF',
    headerButtonTextColor: '#FFFFFF',
    mainBackgroundColor: '#FFFFFF',
    textColor: '#FFFFFF',
    primaryColor: '#FFFFFF',
    secondaryColor: '#FFFFFF',
    accentColor: '#FFFFFF',
    buttonColor: '#FFFFFF',
    buttonTextColor: '#FFFFFF',
    websiteLogo: null as File | null,
    favicon: { name: 'favicon.png', size: '139.0 KB' },
    mainLogo: null as File | null,
    ogImage: null as File | null,
    thankYouBanner: null as File | null
  });

  const handleFileUpload = (file: File, field: string) => {
    setBranding(prev => ({
      ...prev,
      [field]: file
    }));
  };

  const handleFileDelete = (field: string) => {
    setBranding(prev => ({
      ...prev,
      [field]: null
    }));
  };

  const handleColorChange = (color: string, field: string) => {
    setBranding(prev => ({
      ...prev,
      [field]: color
    }));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Branding</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 text-sm">Cancel</button>
          <button className="px-4 py-2 text-sm bg-white border rounded-lg">Save</button>
        </div>
      </div>
      <div className="bg-background-grey p-5">
      <h2 className="text-[14px] font-inter font-[600] text-headding-color mb-1">Marketplace Branding</h2>
      <p className="text-[12px] font-inter text-cardTitle mb-6">Customize the visual identity of your marketplace by configuring colors, typography, and logos to ensure a consistent brand experience.</p>
      </div>
      <div className="bg-white rounded-lg p-6 mb-6">
        <ColorPicker 
          label="Header Color" 
          description="Set the background color of the marketplace header." 
          color={branding.headerColor}
          onChange={(color) => handleColorChange(color, 'headerColor')}
        />
        
        <ColorPicker 
          label="Header Text Color" 
          description="Set the text color for the marketplace header." 
          color={branding.headerTextColor}
          onChange={(color) => handleColorChange(color, 'headerTextColor')}
        />

        <ColorPicker 
          label="Header Button Color" 
          description="Choose a color for buttons in the header." 
          color={branding.headerTextColor}
          onChange={(color) => handleColorChange(color, 'headerTextColor')}
        />
         <ColorPicker 
          label="Header Button Text Color" 
          description="Set the text color for header buttons." 
          color={branding.headerTextColor}
          onChange={(color) => handleColorChange(color, 'headerTextColor')}
        />
         <ColorPicker 
          label="Main Webpage Background Color" 
          description="Set the background color of the marketplace." 
          color={branding.headerTextColor}
          onChange={(color) => handleColorChange(color, 'headerTextColor')}
        />
         <ColorPicker 
          label="Text Color (Headings, Titles, Descriptions)" 
          description="Define text colors." 
          color={branding.headerTextColor}
          onChange={(color) => handleColorChange(color, 'headerTextColor')}
        />
         <ColorPicker 
          label="Primary Color" 
          description="Choose the primary theme color." 
          color={branding.headerTextColor}
          onChange={(color) => handleColorChange(color, 'headerTextColor')}
        />
         <ColorPicker 
          label="Secondary Color" 
          description="Choose the secondary theme color." 
          color={branding.headerTextColor}
          onChange={(color) => handleColorChange(color, 'headerTextColor')}
        />
         <ColorPicker 
          label="Accent Color" 
          description="Select an accent color to highlight elements." 
          color={branding.headerTextColor}
          onChange={(color) => handleColorChange(color, 'headerTextColor')}
        />

        <ColorPicker 
          label="Button Color" 
          description="Set the default button color." 
          color={branding.headerTextColor}
          onChange={(color) => handleColorChange(color, 'headerTextColor')}
        />
        <ColorPicker 
          label="Button Text Color" 
          description="Choose the text color for buttons." 
          color={branding.headerTextColor}
          onChange={(color) => handleColorChange(color, 'headerTextColor')}
        />
        <ColorPicker 
          label="Footer Color" 
          description="Set the footer background color." 
          color={branding.headerTextColor}
          onChange={(color) => handleColorChange(color, 'headerTextColor')}
        />
         <ColorPicker 
          label="Footer Text Color" 
          description="Define the text color for the footer." 
          color={branding.headerTextColor}
          onChange={(color) => handleColorChange(color, 'headerTextColor')}
        />
       
      </div>
      
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-lg font-medium mb-6">Website Settings</h2>
        
        <div className="mb-6">
          <div className="flex items-start mb-1">
            <h3 className="text-base font-medium">Website Page Title</h3>
            <button className="ml-2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>
          <p className="text-sm text-gray-500 mb-2">Set the title displayed on browser tabs.</p>
          <input 
            type="text" 
            className="w-full border rounded-md p-2" 
            placeholder="Enter website title" 
          />
        </div>
        
        <FileUpload 
          label="Favicon" 
          dimensions="32×32 pixels" 
          description="Upload a small icon that represents your website in browser tabs and bookmarks." 
          fileInfo={branding.favicon}
          onUpload={(file) => handleFileUpload(file, 'favicon')}
          onDelete={() => handleFileDelete('favicon')}
        />
        
        <FileUpload 
          label="Main Logo" 
          dimensions="140×40 pixels" 
          description="Upload the primary logo for the marketplace." 
          onUpload={(file) => handleFileUpload(file, 'mainLogo')}
          onDelete={() => handleFileDelete('mainLogo')}
        />
        
        <FileUpload 
          label="OG Image" 
          dimensions="1200 × 630 pixels" 
          description="Upload an Open Graph image for social sharing previews." 
          onUpload={(file) => handleFileUpload(file, 'ogImage')}
          onDelete={() => handleFileDelete('ogImage')}
        />
        
        <FileUpload 
          label="Thank You Page Banner" 
          dimensions="1080 × 1200 pixels" 
          description="Set a banner for the order confirmation page." 
          onUpload={(file) => handleFileUpload(file, 'thankYouBanner')}
          onDelete={() => handleFileDelete('thankYouBanner')}
        />
      </div>
    </div>
  );
};

export default BrandingPage ;