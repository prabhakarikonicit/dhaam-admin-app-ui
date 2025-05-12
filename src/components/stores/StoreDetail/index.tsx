import React, { useState, useEffect } from "react";
import Header from "./Header";
import TabNavigation from "./TabNavigation";
import DefaultSetting from "./defaultsettings";
import Category from "../../Menu/category/category";
import Configurations from "./configurations/configurations";
import { StoreDetailPageProps, CountryCode } from "./types";
import StoreBanner from "../../../lib/Images/storebanner.png";
import ProfileImage from "../../../lib/Images/ProfileImage.png";

const StoreDetailPage: React.FC<StoreDetailPageProps> = ({
  storeId,
  storeName,
  storeAddress,
  rating,
  status,
  phoneNumber,
  email,
  storeItems,
  onBackClick,
  onPrint,
  onReject,
  onAccept,
  onMoreActions,
}) => {
  // State to keep track of the active tab
  const [activeTab, setActiveTab] = useState("defaultSetting");

  // Country codes data
  const countryCodes: CountryCode[] = [
    { code: "US", flag: "🇺🇸", dialCode: "+1" },
    { code: "GB", flag: "🇬🇧", dialCode: "+44" },
    { code: "IN", flag: "🇮🇳", dialCode: "+91" },
    { code: "CA", flag: "🇨🇦", dialCode: "+1" },
    { code: "AU", flag: "🇦🇺", dialCode: "+61" },
    { code: "DE", flag: "🇩🇪", dialCode: "+49" },
    { code: "FR", flag: "🇫🇷", dialCode: "+33" },
    { code: "JP", flag: "🇯🇵", dialCode: "+81" },
    { code: "CN", flag: "🇨🇳", dialCode: "+86" },
    { code: "BR", flag: "🇧🇷", dialCode: "+55" },
    { code: "RU", flag: "🇷🇺", dialCode: "+7" },
    { code: "IT", flag: "🇮🇹", dialCode: "+39" },
    { code: "ES", flag: "🇪🇸", dialCode: "+34" },
    { code: "MX", flag: "🇲🇽", dialCode: "+52" },
    { code: "KR", flag: "🇰🇷", dialCode: "+82" },
    { code: "AE", flag: "🇦🇪", dialCode: "+971" },
    { code: "SA", flag: "🇸🇦", dialCode: "+966" },
    { code: "SG", flag: "🇸🇬", dialCode: "+65" },
    { code: "NZ", flag: "🇳🇿", dialCode: "+64" },
    { code: "ZA", flag: "🇿🇦", dialCode: "+27" },
  ];

  return (
    <div className="bg-whit rounded-lg ">
      {/* Header with back button, store name and actions */}
      <Header
        storeId={storeId}
        storeName={storeName}
        status={status}
        onBackClick={onBackClick}
      />

      {/* Tab Navigation */}
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Tab content */}
      {activeTab === "defaultSetting" && (
        <DefaultSetting
          storeName={storeName}
          storeId={storeId}
          storeAddress={storeAddress}
          defaultProfileImage={ProfileImage}
          defaultStoreBanner={StoreBanner}
          countryCodes={countryCodes}
        />
      )}

      {activeTab === "catalogue" && (
        <div className="bg-white ">
          <Category
            hideHeader={true}
            hideScrollbar={true}
            normalBorder={true}
          />
        </div>
      )}
      <div className="bg-white mx-4">
        <div className="mt-0 px-5 md:w-2/3 bg-white mx-0 p-5">
          {activeTab === "configurations" && (
            <Configurations
              onClose={() => {}}
              onSave={() => {}}
              onCancel={() => {}}
              hideHeader={true}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default StoreDetailPage;
