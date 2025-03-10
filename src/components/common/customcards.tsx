import React from 'react';
import ToggleSwitch from "./toggleSwitch";

// Interface for dynamic field options
export interface FieldOption {
  value: string;
  label: string;
}

// Interface for dynamic field
export interface DynamicField {
  id: string;
  type: 'select' | 'text' | 'number' | 'checkbox';
  label: string;
  placeholder?: string;
  options?: FieldOption[];
  required?: boolean;
}

// Interface for card items
export interface CardItem {
  id: string;
  name: string;
  isConnected: boolean;
  isActive?: boolean;
  logoType: string;
  logo?: React.ReactNode;
  additionalFields?: Record<string, any>;
}

interface CustomCardProps {
  item: CardItem;
  onToggle: (id: string) => void;
  onEdit?: (item: CardItem) => void;
  renderLogo?: (logoType: string) => React.ReactNode;
  showEditButton?: boolean;
}

const CustomCard: React.FC<CustomCardProps> = ({
  item,
  onToggle,
  onEdit,
  renderLogo,
  showEditButton = true
}) => {
  const handleEditClick = () => {
    if (onEdit) {
      onEdit(item);
    }
  };

  return (
    <div className="flex items-center justify-between p-3 mb-3 border rounded-md">
      <div className="flex items-center">
        <div className="w-10 h-10 mr-3 flex items-center">
          {item.logo || (renderLogo && renderLogo(item.logoType))}
        </div>
        <span className="text-[14px] font-inter font-[500px] text-paragraphBlack">{item.name}</span>
        {showEditButton && onEdit && (
          <button
            onClick={handleEditClick}
            className="p-2 mr-2 text-gray-600 hover:text-gray-900"
            aria-label={`Edit ${item.name}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
            >
              <path
                d="M12.1899 1.81044C11.6432 1.26371 10.7568 1.26371 10.21 1.81044L4.89999 7.12049V9.10039H6.87989L12.1899 3.79034C12.7367 3.24361 12.7367 2.35718 12.1899 1.81044Z"
                fill="#212121"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.39999 4.20039C1.39999 3.42719 2.0268 2.80039 2.79999 2.80039H5.59999C5.98659 2.80039 6.29999 3.11379 6.29999 3.50039C6.29999 3.88699 5.98659 4.20039 5.59999 4.20039H2.79999V11.2004H9.79999V8.40039C9.79999 8.01379 10.1134 7.70039 10.5 7.70039C10.8866 7.70039 11.2 8.01379 11.2 8.40039V11.2004C11.2 11.9736 10.5732 12.6004 9.79999 12.6004H2.79999C2.0268 12.6004 1.39999 11.9736 1.39999 11.2004V4.20039Z"
                fill="#212121"
              />
            </svg>
          </button>
        )}
      </div>
      
      <div className="flex items-center">
        <ToggleSwitch
          checked={item.isConnected}
          onChange={() => onToggle(item.id)}
          aria-labelledby={`${item.id}-label`}
          aria-describedby={`${item.id}-description`}
        />
      </div>
    </div>
  );
};

// A component for dynamic field rendering
const DynamicFieldRenderer: React.FC<{
  field: DynamicField;
  value: any;
  onChange: (id: string, value: any) => void;
}> = ({ field, value, onChange }) => {
  switch (field.type) {
    case 'select':
      return (
        <div className="relative mb-4">
          <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-1">
            {field.label}
          </label>
          <div className="relative">
            <select
              id={field.id}
              className="w-full p-3 border border-menuSubHeadingColor rounded-md appearance-none pr-10 text-[12px] font-inter font-[500px] text-paragraphBlack"
              value={value || ""}
              onChange={(e) => onChange(field.id, e.target.value)}
              required={field.required}
            >
              <option value="" className="text-[12px] font-inter font-[500px] text-paragraphBlack">{field.placeholder || "Select an option"}</option>
              {field.options?.map((option) => (
                <option key={option.value} className="text-[12px] font-inter font-[500px] text-paragraphBlack" value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10 3C10.2652 3 10.5196 3.10536 10.7071 3.29289L13.7071 6.29289C14.0976 6.68342 14.0976 7.31658 13.7071 7.70711C13.3166 8.09763 12.6834 8.09763 12.2929 7.70711L10 5.41421L7.70711 7.70711C7.31658 8.09763 6.68342 8.09763 6.29289 7.70711C5.90237 7.31658 5.90237 6.68342 6.29289 6.29289L9.29289 3.29289C9.48043 3.10536 9.73478 3 10 3ZM6.29289 12.2929C6.68342 11.9024 7.31658 11.9024 7.70711 12.2929L10 14.5858L12.2929 12.2929C12.6834 11.9024 13.3166 11.9024 13.7071 12.2929C14.0976 12.6834 14.0976 13.3166 13.7071 13.7071L10.7071 16.7071C10.3166 17.0976 9.68342 17.0976 9.29289 16.7071L6.29289 13.7071C5.90237 13.3166 5.90237 12.6834 6.29289 12.2929Z"
                  fill="#636363"
                />
              </svg>
            </div>
          </div>
        </div>
      );
    case 'text':
      return (
        <div className="mb-4">
          <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-1">
            {field.label}
          </label>
          <input
            type="text"
            id={field.id}
            className="w-full p-3 border rounded-md"
            placeholder={field.placeholder}
            value={value || ""}
            onChange={(e) => onChange(field.id, e.target.value)}
            required={field.required}
          />
        </div>
      );
    case 'number':
      return (
        <div className="mb-4">
          <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-1">
            {field.label}
          </label>
          <input
            type="number"
            id={field.id}
            className="w-full p-3 border rounded-md"
            placeholder={field.placeholder}
            value={value || ""}
            onChange={(e) => onChange(field.id, e.target.value)}
            required={field.required}
          />
        </div>
      );
    case 'checkbox':
      return (
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id={field.id}
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            checked={value || false}
            onChange={(e) => onChange(field.id, e.target.checked)}
            required={field.required}
          />
          <label htmlFor={field.id} className="ml-2 block text-sm text-gray-700">
            {field.label}
          </label>
        </div>
      );
    default:
      return null;
  }
};

// Extended CustomCards component with dynamic fields
export interface CustomCardsProps {
  items: CardItem[];
  onToggle: (id: string) => void;
  onEdit?: (item: CardItem) => void;
  renderLogo?: (logoType: string) => React.ReactNode;
  title?: string;
  showEditButton?: boolean;
  dynamicFields?: DynamicField[];
  dynamicFieldsValues?: Record<string, any>;
  onDynamicFieldChange?: (fieldId: string, value: any) => void;
  showDynamicFieldsAtTop?: boolean;
}

export const CustomCards: React.FC<CustomCardsProps> = ({
  items,
  onToggle,
  onEdit,
  renderLogo,
  title,
  showEditButton = true,
  dynamicFields = [],
  dynamicFieldsValues = {},
  onDynamicFieldChange,
  showDynamicFieldsAtTop = true
}) => {
  const handleFieldChange = (fieldId: string, value: any) => {
    if (onDynamicFieldChange) {
      onDynamicFieldChange(fieldId, value);
    }
  };

  const renderDynamicFields = () => {
    if (!dynamicFields || dynamicFields.length === 0) return null;

    return (
      <div className="mb-6 border-b pb-4 text-[12px] font-inter font-[500px] text-paragraphBlack">
        {dynamicFields.map((field) => (
          <DynamicFieldRenderer
            key={field.id}
            field={field}
            value={dynamicFieldsValues[field.id]}
            onChange={handleFieldChange}
            
          />
        ))}
      </div>
    );
  };

  return (
    <div className="mb-4">
      
      
      {showDynamicFieldsAtTop && renderDynamicFields()}
      {title && <h3 className="text-[14px] font-inter font-[500px] text-textHeading mb-4">{title}</h3>}
      {items.map((item) => (
        <CustomCard
          key={item.id}
          item={item}
          onToggle={onToggle}
          onEdit={onEdit}
          renderLogo={renderLogo}
          showEditButton={showEditButton}
        />
      ))}
      
      {!showDynamicFieldsAtTop && renderDynamicFields()}
    </div>
  );
};

export default CustomCards;