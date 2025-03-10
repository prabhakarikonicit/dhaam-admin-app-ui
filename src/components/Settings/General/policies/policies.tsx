import React, { useState, useRef, useEffect } from "react";
import { PenSquare, Link as LinkIcon } from "lucide-react";
import CustomDataGrid from "../../../common/datagrid";
import ToggleSwitch from "../../../common/toggleSwitch";
import CustomModal, { FieldDefinition } from "../../../common/modals";

// Policy interface
interface Policy {
  id: string;
  name: string;
  description: string;
  createdOn: string;
  isActive: boolean;
  url?: string;
}

// Props for the PoliciesAndPages component
interface PoliciesAndPagesProps {
  onSave?: () => void;
  onCancel?: () => void;
  initialPolicies?: Policy[];
}

const PoliciesAndPages: React.FC<PoliciesAndPagesProps> = ({
  onSave,
  onCancel,
  initialPolicies = []
}) => {
  // State for the main toggle
  const [policiesEnabled, setPoliciesEnabled] = useState(true);
  
  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit" | "view" | "delete">("add");
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);
  
  // Selected rows for DataGrid
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  
  // Notification state
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  
  // Rich text editor content and refs
  const [editorContent, setEditorContent] = useState<string>("");
  const editorRef = useRef<HTMLDivElement>(null);
  const savedSelectionRef = useRef<{
    startContainer: Node,
    startOffset: number,
    endContainer: Node,
    endOffset: number
  } | null>(null);
  
  // Text formatting states
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [selectedFont, setSelectedFont] = useState("Arial");
  const [selectedColor, setSelectedColor] = useState("#6200EE"); // Purple
  
  // Sample data for policies
  const [policies, setPolicies] = useState<Policy[]>(initialPolicies.length > 0 ? initialPolicies : [
    {
      id: "1",
      name: "Privacy Policy",
      description: "This zone is ideal for outdoor activities and gatherings.",
      createdOn: "Mar 1, 2025",
      isActive: true,
      url: "privacy-policy"
    },
    {
      id: "2",
      name: "Terms & Conditions",
      description: "This zone is ideal for outdoor activities and gatherings.",
      createdOn: "Mar 1, 2025",
      isActive: false,
      url: "terms-conditions"
    },
    {
      id: "3",
      name: "Term of Service",
      description: "This zone is ideal for outdoor activities and gatherings.",
      createdOn: "Mar 1, 2025",
      isActive: true,
      url: "term-of-service"
    },
    {
      id: "4",
      name: "Delivery Policy",
      description: "This zone is ideal for outdoor activities and gatherings.",
      createdOn: "Mar 1, 2025",
      isActive: false,
      url: "delivery-policy"
    },
    {
      id: "5",
      name: "Contact Info",
      description: "This zone is ideal for outdoor activities and gatherings.",
      createdOn: "Mar 1, 2025",
      isActive: true,
      url: "contact-info"
    },
    {
      id: "6",
      name: "Refund & Return Policy",
      description: "This zone is ideal for outdoor activities and gatherings.",
      createdOn: "Mar 1, 2025",
      isActive: false,
      url: "refund-return-policy"
    }
  ]);
  
  // Policy field definitions for modal
  const policyFields: FieldDefinition[] = [
    {
      id: "name",
      label: "Policy Name",
      type: "text",
      placeholder: "Enter policy name",
      required: true,
    },
    {
      id: "description",
      label: "Description",
      type: "textarea",
      placeholder: "Enter description",
      required: true,
      rows: 3,
    },
    {
      id: "url",
      label: "URL",
      type: "text",
      placeholder: "Enter URL path",
      required: true
    }
  ];
  
  // Helper function to save current selection
  const saveSelection = () => {
    if (window.getSelection) {
      const sel = window.getSelection();
      if (sel && sel.rangeCount > 0) {
        const range = sel.getRangeAt(0);
        savedSelectionRef.current = {
          startContainer: range.startContainer,
          startOffset: range.startOffset,
          endContainer: range.endContainer,
          endOffset: range.endOffset
        };
      }
    }
  };

  // Helper function to restore selection
  const restoreSelection = () => {
    if (window.getSelection && savedSelectionRef.current) {
      const sel = window.getSelection();
      if (sel) {
        sel.removeAllRanges();
        const range = document.createRange();
        range.setStart(savedSelectionRef.current.startContainer, savedSelectionRef.current.startOffset);
        range.setEnd(savedSelectionRef.current.endContainer, savedSelectionRef.current.endOffset);
        sel.addRange(range);
      }
    }
  };
  
  // Execute a rich text editor command with proper focus and selection management
  const executeCommand = (command: string, value?: string) => {
    try {
      // Focus editor first
      if (editorRef.current) {
        editorRef.current.focus();
        
        // If there's no selection, try to restore the last one
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0) {
          restoreSelection();
        }
        
        // Execute the command
        document.execCommand(command, false, value || '');
        
        // Save the selection for later use
        saveSelection();
        
        // Update formatting states - use document.queryCommandState for accurate state
        setIsBold(document.queryCommandState('bold'));
        setIsItalic(document.queryCommandState('italic'));
        setIsUnderline(document.queryCommandState('underline'));
        
        // Update editor content state
        if (editorRef.current) {
          setEditorContent(editorRef.current.innerHTML);
        }
      }
    } catch (error) {
      console.error("Error executing command:", error);
    }
  };
  
  // Update formatting states based on current selection
  const updateFormattingStates = () => {
    setIsBold(document.queryCommandState('bold'));
    setIsItalic(document.queryCommandState('italic'));
    setIsUnderline(document.queryCommandState('underline'));
  };
  
  // Open modal to add or edit a policy with improved editor handling
  const openModal = (mode: "add" | "edit" | "view" | "delete", policy?: Policy) => {
    setModalMode(mode);
    setSelectedPolicy(policy || null);
    
    // Set initial content for the rich text editor
    const contentToSet = mode === "edit" || mode === "view" 
      ? getDefaultPolicyContent(policy?.name || "") 
      : "";
    
    setEditorContent(contentToSet);
    setIsModalOpen(true);
    
    // Use a more reliable approach for setting editor content
    // This will run after the modal has been rendered
    requestAnimationFrame(() => {
      if (editorRef.current) {
        editorRef.current.innerHTML = contentToSet;
        // Reset formatting states
        setIsBold(false);
        setIsItalic(false);
        setIsUnderline(false);
      }
    });
  };
  
  // Get default content for the policy based on name
  const getDefaultPolicyContent = (policyName: string): string => {
    if (policyName.includes("Privacy")) {
      return `<h1>Privacy Policy</h1>
      <p>Our privacy policy outlines how we collect, use, and protect your personal information. We prioritize your privacy and ensure that your data is handled securely.</p>
      <ul>
        <li>We collect personal information only with your consent.</li>
        <li>Your data is stored securely and is not shared with third parties without your permission.</li>
        <li>You have the right to access and update your personal information at any time.</li>
        <li>We use cookies to enhance your experience on our site.</li>
        <li>You can opt-out of marketing communications at any time.</li>
        <li>We take reasonable measures to protect your data from unauthorized access.</li>
        <li>Our privacy policy is subject to change, and we will notify you of any updates.</li>
      </ul>`;
    } else if (policyName.includes("Terms")) {
      return `<h1>Terms & Conditions</h1>
      <p>These terms and conditions outline the rules and regulations for the use of our platform.</p>
      <ul>
        <li>By accessing this platform, you agree to these terms and conditions.</li>
        <li>All content on this platform is the property of our company.</li>
        <li>Unauthorized use of this platform may give rise to a claim for damages.</li>
        <li>Your use of this platform is subject to applicable laws and regulations.</li>
      </ul>`;
    }
    
    return `<h1>${policyName}</h1>
    <p>This is the default content for ${policyName}. Please customize this content.</p>`;
  };
  
  // Show temporary "Saved" notification
  const showSavedNotification = () => {
    setNotificationMessage("Saved successfully");
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };
  
  // Handle save from modal
  const handleSavePolicy = (policyData: any) => {
    // Create new policy object
    const newPolicy: Policy = {
      id: policyData.id || Date.now().toString(),
      name: policyData.name,
      description: policyData.description,
      createdOn: policyData.createdOn || new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }),
      isActive: policyData.isActive !== undefined ? policyData.isActive : true,
      url: policyData.url
    };
    
    if (modalMode === "add") {
      setPolicies([...policies, newPolicy]);
      setNotificationMessage("New policy page added successfully!");
    } else if (modalMode === "edit" && selectedPolicy) {
      setPolicies(policies.map((policy) => (policy.id === newPolicy.id ? newPolicy : policy)));
      setNotificationMessage("Policy page updated successfully!");
      // Show a saved notification
      showSavedNotification();
    } else if (modalMode === "delete" && selectedPolicy) {
      setPolicies(policies.filter((policy) => policy.id !== selectedPolicy.id));
      setNotificationMessage("Policy page deleted successfully!");
    }
    
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
    setIsModalOpen(false);
  };
  
  // Handle save from custom page edit modal
  const handleSavePageContent = () => {
    // Get form values
    const titleInput = document.getElementById('policy-title') as HTMLInputElement;
    const descriptionInput = document.getElementById('policy-description') as HTMLInputElement;
    const urlInput = document.getElementById('policy-url') as HTMLInputElement;
    
    const title = titleInput?.value || '';
    const description = descriptionInput?.value || '';
    const url = urlInput?.value.replace(/^.*\/page\//, '') || '';
    
    // Create new policy object
    const newPolicy: Policy = {
      id: selectedPolicy?.id || Date.now().toString(),
      name: title,
      description: description,
      createdOn: selectedPolicy?.createdOn || new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }),
      isActive: selectedPolicy?.isActive !== undefined ? selectedPolicy.isActive : true,
      url: url
    };
    
    if (modalMode === "add") {
      setPolicies([...policies, newPolicy]);
      setNotificationMessage("New policy page added successfully!");
    } else if (modalMode === "edit" && selectedPolicy) {
      setPolicies(policies.map((policy) => (policy.id === newPolicy.id ? newPolicy : policy)));
      setNotificationMessage("Policy page updated successfully!");
      showSavedNotification();
    }
    
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
    setIsModalOpen(false);
  };
  
  // Toggle policy status
  const togglePolicyStatus = (id: string) => {
    setPolicies(
      policies.map((policy) =>
        policy.id === id ? { ...policy, isActive: !policy.isActive } : policy
      )
    );
  };
  
  // Handle editing policy
  const handleEditPolicy = (row: any) => {
    const policy = policies.find((p) => p.id === row.id);
    if (policy) {
      openModal("edit", policy);
    }
  };
  
  // Handle deleting policy
  const handleDeletePolicy = (row: any) => {
    const policy = policies.find((p) => p.id === row.id);
    if (policy) {
      openModal("delete", policy);
    }
  };

  // Define columns for the DataGrid
  const policyColumns = [
    { field: "name", headerName: "Name", width: "25%" },
    { field: "description", headerName: "Description", width: "30%" },
    { field: "createdOn", headerName: "Created on", width: "15%" },
    {
      field: "action",
      headerName: "Action",
      width: "20%",
      renderCell: (value: any, row: any) => (
        <div className="flex items-center">
          <LinkIcon
            className="w-4 h-4 text-blue-600 mr-3 cursor-pointer"
            onClick={() => window.open(`http://www.design-mart.com/page/${row.url}`, '_blank')}
          />
          <PenSquare
            className="w-4 h-4 text-gray-600 mr-3 cursor-pointer"
            onClick={() => handleEditPolicy(row)}
          />
        </div>
      ),
    },
    {
      field: "isActive",
      headerName: "",
      width: "10%",
      renderCell: (value: boolean, row: any) => (
        <ToggleSwitch
          checked={value}
          onChange={() => togglePolicyStatus(row.id)}
          aria-labelledby={`policy-status-${row.id}`}
        />
      ),
    },
  ];

  // Handle select all
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedRows(policies.map((policy) => policy.id));
    } else {
      setSelectedRows([]);
    }
  };

  // Handle select row
  const handleSelectRow = (id: string) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  // Get modal title based on mode
  const getModalTitle = () => {
    switch (modalMode) {
      case "add": return "Add/edit page";
      case "edit": return "Add/edit page";
      case "view": return "View Policy";
      case "delete": return "Delete Policy";
      default: return "Policy";
    }
  };

  // Render Text Editor Toolbar Button
  const ToolbarButton = ({ 
    icon, 
    active = false, 
    onClick,
    title = ""
  }: { 
    icon: React.ReactNode, 
    active?: boolean,
    onClick?: () => void,
    title?: string
  }) => (
    <button 
      className={`p-2 ${active ? 'bg-gray-200' : ''} hover:bg-gray-100 rounded`}
      onClick={onClick}
      title={title}
      type="button"
    >
      {icon}
    </button>
  );

  return (
    <div className="w-full sm:max-h-full md:max-h-full lg:max-h-full xl:max-h-full max-h-[80vh] overflow-y-auto sm:overflow-visible md:overflow-visible lg:overflow-visible xl:overflow-visible">
      {/* Header */}
      <div className="flex justify-between items-center p-4">
        <h1 className="text-[14px] font-inter font-[600] text-headding-color">Policies & Pages</h1>
      </div>

      {/* Main content */}
      <div className="p-6">
        {/* Policies Section */}
        <div className="bg-backgroundWhite p-5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-[14px] font-inter font-[500] text-paragraphBlack">
              Current Polices & Pages
            </h2>
            <button
              onClick={() => openModal("add")}
              className="px-4 py-2 text-[12px] font-inter bg-backgroundWhite border border-reloadBorder rounded-custom"
            >
              Add New
            </button>
          </div>
          <p className="text-[12px] font-inter font-[600] text-cardTitle mb-4">
            Manage and update your platform's policy pages, including terms, privacy, and cookie Policies & Pages.
          </p>

          <div className="border rounded-lg overflow-x-auto">
            <CustomDataGrid
              columns={policyColumns}
              rows={policies}
              selectedRows={selectedRows}
              onSelectAll={handleSelectAll}
              onSelectRow={handleSelectRow}
              searchPlaceholder="Search policies"
              hideToolbar={false}
              // showActionColumn={true}

            />
          </div>
        </div>
      </div>

      {/* Full-width Modal for Policy editing */}
      {isModalOpen && modalMode !== "delete" && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-white">
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <h2 className="text-xl font-medium text-gray-800">{getModalTitle()}</h2>
            <div className="flex gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-[12px] font-inter font-[500] text-cardValue bg-backgroundWhite"
              >
                Discard
              </button>
              <button
                onClick={handleSavePageContent}
                className="px-4 py-2 text-[12px] font-inter font-[500] text-whiteColor border boder-btnBorder bg-bgButton rounded-custom"
              >
                Save
              </button>
            </div>
          </div>
          
          <div className="p-6 grid grid-cols-3 gap-6">
            {/* Left column for form fields */}
            <div className="space-y-6">
              <div>
                <label className="block text-[12px] font-inter font-[500] text-paragraphBlack mb-1">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  id="policy-title"
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="e.g. Privacy Policy"
                  defaultValue={selectedPolicy?.name || ''}
                />
              </div>
              
              <div>
                <label className="block text-[12px] font-inter font-[500] text-paragraphBlack mb-1">
                  Description
                </label>
                <textarea
                  id="policy-description"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter description here..."
                  rows={4}
                  defaultValue={selectedPolicy?.description || ''}
                />
              </div>
              
              <div>
                <label className="block text-[12px] font-inter font-[500] text-paragraphBlack mb-1">
                  URL <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center">
                  <span className="px-3 py-2 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md text-sm text-gray-500">
                    http://www.design-mart.com/page/
                  </span>
                  <input
                    id="policy-url"
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-r-md"
                    placeholder="privacy-policy"
                    defaultValue={selectedPolicy?.url || ''}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-[12px] font-inter font-[500] text-paragraphBlack mb-1">
                  Language <span className="text-red-500">*</span>
                </label>
                <select
                  id="policy-language"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md appearance-none bg-white"
                  defaultValue="English"
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                  <option value="German">German</option>
                </select>
              </div>
              
              <div>
                <label className="block text-[12px] font-inter font-[500] text-paragraphBlack mb-1">
                  Meta Title
                </label>
                <input
                  id="policy-meta-title"
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter description here..."
                  defaultValue=""
                />
              </div>
              
              <div>
                <label className="block text-[12px] font-inter font-[500] text-paragraphBlack mb-1">
                  Meta Description
                </label>
                <textarea
                  id="policy-meta-description"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="This zone is ideal for outdoor activities and gatherings, prov..."
                  rows={3}
                  defaultValue=""
                />
              </div>
            </div>
            
            {/* Right columns for rich text editor */}
            <div className="col-span-2 border rounded-lg overflow-hidden">
              {/* Rich text editor toolbar */}
              <div className="p-2 border-b flex flex-wrap items-center gap-1 bg-white">
                <div className="flex gap-1 mr-3">
                  <ToolbarButton 
                    icon={
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                      </svg>
                    } 
                    onClick={() => executeCommand('undo')}
                    title="Undo"
                  />
                  <ToolbarButton 
                    icon={
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    } 
                    onClick={() => executeCommand('redo')}
                    title="Redo"
                  />
                </div>
                
                <ToolbarButton 
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                  } 
                  onClick={() => {
                    saveSelection(); // Save selection before showing a dialog
                    const text = window.prompt("Enter the text to copy");
                    if (text) {
                      restoreSelection(); // Restore selection before pasting
                      executeCommand('insertText', text);
                    }
                  }}
                  title="Copy & Paste"
                />
                
                <div className="flex items-center px-3 border-l border-r">
                  <span className="pr-2">Arial</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                
                <div className="flex gap-1 items-center">
                  <button 
                    className="px-1 border rounded" 
                    onClick={() => executeCommand('fontSize', '1')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <span className="text-sm">12</span>
                  <button 
                    className="px-1 border rounded"
                    onClick={() => executeCommand('fontSize', '7')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
                
                <div className="flex gap-1 ml-2">
                  <ToolbarButton 
                    icon={<span className="font-bold">B</span>} 
                    active={isBold}
                    onClick={() => executeCommand('bold')}
                    title="Bold"
                  />
                  <ToolbarButton 
                    icon={<span className="italic">I</span>} 
                    active={isItalic}
                    onClick={() => executeCommand('italic')}
                    title="Italic"
                  />
                  <ToolbarButton 
                    icon={<span className="underline">U</span>} 
                    active={isUnderline}
                    onClick={() => executeCommand('underline')}
                    title="Underline"
                  />
                  <ToolbarButton 
                    icon={
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    } 
                    onClick={() => executeCommand('strikeThrough')}
                    title="Strikethrough"
                  />
                </div>
                
                <div className="flex gap-1 ml-2 items-center">
                  <div 
                    className="w-5 h-5 bg-purple-600 rounded cursor-pointer" 
                    onClick={() => {
                      saveSelection();
                      const color = window.prompt("Enter color (e.g. #FF0000 for red)", selectedColor);
                      if (color) {
                        setSelectedColor(color);
                        restoreSelection();
                        executeCommand('foreColor', color);
                      }
                    }}
                  ></div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                
                <div className="flex gap-1 ml-2">
                  <ToolbarButton 
                    icon={
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9l3-3m0 0l5 5M3 9l5 5M21 9l-3-3m0 0l-5 5m8-8l-5 5" />
                      </svg>
                    } 
                    onClick={() => executeCommand('removeFormat')}
                    title="Clear formatting"
                  />
                  <ToolbarButton 
                    icon={
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 015.656 0l4 4a4 4 0 01-5.656 5.656l-1.102-1.101" />
                      </svg>
                    } 
                    onClick={() => {
                      saveSelection();
                      const url = window.prompt("Enter the URL:");
                      if (url) {
                        restoreSelection();
                        executeCommand('createLink', url);
                      }
                    }}
                    title="Insert link"
                  />
                  <ToolbarButton 
                    icon={
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    } 
                    onClick={() => {
                      // This is a placeholder since we can't actually insert images in this simple editor
                      // In a real implementation, you'd show a file picker or image URL dialog
                      alert("Image insertion would be implemented with a file picker in a real application.");
                    }}
                    title="Insert image"
                  />
                </div>
              </div>
              
              <div className="flex border-b">
                <div 
                  className="flex items-center p-2 border-r cursor-pointer"
                  onClick={() => {
                    saveSelection();
                    const listType = window.confirm("Insert ordered list? Click OK for ordered, Cancel for unordered") ? 'insertOrderedList' : 'insertUnorderedList';
                    restoreSelection();
                    executeCommand(listType);
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <div className="flex border-r">
                  <ToolbarButton 
                    icon={
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    } 
                    onClick={() => executeCommand('insertParagraph')}
                    title="Insert paragraph"
                  />
                </div>
                <div className="flex border-r">
                  <ToolbarButton 
                    icon={
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    } 
                    onClick={() => {
                      // Insert a heading
                      saveSelection();
                      const headingLevel = window.prompt("Enter heading level (1-6):", "2");
                      if (headingLevel && parseInt(headingLevel) >= 1 && parseInt(headingLevel) <= 6) {
                        restoreSelection();
                        executeCommand('formatBlock', `h${headingLevel}`);
                      }
                    }}
                    title="Insert heading"
                  />
                </div>
              </div>
              
              {/* Rich text editor content area */}
              <div 
                id="rich-text-editor"
                ref={editorRef}
                className="p-6 h-96 overflow-y-auto" 
                contentEditable={true}
                onInput={(e) => setEditorContent((e.target as HTMLDivElement).innerHTML)}
                onMouseUp={updateFormattingStates}
                onKeyUp={updateFormattingStates}
                onFocus={() => {
                  // Update formatting states when editor gets focus
                  setTimeout(updateFormattingStates, 0);
                }}
              ></div>
            </div>
          </div>
        </div>
      )}

      {/* Regular Modal for Delete operations */}
      {isModalOpen && modalMode === "delete" && (
        <CustomModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          mode="delete"
          fields={[]}
          item={selectedPolicy ? {
            ...selectedPolicy,
            isActive: selectedPolicy.isActive
          } : undefined}
          onSave={handleSavePolicy}
          title="Delete Policy"
          subtitle={`Are you sure you want to delete ${selectedPolicy?.name}?`}
          size="md"
          showToggle={false}
          confirmText="Delete"
        >
          <p className="text-gray-600">
            This action cannot be undone. This will permanently delete the policy
            <span className="font-medium"> {selectedPolicy?.name}</span> and remove all associated data.
          </p>
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

export default PoliciesAndPages;