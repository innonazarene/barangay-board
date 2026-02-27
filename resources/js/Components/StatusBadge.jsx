const statusConfig = {
    open: {
        label: 'Open',
        classes: 'bg-red-100 text-red-800 ring-red-200',
    },
    in_progress: {
        label: 'In Progress',
        classes: 'bg-yellow-100 text-yellow-800 ring-yellow-200',
    },
    resolved: {
        label: 'Resolved',
        classes: 'bg-green-100 text-green-800 ring-green-200',
    },
};

export default function StatusBadge({ status }) {
    const config = statusConfig[status] ?? {
        label: status ?? 'Unknown',
        classes: 'bg-gray-100 text-gray-800 ring-gray-200',
    };

    return (
        <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${config.classes}`}
        >
            {config.label}
        </span>
    );
}
