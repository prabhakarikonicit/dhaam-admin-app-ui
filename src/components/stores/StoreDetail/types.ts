// Define shared interfaces for the StoreDetail components
export interface StoreItem {
    name: string;
    quantity: number;
    price: string;
  }
  
  export interface DateRange {
    startDate: Date;
    endDate: Date;
  }
  
  export interface CurrentMonthState {
    primaryMonth: Date;
    secondaryMonth: Date;
  }
  
  export interface StoreDetailPageProps {
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
  
  export interface TimeOption {
    startTime: string;
    endTime: string;
  }
  
  export type PaymentMethodsType = {
    cash: boolean;
    pg1: boolean;
    pg2: boolean;
  };
  
  export type PaymentMethodKey = keyof PaymentMethodsType;
  
  export interface CountryCode {
    code: string;
    flag: string;
    dialCode: string;
  }