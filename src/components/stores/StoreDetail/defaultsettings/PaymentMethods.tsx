import React, { useState } from 'react';
import { PaymentMethodsType, PaymentMethodKey } from '../types';
import Toggle from '../shared/Toggle';

const PaymentMethods: React.FC = () => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethodsType>({
    cash: true,
    pg1: true,
    pg2: true,
  });

  // Toggle handler for payment methods
  const handlePaymentMethodToggle = (method: PaymentMethodKey) => {
    console.log("Toggling:", method, "Current state:", paymentMethods[method]);
    setPaymentMethods((prevState) => {
      const newState = {
        ...prevState,
        [method]: !prevState[method],
      };
      console.log("New state:", newState);
      return newState;
    });
  };

  return (
    <div className="bg-white border border-grey-border rounded-custom8px mb-4 mt-6">
      <div className="p-4">
        <h2 className="font-inter font-[500] text-[14px] mb-2">
          Payment Methods
        </h2>
        <p className="font-inter font-[400] text-[12px] text-cardTitle mb-4">
          Admin-enabled payment methods will be selected by default
          for customers at checkout.
        </p>

        <div className="grid grid-cols-3 gap-4 mt-2">
          {/* Cash Toggle */}
          <div className="flex items-center ">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={paymentMethods.cash}
                onChange={() => handlePaymentMethodToggle("cash")}
              />
              <div
                className={`relative w-14 h-7 ${
                  paymentMethods.cash ? "bg-bgButton" : "bg-gray-300"
                } peer-focus:outline-none rounded-full transition-colors`}
              >
                <div
                  className={`absolute inset-y-1 left-1 bg-white w-5 h-5 rounded-full transition-all duration-300 ${
                    paymentMethods.cash
                      ? "translate-x-7"
                      : "translate-x-0"
                  }`}
                ></div>
              </div>
              <span className="ml-3 text-[14px] font-[500] font-inter text-textHeading">
                Cash
              </span>
            </label>
          </div>

          {/* PG1 Toggle */}
          <div className="flex items-center justify-center">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={paymentMethods.pg1}
                onChange={() => handlePaymentMethodToggle("pg1")}
              />
              <div
                className={`relative w-14 h-7 ${
                  paymentMethods.pg1 ? "bg-bgButton" : "bg-gray-300"
                } peer-focus:outline-none rounded-full transition-colors`}
              >
                <div
                  className={`absolute inset-y-1 left-1 bg-white w-5 h-5 rounded-full transition-all duration-300 ${
                    paymentMethods.pg1
                      ? "translate-x-7"
                      : "translate-x-0"
                  }`}
                ></div>
              </div>
              <span className="ml-3 text-[14px] font-[500] font-inter text-textHeading">
                PG1
              </span>
            </label>
          </div>

          {/* PG2 Toggle */}
          <div className="flex items-center justify-center">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={paymentMethods.pg2}
                onChange={() => handlePaymentMethodToggle("pg2")}
              />
              <div
                className={`relative w-14 h-7 ${
                  paymentMethods.pg2 ? "bg-bgButton" : "bg-gray-300"
                } peer-focus:outline-none rounded-full transition-colors`}
              >
                <div
                  className={`absolute inset-y-1 left-1 bg-white w-5 h-5 rounded-full transition-all duration-300 ${
                    paymentMethods.pg2
                      ? "translate-x-7"
                      : "translate-x-0"
                  }`}
                ></div>
              </div>
              <span className="ml-3 text-[14px] font-[500] font-inter text-textHeading">
                PG2
              </span>
            </label>
          </div>
        </div>

        <div className="lg:hidden flex flex-wrap gap-6 mt-2">
          {/* Cash Toggle - Mobile */}
          <div className="flex items-center">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={paymentMethods.cash}
                onChange={() => handlePaymentMethodToggle("cash")}
              />
              <div
                className={`relative w-11 h-6 ${
                  paymentMethods.cash ? "bg-bgButton" : "bg-gray-300"
                } peer-focus:outline-none rounded-full transition-colors`}
              >
                <div
                  className={`absolute inset-y-1 left-1 bg-white w-4 h-4 rounded-full transition-all duration-300 ${
                    paymentMethods.cash
                      ? "translate-x-5"
                      : "translate-x-0"
                  }`}
                ></div>
              </div>
              <span className="ml-2 text-[12px] font-[500] font-inter text-textHeading">
                Cash
              </span>
            </label>
          </div>

          {/* PG1 Toggle - Mobile */}
          <div className="flex items-center">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={paymentMethods.pg1}
                onChange={() => handlePaymentMethodToggle("pg1")}
              />
              <div
                className={`relative w-11 h-6 ${
                  paymentMethods.pg1 ? "bg-bgButton" : "bg-gray-300"
                } peer-focus:outline-none rounded-full transition-colors`}
              >
                <div
                  className={`absolute inset-y-1 left-1 bg-white w-4 h-4 rounded-full transition-all duration-300 ${
                    paymentMethods.pg1
                      ? "translate-x-5"
                      : "translate-x-0"
                  }`}
                ></div>
              </div>
              <span className="ml-2 text-[12px] font-[500] font-inter text-textHeading">
                PG1
              </span>
            </label>
          </div>

          {/* PG2 Toggle - Mobile */}
          <div className="flex items-center">
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={paymentMethods.pg2}
                onChange={() => handlePaymentMethodToggle("pg2")}
              />
              <div
                className={`relative w-11 h-6 ${
                  paymentMethods.pg2 ? "bg-bgButton" : "bg-gray-300"
                } peer-focus:outline-none rounded-full transition-colors`}
              >
                <div
                  className={`absolute inset-y-1 left-1 bg-white w-4 h-4 rounded-full transition-all duration-300 ${
                    paymentMethods.pg2
                      ? "translate-x-5"
                      : "translate-x-0"
                  }`}
                ></div>
              </div>
              <span className="ml-2 text-[12px] font-[500] font-inter text-textHeading">
                PG2
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;