import React, { useState } from "react";
import { PenSquare, Trash2 } from "lucide-react";
import CustomDataGrid from "../../../common/datagrid";
import ToggleSwitch from "../../../common/toggleSwitch";
import CustomModal, { FieldDefinition } from "../../../common/modals";
import BusinessCategoryManagement from "./businesscategory";

// Define the Tag interface
interface Tag {
  id: string;
  name: string;
  isDefault: boolean;
  enabled: boolean;
}

// Props for the Catalog component
interface CatalogProps {
  onSave?: () => void;
  onCancel?: () => void;
}

const Catalog: React.FC<CatalogProps> = ({ onSave, onCancel }) => {
  // State for the main toggle
  const [tagsEnabled, setTagsEnabled] = useState(true);
  const [showBusinessCategoryModal, setShowBusinessCategoryModal] = useState(false);
  
  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit" | "view" | "delete">("add");
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null);
  
  // Selected rows for DataGrid
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  
  // Notification state
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  
  // Count of active tags
  const [activeCount, setActiveCount] = useState(3);
  
  // Sample data for tags
  const [tags, setTags] = useState<Tag[]>([
    {
      id: "1",
      name: "Food",
      isDefault: false,
      enabled: true,
    },
    {
      id: "2",
      name: "Pharmacy",
      isDefault: false,
      enabled: true,
    },
    {
      id: "3",
      name: "Home",
      isDefault: false,
      enabled: true,
    },
    {
      id: "4",
      name: "Personal Care",
      isDefault: false,
      enabled: false,
    },
    {
      id: "5",
      name: "Convenience Items",
      isDefault: false,
      enabled: false,
    },
    {
      id: "6",
      name: "Gifts & Flowers",
      isDefault: false,
      enabled: false,
    }
  ]);
  
  // Tag field definitions for modal
  const tagFields: FieldDefinition[] = [
    {
      id: "name",
      label: "Tag Name",
      type: "text",
      placeholder: "Enter tag name",
      required: true,
    }
  ];
  
  // Open modal to add or edit a tag
  const openModal = (mode: "add" | "edit" | "view" | "delete", tag?: Tag) => {
    setModalMode(mode);
    setSelectedTag(tag || null);
    setIsModalOpen(true);
  };
  
  // Handle save from modal
  const handleSaveTag = (tagData: any) => {
    // Convert modal data to Tag format
    const newTag: Tag = {
      id: tagData.id || Date.now().toString(),
      name: tagData.name,
      isDefault: tagData.isDefault || false,
      enabled: tagData.isActive || false
    };

    if (modalMode === "add") {
      setTags([...tags, newTag]);
      
      // Show notification
      setNotificationMessage("New tag added successfully!");
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    } else if (modalMode === "edit" && selectedTag) {
      setTags(
        tags.map((tag) => (tag.id === newTag.id ? newTag : tag))
      );
      
      setNotificationMessage("Tag updated successfully!");
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    } else if (modalMode === "delete" && selectedTag) {
      setTags(tags.filter((tag) => tag.id !== selectedTag.id));
      
      setNotificationMessage("Tag deleted successfully!");
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }

    setIsModalOpen(false);
    
    // Update active count
    updateActiveCount();
  };
  
  // Toggle tag status
  const toggleTagStatus = (id: string) => {
    setTags(
      tags.map((tag) => {
        if (tag.id === id) {
          return { ...tag, enabled: !tag.enabled };
        }
        return tag;
      })
    );
    
    // Update active count after toggling
    setTimeout(() => updateActiveCount(), 100);
  };
  
  // Update active count
  const updateActiveCount = () => {
    const activeTagsCount = tags.filter(tag => tag.enabled).length;
    setActiveCount(activeTagsCount);
  };
  
  // Handle editing tag
  const handleEditTag = (row: any) => {
    const tag = tags.find((t) => t.id === row.id);
    if (tag) {
      openModal("edit", tag);
    }
  };

  const handleAddBusinessCategory = () => {
    setShowBusinessCategoryModal(true);
  };

  // Handle deleting tag
  const handleDeleteTag = (row: any) => {
    const tag = tags.find(t => t.id === row.id);
    if (tag) {
      openModal("delete", tag);
    }
  };

  // Define columns for the DataGrid
  const tagColumns = [
    { field: "name", headerName: "Tag Name", width: "50%" },
    { 
      field: "action", 
      headerName: "Action", 
      width: "25%",
      renderCell: (value: any, row: any) => (
        <div className="flex items-center">
          <Trash2
            className="w-4 h-4 text-gray-600 mr-3 cursor-pointer"
            onClick={() => handleDeleteTag(row)}
          />
          <PenSquare
            className="w-4 h-4 text-gray-600 cursor-pointer"
            onClick={() => handleEditTag(row)}
          />
        </div>
      ),
    },
    {
      field: "isDefault",
      headerName: "Default",
      width: "25%",
      renderCell: (value: boolean, row: any) => (
        <ToggleSwitch
          checked={value}
          onChange={() => {
            setTags(
              tags.map((tag) => {
                if (tag.id === row.id) {
                  return { ...tag, isDefault: !tag.isDefault };
                }
                return tag;
              })
            );
          }}
          aria-labelledby={`tag-default-${row.id}`}
        />
      ),
    },
  ];

  // SelectAll and SelectRow functions
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedRows(tags.map((tag) => tag.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id: string) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(
        selectedRows.filter((rowId) => rowId !== id)
      );
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  // Get title for modal based on mode
  const getModalTitle = () => {
    switch (modalMode) {
      case "add": return "Add New Tag";
      case "edit": return "Edit Tag";
      case "view": return "View Tag Details";
      case "delete": return "Delete Tag";
      default: return "Tag";
    }
  };

  // Handle view all tags
  const handleViewTags = () => {
    // This would typically navigate to a view showing all tags
    console.log("Viewing all tags");
  };

  const handleSaveBusinessCategory = (data: any) => {
    console.log("Save business category data:", data);
    setShowBusinessCategoryModal(false);
    // Implement save functionality
  };

  // Show only BusinessCategoryManagement when modal is open
  if (showBusinessCategoryModal) {
    return (
      <BusinessCategoryManagement
        onClose={() => setShowBusinessCategoryModal(false)}
        onSave={handleSaveBusinessCategory}
      />
    );
  }

  return (
    <div className="max-w-4xl sm:max-h-full md:max-h-full lg:max-h-full xl:max-h-full max-h-[80vh] overflow-y-auto sm:overflow-visible md:overflow-visible lg:overflow-visible xl:overflow-visible">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <h1 className="text-[14px] font-inter font-[600] text-headding-color">Catalog</h1>
        <div className="flex gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-[12px] font-inter font-[500] text-paragraphBlack bg-backgroundWhite"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 text-[12px] font-inter font-[500] text-paragraphBlack bg-backgroundWhite rounded-lg border border-reloadBorder"
          >
            Save
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="p-6">
        {/* Product Approval Section */}
        <div className="flex justify-between items-center mb-6 bg-white p-6 rounded-md">
          <div>
            <h2
              className="text-[14px] font-inter font-[600] text-textHeading"
              id="product-approval-label"
            >
              Product Approval by Admin
            </h2>
            <p className="text-[12px] font-inter text-cardTitle mt-1" id="product-approval-description">
              Require admin approval before products go live on the platform.
            </p>
          </div>
          <div className="flex items-center">
            <ToggleSwitch
              checked={false}
              onChange={() => {}}
              aria-labelledby="product-approval-label"
              aria-describedby="product-approval-description"
            />
          </div>
        </div>

        {/* Business Category Section */}
        <div className="flex justify-between items-center mb-6 bg-white p-6 rounded-md">
          <div>
            <h2
              className="text-[14px] font-inter font-[600] text-textHeading"
              id="business-category-label"
            >
              Business Category
            </h2>
            <p className="text-[12px] font-inter text-cardTitle mt-1" id="business-category-description">
              Help restaurants map their products to business categories for a smoother customer checkout experience.
            </p>
          </div>
          <div className="flex items-center">
            <ToggleSwitch
              checked={true}
              onChange={() => {}}
              aria-labelledby="business-category-label"
              aria-describedby="business-category-description"
            />
          </div>
        </div>

        {/* Active Business Categories */}
        <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-md">
          <div>
            <p className="text-[14px] font-inter font-[500] text-green-600">
              {activeCount} active business categories
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleViewTags}
              className="px-4 py-2 text-[12px] font-inter bg-white border border-gray-300 rounded-md"
            >
              View
            </button>
            <button
              onClick={handleAddBusinessCategory}
              className="px-4 py-2 text-[12px] font-inter bg-purple-600 text-white border border-purple-600 rounded-md"
            >
              Add New
            </button>
          </div>
        </div>

        {/* User-Level Tags Section */}
        <div className="mb-6 bg-white p-6 rounded-md">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2
                className="text-[14px] font-inter font-[600] text-textHeading"
                id="user-tags-label"
              >
                User-Level Tags
              </h2>
              <p className="text-[12px] font-inter text-cardTitle mt-1" id="user-tags-description">
                Create tags to categorize customers and restaurants for better organization.
              </p>
            </div>
            <div className="flex items-center">
              <ToggleSwitch
                checked={tagsEnabled}
                onChange={() => setTagsEnabled(!tagsEnabled)}
                aria-labelledby="user-tags-label"
                aria-describedby="user-tags-description"
              />
            </div>
          </div>

          <div className="flex justify-end mb-4">
            <button
              onClick={() => openModal("add")}
              className="px-4 py-2 text-[12px] font-inter bg-purple-600 text-white border border-purple-600 rounded-md"
            >
              Add New
            </button>
          </div>

          <div className="border rounded-lg overflow-x-auto">
            <CustomDataGrid
              columns={tagColumns}
              rows={tags}
              selectedRows={selectedRows}
              onSelectAll={handleSelectAll}
              onSelectRow={handleSelectRow}
              searchPlaceholder="Search tags"
              hideToolbar={false}
            />
          </div>
        </div>
      </div>

      {/* Custom Modal for all operations */}
      {isModalOpen && (
        <CustomModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          mode={modalMode}
          fields={modalMode !== "delete" ? tagFields : []}
          item={selectedTag ? {
            id: selectedTag.id,
            name: selectedTag.name,
            isDefault: selectedTag.isDefault,
            isActive: selectedTag.enabled
          } : undefined}
          onSave={handleSaveTag}
          title={getModalTitle()}
          subtitle={modalMode === "delete" ? `Are you sure you want to delete ${selectedTag?.name}?` : undefined}
          size="md"
          showToggle={modalMode === "edit"}
          toggleLabel="Default"
          confirmText={
            modalMode === "add" ? "Save" : 
            modalMode === "edit" ? "Save Changes" : 
            modalMode === "delete" ? "Delete" : 
            "Close"
          }
        >
          {modalMode === "delete" && (
            <p className="text-gray-600">
              This action cannot be undone. This will permanently delete the tag 
              <span className="font-medium"> {selectedTag?.name}</span> and remove all associated data.
            </p>
          )}
        </CustomModal>
      )}

      {/* Notification */}
      {showNotification && (
        <div className="fixed bottom-4 inset-x-0 flex justify-center z-50">
          <div className="bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2">
            <span>{notificationMessage}</span>
            <button
              className="ml-4 text-white"
              onClick={() => setShowNotification(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Catalog;