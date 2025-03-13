import React, { useState } from 'react';
import FileUpload from "./fileupload";

interface UploadFileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (file: File) => void;
}

const UploadFileModal: React.FC<UploadFileModalProps> = ({ isOpen, onClose, onUpload }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileUpload = (file: File) => {
    setSelectedFile(file);
  };

  const handleConfirmUpload = () => {
    if (selectedFile) {
      onUpload(selectedFile);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-lg overflow-hidden">
        {/* Header with title and close button */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Upload file</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* File upload component */}
        <div className="p-6">
          <FileUpload
            label=""
            dimensions=""
            description=""
            onUpload={(file) => handleFileUpload(file)}
            onDelete={() => setSelectedFile(null)}
          />
        </div>
        
        {/* Footer with upload button */}
        <div className="flex justify-end p-4 border-t">
          <button
            onClick={handleConfirmUpload}
            disabled={!selectedFile}
            className={`px-4 py-2 ${
              selectedFile 
              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            } rounded`}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadFileModal;