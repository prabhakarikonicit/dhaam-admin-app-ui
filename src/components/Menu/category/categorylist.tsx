import React from "react";
import { CategoryItem, SubcategoryItem, SubSubcategoryItem, SelectedItemType } from "./categorytypes";

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
  toggleSubcategoryExpansion: (subcategoryId: string, e: React.MouseEvent) => void;
  handleMenuClick: (menuType: string) => void;
  handleSubcatMenuClick: (menuType: string) => void;
  handleSubSubcatMenuClick: (menuType: string) => void;
  handleEditCategory: (category: CategoryItem | null) => void;
  handleDeleteCategory: (categoryId: string) => void;
  handleAddSubcategory: (category: CategoryItem) => void;
  handleEditSubcategory: (category: CategoryItem, subcategory: SubcategoryItem) => void;
  handleDeleteSubcategory: (category: CategoryItem, subcategoryId: string) => void;
  handleAddSubSubcategory: (category: CategoryItem, subcategory: SubcategoryItem, e: React.MouseEvent) => void;
  handleEditSubSubcategory: (category: CategoryItem, subcategory: SubcategoryItem, subsubcategory: SubSubcategoryItem, e: React.MouseEvent) => void;
  handleDeleteSubSubcategory: (category: CategoryItem, subcategory: SubcategoryItem, subsubcategoryId: string) => void;
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
  handleItemClick
}) => {
  // Empty state - no categories added yet
  const renderEmptyState = (): JSX.Element => {
    return (
      <div className="flex flex-col items-center justify-center py-12">
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
  const isSelected = (type: 'category' | 'subcategory' | 'subSubcategory', id: string): boolean => {
    return selectedItem?.type === type && selectedItem?.id === id;
  };

  return (
    <div className="p-4">
      {filteredCategories.length === 0 ? (
        renderEmptyState()
      ) : (
        <div className="categories-list">
          {filteredCategories.map((category) => (
            <div key={category.id} className="mb-4">
              <div
                className={`category-item border-b border-gray-200 py-3 flex justify-between items-center cursor-pointer ${
                  isSelected('category', category.id) ? 'border-2 border-black' : ''
                }`}
                onClick={(e) => {
                  toggleCategoryExpansion(category.id, e);
                  handleItemClick({
                    type: 'category',
                    id: category.id,
                    name: category.name
                  });
                }}
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
                            handleEditCategory(category);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm"
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
                          className={`subcategory-item border-b border-gray-200 py-2 flex justify-between items-center cursor-pointer ${
                            isSelected('subcategory', subcategory.id) ? 'border-2 border-black' : ''
                          }`}
                          onClick={(e) => {
                            toggleSubcategoryExpansion(subcategory.id, e);
                            handleItemClick({
                              type: 'subcategory',
                              id: subcategory.id,
                              parentId: category.id,
                              name: subcategory.name
                            });
                          }}
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
                                handleEditSubcategory(category, subcategory);
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
                                    className={`subcategory-item border-b border-gray-200 py-2 flex justify-between items-center cursor-pointer ${
                                      isSelected('subSubcategory', subsubcategory.id) ? 'border-2 border-black' : ''
                                    }`}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleItemClick({
                                        type: 'subSubcategory',
                                        id: subsubcategory.id,
                                        parentId: subcategory.id,
                                        name: subsubcategory.name
                                      });
                                    }}
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
  );
};

export default CategoryList;