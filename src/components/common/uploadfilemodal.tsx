import React, { useState, useEffect } from 'react';
import FileUpload from "./fileupload";

interface UploadFileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (file: File, previewUrl: string) => void;
}

const UploadFileModal: React.FC<UploadFileModalProps> = ({ isOpen, onClose, onUpload }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Handle file selection and generate preview URL
  const handleFileUpload = (file: File) => {
    setSelectedFile(file);

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  // Handle the upload confirmation
  const handleConfirmUpload = () => {
    if (selectedFile && previewUrl) {
      onUpload(selectedFile, previewUrl);
      handleClose();
    }
  };

  // Handle removing the selected file
  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  };

  // Handle modal close and reset states
  const handleClose = () => {
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    onClose();
  };

  // Clean up preview URL when the modal closes or component unmounts
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div
        className={`bg-white rounded-lg w-full overflow-auto transition-all duration-300 rounded-t-custom18px ${
          selectedFile ? 'max-w-3xl max-h-[80vh]' : 'max-w-2xl max-h-[60vh]'
        }`}
      >
        {/* Header with title and close button */}
        <div className="flex justify-between items-center p-4 border-b bg-background-grey rounded-t-custom18px">
          <h2 className="text-xl font-inter text-[#000000] text-[14px] font-[600]">Upload file</h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        
        <div className="overflow-hidden"> 
          {!selectedFile ? (
            <FileUpload
              label=""
              dimensions=""
              description=""
              onUpload={(file) => handleFileUpload(file)}
              onDelete={() => {
                setSelectedFile(null);
                if (previewUrl) {
                  URL.revokeObjectURL(previewUrl);
                  setPreviewUrl(null);
                }
              }}
            />
          ) : (
            previewUrl && (
              <img
                src={previewUrl}
                alt="File preview"
                className="w-full h-full max-h-[500px] object-cover rounded-none" // Updated styling
                onError={(e) => {
                  e.currentTarget.src = `/api/placeholder/500/500`;
                }}
              />
            )
          )}
        </div>

        {/* Footer with upload button */}
        <div className="flex justify-end p-4 border-t">
          <button
            onClick={handleConfirmUpload}
            disabled={!selectedFile}
            className={`px-4 py-2 ${
              selectedFile
                ? 'bg-bgButton hover:bg-bgButton text-white font-inter'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            } rounded-custom7px`}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadFileModal;