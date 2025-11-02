export default function GlassCard({
  children,
  className = '',
  variant = 'default', // 'default', 'dark', 'hover'
}) {
  const variants = {
    default: 'bg-fullego-card',
    dark: 'bg-fullego-cardDark',
    hover: 'bg-fullego-cardHover',
  };

  return (
    <div
      className={`
        rounded-2xl ${variants[variant]}
        backdrop-blur-md border border-fullego-border
        ${className}
      `}
    >
      {children}
    </div>
  );
}

