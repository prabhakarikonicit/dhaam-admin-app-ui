import React, { useRef,useState } from 'react';
import ToggleSwitch from '../../../common/toggleSwitch';
import FileUpload from '../../../common/fileupload'

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
  value = '', 
  onChange, 
  infoIcon = false, 
  success = false 
}) => {
  return (
    <div className="mb-6">
      <div className="flex items-center mb-1">
        <h3 className="text-[14px] font-inter font-[600] text-headding-color">{label}</h3>
        {infoIcon && (
          <span className="ml-2 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </span>
        )}
      </div>
      {description && <p className="text-[12px] font-inter text-cardTitle mb-2">{description}</p>}
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 placeholder-text-[12px] font-inter text-cardTitle focus:ring-purple-500"
        />
        {success && (
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </span>
        )}
      </div>
    </div>
  );
};

// Color Picker Component
const ColorPicker: React.FC<{
  label: string;
  description?: string;
  color: string;
  onChange?: (color: string) => void;
}> = ({ 
  label, 
  description, 
  color, 
  onChange 
}) => {
  return (
    <div className="mb-6">
      <h3 className="text-[14px] font-inter font-[600] text-headding-color mb-1">{label}</h3>
      {description && <p className="text-[12px] font-inter text-cardTitle mb-2">{description}</p>}
      <div className="flex items-center">
        <div className="flex-1"></div>
        <div className="flex items-center border rounded-md overflow-hidden">
          <span className="w-8 h-8 flex items-center justify-center" style={{ backgroundColor: color }}>
          </span>
          <span className="px-3 py-2 bg-white">{color}</span>
        </div>
      </div>
    </div>
  );
};

// Branding Component
export const Branding: React.FC = () => {
  const [formState, setFormState] = useState({
    email: 'Contact@design-mart.com',
    signature: '',
    customerAppUrl: '',
    merchantAppUrl: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="rounded-lg ">
      <div className="flex justify-between items-center p-4 ">
        <h1 className="text-[14px] font-inter font-[600] text-headding-color">Branding</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 text-[12px] font-inter font-[500] text-paragraphBlack">Cancel</button>
          <button className="px-4 py-2 text-[12px] font-inter font-[500] text-paragraphBlack bg-backgroundWhite rounded-lg border border-reloadBorder">Save</button>
        </div>
      </div>
      <div className="p-6">
      <h2 className="text-[14px] font-inter font-[600] text-headding-color mb-1">Website</h2>
      <p className="text-[12px] font-inter text-cardTitle mb-4">Manage your website's branding, including logos, favicons, and visual identity settings.</p>
      </div>
      <div className="p-6 bg-backgroundWhite">
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
    dashboardTitle: '',
    loginTitle: '',
    loginDescription: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-6 mt-4">
      {/* Dashboard Login Page Settings Card */}
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-[14px] font-inter font-[600] text-headding-color mb-1">Dashboard Login Page Settings</h2>
        <p className="text-[12px] font-inter text-cardTitle mb-6">Customize the login page with a title, description, banner, background image, background color, and branding elements like logos and favicons.</p>
        
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
      
      {/* Login Page Card */}
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-[14px] font-inter font-[600] text-headding-color">Login Page</h2>
        <p className="text-[12px] font-inter text-cardTitle mb-6">Customize the appearance of your login page with a personalized title, description, banner, background image, colors, and logos to enhance your brand identity.</p>
        
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
        
        <ColorPicker 
          label="Background Colour"
          description="Choose a background color to match your brand theme."
          color="#00F5FF"
        />
      </div>
    </div>
  );
};

export default {
  Branding,
  LoginPage
};