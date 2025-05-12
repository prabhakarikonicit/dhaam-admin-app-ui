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
      authToken: "0xa3234sadjk4487349s3",
      enabled: true,
    },
    {
      id: "2",
      webhookId: "#327987",
      event: "Startup plan billing",
      url: "0xa2234sadjk4487343s7",
      authToken: "0xa2234sadjk4487343s7",
      enabled: false,
    },
    {
      id: "3",
      webhookId: "#327987",
      event: "Startup plan billing",
      url: "0xa2334sadjk4487343s6",
      authToken: "0xa2334sadjk4487343s6",
      enabled: true,
    },
    {
      id: "4",
      webhookId: "#327987",
      event: "Startup plan billing",
      url: "0xb7234sadjk4487349s5",
      authToken: "0xb7234sadjk4487349s5",
      enabled: false,
    },
    {
      id: "5",
      webhookId: "#327987",
      event: "Startup plan billing",
      url: "0xa2234sadjk4487343s9",
      authToken: "0xa2234sadjk4487343s9",
      enabled: true,
    },
    {
      id: "6",
      webhookId: "#327987",
      event: "Startup plan billing",
      url: "0xa2232sadjk4487343e2",
      authToken: "0xa2232sadjk4487343e2",
      enabled: false,
    },
    {
      id: "7",
      webhookId: "#327987",
      event: "Startup plan billing",
      url: "0xa9824sadjk4487823a9",
      authToken: "0xa9824sadjk4487823a9",
      enabled: false,
    },
    {
      id: "8",
      webhookId: "#327987",
      event: "Startup plan billing",
      url: "0xa9824sadjk4487823a9",
      authToken: "0xa9824sadjk4487823a9",
      enabled: false,
    },
    {
      id: "9",
      webhookId: "#327987",
      event: "Startup plan billing",
      url: "0xb9834sadjk4487349s1",
      authToken: "0xb9834sadjk4487349s1",
      enabled: true,
    },
    {
      id: "10",
      webhookId: "#327987",
      event: "Startup plan billing",
      url: "0xa9824sadjk4487823a9",
      authToken: "0xa9824sadjk4487823a9",
      enabled: true,
    },
  ]);

  // Webhook field definitions for modal
  const webhookFields: FieldDefinition[] = [
    {
      id: "event1",
      label: "Event *",
      type: "text",
      placeholder: "Select",
      required: true,
    },
    {
      id: "url2",
      label: "WebHook Url Name",
      type: "text",
      placeholder: "Secret Key",
      required: true,
    },
    {
      id: "token",
      label: "Auth Token",
      type: "text",
      placeholder: "Enter Auth token",
      required: true,
    },
  ];

  // Open modal to add or edit a webhook
  const openModal = (
    mode: "add" | "edit" | "view" | "delete",
    webhook?: Webhook
  ) => {
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
        webhooks.map((webhook) =>
          webhook.id === newWebhook.id ? newWebhook : webhook
        )
      );

      setNotificationMessage("Webhook updated successfully!");
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    } else if (modalMode === "delete" && selectedWebhook) {
      setWebhooks(
        webhooks.filter((webhook) => webhook.id !== selectedWebhook.id)
      );

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

  // Handle viewing webhook
  const handleViewWebhook = (row: any) => {
    const webhook = webhooks.find((w) => w.id === row.id);
    if (webhook) {
      openModal("view", webhook);
    }
  };

  // Define columns for the DataGrid
  const webhookColumns = [
    {
      field: "webhookId",
      headerName: "Webhook ID",
      width: "35%",
      renderCell: (value: string) => (
        <span className="text-billingNumber font-[12px] font-inter font-[500]">
          {value}
        </span>
      ),
    },
    {
      field: "event",
      headerName: "Event",
      width: "30%",
      renderCell: (value: string) => (
        <span
          className="text-cardValue font-[12px] font-inter font-[500] whitespace-nowrap
 "
        >
          {value}
        </span>
      ),
    },
    {
      field: "url",
      headerName: "Url",
      width: "15%",
      renderCell: () => (
        <div className="flex justify-center border border-reloadBorder w-8 rounded-custom py-1 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="14"
            viewBox="0 0 15 14"
            fill="none"
          >
            <path
              d="M9.31043 3.20995C9.85716 2.66322 10.7436 2.66322 11.2903 3.20995C11.8371 3.75669 11.8371 4.64312 11.2903 5.18985L9.19033 7.28985C8.64359 7.83659 7.75716 7.83659 7.21043 7.28985C6.93706 7.01649 6.49385 7.01649 6.22048 7.28985C5.94711 7.56322 5.94711 8.00644 6.22048 8.2798C7.31395 9.37327 9.08681 9.37327 10.1803 8.2798L12.2803 6.1798C13.3737 5.08633 13.3737 3.31347 12.2803 2.22C11.1868 1.12654 9.41395 1.12654 8.32048 2.22L7.27048 3.27C6.99711 3.54337 6.99711 3.98659 7.27048 4.25995C7.54385 4.53332 7.98706 4.53332 8.26043 4.25995L9.31043 3.20995Z"
              fill="#212121"
            />
            <path
              d="M5.81044 6.70995C6.35718 6.16322 7.24361 6.16322 7.79034 6.70995C8.06371 6.98332 8.50692 6.98332 8.78029 6.70995C9.05366 6.43659 9.05366 5.99337 8.78029 5.72C7.68682 4.62654 5.91396 4.62654 4.82049 5.72L2.72049 7.82C1.62702 8.91347 1.62702 10.6863 2.72049 11.7798C3.81396 12.8733 5.58682 12.8733 6.68029 11.7798L7.73029 10.7298C8.00366 10.4564 8.00366 10.0132 7.73029 9.73985C7.45692 9.46649 7.01371 9.46649 6.74034 9.73985L5.69034 10.7899C5.14361 11.3366 4.25718 11.3366 3.71044 10.7899C3.16371 10.2431 3.16371 9.35669 3.71044 8.80995L5.81044 6.70995Z"
              fill="#212121"
            />
          </svg>
        </div>
      ),
    },
    {
      field: "authToken",
      headerName: "Auth Token",
      width: "25%",
      renderCell: (value: string) => (
        <span
          className="text-cardValue font-[12px] font-inter font-[500] whitespace-nowrap
 "
        >
          {value}
        </span>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      width: "15%",
      renderCell: (value: any, row: any) => (
        <div className="flex items-center space-x-3">
          <span onClick={() => handleDeleteWebhook(row)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7.20039 1.6001C6.89737 1.6001 6.62036 1.7713 6.48485 2.04233L5.90596 3.2001H3.20039C2.75856 3.2001 2.40039 3.55827 2.40039 4.0001C2.40039 4.44193 2.75856 4.8001 3.20039 4.8001L3.20039 12.8001C3.20039 13.6838 3.91674 14.4001 4.80039 14.4001H11.2004C12.084 14.4001 12.8004 13.6838 12.8004 12.8001V4.8001C13.2422 4.8001 13.6004 4.44193 13.6004 4.0001C13.6004 3.55827 13.2422 3.2001 12.8004 3.2001H10.0948L9.51593 2.04233C9.38042 1.7713 9.10341 1.6001 8.80039 1.6001H7.20039ZM5.60039 6.4001C5.60039 5.95827 5.95856 5.6001 6.40039 5.6001C6.84222 5.6001 7.20039 5.95827 7.20039 6.4001V11.2001C7.20039 11.6419 6.84222 12.0001 6.40039 12.0001C5.95856 12.0001 5.60039 11.6419 5.60039 11.2001V6.4001ZM9.60039 5.6001C9.15856 5.6001 8.80039 5.95827 8.80039 6.4001V11.2001C8.80039 11.6419 9.15856 12.0001 9.60039 12.0001C10.0422 12.0001 10.4004 11.6419 10.4004 11.2001V6.4001C10.4004 5.95827 10.0422 5.6001 9.60039 5.6001Z"
                fill="#2B2B2B"
              />
            </svg>
          </span>
          {/* <Trash2
            className="w-5 h-5 text-gray-600 cursor-pointer"
            onClick={() => handleDeleteWebhook(row)}
          /> */}
          <span onClick={() => handleEditWebhook(row)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M13.931 2.06873C13.3061 1.44389 12.2931 1.44389 11.6682 2.06873L5.59961 8.13736V10.4001H7.86235L13.931 4.33147C14.5558 3.70663 14.5558 2.69357 13.931 2.06873Z"
                fill="#2B2B2B"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M1.59961 4.8001C1.59961 3.91644 2.31595 3.2001 3.19961 3.2001H6.39961C6.84144 3.2001 7.19961 3.55827 7.19961 4.0001C7.19961 4.44193 6.84144 4.8001 6.39961 4.8001H3.19961V12.8001H11.1996V9.6001C11.1996 9.15827 11.5578 8.8001 11.9996 8.8001C12.4414 8.8001 12.7996 9.15827 12.7996 9.6001V12.8001C12.7996 13.6838 12.0833 14.4001 11.1996 14.4001H3.19961C2.31595 14.4001 1.59961 13.6838 1.59961 12.8001V4.8001Z"
                fill="#2B2B2B"
              />
            </svg>
          </span>
        </div>
      ),
    },
    {
      field: "enabled",
      headerName: "",
      width: "5%",
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
        return "Add Webhook";
      case "view":
        return "View Webhook Details";
      case "delete":
        return "Delete Webhook";
      default:
        return "Webhook";
    }
  };

  return (
    <div className="max-w-full rounded-custom12px p-0 md:p-0 sm:p-0 lg:p-0 xl:p-0 sm:max-h-full md:max-h-full lg:max-h-full xl:max-h-full max-h-[75vh] overflow-y-auto sm:overflow-visible md:overflow-visible lg:overflow-visible xl:overflow-visible">
      {/* Header */}
      <div className="flex justify-between items-center p-4 mt-0 sm:mt-5 md:mt-4 md:px-1 sm:px-1 lg:px-1 xl:px-1">
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
      <div className="p-1 md:p-0 sm:p-0 lg:p-0 xl:p-0">
        <div className="bg-backgroundWhite p-5 w-full rounded-custom12px">
          <h2
            className="text-[14px] font-inter font-[600] text-textHeading mb-5"
            id="webhook-settings-label"
          >
            Added webhooks
          </h2>
          <div className="overflow-hidden overflow-x-auto">
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
        </div>
      </div>

      {/* Custom Modal for all operations */}
      {isModalOpen && (
        <CustomModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          mode={modalMode}
          fields={modalMode !== "delete" ? webhookFields : []}
          additionalButton={{
            label: "Learn More",
            onClick: () => {
              console.log("New button clicked!");
            },
            className: "bg-transperant",
            disabled: false,
          }}
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
          showToggle={false}
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
              This action cannot be undone. This will permanently delete the
              webhook
              <span className="font-medium">
                {" "}
                {selectedWebhook?.webhookId}
              </span>{" "}
              and remove all associated data.
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
