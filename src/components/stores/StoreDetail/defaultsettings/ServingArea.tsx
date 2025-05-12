import React, { useState } from 'react';

const ServingArea: React.FC = () => {
  const [servingAreaType, setServingAreaType] = useState<string>("everywhere");

  return (
    <div className="bg-white border border-reloadBorder rounded-custom8px mb-6 overflow-hidden">
      <div className="bg-background-grey p-4 border-b border-reloadBorder">
        <h2 className="text-cardValue font-inter font-[14px] font-[600] whitespace-nowrap">
          Serving Area{" "}
        </h2>
        <p className="font-inter font-[12px] font-[500] text-cardTitle mb-4 mt-2">
          Define the geographic areas where your stores can accept and
          deliver orders.
        </p>
      </div>
      <div className="p-4">
        <div className="mb-4 border-b border-grey-border pb-3">
          <label className="flex items-center mb-2">
            <input
              type="radio"
              name="serving"
              className="form-radio h-6 w-6 text-purple-600 accent-bgButton"
              checked={servingAreaType === "everywhere"}
              onChange={() => setServingAreaType("everywhere")}
            />
            <span className="ml-3 font-inter font-[14px] font-[600] text-textHeading tracking-wide">
              Serve Everywhere
            </span>
          </label>
          <p className="text-[12px] font-[500] font-inter font-[500] text-cardTitle ml-1">
            No location restrictions; accept orders from all areas.
          </p>
        </div>

        <div className="mb-4 border-b border-grey-border pb-3">
          <label className="flex items-center mb-2">
            <input
              type="radio"
              name="serving"
              className="form-radio h-6 w-6 text-purple-600 accent-bgButton"
              checked={servingAreaType === "radius"}
              onChange={() => setServingAreaType("radius")}
            />
            <span className="ml-3 font-inter font-[14px] font-[600] text-textHeading tracking-wide">
              Radius-Based Serving
            </span>
          </label>
          <p className="text-[12px] font-[500] font-inter font-[500] text-cardTitle ml-1">
            Set a delivery radius around your restaurant's central
            location.
          </p>
        </div>

        <div>
          <label className="flex items-center mb-2">
            <input
              type="radio"
              name="serving"
              className="form-radio h-6 w-6 text-purple-600 accent-bgButton"
              checked={servingAreaType === "geofence"}
              onChange={() => setServingAreaType("geofence")}
            />
            <span className="ml-3 font-inter font-[14px] font-[600] text-textHeading tracking-wide">
              Geofence Serving
            </span>
          </label>
          <p className="text-[12px] font-[500] font-inter font-[500] text-cardTitle ml-1">
            Create specific geographic zones to control where you
            accept orders.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServingArea;