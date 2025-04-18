import React, { useState, ChangeEvent } from "react";
import CustomModal, { FieldDefinition } from "../../common/modals";
import Vector from "../../../lib/Images/Vector.svg";
import NoCategoriesYet from "../../../lib/Images/NoCategoriesYet.svg";

import Group from "../../../lib/Images/Group.svg";

// Define interfaces for type safety
interface CategoryItem {
  id: string;
  name: string;
  description: string;
  status: boolean;
  subcategories?: SubcategoryItem[];
}

interface SubSubcategoryItem {
  id: string;
  name: string;
  description: string;
  status: boolean;
}

interface SubcategoryItem {
  id: string;
  name: string;
  description: string;
  status: boolean;
  subSubcategories?: SubSubcategoryItem[];
}
interface FormData {
  name: string;
  description?: string;
  product?: string;
  addSubCategory?: boolean;
  [key: string]: any;
}

const Category: React.FC = () => {
  const [expandedCategories, setExpandedCategories] = useState<{
    [key: string]: boolean;
  }>({});
  const [expandedSubcategories, setExpandedSubcategories] = useState<{
    [key: string]: boolean;
  }>({});
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

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSubcategoryModalOpen, setIsSubcategoryModalOpen] =
    useState<boolean>(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [currentSubcategoryItem, setCurrentSubcategoryItem] =
    useState<SubcategoryItem | null>(null);
  const [isEditSubcategoryModalOpen, setIsEditSubcategoryModalOpen] =
    useState<boolean>(false);
  const [openSubcatMenu, setOpenSubcatMenu] = useState<string | null>(null);
  const [currentItem, setCurrentItem] = useState<CategoryItem | null>(null);
  const [currentParentCategory, setCurrentParentCategory] =
    useState<CategoryItem | null>(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [currentSubSubcategoryItem, setCurrentSubSubcategoryItem] =
    useState<SubSubcategoryItem | null>(null);
  const [isEditSubSubcategoryModalOpen, setIsEditSubSubcategoryModalOpen] =
    useState<boolean>(false);
  const [openSubSubcatMenu, setOpenSubSubcatMenu] = useState<string | null>(
    null
  );
  const categoryFields: FieldDefinition[] = [
    {
      id: "name",
      label: "Category Name",
      type: "text",
      placeholder: "Enter category name",
      required: true,
    },
    {
      id: "description",
      label: "Description",
      type: "textarea",
      placeholder: "Enter category description",
      required: false,
    },
    {
      id: "product",
      label: "Assign Product",
      type: "select",
      placeholder: "Select Product",
      required: false,
    },
  ];
  // Function to handle sub-subcategory menu clicks
  const handleSubSubcatMenuClick = (menuType: string): void => {
    setOpenSubSubcatMenu(openSubSubcatMenu === menuType ? null : menuType);
  };

  // Function to edit a sub-subcategory
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
  };

  // Function to save an edited sub-subcategory
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
    }
  };

  // Function to delete a sub-subcategory
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
  };
  const toggleCategoryExpansion = (categoryId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Stop event from bubbling up
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
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
  // Handle modal save for category
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

  // Handle modal save for subcategory
  const handleSaveSubcategory = (formData: FormData): void => {
    console.log("Saving subcategory:", formData);
    setIsSubcategoryModalOpen(false);

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
  };

  // Add this function with your other handler functions
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
    }
  };

  // Add this function with your other handler functions
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
  };

  // Add this function with your other handler functions
  const handleSubcatMenuClick = (menuType: string): void => {
    setOpenSubcatMenu(openSubcatMenu === menuType ? null : menuType);
  };

  // Menu click handler
  const handleMenuClick = (menuType: string): void => {
    setOpenMenu(openMenu === menuType ? null : menuType);
  };

  // Handle search input change
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  // Handle "Add subcategory" button click
  const handleAddSubcategory = (category: CategoryItem): void => {
    setCurrentParentCategory(category);
    setIsSubcategoryModalOpen(true);
  };
  const [isSubSubcategoryModalOpen, setIsSubSubcategoryModalOpen] =
    useState<boolean>(false);

  // Add this function to handle adding a sub-subcategory
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

  // Function to save a new sub-subcategory
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

  // Empty state - no categories added yet
  const renderEmptyState = (): JSX.Element => {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="mb-4">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
            <img src={NoCategoriesYet} alt="No Categories" />
          </div>
        </div>
        <h3 className="text-xl font-medium mb-2">No Categories Yet</h3>
        <p className="text-gray-500 mb-6 text-center">
          Add your first category to organize your menu!
        </p>
        <button
          onClick={() => {
            setModalMode("add");
            setCurrentItem(null);
            setIsModalOpen(true);
          }}
          className="px-6 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Add
        </button>
      </div>
    );
  };

  // Filtered categories based on search term
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

      {/* Main content - two columns */}
      <div className="flex mt-4 px-4 gap-4">
        {/* Left Column */}
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
                onClick={() => {
                  setModalMode("add");
                  setCurrentItem(null);
                  setIsModalOpen(true);
                }}
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

          <div className="p-4">
            {filteredCategories.length === 0 ? (
              renderEmptyState()
            ) : (
              <div className="categories-list">
                {filteredCategories.map((category) => (
                  <div key={category.id} className="mb-4">
                    <div
                      className="category-item border-b border-gray-200 py-3 flex justify-between items-center cursor-pointer"
                      onClick={(e) => toggleCategoryExpansion(category.id, e)}
                    >
                      <div className="flex items-center">
                        <div className="category-icon mr-2 inline-block w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                          <svg
                            className="w-4 h-4 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M4 6h16M4 12h8m-8 6h16"
                            />
                          </svg>
                        </div>
                        <div>
                          <div className="font-medium">{category.name}</div>
                          <div className="text-sm text-gray-500">
                            {category.description}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="relative">
                          <button
                            className="text-gray-500 hover:text-gray-700"
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent category expansion toggle
                              handleMenuClick(`menu-${category.id}`);
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
                                stroke="#636363"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z"
                                stroke="#636363"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z"
                                stroke="#636363"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>

                          {openMenu === `menu-${category.id}` && (
                            <div className="absolute right-0 mt-1 w-36 bg-white rounded-md shadow-lg z-50 py-1 border border-gray-200">
                              <button
                                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm"
                                onClick={(e) => {
                                  e.stopPropagation(); // Prevent category expansion toggle
                                  setModalMode("edit");
                                  setCurrentItem(category);
                                  setIsModalOpen(true);
                                  setOpenMenu(null);
                                }}
                              >
                                Edit
                              </button>
                              <button
                                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm"
                                onClick={(e) => {
                                  e.stopPropagation(); // Prevent category expansion toggle
                                  setCategories(
                                    categories.filter(
                                      (c) => c.id !== category.id
                                    )
                                  );
                                  setOpenMenu(null);
                                }}
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Only show subcategories if this category is expanded */}
                    {expandedCategories[category.id] &&
                      category.subcategories &&
                      category.subcategories.length > 0 && (
                        <div className="pl-8 mt-2">
                          {category.subcategories.map((subcategory) => (
                            <div key={subcategory.id} className="mb-4">
                              <div
                                className="subcategory-item border-b border-gray-200 py-2 flex justify-between items-center cursor-pointer"
                                onClick={(e) =>
                                  toggleSubcategoryExpansion(subcategory.id, e)
                                }
                              >
                                <div className="flex items-center">
                                  <div className="subcategory-icon mr-2 inline-block w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
                                    <svg
                                      className="w-3 h-3 text-gray-400"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h8m-8 6h16"
                                      />
                                    </svg>
                                  </div>
                                  <div>
                                    <div className="font-medium text-sm">
                                      {subcategory.name}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                      {subcategory.description}
                                    </div>
                                  </div>
                                </div>

                                <div className="flex items-center space-x-2">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation(); // Prevent subcategory expansion toggle
                                      handleEditSubcategory(
                                        category,
                                        subcategory
                                      );
                                    }}
                                    className="text-gray-500 hover:text-gray-700"
                                  >
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
                                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                      />
                                    </svg>
                                  </button>
                                  <div className="relative">
                                    <button
                                      className="text-gray-500 hover:text-gray-700"
                                      onClick={(e) => {
                                        e.stopPropagation(); // Prevent subcategory expansion toggle
                                        handleSubcatMenuClick(
                                          `submenu-${subcategory.id}`
                                        );
                                      }}
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                      >
                                        <path
                                          d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
                                          stroke="#636363"
                                          strokeWidth="2"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                        <path
                                          d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z"
                                          stroke="#636363"
                                          strokeWidth="2"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                        <path
                                          d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z"
                                          stroke="#636363"
                                          strokeWidth="2"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        />
                                      </svg>
                                    </button>

                                    {openSubcatMenu ===
                                      `submenu-${subcategory.id}` && (
                                      <div className="absolute right-0 mt-1 w-36 bg-white rounded-md shadow-lg z-50 py-1 border border-gray-200">
                                        <button
                                          className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm"
                                          onClick={(e) => {
                                            e.stopPropagation(); // Prevent subcategory expansion toggle
                                            handleEditSubcategory(
                                              category,
                                              subcategory
                                            );
                                            setOpenSubcatMenu(null);
                                          }}
                                        >
                                          Edit
                                        </button>
                                        <button
                                          className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm"
                                          onClick={(e) => {
                                            e.stopPropagation(); // Prevent subcategory expansion toggle
                                            handleDeleteSubcategory(
                                              category,
                                              subcategory.id
                                            );
                                          }}
                                        >
                                          Delete
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>

                              {/* Only show sub-subcategories if this subcategory is expanded */}
                              {expandedSubcategories[subcategory.id] &&
                                subcategory.subSubcategories &&
                                subcategory.subSubcategories.length > 0 && (
                                  <div className="pl-8 mt-2">
                                    {subcategory.subSubcategories.map(
                                      (subsubcategory) => (
                                        <div
                                          key={subsubcategory.id}
                                          className="subcategory-item border-b border-gray-200 py-2 flex justify-between items-center"
                                        >
                                          <div className="flex items-center">
                                            <div className="subcategory-icon mr-2 inline-block w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
                                              <svg
                                                className="w-3 h-3 text-gray-400"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                              >
                                                <path
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                  strokeWidth="2"
                                                  d="M4 6h16M4 12h8m-8 6h16"
                                                />
                                              </svg>
                                            </div>
                                            <div>
                                              <div className="font-medium text-sm">
                                                {subsubcategory.name}
                                              </div>
                                              <div className="text-xs text-gray-500">
                                                {subsubcategory.description}
                                              </div>
                                            </div>
                                          </div>

                                          <div className="flex items-center space-x-2">
                                            <button
                                              className="text-gray-500 hover:text-gray-700"
                                              onClick={(e) =>
                                                handleEditSubSubcategory(
                                                  category,
                                                  subcategory,
                                                  subsubcategory,
                                                  e
                                                )
                                              }
                                            >
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
                                                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                                />
                                              </svg>
                                            </button>
                                            <div className="relative">
                                              <button
                                                className="text-gray-500 hover:text-gray-700"
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  handleSubSubcatMenuClick(
                                                    `subsubmenu-${subsubcategory.id}`
                                                  );
                                                }}
                                              >
                                                <svg
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  width="20"
                                                  height="20"
                                                  viewBox="0 0 24 24"
                                                  fill="none"
                                                >
                                                  <path
                                                    d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
                                                    stroke="#636363"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                  />
                                                  <path
                                                    d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z"
                                                    stroke="#636363"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                  />
                                                  <path
                                                    d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z"
                                                    stroke="#636363"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                  />
                                                </svg>
                                              </button>

                                              {openSubSubcatMenu ===
                                                `subsubmenu-${subsubcategory.id}` && (
                                                <div className="absolute right-0 mt-1 w-36 bg-white rounded-md shadow-lg z-50 py-1 border border-gray-200">
                                                  <button
                                                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm"
                                                    onClick={(e) =>
                                                      handleEditSubSubcategory(
                                                        category,
                                                        subcategory,
                                                        subsubcategory,
                                                        e
                                                      )
                                                    }
                                                  >
                                                    Edit
                                                  </button>
                                                  <button
                                                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm"
                                                    onClick={(e) => {
                                                      e.stopPropagation();
                                                      handleDeleteSubSubcategory(
                                                        category,
                                                        subcategory,
                                                        subsubcategory.id
                                                      );
                                                    }}
                                                  >
                                                    Delete
                                                  </button>
                                                </div>
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      )
                                    )}

                                    {/* Button to add a sub-subcategory */}
                                    <button
                                      onClick={(e) =>
                                        handleAddSubSubcategory(
                                          category,
                                          subcategory,
                                          e
                                        )
                                      }
                                      className="flex items-center text-blue-600 hover:text-blue-800 ml-2 mt-2"
                                    >
                                      <svg
                                        className="w-4 h-4 mr-1"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                        />
                                      </svg>
                                      Add sub subcategory
                                    </button>
                                  </div>
                                )}
                            </div>
                          ))}

                          {/* Add subcategory button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddSubcategory(category);
                            }}
                            className="flex items-center text-blue-600 hover:text-blue-800 mt-2"
                          >
                            <svg
                              className="w-4 h-4 mr-1"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                              />
                            </svg>
                            Add subcategory
                          </button>
                        </div>
                      )}

                    {/* Show "Add subcategory" button when category is collapsed */}
                    {!expandedCategories[category.id] && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddSubcategory(category);
                        }}
                        className="flex items-center text-blue-600 hover:text-blue-800 ml-8 mt-2"
                      >
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                        Add subcategory
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column - Info Panel */}
        <div className="w-1/2">
          {/* <div className="bg-yellow-100 rounded-lg p-6"> */}
          <div className="flex justify-center">
            <div className="pr-4 relative left-40 top-10">
              <img src={Vector} alt="" />
              <h3 className="text-xl font-medium mb-2">
                Learn More About How Our Menu Works
              </h3>
              <p className="text-gray-600 mb-4">
                Our menu structure is designed to give you complete flexibility
                and customization. Organize your menu in a way that suits your
                business and simplifies the browsing experience for your
                customers. Here's how it works.
              </p>
              <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                Learn More
              </button>
            </div>
          </div>
          {/* </div> */}
        </div>
      </div>

      {/* Add/Edit Category Modal */}

      {isModalOpen && (
        <CustomModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          mode={modalMode}
          title={modalMode === "add" ? "Add New Category" : "Edit Category"}
          fields={categoryFields}
          onSave={handleSaveCategory}
          size="md"
          formLayout="custom"
          showFooter={true}
          confirmText="Save"
          customFooter={
            <div className="w-full max-w-5xl mx-auto mt-[-15px]">
              <div>
                <div className="mb-4">
                  <label className="block mb-2">
                    <span className="text-gray-700">
                      Category Name <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Name"
                    defaultValue={currentItem?.name || ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-2">
                    <span className="text-gray-700">Description</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    placeholder="Write here"
                    defaultValue={currentItem?.description || ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                    rows={3}
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-2">
                    <span className="text-gray-700">Assign Product</span>
                  </label>
                  <select
                    id="product"
                    name="product"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 appearance-none"
                  >
                    <option value="" disabled selected>
                      Select Product
                    </option>
                    <option value="product1">Product 1</option>
                    <option value="product2">Product 2</option>
                  </select>
                </div>

                <div className="mb-4">
                  <div className="border-2 border-dashed border-gray-300 p-6 rounded-md text-center mb-3">
                    <div className="flex flex-col items-center">
                      <svg
                        className="h-6 w-6 text-gray-400 mb-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <span className="text-gray-500">
                        Choose a file or drag & drop your image here
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="addSubCategory"
                      name="addSubCategory"
                      className="h-4 w-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
                    />
                    <label
                      htmlFor="addSubCategory"
                      className="ml-2 text-gray-700"
                    >
                      Add Sub Category
                    </label>
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="mr-2 px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      // Get form data manually without form submission
                      const name = (
                        document.getElementById("name") as HTMLInputElement
                      ).value;
                      const description = (
                        document.getElementById(
                          "description"
                        ) as HTMLTextAreaElement
                      ).value;
                      const product = (
                        document.getElementById("product") as HTMLSelectElement
                      ).value;
                      const addSubCategory = (
                        document.getElementById(
                          "addSubCategory"
                        ) as HTMLInputElement
                      ).checked;

                      const data: FormData = {
                        name: name,
                        description: description,
                        product: product,
                        addSubCategory: addSubCategory,
                      };

                      handleSaveCategory(data);
                    }}
                    className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          }
        />
      )}
      {isSubcategoryModalOpen && (
        <CustomModal
          isOpen={isSubcategoryModalOpen}
          onClose={() => setIsSubcategoryModalOpen(false)}
          mode="add"
          title={`Add New Subcategory in ${currentParentCategory?.name}`}
          fields={[]} // Empty fields since we're using customFooter
          onSave={handleSaveSubcategory}
          size="md"
          formLayout="custom"
          showFooter={true}
          confirmText="Save"
          customFooter={
            <div className="w-full max-w-5xl mx-auto mt-[-15px]">
              <div>
                <div className="mb-4">
                  <label className="block mb-2">
                    <span className="text-gray-700">
                      Subcategory Name <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    id="subcat-name"
                    name="name"
                    placeholder="Name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-2">
                    <span className="text-gray-700">Description</span>
                  </label>
                  <textarea
                    id="subcat-description"
                    name="description"
                    placeholder="Write here"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                    rows={3}
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-2">
                    <span className="text-gray-700">Assign Product</span>
                  </label>
                  <select
                    id="subcat-product"
                    name="product"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 appearance-none"
                  >
                    <option value="" disabled selected>
                      Select Product
                    </option>
                    <option value="product1">Product 1</option>
                    <option value="product2">Product 2</option>
                  </select>
                </div>

                <div className="mb-4">
                  <div className="border-2 border-dashed border-gray-300 p-6 rounded-md text-center mb-3">
                    <div className="flex flex-col items-center">
                      <svg
                        className="h-6 w-6 text-gray-400 mb-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <span className="text-gray-500">
                        Choose a file or drag & drop your image here
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="addMore"
                      name="addMore"
                      className="h-4 w-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
                    />
                    <label htmlFor="addMore" className="ml-2 text-gray-700">
                      Add more
                    </label>
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <button
                    type="button"
                    onClick={() => setIsSubcategoryModalOpen(false)}
                    className="mr-2 px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      // Get form data manually without form submission
                      const name = (
                        document.getElementById(
                          "subcat-name"
                        ) as HTMLInputElement
                      ).value;
                      const description = (
                        document.getElementById(
                          "subcat-description"
                        ) as HTMLTextAreaElement
                      ).value;
                      const product = (
                        document.getElementById(
                          "subcat-product"
                        ) as HTMLSelectElement
                      ).value;
                      const addMore = (
                        document.getElementById("addMore") as HTMLInputElement
                      ).checked;

                      const data: FormData = {
                        name: name,
                        description: description,
                        product: product,
                        addMore: addMore,
                      };

                      handleSaveSubcategory(data);

                      // Clear form fields after saving
                      if (addMore) {
                        (
                          document.getElementById(
                            "subcat-name"
                          ) as HTMLInputElement
                        ).value = "";
                        (
                          document.getElementById(
                            "subcat-description"
                          ) as HTMLTextAreaElement
                        ).value = "";
                        (
                          document.getElementById(
                            "subcat-product"
                          ) as HTMLSelectElement
                        ).value = "";
                        (
                          document.getElementById("addMore") as HTMLInputElement
                        ).checked = false;
                      }
                    }}
                    className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          }
        />
      )}
      {/* Add this Edit Subcategory Modal to your code just after the Add Subcategory Modal */}
      {isEditSubcategoryModalOpen && (
        <CustomModal
          isOpen={isEditSubcategoryModalOpen}
          onClose={() => setIsEditSubcategoryModalOpen(false)}
          mode="edit"
          title={`Edit Subcategory in ${currentParentCategory?.name}`}
          fields={[]} // Empty fields since we're using customFooter
          onSave={handleSaveEditSubcategory}
          size="md"
          formLayout="custom"
          showFooter={true}
          confirmText="Save"
          customFooter={
            <div className="w-full max-w-5xl mx-auto mt-[-15px]">
              <div>
                <div className="mb-4">
                  <label className="block mb-2">
                    <span className="text-gray-700">
                      Subcategory Name <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    id="edit-subcat-name"
                    name="name"
                    placeholder="Name"
                    defaultValue={currentSubcategoryItem?.name || ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-2">
                    <span className="text-gray-700">Description</span>
                  </label>
                  <textarea
                    id="edit-subcat-description"
                    name="description"
                    placeholder="Write here"
                    defaultValue={currentSubcategoryItem?.description || ""}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                    rows={3}
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-2">
                    <span className="text-gray-700">Assign Product</span>
                  </label>
                  <select
                    id="edit-subcat-product"
                    name="product"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 appearance-none"
                  >
                    <option value="" disabled selected>
                      Select Product
                    </option>
                    <option value="product1">Product 1</option>
                    <option value="product2">Product 2</option>
                  </select>
                </div>

                <div className="mb-4">
                  <div className="border-2 border-dashed border-gray-300 p-6 rounded-md text-center mb-3">
                    <div className="flex flex-col items-center">
                      <svg
                        className="h-6 w-6 text-gray-400 mb-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <span className="text-gray-500">
                        Choose a file or drag & drop your image here
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <button
                    type="button"
                    onClick={() => setIsEditSubcategoryModalOpen(false)}
                    className="mr-2 px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      // Get form data manually without form submission
                      const name = (
                        document.getElementById(
                          "edit-subcat-name"
                        ) as HTMLInputElement
                      ).value;
                      const description = (
                        document.getElementById(
                          "edit-subcat-description"
                        ) as HTMLTextAreaElement
                      ).value;
                      const product = (
                        document.getElementById(
                          "edit-subcat-product"
                        ) as HTMLSelectElement
                      ).value;

                      const data: FormData = {
                        name: name,
                        description: description,
                        product: product,
                      };

                      handleSaveEditSubcategory(data);
                    }}
                    className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          }
        />
      )}

      {/* Add this modal to your component */}
      {isSubSubcategoryModalOpen && (
        <CustomModal
          isOpen={isSubSubcategoryModalOpen}
          onClose={() => setIsSubSubcategoryModalOpen(false)}
          mode="add"
          title={`Add New Sub-subcategory in ${currentSubcategoryItem?.name}`}
          fields={[]} // Empty fields since we're using customFooter
          onSave={handleSaveSubSubcategory}
          size="md"
          formLayout="custom"
          showFooter={true}
          confirmText="Save"
          customFooter={
            <div className="w-full max-w-5xl mx-auto mt-[-15px]">
              <div>
                <div className="mb-4">
                  <label className="block mb-2">
                    <span className="text-gray-700">
                      Sub-subcategory Name{" "}
                      <span className="text-red-500">*</span>
                    </span>
                  </label>
                  <input
                    type="text"
                    id="subsubcat-name"
                    name="name"
                    placeholder="Name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-2">
                    <span className="text-gray-700">Description</span>
                  </label>
                  <textarea
                    id="subsubcat-description"
                    name="description"
                    placeholder="Write here"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                    rows={3}
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-2">
                    <span className="text-gray-700">Assign Product</span>
                  </label>
                  <select
                    id="subsubcat-product"
                    name="product"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 appearance-none"
                  >
                    <option value="" disabled selected>
                      Select Product
                    </option>
                    <option value="product1">Product 1</option>
                    <option value="product2">Product 2</option>
                  </select>
                </div>

                <div className="mb-4">
                  <div className="border-2 border-dashed border-gray-300 p-6 rounded-md text-center mb-3">
                    <div className="flex flex-col items-center">
                      <svg
                        className="h-6 w-6 text-gray-400 mb-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <span className="text-gray-500">
                        Choose a file or drag & drop your image here
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="addMoreSubSub"
                      name="addMore"
                      className="h-4 w-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
                    />
                    <label
                      htmlFor="addMoreSubSub"
                      className="ml-2 text-gray-700"
                    >
                      Add more
                    </label>
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <button
                    type="button"
                    onClick={() => setIsSubSubcategoryModalOpen(false)}
                    className="mr-2 px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      // Get form data manually without form submission
                      const name = (
                        document.getElementById(
                          "subsubcat-name"
                        ) as HTMLInputElement
                      ).value;
                      const description = (
                        document.getElementById(
                          "subsubcat-description"
                        ) as HTMLTextAreaElement
                      ).value;
                      const product = (
                        document.getElementById(
                          "subsubcat-product"
                        ) as HTMLSelectElement
                      ).value;
                      const addMore = (
                        document.getElementById(
                          "addMoreSubSub"
                        ) as HTMLInputElement
                      ).checked;

                      const data: FormData = {
                        name: name,
                        description: description,
                        product: product,
                        addMore: addMore,
                      };

                      handleSaveSubSubcategory(data);

                      // Clear form fields if adding more
                      if (addMore) {
                        (
                          document.getElementById(
                            "subsubcat-name"
                          ) as HTMLInputElement
                        ).value = "";
                        (
                          document.getElementById(
                            "subsubcat-description"
                          ) as HTMLTextAreaElement
                        ).value = "";
                        (
                          document.getElementById(
                            "subsubcat-product"
                          ) as HTMLSelectElement
                        ).value = "";
                      }
                    }}
                    className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          }
        />
      )}
    </div>
  );
};

export default Category;
