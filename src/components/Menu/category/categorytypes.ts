// Define interfaces for type safety
export interface CategoryItem {
  id: string;
  name: string;
  description: string;
  status: boolean;
  subcategories?: SubcategoryItem[];
}

export interface SubSubcategoryItem {
  id: string;
  name: string;
  description: string;
  status: boolean;
}

export interface SubcategoryItem {
  id: string;
  name: string;
  description: string;
  status: boolean;
  subSubcategories?: SubSubcategoryItem[];
}

export interface FormData {
  name: string;
  description?: string;
  product?: string;
  addSubCategory?: boolean;
  addMore?: boolean;
  [key: string]: any;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (formData: FormData) => void;
  currentItem?: any;
  parentName?: string;
}

export interface ProductItem {
  id: string;
  name: string;
  price: number;
  image?: string;
}

export type SelectedItemType = {
  type: 'category' | 'subcategory' | 'subSubcategory';
  id: string;
  parentId?: string;
  name: string;
};