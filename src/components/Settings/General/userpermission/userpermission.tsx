import React, { useState } from "react";
import CustomDataGrid from "../../../common/datagrid";
import AddStaff from "./addstaff";
interface StaffMember {
  id: string;
  name: string;
  createdOn: string;
  time: string;
  status: "Paid" | "Pending" | "Failed";
  description: string;
}

const UserPermission: React.FC = () => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [showAddStaffModal, setShowAddStaffModal] = useState(false);

  const staffData: StaffMember[] = [
    {
      id: "1",
      name: "Administrator",
      createdOn: "January 26",
      time: "06:30 PM",
      status: "Paid",
      description: "Lorem ipsum",
    },
    {
      id: "2",
      name: "Administrator",
      createdOn: "January 26",
      time: "06:30 PM",
      status: "Paid",
      description: "Dolor sit amet",
    },
    {
      id: "3",
      name: "Administrator",
      createdOn: "January 26",
      time: "06:30 PM",
      status: "Paid",
      description: "Tempor incididunt...",
    },
    {
      id: "4",
      name: "Cashier",
      createdOn: "January 26",
      time: "06:30 PM",
      status: "Paid",
      description: "Consectetur adipi...",
    },
    {
      id: "5",
      name: "Administrator",
      createdOn: "January 26",
      time: "06:30 PM",
      status: "Pending",
      description: "Tempor incididunt...",
    },
    {
      id: "6",
      name: "Store Manager",
      createdOn: "January 26",
      time: "06:30 PM",
      status: "Failed",
      description: "Sed do eiusmod",
    },
  ];

  const columns = [
    {
      field: "name",
      headerName: "Staff Name",
      width: "200px",
    },
    {
      field: "createdOn",
      headerName: "Created on",
      width: "150px",
    },
    {
      field: "status",
      headerName: "Status",
      width: "120px",
    },
    {
      field: "description",
      headerName: "Description",
      width: "auto",
    },
    {
      field: "action",
      headerName: "Action",
      width: "100px",
    },
  ];

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.checked) {
      setSelectedRows(staffData.map((item) => item.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id: string): void => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleAddStaff = () => {
    setShowAddStaffModal(true);
  };

  const handleSaveStaff = (data: any) => {
    console.log("Save staff data:", data);
    setShowAddStaffModal(false);
    // Implement save functionality
  };

  return (
    <div className="max-w-full rounded-custom12px p-6 md:p-0 sm:p-0 lg:p-0 xl:p-0 sm:max-h-full md:max-h-full lg:max-h-full xl:max-h-full max-h-[80vh] overflow-y-auto sm:overflow-visible md:overflow-visible lg:overflow-visible xl:overflow-visible">
      <div className="mb-8">
        <h2 className="text-[14px] font-inter font-[600] text-headding-color">
          User Permission
        </h2>
      </div>

      {!showAddStaffModal ? (
        <div className="bg-backgroundWhite rounded-custom12px p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-[14px] font-inter font-[600] text-paragraphBlack">
              Staff
            </h3>
            <button
              onClick={handleAddStaff}
              className="px-4 py-2 text-[12px] font-inter font-[600] text-cardValue bg-backgroundWhite border border-reloadBorder rounded-custom"
            >
              Add staff
            </button>
          </div>

          {/* <CustomDataGrid
            columns={columns}
            rows={staffData}
            pageSize={10}
            onSelectAll={handleSelectAll}
            onSelectRow={handleSelectRow}
            selectedRows={selectedRows}
          /> */}
          <div className="overflow-x-auto">
            <CustomDataGrid
              columns={[
                {
                  field: "name",
                  headerName: "Staff Name",
                  width: "200px",
                  renderCell: (value) => (
                    <span className="text-blue-600 hover:underline">
                      {value}
                    </span>
                  ),
                },
                {
                  field: "createdOn",
                  headerName: "Created on",
                  width: "150px",
                },
                {
                  field: "status",
                  headerName: "Status",
                  width: "120px",
                },
                {
                  field: "description",
                  headerName: "Description",
                  width: "auto",
                },
              ]}
              rows={staffData}
              pageSize={10}
              onSelectAll={handleSelectAll}
              onSelectRow={handleSelectRow}
              selectedRows={selectedRows}
              searchPlaceholder="Search staff"
              showActionColumn={true}
              onEdit={(row) => {
                // Handle edit action
                console.log("Edit:", row);
              }}
              onDelete={(row) => {
                // Handle delete action
                console.log("Delete:", row);
              }}
            />
          </div>
        </div>
      ) : (
        <AddStaff
          onClose={() => setShowAddStaffModal(false)}
          onSave={handleSaveStaff}
        />
      )}
    </div>
  );
};

export default UserPermission;
