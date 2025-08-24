import React from 'react';
import Link from 'next/link';

interface ButtonProps {
  label: string;
  href?: string;
  appearance?: 'primary' | 'secondary' | 'default';
  onClick?: () => void;
  className?: string;
  newTab?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<ButtonProps> = ({
  label,
  href,
  appearance = 'default',
  onClick,
  className,
  newTab = false,
  type = 'button',
}) => {
  const baseStyles = 'inline-flex items-center justify-center px-4 xs:px-5 sm:px-6 md:px-8 py-2.5 xs:py-3 sm:py-3.5 md:py-4 rounded-lg sm:rounded-xl font-semibold text-sm xs:text-base sm:text-lg md:text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-opacity-50 active:scale-95 w-full xs:w-auto min-w-[120px] xs:min-w-[140px] sm:min-w-[160px]';
  
  const appearanceStyles = {
    default: 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 focus:ring-blue-500 shadow-lg hover:shadow-xl',
    primary: 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 focus:ring-blue-500 shadow-lg hover:shadow-xl',
    secondary: 'bg-white/90 backdrop-blur-sm text-gray-800 border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-400 focus:ring-gray-500 shadow-md hover:shadow-lg dark:bg-gray-800/90 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-500',
  };
  
  const combinedClassName = `${baseStyles} ${appearanceStyles[appearance]} ${className || ''}`;
  
  if (href) {
    const linkProps = {
      className: combinedClassName,
      ...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {}),
    };
    
    if (href.startsWith('http')) {
      return (
        <a href={href} {...linkProps}>
          {label}
        </a>
      );
    }
    
    return (
      <Link href={href} {...linkProps}>
        {label}
      </Link>
    );
  }
  
  return (
    <button 
      type={type} 
      className={combinedClassName} 
      onClick={onClick}
    >
      {label}
    </button>
  );
};