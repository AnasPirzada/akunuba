'use client';
import { useTheme } from '@/context/ThemeContext';

export default function Select({
  value,
  onChange,
  options = [],
  placeholder = 'Select an option',
  className = '',
  disabled = false,
  size = 'md', // 'sm', 'md', 'lg'
  ...props
}) {
  const { isDarkMode } = useTheme();

  const sizeClasses = {
    sm: 'px-3 py-2 text-xs sm:text-sm',
    md: 'px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base',
    lg: 'px-4 sm:px-5 py-3 sm:py-4 text-base sm:text-lg',
  };

  const baseClasses = `
    w-full
    rounded-lg
    border
    transition-all
    duration-200
    appearance-none
    cursor-pointer
    focus:outline-none
    focus:ring-2
    focus:ring-offset-0
    disabled:opacity-50
    disabled:cursor-not-allowed
    ${sizeClasses[size]}
    ${isDarkMode
      ? 'bg-[#2A2A2D] border-[#FFFFFF14] text-white focus:border-[#F1CB68] focus:ring-[#F1CB68]/20'
      : 'bg-white border-gray-300 text-gray-900 focus:border-[#F1CB68] focus:ring-[#F1CB68]/20'
    }
    ${className}
  `;

  // Custom chevron icon using background image
  const chevronIcon = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23F1CB68' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E";

  return (
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={baseClasses}
        style={{
          backgroundImage: `url("${chevronIcon}")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 0.75rem center',
          backgroundSize: size === 'sm' ? '0.875rem' : size === 'lg' ? '1.125rem' : '1rem',
          paddingRight: size === 'sm' ? '2.25rem' : size === 'lg' ? '3.25rem' : '2.75rem',
        }}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => {
          const optionValue = typeof option === 'object' ? option.value : option;
          const optionLabel = typeof option === 'object' ? option.label : option;
          return (
            <option
              key={optionValue}
              value={optionValue}
              className={isDarkMode ? 'bg-[#1a1a1d] text-white' : 'bg-white text-gray-900'}
            >
              {optionLabel}
            </option>
          );
        })}
      </select>
    </div>
  );
}

