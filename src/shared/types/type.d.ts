import type { ReactNode } from "react";
import type React from "react";

export interface MainLayoutProps {
  children: React.ReactNode;
}

export interface AuthLayoutProps {
  children: React.ReactNode;
}

export interface AuthSectionProps {
  headingAuth?: string;
  subHeadingAuth?: string | React.ReactNode;
  formContent?: React.ReactNode;
  footerContent?: React.ReactNode;
  classname?: string;
  subabHeading?: string;
}

export interface InputProps {
  label?: string;
  name?: string;
  placeholder?: string;
  type?: string;
  htmlFor?: string;
  classname?: string;
  value?: string | number
  onchange?: React.ChangeEventHandler<HTMLInputElement>;
  icon?: React.ReactNode;
  tooglePassword?: () => void;
  showPassword? : boolean
  variant?: "primary" | "secondary" | "third" | "disable";
  labelLayout?: "inline" | "block";
  iconPosition?: "left" | "right";
}

export interface ButtonProps {
  onclick?: () => void;
  children: React.ReactNode;
  classname?: string;
  variant?: "primary" | "secondary" | "link" | "cancel" | "cancel secondary" | "info";
}

export interface CardProps {
  icon: React.ReactNode;
  heading: string;
  classname: string;
  subheading: string;
  iconLayout: "left" | "right" | "center";
}

export interface logo {
  src: string;
}

export interface CaroselProps {
  logos: logo[];
}

export interface HeaderTableProps {
  onchange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  placeholderSearch?: string;
  onclickAdd?: () => void;
  labelButtonAdd?: string;
}

export interface TableHeaderListProps {
  children: ReactNode;
  classname: string;
}

export interface TableBodyProps {
  data?: EmployedProps[] | CustomerProps[];
  onclickEdit?: (id: number) => void;
  onclickDelete?: (id: number) => void;
  onClickPreview?: (id: number) => void;
  renderItem?: (item: any, i: number) => ReactNode;
  tooltipe?: (item: any, i: number) => ReactNode;
  classname?: string;
  userIsLogin?: string;
  nextPage?: () => void;
  prevPage?: () => void;
  page?: number;
  totalPage?: number;
  canEdit?: boolean;
  isLoading?: number;
  canAction?: boolean;
  isLoadingFetch?: boolean;
  showPreview? : boolean
}

export interface ChatLogProps {
  id: number;
  conversation_id: string;
  username: string;
  question: string;
  answer: string;
  created_at: string;
}

export interface TableCompanyProfilePageProps {
  label?: string;
  value?: string | React.ReactNode;
  editPreviewImage?: string | null;
  previewImage?: string | null;
  icon?: React.ReactNode;
  name?: string;
  onchange?: React.ChangeEventHandler<HTMLInputElement>;
}

export interface BreakDownCardProps {
  title?: string;
  count?: number;
  icon?: React.ReactNode;
  statCount?: React.ReactNode;
}

export interface BasicAreaProps {
  heading?: string;
  datas?: number[];
  days?: string[];
  color?: string;
}

export interface notificationProps {
  heading?: string;
  type?: string;
  subheading?: string;
  onClose?: boolean;
  setOnClose?: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface plan {
  name: string;
  price: number;
}

export interface topUpPackage {
  package_type: string;
  price: number;
}

export interface updateTransactionApiProps {
  plans: plan[];
  top_up_packages: topUpPackage[];
}

export interface SwitchProps {
  checked : boolean,
  onChange : (e) => void
}