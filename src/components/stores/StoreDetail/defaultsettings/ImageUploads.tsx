import React, { useRef, useState, useEffect } from 'react';

interface ImageUploadsProps {
  defaultProfileImage?: string;
  defaultStoreBanner?: string;
}

const ImageUploads: React.FC<ImageUploadsProps> = ({ 
  defaultProfileImage, 
  defaultStoreBanner 
}) => {
  // State for image uploads
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(null);
  const [storeBanner, setStoreBanner] = useState<File | null>(null);
  const [storeBannerPreview, setStoreBannerPreview] = useState<string | null>(null);
  const [mobileBanner, setMobileBanner] = useState<File | null>(null);
  const [mobileBannerPreview, setMobileBannerPreview] = useState<string | null>(null);

  // Refs for file inputs
  const profileImageInputRef = useRef<HTMLInputElement>(null);
  const storeBannerInputRef = useRef<HTMLInputElement>(null);
  const mobileBannerInputRef = useRef<HTMLInputElement>(null);

  // Set defaults on component mount
  useEffect(() => {
    if (!profileImagePreview && defaultProfileImage) {
      setProfileImagePreview(defaultProfileImage);
    }
    if (!storeBannerPreview && defaultStoreBanner) {
      setStoreBannerPreview(defaultStoreBanner);
    }
  }, [defaultProfileImage, defaultStoreBanner, profileImagePreview, storeBannerPreview]);

  // Handle profile image upload
  const handleProfileImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(file);
      setProfileImagePreview(URL.createObjectURL(file));
    }
  };

  // Handle store banner upload
  const handleStoreBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setStoreBanner(file);
      setStoreBannerPreview(URL.createObjectURL(file));
    }
  };

  // Handle mobile banner upload
  const handleMobileBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setMobileBanner(file);
      setMobileBannerPreview(URL.createObjectURL(file));
    }
  };

  // Handle remove profile image
  const handleRemoveProfileImage = () => {
    setProfileImage(null);
    setProfileImagePreview(null);
    if (profileImageInputRef.current) {
      profileImageInputRef.current.value = "";
    }
  };

  // Handle remove store banner
  const handleRemoveStoreBanner = () => {
    setStoreBanner(null);
    setStoreBannerPreview(null);
    if (storeBannerInputRef.current) {
      storeBannerInputRef.current.value = "";
    }
  };

  // Handle remove mobile banner
  const handleRemoveMobileBanner = () => {
    setMobileBanner(null);
    setMobileBannerPreview(null);
    if (mobileBannerInputRef.current) {
      mobileBannerInputRef.current.value = "";
    }
  };

  // Edit profile image
  const handleEditProfileImage = () => {
    if (profileImageInputRef.current) {
      profileImageInputRef.current.click();
    }
  };

  // Edit store banner
  const handleEditStoreBanner = () => {
    if (storeBannerInputRef.current) {
      storeBannerInputRef.current.click();
    }
  };

  // Edit mobile banner
  const handleEditMobileBanner = () => {
    if (mobileBannerInputRef.current) {
      mobileBannerInputRef.current.click();
    }
  };

  // Handle mobile banner drag and drop
  const handleMobileBannerDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setMobileBanner(file);
      setMobileBannerPreview(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className="bg-background-grey p-5 rounded-custom8px">
      {/* Hidden file inputs */}
      <input
        type="file"
        ref={profileImageInputRef}
        onChange={handleProfileImageUpload}
        accept="image/*"
        style={{ display: "none" }}
      />
      <input
        type="file"
        ref={storeBannerInputRef}
        onChange={handleStoreBannerUpload}
        accept="image/*"
        style={{ display: "none" }}
      />
      <input
        type="file"
        ref={mobileBannerInputRef}
        onChange={handleMobileBannerUpload}
        accept="image/*"
        style={{ display: "none" }}
      />

      {/* Profile Image Preview */}
      <div className="flex justify-center mb-5">
        <div className="relative">
          <div
            className="w-48 h-48 rounded-custom160px overflow-hidden bg-gray-200 border border-gray-300 flex items-center justify-center relative cursor-pointer"
            onClick={handleEditProfileImage}
          >
            {profileImagePreview ? (
              <img
                src={profileImagePreview}
                alt="Profile Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-gray-400 text-xs text-center p-4">
                Click to upload profile image
              </div>
            )}
            {profileImagePreview && (
              <div
                className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveProfileImage();
                }}
              >
                <span className="text-[12px] font-[600] text-whiteColor font-inter">
                  Remove
                </span>
              </div>
            )}
          </div>
          <button
            className="absolute -right-1 bottom-0 bg-white rounded-custom30px p-3 border border-reloadBorder"
            onClick={handleEditProfileImage}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
            >
              <path
                d="M12.1899 1.81004C11.6431 1.26331 10.7567 1.26331 10.21 1.81004L4.8999 7.1201V9.1H6.8798L12.1899 3.78994C12.7366 3.24321 12.7366 2.35678 12.1899 1.81004Z"
                fill="#212121"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M1.3999 4.19999C1.3999 3.4268 2.0267 2.79999 2.7999 2.79999H5.5999C5.9865 2.79999 6.2999 3.11339 6.2999 3.49999C6.2999 3.88659 5.9867 4.19999 5.5999 4.19999H2.7999V11.2H9.7999V8.39999C9.7999 8.0134 10.1133 7.69999 10.4999 7.69999C10.8865 7.69999 11.1999 8.0134 11.1999 8.39999V11.2C11.1999 11.9732 10.5731 12.6 9.7999 12.6H2.7999C2.0267 12.6 1.3999 11.9732 1.3999 11.2V4.19999Z"
                fill="#212121"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="border-t border-grey-border pt-5 mb-2">
        {/* Store Banner Web */}
        <h2 className="text-textHeading font-inter font-[500] text-[14px] mb-2">
          Store Banner Web{" "}
          <span className="text-headding-color font-inter font-[500] text-[14px]">
            (1440×320 pixels)
          </span>
        </h2>
        <div className="relative rounded-md overflow-hidden mb-5 ">
          {storeBannerPreview ? (
            // Banner preview when image is uploaded
            <div className="relative h-80 bg-gray-200 rounded-custom12px overflow-hidden ">
              <img
                src={storeBannerPreview}
                alt="Banner Preview"
                className="w-full h-full object-cover"
              />
              {/* Overlay Layer */}
              <div className="absolute inset-0 bg-black bg-opacity-50"></div>

              <div className="absolute top-3 right-3">
                <button
                  className="p-2"
                  onClick={handleRemoveStoreBanner}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                  >
                    <path
                      d="M25.3335 9.33333L24.1771 25.5233C24.0774 26.9188 22.9162 28 21.5172 28H10.4831C9.08411 28 7.92293 26.9188 7.82326 25.5233L6.66683 9.33333M13.3335 14.6667V22.6667M18.6668 14.6667V22.6667M20.0002 9.33333V5.33333C20.0002 4.59695 19.4032 4 18.6668 4H13.3335C12.5971 4 12.0002 4.59695 12.0002 5.33333V9.33333M5.3335 9.33333H26.6668"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
              </div>

              <div className="absolute bottom-0 left-0 right-0 text-white px-3 py-2 text-xs flex justify-between items-center">
                <div className="font-inter text-[16px] font-[400] text-whiteColor">
                  {storeBanner?.name || "store banner.png"}
                  <div className="mt-1 text-[12px] font-[500] font-inter text-whiteColor">
                    {storeBanner
                      ? `${Math.round(storeBanner.size / 1024)} KB`
                      : "341 KB"}
                  </div>
                </div>

                <button
                  className="bg-backgroundWhite font-inter text-[12px] backdrop-blur-[18px] font-[600] text-cardValue px-6 py-2 rounded-custom border border-reloadBorder"
                  onClick={handleEditStoreBanner}
                >
                  Change
                </button>
              </div>
            </div>
          ) : (
            // Upload UI when no image is set
            <div
              className="h-60 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center cursor-pointer p-4"
              onClick={handleEditStoreBanner}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-400 mb-2"
              >
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" />
              </svg>
              <p className="text-gray-500 font-inter font-[400] text-[14px] text-center">
                Click to upload store banner
                <br />
                (1440×320 pixels)
              </p>
            </div>
          )}
        </div>

        {/* Store Banner Mobile */}
        <h2 className="text-textHeading font-inter font-[500] text-[14px] mb-3">
          Store Banner Mobile{" "}
          <span className="text-headding-color font-inter font-[500] text-[14px]">
            (320×160 pixels)
          </span>
        </h2>
        {mobileBannerPreview ? (
          // Mobile banner preview when uploaded
          <div className="relative h-40 bg-gray-200 rounded-md overflow-hidden mb-4">
            <img
              src={mobileBannerPreview}
              alt="Mobile Banner Preview"
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 right-2">
              <button
                className="bg-white p-1 rounded-full shadow-sm hover:bg-gray-100"
                onClick={handleRemoveMobileBanner}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
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
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white px-2 py-1 text-xs flex justify-between items-center">
              <div>
                {mobileBanner?.name || "mobile banner.png"}
                <span className="ml-2">
                  {mobileBanner
                    ? `${Math.round(mobileBanner.size / 1024)} KB`
                    : "120 KB"}
                </span>
              </div>
              <button
                className="bg-white text-black text-xs px-3 py-1 rounded"
                onClick={handleEditMobileBanner}
              >
                Change
              </button>
            </div>
          </div>
        ) : (
          // Drag and drop area for mobile banner
          <div
            className="border-2 border-dashed border-reloadBorder rounded-custom10px p-6 flex flex-row items-center justify-between cursor-pointer bg-white"
            onClick={handleEditMobileBanner}
            onDrop={handleMobileBannerDrop}
            onDragOver={handleDragOver}
          >
            <p className="text-reloadBorder font-inter font-[400] text-[14px]">
              Choose a file or drag & drop your logo here
            </p>
            <button className="text-blue-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M3.3335 13.3334L3.3335 14.1667C3.3335 15.5474 4.45278 16.6667 5.8335 16.6667L14.1668 16.6667C15.5475 16.6667 16.6668 15.5474 16.6668 14.1667L16.6668 13.3334M13.3335 6.66669L10.0002 3.33335M10.0002 3.33335L6.66683 6.66669M10.0002 3.33335L10.0002 13.3334"
                  stroke="#636363"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploads;