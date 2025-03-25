export interface SidebarItemProps {
    icon: React.ReactNode;
    text: string;
    active?: boolean;
    hasSubmenu?: boolean;
    children?: React.ReactNode;
    onClick?: () => void;
    subItems?: Array<{ text: string }>;
    onSubItemClick?: (item: string) => void;
    selectedSubItem?: string | null;
  }

  export interface SidebarNavProps {
    onSettingsSubItemClick: (item: string) => void;
    onItemClick: (view: string) => void;
    currentView: string;
    setCurrentView: React.Dispatch<React.SetStateAction<string>>
  }

  export interface TopHeaderProps {
    userName: string;
    userImage?: string;
    onMenuClick: () => void;
    width?: number;
  }