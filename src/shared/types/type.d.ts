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
  name: string;
  placeholder: string;
  type: string;
  htmlFor?: string;
  classname?: string;
  value?: string | number;
  onchange?: React.ChangeEventHandler<HTMLInputElement>;
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
