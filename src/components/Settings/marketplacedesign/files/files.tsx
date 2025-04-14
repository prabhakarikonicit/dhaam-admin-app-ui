import React, { useState, ChangeEvent, useEffect } from "react";
import CustomDataGrid from "../../../common/datagrid";
import CustomModal, { FieldDefinition } from "../../../common/modals";
import UploadFileModal from "../../../common/uploadfilemodal";
import { Search } from "lucide-react";

// Define the base types that match your project's types
interface Row {
  id: string;
  [key: string]: any;
}

interface BaseItem {
  id: string;
  [key: string]: any;
}

interface Column {
  field: string;
  headerName: string;
  width: string;
  renderCell?: (params: { row: Row }) => JSX.Element;
}

// Define file type that extends the Row interface
interface FileType extends Row {
  name: string;
  format: string;
  altText: string;
  dateAdded: string;
  size: string;
  thumbnail?: string;
  active?: boolean;
  file?: File; // Add actual file reference for potential preview
}

// Define column configuration for the CustomDataGrid with improved thumbnail display
const fileColumns: Column[] = [
  {
    field: "thumbnail",
    headerName: "",
    width: "60px",
    renderCell: (params: { row: Row }) => {
      // Add null check before accessing row or thumbnail
      if (!params || !params.row) {
        return (
          <div className="w-10 h-10 rounded overflow-hidden border border-gray-200"></div>
        );
      }

      // If we have a file object with an image, create an object URL for preview
      let imageUrl = params.row.thumbnail || `/api/placeholder/40/40`;

      return (
        <div className="w-10 h-10 rounded overflow-hidden border border-gray-200">
          <img src={imageUrl} alt="" className="w-full h-full object-cover" />
        </div>
      );
    },
  },
  {
    field: "name",
    headerName: "File name",
    width: "200px",
    renderCell: (params: { row: Row }) => {
      // Add null check to prevent the error
      if (!params || !params.row) {
        return (
          <div>
            <div className="font-medium text-gray-900">-</div>
            <div className="text-xs text-gray-500">-</div>
          </div>
        );
      }
      return (
        <div>
          <div className="font-medium text-gray-900">
            {params.row.name || "-"}
          </div>
          <div className="text-xs text-gray-500">
            {params.row.format || "-"}
          </div>
        </div>
      );
    },
  },
  {
    field: "altText",
    headerName: "Alt text",
    width: "300px",
  },
  {
    field: "dateAdded",
    headerName: "Date added",
    width: "150px",
  },
  {
    field: "size",
    headerName: "Size",
    width: "100px",
  },
  {
    field: "actions",
    headerName: "Action",
    width: "150px",
    renderCell: (params: { row: Row }) => {
      // Add null check to prevent errors
      if (!params || !params.row) {
        return <div className="flex items-center space-x-2"></div>;
      }
      return (
        <div className="flex items-center space-x-2">
          {/* Download Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDownload(params.row.id);
            }}
            className="text-gray-500 hover:text-gray-700"
            title="Download"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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
          </button>

          {/* Link/URL Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleCopyLink(params.row.id);
            }}
            className="text-gray-500 hover:text-gray-700"
            title="Copy Link"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
          </button>

          {/* More Options (Three-dot) Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleMoreOptions(params.row.id);
            }}
            className="text-gray-500 hover:text-gray-700"
            title="More Options"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
              />
            </svg>
          </button>
        </div>
      );
    },
  },
];
// Define fields for the modal
const fileFields: FieldDefinition[] = [
  {
    id: "name",
    label: "File Name",
    type: "text",
    required: true,
  },
  {
    id: "altText",
    label: "Alt Text",
    type: "textarea",
    required: true,
  },
  {
    id: "format",
    label: "Format",
    type: "text",
    required: true,
    disabled: true,
  },
];

// Event handlers
const handleDownload = (fileId: string) => {
  if (!fileId) return;
  console.log(`Downloading file ${fileId}`);
};

const handleCopyLink = (fileId: string) => {
  if (!fileId) return;
  console.log(`Copying link for file ${fileId}`);
};

const handleMoreOptions = (fileId: string) => {
  if (!fileId) return;
  console.log(`More options for file ${fileId}`);
};

// Modal mode type
type ModalMode = "add" | "edit" | "delete" | "view" | "confirm";

const MarketplaceFiles: React.FC = () => {
  // Sample data
  const sampleFiles: FileType[] = [
    {
      id: "1",
      name: "illustration_sketch",
      format: "PNG",
      altText:
        "Business school professor pointing to a student's computer screen",
      dateAdded: "Mar 6, 2025",
      size: "759.8 KB",
      thumbnail: "/api/placeholder/48/48",
      active: true,
    },
    {
      id: "2",
      name: "user_profile_pic",
      format: "PNG",
      altText:
        "Orange mural that says 'ship it' on a wall at HubSpot's Singapore office",
      dateAdded: "Mar 6, 2025",
      size: "1.54 MB",
      thumbnail: "/api/placeholder/48/48",
      active: true,
    },
    {
      id: "3",
      name: "hero_banner",
      format: "PNG",
      altText: "Stack of blueberry pancakes with powdered sugar",
      dateAdded: "Mar 6, 2025",
      size: "759.8 KB",
      thumbnail: "/api/placeholder/48/48",
      active: true,
    },
    {
      id: "4",
      name: "promo_visual",
      format: "PNG",
      altText: "Red-crested rooster crowing",
      dateAdded: "Mar 6, 2025",
      size: "1.54 MB",
      thumbnail: "/api/placeholder/48/48",
      active: true,
    },
    {
      id: "5",
      name: "logo_design",
      format: "PNG",
      altText:
        "Professor using education software to instruct a business school class",
      dateAdded: "Mar 6, 2025",
      size: "759.8 KB",
      thumbnail: "/api/placeholder/48/48",
      active: true,
    },
    {
      id: "6",
      name: "marketing_material",
      format: "PNG",
      altText: "man wearing backpack walking down escalator",
      dateAdded: "Mar 6, 2025",
      size: "1.54 MB",
      thumbnail: "/api/placeholder/48/48",
      active: true,
    },
  ];

  // States
  const [files, setFiles] = useState<FileType[]>(sampleFiles);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<ModalMode>("view");
  const [selectedFile, setSelectedFile] = useState<FileType | null>(null);
  const [thumbnailURLs, setThumbnailURLs] = useState<Record<string, string>>(
    {}
  );
  const [searchValue, setSearchValue] = useState<string>("");
  // Add this function before your return statement
  const filteredFiles = files.filter((file) => {
    const searchLower = searchValue.toLowerCase();
    return (
      file.name.toLowerCase().includes(searchLower) ||
      file.format.toLowerCase().includes(searchLower) ||
      file.altText.toLowerCase().includes(searchLower)
    );
  });
  // Create and clean up thumbnail URLs for previews
  useEffect(() => {
    // Clean up previous object URLs to avoid memory leaks
    return () => {
      Object.values(thumbnailURLs).forEach((url) => {
        if (url.startsWith("blob:")) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [thumbnailURLs]);

  // Event handlers
  const handleSelectAll = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const allFileIds = files.map((file) => file.id);
      setSelectedRows(allFileIds);
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id: string) => {
    if (!id) return;

    setSelectedRows((prev) => {
      const newSelection = prev.includes(id)
        ? prev.filter((rowId) => rowId !== id)
        : [...prev, id];
      return newSelection;
    });
  };

  const handleAddFile = () => {
    setIsUploadModalOpen(true);
  };

  const handleEdit = (fileId: string) => {
    if (!fileId) return;

    const file = files.find((f) => f.id === fileId);
    if (file) {
      setSelectedFile(file);
      setModalMode("edit");
      setIsModalOpen(true);
    }
  };

  const handleDelete = (fileId: string) => {
    if (!fileId) return;

    const file = files.find((f) => f.id === fileId);
    if (file) {
      setSelectedFile(file);
      setModalMode("delete");
      setIsModalOpen(true);
    }
  };

  const handleViewDetails = (fileId: string) => {
    if (!fileId) return;

    const file = files.find((f) => f.id === fileId);
    if (file) {
      setSelectedFile(file);
      setModalMode("view");
      setIsModalOpen(true);
    }
  };

  const handleMoreOptionsLocal = (fileId: string) => {
    if (!fileId) return;
    handleEdit(fileId);
  };

  const handleSaveFile = (fileData: any) => {
    if (!fileData) {
      console.error("No file data to save");
      return;
    }

    if (modalMode === "edit" && selectedFile) {
      // Update existing file
      setFiles((prev) =>
        prev.map((file) =>
          file.id === selectedFile.id ? { ...file, ...fileData } : file
        )
      );
    }

    setIsModalOpen(false);
  };

  // Create a thumbnail from the file if it's an image
  const createThumbnail = async (file: File): Promise<string> => {
    if (!file.type.startsWith("image/")) {
      // Return a default icon for non-image files
      return "/api/placeholder/48/48";
    }

    return new Promise((resolve) => {
      const objectUrl = URL.createObjectURL(file);
      setThumbnailURLs((prev) => ({
        ...prev,
        [file.name]: objectUrl,
      }));
      resolve(objectUrl);
    });
  };

  const handleFileUpload = async (file: File) => {
    // Generate thumbnail if it's an image
    const thumbnail = await createThumbnail(file);

    // Create a new file entry
    const newFile: FileType = {
      id: String(Date.now()), // Generate a unique id
      name: file.name.split(".")[0] || "Unnamed File",
      format: file.name.split(".").pop()?.toUpperCase() || "UNKNOWN",
      altText: "",
      dateAdded: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      size: formatFileSize(file.size),
      thumbnail: thumbnail,
      active: true,
      file: file, // Store reference to the actual file
    };

    // Add the new file to the files list
    setFiles((prev) => [newFile, ...prev]);

    // Close the upload modal after adding the file
    setIsUploadModalOpen(false);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const getModalTitle = (): string => {
    switch (modalMode) {
      case "add":
        return "Add New File";
      case "edit":
        return "Edit File";
      case "delete":
        return "Delete File";
      case "view":
        return "File Details";
      default:
        return "";
    }
  };

  return (
    <div className="max-w-full rounded-lg p-1 md:p-0 lg:p-0 lg:p-0 xl:p-0 sm:max-h-full md:max-h-full lg:max-h-full xl:max-h-full max-h-[75vh] overflow-y-auto sm:overflow-visible md:overflow-visible lg:overflow-visible xl:overflow-visible">
      {/* Header */}
      <div className="flex items-center p-4 border-b mt-0 sm:mt-10 md:mt-10 lg:mt-10 xl:10 md:px-1 sm:px-1 lg:px-1 xl:px-1">
        <button className="mr-2  rounded-custom border border-reloadBorder p-2">
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
              d="M6.79488 11.6946C6.52151 11.968 6.0783 11.968 5.80493 11.6946L1.60493 7.49458C1.33156 7.22122 1.33156 6.778 1.60493 6.50463L5.80493 2.30463C6.0783 2.03127 6.52151 2.03127 6.79488 2.30463C7.06825 2.578 7.06825 3.02122 6.79488 3.29458L3.78985 6.29961H11.8999C12.2865 6.29961 12.5999 6.61301 12.5999 6.99961C12.5999 7.38621 12.2865 7.69961 11.8999 7.69961L3.78985 7.69961L6.79488 10.7046C7.06825 10.978 7.06825 11.4212 6.79488 11.6946Z"
              fill="#212121"
            />
          </svg>
        </button>
        <h1 className="md:text-[14px] sm:text-[14px] lg:text-[14px] xl:text-[14px] text-[12px] font-inter font-[600] text-headding-color">
          Marketplace Design
        </h1>
      </div>

      {/* Sub header with tabs */}
      <div className="bg-backgroundWhite flex items-center justify-between p-4">
        <div className="flex items-center">
          <button className="font-inter font-[600] font-[14px] text-textHeading">
            Files
          </button>
          {/* Add more tab buttons here if needed */}
        </div>

        <div className="flex items-center">
          <div className="relative mr-2 border border-grey-border rounded-custom7px">
            <svg
              className="w-5 h-6 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search image or video"
              className="pl-10 pr-2 py-2 w-48 md:w-64 border border-gray-200 font-inter rounded-lg text-[12px] font-[400] text-cardTitle"
            />
          </div>
          <button
            onClick={handleAddFile}
            className="px-4 py-2 bg-bgButton text-whiteColor font-inter rounded-custom focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Add
          </button>
        </div>
      </div>

      {/* Data grid */}
      <div className="px-4 pb-4 bg-backgroundWhite ">
        <CustomDataGrid
          columns={fileColumns}
          rows={filteredFiles} // Change this from 'files' to 'filteredFiles'
          selectedRows={selectedRows}
          onSelectAll={handleSelectAll}
          onSelectRow={handleSelectRow}
          hideToolbar={true} // Hide toolbar since we have our own search
        />
      </div>

      {/* Upload File Modal */}
      <UploadFileModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={handleFileUpload}
      />

      {/* Edit/Delete/View Modal */}
      {isModalOpen && (
        <CustomModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          mode={modalMode}
          fields={modalMode !== "delete" ? fileFields : []}
          item={
            selectedFile
              ? {
                id: selectedFile.id,
                name: selectedFile.name,
                format: selectedFile.format,
                altText: selectedFile.altText,
                active: selectedFile.active,
              }
              : undefined
          }
          onSave={handleSaveFile}
          title={getModalTitle()}
          subtitle={
            modalMode === "delete" && selectedFile
              ? `Are you sure you want to delete ${selectedFile.name}?`
              : undefined
          }
          size="md"
          showToggle={modalMode !== "add" && modalMode !== "delete"}
          toggleLabel="Active"
          confirmText={
            modalMode === "add"
              ? "Save"
              : modalMode === "edit"
                ? "Save Changes"
                : modalMode === "delete"
                  ? "Delete"
                  : modalMode === "view"
                    ? "Close"
                    : "OK"
          }
        >
          {modalMode === "delete" && selectedFile && (
            <p className="text-gray-600">
              This action cannot be undone. This will permanently delete the
              file
              <span className="font-medium"> {selectedFile.name}</span> and
              remove all associated data.
            </p>
          )}
        </CustomModal>
      )}
    </div>
  );
};

export default MarketplaceFiles;
