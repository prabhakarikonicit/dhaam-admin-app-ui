import React from "react";
import Domain from "../../../../lib/Images/Domain.png";
const DomainForm: React.FC = () => {
  return (
    <div className="max-w-3xl rounded-custom12px p-6 md:p-0 sm:p-0 lg:p-0 xl:p-0 sm:max-h-full md:max-h-full lg:max-h-full xl:max-h-full max-h-[80vh] overflow-y-auto sm:overflow-visible md:overflow-visible lg:overflow-visible xl:overflow-visible">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-[14px] font-inter font-[600] text-headding-color leading-[21px] mb-3">
          Domain
        </h2>
        <div className="flex gap-4 items-center">
          <button className="text-[12px] font-inter font-[600] text-cardValue leading-[15.6px] ">
            Learn More
          </button>
          <button className="px-4 py-2 text-[12px] font-inter font-[600] text-cardValue leading-[15.6px] bg-backgroundWhite rounded-custom">
            Buy New Domain
          </button>
        </div>
      </div>

      <form className="space-y-6 p-6 md:p-0 sm:p-0 lg:p-0 xl:p-0">
        <div className="bg-backgroundWhite p-6 rounded-custom12px space-y-6">
          <div>
            <label className="block text-[12px] font-inter font-[500] text-paragraphBlack mb-3">
              Setup existing domain for website
            </label>
            <input
              type="text"
              placeholder="www.dhaam.c"
              className="w-full p-3 border border-reloadBorder rounded-custom8px focus:ring-1 focus:ring-menuSubHeadingColor placeholder:text-reloadBorder placeholder:font-inter"
            />
          </div>

          <div>
            <label className="block text-[12px] font-inter font-[500] text-paragraphBlack mb-3">
              Setup existing domain for admin dashboard
            </label>
            <input
              type="text"
              placeholder="admin.dhaam.com"
              className="w-full p-3 border border-reloadBorder rounded-custom8px focus:ring-1 focus:ring-menuSubHeadingColor placeholder:text-reloadBorder placeholder:font-inter"
            />
          </div>

          <div className="flex justify-end gap-4">
            <button className="px-4 py-2 text-[12px] font-inter font-[500] text-paragraphBlack rounded-lg ">
              Cancel
            </button>
            <button className="px-4 py-2 text-[12px] font-inter font-[500] text-whiteColor bg-bgButton rounded-custom">
              Verify Connection
            </button>
          </div>
        </div>
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4 bg-backgroundWhite p-4 rounded-custom12px ">
            <span className="text-[12px] font-inter font-[500] text-paragraphBlack">
              Third-party domain providers
            </span>
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
                d="M5.10493 10.295C4.83156 10.0216 4.83156 9.57839 5.10493 9.30503L7.40995 7L5.10493 4.69497C4.83156 4.42161 4.83156 3.97839 5.10493 3.70503C5.37829 3.43166 5.82151 3.43166 6.09488 3.70503L8.89488 6.50503C9.16824 6.77839 9.16824 7.22161 8.89488 7.49497L6.09488 10.295C5.82151 10.5683 5.37829 10.5683 5.10493 10.295Z"
                fill="#212121"
              />
            </svg>
          </div>
          <div className="my-6 bg-backgroundWhite p-6 rounded-custom12px">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-inter font-[500] text-paragraphBlack">
                Learn about how to setup existing domain to dhaam website
              </span>
              <button className="text-[12px] w-[250px] font-inter font-[500] text-paragraphBlack">
                Learn More
              </button>
            </div>

            <div className="grid md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 grid grid-cols-1 gap-6 mt-4">
              {/* Video Tutorial Card */}
              <div className="relative aspect-video bg-black rounded-lg w-full h-full overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-gray-800 border-b-8 border-b-transparent ml-1">
                      {/* <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="46"
                        height="47"
                        viewBox="0 0 46 47"
                        fill="none"
                      >
                        <rect
                          y="0.0953369"
                          width="46"
                          height="46"
                          rx="23"
                          fill="white"
                          fill-opacity="0.26"
                        />
                        <path
                          d="M32.409 20.5437C32.8893 20.7991 33.291 21.1804 33.5712 21.6467C33.8514 22.113 33.9994 22.6467 33.9994 23.1907C33.9994 23.7347 33.8514 24.2684 33.5712 24.7347C33.291 25.201 32.8893 25.5823 32.409 25.8377L19.597 32.8047C17.534 33.9277 15 32.4677 15 30.1587V16.2237C15 13.9137 17.534 12.4547 19.597 13.5757L32.409 20.5437Z"
                          fill="white"
                        />
                      </svg> */}
                    </div>
                  </button>
                </div>
              </div>

              {/* Image Card */}
              <div className="rounded-lg w-full  flex items-center justify-center">
                <img
                  src={Domain}
                  alt="Domain setup illustration"
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default DomainForm;
