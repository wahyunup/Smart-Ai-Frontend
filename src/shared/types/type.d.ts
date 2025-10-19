import type React from "react";

export interface MainLayoutProps {
  children: React.ReactNode;
}

export interface AuthLayoutProps {
  children: React.ReactNode;
}

export interface AuthSectionProps {
  headingAuth: string;
  subHeadingAuth: string;
  formContent: React.ReactNode;
  footerContent: React.ReactNode;
  classname: string;
}

export interface InputProps {
  label?: string;
  name: string;
  placeholder: string;
  type: string;
  htmlFor?: string;
}

export interface ButtonProps {
  onclick?: () => void;
  children: React.ReactNode;
  classname?: string;
  variant?: "primary" | "secondary" | "link";
}

export interface CardProps {
  icon: string;
  heading: string;
  classname: string;
  subheading: string;
}
