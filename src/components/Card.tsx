import React from 'react';

interface CardProps {
  children?: React.ReactNode;
  title?: string;
  subtitle?: string;
  image?: string;
  imageAlt?: string;
  className?: string;
  onClick?: () => void;
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'bordered' | 'glass' | 'compact';
  disabled?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  image,
  imageAlt,
  className = '',
  onClick,
  shadow = 'md',
  variant = 'default',
  disabled = false,
}) => {
  const baseClasses = 'card bg-base-100 rounded-2xl transition-all duration-300';
  
  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
  };

  const variantClasses = {
    default: 'bg-base-100',
    bordered: 'border border-base-300',
    glass: 'glass',
    compact: 'card-compact',
  };

  const interactionClasses = onClick && !disabled 
    ? 'cursor-pointer hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]' 
    : '';

  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';

  const cardClasses = `
    ${baseClasses}
    ${shadowClasses[shadow]}
    ${variantClasses[variant]}
    ${interactionClasses}
    ${disabledClasses}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  const handleClick = () => {
    if (onClick && !disabled) {
      onClick();
    }
  };

  return (
    <div 
      className={cardClasses}
      onClick={handleClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick && !disabled ? 0 : undefined}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && onClick && !disabled) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {image && (
        <figure className="px-6 pt-6">
          <img
            src={image}
            alt={imageAlt || 'Card image'}
            className="rounded-xl object-cover w-full h-48"
          />
        </figure>
      )}
      
      <div className="card-body">
        {title && (
          <h2 className="card-title text-lg font-semibold text-base-content">
            {title}
          </h2>
        )}
        
        {subtitle && (
          <p className="text-base-content/70 text-sm mb-2">
            {subtitle}
          </p>
        )}
        
        {children && (
          <div className="text-base-content/80">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;