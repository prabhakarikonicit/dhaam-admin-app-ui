import { useRef, useEffect, useState } from "react";
import StoreBanner from "../../lib/Images/storebanner.png";
import ReactDOM from "react-dom";
import ProductsTable from "../Menu/product/producttable";
import Category from "../Menu/category/category";
import Store from "../Settings/configurations/store/store";
import ProfileImage from "../../lib/Images/ProfileImage.png"; // use your own path

// Define interface for store items
interface StoreItem {
  name: string;
  quantity: number;
  price: string;
}
interface DateRange {
  startDate: Date;
  endDate: Date;
}

interface CurrentMonthState {
  primaryMonth: Date;
  secondaryMonth: Date;
}

// Define interface for component props
interface StoreDetailPageProps {
  storeId: string;
  storeName: string;
  storeAddress: string;
  rating: number;
  status: string;
  phoneNumber: string;
  email: string;
  storeItems?: StoreItem[];
  onBackClick: () => void;
  onPrint: () => void;
  onReject: () => void;
  onAccept: () => void;
  onMoreActions: () => void;
}
type PaymentMethodsType = {
  cash: boolean;
  pg1: boolean;
  pg2: boolean;
};

type PaymentMethodKey = keyof PaymentMethodsType;
// StoreDetailPage component with tabs as shown in the screenshots
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
  const countrySelectorRef = useRef<HTMLDivElement>(null);
  const [paymentMethods, setPaymentMethods] = useState({
    cash: true, // Set initial state to match your image (toggled off)
    pg1: true,
    pg2: true,
  });
  const [featuredListingEnabled, setFeaturedListingEnabled] = useState(true);
  const [showAllDropdown, setShowAllDropdown] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const allDropdownRef = useRef<HTMLDivElement>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: new Date(2025, 4, 8), // May 8, 2025
    endDate: new Date(2025, 5, 11), // June 11, 2025
  });
  const [selectedCountry, setSelectedCountry] = useState({
    code: "IN",
    flag: "🇮🇳",
    dialCode: "+91",
  });
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const countryDropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(event.target as Node)
      ) {
        setShowCountryDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Add this list of country codes
  const countryCodes = [
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
  // Add these new state variables to your component
  const [startDatePickerOpen, setStartDatePickerOpen] = useState(false);
  const [endDatePickerOpen, setEndDatePickerOpen] = useState(false);
  const [featureDates, setFeatureDates] = useState({
    startDate: new Date(2025, 3, 8), // April 8, 2025
    endDate: new Date(2025, 3, 8),
  });
  const startDatePickerRef = useRef<HTMLDivElement>(null);
  const endDatePickerRef = useRef<HTMLDivElement>(null);
  const [currentMonth, setCurrentMonth] = useState<CurrentMonthState>({
    primaryMonth: new Date(2025, 4, 1), // May 2025
    secondaryMonth: new Date(2025, 5, 1), // June 2025
  });
  const datePickerRef = useRef<HTMLDivElement>(null);
  const [startTimeDropdownOpen, setStartTimeDropdownOpen] = useState(false);
  const [endTimeDropdownOpen, setEndTimeDropdownOpen] = useState(false);
  const [selectedTimes, setSelectedTimes] = useState({
    startTime: "9:00am",
    endTime: "10:00am",
  });
  const startTimeDropdownRef = useRef<HTMLDivElement>(null);
  const endTimeDropdownRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!storeBannerPreview) {
      setStoreBannerPreview(StoreBanner);
    }
  }, []);

  // Add this useEffect to handle clicking outside the time dropdowns
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        startTimeDropdownRef.current &&
        !startTimeDropdownRef.current.contains(event.target as Node)
      ) {
        setStartTimeDropdownOpen(false);
      }
      if (
        endTimeDropdownRef.current &&
        !endTimeDropdownRef.current.contains(event.target as Node)
      ) {
        setEndTimeDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
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

  // Toggle handler for featured listing
  const handleFeaturedListingToggle = () => {
    setFeaturedListingEnabled(!featuredListingEnabled);
  };
  // Add these state variables to your component
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(
    null
  );
  const [storeBanner, setStoreBanner] = useState<File | null>(null);
  const [storeBannerPreview, setStoreBannerPreview] = useState<string | null>(
    null
  );
  const [mobileBanner, setMobileBanner] = useState<File | null>(null);
  const [mobileBannerPreview, setMobileBannerPreview] = useState<string | null>(
    null
  );

  // Refs for file inputs
  const profileImageInputRef = useRef<HTMLInputElement>(null);
  const storeBannerInputRef = useRef<HTMLInputElement>(null);
  const mobileBannerInputRef = useRef<HTMLInputElement>(null);

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
  useEffect(() => {
    if (!profileImagePreview) {
      setProfileImagePreview(ProfileImage);
    }
  }, []);

  // Handle remove profile image
  const handleRemoveProfileImage = () => {
    setProfileImage(null);
    setProfileImagePreview(null); // it will fallback to default
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

  // Time options for dropdowns
  const timeOptions = [
    "12:00am",
    "1:00am",
    "2:00am",
    "3:00am",
    "4:00am",
    "5:00am",
    "6:00am",
    "7:00am",
    "8:00am",
    "9:00am",
    "10:00am",
    "11:00am",
    "12:00pm",
    "1:00pm",
    "2:00pm",
    "3:00pm",
    "4:00pm",
    "5:00pm",
    "6:00pm",
    "7:00pm",
    "8:00pm",
    "9:00pm",
    "10:00pm",
    "11:00pm",
  ];

  // Handler for selecting a time
  const handleTimeSelect = (time: string, type: "startTime" | "endTime") => {
    setSelectedTimes((prev) => ({
      ...prev,
      [type]: time,
    }));

    if (type === "startTime") {
      setStartTimeDropdownOpen(false);
    } else {
      setEndTimeDropdownOpen(false);
    }
  };
  // Format date to display format (MM/DD/YYYY)
  const formatDateForDisplay = (date: Date): string => {
    // Ensure we're working with a valid Date object
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      return "";
    }
    return `${(date.getMonth() + 1).toString().padStart(2, "0")}/${date
      .getDate()
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;
  };
  // Add this useEffect to handle clicking outside to close the date picker
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        allDropdownRef.current &&
        !allDropdownRef.current.contains(event.target as Node)
      ) {
        setShowAllDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        startDatePickerRef.current &&
        !startDatePickerRef.current.contains(event.target as Node)
      ) {
        setStartDatePickerOpen(false);
      }
      if (
        endDatePickerRef.current &&
        !endDatePickerRef.current.contains(event.target as Node)
      ) {
        setEndDatePickerOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleFeatureDateSelect = (
    date: Date,
    type: "startDate" | "endDate"
  ): void => {
    setFeatureDates((prev) => ({
      ...prev,
      [type]: date,
    }));

    if (type === "startDate") {
      setStartDatePickerOpen(false);
    } else {
      setEndDatePickerOpen(false);
    }
  };

  // Format date to display format (e.g., "8th April 2025")
  const formatDateWithSuffix = (date: Date): string => {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      return "";
    }

    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();

    // Add suffix to day
    let suffix = "th";
    if (day % 10 === 1 && day !== 11) suffix = "st";
    else if (day % 10 === 2 && day !== 12) suffix = "nd";
    else if (day % 10 === 3 && day !== 13) suffix = "rd";

    return `${day}${suffix} ${month} ${year}`;
  };
  // Navigate to previous month
  const goToPreviousMonth = () => {
    setCurrentMonth((prev) => {
      const newPrimaryMonth = new Date(prev.primaryMonth);
      newPrimaryMonth.setMonth(newPrimaryMonth.getMonth() - 1);

      const newSecondaryMonth = new Date(prev.secondaryMonth);
      newSecondaryMonth.setMonth(newSecondaryMonth.getMonth() - 1);

      return {
        primaryMonth: newPrimaryMonth,
        secondaryMonth: newSecondaryMonth,
      };
    });
  };

  // Navigate to next month
  const goToNextMonth = () => {
    setCurrentMonth((prev) => {
      const newPrimaryMonth = new Date(prev.primaryMonth);
      newPrimaryMonth.setMonth(newPrimaryMonth.getMonth() + 1);

      const newSecondaryMonth = new Date(prev.secondaryMonth);
      newSecondaryMonth.setMonth(newSecondaryMonth.getMonth() + 1);

      return {
        primaryMonth: newPrimaryMonth,
        secondaryMonth: newSecondaryMonth,
      };
    });
  };

  // Function to get days in month (accepts Date object)
  const getDaysInMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  // Function to get month name
  const getMonthName = (date: Date): string => {
    return date.toLocaleString("default", { month: "long" });
  };

  // Check if date is selected
  const isSelectedDate = (date: Date): boolean => {
    if (!date || !dateRange.startDate || !dateRange.endDate) return false;

    return (
      isSameDay(date, dateRange.startDate) || isSameDay(date, dateRange.endDate)
    );
  };

  // Check if date is in range
  const isInRange = (date: Date): boolean => {
    if (!date || !dateRange.startDate || !dateRange.endDate) return false;

    const dateTime = date.getTime();
    const startTime = dateRange.startDate.getTime();
    const endTime = dateRange.endDate.getTime();

    return dateTime > startTime && dateTime < endTime;
  };

  // Determine if dates are the same day
  const isSameDay = (date1: Date, date2: Date): boolean => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  // Add a selection mode state to track what we're selecting
  const [selectionMode, setSelectionMode] = useState<"start" | "end">("start");

  // Handle date selection with a completely new approach
  const handleDateSelect = (date: Date): void => {
    if (selectionMode === "start") {
      // We're selecting the start date
      setDateRange({
        startDate: date,
        endDate: date, // Initially set end date same as start
      });
      setSelectionMode("end"); // Switch to selecting end date next
    } else {
      // We're selecting the end date
      if (date.getTime() < dateRange.startDate.getTime()) {
        // If selected end date is before start date, swap them
        setDateRange({
          startDate: date,
          endDate: dateRange.startDate,
        });
      } else {
        // Normal case: end date is after start date
        setDateRange((prev) => ({
          ...prev,
          endDate: date,
        }));
      }
      setSelectionMode("start"); // Reset selection mode for next time
    }
  };

  return (
    <div className="bg-whit rounded-lg">
      {/* Header with back button, store name and actions */}
      <div className="flex justify-between items-center p-4 bg-background-grey">
        <div className="flex items-center">
          <button
            onClick={onBackClick}
            className="mr-4 border border-reloadBorder bg-backgroundWhite p-1 rounded-custom"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <div>
            <div className="flex items-center">
              <h1 className="text-[20px] font-inter font-[600] text-menuSubHeadingColor">
                {storeName}
              </h1>
              <span
                className={`ml-2 px-4 py-1 text-[12px] font-[600] font-inter rounded-custom80px ${
                  status === "Active"
                    ? "bg-green text-customWhiteColor"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {status}
              </span>
            </div>
            <p className="text-[12px] font-inter font-[500] text-cardValue">
              {storeId}
            </p>
          </div>
        </div>
        <div className="flex space-x-2 -mt-2 ">
          <button className="px-4 py-2  border border-reloadBorder text-cardValue font-[600] font-inter text-[12px] rounded-custom flex items-center">
            English{" "}
            <span className="ml-1">
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
                  d="M3.70503 5.10503C3.97839 4.83166 4.42161 4.83166 4.69497 5.10503L7 7.41005L9.30503 5.10503C9.57839 4.83166 10.0216 4.83166 10.295 5.10503C10.5683 5.37839 10.5683 5.82161 10.295 6.09498L7.49497 8.89498C7.22161 9.16834 6.77839 9.16834 6.50503 8.89498L3.70503 6.09498C3.43166 5.82161 3.43166 5.37839 3.70503 5.10503Z"
                  fill="#212121"
                />
              </svg>
            </span>
          </button>
          <button className="px-4 py-2  border border-reloadBorder text-cardValue font-[600] font-inter text-[12px] rounded-custom flex items-center">
            Visit Store{" "}
            <span className="ml-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <path
                  d="M7.7001 2.1C7.3135 2.1 7.0001 2.4134 7.0001 2.8C7.0001 3.1866 7.3135 3.5 7.7001 3.5H9.51015L5.10512 7.90502C4.83176 8.17839 4.83176 8.62161 5.10512 8.89497C5.37849 9.16834 5.82171 9.16834 6.09507 8.89497L10.5001 4.48995V6.3C10.5001 6.6866 10.8135 7 11.2001 7C11.5867 7 11.9001 6.6866 11.9001 6.3V2.8C11.9001 2.4134 11.5867 2.1 11.2001 2.1H7.7001Z"
                  fill="#212121"
                />
                <path
                  d="M3.5001 3.5C2.7269 3.5 2.1001 4.1268 2.1001 4.9V10.5C2.1001 11.2732 2.7269 11.9 3.5001 11.9H9.1001C9.8733 11.9 10.5001 11.2732 10.5001 10.5V8.4C10.5001 8.0134 10.1867 7.7 9.8001 7.7C9.4135 7.7 9.1001 8.0134 9.1001 8.4V10.5H3.5001V4.9L5.6001 4.9C5.9867 4.9 6.3001 4.5866 6.3001 4.2C6.3001 3.8134 5.9867 3.5 5.6001 3.5H3.5001Z"
                  fill="#212121"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>

      <div className="border-b-2 bg-white mx-3 rounded-custom8px">
        <div className="flex justify-between items-center ">
          <div className="flex">
            <button
              className={`px-6 py-4 font-inter text-[14px] font-[500] text-headding-color ${
                activeTab === "defaultSetting"
                  ? "border-b-2 border-purple-500 text-verifyOtp"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("defaultSetting")}
            >
              Default Setting
            </button>
            <button
              className={`px-6 py-4 font-inter text-[14px] font-[500] text-headding-color ${
                activeTab === "catalogue"
                  ? "border-b-2 border-purple-500 text-verifyOtp"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("catalogue")}
            >
              Catalogue
            </button>
            <button
              className={`px-6 py-4 font-inter text-[14px] font-[500] text-headding-color ${
                activeTab === "configurations"
                  ? "border-b-2 border-purple-500 text-verifyOtp"
                  : "text-gray-500"
              }`}
              onClick={() => setActiveTab("configurations")}
            >
              Configurations
            </button>
          </div>

          <div className="flex items-center">
            <button className="mr-2 px-6 py-2 text-[12px] font-[600] font-inter rounded-custom border border-reloadBorder">
              Discard
            </button>
            <button className="px-8 py-2 text-[12px] font-[600] font-inter rounded-custom bg-bgButton text-white border border-btnBorder">
              Save
            </button>
          </div>
        </div>
      </div>

      {/* Tab content */}
      {activeTab === "defaultSetting" && (
        <div className="px-4 mx-3 pb-4 bg-white">
          <div className="flex flex-wrap">
            <div className="w-full lg:w-1/2 pr-2">
              {/* Left column */}

              {/* Personal Information Section */}
              <div className="bg-white border border-reloadBorder rounded-custom8px mb-4 mt-4 overflow-hidden">
                <div className="bg-background-grey p-4 border-b border-reloadBorder">
                  <h2 className="text-cardValue font-inter font-[14px] font-[600] tracking-wide">
                    Personal Information
                  </h2>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-[12px] font-[500] font-inter text-paragraphBlack mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        placeholder="Aman Kumar"
                        className="w-full p-2 border border-reloadBorder rounded-custom text-[12px] font-[500] font-inter text-paragraphBlack"
                        // defaultValue="Aman Kumar"
                      />
                    </div>
                    <div>
                      <label className="block text-[12px] font-[500] font-inter text-paragraphBlack mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        className="w-full p-2 border border-reloadBorder rounded-custom text-[12px] font-[500] font-inter text-paragraphBlack placeholder:paragraphBlack"
                        placeholder="amanofficial502@gmail.com"
                        // defaultValue="amanofficial502@gmail.com"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[12px] font-[500] font-inter text-paragraphBlack mb-2">
                        Address
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          className="w-full p-2 border border-reloadBorder rounded-custom text-[12px] font-[500] font-inter text-paragraphBlack placeholder:paragraphBlack"
                          // defaultValue="6391 Elgin St. Celina, Delaware 10299"
                          placeholder="6391 Elgin St. Celina, Delaware 10299"
                        />
                        <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <g clip-path="url(#clip0_8744_3490)">
                              <path
                                d="M7.99984 5.33332C6.5265 5.33332 5.33317 6.52666 5.33317 7.99999C5.33317 9.47332 6.5265 10.6667 7.99984 10.6667C9.47317 10.6667 10.6665 9.47332 10.6665 7.99999C10.6665 6.52666 9.47317 5.33332 7.99984 5.33332ZM13.9598 7.33332C13.8088 5.9814 13.2026 4.72102 12.2407 3.75912C11.2788 2.79722 10.0184 2.191 8.6665 2.03999V1.33332C8.6665 0.966656 8.3665 0.666656 7.99984 0.666656C7.63317 0.666656 7.33317 0.966656 7.33317 1.33332V2.03999C5.98125 2.191 4.72086 2.79722 3.75897 3.75912C2.79707 4.72102 2.19085 5.9814 2.03984 7.33332H1.33317C0.966504 7.33332 0.666504 7.63332 0.666504 7.99999C0.666504 8.36666 0.966504 8.66666 1.33317 8.66666H2.03984C2.19085 10.0186 2.79707 11.279 3.75897 12.2409C4.72086 13.2028 5.98125 13.809 7.33317 13.96V14.6667C7.33317 15.0333 7.63317 15.3333 7.99984 15.3333C8.3665 15.3333 8.6665 15.0333 8.6665 14.6667V13.96C10.0184 13.809 11.2788 13.2028 12.2407 12.2409C13.2026 11.279 13.8088 10.0186 13.9598 8.66666H14.6665C15.0332 8.66666 15.3332 8.36666 15.3332 7.99999C15.3332 7.63332 15.0332 7.33332 14.6665 7.33332H13.9598ZM7.99984 12.6667C5.41984 12.6667 3.33317 10.58 3.33317 7.99999C3.33317 5.41999 5.41984 3.33332 7.99984 3.33332C10.5798 3.33332 12.6665 5.41999 12.6665 7.99999C12.6665 10.58 10.5798 12.6667 7.99984 12.6667Z"
                                fill="black"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_8744_3490">
                                <rect width="16" height="16" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[12px] font-[500] font-inter text-paragraphBlack mb-2">
                        Phone
                      </label>
                      <div className="flex items-center border border-reloadBorder rounded-custom relative">
                        {/* Country Code Selector - add ref here */}
                        <div className="relative">
                          <div
                            ref={countrySelectorRef}
                            className="flex items-center px-3 py-2 cursor-pointer"
                            onClick={() =>
                              setShowCountryDropdown((prev) => !prev)
                            }
                          >
                            <span className="text-[16px] mr-1">
                              {selectedCountry.flag}
                            </span>
                            {/* Only show the country code once */}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              className="ml-1"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M4.23431 5.83429C4.54673 5.52187 5.05327 5.52187 5.36569 5.83429L8 8.4686L10.6343 5.83429C10.9467 5.52187 11.4533 5.52187 11.7657 5.83429C12.0781 6.14671 12.0781 6.65324 11.7657 6.96566L8.56569 10.1657C8.25327 10.4781 7.74673 10.4781 7.43431 10.1657L4.23431 6.96566C3.9219 6.65324 3.9219 6.14671 4.23431 5.83429Z"
                                fill="#636363"
                              />
                            </svg>
                          </div>

                          {/* Country Dropdown using Portal */}
                          {showCountryDropdown &&
                            countrySelectorRef.current &&
                            ReactDOM.createPortal(
                              <div
                                ref={countryDropdownRef}
                                className="bg-white border border-gray-200 rounded-md shadow-lg max-h-60 w-52 overflow-y-auto py-1"
                                style={{
                                  position: "absolute",
                                  zIndex: 99999,
                                  left: countrySelectorRef.current.getBoundingClientRect()
                                    .left,
                                  top:
                                    countrySelectorRef.current.getBoundingClientRect()
                                      .bottom + 5,
                                }}
                              >
                                {countryCodes.map((country) => (
                                  <div
                                    key={country.code}
                                    className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => {
                                      setSelectedCountry(country);
                                      setShowCountryDropdown(false);
                                    }}
                                  >
                                    <span className="text-[16px] mr-2">
                                      {country.flag}
                                    </span>
                                    <span className="text-[12px] font-[500] font-inter">
                                      {country.code}
                                    </span>
                                    <span className="text-[12px] font-[400] font-inter ml-auto text-gray-500">
                                      {country.dialCode}
                                    </span>
                                  </div>
                                ))}
                              </div>,
                              document.body
                            )}
                        </div>

                        {/* Phone Input */}
                        <input
                          type="text"
                          className="flex-1 py-2 px-2 border-none outline-none text-[12px] font-[500] font-inter text-paragraphBlack placeholder:paragraphBlack"
                          placeholder="8102308108"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Store Information Section */}
              <div className="bg-white border border-reloadBorder rounded-custom8px mb-4 overflow-hidden">
                <div className="bg-background-grey p-4 border-b border-reloadBorder">
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
                        className="w-full p-2 border border-reloadBorder rounded-custom text-[12px] font-[500] font-inter text-paragraphBlack placeholder:paragraphBlack"
                        // defaultValue={storeName}
                      />
                    </div>
                    <div>
                      <label className="block text-[12px] font-[500] font-inter text-paragraphBlack mb-2">
                        Store Id
                      </label>
                      <input
                        type="text"
                        placeholder="#20345"
                        className="w-full p-2 border border-reloadBorder rounded-custom text-[12px] font-[500] font-inter text-paragraphBlack placeholder:paragraphBlack"
                        // defaultValue={storeId}
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
                        className="w-full p-2 border border-reloadBorder rounded-custom text-[12px] font-[500] font-inter text-paragraphBlack placeholder:paragraphBlack"
                        // defaultValue={storeAddress}
                      />
                      <span className="absolute right-2 top-1/2 transform -translate-y-1/2  text-[12px] font-[400] font-inter text-cardTitle placeholder:cardTitle">
                        37/100
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-[12px] font-[500] font-inter text-paragraphBlack mb-2">
                      Store Description
                    </label>
                    <textarea
                      className="w-full p-2 border border-reloadBorder rounded-custom text-[12px] font-[400] font-inter text-paragraphBlack placeholder:paragraphBlack h-24 resize-none"
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
                        className="w-full py-3 px-2 border border-reloadBorder rounded-custom text-[12px] font-[400] font-inter text-paragraphBlack placeholder:paragraphBlack rounded-md"
                        // defaultValue="queenstown-public-house"
                      />
                      <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[12px] font-[400] font-inter text-cardTitle placeholder:cardTitle">
                        23/100
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Serving Area */}
              <div className="bg-white border border-reloadBorder rounded-custom8px mb-4 overflow-hidden">
                <div className="bg-background-grey p-4 border-b border-reloadBorder">
                  <h2 className="text-cardValue font-inter font-[14px] font-[600] whitespace-nowrap">
                    Serving Area{" "}
                  </h2>
                  <p className="font-inter font-[12px] font-[500] text-cardTitle mb-4  mt-2 ">
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
                        defaultChecked
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
            </div>

            <div className="w-full lg:w-1/2 pl-4 mt-4">
              <div className="bg-background-grey p-4 rounded-custom8px">
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
                      className="w-40 h-40 rounded-custom160px overflow-hidden bg-gray-200 border border-gray-300 flex items-center justify-center relative cursor-pointer"
                      onClick={handleEditProfileImage}
                    >
                      {profileImagePreview ? (
                        <img
                          src={profileImagePreview || ProfileImage}
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
                      className="absolute -right-3 bottom-0 bg-white rounded-custom30px p-3 border border-reloadBorder"
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
                          d="M1.3999 4.19999C1.3999 3.4268 2.0267 2.79999 2.7999 2.79999H5.5999C5.9865 2.79999 6.2999 3.11339 6.2999 3.49999C6.2999 3.88659 5.9865 4.19999 5.5999 4.19999H2.7999V11.2H9.7999V8.39999C9.7999 8.0134 10.1133 7.69999 10.4999 7.69999C10.8865 7.69999 11.1999 8.0134 11.1999 8.39999V11.2C11.1999 11.9732 10.5731 12.6 9.7999 12.6H2.7999C2.0267 12.6 1.3999 11.9732 1.3999 11.2V4.19999Z"
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
                            className="bg-backgroundWhite font-inter text-[12px] backdrop-blur-[18px]  font-[600] text-cardValue px-6 py-2 rounded-custom border border-reloadBorder"
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
                  <h2 className="text-textHeading font-inter font-[500] text-[14px] mb-2">
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

              <div className="bg-white border border-grey-border rounded-custom8px mb-4 mt-5">
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
                    <div className="flex items-center">
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={paymentMethods.cash}
                          onChange={() => handlePaymentMethodToggle("cash")}
                        />
                        <div className="relative w-14 h-7 bg-gray-300 peer-checked:bg-purple-600 rounded-full transition">
                          <div className="absolute inset-y-1 left-1 bg-white w-5 h-5 rounded-full transition-all duration-300 peer-checked:translate-x-7"></div>
                        </div>
                        <span className="ml-3 text-[14px] font-[500] font-inter text-textHeading">
                          Cash
                        </span>
                      </label>
                    </div>

                    {/* PG1 Toggle */}
                    <div className="flex items-center">
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={paymentMethods.pg1}
                          onChange={() => handlePaymentMethodToggle("pg1")}
                        />
                        <div className="relative w-14 h-7 bg-gray-300 peer-checked:bg-purple-600 rounded-full transition">
                          <div className="absolute inset-y-1 left-1 bg-white w-5 h-5 rounded-full transition-all duration-300 peer-checked:translate-x-7"></div>
                        </div>
                        <span className="ml-3 text-[14px] font-[500] font-inter text-textHeading">
                          PG1
                        </span>
                      </label>
                    </div>

                    {/* PG2 Toggle */}
                    <div className="flex items-center">
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={paymentMethods.pg2}
                          onChange={() => handlePaymentMethodToggle("pg2")}
                        />
                        <div className="relative w-14 h-7 bg-gray-300 peer-checked:bg-purple-600 rounded-full transition">
                          <div className="absolute inset-y-1 left-1 bg-white w-5 h-5 rounded-full transition-all duration-300 peer-checked:translate-x-7"></div>
                        </div>
                        <span className="ml-3 text-[14px] font-[500] font-inter text-textHeading">
                          PG2
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="lg:hidden flex flex-wrap gap-6 mt-2">
                    {/* Cash Toggle */}
                    <div className="flex items-center">
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={paymentMethods.cash}
                          onChange={() => handlePaymentMethodToggle("cash")}
                        />
                        <div className="relative w-11 h-6 bg-gray-300 peer-checked:bg-purple-600 rounded-full transition">
                          <div className="absolute inset-y-1 left-1 bg-white w-4 h-4 rounded-full transition-all duration-300 peer-checked:translate-x-5"></div>
                        </div>
                        <span className="ml-2 text-[12px] font-[500] font-inter text-textHeading">
                          Cash
                        </span>
                      </label>
                    </div>

                    {/* PG1 Toggle */}
                    <div className="flex items-center">
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={paymentMethods.pg1}
                          onChange={() => handlePaymentMethodToggle("pg1")}
                        />
                        <div className="relative w-11 h-6 bg-gray-300 peer-checked:bg-purple-600 rounded-full transition">
                          <div className="absolute inset-y-1 left-1 bg-white w-4 h-4 rounded-full transition-all duration-300 peer-checked:translate-x-5"></div>
                        </div>
                        <span className="ml-2 text-[12px] font-[500] font-inter text-textHeading">
                          PG1
                        </span>
                      </label>
                    </div>

                    {/* PG2 Toggle */}
                    <div className="flex items-center">
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={paymentMethods.pg2}
                          onChange={() => handlePaymentMethodToggle("pg2")}
                        />
                        <div className="relative w-11 h-6 bg-gray-300 peer-checked:bg-purple-600 rounded-full transition">
                          <div className="absolute inset-y-1 left-1 bg-white w-4 h-4 rounded-full transition-all duration-300 peer-checked:translate-x-5"></div>
                        </div>
                        <span className="ml-2 text-[12px] font-[500] font-inter text-textHeading">
                          PG2
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full">
              {/* Featured Listing Toggle from the second image */}
              <div className="bg-white border border-reloadBorder rounded-custom8px mb-4">
                <div className="p-4">
                  <div className="flex items-center mb-2">
                    <button
                      className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors focus:outline-none ${
                        featuredListingEnabled ? "bg-bgButton" : "bg-gray-300"
                      }`}
                      onClick={handleFeaturedListingToggle}
                      role="switch"
                      aria-checked={featuredListingEnabled}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          featuredListingEnabled
                            ? "translate-x-7"
                            : "translate-x-1"
                        }`}
                      />
                    </button>
                    <span className="font-inter text-[12px] font-[600] text-textHeading ml-4">
                      Featured Listing
                    </span>
                  </div>
                  <p className="text-[12px] font-[500] font-inter text-cardTitle mb-4">
                    Enable sponsorship to feature a merchant at the top of
                    listings for increased visibility.
                  </p>
                  <div className="border border-grey-border mb-3"></div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 ">
                    <div>
                      <label className="block text-[12px] font-[600] font-inter text-paragraphBlack mb-2">
                        Start and End date
                      </label>
                      <div className="flex items-center">
                        {/* Start Date Input */}
                        <div className="relative flex-1">
                          <div
                            className="w-full py-3 pl-3 pr-8 border border-reloadBorder text-[12px] font-[400] font-inter text-black rounded-custom cursor-pointer"
                            onClick={() => setStartDatePickerOpen(true)}
                          >
                            {formatDateWithSuffix(featureDates.startDate)}
                          </div>
                          <div
                            className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                            onClick={() => setStartDatePickerOpen(true)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M4.8001 1.59998C4.35827 1.59998 4.0001 1.95815 4.0001 2.39998V3.19998H3.2001C2.31644 3.19998 1.6001 3.91632 1.6001 4.79998V12.8C1.6001 13.6836 2.31644 14.4 3.2001 14.4H12.8001C13.6838 14.4 14.4001 13.6836 14.4001 12.8V4.79998C14.4001 3.91632 13.6838 3.19998 12.8001 3.19998H12.0001V2.39998C12.0001 1.95815 11.6419 1.59998 11.2001 1.59998C10.7583 1.59998 10.4001 1.95815 10.4001 2.39998V3.19998H5.6001V2.39998C5.6001 1.95815 5.24193 1.59998 4.8001 1.59998ZM4.8001 5.59998C4.35827 5.59998 4.0001 5.95815 4.0001 6.39998C4.0001 6.8418 4.35827 7.19998 4.8001 7.19998H11.2001C11.6419 7.19998 12.0001 6.8418 12.0001 6.39998C12.0001 5.95815 11.6419 5.59998 11.2001 5.59998H4.8001Z"
                                fill="#636363"
                              />
                            </svg>
                          </div>

                          {/* Start Date Picker Dropdown */}
                          {startDatePickerOpen && (
                            <div
                              ref={startDatePickerRef}
                              className="absolute z-50 mt-1 bg-white border border-gray-200 rounded-md shadow-lg p-4 left-0 w-[300px]"
                            >
                              <div className="flex justify-between items-center mb-2">
                                <button
                                  className="p-1 hover:bg-purple-100 rounded-full text-purple-600"
                                  onClick={() => {
                                    const newDate = new Date(
                                      featureDates.startDate
                                    );
                                    newDate.setMonth(newDate.getMonth() - 1);
                                    setFeatureDates((prev) => ({
                                      ...prev,
                                      startDate: newDate,
                                    }));
                                  }}
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
                                    <polyline points="15 18 9 12 15 6"></polyline>
                                  </svg>
                                </button>

                                <h3 className="text-textHeading font-inter font-[500] text-[14px]">
                                  {featureDates.startDate.toLocaleString(
                                    "default",
                                    { month: "long" }
                                  )}{" "}
                                  {featureDates.startDate.getFullYear()}
                                </h3>

                                <button
                                  className="p-1 hover:bg-purple-100 rounded-full text-purple-600"
                                  onClick={() => {
                                    const newDate = new Date(
                                      featureDates.startDate
                                    );
                                    newDate.setMonth(newDate.getMonth() + 1);
                                    setFeatureDates((prev) => ({
                                      ...prev,
                                      startDate: newDate,
                                    }));
                                  }}
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
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                  </svg>
                                </button>
                              </div>

                              <div className="grid grid-cols-7 gap-1 mb-2">
                                {["S", "M", "T", "W", "T", "F", "S"].map(
                                  (day, i) => (
                                    <div
                                      key={i}
                                      className="text-center text-[12px] font-inter font-[500] text-gray-500"
                                    >
                                      {day}
                                    </div>
                                  )
                                )}
                              </div>

                              <div className="grid grid-cols-7 gap-1">
                                {(() => {
                                  const date = new Date(featureDates.startDate);
                                  const firstDay = new Date(
                                    date.getFullYear(),
                                    date.getMonth(),
                                    1
                                  ).getDay();
                                  const daysInMonth = new Date(
                                    date.getFullYear(),
                                    date.getMonth() + 1,
                                    0
                                  ).getDate();

                                  const days = [];

                                  // Add empty cells for days before the 1st of the month
                                  for (let i = 0; i < firstDay; i++) {
                                    days.push(
                                      <div
                                        key={`empty-${i}`}
                                        className="text-center p-2"
                                      ></div>
                                    );
                                  }

                                  // Add days of the month
                                  for (let day = 1; day <= daysInMonth; day++) {
                                    const currentDate = new Date(
                                      date.getFullYear(),
                                      date.getMonth(),
                                      day
                                    );

                                    days.push(
                                      <button
                                        key={`day-${day}`}
                                        className={`
                      text-center text-[14px] font-inter font-[400] p-2 rounded-full
                      ${
                        currentDate.getDate() ===
                        featureDates.startDate.getDate()
                          ? "bg-bgButton text-white"
                          : "hover:bg-purple-100"
                      }
                    `}
                                        onClick={() =>
                                          handleFeatureDateSelect(
                                            currentDate,
                                            "startDate"
                                          )
                                        }
                                      >
                                        {day}
                                      </button>
                                    );
                                  }

                                  return days;
                                })()}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Separator */}
                        <span className="mx-4 text-gray-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M5 10C5 9.44772 5.44772 9 6 9L14 9C14.5523 9 15 9.44772 15 10C15 10.5523 14.5523 11 14 11L6 11C5.44772 11 5 10.5523 5 10Z"
                              fill="#2B2B2B"
                            />
                          </svg>
                        </span>

                        {/* End Date Input */}
                        <div className="relative flex-1">
                          <div
                            className="w-full py-3 pl-3 pr-8 border border-reloadBorder text-[12px] font-[400] font-inter text-black rounded-custom cursor-pointer"
                            onClick={() => setEndDatePickerOpen(true)}
                          >
                            {formatDateWithSuffix(featureDates.endDate)}
                          </div>
                          <div
                            className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                            onClick={() => setEndDatePickerOpen(true)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M4.8001 1.59998C4.35827 1.59998 4.0001 1.95815 4.0001 2.39998V3.19998H3.2001C2.31644 3.19998 1.6001 3.91632 1.6001 4.79998V12.8C1.6001 13.6836 2.31644 14.4 3.2001 14.4H12.8001C13.6838 14.4 14.4001 13.6836 14.4001 12.8V4.79998C14.4001 3.91632 13.6838 3.19998 12.8001 3.19998H12.0001V2.39998C12.0001 1.95815 11.6419 1.59998 11.2001 1.59998C10.7583 1.59998 10.4001 1.95815 10.4001 2.39998V3.19998H5.6001V2.39998C5.6001 1.95815 5.24193 1.59998 4.8001 1.59998ZM4.8001 5.59998C4.35827 5.59998 4.0001 5.95815 4.0001 6.39998C4.0001 6.8418 4.35827 7.19998 4.8001 7.19998H11.2001C11.6419 7.19998 12.0001 6.8418 12.0001 6.39998C12.0001 5.95815 11.6419 5.59998 11.2001 5.59998H4.8001Z"
                                fill="#636363"
                              />
                            </svg>
                          </div>

                          {/* End Date Picker Dropdown */}
                          {endDatePickerOpen && (
                            <div
                              ref={endDatePickerRef}
                              className="absolute z-50 mt-1 bg-white border border-gray-200 rounded-md shadow-lg p-4 right-0 w-[300px]"
                            >
                              <div className="flex justify-between items-center mb-2">
                                <button
                                  className="p-1 hover:bg-purple-100 rounded-full text-purple-600"
                                  onClick={() => {
                                    const newDate = new Date(
                                      featureDates.endDate
                                    );
                                    newDate.setMonth(newDate.getMonth() - 1);
                                    setFeatureDates((prev) => ({
                                      ...prev,
                                      endDate: newDate,
                                    }));
                                  }}
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
                                    <polyline points="15 18 9 12 15 6"></polyline>
                                  </svg>
                                </button>

                                <h3 className="text-textHeading font-inter font-[500] text-[14px]">
                                  {featureDates.endDate.toLocaleString(
                                    "default",
                                    { month: "long" }
                                  )}{" "}
                                  {featureDates.endDate.getFullYear()}
                                </h3>

                                <button
                                  className="p-1 hover:bg-purple-100 rounded-full text-purple-600"
                                  onClick={() => {
                                    const newDate = new Date(
                                      featureDates.endDate
                                    );
                                    newDate.setMonth(newDate.getMonth() + 1);
                                    setFeatureDates((prev) => ({
                                      ...prev,
                                      endDate: newDate,
                                    }));
                                  }}
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
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                  </svg>
                                </button>
                              </div>

                              <div className="grid grid-cols-7 gap-1 mb-2">
                                {["S", "M", "T", "W", "T", "F", "S"].map(
                                  (day, i) => (
                                    <div
                                      key={i}
                                      className="text-center text-[12px] font-inter font-[500] text-gray-500"
                                    >
                                      {day}
                                    </div>
                                  )
                                )}
                              </div>

                              <div className="grid grid-cols-7 gap-1">
                                {(() => {
                                  const date = new Date(featureDates.endDate);
                                  const firstDay = new Date(
                                    date.getFullYear(),
                                    date.getMonth(),
                                    1
                                  ).getDay();
                                  const daysInMonth = new Date(
                                    date.getFullYear(),
                                    date.getMonth() + 1,
                                    0
                                  ).getDate();

                                  const days = [];

                                  // Add empty cells for days before the 1st of the month
                                  for (let i = 0; i < firstDay; i++) {
                                    days.push(
                                      <div
                                        key={`empty-${i}`}
                                        className="text-center p-2"
                                      ></div>
                                    );
                                  }

                                  // Add days of the month
                                  for (let day = 1; day <= daysInMonth; day++) {
                                    const currentDate = new Date(
                                      date.getFullYear(),
                                      date.getMonth(),
                                      day
                                    );

                                    days.push(
                                      <button
                                        key={`day-${day}`}
                                        className={`
                      text-center text-[14px] font-inter font-[400] p-2 rounded-full
                      ${
                        currentDate.getDate() === featureDates.endDate.getDate()
                          ? "bg-bgButton text-white"
                          : "hover:bg-purple-100"
                      }
                    `}
                                        onClick={() =>
                                          handleFeatureDateSelect(
                                            currentDate,
                                            "endDate"
                                          )
                                        }
                                      >
                                        {day}
                                      </button>
                                    );
                                  }

                                  return days;
                                })()}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-[12px] font-[600] font-inter text-paragraphBlack mb-2">
                        Store Display Address
                      </label>
                      <div className="flex items-center">
                        {/* Start Time Dropdown */}
                        <div className="relative flex-1">
                          <div
                            className="w-full py-3 pl-3 pr-8 border border-reloadBorder text-[16px] font-[500] font-inter text-black rounded-md cursor-pointer flex items-center justify-between"
                            onClick={() =>
                              setStartTimeDropdownOpen(!startTimeDropdownOpen)
                            }
                          >
                            <span
                              className="text-[12px] font-[500] font-inter text-headding-color tracking-widest
"
                            >
                              {selectedTimes.startTime}
                            </span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              className="absolute right-3"
                              viewBox="0 0 16 16"
                              fill="none"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M4.23431 5.83429C4.54673 5.52187 5.05327 5.52187 5.36569 5.83429L8 8.4686L10.6343 5.83429C10.9467 5.52187 11.4533 5.52187 11.7657 5.83429C12.0781 6.14671 12.0781 6.65324 11.7657 6.96566L8.56569 10.1657C8.25327 10.4781 7.74673 10.4781 7.43431 10.1657L4.23431 6.96566C3.9219 6.65324 3.9219 6.14671 4.23431 5.83429Z"
                                fill="#636363"
                              />
                            </svg>
                          </div>

                          {/* Start Time Options Dropdown */}
                          {startTimeDropdownOpen && (
                            <div
                              ref={startTimeDropdownRef}
                              className="absolute z-50 mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto w-full"
                            >
                              {timeOptions.map((time) => (
                                <div
                                  key={time}
                                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-[14px] font-inter"
                                  onClick={() =>
                                    handleTimeSelect(time, "startTime")
                                  }
                                >
                                  {time}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Separator */}
                        <span className="mx-4 text-gray-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M5 10C5 9.44772 5.44772 9 6 9L14 9C14.5523 9 15 9.44772 15 10C15 10.5523 14.5523 11 14 11L6 11C5.44772 11 5 10.5523 5 10Z"
                              fill="#2B2B2B"
                            />
                          </svg>
                        </span>

                        {/* End Time Dropdown */}
                        <div className="relative flex-1">
                          <div
                            className="w-full py-3 pl-3 pr-8 border border-reloadBorder text-[16px] font-[500] font-inter text-black rounded-md cursor-pointer flex items-center justify-between"
                            onClick={() =>
                              setEndTimeDropdownOpen(!endTimeDropdownOpen)
                            }
                          >
                            <span
                              className="text-[12px] font-[500] font-inter text-headding-color tracking-widest
"
                            >
                              {selectedTimes.endTime}
                            </span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              className="absolute right-3"
                            >
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M4.23431 5.83429C4.54673 5.52187 5.05327 5.52187 5.36569 5.83429L8 8.4686L10.6343 5.83429C10.9467 5.52187 11.4533 5.52187 11.7657 5.83429C12.0781 6.14671 12.0781 6.65324 11.7657 6.96566L8.56569 10.1657C8.25327 10.4781 7.74673 10.4781 7.43431 10.1657L4.23431 6.96566C3.9219 6.65324 3.9219 6.14671 4.23431 5.83429Z"
                                fill="#636363"
                              />
                            </svg>
                          </div>

                          {/* End Time Options Dropdown */}
                          {endTimeDropdownOpen && (
                            <div
                              ref={endTimeDropdownRef}
                              className="absolute z-50 mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto w-full"
                            >
                              {timeOptions.map((time) => (
                                <div
                                  key={time}
                                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-[14px] font-inter"
                                  onClick={() =>
                                    handleTimeSelect(time, "endTime")
                                  }
                                >
                                  {time}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Store Activity Log from the second image */}

              <div className="bg-white border border-reloadBorder rounded-lg overflow-hidden">
                <div className="bg-background-grey p-4 pl-5 border-b border-reloadBorder">
                  <h2 className="font-inter text-[12px] font-[600] text-textHeading mb-2">
                    Store Activity Log
                  </h2>
                  <div className="flex justify-between items-center">
                    <p className="text-[12px] font-[500] font-inter text-cardTitle">
                      Track and view all actions and updates made by stores for
                      better monitoring and accountability.
                    </p>

                    <div className="flex items-center space-x-2 -mt-8">
                      <div className="relative w-80">
                        <div
                          className="w-full border border-reloadBorder rounded-custom px-4 py-3 flex items-center justify-between focus:outline-none bg-backgroundWhite cursor-pointer"
                          onClick={() => setShowAllDropdown(!showAllDropdown)}
                        >
                          <span className="text-[16px] font-[500] font-inter text-black">
                            {selectedFilter}
                          </span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="15"
                            viewBox="0 0 14 15"
                            fill="none"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M3.70503 5.60505C3.97839 5.33168 4.42161 5.33168 4.69497 5.60505L7 7.91007L9.30503 5.60505C9.57839 5.33168 10.0216 5.33168 10.295 5.60505C10.5683 5.87842 10.5683 6.32163 10.295 6.595L7.49497 9.395C7.22161 9.66837 6.77839 9.66837 6.50503 9.395L3.70503 6.595C3.43166 6.32163 3.43166 5.87842 3.70503 5.60505Z"
                              fill="#212121"
                            />
                          </svg>
                        </div>

                        {/* All Dropdown Menu */}
                        {showAllDropdown && (
                          <div
                            ref={allDropdownRef}
                            className="absolute z-50 mt-1 bg-white border border-gray-200 rounded-md shadow-lg w-full"
                          >
                            <ul className="py-1">
                              {[
                                "All",
                                "Today",
                                "This Week",
                                "This Month",
                                "Custom",
                              ].map((option) => (
                                <li
                                  key={option}
                                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-[14px] font-inter"
                                  onClick={() => {
                                    setSelectedFilter(option);
                                    setShowAllDropdown(false);
                                  }}
                                >
                                  {option}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Date Range Selector */}
                      <div className="relative w-80">
                        <div
                          className="w-full border border-reloadBorder rounded-custom font-inter px-4 py-3 flex items-center justify-between focus:outline-none bg-backgroundWhite cursor-pointer"
                          onClick={() => setShowDatePicker(!showDatePicker)}
                        >
                          <span className="text-[16px] font-[500] font-inter text-black">
                            {dateRange.startDate && dateRange.endDate
                              ? isSameDay(
                                  dateRange.startDate,
                                  dateRange.endDate
                                )
                                ? // When same date is selected, show date - same date
                                  `${formatDateForDisplay(
                                    dateRange.startDate
                                  )} - ${formatDateForDisplay(
                                    dateRange.endDate
                                  )}`
                                : // When range is selected, show start - end
                                  `${formatDateForDisplay(
                                    dateRange.startDate
                                  )} - ${formatDateForDisplay(
                                    dateRange.endDate
                                  )}`
                              : "Date Range"}
                          </span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14"
                            height="15"
                            viewBox="0 0 14 15"
                            fill="none"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M4.1999 1.90002C3.8133 1.90002 3.4999 2.21343 3.4999 2.60002V3.30002H2.7999C2.0267 3.30002 1.3999 3.92683 1.3999 4.70002V11.7C1.3999 12.4732 2.0267 13.1 2.7999 13.1H11.1999C11.9731 13.1 12.5999 12.4732 12.5999 11.7V4.70002C12.5999 3.92683 11.9731 3.30002 11.1999 3.30002H10.4999V2.60002C10.4999 2.21343 10.1865 1.90002 9.7999 1.90002C9.4133 1.90002 9.0999 2.21343 9.0999 2.60002V3.30002H4.8999V2.60002C4.8999 2.21343 4.5865 1.90002 4.1999 1.90002ZM4.1999 5.40002C3.8133 5.40002 3.4999 5.71343 3.4999 6.10002C3.4999 6.48662 3.8133 6.80002 4.1999 6.80002H9.7999C10.1865 6.80002 10.4999 6.48662 10.4999 6.10002C10.4999 5.71343 10.1865 5.40002 9.7999 5.40002H4.1999Z"
                              fill="#212121"
                            />
                          </svg>
                        </div>

                        {/* Date Range Picker Dropdown */}
                        {showDatePicker && (
                          <div
                            ref={datePickerRef}
                            className="absolute z-50 mt-1 bg-white border border-gray-200 rounded-md shadow-lg p-4 right-0 w-[36rem]"
                            style={{ width: "630px" }}
                          >
                            <div className="flex justify-between items-center mb-4 ">
                              <button
                                className="p-1 hover:bg-purple-100 rounded-full text-purple-600"
                                onClick={goToPreviousMonth}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <polyline points="15 18 9 12 15 6"></polyline>
                                </svg>
                              </button>

                              <div className="flex justify-center space-x-32">
                                <h3 className="text-textHeading font-inter font-[500] text-[16px]">
                                  {getMonthName(currentMonth.primaryMonth)}{" "}
                                  {currentMonth.primaryMonth.getFullYear()}
                                </h3>
                                <h3 className="text-textHeading font-inter font-[500] text-[16px]">
                                  {getMonthName(currentMonth.secondaryMonth)}{" "}
                                  {currentMonth.secondaryMonth.getFullYear()}
                                </h3>
                              </div>

                              <button
                                className="p-1 hover:bg-purple-100 rounded-full text-purple-600"
                                onClick={goToNextMonth}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                              </button>
                            </div>

                            <div className="flex justify-between space-x-4 ">
                              {/* Primary Month */}
                              <div className="flex-1 ">
                                <div className="grid grid-cols-7 gap-1 mb-2 ">
                                  {["S", "M", "T", "W", "T", "F", "S"].map(
                                    (day, i) => (
                                      <div
                                        key={i}
                                        className="text-center text-[12px] font-inter font-[500] text-gray-500"
                                      >
                                        {day}
                                      </div>
                                    )
                                  )}
                                </div>

                                <div className="grid grid-cols-7 gap-1 ">
                                  {(() => {
                                    // Get first day of month (0 = Sunday)
                                    const firstDay = new Date(
                                      currentMonth.primaryMonth.getFullYear(),
                                      currentMonth.primaryMonth.getMonth(),
                                      1
                                    ).getDay();
                                    const daysInMonth = getDaysInMonth(
                                      currentMonth.primaryMonth
                                    );

                                    // Create array for days of month
                                    const days = [];

                                    // Add empty cells for days before the 1st of the month
                                    for (let i = 0; i < firstDay; i++) {
                                      days.push(
                                        <div
                                          key={`empty-${i}`}
                                          className="text-center p-2"
                                        ></div>
                                      );
                                    }

                                    // Add days of the month
                                    for (
                                      let day = 1;
                                      day <= daysInMonth;
                                      day++
                                    ) {
                                      const date = new Date(
                                        currentMonth.primaryMonth.getFullYear(),
                                        currentMonth.primaryMonth.getMonth(),
                                        day
                                      );

                                      const isSelected = isSelectedDate(date);
                                      const inRange = isInRange(date);

                                      days.push(
                                        <button
                                          key={`day-${day}`}
                                          className={`
                      text-center text-[14px] font-inter font-[400] p-2 rounded-full
                      ${isSelected ? "bg-bgButton text-white" : ""}
                      ${inRange ? "bg-purple-100" : ""}
                      ${!isSelected && !inRange ? "hover:bg-purple-100" : ""}
                    `}
                                          onClick={() => handleDateSelect(date)}
                                        >
                                          {day}
                                        </button>
                                      );
                                    }

                                    return days;
                                  })()}
                                </div>
                              </div>

                              {/* Secondary Month */}
                              <div className="flex-1 border-l border-grey-border">
                                <div className="grid grid-cols-7 gap-1 mb-2">
                                  {["S", "M", "T", "W", "T", "F", "S"].map(
                                    (day, i) => (
                                      <div
                                        key={i}
                                        className="text-center text-[12px] font-inter font-[500] text-gray-500"
                                      >
                                        {day}
                                      </div>
                                    )
                                  )}
                                </div>

                                <div className="grid grid-cols-7 gap-1 ">
                                  {(() => {
                                    // Get first day of month (0 = Sunday)
                                    const firstDay = new Date(
                                      currentMonth.secondaryMonth.getFullYear(),
                                      currentMonth.secondaryMonth.getMonth(),
                                      1
                                    ).getDay();
                                    const daysInMonth = getDaysInMonth(
                                      currentMonth.secondaryMonth
                                    );

                                    // Create array for days of month
                                    const days = [];

                                    // Add empty cells for days before the 1st of the month
                                    for (let i = 0; i < firstDay; i++) {
                                      days.push(
                                        <div
                                          key={`empty-${i}`}
                                          className="text-center p-2"
                                        ></div>
                                      );
                                    }

                                    // Add days of the month
                                    for (
                                      let day = 1;
                                      day <= daysInMonth;
                                      day++
                                    ) {
                                      const date = new Date(
                                        currentMonth.secondaryMonth.getFullYear(),
                                        currentMonth.secondaryMonth.getMonth(),
                                        day
                                      );

                                      const isSelected = isSelectedDate(date);
                                      const inRange = isInRange(date);

                                      days.push(
                                        <button
                                          key={`day-${day}`}
                                          className={`
                      text-center text-[14px] font-inter font-[400] p-2 rounded-full
                      ${isSelected ? "bg-bgButton text-white" : ""}
                      ${inRange ? "bg-purple-100" : ""}
                      ${!isSelected && !inRange ? "hover:bg-purple-100" : ""}
                    `}
                                          onClick={() => handleDateSelect(date)}
                                        >
                                          {day}
                                        </button>
                                      );
                                    }

                                    return days;
                                  })()}
                                </div>
                              </div>
                            </div>

                            <div className="mt-4 flex justify-end">
                              <button
                                className="px-4 py-2 mr-2 text-[12px] font-[600] font-inter rounded-custom border border-reloadBorder"
                                onClick={() => setShowDatePicker(false)}
                              >
                                Cancel
                              </button>
                              <button
                                className="px-4 py-2 text-[12px] font-[600] font-inter rounded-custom bg-bgButton text-white border border-purple-700"
                                onClick={() => setShowDatePicker(false)}
                              >
                                Apply
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative py-4">
                  {/* Dashed vertical line */}
                  <div
                    className="absolute left-[23px] top-10 w-px h-[calc(100%-90px)] md:h-[calc(100%-100px)]  bottom-[100px] border-l border-gray-200 border-dashed"
                    style={{ borderWidth: "1px" }}
                  ></div>

                  <div className="relative pl-16 py-5 z-10">
                    <div className="absolute left-[16px] top-5 w-4 h-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <circle cx="8" cy="8" r="8" fill="#F2F2F2" />
                        <circle cx="8" cy="8" r="4" fill="#949494" />
                      </svg>
                    </div>
                    <p className="font-inter text-[14px] font-[600] text-textHeading mb-2">
                      Today at 4:14 PM
                    </p>
                    <p className="text-[12px] font-[500] font-inter text-cardTitle">
                      serving restriction in merchant delivery config is updated
                      to no restriction by Admin (test TOPO 1686442)
                    </p>
                  </div>

                  <div className="relative pl-16 py-5">
                    <div className="absolute left-[16px] top-5 w-4 h-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <circle cx="8" cy="8" r="8" fill="#F2F2F2" />
                        <circle cx="8" cy="8" r="4" fill="#949494" />
                      </svg>
                    </div>
                    <p className="font-inter text-[14px] font-[600] text-textHeading mb-2">
                      Today at 4:14 PM
                    </p>
                    <p className="text-[12px] font-[500] font-inter text-cardTitle">
                      serving restriction in merchant delivery config is updated
                      to no restriction by Admin (test TOPO 1686442)
                    </p>
                  </div>

                  <div className="relative pl-16 py-5">
                    <div className="absolute left-[16px] top-5 w-4 h-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <circle cx="8" cy="8" r="8" fill="#F2F2F2" />
                        <circle cx="8" cy="8" r="4" fill="#949494" />
                      </svg>
                    </div>
                    <p className="font-inter text-[14px] font-[600] text-textHeading mb-2">
                      Today at 4:14 PM
                    </p>
                    <p className="text-[12px] font-[500] font-inter text-cardTitle">
                      serving restriction in merchant delivery config is updated
                      to no restriction by Admin (test TOPO 1686442)
                    </p>
                  </div>

                  <div className="relative pl-16 py-5">
                    <div className="absolute left-[16px] top-5 w-4 h-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <circle cx="8" cy="8" r="8" fill="#F2F2F2" />
                        <circle cx="8" cy="8" r="4" fill="#949494" />
                      </svg>
                    </div>
                    <p className="font-inter text-[14px] font-[600] text-textHeading mb-2">
                      Today at 4:14 PM
                    </p>
                    <p className="text-[12px] font-[500] font-inter text-cardTitle">
                      serving restriction in merchant delivery config is updated
                      to no restriction by Admin (test TOPO 1686442)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "catalogue" && (
        <div className="bg-white ">
          {/* <p>Catalogue content goes here...</p> */}
          <Category hideHeader={true} hideScrollbar={true} />
        </div>
      )}
      <div className="bg-white mx-3">
        <div className="mt-0 px-5 md:w-2/3 bg-white mx-0 p-5">
          {activeTab === "configurations" && (
            <Store onClose={() => {}} onSave={() => {}} hideHeader={true} />
          )}
        </div>
      </div>
    </div>
  );
};

export default StoreDetailPage;
