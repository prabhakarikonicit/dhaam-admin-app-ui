import React, { useState } from 'react';
import ToggleSwitch from '../../../common/toggleSwitch';
import { ChevronDown } from 'lucide-react';


interface PermissionSectionProps {
    section: Permission;
    onToggle: (sectionId: string, actionId?: string) => void;
    isExpanded: boolean;
    onExpand: () => void;
  }
interface AddStaffProps {
  onClose: () => void;
  onSave: (data: any) => void;
}
interface Permission {
    id: string;
    name: string;
    enabled: boolean;
    actions: {
      id: string;
      name: string;
      enabled: boolean;
    }[];
    isCollapsible?: boolean;
  }
  
  interface PermissionSectionProps {
    section: Permission;
    onToggle: (sectionId: string, actionId?: string) => void;
    isExpanded: boolean;
    onExpand: () => void;
  }
  
  const PermissionSection: React.FC<PermissionSectionProps> = ({
    section,
    onToggle,
    isExpanded,
    onExpand
  }) => {
    const handleToggle = (e: React.MouseEvent) => {
      onToggle(section.id);
    };
  
    const handleActionToggle = (actionId: string) => (e: React.MouseEvent) => {
      onToggle(section.id, actionId);
    };
  
    return (
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div 
          className={`flex items-center justify-between p-4 ${section.isCollapsible ? 'cursor-pointer' : ''}`}
          onClick={section.isCollapsible ? onExpand : undefined}
        >
          <span className="text-[14px] font-inter font-[500] text-gray-900">
            {section.name}
          </span>
          <div className="flex items-center gap-3">
            {section.actions.length > 0 && (
              <ToggleSwitch
                checked={section.enabled}
                onChange={handleToggle}
              />
            )}
            {section.isCollapsible && (
              <ChevronDown 
                className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                  isExpanded ? 'transform rotate-180' : ''
                }`}
              />
            )}
          </div>
        </div>
        
        {section.actions.length > 0 && section.enabled && !section.isCollapsible && (
          <div className="divide-y divide-gray-200">
            {section.actions.map(action => (
              <div key={action.id} className="flex items-center justify-between p-4 pl-8">
                <span className="text-[14px] font-inter text-gray-700">
                  {action.name}
                </span>
                <ToggleSwitch
                  checked={action.enabled}
                  onChange={handleActionToggle(action.id)}
                />
              </div>
            ))}
          </div>
        )}
        
        {section.isCollapsible && isExpanded && (
          <div className="border-t border-gray-200 p-4">
            <div className="text-[14px] font-inter text-gray-600">
              Content for {section.name}
            </div>
          </div>
        )}
      </div>
    );
  };
  const AddStaff: React.FC<{ onClose: () => void; onSave: (data: any) => void }> = ({ 
    onClose, 
    onSave 
  }) => {
    const [staffName, setStaffName] = useState('');
    const [description, setDescription] = useState('');
    const [selectedTab, setSelectedTab] = useState('General');
    const [expandedSections, setExpandedSections] = useState<string[]>([]);
    const menuItems: string[] = [
        'General',
        'Marketing',
        'Order Setting',
        'User Setting',
        'Marketplace',
        'General Setting',
        'Agent Integration',
        'Master Brand'
      ];
    const toggleSection = (sectionId: string) => {
      setExpandedSections(prev => 
        prev.includes(sectionId) 
          ? prev.filter(id => id !== sectionId)
          : [...prev, sectionId]
      );
    };
  
    const [permissions, setPermissions] = useState<Permission[]>([
      {
        id: '1',
        name: 'Orders',
        enabled: true,
        actions: [
          { id: '1-1', name: 'Create', enabled: false },
          { id: '1-2', name: 'View', enabled: true },
          { id: '1-3', name: 'Edit', enabled: false },
        ]
      },
      {
        id: '2',
        name: 'Stores',
        enabled: true,
        actions: [
          { id: '2-1', name: 'Create', enabled: false },
          { id: '2-2', name: 'View', enabled: false },
          { id: '2-3', name: 'Edit', enabled: false },
        ]
      },
      {
        id: '3',
        name: 'Store Configuration',
        enabled: false,
        actions: [],
        isCollapsible: true
      },
      {
        id: '4',
        name: 'Catalogue',
        enabled: false,
        actions: [],
        isCollapsible: true
      },
      {
        id: '5',
        name: 'Customer',
        enabled: false,
        actions: [],
        isCollapsible: true
      },
      {
        id: '6',
        name: 'Analytics',
        enabled: false,
        actions: [],
        isCollapsible: true
      },
      {
        id: '7',
        name: 'Wallet',
        enabled: false,
        actions: [],
        isCollapsible: true
      }
    ]);

    const renderPermissionContent = () => {
        if (selectedTab === 'General') {
          return (
            <div className="space-y-4">
              {permissions.map(section => (
                <PermissionSection
                  key={section.id}
                  section={section}
                  onToggle={(sectionId, actionId) => {
                    setPermissions(prev => prev.map(section => {
                      if (section.id === sectionId) {
                        if (actionId) {
                          return {
                            ...section,
                            actions: section.actions.map(action => {
                              if (action.id === actionId) {
                                return { ...action, enabled: !action.enabled };
                              }
                              return action;
                            })
                          };
                        }
                        return { ...section, enabled: !section.enabled };
                      }
                      return section;
                    }));
                  }}
                  isExpanded={expandedSections.includes(section.id)}
                  onExpand={() => toggleSection(section.id)}
                />
              ))}
            </div>
          );
        }
        return null;
      };

  return (
    <div className="bg-backgroundWhite rounded-custom12px">
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <button onClick={onClose} className="text-gray-500">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 12L2 7L6 2" stroke="#636363" strokeWidth="1.5"/>
            </svg>
          </button>
          <h2 className="text-[14px] font-inter font-[600] text-headding-color">Add new staff</h2>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-[12px] font-inter font-[500] text-gray-700 bg-backgroundWhite border border-reloadBorder rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave({ staffName, description, permissions })}
            className="px-4 py-2 text-[12px] font-inter font-[500] text-white bg-bgButton rounded-lg"
          >
            Save
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-6">
          {/* Staff Name */}
          <div>
            <label className="block text-[14px] font-inter font-[500] text-gray-700 mb-2">
              Staff Name*
            </label>
            <input
              type="text"
              value={staffName}
              onChange={(e) => setStaffName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-[14px] font-inter"
              placeholder="Store Manager"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-[14px] font-inter font-[500] text-gray-700 mb-2">
              Description
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-[14px] font-inter"
              placeholder="Lorem ipsum"
            />
          </div>

          {/* Permissions */}
          <div>
            <h3 className="text-[14px] font-inter font-[600] text-gray-900 mb-4">
              Permissions
            </h3>

            <div className="grid grid-cols-4 gap-4">
              {/* Left Sidebar */}
              <div className="space-y-2 bg-gray-50 rounded-lg p-2">
                {menuItems.map((item) => (
                  <button
                    key={item}
                    onClick={() => setSelectedTab(item)}
                    className={`text-[14px] font-inter w-full text-left px-4 py-2 rounded transition-colors
                      ${selectedTab === item 
                        ? 'bg-white text-gray-900 font-[500]' 
                        : 'text-gray-500 hover:bg-gray-100'}`}
                  >
                    {item}
                  </button>
                ))}
              </div>

              {/* Right Content */}
              <div className="col-span-3">
                {renderPermissionContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStaff;