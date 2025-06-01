import { ReactNode } from "react";

export type TagVariant = "success" | "gray" | "warning" | "danger";
export type TagSize = "sm" | "md";

interface TagProps {
  children: ReactNode;
  variant?: TagVariant;
  size?: TagSize;
  className?: string;
  count?: boolean; // Additional styling for count badges
}

const variantStyles: Record<TagVariant, string> = {
  success: "bg-green-100 text-green-800",
  gray: "bg-gray-200 text-gray-700",
  warning: "bg-yellow-100 text-yellow-800",
  danger: "bg-red-100 text-red-800",
};

const sizeStyles: Record<TagSize, string> = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2 py-1 text-xs leading-5",
};

export const Tag = ({
  children,
  variant = "success",
  size = "md",
  className = "",
  count = false,
}: TagProps) => {
  // Use a different style for count badges (typically used in tabs)
  const countStyle = count ? "ml-2" : "";

  // Apply rounded-full by default, any additional classes can be passed via className
  return (
    <span
      className={`inline-flex items-center font-semibold rounded-full ${sizeStyles[size]} ${variantStyles[variant]} ${countStyle} ${className}`}
    >
      {children}
    </span>
  );
};
