import React, { useState } from "react";
import ProductSidebar from "./sidebar";
import ProductsTable from "./producttable";
// Define product interface
interface Product {
  id: string;
  name: string;
  price: string;
  description?: string;
  category?: string;
  isActive: boolean;
  [key: string]: any;
}

const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showProductsTable, setShowProductsTable] = useState(false);
  // Handle opening the sidebar
  const handleOpenSidebar = () => {
    setIsSidebarOpen(true);
    setShowProductsTable(false);
  };

  // Handle saving a product
  const handleSaveProduct = (product: Product) => {
    if (!product.id) {
      // Add new product
      const newProduct = {
        ...product,
        id: Date.now().toString(),
      };
      setProducts([...products, newProduct]);
    } else {
      // Update existing product
      setProducts(products.map((p) => (p.id === product.id ? product : p)));
    }
    setIsSidebarOpen(false);
    setShowProductsTable(true);
  };

  // Filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background-grey flex-grow overflow-auto h-[calc(100vh-60px)]">
      {/* Header */}
      <div className="w-full bg-background-grey">
        <div className="max-w-full rounded-custom12px p-6  sm:max-h-full md:max-h-full lg:max-h-full xl:max-h-full max-h-[80vh] overflow-y-auto sm:overflow-visible md:overflow-visible lg:overflow-visible xl:overflow-visible mb-0 mx-auto px-4 sm:px-6 lg:px-4 py-4 flex justify-between items-center">
          <h1 className="text-cardValue text-[20px] font-inter font-[600]">
            Product
          </h1>
          <div className="relative w-[22%]">
            <select className="appearance-none block w-full bg-white border border-reloadBorder rounded-custom8px py-3 pl-3 pr-6 text-verifyOtp text-[14px] font-inter font-[400] placeholder: focus:outline-none focus:ring-purple-500 focus:border-purple-500">
              <option className="border border-reloadBorder py-2 pl-3 pr-10 text-verifyOtp text-[14px] font-inter font-[400] ">
                Queenstown Public House
              </option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
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
                  d="M5.29289 7.29289C5.68342 6.90237 6.31658 6.90237 6.70711 7.29289L10 10.5858L13.2929 7.29289C13.6834 6.90237 14.3166 6.90237 14.7071 7.29289C15.0976 7.68342 15.0976 8.31658 14.7071 8.70711L10.7071 12.7071C10.3166 13.0976 9.68342 13.0976 9.29289 12.7071L5.29289 8.70711C4.90237 8.31658 4.90237 7.68342 5.29289 7.29289Z"
                  fill="#949494"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-8xl mx-auto px-4 sm:px-4 lg:px-4 py-6 ">
        {/* Search and Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 rounded-custom10px bg-backgroundWhite p-4">
          <div className="relative w-full sm:w-auto sm:flex-1 max-w-lg">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
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
                  d="M6.39961 3.2001C4.6323 3.2001 3.19961 4.63279 3.19961 6.4001C3.19961 8.16741 4.6323 9.6001 6.39961 9.6001C8.16692 9.6001 9.59961 8.16741 9.59961 6.4001C9.59961 4.63279 8.16692 3.2001 6.39961 3.2001ZM1.59961 6.4001C1.59961 3.74913 3.74864 1.6001 6.39961 1.6001C9.05058 1.6001 11.1996 3.74913 11.1996 6.4001C11.1996 7.43676 10.871 8.39667 10.3122 9.18133L14.1653 13.0344C14.4777 13.3468 14.4777 13.8534 14.1653 14.1658C13.8529 14.4782 13.3463 14.4782 13.0339 14.1658L9.18084 10.3127C8.39618 10.8715 7.43627 11.2001 6.39961 11.2001C3.74864 11.2001 1.59961 9.05106 1.59961 6.4001Z"
                  fill="#949494"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search Products"
              className="block w-full md:w-[213px] pl-10 pr-3 py-2 border border-grey-border rounded-custom7px leading-5 text-[12px] text-cardTitle font-inter font-[500] bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-[12px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-shrink-0 space-x-2">
            <button className="inline-flex items-center px-4 py-2 text-[12px] font-[500] font-inter text-reloadBorder focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <g clip-path="url(#clip0_7731_3494)">
                  <path
                    d="M11.0545 10.615C10.9501 10.6152 10.8466 10.5948 10.7501 10.5549C10.6535 10.515 10.5658 10.4564 10.4919 10.3826C10.4181 10.3087 10.3595 10.221 10.3196 10.1244C10.2797 10.0279 10.2593 9.92442 10.2595 9.81995L10.2595 5.00357L3.38425 11.8788C3.23539 12.0276 3.03351 12.1112 2.823 12.1112C2.6125 12.1112 2.41061 12.0276 2.26176 11.8788C2.11291 11.7299 2.02929 11.528 2.02929 11.3175C2.02929 11.107 2.11291 10.9051 2.26176 10.7563L9.13697 3.88108L4.31965 3.88015C4.10878 3.88015 3.90654 3.79638 3.75743 3.64727C3.60832 3.49816 3.52456 3.29593 3.52456 3.08506C3.52456 2.87418 3.60832 2.67195 3.75743 2.52284C3.90654 2.37373 4.10878 2.28996 4.31965 2.28996L11.0545 2.28996C11.159 2.28978 11.2625 2.31022 11.359 2.35012C11.4556 2.39001 11.5433 2.44857 11.6172 2.52244C11.691 2.5963 11.7496 2.68403 11.7895 2.78057C11.8294 2.87712 11.8498 2.98059 11.8496 3.08506L11.8496 9.81995C11.8498 9.92442 11.8294 10.0279 11.7895 10.1244C11.7496 10.221 11.691 10.3087 11.6172 10.3826C11.5433 10.4564 11.4556 10.515 11.359 10.5549C11.2625 10.5948 11.159 10.6152 11.0545 10.615Z"
                    fill="#C2C2C2"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_7731_3494">
                    <rect width="14" height="14" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <span className="mx-2 text-[12px] font-[500] font-inter text-reloadBorder">
                Export
              </span>
            </button>
            <button className="inline-flex items-center px-4 py-2 text-[12px] font-inter font-[500] text-textHeading  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
              >
                <g clip-path="url(#clip0_7731_3483)">
                  <path
                    d="M2.82436 3.78632C2.92883 3.78614 3.0323 3.80658 3.12885 3.84648C3.22539 3.88637 3.31312 3.94493 3.38698 4.0188C3.46085 4.09266 3.51941 4.18038 3.5593 4.27693C3.59919 4.37348 3.61964 4.47695 3.61945 4.58142L3.61945 9.3978L10.4947 2.5226C10.6435 2.37375 10.8454 2.29012 11.0559 2.29012C11.2664 2.29012 11.4683 2.37375 11.6171 2.5226C11.766 2.67145 11.8496 2.87333 11.8496 3.08384C11.8496 3.29434 11.766 3.49623 11.6171 3.64508L4.74194 10.5203L9.55926 10.5212C9.77013 10.5212 9.97236 10.605 10.1215 10.7541C10.2706 10.9032 10.3544 11.1054 10.3544 11.3163C10.3544 11.5272 10.2706 11.7294 10.1215 11.8785C9.97236 12.0276 9.77013 12.1114 9.55926 12.1114L2.82436 12.1114C2.7199 12.1116 2.61643 12.0911 2.51988 12.0513C2.42333 12.0114 2.33561 11.9528 2.26174 11.8789C2.18788 11.8051 2.12932 11.7173 2.08942 11.6208C2.04953 11.5242 2.02909 11.4208 2.02927 11.3163L2.02927 4.58142C2.02909 4.47695 2.04953 4.37348 2.08942 4.27693C2.12932 4.18039 2.18788 4.09266 2.26174 4.0188C2.33561 3.94493 2.42333 3.88637 2.51988 3.84648C2.61643 3.80658 2.7199 3.78614 2.82436 3.78632Z"
                    fill="#2B2B2B"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_7731_3483">
                    <rect width="14" height="14" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <span className="mx-2 text-[12px] font-[500] font-inter text-textHeading ">
                Import
              </span>
            </button>
            <button
              onClick={handleOpenSidebar}
              className="inline-flex items-center px-5 py-3 border border-btnBorder text-[12px] font-[600] font-inter rounded-custom text-whiteColor bg-bgButton hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Add Product
            </button>
          </div>
        </div>
        {showProductsTable ? (
          <ProductsTable />
        ) : (
          <>
            {/* Empty State */}
            {products.length === 0 && (
              <div className="mt-12 text-center">
                <div className="mx-auto w-32 h-32">
                  <svg
                    className="w-full h-full text-orange-400"
                    viewBox="0 0 200 200"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M76.5 155H123.5L150 113.5L123.5 72H76.5L50 113.5L76.5 155Z"
                      fill="#F4A261"
                      stroke="#F4A261"
                      strokeWidth="4"
                    />
                    <path
                      d="M86 72V38.5M114 72V38.5M67 114H50M150 114H133M86 38.5H114M86 38.5L67 57M114 38.5L133 57"
                      stroke="#CCC"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <h3 className="mt-2 text-[14px] font-[700] font-inter text-headding-color leading-[21px]">
                  No products added yet
                </h3>
                <p className="mt-1 text-[12px] font-[500] font-inter text-cardTitle">
                  Add your first product to get started!
                </p>
                <div className="mt-6">
                  <button
                    onClick={handleOpenSidebar}
                    className="inline-flex items-center px-6 py-2 border border-reloadBorder text-[12px] font-inter font-[600] rounded-custom text-cardValue bg-backgroundWhite hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    Add
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {/* Product Sidebar */}
        <ProductSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          onSave={handleSaveProduct}
        />
      </div>
    </div>
  );
};

export default ProductManagement;
