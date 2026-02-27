import { Link } from '@inertiajs/react';
import CategoryBadge from '@/Components/CategoryBadge';
import StatusBadge from '@/Components/StatusBadge';
import { relativeTime } from '@/utils/relativeTime';

const ROTATION_CLASSES = [
    'note-rotate-1',
    'note-rotate-2',
    'note-rotate-3',
    'note-rotate-4',
    'note-rotate-5',
    'note-rotate-6',
];

const PIN_COLORS = [
    'push-pin',
    'push-pin push-pin-blue',
    'push-pin push-pin-green',
    'push-pin push-pin-yellow',
];

export default function PostCard({ post, index = 0 }) {
    const truncateBody = (text, maxLength = 120) => {
        if (!text) return '';
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength).trimEnd() + '…';
    };

    const rotation = ROTATION_CLASSES[index % ROTATION_CLASSES.length];
    const pinColor = PIN_COLORS[index % PIN_COLORS.length];
    const hasCoordinates = post.latitude && post.longitude;

    return (
        <article
            className={`group relative paper-note rounded-lg shadow-paper transition-all duration-300 hover:shadow-paper-hover ${rotation} ${pinColor} pt-4 flex flex-col`}
        >
            {/* Pinned post banner */}
            {post.is_pinned && (
                <div className="relative z-20 flex items-center gap-1.5 rounded-t-lg bg-amber-100/80 px-4 py-1.5 text-xs font-bold text-amber-800 font-handwriting tracking-wide">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-3.5 w-3.5"
                        aria-hidden="true"
                    >
                        <path d="M9.828.722a.5.5 0 01.354 0l4.243 4.243a.5.5 0 010 .707L13.011 7.09l.83 3.318a1 1 0 01-.26.97l-5 5a1 1 0 01-1.638-.317l-1.554-4.663L2.48 14.85a.5.5 0 01-.707-.707l3.45-3.45L.56 9.139a1 1 0 01-.317-1.638l5-5a1 1 0 01.97-.26l3.317.83L10.89.96a.5.5 0 01-.06-.237V.722z" />
                    </svg>
                    Pinned Post
                </div>
            )}

            {/* Photo - full width at top of card */}
            {post.image && (
                <Link href={route('posts.show', post.id)} className="relative z-[5] block overflow-hidden">
                    <img
                        src={`/storage/${post.image}`}
                        alt={post.title}
                        className="w-full h-44 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </Link>
            )}

            <div className="relative z-[5] flex flex-1 flex-col p-4 sm:p-5">
                {/* Top meta row */}
                <div className="mb-2 flex flex-wrap items-center gap-2">
                    <CategoryBadge category={post.category} />
                    {post.category === 'issue' && post.status && (
                        <StatusBadge status={post.status} />
                    )}
                    {post.barangay?.name && (
                        <span className="inline-flex items-center gap-1 text-xs text-cork-700">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="h-3.5 w-3.5 text-cork-500"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.757.433 5.737 5.737 0 00.281.14l.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            {post.barangay.name}
                        </span>
                    )}
                    {hasCoordinates && (
                        <span className="inline-flex items-center gap-1 text-xs text-pin-green font-medium">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
                                <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.757.433 5.737 5.737 0 00.281.14l.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" />
                            </svg>
                            Mapped
                        </span>
                    )}
                </div>

                {/* Title */}
                <Link
                    href={route('posts.show', post.id)}
                    className="mb-1.5 line-clamp-2 text-base font-bold text-cork-900 hover:text-green-700 focus:outline-none focus:underline sm:text-lg font-handwriting tracking-wide"
                >
                    {post.title}
                </Link>

                {/* Body excerpt */}
                {post.body && (
                    <p className="line-clamp-3 text-sm leading-relaxed text-cork-700 flex-1">
                        {truncateBody(post.body)}
                    </p>
                )}

                {/* Location text */}
                {post.location && (
                    <p className="mt-2 flex items-center gap-1 text-xs text-cork-500 truncate">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5 shrink-0">
                            <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.757.433 5.737 5.737 0 00.281.14l.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" />
                        </svg>
                        {post.location}
                    </p>
                )}

                {/* Footer meta row */}
                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-cork-200/60 pt-3">
                    {/* Author + time */}
                    <div className="flex items-center gap-1.5 text-xs text-cork-600">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="h-4 w-4 text-cork-400"
                            aria-hidden="true"
                        >
                            <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
                        </svg>
                        <span className="font-medium text-cork-800">
                            {post.user?.name ?? 'Anonymous'}
                        </span>
                        <span aria-hidden="true">&middot;</span>
                        <time dateTime={post.created_at}>
                            {relativeTime(post.created_at)}
                        </time>
                    </div>

                    {/* Vote + comment counts */}
                    <div className="flex items-center gap-3 text-xs text-cork-600">
                        <span className="flex items-center gap-1">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="h-4 w-4 text-green-600"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <span>{post.votes_count ?? 0}</span>
                        </span>

                        <span className="flex items-center gap-1">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="h-4 w-4 text-blue-500"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 2c-2.236 0-4.43.18-6.57.524C1.993 2.755 1 4.014 1 5.426v5.148c0 1.413.993 2.67 2.43 2.902.848.137 1.705.248 2.57.331v3.443a.75.75 0 001.28.53l3.658-3.658A18.653 18.653 0 0110 14c2.236 0 4.43-.18 6.57-.524C18.007 13.245 19 11.986 19 10.574V5.426c0-1.413-.993-2.67-2.43-2.902A41.102 41.102 0 0010 2z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <span>{post.comments_count ?? 0}</span>
                        </span>
                    </div>
                </div>
            </div>
        </article>
    );
}
