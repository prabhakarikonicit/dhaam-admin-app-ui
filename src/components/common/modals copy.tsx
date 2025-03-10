import React, { useState, useEffect, ReactNode } from 'react';

// Define field types for form fields
export type FieldType = 'text' | 'number' | 'email' | 'password' | 'select' | 'textarea' | 'checkbox' | 'date' | 'time' | 'radio';

// Field definition interface
export interface FieldDefinition {
  id: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: { value: string; label: string }[];
  required?: boolean;
  helperText?: string;
  disabled?: boolean;
  min?: number;
  max?: number;
  pattern?: string;
  rows?: number; // For textarea
  cols?: number; // For textarea
}

// Base item interface that can be extended for specific use cases
export interface BaseItem {
  id?: string;
  isActive?: boolean;
  [key: string]: any;
}

// Modal props interface
export interface CustomModalProps<T extends BaseItem> {
  isOpen: boolean;
  onClose: () => void;
  mode: 'add' | 'edit' | 'view' | 'delete' | 'confirm';
  fields?: FieldDefinition[];
  item?: T;
  onSave: (item: T) => void;
  title: string;
  subtitle?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showFooter?: boolean;
  customFooter?: ReactNode;
  confirmText?: string;
  cancelText?: string;
  children?: ReactNode;
  showToggle?: boolean;
  toggleLabel?: string;
  className?: string;
  isLoading?: boolean;
}

// Toggle component for enabling/disabling items
const Toggle: React.FC<{ checked: boolean; onChange: () => void; disabled?: boolean; label?: string }> = ({ 
  checked, 
  onChange,
  disabled = false,
  label
}) => {
  return (
    <div className="flex items-center gap-2">
      {label && <span className="text-sm text-gray-600">{label}</span>}
      <button
        type="button"
        onClick={onChange}
        disabled={disabled}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          checked ? 'bg-purple-600' : 'bg-gray-200'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
};

// CustomModal Component
function CustomModal<T extends BaseItem>({
  isOpen,
  onClose,
  mode,
  fields = [],
  item,
  onSave,
  title,
  subtitle,
  size = 'md',
  showFooter = true,
  customFooter,
  confirmText,
  cancelText = 'Cancel',
  children,
  showToggle = false,
  toggleLabel = 'Active',
  className = '',
  isLoading = false,
}: CustomModalProps<T>) {
  const [formData, setFormData] = useState<Record<string, any>>(
    item || {} as T
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen && item) {
      setFormData(item);
    } else if (isOpen) {
      // Reset form when opening in add mode
      setFormData({} as T);
    }
    
    // Clear errors when modal opens/closes
    setErrors({});
  }, [isOpen, item]);

  const handleChange = (fieldId: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [fieldId]: value,
    }));

    // Clear error when field is modified
    if (errors[fieldId]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldId];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    fields.forEach((field) => {
      if (field.required && !formData[field.id] && formData[field.id] !== 0 && formData[field.id] !== false) {
        newErrors[field.id] = `${field.label} is required`;
      }
      
      // Add additional validation based on field type
      if (field.type === 'email' && formData[field.id] && !/\S+@\S+\.\S+/.test(formData[field.id])) {
        newErrors[field.id] = 'Please enter a valid email address';
      }
      
      if (field.type === 'number' && formData[field.id]) {
        const numValue = Number(formData[field.id]);
        
        if (field.min !== undefined && numValue < field.min) {
          newErrors[field.id] = `Value must be at least ${field.min}`;
        }
        
        if (field.max !== undefined && numValue > field.max) {
          newErrors[field.id] = `Value must be at most ${field.max}`;
        }
      }
      
      if (field.pattern && formData[field.id] && !new RegExp(field.pattern).test(formData[field.id])) {
        newErrors[field.id] = `${field.label} has an invalid format`;
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === 'view' || mode === 'delete') {
      onClose();
      return;
    }
    
    if (!validateForm()) return;
    
    // For edit mode, maintain the original ID
    const dataToSave = {
      ...formData,
      id: mode === 'edit' && item?.id ? item.id : formData.id || Date.now().toString()
    } as T;
    
    onSave(dataToSave);
    onClose();
  };

  const renderField = (field: FieldDefinition) => {
    const isDisabled = mode === 'view' || field.disabled;
    const value = formData[field.id] !== undefined ? formData[field.id] : '';
    const error = errors[field.id];
    
    const baseInputClass = `w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
      isDisabled ? 'bg-gray-100 cursor-not-allowed' : ''
    } ${error ? 'border-red-500' : 'border-gray-300'}`;
    
    switch (field.type) {
      case 'select':
        return (
          <select
            id={field.id}
            value={value}
            onChange={(e) => handleChange(field.id, e.target.value)}
            disabled={isDisabled}
            className={baseInputClass}
          >
            <option value="">Select {field.label}</option>
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      case 'textarea':
        return (
          <textarea
            id={field.id}
            value={value}
            onChange={(e) => handleChange(field.id, e.target.value)}
            placeholder={field.placeholder || ''}
            disabled={isDisabled}
            rows={field.rows || 4}
            cols={field.cols}
            className={baseInputClass}
          />
        );
      case 'checkbox':
        return (
          <div className="flex items-center">
            <input
              type="checkbox"
              id={field.id}
              checked={value || false}
              onChange={(e) => handleChange(field.id, e.target.checked)}
              disabled={isDisabled}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor={field.id} className="ml-2 text-sm text-gray-700">
              {field.helperText || field.label}
            </label>
          </div>
        );
      case 'radio':
        return (
          <div className="flex flex-col space-y-2">
            {field.options?.map((option) => (
              <div key={option.value} className="flex items-center">
                <input
                  type="radio"
                  id={`${field.id}-${option.value}`}
                  name={field.id}
                  value={option.value}
                  checked={value === option.value}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  disabled={isDisabled}
                  className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor={`${field.id}-${option.value}`} className="ml-2 text-sm text-gray-700">
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        );
      case 'date':
        return (
          <input
            type="date"
            id={field.id}
            value={value}
            onChange={(e) => handleChange(field.id, e.target.value)}
            disabled={isDisabled}
            className={baseInputClass}
          />
        );
      case 'time':
        return (
          <input
            type="time"
            id={field.id}
            value={value}
            onChange={(e) => handleChange(field.id, e.target.value)}
            disabled={isDisabled}
            className={baseInputClass}
          />
        );
      case 'number':
        return (
          <input
            type="number"
            id={field.id}
            value={value}
            onChange={(e) => handleChange(field.id, e.target.value)}
            placeholder={field.placeholder || ''}
            disabled={isDisabled}
            min={field.min}
            max={field.max}
            className={baseInputClass}
          />
        );
      case 'email':
      case 'password':
      case 'text':
      default:
        return (
          <input
            type={field.type || 'text'}
            id={field.id}
            value={value}
            onChange={(e) => handleChange(field.id, e.target.value)}
            placeholder={field.placeholder || ''}
            disabled={isDisabled}
            pattern={field.pattern}
            className={baseInputClass}
          />
        );
    }
  };

  if (!isOpen) return null;

  const modalTitle = title || {
    add: 'Add New Item',
    edit: 'Edit Item',
    view: 'View Item Details',
    delete: 'Confirm Delete',
    confirm: 'Confirm Action',
  }[mode];

  const submitButtonText = confirmText || {
    add: 'Save',
    edit: 'Save Changes',
    view: 'Close',
    delete: 'Delete',
    confirm: 'Confirm',
  }[mode];

  // Modal size classes
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-full mx-4',
  }[size];

  // Button classes based on mode
  const buttonClasses = {
    add: 'text-[14px] font-inter font-[500] text-paragraphBlack bg-bgButton',
    edit: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
    view: 'bg-gray-600 hover:bg-gray-700 focus:ring-gray-500',
    delete: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
    confirm: 'bg-green-600 hover:bg-green-700 focus:ring-green-500',
  }[mode];

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Modal Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className={`bg-white rounded-lg shadow-xl w-full ${sizeClasses} z-10 overflow-hidden transform transition-all ${className}`}>
        {/* Modal Header */}
        <div className="bg-gray-100 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h3 className="text-[14px] font-inter font-[500] text-paragraphBlack">{modalTitle}</h3>
            {subtitle && <p className="text-[12px] font-inter font-[500] text-paragraphBlack0 mt-1">{subtitle}</p>}
          </div>
          <div className="flex items-center">
            {/* {mode === 'add' && <span className="px-4 py-1 text-[12px] font-inter font-[500] text-paragraphBlack">New</span>} */}
            {mode === 'delete' && <span className="px-4 py-1 bg-red-600 text-white text-sm rounded-full">Delete</span>}
          </div>
        </div>
        
        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="px-6 py-4">
          {/* For confirmation or delete modals */}
          {mode === 'confirm' && (
            <div className="py-4">
              {children || <p className="text-gray-700">Are you sure you want to proceed?</p>}
            </div>
          )}
          
          {mode === 'delete' && (
            <div className="py-4">
              {children || <p className="text-gray-700">Are you sure you want to delete this item? This action cannot be undone.</p>}
            </div>
          )}
          
          {/* Form fields or custom content */}
          {mode !== 'confirm' && mode !== 'delete' && (
            <>
              {children || (
                <div className="space-y-4">
                  {fields.map((field) => (
                    <div key={field.id} className="space-y-1">
                      <label 
                        htmlFor={field.id}
                        className="block text-[12px] font-inter font-[500] text-paragraphBlack"
                      >
                        {field.label} {field.required && <span className="text-red-500">*</span>}
                      </label>
                      {renderField(field)}
                      {field.helperText && !errors[field.id] && (
                        <p className="text-text-[12px] font-inter font-[500] text-paragraphBlack mt-1">{field.helperText}</p>
                      )}
                      {errors[field.id] && (
                        <p className="text-red-500 text-xs mt-1">{errors[field.id]}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
          
          {/* Modal Footer */}
          {showFooter && (
            <div className="mt-6 flex justify-between items-center">
              <div>
                {showToggle && mode !== 'add' && (
                  <Toggle 
                    checked={formData.isActive || false} 
                    onChange={() => handleChange('isActive', !formData.isActive)}
                    disabled={mode === 'view'}
                    label={toggleLabel}
                  />
                )}
              </div>
              {customFooter || (
                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-[12px] font-inter font-[500] text-paragraphBlack focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {cancelText}
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`px-4 py-2 rounded-md text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${buttonClasses} ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Processing...</span>
                      </div>
                    ) : (
                      submitButtonText
                    )}
                  </button>
                </div>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default CustomModal;