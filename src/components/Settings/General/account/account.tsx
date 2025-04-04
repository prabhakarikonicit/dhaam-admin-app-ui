import React from "react";

const EditIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
  >
    <path
      d="M17.4142 2.58579C16.6332 1.80474 15.3668 1.80474 14.5858 2.58579L7 10.1716V13H9.82842L17.4142 5.41421C18.1953 4.63316 18.1953 3.36683 17.4142 2.58579Z"
      fill="#949494"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2 6C2 4.89543 2.89543 4 4 4H8C8.55228 4 9 4.44772 9 5C9 5.55228 8.55228 6 8 6H4V16H14V12C14 11.4477 14.4477 11 15 11C15.5523 11 16 11.4477 16 12V16C16 17.1046 15.1046 18 14 18H4C2.89543 18 2 17.1046 2 16V6Z"
      fill="#949494"
    />
  </svg>
);

const CopyIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
  >
    <path
      d="M7 9C7 7.89543 7.89543 7 9 7H15C16.1046 7 17 7.89543 17 9V15C17 16.1046 16.1046 17 15 17H9C7.89543 17 7 16.1046 7 15V9Z"
      fill="#C2C2C2"
    />
    <path
      d="M5 3C3.89543 3 3 3.89543 3 5V11C3 12.1046 3.89543 13 5 13L5 5H13C13 3.89543 12.1046 3 11 3H5Z"
      fill="#C2C2C2"
    />
  </svg>
);

const DomainIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
  >
    <path
      d="M11 3C10.4477 3 10 3.44772 10 4C10 4.55228 10.4477 5 11 5H13.5858L7.29289 11.2929C6.90237 11.6834 6.90237 12.3166 7.29289 12.7071C7.68342 13.0976 8.31658 13.0976 8.70711 12.7071L15 6.41421V9C15 9.55228 15.4477 10 16 10C16.5523 10 17 9.55228 17 9V4C17 3.44772 16.5523 3 16 3H11Z"
      fill="#C2C2C2"
    />
    <path
      d="M5 5C3.89543 5 3 5.89543 3 7V15C3 16.1046 3.89543 17 5 17H13C14.1046 17 15 16.1046 15 15V12C15 11.4477 14.5523 11 14 11C13.4477 11 13 11.4477 13 12V15H5V7L8 7C8.55228 7 9 6.55228 9 6C9 5.44772 8.55228 5 8 5H5Z"
      fill="#C2C2C2"
    />
  </svg>
);

const AccountForm: React.FC  = () => {
  return (
    <div className="max-w-full rounded-custom12px p-6 md:p-0 sm:p-0 lg:p-0 xl:p-0 sm:max-h-full md:max-h-full lg:max-h-full xl:max-h-full max-h-[80vh] overflow-y-auto sm:overflow-visible md:overflow-visible lg:overflow-visible xl:overflow-visible">

      <div className="flex justify-between items-center mb-3 mt-0 sm:mt-6 md:mt-8 lg:mt-12">
        <h2 className="text-[14px] font-inter font-[600] text-headding-color">
          Account Details
        </h2>
        <div className="flex gap-4">
          <button className="px-4 py-2 text-[12px] font-inter font-[600] text-paragraphBlack ">
            Discard
          </button>
          <button className="px-4 py-2 text-[12px] font-inter font-[600] text-whiteColor bg-bgButton border border-reloadBorder rounded-custom">
            Save
          </button>
        </div>
      </div>

      <form className="space-y-3 bg-backgroundWhite p-6 rounded-lg">
        <div>
          <label className="block text-[12px] font-inter font-[500] text-paragraphBlack mb-3">
            Account Name
          </label>
          <input
            type="text"
            placeholder="Aman kum"
            className="w-full p-3 border border-reloadBorder rounded-custom8px font-inter focus:ring-1 focus:ring-menuSubHeadingColor placeholder:text-reloadBorder placeholder:font-inter"
          />
        </div>

        <div>
          <label className="block text-[12px] font-inter font-[500] text-paragraphBlack mb-3">
            Email
          </label>
          <input
            type="email"
            placeholder="aman@gmail.com"
            className="w-full p-3 border border-reloadBorder rounded-custom8px focus:ring-1 focus:ring-menuSubHeadingColor placeholder:text-reloadBorder placeholder:font-inter"
          />
        </div>

        <div>
          <label className="block text-[12px] font-inter font-[500] text-paragraphBlack mb-3">
            Phone
          </label>
          <input
            type="tel"
            placeholder="+91 810 230 8108"
            className="w-full p-3 border border-reloadBorder rounded-custom8px focus:ring-1 focus:ring-menuSubHeadingColor placeholder:text-reloadBorder placeholder:font-inter"
          />
        </div>

        <div>
          <label className="block text-[12px] font-inter font-[500] text-paragraphBlack mb-3">
            Address
          </label>
          <input
            type="text"
            placeholder="2464 Royal Ln. Mesa, New Jersey 45463"
            className="w-full p-3 border border-reloadBorder rounded-custom8px focus:ring-1 focus:ring-menuSubHeadingColor placeholder:text-reloadBorder placeholder:font-inter"
          />
        </div>

        <div>
          <label className="block text-[12px] font-inter font-[500] text-paragraphBlack mb-3">
            Password
          </label>
          <div className="relative">
            <input
              type="password"
              placeholder="********"
              className="w-full p-3 border border-reloadBorder rounded-custom8px focus:ring-1 focus:ring-menuSubHeadingColor placeholder:text-reloadBorder placeholder:font-inter"
            />
            <EditIcon />
          </div>
        </div>

        <div>
          <label className="block text-[12px] font-inter font-[500] text-paragraphBlack mb-3">
            Account ID
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="#3902904"
              className="w-full p-3 border border-reloadBorder rounded-custom8px focus:ring-1 focus:ring-menuSubHeadingColor placeholder:text-reloadBorder placeholder:font-inter"
            />
            <CopyIcon />
          </div>
        </div>

        <div>
          <label className="block text-[12px] font-inter font-[500] text-paragraphBlack mb-3">
            Account Type
          </label>
          <input
            type="text"
            placeholder="Marketplace"
            className="w-full p-3 border border-reloadBorder rounded-custom8px focus:ring-1 focus:ring-menuSubHeadingColor placeholder:text-reloadBorder placeholder:font-inter"
          />
        </div>

        <div>
          <label className="block text-[12px] font-inter text-paragraphBlack mb-3">
            Domain
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="www.design-mart.com"
              className="w-full p-3 border border-reloadBorder rounded-custom8px focus:ring-1 focus:ring-menuSubHeadingColor placeholder:text-reloadBorder placeholder:font-inter"
            />
            <DomainIcon />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AccountForm;