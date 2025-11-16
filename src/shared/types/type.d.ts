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
  value?: string | number;
  onchange?: React.ChangeEventHandler<HTMLInputElement>;
  icon?: React.ReactNode;
  variant?: "primary" | "secondary" | "third";
  labelLayout?: "inline" | "block";
  iconPosition?: "left" | "right";
}

export interface ButtonProps {
  onclick?: () => void;
  children: React.ReactNode;
  classname?: string;
  variant?: "primary" | "secondary" | "link";
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
}

export interface ChatLogProps {
  id: number;
  conversation_id: string;
  username: string;
  question: string;
  answer: string;
  created_at: string;
}
