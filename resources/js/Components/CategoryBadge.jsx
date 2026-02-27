const categoryConfig = {
    announcement: {
        label: 'Announcement',
        classes: 'bg-blue-100 text-blue-800 ring-blue-200',
    },
    issue: {
        label: 'Issue',
        classes: 'bg-red-100 text-red-800 ring-red-200',
    },
    event: {
        label: 'Event',
        classes: 'bg-green-100 text-green-800 ring-green-200',
    },
    lost_and_found: {
        label: 'Lost & Found',
        classes: 'bg-yellow-100 text-yellow-800 ring-yellow-200',
    },
    help_request: {
        label: 'Help Request',
        classes: 'bg-purple-100 text-purple-800 ring-purple-200',
    },
};

export default function CategoryBadge({ category }) {
    const config = categoryConfig[category] ?? {
        label: category ?? 'Unknown',
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
