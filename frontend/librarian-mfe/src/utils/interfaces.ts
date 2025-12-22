import { ActivityType, FormType, Gender, RequestStatus, Status } from "./enums";

interface IssuedBooksOverviewProps {
  displayBooks?: IssuedBook[];
}

interface OverdueBook {
  title: string;
  daysOverdue: number;
  dueDate: string;
  isbn: string;
  memberId: string;
}

interface OverdueAlertsProps {
  books?: OverdueBook[];
}

interface RenewalRequest {
  id: number;
  borrowRecordId: number;
  requestedDays: number;
  reason: string;
  isApproved: boolean;
  isProcessed: boolean;
  createdAt: string;
}

interface PendingActionsProps {
  renewals?: RenewalRequest[];
  pendingCounts?: {
    pendingRenewals: number;
    unpaidFines: number;
    pendingBookRequests: number;
  };
}

interface Activity {
  type: ActivityType;
  timestamp: string;
  data: any;
}

interface RecentActivitiesProps {
  activities?: Activity[];
}

interface StatsCardProps {
  title: string;
  value: string;
  trend: string;
  color: string;
}

interface ReturnBook {
  id: string;
  isbn: string;
  title: string;
  memberName: string;
  memberId: string;
  dueDate: string;
  borrowedDate: string;
  daysOverdue: number;
}

interface ApproveReturnProps {
  open: boolean;
  book: ReturnBook | null;
  onClose: () => void;
  onApprove: (returnData: any) => void;
}


interface IssuedBooksFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  dateRangeFilter: string;
  setDateRangeFilter: (range: string) => void;
}

interface BooksOption {
  isbn: string;
  title: string;
}

interface BookRequest {
  id: string;
  memberId: string;
  memberName: string;
  title: string;
  author: string;
  isbn: string;
  requestDate: string;
  status: RequestStatus;
  reason: string;
}

interface RequestFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  filteredRequests: BookRequest[];
  bookRequests: BookRequest[];
}

interface AuthorDetails {
  id: string;
  name: string;
}

interface BookFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  genreFilter: string;
  setGenreFilter: (genre: string) => void;
}
interface MemberFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
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
  type: FormType
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
    type: FormType;
    value: string;
    required?: boolean;
    options?: { label: string; value: string }[];
  }[];
  onSaveProfile?: (data: { [key: string]: string }) => Promise<void>;
}

// Book-related interfaces
interface Book {
  isbn: string;
  title: string;
  author: string;
  authorId?: number;
  category: string;
  publisher: string;
  publishedYear: number;
  language: string;
  shelfLocation: string;
  available: boolean;
}

interface BookInput {
  isbn: string;
  title: string;
  authorId: number;
  genre: string;
  publishedYear: number;
  publisher: string;
  language: string;
  shelfLocation: string;
  available: boolean;
}

interface RequestedBook {
  id: string;
  title: string;
  author: string;
  reason: string;
  memberId: string;
  memberName?: string;
  isProcessed: boolean;
  isApproved: boolean;
  createdAt: string;
}

//Dashboard interfaces
interface KPIData {
  totalBooks: number;
  totalMembers: number;
  issuedToday: number;
  overdueBooks: number;
  pendingRenewals: number;
  newMembers: number;
}

interface IssuedBook {
  id: number;
  memberId: string;
  isbn: string;
  borrowDate: string;
  returnDate: string;
  status: string;
  title?: string;
  author?: string;
  returnedDate?: string;
}

interface OverdueBook {
  title: string;
  daysOverdue: number;
  dueDate: string;
  isbn: string;
  memberId: string;
}

interface RenewalRequest {
  id: number;
  borrowRecordId: number;
  requestedDays: number;
  reason: string;
  isApproved: boolean;
  isProcessed: boolean;
  createdAt: string;
}

//Issue Books interfaces
interface IssueBookInput {
  memberId: string;
  isbn: string;
  issueDate: string;
  dueDate?: string;
}

interface ReturnBookInput {
  borrowRecordId: string;
  isReturned: boolean;
  fine?: {
    amount: number;
    memberId: string;
    paid: boolean;
  };
}

interface RenewalRequest {
  id: number;
  borrowRecordId: number;
  createdAt: string;
  reason: string;
  isApproved: boolean;
  isProcessed: boolean;
  requestedDueDate: string;
  isbn: string;
  title: string;
  memberId: string;
  memberName: string;
  borrowDate: string;
  returnDate: string;
}

// User Profile interfaces

interface User {
  id: string;
  fullname: string;
}

interface Member {
  id: number;
  email: string;
  fullname: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  gender: Gender;
  nic: string;
  membershipDate: string;
  totalFines: number;
  totalBooksIssued: number;
  status: Status;
  registeredBy: string;
}

interface CreateMemberInput {
  email: string;
  fullname: string;
  phone: string;
  address: string;
  dateOfBirth: string;
  gender: string;
  nic: string;
  membershipDate: string;
  type: string;
  status: string;
  registeredBy: string;
}

interface UserValidation {
  id: string;
}
export { 
    IssuedBooksOverviewProps, 
    OverdueAlertsProps, 
    PendingActionsProps,    
    RecentActivitiesProps,
    Activity,
    StatsCardProps,
    ApproveReturnProps,
    IssuedBooksFilterProps,
    BooksOption,
    BookRequest,
    RequestFilterProps,
    AuthorDetails,
    BookFilterProps,
    MemberFilterProps,
    ProfileAvatarProps,
    ProfileEditFormProps,
    ProfileInfoProps,
    ProfileStatsProps,
    ProfilePageProps,
    UserProfileData,
    Book,
    BookInput,
    RequestedBook,
    KPIData,
    IssuedBook,
    OverdueBook,
    RenewalRequest,
    IssueBookInput,
    ReturnBookInput,
    User,
    Member,
    CreateMemberInput,
    UserValidation,
};
