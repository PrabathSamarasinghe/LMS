import { TypeOfInput } from "./enums";

interface CurrentBook {
  id: number;
  title: string;
  author: string;
  borrowedDate: string;
  dueDate: string;
  status: string;
}

interface CurrentBooksProps {
  books?: CurrentBook[];
}

interface OverdueBook {
  title: string;
  daysOverdue: number;
  dueDate: string;
}

interface OverdueAlertsProps {
  books?: OverdueBook[];
}

interface QuickAction {
  label: string;
  url?: string;
}

interface QuickActionsProps {
  actions: QuickAction[];
}

interface RecommendedBook {
  title: string;
  author: string;
  genre: string;
}

interface RecommendedBooksProps {
  books?: RecommendedBook[];
}

interface ReturnedBook {
  title: string;
  returnedDate: string;
}

interface ReturnedBooksProps {
  books?: ReturnedBook[];
}

interface StatCardProps {
  title: string;
  value: string;
  description: string;
}

interface WelcomeHeaderProps {
  memberName: string;
  memberId: string;
  membershipType: string;
}

interface ProfileAvatarProps {
  name: string;
  email: string;
  avatar?: string;
  role: string;
  onEditClick?: () => void;
}

interface FormField {
  name: string;
  label: string;
  type: TypeOfInput;
  value: string;
  required?: boolean;
  options?: { label: string; value: string }[];
}

interface ProfileEditFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { [key: string]: string }) => void;
  fields: FormField[];
  title?: string;
  isLoading?: boolean;
  error?: string;
  success?: string;
}

interface UserProfileData {
  id: string;
  email: string;
  fullname: string;
  phone?: string;
  address?: string;
  cognitoUserId?: string;
  dateOfBirth?: string;
  gender?: "Male" | "Female";
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
    type: TypeOfInput;
    value: string;
    required?: boolean;
    options?: { label: string; value: string }[];
  }[];
  onSaveProfile?: (data: { [key: string]: string }) => Promise<void>;
}

interface ProfileInfoProps {
  sections: {
    title: string;
    items: {
      label: string;
      value: string | React.ReactNode;
    }[];
  }[];
}

interface StatItem {
  label: string;
  value: string | number;
  icon: string;
}

interface ProfileStatsProps {
  stats: StatItem[];
}

//Book related interfaces are in BookAPIs.tsx
interface Book {
  isbn: string;
  title: string;
  author: string;
  category: string;
  publisher: string;
  publishedYear: number;
  language: string;
  shelfLocation: string;
  available: boolean;
}

//BorrowedBook interface is in BorrowedAPI.tsx

interface Fine {
  amount: number;
  paid: boolean;
}

interface BorrowedBook {
  id?: string;
  isbn: string;
  title: string;
  memberId: string;
  borrowDate: string;
  returnDate: string | null;
  daysLeft?: number;
  lateDays?: number;
  status: string;
  fine: Fine;
  isRenewed?: boolean;
}

// Dashboard related interfaces are in DashboardAPI.tsx

interface MemberProfile {
  id: number;
  email: string;
  fullname: string;
  phone: string;
  address: string;
  type: string;
  status: string;
  membershipDate: string;
}

interface MemberStats {
  booksBorrowed: number;
  renewalsPending: number;
  overdueBooks: number;
  totalBorrowed: number;
}

interface BorrowedBookItem {
  id: number;
  memberId: string;
  isbn: string;
  borrowDate: string;
  dueDate: string;
  status: string;
  isReturned: boolean;
  title?: string;
  author?: string;
}

interface OverdueBookItem {
  title: string;
  daysOverdue: number;
  dueDate: string;
}

interface ReturnedBookItem {
  title: string;
  returnedDate: string;
}

interface RecommendedBook {
  title: string;
  author: string;
  genre: string;
}
interface User {
  id: string;
}
export {
  CurrentBooksProps,
  OverdueAlertsProps,
  QuickActionsProps,
  RecommendedBooksProps,
  ReturnedBooksProps,
  StatCardProps,
  WelcomeHeaderProps,
  ProfileAvatarProps,
  FormField,
  ProfileEditFormProps,
  UserProfileData,
  ProfilePageProps,
  ProfileInfoProps,
  ProfileStatsProps,
  Book,
  BorrowedBook,
  MemberProfile,
  MemberStats,
  BorrowedBookItem,
  OverdueBookItem,
  ReturnedBookItem,
  RecommendedBook,
  User,
};
