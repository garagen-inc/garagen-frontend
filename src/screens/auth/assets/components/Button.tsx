import React from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  onClick,
  className = "",
  children,
}) => (
  <button
    type={type}
    onClick={onClick}
    className={`w-full p-2 rounded-lg transition-colors duration-200 ease-in-out ${className}`}
  >
    {children}
  </button>
);

export default Button;
