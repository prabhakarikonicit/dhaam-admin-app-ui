import React, { useState } from "react";
import {
  CategoryItem,
  SubcategoryItem,
  SubSubcategoryItem,
  SelectedItemType,
} from "./categorytypes";
import ProductIcon from "../../../lib/Images/product.png";

interface CategoryListProps {
  categories: CategoryItem[];
  searchTerm: string;
  expandedCategories: { [key: string]: boolean };
  expandedSubcategories: { [key: string]: boolean };
  openMenu: string | null;
  openSubcatMenu: string | null;
  openSubSubcatMenu: string | null;
  selectedItem: SelectedItemType | null;
  toggleCategoryExpansion: (categoryId: string, e: React.MouseEvent) => void;
  toggleSubcategoryExpansion: (
    subcategoryId: string,
    e: React.MouseEvent
  ) => void;
  handleMenuClick: (menuType: string) => void;
  handleSubcatMenuClick: (menuType: string) => void;
  handleSubSubcatMenuClick: (menuType: string) => void;
  handleEditCategory: (category: CategoryItem | null) => void;
  handleDeleteCategory: (categoryId: string) => void;
  handleAddSubcategory: (category: CategoryItem) => void;
  handleEditSubcategory: (
    category: CategoryItem,
    subcategory: SubcategoryItem
  ) => void;
  handleDeleteSubcategory: (
    category: CategoryItem,
    subcategoryId: string
  ) => void;
  handleAddSubSubcategory: (
    category: CategoryItem,
    subcategory: SubcategoryItem,
    e: React.MouseEvent
  ) => void;
  handleEditSubSubcategory: (
    category: CategoryItem,
    subcategory: SubcategoryItem,
    subsubcategory: SubSubcategoryItem,
    e: React.MouseEvent
  ) => void;
  handleDeleteSubSubcategory: (
    category: CategoryItem,
    subcategory: SubcategoryItem,
    subsubcategoryId: string
  ) => void;
  handleItemClick: (item: SelectedItemType) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  searchTerm,
  expandedCategories,
  expandedSubcategories,
  openMenu,
  openSubcatMenu,
  openSubSubcatMenu,
  selectedItem,
  toggleCategoryExpansion,
  toggleSubcategoryExpansion,
  handleMenuClick,
  handleSubcatMenuClick,
  handleSubSubcatMenuClick,
  handleEditCategory,
  handleDeleteCategory,
  handleAddSubcategory,
  handleEditSubcategory,
  handleDeleteSubcategory,
  handleAddSubSubcategory,
  handleEditSubSubcategory,
  handleDeleteSubSubcategory,
  handleItemClick,
}) => {
  // Expansion Icon Component
  const ExpansionIcon = ({ isExpanded }: { isExpanded: boolean }) => {
    return (
      <>
        {isExpanded ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
            <path d="M15.5 12H9.5M21.5 12C21.5 16.9706 17.4706 21 12.5 21C7.52944 21 3.5 16.9706 3.5 12C3.5 7.02944 7.52944 3 12.5 3C17.4706 3 21.5 7.02944 21.5 12Z" stroke="#636363" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 7.5V10M10 10V12.5M10 10H12.5M10 10H7.5M17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C5.85786 17.5 2.5 14.1421 2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C14.1421 2.5 17.5 5.85786 17.5 10Z" stroke="#636363" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </>
    );
  };
  // Empty state - no categories added yet
  const renderEmptyState = (): JSX.Element => {
    return (
      <div className="flex flex-col items-center justify-center py-12 ">
        <div className="mb-4">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
            <img src="/Images/NoCategoriesYet.svg" alt="No Categories" />
          </div>
        </div>
        <h3 className="text-xl font-medium mb-2">No Categories Yet</h3>
        <p className="text-sm text-gray-500 mb-6 text-center">
          Add your first category to organize your menu!
        </p>
        <button
          onClick={() => handleEditCategory(null)}
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

  // Check if an item is selected
  const isSelected = (
    type: "category" | "subcategory" | "subSubcategory",
    id: string
  ): boolean => {
    return selectedItem?.type === type && selectedItem?.id === id;
  };

  return (
    <div className="min-h-screen flex-grow overflow-auto h-[calc(100vh-50px)] ">
      <div className="">
        {filteredCategories.length === 0 ? (
          renderEmptyState()
        ) : (
          <div className="categories-list bg-backgroundWhite md:bg-background-grey p-4 mx-1 border border-grey-border rounded-custom12px">
            {filteredCategories.map((category) => (
              <div key={category.id} className="mb-4 relative">
                 {expandedCategories[category.id] && (
    <div className="absolute left-4 top-10 w-px h-[calc(100%-30px)] bg-gray-200"></div>
  )}
                <div
                  className={`category-item py-3 flex justify-between items-center cursor-pointer ${
                    isSelected("category", category.id) ? "" : ""
                  }`}
                  onClick={(e) => {
                    toggleCategoryExpansion(category.id, e);
                    handleItemClick({
                      type: "category",
                      id: category.id,
                      name: category.name,
                    });
                  }}
                >
                  <div className="flex items-center">
                  <div className="mr-2 flex items-center">  
                        <ExpansionIcon
                          isExpanded={expandedCategories[category.id] || false}
                        />
                      </div>
                    <div className="category-icon mr-2 inline-block w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                   
                      <img
                        src={ProductIcon}
                        alt=""
                        className="w-5 h-5 object-cover border border-grey-border rounded-custom8px p-4"
                      />

                      {/* <svg
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
                      </svg> */}
                    </div>
                    <div>
                      <div className="font-inter font-inter text-[13px] font-[500] text-billingNumber mb-1">
                        {category.name}
                      </div>
                      <div className="text-[12px] text-cardTitle font-inter font-[400]">
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
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <path
                            d="M8.00039 11.2004C7.11674 11.2004 6.40039 11.9167 6.40039 12.8004C6.40039 13.684 7.11674 14.4004 8.00039 14.4004C8.88405 14.4004 9.60039 13.684 9.60039 12.8004C9.60039 11.9167 8.88405 11.2004 8.00039 11.2004Z"
                            fill="#636363"
                          />
                          <path
                            d="M8.00039 6.40039C7.11674 6.40039 6.40039 7.11674 6.40039 8.00039C6.40039 8.88405 7.11674 9.60039 8.00039 9.60039C8.88405 9.60039 9.60039 8.88405 9.60039 8.00039C9.60039 7.11674 8.88405 6.40039 8.00039 6.40039Z"
                            fill="#636363"
                          />
                          <path
                            d="M8.00039 1.60039C7.11674 1.60039 6.40039 2.31674 6.40039 3.20039C6.40039 4.08405 7.11674 4.80039 8.00039 4.80039C8.88405 4.80039 9.60039 4.08405 9.60039 3.20039C9.60039 2.31674 8.88405 1.60039 8.00039 1.60039Z"
                            fill="#636363"
                          />
                        </svg>
                      </button>

                      {openMenu === `menu-${category.id}` && (
                        <div className="absolute right-0 mt-1 w-36 bg-white rounded-md shadow-lg z-50 py-1 border border-gray-200">
                          <button
                            className="block w-full text-left px-4 py-2 font-[500] font-inter text-[12px] border-b border-grey-border text-menuSubHeadingColor"
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent category expansion toggle
                              handleEditCategory(category);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            className="block w-full text-left px-4 py-2 font-[500] font-inter text-[12px] border-b border-grey-border text-menuSubHeadingColor"
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent category expansion toggle
                              handleDeleteCategory(category.id);
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
                            className={`subcategory-item py-2 flex justify-between items-center cursor-pointer ${
                              isSelected("subcategory", subcategory.id)
                                ? ""
                                : ""
                            }`}
                            onClick={(e) => {
                              toggleSubcategoryExpansion(subcategory.id, e);
                              handleItemClick({
                                type: "subcategory",
                                id: subcategory.id,
                                parentId: category.id,
                                name: subcategory.name,
                              });
                            }}
                          >
                            <div className="flex items-center">
                              <div className="mr-2 flex items-center">
                                <ExpansionIcon
                                  isExpanded={
                                    expandedSubcategories[subcategory.id] ||
                                    false
                                  }
                                />
                              </div>

                              <div className="subcategory-icon mr-4 inline-block w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
                                <img
                                  src={ProductIcon}
                                  alt=""
                                  className="w-5 h-5 object-contain border border-grey-border rounded-custom8px p-4"
                                />
                              </div>
                              <div>
                                <div className="font-inter font-inter text-[13px] font-[500] text-billingNumber mb-1">
                                  {subcategory.name}
                                </div>
                                <div className="text-[12px] text-cardTitle font-inter font-[400]">
                                  {subcategory.description}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center space-x-2">
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
                                    width="16"
                                    height="17"
                                    viewBox="0 0 16 17"
                                    fill="none"
                                  >
                                    <path
                                      d="M8.00039 11.7004C7.11674 11.7004 6.40039 12.4167 6.40039 13.3004C6.40039 14.184 7.11674 14.9004 8.00039 14.9004C8.88405 14.9004 9.60039 14.184 9.60039 13.3004C9.60039 12.4167 8.88405 11.7004 8.00039 11.7004Z"
                                      fill="#636363"
                                    />
                                    <path
                                      d="M8.00039 6.90039C7.11674 6.90039 6.40039 7.61674 6.40039 8.50039C6.40039 9.38405 7.11674 10.1004 8.00039 10.1004C8.88405 10.1004 9.60039 9.38405 9.60039 8.50039C9.60039 7.61674 8.88405 6.90039 8.00039 6.90039Z"
                                      fill="#636363"
                                    />
                                    <path
                                      d="M8.00039 2.10039C7.11674 2.10039 6.40039 2.81674 6.40039 3.70039C6.40039 4.58405 7.11674 5.30039 8.00039 5.30039C8.88405 5.30039 9.60039 4.58405 9.60039 3.70039C9.60039 2.81674 8.88405 2.10039 8.00039 2.10039Z"
                                      fill="#636363"
                                    />
                                  </svg>
                                </button>

                                {openSubcatMenu ===
                                  `submenu-${subcategory.id}` && (
                                  <div className="absolute right-0 mt-1 w-50 bg-white rounded-md shadow-lg z-50 py-1 border border-gray-200">
                                    <button
                                      className="block w-full text-left px-4 py-2 font-[500] font-inter text-[12px] border-b border-grey-border text-menuSubHeadingColor hover:bg-gray-100 whitespace-nowrap
 "
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleAddSubcategory(category);
                                      }}
                                    >
                                      Add subcategory
                                    </button>
                                    <button
                                      className="block w-full text-left px-4 py-2 font-[500] font-inter text-[12px] border-b border-grey-border text-menuSubHeadingColor"
                                      onClick={(e) => {
                                        e.stopPropagation(); // Prevent subcategory expansion toggle
                                        handleEditSubcategory(
                                          category,
                                          subcategory
                                        );
                                      }}
                                    >
                                      Edit
                                    </button>
                                    <button
                                      className="block w-full text-left px-4 py-2 font-[500] font-inter text-[12px] border-b border-grey-border text-menuSubHeadingColor"
                                      onClick={(e) => {
                                        e.stopPropagation(); // Prevent subcategory expansion toggle
                                        handleEditSubcategory(
                                          category,
                                          subcategory
                                        );
                                      }}
                                    >
                                      Duplicate
                                    </button>
                                    <button
                                      className="block w-full text-left px-4 py-2 font-[500] font-inter text-[12px] border-b border-grey-border text-menuSubHeadingColor"
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
                                    <button
                                      className="block w-full text-left px-4 py-2 font-[500] font-inter text-[12px] border-b border-grey-border text-menuSubHeadingColor"
                                      onClick={(e) => {
                                        e.stopPropagation(); // Prevent subcategory expansion toggle
                                        handleDeleteSubcategory(
                                          category,
                                          subcategory.id
                                        );
                                      }}
                                    >
                                      Disable
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
                                      className={`subcategory-item py-2 flex justify-between items-center cursor-pointer ${
                                        isSelected(
                                          "subSubcategory",
                                          subsubcategory.id
                                        )
                                          ? "border border-cardTitle px-2 rounded-custom8px"
                                          : ""
                                      }`}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleItemClick({
                                          type: "subSubcategory",
                                          id: subsubcategory.id,
                                          parentId: subcategory.id,
                                          name: subsubcategory.name,
                                        });
                                      }}
                                    >
                                      <div className="mr-2 flex items-center">
                                        <ExpansionIcon
                                          isExpanded={
                                            expandedSubcategories[
                                              subcategory.id
                                            ] || false
                                          }
                                        />
                                      </div>

                                      <div className="flex items-center">
                                        <div className="subcategory-icon mr-4 inline-block w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
                                          <img
                                            src={ProductIcon}
                                            alt=""
                                            className="w-5 h-5 object-contain border border-grey-border rounded-custom8px p-4"
                                          />
                                        </div>
                                        <div>
                                          <div className="font-inter font-inter text-[13px] font-[500] text-billingNumber mb-1">
                                            {subsubcategory.name}
                                          </div>
                                          <div className="text-[12px] text-cardTitle font-inter font-[400]">
                                            {subsubcategory.description}
                                          </div>
                                        </div>
                                      </div>

                                      <div className="flex items-center space-x-2">
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
                                              width="16"
                                              height="17"
                                              viewBox="0 0 16 17"
                                              fill="none"
                                            >
                                              <path
                                                d="M8.00039 11.7004C7.11674 11.7004 6.40039 12.4167 6.40039 13.3004C6.40039 14.184 7.11674 14.9004 8.00039 14.9004C8.88405 14.9004 9.60039 14.184 9.60039 13.3004C9.60039 12.4167 8.88405 11.7004 8.00039 11.7004Z"
                                                fill="#636363"
                                              />
                                              <path
                                                d="M8.00039 6.90039C7.11674 6.90039 6.40039 7.61674 6.40039 8.50039C6.40039 9.38405 7.11674 10.1004 8.00039 10.1004C8.88405 10.1004 9.60039 9.38405 9.60039 8.50039C9.60039 7.61674 8.88405 6.90039 8.00039 6.90039Z"
                                                fill="#636363"
                                              />
                                              <path
                                                d="M8.00039 2.10039C7.11674 2.10039 6.40039 2.81674 6.40039 3.70039C6.40039 4.58405 7.11674 5.30039 8.00039 5.30039C8.88405 5.30039 9.60039 4.58405 9.60039 3.70039C9.60039 2.81674 8.88405 2.10039 8.00039 2.10039Z"
                                                fill="#636363"
                                              />
                                            </svg>
                                          </button>

                                          {openSubSubcatMenu ===
                                            `subsubmenu-${subsubcategory.id}` && (
                                            <div className="absolute right-0 mt-1 w-50 bg-white rounded-md shadow-lg z-50 py-1 border border-gray-200">
                                              <button
                                                className="block w-full text-left px-4 py-2 font-[500] font-inter text-[12px] border-b border-grey-border text-menuSubHeadingColor whitespace-nowrap"
                                                onClick={(e) =>
                                                  handleAddSubSubcategory(
                                                    category,
                                                    subcategory,
                                                    e
                                                  )
                                                }
                                              >
                                                Add sub-subcategory
                                              </button>
                                              <button
                                                className="block w-full text-left px-4 py-2 font-[500] font-inter text-[12px] border-b border-grey-border text-menuSubHeadingColor"
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  handleEditSubSubcategory(
                                                    category,
                                                    subcategory,
                                                    subsubcategory,
                                                    e
                                                  );
                                                }}
                                              >
                                                Edit
                                              </button>
                                              <button
                                                className="block w-full text-left px-4 py-2 font-[500] font-inter text-[12px] border-b border-grey-border text-menuSubHeadingColor"
                                                onClick={(e) => {
                                                  e.stopPropagation(); // Prevent subcategory expansion toggle
                                                  handleEditSubSubcategory(
                                                    category,
                                                    subcategory,
                                                    subsubcategory,
                                                    e
                                                  );
                                                }}
                                              >
                                                Duplicate
                                              </button>

                                              <button
                                                className="block w-full text-left px-4 py-2 font-[500] font-inter text-[12px] border-b border-grey-border text-menuSubHeadingColor"
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
                                              <button
                                                className="block w-full text-left px-4 py-2 font-[500] font-inter text-[12px] border-b border-grey-border text-menuSubHeadingColor"
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  handleDeleteSubSubcategory(
                                                    category,
                                                    subcategory,
                                                    subsubcategory.id
                                                  );
                                                }}
                                              >
                                                Disable
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
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="15"
                                    height="14"
                                    viewBox="0 0 15 14"
                                    fill="none"
                                  >
                                    <path
                                      fill-rule="evenodd"
                                      clip-rule="evenodd"
                                      d="M7.5 3.5C7.8866 3.5 8.2 3.8134 8.2 4.2V6.3L10.3 6.3C10.6866 6.3 11 6.6134 11 7C11 7.3866 10.6866 7.7 10.3 7.7H8.2V9.8C8.2 10.1866 7.8866 10.5 7.5 10.5C7.1134 10.5 6.8 10.1866 6.8 9.8V7.7H4.7C4.3134 7.7 4 7.3866 4 7C4 6.6134 4.3134 6.3 4.7 6.3L6.8 6.3V4.2C6.8 3.8134 7.1134 3.5 7.5 3.5Z"
                                      fill="#212121"
                                    />
                                  </svg>
                                  <span className="text-cardValue text-[12px] font-inter font-[600]">
                                    Add sub subcategory
                                  </span>
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
                          xmlns="http://www.w3.org/2000/svg"
                          width="15"
                          height="14"
                          viewBox="0 0 15 14"
                          fill="none"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M7.5 3.5C7.8866 3.5 8.2 3.8134 8.2 4.2V6.3L10.3 6.3C10.6866 6.3 11 6.6134 11 7C11 7.3866 10.6866 7.7 10.3 7.7H8.2V9.8C8.2 10.1866 7.8866 10.5 7.5 10.5C7.1134 10.5 6.8 10.1866 6.8 9.8V7.7H4.7C4.3134 7.7 4 7.3866 4 7C4 6.6134 4.3134 6.3 4.7 6.3L6.8 6.3V4.2C6.8 3.8134 7.1134 3.5 7.5 3.5Z"
                            fill="#212121"
                          />
                        </svg>
                        <span className="text-cardValue text-[12px] font-inter font-[600]">
                          Add subcategory
                        </span>
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
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="14"
                      viewBox="0 0 15 14"
                      fill="none"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M7.5 3.5C7.8866 3.5 8.2 3.8134 8.2 4.2V6.3L10.3 6.3C10.6866 6.3 11 6.6134 11 7C11 7.3866 10.6866 7.7 10.3 7.7H8.2V9.8C8.2 10.1866 7.8866 10.5 7.5 10.5C7.1134 10.5 6.8 10.1866 6.8 9.8V7.7H4.7C4.3134 7.7 4 7.3866 4 7C4 6.6134 4.3134 6.3 4.7 6.3L6.8 6.3V4.2C6.8 3.8134 7.1134 3.5 7.5 3.5Z"
                        fill="#212121"
                      />
                    </svg>
                    <span className="text-cardValue text-[12px] font-inter font-[600]">
                      Add subcategory
                    </span>
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryList;
