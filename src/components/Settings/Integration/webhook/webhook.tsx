import React, { useState } from "react";
import { PenSquare, Trash2, Link } from "lucide-react";
import CustomDataGrid from "../../../common/datagrid";
import ToggleSwitch from "../../../common/toggleSwitch";
import CustomModal, { FieldDefinition } from "../../../common/modals";

// Define the Webhook interface
interface Webhook {
  id: string;
  webhookId: string;
  event: string;
  url: string;
  authToken: string;
  enabled: boolean;
}

// Props for the Webhook component
interface WebhookProps {
  onSave?: () => void;
  onCancel?: () => void;
}

const Webhook: React.FC<WebhookProps> = ({ onSave, onCancel }) => {
  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<
    "add" | "edit" | "view" | "delete"
  >("add");
  const [selectedWebhook, setSelectedWebhook] = useState<Webhook | null>(null);

  // Selected rows for DataGrid
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  // Notification state
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  // Sample data for webhooks
  const [webhooks, setWebhooks] = useState<Webhook[]>([
    {
      id: "1",
      webhookId: "#327987",
      event: "ORDER_PLACED",
      url: "0xa3234sadjk4487349s3",
      authToken: "token1",
      enabled: true,
    },
    {
      id: "2",
      webhookId: "#327987",
      event: "Startup plan billing",
      url: "0xa2234sadjk4487343s7",
      authToken: "token2",
      enabled: false,
    },
    {
      id: "3",
      webhookId: "#327987",
      event: "Startup plan billing",
      url: "0xa2334sadjk4487343s6",
      authToken: "token3",
      enabled: true,
    },
    {
      id: "4",
      webhookId: "#327987",
      event: "Startup plan billing",
      url: "0xb7234sadjk4487349s5",
      authToken: "token4",
      enabled: false,
    },
    {
      id: "5",
      webhookId: "#327987",
      event: "Startup plan billing",
      url: "0xa2234sadjk4487343s9",
      authToken: "token5",
      enabled: true,
    },
    {
      id: "6",
      webhookId: "#327987",
      event: "Startup plan billing",
      url: "0xa2232sadjk4487343e2",
      authToken: "token6",
      enabled: false,
    },
    {
      id: "7",
      webhookId: "#327987",
      event: "Startup plan billing",
      url: "0xa9824sadjk4487823a9",
      authToken: "token7",
      enabled: false,
    },
    {
      id: "8",
      webhookId: "#327987",
      event: "Startup plan billing",
      url: "0xa9824sadjk4487823a9",
      authToken: "token8",
      enabled: false,
    },
    {
      id: "9",
      webhookId: "#327987",
      event: "Startup plan billing",
      url: "0xb9834sadjk4487349s1",
      authToken: "token9",
      enabled: true,
    },
    {
      id: "10",
      webhookId: "#327987",
      event: "Startup plan billing",
      url: "0xa9824sadjk4487823a9",
      authToken: "token10",
      enabled: true,
    },
  ]);

  // Webhook field definitions for modal
  const webhookFields: FieldDefinition[] = [

    {
      id: "event",
      label: "Event",
      type: "text",
      placeholder: "Enter event name",
      required: true,
    },
    {
      id: "url",
      label: "WebHook URL Name",
      type: "text",
      placeholder: "Enter URL",
      required: true,
    },
    {
      id: "authToken",
      label: "Auth Token",
      type: "text",
      placeholder: "Enter auth token",
      required: true,
    },
  ];

  // Open modal to add or edit a webhook
  const openModal = (mode: "add" | "edit" | "view" | "delete", webhook?: Webhook) => {
    setModalMode(mode);
    setSelectedWebhook(webhook || null);
    setIsModalOpen(true);
  };

  // Handle save from modal
  const handleSaveWebhook = (webhookData: any) => {
    // Convert modal data to Webhook format
    const newWebhook: Webhook = {
      id: webhookData.id || Date.now().toString(),
      webhookId: webhookData.webhookId,
      event: webhookData.event,
      url: webhookData.url,
      authToken: webhookData.authToken,
      enabled: webhookData.isActive || false,
    };

    if (modalMode === "add") {
      setWebhooks([...webhooks, newWebhook]);

      // Show notification
      setNotificationMessage("New webhook added successfully!");
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    } else if (modalMode === "edit" && selectedWebhook) {
      setWebhooks(
        webhooks.map((webhook) => (webhook.id === newWebhook.id ? newWebhook : webhook))
      );

      setNotificationMessage("Webhook updated successfully!");
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    } else if (modalMode === "delete" && selectedWebhook) {
      setWebhooks(webhooks.filter((webhook) => webhook.id !== selectedWebhook.id));

      setNotificationMessage("Webhook deleted successfully!");
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }

    setIsModalOpen(false);
  };

  // Toggle webhook status
  const toggleWebhookStatus = (id: string) => {
    setWebhooks(
      webhooks.map((webhook) =>
        webhook.id === id ? { ...webhook, enabled: !webhook.enabled } : webhook
      )
    );
  };

  // Handle editing webhook
  const handleEditWebhook = (row: any) => {
    const webhook = webhooks.find((w) => w.id === row.id);
    if (webhook) {
      openModal("edit", webhook);
    }
  };

  // Handle deleting webhook
  const handleDeleteWebhook = (row: any) => {
    const webhook = webhooks.find((w) => w.id === row.id);
    if (webhook) {
      openModal("delete", webhook);
    }
  };

  // Define columns for the DataGrid
  const webhookColumns = [
    { field: "webhookId", headerName: "Webhook ID", width: "20%" },
    { field: "event", headerName: "Event", width: "20%" },
    { 
      field: "url", 
      headerName: "Url", 
      width: "20%",
      renderCell: (value: string) => (
        <div className="flex items-center">
          <span className="truncate">{value}</span>
          <Link className="w-4 h-4 ml-2 text-gray-600 cursor-pointer" />
        </div>
      ),
    },
    { field: "authToken", headerName: "Auth Token", width: "20%" },
    {
      field: "action",
      headerName: "Action",
      width: "10%",
      renderCell: (value: any, row: any) => (
        <div className="flex items-center">
          <Trash2
            className="w-4 h-4 text-gray-600 mr-3 cursor-pointer"
            onClick={() => handleDeleteWebhook(row)}
          />
          <PenSquare
            className="w-4 h-4 text-gray-600 cursor-pointer"
            onClick={() => handleEditWebhook(row)}
          />
        </div>
      ),
    },
    {
      field: "enabled",
      headerName: "",
      width: "10%",
      renderCell: (value: boolean, row: any) => (
        <ToggleSwitch
          checked={value}
          onChange={() => toggleWebhookStatus(row.id)}
          aria-labelledby={`webhook-status-${row.id}`}
        />
      ),
    },
  ];

  // SelectAll and SelectRow functions
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedRows(webhooks.map((webhook) => webhook.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id: string) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  // Get title for modal based on mode
  const getModalTitle = () => {
    switch (modalMode) {
      case "add":
        return "Add New Webhook";
      case "edit":
        return "Edit Webhook";
      case "view":
        return "View Webhook Details";
      case "delete":
        return "Delete Webhook";
      default:
        return "Webhook";
    }
  };

  return (
    <div className="w-full max-h-[80vh] overflow-y-auto sm:overflow-visible md:overflow-visible lg:overflow-visible xl:overflow-visible">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <h1 className="text-[14px] font-inter font-[600] text-headding-color">
          Webhook
        </h1>
        <div className="flex gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-[12px] font-inter font-[500] text-paragraphBlack"
          >
            Learn More
          </button>
          <button
            onClick={() => openModal("add")}
            className="px-4 py-2 text-[12px] font-inter font-[500] text-paragraphBlack bg-backgroundWhite rounded-lg border border-reloadBorder"
          >
            Add New
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="p-6">
        <div className="bg-backgroundWhite p-5">
          <h2
            className="text-[14px] font-inter font-[600] text-textHeading mb-5"
            id="webhook-settings-label"
          >
            Added webhooks
          </h2>
          <div className="border rounded-lg overflow-x-auto">
            <CustomDataGrid
              columns={webhookColumns}
              rows={webhooks}
              selectedRows={selectedRows}
              onSelectAll={handleSelectAll}
              onSelectRow={handleSelectRow}
              searchPlaceholder="Search webhooks"
              hideToolbar={false}
            />
          </div>
          <div className="mt-2 text-sm text-gray-500">
            Showing result 10 out of 50
          </div>
        </div>
      </div>

      {/* Custom Modal for all operations */}
      {isModalOpen && (
        <CustomModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          mode={modalMode}
          fields={modalMode !== "delete" ? webhookFields : []}
          item={
            selectedWebhook
              ? {
                  id: selectedWebhook.id,
                  webhookId: selectedWebhook.webhookId,
                  event: selectedWebhook.event,
                  url: selectedWebhook.url,
                  authToken: selectedWebhook.authToken,
                  isActive: selectedWebhook.enabled,
                }
              : undefined
          }
          onSave={handleSaveWebhook}
          title={getModalTitle()}
          subtitle={
            modalMode === "delete"
              ? `Are you sure you want to delete ${selectedWebhook?.webhookId}?`
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
          {modalMode === "delete" && (
            <p className="text-gray-600">
              This action cannot be undone. This will permanently delete the webhook
              <span className="font-medium"> {selectedWebhook?.webhookId}</span> and
              remove all associated data.
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

export default Webhook;