import React, { useState, ChangeEvent } from "react";
import {
  CategoryItem,
  SubcategoryItem,
  SubSubcategoryItem,
  FormData,
  SelectedItemType,
} from "./categorytypes";
import CategoryList from "./categorylist";
import ProductView from "./productview";
import ProductSidebar from "../../../components/Menu/product/sidebar";
import CategoryProductSidebar from "./productsidebar";
import ProductsTable from "../../../components/Menu/product/producttable";
// Import modal components
import CategoryModal from "./modals/categorymodal";
import SubcategoryModal from "./modals/subcategorymodal";
import EditSubcategoryModal from "./modals/editsubcategorymodal";
import SubSubcategoryModal from "./modals/subsubcategorymodal";
import EditSubSubcategoryModal from "./modals/editsubsubcategorymodal";

// Import assets
import Vector from "../../../lib/Images/Vector.svg";
import Product from "../../../lib/Images/product.png";

interface CategoryProps {
  hideHeader?: boolean;
  hideScrollbar?: boolean; // Add new prop for controlling scrollbar
}
const Category: React.FC<CategoryProps> = ({ 
  hideHeader = false, 
  hideScrollbar = false 
}) => {
  interface ProductViewProps {
    selectedItem: SelectedItemType | null;
    onAddProduct: () => void;
  }
 
  // State for categories and expanded states
  const [expandedCategories, setExpandedCategories] = useState<{
    [key: string]: boolean;
  }>({});
  const [expandedSubcategories, setExpandedSubcategories] = useState<{
    [key: string]: boolean;
  }>({});
  const [showProductsTable, setShowProductsTable] = useState(false);
  console.log(showProductsTable, "TABLE");
  // State for selected item and panel visibility
  const [selectedItem, setSelectedItem] = useState<SelectedItemType | null>(
    null
  );
  const [isAddProductSidebarOpen, setIsAddProductSidebarOpen] =
    useState<boolean>(false);
  const [showExternalProductSidebar, setShowExternalProductSidebar] =
    useState(false);
  // Initial category data
  const [categories, setCategories] = useState<CategoryItem[]>([
    {
      id: "cat-1",
      name: "Beverages",
      description: "Refreshing drinks to energize your day.",
      status: true,
      subcategories: [
        {
          id: "subcat-1",
          name: "Hot Drinks",
          description: "Warm and comforting beverages to...",
          status: true,
          subSubcategories: [
            {
              id: "subsubcat-1",
              name: "Coffee",
              description: "Rich and aromatic coffee br...",
              status: true,
            },
            {
              id: "subsubcat-2",
              name: "Tea",
              description: "Soothing and refreshing tea...",
              status: true,
            },
            {
              id: "subsubcat-3",
              name: "Hot Chocolate",
              description: "Indulgent and velvety choc...",
              status: true,
            },
          ],
        },
        {
          id: "subcat-2",
          name: "Cold Drinks",
          description: "Chilled beverages to beat the heat.",
          status: true,
        },
        {
          id: "subcat-3",
          name: "Alcoholic Drinks",
          description: "Description",
          status: true,
        },
      ],
    },
  ]);

  // State for search functionality
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showProductSidebar, setShowProductSidebar] = useState(false);
  const products: any[] = [];
  // State for modal visibility
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSubcategoryModalOpen, setIsSubcategoryModalOpen] =
    useState<boolean>(false);
  const [isEditSubcategoryModalOpen, setIsEditSubcategoryModalOpen] =
    useState<boolean>(false);
  const [isSubSubcategoryModalOpen, setIsSubSubcategoryModalOpen] =
    useState<boolean>(false);
  const [isEditSubSubcategoryModalOpen, setIsEditSubSubcategoryModalOpen] =
    useState<boolean>(false);

  // State for modal mode and current items
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [currentItem, setCurrentItem] = useState<CategoryItem | null>(null);
  const [currentParentCategory, setCurrentParentCategory] =
    useState<CategoryItem | null>(null);
  const [currentSubcategoryItem, setCurrentSubcategoryItem] =
    useState<SubcategoryItem | null>(null);
  const [currentSubSubcategoryItem, setCurrentSubSubcategoryItem] =
    useState<SubSubcategoryItem | null>(null);
  // State for product sidebar visibility

  const [isExternalProductSidebarOpen, setIsExternalProductSidebarOpen] =
    useState<boolean>(false);
  // State for dropdown menus
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [openSubcatMenu, setOpenSubcatMenu] = useState<string | null>(null);
  const [openSubSubcatMenu, setOpenSubSubcatMenu] = useState<string | null>(
    null
  );
  // Add these functions to the Category component
  const handleDuplicateCategory = (category: CategoryItem): void => {
    const newCategory: CategoryItem = {
      id: `cat-${Date.now()}`,
      name: `${category.name} (Copy)`,
      description: category.description,
      status: category.status,
      subcategories: [...(category.subcategories || [])],
    };

    setCategories([...categories, newCategory]);
  };

  const handleDuplicateSubcategory = (
    category: CategoryItem,
    subcategory: SubcategoryItem
  ): void => {
    const newSubcategory: SubcategoryItem = {
      id: `subcat-${Date.now()}`,
      name: `${subcategory.name} (Copy)`,
      description: subcategory.description,
      status: subcategory.status,
      subSubcategories: [...(subcategory.subSubcategories || [])],
    };

    const updatedCategories = categories.map((cat) =>
      cat.id === category.id
        ? {
            ...cat,
            subcategories: [...(cat.subcategories || []), newSubcategory],
          }
        : cat
    );

    setCategories(updatedCategories);
  };

  const handleDuplicateSubSubcategory = (
    category: CategoryItem,
    subcategory: SubcategoryItem,
    subsubcategory: SubSubcategoryItem
  ): void => {
    const newSubSubcategory: SubSubcategoryItem = {
      id: `subsubcat-${Date.now()}`,
      name: `${subsubcategory.name} (Copy)`,
      description: subsubcategory.description,
      status: subsubcategory.status,
    };

    const updatedCategories = categories.map((cat) => {
      if (cat.id === category.id) {
        const updatedSubcategories =
          cat.subcategories?.map((subcat) => {
            if (subcat.id === subcategory.id) {
              return {
                ...subcat,
                subSubcategories: [
                  ...(subcat.subSubcategories || []),
                  newSubSubcategory,
                ],
              };
            }
            return subcat;
          }) || [];

        return {
          ...cat,
          subcategories: updatedSubcategories,
        };
      }
      return cat;
    });

    setCategories(updatedCategories);
  };
  // Function to toggle category expansion
  const toggleCategoryExpansion = (categoryId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Stop event from bubbling up
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };
  const handleAddNewProduct = () => {
    setIsAddProductSidebarOpen(false);
    setIsExternalProductSidebarOpen(true); // Use this instead of setShowExternalProductSidebar
  };
  // Function to toggle subcategory expansion
  const toggleSubcategoryExpansion = (
    subcategoryId: string,
    e: React.MouseEvent
  ) => {
    e.stopPropagation(); // Stop event from bubbling up
    setExpandedSubcategories((prev) => ({
      ...prev,
      [subcategoryId]: !prev[subcategoryId],
    }));
  };

  // Menu click handlers
  const handleMenuClick = (menuType: string): void => {
    setOpenMenu(openMenu === menuType ? null : menuType);
  };

  const handleSubcatMenuClick = (menuType: string): void => {
    setOpenSubcatMenu(openSubcatMenu === menuType ? null : menuType);
  };

  const handleSubSubcatMenuClick = (menuType: string): void => {
    setOpenSubSubcatMenu(openSubSubcatMenu === menuType ? null : menuType);
  };

  // Item selection handler
  const handleItemClick = (item: SelectedItemType): void => {
    setSelectedItem(item);
  };

  // Handle Add Product button click
  const handleAddProductClick = (): void => {
    setIsAddProductSidebarOpen(true);
  };

  // Handle external product sidebar close
  const handleExternalProductSidebarClose = (): void => {
    console.log("Close");
    setIsExternalProductSidebarOpen(false);
  };

  // Handle external product save
  const handleExternalProductSave = (product: any): void => {
    console.log("New product saved:", product);
    setIsExternalProductSidebarOpen(false);
    setShowProductsTable(true);
  };
  // Handle product sidebar close
  const handleProductSidebarClose = (): void => {
    setIsAddProductSidebarOpen(false);
  };

  // Handle product save
  const handleSaveProduct = (): void => {
    // Logic to save products would go here
    setIsAddProductSidebarOpen(false);
  };

  // Handle search input change
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  // Category modal functions
  const handleEditCategory = (category: CategoryItem | null): void => {
    setModalMode(category ? "edit" : "add");
    setCurrentItem(category);
    setIsModalOpen(true);
  };

  const handleSaveCategory = (formData: FormData): void => {
    console.log("Saving category:", formData);
    setIsModalOpen(false);

    // Add new category logic
    if (modalMode === "add") {
      const newCategory: CategoryItem = {
        id: `cat-${Date.now()}`,
        name: formData.name,
        description: formData.description || "",
        status: true,
        subcategories: [],
      };
      setCategories([...categories, newCategory]);
    } else if (currentItem) {
      // Edit category logic
      const updatedCategories = categories.map((cat) =>
        cat.id === currentItem.id ? { ...cat, ...formData } : cat
      );
      setCategories(updatedCategories);
    }
  };

  const handleDeleteCategory = (categoryId: string): void => {
    setCategories(categories.filter((c) => c.id !== categoryId));
    setOpenMenu(null);

    // Clear selected item if it was deleted
    if (selectedItem?.type === "category" && selectedItem.id === categoryId) {
      setSelectedItem(null);
    }
  };

  // Subcategory modal functions
  const handleAddSubcategory = (category: CategoryItem): void => {
    setCurrentParentCategory(category);
    setIsSubcategoryModalOpen(true);
  };

  const handleSaveSubcategory = (formData: FormData): void => {
    console.log("Saving subcategory:", formData);

    if (!formData.addMore) {
      setIsSubcategoryModalOpen(false);
    }

    if (currentParentCategory) {
      const newSubcategory: SubcategoryItem = {
        id: `subcat-${Date.now()}`,
        name: formData.name,
        description: formData.description || "",
        status: true,
      };

      const updatedCategories = categories.map((cat) =>
        cat.id === currentParentCategory.id
          ? {
              ...cat,
              subcategories: [...(cat.subcategories || []), newSubcategory],
            }
          : cat
      );

      setCategories(updatedCategories);
    }
  };

  const handleEditSubcategory = (
    category: CategoryItem,
    subcategory: SubcategoryItem
  ): void => {
    setCurrentParentCategory(category);
    setCurrentSubcategoryItem(subcategory);
    setIsEditSubcategoryModalOpen(true);
    setOpenSubcatMenu(null);
  };

  const handleSaveEditSubcategory = (formData: FormData): void => {
    console.log("Saving edited subcategory:", formData);
    setIsEditSubcategoryModalOpen(false);

    if (currentParentCategory && currentSubcategoryItem) {
      const updatedCategories = categories.map((cat) => {
        if (cat.id === currentParentCategory.id) {
          const updatedSubcategories =
            cat.subcategories?.map((subcat) =>
              subcat.id === currentSubcategoryItem.id
                ? {
                    ...subcat,
                    name: formData.name,
                    description: formData.description || "",
                  }
                : subcat
            ) || [];

          return {
            ...cat,
            subcategories: updatedSubcategories,
          };
        }
        return cat;
      });

      setCategories(updatedCategories);

      // Update selected item if it was edited
      if (
        selectedItem?.type === "subcategory" &&
        selectedItem.id === currentSubcategoryItem.id
      ) {
        setSelectedItem({
          ...selectedItem,
          name: formData.name,
        });
      }
    }
  };

  const handleDeleteSubcategory = (
    category: CategoryItem,
    subcategoryId: string
  ): void => {
    const updatedCategories = categories.map((cat) => {
      if (cat.id === category.id) {
        return {
          ...cat,
          subcategories: cat.subcategories?.filter(
            (subcat) => subcat.id !== subcategoryId
          ),
        };
      }
      return cat;
    });

    setCategories(updatedCategories);
    setOpenSubcatMenu(null);

    // Clear selected item if it was deleted
    if (
      selectedItem?.type === "subcategory" &&
      selectedItem.id === subcategoryId
    ) {
      setSelectedItem(null);
    }
  };

  // Sub-subcategory modal functions
  const handleAddSubSubcategory = (
    category: CategoryItem,
    subcategory: SubcategoryItem,
    e: React.MouseEvent
  ): void => {
    e.stopPropagation(); // Prevent event bubbling
    setCurrentParentCategory(category);
    setCurrentSubcategoryItem(subcategory);
    setIsSubSubcategoryModalOpen(true);
  };

  const handleSaveSubSubcategory = (formData: FormData): void => {
    console.log("Saving sub-subcategory:", formData);

    if (currentParentCategory && currentSubcategoryItem) {
      const newSubSubcategory: SubSubcategoryItem = {
        id: `subsubcat-${Date.now()}`,
        name: formData.name,
        description: formData.description || "",
        status: true,
      };

      const updatedCategories = categories.map((cat) => {
        if (cat.id === currentParentCategory.id) {
          const updatedSubcategories =
            cat.subcategories?.map((subcat) => {
              if (subcat.id === currentSubcategoryItem.id) {
                return {
                  ...subcat,
                  subSubcategories: [
                    ...(subcat.subSubcategories || []),
                    newSubSubcategory,
                  ],
                };
              }
              return subcat;
            }) || [];

          return {
            ...cat,
            subcategories: updatedSubcategories,
          };
        }
        return cat;
      });

      setCategories(updatedCategories);

      // Only close if not adding more
      const addMore = formData.addMore;
      if (!addMore) {
        setIsSubSubcategoryModalOpen(false);
      }
    } else {
      setIsSubSubcategoryModalOpen(false);
    }
  };

  const handleEditSubSubcategory = (
    category: CategoryItem,
    subcategory: SubcategoryItem,
    subsubcategory: SubSubcategoryItem,
    e: React.MouseEvent
  ): void => {
    e.stopPropagation(); // Prevent event bubbling
    setCurrentParentCategory(category);
    setCurrentSubcategoryItem(subcategory);
    setCurrentSubSubcategoryItem(subsubcategory);
    setIsEditSubSubcategoryModalOpen(true);
    setOpenSubSubcatMenu(null);
  };

  const handleSaveEditSubSubcategory = (formData: FormData): void => {
    console.log("Saving edited sub-subcategory:", formData);
    setIsEditSubSubcategoryModalOpen(false);

    if (
      currentParentCategory &&
      currentSubcategoryItem &&
      currentSubSubcategoryItem
    ) {
      const updatedCategories = categories.map((cat) => {
        if (cat.id === currentParentCategory.id) {
          const updatedSubcategories =
            cat.subcategories?.map((subcat) => {
              if (subcat.id === currentSubcategoryItem.id) {
                const updatedSubSubcategories =
                  subcat.subSubcategories?.map((subsubcat) =>
                    subsubcat.id === currentSubSubcategoryItem.id
                      ? {
                          ...subsubcat,
                          name: formData.name,
                          description: formData.description || "",
                        }
                      : subsubcat
                  ) || [];

                return {
                  ...subcat,
                  subSubcategories: updatedSubSubcategories,
                };
              }
              return subcat;
            }) || [];

          return {
            ...cat,
            subcategories: updatedSubcategories,
          };
        }
        return cat;
      });

      setCategories(updatedCategories);

      // Update selected item if it was edited
      if (
        selectedItem?.type === "subSubcategory" &&
        selectedItem.id === currentSubSubcategoryItem.id
      ) {
        setSelectedItem({
          ...selectedItem,
          name: formData.name,
        });
      }
    }
  };

  const handleDeleteSubSubcategory = (
    category: CategoryItem,
    subcategory: SubcategoryItem,
    subsubcategoryId: string
  ): void => {
    const updatedCategories = categories.map((cat) => {
      if (cat.id === category.id) {
        const updatedSubcategories =
          cat.subcategories?.map((subcat) => {
            if (subcat.id === subcategory.id) {
              return {
                ...subcat,
                subSubcategories:
                  subcat.subSubcategories?.filter(
                    (subsubcat) => subsubcat.id !== subsubcategoryId
                  ) || [],
              };
            }
            return subcat;
          }) || [];

        return {
          ...cat,
          subcategories: updatedSubcategories,
        };
      }
      return cat;
    });

    setCategories(updatedCategories);
    setOpenSubSubcatMenu(null);

    // Clear selected item if it was deleted
    if (
      selectedItem?.type === "subSubcategory" &&
      selectedItem.id === subsubcategoryId
    ) {
      setSelectedItem(null);
    }
  };

  return (

      <div className={`${hideScrollbar ? 'overflow-hidden h-auto' : 'min-h-screen overflow-auto h-[calc(100vh-50px)]'} bg-background-grey flex-grow`}>
      {/* Header with title and location selector */}
      {!hideHeader && (
      <div className="flex justify-between items-center py-4 px-4 bg-background-grey">
        <h1 className="text-cardValue text-[20px] font-inter font-[600]">
          Category
        </h1>
        <div className="relative w-[55%] md:w-[22%]">
          <select className="appearance-none block w-full bg-white border border-reloadBorder rounded-custom8px py-3 pl-3 pr-6 text-verifyOtp text-[12px] md:text-[14px] sm:text-[14px] lg:text-[14px] xl:text-[14px] font-inter font-[400] placeholder: focus:outline-none focus:ring-purple-500 focus:border-purple-500">
            <option className="border border-reloadBorder py-2 pl-3 pr-10 text-verifyOtp text-[14px] font-inter font-[400]">
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
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.29289 7.29289C5.68342 6.90237 6.31658 6.90237 6.70711 7.29289L10 10.5858L13.2929 7.29289C13.6834 6.90237 14.3166 6.90237 14.7071 7.29289C15.0976 7.68342 15.0976 8.31658 14.7071 8.70711L10.7071 12.7071C10.3166 13.0976 9.68342 13.0976 9.29289 12.7071L5.29289 8.70711C4.90237 8.31658 4.90237 7.68342 5.29289 7.29289Z"
                fill="#949494"
              />
            </svg>
          </div>
        </div>
      </div>
         )}

      {/* Search and action buttons - Hide on mobile */}
      <div className="hidden md:flex justify-between items-center px-2 py-2 mx-4 rounded-custom10px p-4 bg-backgroundWhite">
        {/* Search input */}
        <div className="relative w-full sm:w-auto sm:flex-1 max-w-lg">
          <input
            type="text"
            placeholder="Search Category"
            className="border border-gray-300 pl-10 pr-4 py-3 w-64 border border-grey-border rounded-custom7px leading-5 text-[12px] text-cardTitle font-inter font-[500] bg-white shadow-sm focus:outline-none focus:ring-1 focus:ring-bgButton focus:border-purple-500 sm:text-[12px]"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex space-x-3">
          {/* Reorder, Export, Import buttons */}
          <button className="flex items-center space-x-2 px-4 py-2">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <span className="text-textHeading text-[12px] font[500] font-inter">
              Reorder
            </span>
          </button>
          {/* Other buttons remain unchanged */}
          <button className="flex items-center space-x-2 px-4 py-2">
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
            <span className="text-textHeading text-[12px] font[500] font-inter">
              Export
            </span>
          </button>

          <button className="flex items-center space-x-2 px-4 py-2">
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            <span className="text-textHeading text-[12px] font[500] font-inter">
              Import
            </span>
          </button>
        </div>
      </div>

      {/* Mobile search and view - Visible only on mobile */}
      {/* <div className="md:hidden px-4 py-2 mx-2 bg-backgroundWhite rounded-custom10px">
        <div className="relative w-full mb-4">
          <input
            type="text"
            placeholder="Search Category"
            className="border border-gray-300 rounded-md pl-10 pr-4 py-2 w-full border-grey-border rounded-custom7px leading-5 text-[12px] text-cardTitle font-inter font-[500] bg-white shadow-sm focus:outline-none focus:ring-1 focus:ring-bgButton focus:border-purple-500"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div> */}

      {/* Main content */}
      <div className="flex flex-col md:flex-row mt-6 px-2 ms-2 mr-2 gap-4">
        {/* Left Column - Category List */}
        <div className="w-full md:w-[40%] p-3 bg-backgroundWhite rounded-custom12px">
          <div className="hidden md:flex flex justify-between items-center p-4 bg-backgroundWhite rounded-custom12px">
            <div>
              <h2 className="text-[14px] text-textHeading font-inter font-[500] leading-[21px]">
                Category
              </h2>
              <p className="text-[12px] font-inter font-[500] text-cardTitle  pb-0 whitespace-nowrap">
                Organise and manage products or services for <br /> better
                discoverability and navigation.
              </p>
            </div>

            <div className="flex space-x-2 ms-4 -mt-20">
              <button
                onClick={() => handleEditCategory(null)}
                className="px-4 py-2 border border-btnBorder mt-2 font-[600] font-inter text-[12px] text-customWhiteColor rounded-custom bg-bgButton"
              >
                Add
              </button>
              <button className="p-2 border border-reloadBorder mt-2 rounded-custom bg-backgroundWhite">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
              </button>
            </div>
          </div>
          <div className="hidden md:block border-b border-grey-border mb-4"></div>
          {/* for mobile view */}
          <div className="flex md:hidden flex justify-between items-center mx-2 px-0 py-3 bg-backgroundWhite rounded-custom12px">
            <div>
              <h2 className="text-[14px] text-textHeading font-inter font-[600] leading-[21px]">
                Category
              </h2>
              <p className="text-[14px] font-inter font-[500] text-cardTitle ">
                Organise and manage products or <br />
                services for better discoverability and navigation.
              </p>
            </div>
            <div className="flex space-x-2 ms-4 -mt-20">
              <button className="p-2 border border-reloadBorder  rounded-custom bg-backgroundWhite">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Search input for mobile */}
          <div className="block md:hidden mt-2 flex items-cente mb-5 pb-5 p-0 border-b border-grey-border">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search Category"
                className="w-full border border-gray-300  pl-10 pr-4 py-3  border border-grey-border rounded-custom7px leading-5 text-[12px] text-cardTitle font-inter font-[500] bg-white shadow-sm focus:outline-none focus:ring-1 focus:ring-bgButton focus:border-purple-500 sm:text-[12px]"
              />

              <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400">
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
                    d="M6.39961 3.19961C4.6323 3.19961 3.19961 4.6323 3.19961 6.39961C3.19961 8.16692 4.6323 9.59961 6.39961 9.59961C8.16692 9.59961 9.59961 8.16692 9.59961 6.39961C9.59961 4.6323 8.16692 3.19961 6.39961 3.19961ZM1.59961 6.39961C1.59961 3.74864 3.74864 1.59961 6.39961 1.59961C9.05058 1.59961 11.1996 3.74864 11.1996 6.39961C11.1996 7.43627 10.871 8.39618 10.3122 9.18084L14.1653 13.0339C14.4777 13.3463 14.4777 13.8529 14.1653 14.1653C13.8529 14.4777 13.3463 14.4777 13.0339 14.1653L9.18084 10.3122C8.39618 10.871 7.43627 11.1996 6.39961 11.1996C3.74864 11.1996 1.59961 9.05058 1.59961 6.39961Z"
                    fill="#949494"
                  />
                </svg>
              </span>
            </div>
            <button
              className="ml-2 px-5 py-3 text-[14px] font-[600] font-inter text-customWhiteColor rounded-custom bg-bgButton"
              onClick={() => handleEditCategory(null)}
            >
              Add
            </button>
          </div>

          {/* Category List Component */}
          <CategoryList
            categories={categories}
            searchTerm={searchTerm}
            expandedCategories={expandedCategories}
            expandedSubcategories={expandedSubcategories}
            openMenu={openMenu}
            openSubcatMenu={openSubcatMenu}
            openSubSubcatMenu={openSubSubcatMenu}
            selectedItem={selectedItem}
            toggleCategoryExpansion={toggleCategoryExpansion}
            toggleSubcategoryExpansion={toggleSubcategoryExpansion}
            handleMenuClick={handleMenuClick}
            handleSubcatMenuClick={handleSubcatMenuClick}
            handleSubSubcatMenuClick={handleSubSubcatMenuClick}
            handleEditCategory={handleEditCategory}
            handleDeleteCategory={handleDeleteCategory}
            handleAddSubcategory={handleAddSubcategory}
            handleEditSubcategory={handleEditSubcategory}
            handleDeleteSubcategory={handleDeleteSubcategory}
            handleAddSubSubcategory={handleAddSubSubcategory}
            handleEditSubSubcategory={handleEditSubSubcategory}
            handleDeleteSubSubcategory={handleDeleteSubSubcategory}
            handleDuplicateCategory={handleDuplicateCategory}
            handleDuplicateSubcategory={handleDuplicateSubcategory}
            handleDuplicateSubSubcategory={handleDuplicateSubSubcategory}
            handleItemClick={handleItemClick}
          />
        </div>

        {/* Right Column - Product View or Info Panel - Hide on mobile */}
        {showProductsTable ? (
          <div className="hidden md:block w-full md:w-2/3">
            <div className="bg-white rounded-custom12px overflow-hidden ">
              <div className="border-t border-r border-l border-reloadBorder rounded-t-custom12px ">
                {/* Product View header with search */}
                <div className="flex justify-between items-center py-2 px-4 border-b border-grey-border">
                  <h2 className="text-12px font-[500] font-inter text-textHeading">
                    ({products.length}) products in{" "}
                    <span className="font-[12px] font-[700] font-inter">
                      {selectedItem?.name || "All Products"}
                    </span>
                  </h2>
                  <div className="flex space-x-2">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search products"
                        className="border border-grey-border rounded-custom7px leading-5 text-[12px] text-cardTitle font-inter font-[500] bg-white pl-10 pr-4 py-2 w-64"
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                          className="h-5 w-5 text-gray-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                    <button
                      onClick={handleAddProductClick}
                      className="px-4 py-2 border border-btnBorder font-[600] font-inter text-[12px] text-customWhiteColor rounded-custom bg-bgButton"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>

              {/* ProductsTable */}
              <ProductsTable />
            </div>
          </div>
        ) : (
          <div className="hidden md:block w-full md:w-2/3 bg-white rounded-custom12px p-3 overflow-hidden">
            <div className="border border-grey-border rounded-custom12px h-full">
              {selectedItem ? (
                <ProductView
                  selectedItem={selectedItem}
                  onAddProduct={handleAddProductClick}
                />
              ) : (
                <div className="h-full flex justify-center mt-28">
                  <div className="pr-4 relative">
                    <div className="flex flex-col items-center">
                      <img src={Vector} alt="" className="text-center mb-4" />
                      <h3 className="text-[14px] text-headding-color font-[700] font-inter mb-2 mt-4 text-center">
                        Learn More About How Our Menu Works
                      </h3>
                      <p className="text-cardTitle text-[12px] italic font-[500] font-inter mb-4 text-center">
                        Our menu structure is designed to give you complete
                        flexibility and customization.
                        <br /> Organize your menu in a way that suits your
                        business and simplifies the browsing
                        <br /> experience for your customers. Here's how it
                        works.
                      </p>
                      <button className="px-4 py-2 bg-white border border-reloadBorder rounded-custom text-cardValue text-[12px] font-[600] font-inter hover:bg-gray-50 text-center">
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* The rest of your code (sidebars and modals) remains unchanged */}
      {!isExternalProductSidebarOpen && (
        <CategoryProductSidebar
          isOpen={isAddProductSidebarOpen}
          selectedItem={selectedItem}
          onClose={handleProductSidebarClose}
          onSave={handleSaveProduct}
          onAddNewProduct={handleAddNewProduct}
        />
      )}

      <ProductSidebar
        isOpen={isExternalProductSidebarOpen}
        onClose={handleExternalProductSidebarClose}
        onSave={handleExternalProductSave}
      />

      {/* Modals */}
      {isModalOpen && (
        <CategoryModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveCategory}
          mode={modalMode}
          currentItem={currentItem}
        />
      )}

      {isSubcategoryModalOpen && (
        <SubcategoryModal
          isOpen={isSubcategoryModalOpen}
          onClose={() => setIsSubcategoryModalOpen(false)}
          onSave={handleSaveSubcategory}
          currentParentCategory={currentParentCategory}
          // mode="add"  // Add this line to fix the error
        />
      )}

      {isEditSubcategoryModalOpen && (
        <EditSubcategoryModal
          isOpen={isEditSubcategoryModalOpen}
          onClose={() => setIsEditSubcategoryModalOpen(false)}
          onSave={handleSaveEditSubcategory}
          currentParentCategory={currentParentCategory}
          currentSubcategoryItem={currentSubcategoryItem}
        />
      )}

      {isSubSubcategoryModalOpen && (
        <SubSubcategoryModal
          isOpen={isSubSubcategoryModalOpen}
          onClose={() => setIsSubSubcategoryModalOpen(false)}
          onSave={handleSaveSubSubcategory}
          currentParentCategory={currentParentCategory}
          currentSubcategoryItem={currentSubcategoryItem}
        />
      )}

      {isEditSubSubcategoryModalOpen && (
        <EditSubSubcategoryModal
          isOpen={isEditSubSubcategoryModalOpen}
          onClose={() => setIsEditSubSubcategoryModalOpen(false)}
          onSave={handleSaveEditSubSubcategory}
          currentParentCategory={currentParentCategory}
          currentSubcategoryItem={currentSubcategoryItem}
          currentSubSubcategoryItem={currentSubSubcategoryItem}
        />
      )}
    </div>
  );
};

export default Category;
