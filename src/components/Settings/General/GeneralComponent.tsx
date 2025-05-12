import React, { useState, useRef, useEffect } from "react";

import AccountForm from "./account/account";
import MarketplaceDefaultsForm from "./marketplace/marketplace";
import DomainForm from "./domain/domain";
import LanguagesForm from "./languages/languages";
import PlanForm from "./plan/plan";
import BillingForm from "./billing/billing";
import PaymentsForm from "./payments/payments";
import UserPermission from "./userpermission/userpermission";
import Checkout from "./checkout/checkout";
import CustomerRights from "./customer/customer";
import Preferences from "./preferences/preferences";
import TaxManagement from "./taxes/taxes";
import LocationManagement from "./location/location";
import PoliciesAndPages from "./policies/policies";
const SliderIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="21"
    viewBox="0 0 20 21"
    fill="none"
  >
    <path
      d="M5 4.5C5 3.94772 4.55228 3.5 4 3.5C3.44772 3.5 3 3.94772 3 4.5V11.7676C2.4022 12.1134 2 12.7597 2 13.5C2 14.2403 2.4022 14.8866 3 15.2324V16.5C3 17.0523 3.44772 17.5 4 17.5C4.55228 17.5 5 17.0523 5 16.5V15.2324C5.5978 14.8866 6 14.2403 6 13.5C6 12.7597 5.5978 12.1134 5 11.7676V4.5Z"
      fill="#333333"
    />
    <path
      d="M11 4.5C11 3.94772 10.5523 3.5 10 3.5C9.44772 3.5 9 3.94772 9 4.5V5.76756C8.4022 6.11337 8 6.75972 8 7.5C8 8.24028 8.4022 8.88663 9 9.23244V16.5C9 17.0523 9.44772 17.5 10 17.5C10.5523 17.5 11 17.0523 11 16.5V9.23244C11.5978 8.88663 12 8.24028 12 7.5C12 6.75972 11.5978 6.11337 11 5.76756V4.5Z"
      fill="#333333"
    />
    <path
      d="M16 3.5C16.5523 3.5 17 3.94772 17 4.5V11.7676C17.5978 12.1134 18 12.7597 18 13.5C18 14.2403 17.5978 14.8866 17 15.2324V16.5C17 17.0523 16.5523 17.5 16 17.5C15.4477 17.5 15 17.0523 15 16.5V15.2324C14.4022 14.8866 14 14.2403 14 13.5C14 12.7597 14.4022 12.1134 15 11.7676V4.5C15 3.94772 15.4477 3.5 16 3.5Z"
      fill="#333333"
    />
  </svg>
);

const SliderMarketIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="21"
    viewBox="0 0 20 21"
    fill="none"
  >
    <path
      d="M3.33333 5.49999V3.83333H16.6667V5.49999H3.33333ZM3.33333 17.1667V12.1667H2.5V10.5L3.33333 6.33333H16.6667L17.5 10.5V12.1667H16.6667V17.1667H15V12.1667H11.6667V17.1667H3.33333ZM5 15.5H10V12.1667H5V15.5Z"
      fill="#636363"
    />
  </svg>
);

const SliderDomainIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="21"
    viewBox="0 0 20 21"
    fill="none"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M4.08296 9.5H6.02863C6.11783 7.95361 6.41228 6.52907 6.86644 5.38228C5.41752 6.27135 4.37513 7.75848 4.08296 9.5ZM10 2.5C5.58172 2.5 2 6.08172 2 10.5C2 14.9183 5.58172 18.5 10 18.5C14.4183 18.5 18 14.9183 18 10.5C18 6.08172 14.4183 2.5 10 2.5ZM10 4.5C9.92395 4.5 9.76787 4.53173 9.5347 4.76184C9.29723 4.9962 9.03751 5.3849 8.79782 5.94417C8.40914 6.8511 8.12491 8.08559 8.03237 9.5H11.9676C11.8751 8.08559 11.5909 6.8511 11.2022 5.94417C10.9625 5.3849 10.7028 4.9962 10.4653 4.76184C10.2321 4.53173 10.076 4.5 10 4.5ZM13.9714 9.5C13.8822 7.95361 13.5877 6.52907 13.1336 5.38228C14.5825 6.27135 15.6249 7.75848 15.917 9.5H13.9714ZM11.9676 11.5H8.03237C8.12491 12.9144 8.40914 14.1489 8.79782 15.0558C9.03751 15.6151 9.29723 16.0038 9.5347 16.2382C9.76787 16.4683 9.92395 16.5 10 16.5C10.076 16.5 10.2321 16.4683 10.4653 16.2382C10.7028 16.0038 10.9625 15.6151 11.2022 15.0558C11.5909 14.1489 11.8751 12.9144 11.9676 11.5ZM13.1336 15.6177C13.5877 14.4709 13.8822 13.0464 13.9714 11.5H15.917C15.6249 13.2415 14.5825 14.7287 13.1336 15.6177ZM6.86644 15.6177C6.41228 14.4709 6.11783 13.0464 6.02863 11.5H4.08296C4.37513 13.2415 5.41752 14.7287 6.86644 15.6177Z"
      fill="#636363"
    />
  </svg>
);
const SliderLanguagesIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="21"
    viewBox="0 0 20 21"
    fill="none"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M7.00001 2.5C7.55229 2.5 8.00001 2.94772 8.00001 3.5V4.5H8.73223C8.744 4.49979 8.75581 4.49979 8.76765 4.5H11C11.5523 4.5 12 4.94772 12 5.5C12 6.05228 11.5523 6.5 11 6.5H9.57801C9.21635 8.18748 8.63076 9.79154 7.85405 11.2796C8.14482 11.6338 8.44964 11.976 8.76767 12.3055C9.15124 12.7028 9.14007 13.3359 8.74272 13.7195C8.34537 14.103 7.7123 14.0919 7.32873 13.6945C7.13962 13.4986 6.95468 13.2987 6.77405 13.0948C5.88895 14.4101 4.84387 15.6084 3.66692 16.6618C3.2554 17.0301 2.6232 16.9951 2.25487 16.5836C1.88655 16.172 1.92157 15.5398 2.3331 15.1715C3.54619 14.0858 4.60214 12.8288 5.4631 11.4389C4.90663 10.6499 4.40868 9.81652 3.97558 8.94503C3.7298 8.45045 3.93148 7.85027 4.42606 7.60449C4.92064 7.3587 5.52083 7.56039 5.76661 8.05497C6.00021 8.52502 6.25495 8.98278 6.52961 9.42699C6.947 8.49272 7.28247 7.51402 7.52698 6.5H3.00001C2.44772 6.5 2.00001 6.05228 2.00001 5.5C2.00001 4.94772 2.44772 4.5 3.00001 4.5H6.00001V3.5C6.00001 2.94772 6.44772 2.5 7.00001 2.5ZM13 8.5C13.3788 8.5 13.725 8.714 13.8944 9.05279L16.8854 15.0348C16.8919 15.0471 16.8982 15.0596 16.9041 15.0722L17.8944 17.0528C18.1414 17.5468 17.9412 18.1474 17.4472 18.3944C16.9532 18.6414 16.3526 18.4412 16.1056 17.9472L15.382 16.5H10.618L9.89444 17.9472C9.64745 18.4412 9.04677 18.6414 8.5528 18.3944C8.05882 18.1474 7.85859 17.5468 8.10558 17.0528L9.09589 15.0722C9.10187 15.0596 9.1081 15.0471 9.11458 15.0348L12.1056 9.05279C12.275 8.714 12.6212 8.5 13 8.5ZM11.618 14.5H14.382L13 11.7361L11.618 14.5Z"
      fill="#636363"
    />
  </svg>
);

const SliderPlanIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="21"
    viewBox="0 0 20 21"
    fill="none"
  >
    <path
      d="M11.25 4.25C11.25 3.91848 11.3817 3.60054 11.6161 3.36612C11.8505 3.1317 12.1685 3 12.5 3H16.25C16.5815 3 16.8995 3.1317 17.1339 3.36612C17.3683 3.60054 17.5 3.91848 17.5 4.25V14.875C17.5 15.7038 17.1708 16.4987 16.5847 17.0847C15.9987 17.6708 15.2038 18 14.375 18H2.5C2.16848 18 1.85054 17.8683 1.61612 17.6339C1.3817 17.3995 1.25 17.0815 1.25 16.75V13C1.25 12.6685 1.3817 12.3505 1.61612 12.1161C1.85054 11.8817 2.16848 11.75 2.5 11.75H6.25V9.25C6.25 8.91848 6.3817 8.60054 6.61612 8.36612C6.85054 8.1317 7.16848 8 7.5 8H11.25V4.25Z"
      fill="#636363"
    />
  </svg>
);

const SliderBillingIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="21"
    viewBox="0 0 20 21"
    fill="none"
  >
    <path
      d="M8.43338 7.91784C8.58818 7.81464 8.77939 7.7224 9 7.65101L9.00001 9.34899C8.77939 9.2776 8.58818 9.18536 8.43338 9.08216C8.06927 8.83942 8 8.6139 8 8.5C8 8.3861 8.06927 8.16058 8.43338 7.91784Z"
      fill="#636363"
    />
    <path
      d="M11 13.349L11 11.651C11.2206 11.7224 11.4118 11.8146 11.5666 11.9178C11.9308 12.1606 12 12.3861 12 12.5C12 12.6139 11.9308 12.8394 11.5666 13.0822C11.4118 13.1854 11.2206 13.2776 11 13.349Z"
      fill="#636363"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M10 18.5C14.4183 18.5 18 14.9183 18 10.5C18 6.08172 14.4183 2.5 10 2.5C5.58172 2.5 2 6.08172 2 10.5C2 14.9183 5.58172 18.5 10 18.5ZM11 5.5C11 4.94772 10.5523 4.5 10 4.5C9.44772 4.5 9 4.94772 9 5.5V5.59199C8.3784 5.70873 7.80348 5.93407 7.32398 6.25374C6.6023 6.73485 6 7.50933 6 8.5C6 9.49067 6.6023 10.2651 7.32398 10.7463C7.80348 11.0659 8.37841 11.2913 9.00001 11.408L9.00002 13.3492C8.60902 13.2223 8.31917 13.0319 8.15667 12.8446C7.79471 12.4275 7.16313 12.3827 6.74599 12.7447C6.32885 13.1067 6.28411 13.7382 6.64607 14.1554C7.20855 14.8036 8.05956 15.2308 9 15.4076L9 15.5C8.99999 16.0523 9.44769 16.5 9.99998 16.5C10.5523 16.5 11 16.0523 11 15.5L11 15.408C11.6216 15.2913 12.1965 15.0659 12.676 14.7463C13.3977 14.2651 14 13.4907 14 12.5C14 11.5093 13.3977 10.7348 12.676 10.2537C12.1965 9.93407 11.6216 9.70873 11 9.59199L11 7.65075C11.391 7.77771 11.6808 7.9681 11.8434 8.15538C12.2053 8.57252 12.8369 8.61726 13.254 8.2553C13.6712 7.89335 13.7159 7.26176 13.354 6.84462C12.7915 6.19637 11.9405 5.76915 11 5.59236V5.5Z"
      fill="#636363"
    />
  </svg>
);

const SliderPaymentsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="21"
    viewBox="0 0 20 21"
    fill="none"
  >
    <path
      d="M4 4.5C2.89543 4.5 2 5.39543 2 6.5V7.5H18V6.5C18 5.39543 17.1046 4.5 16 4.5H4Z"
      fill="#636363"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M18 9.5H2V14.5C2 15.6046 2.89543 16.5 4 16.5H16C17.1046 16.5 18 15.6046 18 14.5V9.5ZM4 13.5C4 12.9477 4.44772 12.5 5 12.5H6C6.55228 12.5 7 12.9477 7 13.5C7 14.0523 6.55228 14.5 6 14.5H5C4.44772 14.5 4 14.0523 4 13.5ZM9 12.5C8.44772 12.5 8 12.9477 8 13.5C8 14.0523 8.44772 14.5 9 14.5H10C10.5523 14.5 11 14.0523 11 13.5C11 12.9477 10.5523 12.5 10 12.5H9Z"
      fill="#636363"
    />
  </svg>
);
const SliderUserPermissionIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="21"
    viewBox="0 0 20 21"
    fill="none"
  >
    <path
      d="M10 9.5C11.6569 9.5 13 8.15685 13 6.5C13 4.84315 11.6569 3.5 10 3.5C8.34315 3.5 7 4.84315 7 6.5C7 8.15685 8.34315 9.5 10 9.5Z"
      fill="#636363"
    />
    <path
      d="M3 18.5C3 14.634 6.13401 11.5 10 11.5C13.866 11.5 17 14.634 17 18.5H3Z"
      fill="#636363"
    />
  </svg>
);
const SliderCheckoutIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="21"
    viewBox="0 0 20 21"
    fill="none"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M10 2.5C7.79086 2.5 6 4.29086 6 6.5V7.5H5C4.49046 7.5 4.06239 7.88314 4.00612 8.38957L3.00612 17.3896C2.97471 17.6723 3.06518 17.955 3.25488 18.1669C3.44458 18.3789 3.71556 18.5 4 18.5H16C16.2844 18.5 16.5554 18.3789 16.7451 18.1669C16.9348 17.955 17.0253 17.6723 16.9939 17.3896L15.9939 8.38957C15.9376 7.88314 15.5096 7.5 15 7.5H14V6.5C14 4.29086 12.2091 2.5 10 2.5ZM12 7.5V6.5C12 5.39543 11.1046 4.5 10 4.5C8.89543 4.5 8 5.39543 8 6.5V7.5H12ZM6 10.5C6 9.94772 6.44772 9.5 7 9.5C7.55228 9.5 8 9.94772 8 10.5C8 11.0523 7.55228 11.5 7 11.5C6.44772 11.5 6 11.0523 6 10.5ZM13 9.5C12.4477 9.5 12 9.94772 12 10.5C12 11.0523 12.4477 11.5 13 11.5C13.5523 11.5 14 11.0523 14 10.5C14 9.94772 13.5523 9.5 13 9.5Z"
      fill="#636363"
    />
  </svg>
);

const SliderTaxesIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="21"
    viewBox="0 0 20 21"
    fill="none"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M5 2.5C3.89543 2.5 3 3.39543 3 4.5V18.5L6.5 16.5L10 18.5L13.5 16.5L17 18.5V4.5C17 3.39543 16.1046 2.5 15 2.5H5ZM7.5 5.5C6.67157 5.5 6 6.17157 6 7C6 7.82843 6.67157 8.5 7.5 8.5C8.32843 8.5 9 7.82843 9 7C9 6.17157 8.32843 5.5 7.5 5.5ZM13.7071 5.79289C13.3166 5.40237 12.6834 5.40237 12.2929 5.79289L6.29289 11.7929C5.90237 12.1834 5.90237 12.8166 6.29289 13.2071C6.68342 13.5976 7.31658 13.5976 7.70711 13.2071L13.7071 7.20711C14.0976 6.81658 14.0976 6.18342 13.7071 5.79289ZM12.5 10.5C11.6716 10.5 11 11.1716 11 12C11 12.8284 11.6716 13.5 12.5 13.5C13.3284 13.5 14 12.8284 14 12C14 11.1716 13.3284 10.5 12.5 10.5Z"
      fill="#636363"
    />
  </svg>
);

const SliderLocationIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="21"
    viewBox="0 0 20 21"
    fill="none"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M5.05025 4.55025C7.78392 1.81658 12.2161 1.81658 14.9497 4.55025C17.6834 7.28392 17.6834 11.7161 14.9497 14.4497L10 19.3995L5.05025 14.4497C2.31658 11.7161 2.31658 7.28392 5.05025 4.55025ZM10 11.5C11.1046 11.5 12 10.6046 12 9.5C12 8.39543 11.1046 7.5 10 7.5C8.89543 7.5 8 8.39543 8 9.5C8 10.6046 8.89543 11.5 10 11.5Z"
      fill="#636363"
    />
  </svg>
);
const SliderCustomerRightsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="21"
    viewBox="0 0 20 21"
    fill="none"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M2.16611 5.49891C5.17437 5.45809 7.91528 4.31033 10 2.44446C12.0847 4.31033 14.8256 5.45809 17.8339 5.49891C17.9431 6.14968 18 6.81821 18 7.50003C18 12.7249 14.6608 17.1698 10 18.8172C5.33923 17.1698 2 12.7249 2 7.50003C2 6.81821 2.05686 6.14968 2.16611 5.49891ZM13.7071 9.20711C14.0976 8.81658 14.0976 8.18342 13.7071 7.79289C13.3166 7.40237 12.6834 7.40237 12.2929 7.79289L9 11.0858L7.70711 9.79289C7.31658 9.40237 6.68342 9.40237 6.29289 9.79289C5.90237 10.1834 5.90237 10.8166 6.29289 11.2071L8.29289 13.2071C8.68342 13.5976 9.31658 13.5976 9.70711 13.2071L13.7071 9.20711Z"
      fill="#636363"
    />
  </svg>
);

const SliderPoliciesIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="21"
    viewBox="0 0 20 21"
    fill="none"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M4 4.5C4 3.39543 4.89543 2.5 6 2.5H10.5858C11.1162 2.5 11.6249 2.71071 12 3.08579L15.4142 6.5C15.7893 6.87507 16 7.38378 16 7.91421V16.5C16 17.6046 15.1046 18.5 14 18.5H6C4.89543 18.5 4 17.6046 4 16.5V4.5ZM6 10.5C6 9.94772 6.44772 9.5 7 9.5H13C13.5523 9.5 14 9.94772 14 10.5C14 11.0523 13.5523 11.5 13 11.5H7C6.44772 11.5 6 11.0523 6 10.5ZM7 13.5C6.44772 13.5 6 13.9477 6 14.5C6 15.0523 6.44772 15.5 7 15.5H13C13.5523 15.5 14 15.0523 14 14.5C14 13.9477 13.5523 13.5 13 13.5H7Z"
      fill="#636363"
    />
  </svg>
);

const SliderPreferencesIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="21"
    viewBox="0 0 20 21"
    fill="none"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M2 5.5C2 4.39543 2.89543 3.5 4 3.5H16C17.1046 3.5 18 4.39543 18 5.5V7.5C18 8.60457 17.1046 9.5 16 9.5H4C2.89543 9.5 2 8.60457 2 7.5V5.5ZM16 6.5C16 7.05228 15.5523 7.5 15 7.5C14.4477 7.5 14 7.05228 14 6.5C14 5.94772 14.4477 5.5 15 5.5C15.5523 5.5 16 5.94772 16 6.5Z"
      fill="#636363"
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M2 13.5C2 12.3954 2.89543 11.5 4 11.5H16C17.1046 11.5 18 12.3954 18 13.5V15.5C18 16.6046 17.1046 17.5 16 17.5H4C2.89543 17.5 2 16.6046 2 15.5V13.5ZM16 14.5C16 15.0523 15.5523 15.5 15 15.5C14.4477 15.5 14 15.0523 14 14.5C14 13.9477 14.4477 13.5 15 13.5C15.5523 13.5 16 13.9477 16 14.5Z"
      fill="#636363"
    />
  </svg>
);
const handleClose = () => {
  // Handle closing logic
  console.log("Closing");
};

const handleSave = (data: any) => {
  // Handle saving logic
  console.log("Saving data:", data);
};
interface MenuItem {
  icon: React.ReactNode;
  label: string;
  id: string;
}
const SettingsComponent: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState("Account");
  const [isMobile, setIsMobile] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  const menuItems: MenuItem[] = [
    { icon: <SliderIcon />, label: "Account", id: "account" },
    {
      icon: <SliderMarketIcon />,
      label: "Marketplace Defaults",
      id: "marketplace",
    },
    { icon: <SliderDomainIcon />, label: "Domain", id: "domain" },
    { icon: <SliderLanguagesIcon />, label: "Languages", id: "languages" },
    { icon: <SliderPlanIcon />, label: "Plan", id: "plan" },
    { icon: <SliderBillingIcon />, label: "Billing", id: "billing" },
    { icon: <SliderPaymentsIcon />, label: "Payments", id: "payments" },
    {
      icon: <SliderUserPermissionIcon />,
      label: "User Permission",
      id: "permission",
    },
    { icon: <SliderCheckoutIcon />, label: "Checkout", id: "checkout" },
    { icon: <SliderTaxesIcon />, label: "Taxes", id: "taxes" },
    { icon: <SliderLocationIcon />, label: "Location", id: "location" },
    {
      icon: <SliderCustomerRightsIcon />,
      label: "Customer Rights",
      id: "rights",
    },
    { icon: <SliderPoliciesIcon />, label: "Policies & Pages", id: "policies" },
    {
      icon: <SliderPreferencesIcon />,
      label: "Preferences",
      id: "preferences",
    },
  ];


  if (isMobile) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        {/* Mobile Header */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="flex justify-between items-center p-4">
            <h2 className="text-[14px] font-inter font-[600] text-headding-color">General</h2>
         
          </div>

          {/* Scrollable Tabs */}
          <div className="relative">
            <div 
              ref={scrollContainerRef}
              className="flex overflow-x-auto hide-scrollbar py-2 px-4 bg-backgroundWhite"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
             {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setSelectedItem(item.label)}
                  className={`flex items-center whitespace-nowrap px-4 py-4 mx-1 transition-colors ${
                    selectedItem === item.label
                      ? "border-b-2 border-purple-800 text-paragraphBlack"  // Changed from "border" to "border-b-2"
                      : "text-gray-600"
                  }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  <span className="text-[12px] font-inter font-[500]">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-4 overflow-y-auto">
        {selectedItem === "Account" && <AccountForm />}
        {selectedItem === "Marketplace Defaults" && <MarketplaceDefaultsForm />}
        {selectedItem === "Domain" && <DomainForm />}
        {selectedItem === "Languages" && <LanguagesForm />}
        {selectedItem === "Plan" && <PlanForm />}
        {selectedItem === "Billing" && <BillingForm />}
        {selectedItem === "Payments" && <PaymentsForm />}
        {selectedItem === "User Permission" && <UserPermission />}
        {selectedItem === "Checkout" && (
          <Checkout onClose={handleClose} onSave={handleSave} />
        )}
        {selectedItem === "Customer Rights" && (
          <CustomerRights onClose={handleClose} onSave={handleSave} />
        )}
        {selectedItem === "Preferences" && <Preferences />}
        {selectedItem === "Taxes" && <TaxManagement />}
        {selectedItem === "Location" && <LocationManagement />}
        {selectedItem === "Policies & Pages" && <PoliciesAndPages />}

        </div>
      </div>
    );
  }
  return (
    <div className="h-[calc(100vh-64px)] flex gap-1 bg-background-grey overflow-y-auto">
      {/* Left Panel - Fixed */}
      <div className="w-[290px] max-h-full h-[700px] p-5 py-6">
        <h2 className="text-[20px] font-[600] font-inter text-cardValue mb-6">General</h2>
        <div className="space-y-2 bg-backgroundWhite p-4 pb-20  rounded-custom">
          {menuItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item.label)}
              className={`flex items-center p-3 ps-4 rounded-custom font-inter font-[14px] leading-[21px] font-[500px] cursor-pointer ${
                selectedItem === item.label
                  ? "bg-subMenus border-gray-200 rounded-custom"
                  : "hover:bg-gray-50 border-gray-200"
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              <span className="flex-1 text-[12px] font-inter font-[14px] leading-[21px] font-[400px]   text-verifyOtp">
                {item.label}
              </span>
              {/* <ChevronRight className="w-4 h-4 text-gray-400" /> */}
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-[62%] mt-10">
        {selectedItem === "Account" && <AccountForm />}
        {selectedItem === "Marketplace Defaults" && <MarketplaceDefaultsForm />}
        {selectedItem === "Domain" && <DomainForm />}
        {selectedItem === "Languages" && <LanguagesForm />}
        {selectedItem === "Plan" && <PlanForm />}
        {selectedItem === "Billing" && <BillingForm />}
        {selectedItem === "Payments" && <PaymentsForm />}
        {selectedItem === "User Permission" && <UserPermission />}
        {selectedItem === "Checkout" && (
          <Checkout onClose={handleClose} onSave={handleSave} />
        )}
        {selectedItem === "Customer Rights" && (
          <CustomerRights onClose={handleClose} onSave={handleSave} />
        )}
        {selectedItem === "Preferences" && <Preferences />}
        {selectedItem === "Taxes" && <TaxManagement />}
        {selectedItem === "Location" && <LocationManagement />}
        {selectedItem === "Policies & Pages" && <PoliciesAndPages />}

      </div>
    </div>
  );
};

export default SettingsComponent;


