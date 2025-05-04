import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

export const Card = ({ children, title, className = "" }: CardProps) => {
  return (
    <div className={`bg-white shadow-md rounded-lg p-6 ${className}`}>
      {title && (
        <h2 className="text-center text-2xl font-extrabold text-gray-900 mb-6">
          {title}
        </h2>
      )}
      {children}
    </div>
  );
};
