import React from "react";
import { Play } from "lucide-react";
import Plan from "../../../../lib/Images/Plan.png";
import StatCard from "../../../common/statCard";

const ChevronRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.10493 10.295C4.83156 10.0216 4.83156 9.57839 5.10493 9.30503L7.40995 7L5.10493 4.69497C4.83156 4.42161 4.83156 3.97839 5.10493 3.70503C5.37829 3.43166 5.82151 3.43166 6.09488 3.70503L8.89488 6.50503C9.16824 6.77839 9.16824 7.22161 8.89488 7.49497L6.09488 10.295C5.82151 10.5683 5.37829 10.5683 5.10493 10.295Z"
      fill="#212121"
    />
  </svg>
);

const PlanForm: React.FC = () => {
  return (
    <div className="max-w-3xl rounded-custom12px p-6 md:p-0 sm:p-0 lg:p-0 xl:p-0 sm:max-h-full md:max-h-full lg:max-h-full xl:max-h-full max-h-[80vh] overflow-y-auto sm:overflow-visible md:overflow-visible lg:overflow-visible xl:overflow-visible">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-[14px] font-inter font-[600] text-headding-color">
          Plan
        </h2>
        <button className="px-4 py-2 font-inter font-[500] text-whiteColor bg-bgButton rounded-custom">
          Change Plan
        </button>
      </div>

      <div className="space-y-6">
        <div className="bg-backgroundWhite rounded-custom8px p-6">
          <h3 className="text-[12px] font-inter font-[500] text-paragraphBlack mb-3">
            Current plan details
          </h3>

          <div className="border border-reloadBorder rounded-lg p-4 relative">
            {/* Desktop view for the header (Startup Plan and Expiry Date) */}
            <div className="hidden sm:flex md:flex lg:flex xl:flex justify-between items-start mb-6">
              <div>
                <div className="inline-block bg-subMenus rounded-md px-3 py-1">
                  <h4 className="rounded-custom80px text-[12px] font-inter font-[500] text-headding-color">
                    Startup Plan
                  </h4>
                </div>
                <div className="mt-2">
                  <span className="text-[32px] font-inter font-[600] text-paragraphBlack">
                    $19
                  </span>
                  <p className="text-[16px] font-inter font-[500] text-paragraphBlack mt-1">
                    <span className="bloc text-[16px] font-inter font-[500] text-paragraphBlack">
                      Per month
                    </span>
                    <span className="bloc text-[14px] font-inter font-[400] text-headding-color">
                      {" "}
                      For all individuals.
                    </span>
                  </p>
                </div>
              </div>

              <div className="px-4 py-1 bg-backgroundWhite border border-reloadBorder rounded-custom16px text-[12px] font-inter font-[500] text-headding-color">
                Plan expires on :{" "}
                <span className="bg-backgroundWhite rounded-custom16px text-[14px] font-inter font-[500] text-verifyOtp">
                  Feb 13, 2026
                </span>
              </div>
            </div>

            {/* Mobile view for the header (Expiry Date at the top, then Startup Plan) */}
            <div className="block sm:hidden md:hidden lg:hidden xl:hidden">
              <div className="mb-4">
                <div className="px-4 py-1 bg-backgroundWhite border border-reloadBorder rounded-custom16px text-[12px] font-inter font-[500] text-paragraphBlack inline-block">
                  Plan expires on : Feb 13, 2026
                </div>
              </div>

              <div className="mb-4">
                <div className="inline-block bg-subMenus rounded-custom12px px-3 py-1">
                  <h4 className="text-[12px] font-inter font-[500] text-paragraphBlack">
                    Startup Plan
                  </h4>
                </div>
                <div className="mt-2">
                  <span className="text-3xl font-bold">$19</span>
                  <p className="text-[12px] text-gray-500 mt-1">
                    <span className="text-gray-600">
                      <span className="bloc">Per month</span>For all
                      individuals.
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-4 sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-2">
              <StatCard value="100" description="Orders per month" />
              <StatCard value="$0.09" description="Per month transaction" />
              <StatCard value="50" description="Customers per month" />

              <div className="mt-[-18px] ms-4 md:block w-full sm:block lg:block xl:block hidden">
                <div className="rounded-custom12px p-4">
                  <img
                    src={Plan}
                    alt="Plan illustration"
                    className="w-full h-[100px] rotate-12 opacity-50"
                    style={{
                      transformOrigin: "center center",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between py-3 px-4 bg-backgroundWhite rounded-custom12px">
          <span className="text-[12px] font-inter font-[500] text-red-600">
            Cancel Plan
          </span>
          <div className="bg-backgroundWhite p-2 rounded-lg border border-reloadBorder">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M5.10493 10.295C4.83156 10.0216 4.83156 9.57839 5.10493 9.30503L7.40995 7L5.10493 4.69497C4.83156 4.42161 4.83156 3.97839 5.10493 3.70503C5.37829 3.43166 5.82151 3.43166 6.09488 3.70503L8.89488 6.50502C9.16824 6.77839 9.16824 7.22161 8.89488 7.49497L6.09488 10.295C5.82151 10.5683 5.37829 10.5683 5.10493 10.295Z"
                fill="#212121"
              />
            </svg>
          </div>
        </div>

        <div className="bg-backgroundWhite p-6 rounded-custom12px">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[12px] font-inter font-[500] text-paragraphBlack">
              Learn about plans
            </span>
            <button className="text-[12px] font-inter font-[500] text-paragraphBlack">
              Learn More
            </button>
          </div>

          <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <button className="w-16 h-16 bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Play className="w-8 h-8 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanForm;
