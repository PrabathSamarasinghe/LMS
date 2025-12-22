import { Severity, Type } from './enums'

interface SystemAlert {
  id: string
  title: string
  severity: Severity
  message: string
}

interface AlertsProps {
  alerts: SystemAlert[]
}

interface ActivityLogItem {
  time: string
  user: string
  action: string
  details: string
}

interface ActivityLogProps {
  activities: ActivityLogItem[]
}


interface FineItem {
  period: string
  amount: number
}

interface FineCollectionProps {
  fines: FineItem[]
  totalThisMonth: number
}

interface InventoryBook {
  category: string
  count: number
  percentage: number
}

interface InventorySummaryProps {
  books: InventoryBook[]
}


interface IssuingSummaryItem {
  label: string
  count: number
}

interface IssuingSummaryProps {
  items: IssuingSummaryItem[]
}

interface KPICardProps {
  title: string
  value: string | number
  trend?: string
}

interface LibrarianInfo {
  id: string
  name: string
  email: string
  booksHandled: number
  status: string
}

interface LibrarianOverviewProps {
  librarians: LibrarianInfo[]
}

interface MemberOverviewItem {
  label: string
  count: number
  bgColor: string
}

interface MemberManagementProps {
  items: MemberOverviewItem[]
}

interface QuickAction {
  label: string
  color: string
  url?: string
}

interface QuickActionsProps {
  actions: QuickAction[]
  onAction?: (label: string) => void
}

interface SystemConfig {
  label: string
  status: string
  statusColor: string
}

interface SystemHealthProps {
  configs: SystemConfig[]
}

interface LibrarianFilterProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  statusFilter: string
  setStatusFilter: (status: string) => void
}

interface ProfileAvatarProps {
  name: string
  email: string
  avatar?: string
  role: string
  onEditClick?: () => void
}

interface FormField {
  name: string
  label: string
  type: 'text' | 'email' | 'tel' | 'date' | 'select'
  value: string
  required?: boolean
  options?: { label: string; value: string }[]
}

interface ProfileEditFormProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: { [key: string]: string }) => void
  fields: FormField[]
  title?: string
  isLoading?: boolean
  error?: string
  success?: string
}

interface ProfileInfoProps {
  sections: {
    title: string
    items: {
      label: string
      value: string | React.ReactNode
    }[]
  }[]
}

interface StatItem {
  label: string
  value: string | number
  icon: string
}

interface ProfileStatsProps {
  stats: StatItem[]
}

interface UserProfileData {
  id: string;
  email: string;
  fullname: string;
  phone?: string;
  address?: string;
  cognitoUserId?: string;
  dateOfBirth?: string;
  gender?: string;
  nic?: string;
  membershipDate?: string;
  type?: string;

  status?: string;
  registeredBy?: string;
  [key: string]: any;
}

interface ProfilePageProps {
  stats?: {
    label: string;
    value: string | number;
    icon: string;
  }[];
  infoSections?: {
    title: string;
    items: {
      label: string;
      value: string;
      key: string;
    }[];
  }[];
  editableFields?: {
    name: string;
    label: string;
    type: Type;
    value: string;
    required?: boolean;
    options?: { label: string; value: string }[];
  }[];
  onSaveProfile?: (data: { [key: string]: string }) => Promise<void>;
}

// DashboardAPI related interfaces

interface KPIData {
  totalBooks: number;
  totalMembers: number;
  totalLibrarians: number;
  issuedToday: number;
  overdueBooks: number;
  newRegistrations: number;
}

interface ActivityItem {
  time: string;
  user: string;
  action: string;
  details: string;
}

interface InventoryCategory {
  category: string;
  count: number;
  percentage: number;
}

interface Librarian {
  id: string;
  name: string;
  email: string;
  booksHandled: number;
  status: string;
}

// UserAPI related interfaces
/**
 * Represents the input data required to register or update a user
 */
interface UserInput {
  address: string;
  dateOfBirth: string;
  email: string;
  fullname: string;
  gender: string;
  membershipDate: string;
  nic: string;
  phone: string;
  registeredBy: string;
  status: string;
  type: string;
}

/**
 * Represents a user object with complete profile information
 */
interface User {
  id: string;
  email: string;
  fullname: string;
  phone: string;
  address: string;
  dateOfBirth: Date;
  gender: string;
  nic: string;
  membershipDate: Date;
  type: string;
  status: string;
  registeredBy: string;
}
export {
    AlertsProps,
    ActivityLogProps,
    FineCollectionProps,
    InventorySummaryProps,
    IssuingSummaryProps,
    KPICardProps,
    LibrarianOverviewProps,
    MemberManagementProps,
    QuickActionsProps,
    SystemHealthProps,
    LibrarianFilterProps,
    ProfileAvatarProps,
    ProfileEditFormProps,
    ProfileInfoProps,
    ProfileStatsProps,
    UserProfileData,
    ProfilePageProps,
    KPIData,
    ActivityItem,
    InventoryCategory,
    Librarian,
    User,
    UserInput
}