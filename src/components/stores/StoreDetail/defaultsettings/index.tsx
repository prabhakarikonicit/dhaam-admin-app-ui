import React from 'react';
import PersonalInfo from './PersonalInfo';
import StoreInfo from './StoreInfo';
import ServingArea from './ServingArea';
import ImageUploads from './ImageUploads';
import PaymentMethods from './PaymentMethods';
import FeaturedListing from './FeaturedListing';
import ActivityLog from './ActivityLog';
import { CountryCode } from '../types';

interface DefaultSettingProps {
  storeName?: string;
  storeId?: string;
  storeAddress?: string;
  defaultProfileImage?: string;
  defaultStoreBanner?: string;
  countryCodes: CountryCode[];
}

const DefaultSetting: React.FC<DefaultSettingProps> = ({
  storeName,
  storeId,
  storeAddress,
  defaultProfileImage,
  defaultStoreBanner,
  countryCodes
}) => {
  return (
    <div className="px-4 mx-4 pb-4 bg-white">
      <div className="flex flex-wrap">
        <div className="w-full lg:w-1/2 pr-2">
          {/* Left column */}
          <PersonalInfo countryCodes={countryCodes} />
          <StoreInfo storeName={storeName} storeId={storeId} storeAddress={storeAddress} />
          <ServingArea />
        </div>

        <div className="w-full lg:w-1/2 pl-4 mt-4">
          {/* Right column */}
          <ImageUploads 
            defaultProfileImage={defaultProfileImage} 
            defaultStoreBanner={defaultStoreBanner} 
          />
          <PaymentMethods />
        </div>

        {/* Full-width components */}
        <div className="w-full">
          <FeaturedListing />
          <ActivityLog />
        </div>
      </div>
    </div>
  );
};

export default DefaultSetting;