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

const Category: React.FC = () => {
  // State for categories and expanded states
  const [expandedCategories, setExpandedCategories] = useState<{
    [key: string]: boolean;
  }>({});
  const [expandedSubcategories, setExpandedSubcategories] = useState<{
    [key: string]: boolean;
  }>({});
  const [showProductsTable, setShowProductsTable] = useState(false);
console.log(showProductsTable,"TABLE")
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
          description: "Warm and comforting beverages to enjoy.",
          status: true,
          subSubcategories: [
            {
              id: "subsubcat-1",
              name: "Coffee",
              description: "Rich and aromatic coffee brands.",
              status: true,
            },
            {
              id: "subsubcat-2",
              name: "Tea",
              description: "Soothing and refreshing tea varieties.",
              status: true,
            },
            {
              id: "subsubcat-3",
              name: "Hot Chocolate",
              description: "Indulgent and velvety chocolate drinks.",
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

  // Function to toggle category expansion
  const toggleCategoryExpansion = (categoryId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Stop event from bubbling up
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };
  const handleAddNewProduct = () => {
    setIsAddProductSidebarOpen(false); // Close current sidebar
    setShowExternalProductSidebar(true); // Show external sidebar
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
    <div>
      {/* Header with title and location selector */}
      <div className="flex justify-between items-center py-4 px-4 ">
        <h1 className="text-2xl font-medium">Category</h1>
        <div className="relative">
          <select className="appearance-none border border-gray-300 rounded-md px-4 py-2 pr-10 bg-white">
            <option>Queenstown Public House</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
{/* <ProductsTable/> */}
      {/* Search and action buttons */}
      <div className="flex justify-between items-center px-4 py-2 border-t border-b border-gray-200 ">
        <div className="relative">
          <input
            type="text"
            placeholder="Search Category"
            className="border border-gray-300 rounded-md pl-10 pr-4 py-2 w-64"
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

        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md">
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
            <span>Reorder</span>
          </button>

          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md">
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
            <span>Export</span>
          </button>

          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md">
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
            <span>Import</span>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex mt-4 px-4 gap-4">
        {/* Left Column - Category List */}
        <div className="w-1/3 bg-white border border-gray-200 rounded-md">
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <div>
              <h2 className="text-lg font-medium">Category</h2>
              <p className="text-sm text-gray-500">
                Organise and manage products or services for
                <br /> better discoverability and navigation.
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEditCategory(null)}
                className="px-4 py-2 border border-gray-300 rounded-md bg-white"
              >
                Add
              </button>
              <button className="p-2 border border-gray-300 rounded-md bg-white">
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
            handleItemClick={handleItemClick}
          />
        </div>

        {/* Right Column - Product View or Info Panel */}
        {showProductsTable ? (
          <ProductsTable />

        ) : (
          <>
        <div className="w-2/3 bg-white border border-gray-200 rounded-md overflow-hidden">
          {selectedItem ? (
            <ProductView
              selectedItem={selectedItem}
              onAddProduct={handleAddProductClick}
            />
          ) : (
            <div className="h-full flex justify-center">
              <div className="pr-4 relative left-10 top-10">
                <img src={Vector} alt="" />
                <h3 className="text-xl font-medium mb-2">
                  Learn More About How Our Menu Works
                </h3>
                <p className="text-gray-600 mb-4">
                  Our menu structure is designed to give you complete
                  flexibility and customization. Organize your menu in a way
                  that suits your business and simplifies the browsing
                  experience for your customers. Here's how it works.
                </p>
                <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                  Learn More
                </button>
              </div>
            </div>
          )}
        </div>
        </>
        )}
      </div>

      {/* Product Sidebar */}

      {/* <CategoryProductSidebar
        isOpen={isAddProductSidebarOpen}
        selectedItem={selectedItem}
        onClose={handleProductSidebarClose}
        onSave={handleSaveProduct}
      /> */}
   {!isExternalProductSidebarOpen && (
        <CategoryProductSidebar
          isOpen={isAddProductSidebarOpen}
          selectedItem={selectedItem}
          onClose={handleProductSidebarClose}
          onSave={handleSaveProduct}
          onAddNewProduct={() => setIsExternalProductSidebarOpen(true)}
        />
      )}
       
      <ProductSidebar
        isOpen={isExternalProductSidebarOpen}
        // selectedItem={selectedItem}
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
