export default function StatusBadge({ status, className = '' }) {
  const statusConfig = {
    pending: {
      bgColor: 'bg-red-500/20',
      textColor: 'text-red-400',
      dotColor: 'bg-red-400',
      label: 'Pending',
    },
    added: {
      bgColor: 'bg-green-500/20',
      textColor: 'text-green-400',
      dotColor: 'bg-green-400',
      label: 'Added',
    },
    completed: {
      bgColor: 'bg-green-500/20',
      textColor: 'text-green-400',
      dotColor: 'bg-green-400',
      label: 'Completed',
    },
  };

  const config = statusConfig[status] || statusConfig.pending;

  return (
    <span
      className={`
        text-xs font-medium px-3 py-1 rounded-full 
        flex items-center gap-1
        ${config.bgColor} ${config.textColor} ${className}
      `}
    >
      <span className={`w-2 h-2 rounded-full ${config.dotColor}`} />
      {config.label}
    </span>
  );
}

