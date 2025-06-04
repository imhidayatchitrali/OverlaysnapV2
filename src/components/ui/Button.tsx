import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  primary?: boolean;
  outline?: boolean;
  light?: boolean;
  danger?: boolean;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  primary = false,
  outline = false,
  light = false,
  danger = false,
  className = '',
  disabled = false,
  type = 'button',
  onClick
}) => {
  const baseClasses = "rounded-lg px-4 py-2 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  let variantClasses = '';
  
  if (primary) {
    variantClasses = "bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500 disabled:bg-purple-300";
  } else if (outline) {
    variantClasses = "border border-white text-white hover:bg-white hover:bg-opacity-20 focus:ring-white";
  } else if (light) {
    variantClasses = "bg-white text-purple-700 hover:bg-purple-50 focus:ring-purple-500";
  } else if (danger) {
    variantClasses = "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 disabled:bg-red-300";
  } else {
    variantClasses = "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500 disabled:bg-gray-100 disabled:text-gray-400";
  }
  
  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses} ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;