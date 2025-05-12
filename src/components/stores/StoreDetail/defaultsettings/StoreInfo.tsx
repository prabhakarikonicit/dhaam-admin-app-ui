import React from 'react';

interface StoreInfoProps {
  storeName?: string;
  storeId?: string;
  storeAddress?: string;
}

const StoreInfo: React.FC<StoreInfoProps> = ({ 
  storeName = '',
  storeId = '',
  storeAddress = ''
}) => {
  return (
    <div className="bg-white border border-reloadBorder rounded-custom8px mb-6 overflow-hidden">
      <div className="bg-background-grey p-4 py-6 border-b border-reloadBorder">
        <h2 className="text-cardValue font-inter font-[14px] font-[600] tracking-wide">
          Store Information
        </h2>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-[12px] font-[500] font-inter text-paragraphBlack mb-2">
              Store Name
            </label>
            <input
              type="text"
              placeholder="Queenstown Public House"
              className="w-full py-3 px-3 border border-reloadBorder rounded-custom text-[12px] font-[500] font-inter text-paragraphBlack placeholder:paragraphBlack"
              defaultValue={storeName}
            />
          </div>
          <div>
            <label className="block text-[12px] font-[500] font-inter text-paragraphBlack mb-2">
              Store Id
            </label>
            <input
              type="text"
              placeholder="#20345"
              className="w-full py-3 px-3 border border-reloadBorder rounded-custom text-[12px] font-[500] font-inter text-paragraphBlack placeholder:paragraphBlack"
              defaultValue={storeId}
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-[12px] font-[500] font-inter text-paragraphBlack mb-2">
            Store Display Address
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="6391 Elgin St. Celina, Delaware 10299"
              className="w-full py-3 px-3 border border-reloadBorder rounded-custom text-[12px] font-[500] font-inter text-paragraphBlack placeholder:paragraphBlack"
              defaultValue={storeAddress}
            />
            <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[12px] font-[400] font-inter text-cardTitle placeholder:cardTitle">
              37/100
            </span>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-[12px] font-[500] font-inter text-paragraphBlack mb-2">
            Store Description
          </label>
          <textarea
            className="w-full py-3 px-3 border border-reloadBorder rounded-custom text-[12px] font-[400] font-inter text-paragraphBlack placeholder:paragraphBlack h-24 resize-none"
            placeholder="Text"
          ></textarea>
        </div>

        <div>
          <label className="block text-[12px] font-[500] font-inter text-paragraphBlack mb-2">
            Store URL
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="queenstown-public-house"
              className="w-full py-3 px-3 border border-reloadBorder rounded-custom text-[12px] font-[400] font-inter text-paragraphBlack placeholder:paragraphBlack rounded-md"
              defaultValue="queenstown-public-house"
            />
            <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[12px] font-[400] font-inter text-cardTitle placeholder:cardTitle">
              23/100
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreInfo;