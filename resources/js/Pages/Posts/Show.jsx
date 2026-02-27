import { Head, Link, router, usePage } from '@inertiajs/react';
import CategoryBadge from '@/Components/CategoryBadge';
import StatusBadge from '@/Components/StatusBadge';
import VoteButton from '@/Components/VoteButton';
import CommentSection from '@/Components/CommentSection';
import BarangayMap from '@/Components/BarangayMap';
import { relativeTime } from '@/utils/relativeTime';

const STATUS_OPTIONS = [
    { value: 'open', label: 'Open' },
    { value: 'in_progress', label: 'In Progress' },
    { value: 'resolved', label: 'Resolved' },
];

export default function Show({ post, auth }) {
    const isAdmin = auth?.user?.is_admin;
    const isOwner = auth?.user && auth.user.id === post.user?.id;

    const hasLocation = post.latitude && post.longitude;

    const handlePinToggle = () => {
        router.post(
            route('posts.pin', post.id),
            {},
            { preserveScroll: true },
        );
    };

    const handleStatusChange = (e) => {
        router.patch(
            route('posts.update-status', post.id),
            { status: e.target.value },
            { preserveScroll: true },
        );
    };

    const handleDelete = () => {
        if (!confirm('Are you sure you want to delete this post? This action cannot be undone.')) return;
        router.delete(route('posts.destroy', post.id));
    };

    return (
        <>
            <Head title={post.title} />

            <div className="min-h-screen corkboard-bg">
                {/* Wood-textured top nav */}
                <nav className="wood-nav px-4 py-3 shadow-lg sm:px-6 lg:px-8 border-b-4 border-cork-900/30">
                    <div className="mx-auto flex items-center justify-between">
                        <Link
                            href={route('home')}
                            className="flex items-center gap-2 text-sm font-medium text-amber-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-1 focus:ring-offset-cork-800"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="h-4 w-4"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Back to Board
                        </Link>

                        <span className="text-sm font-bold text-paper-100 font-handwriting tracking-wide">
                            Barangay Bulletin Board
                        </span>
                    </div>
                </nav>

                <main className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                    <article className="overflow-hidden rounded-lg paper-note shadow-paper push-pin pt-4">
                        {/* Post image */}
                        {post.image && (
                            <div className="relative z-[5] aspect-video w-full overflow-hidden bg-cork-100">
                                <img
                                    src={`/storage/${post.image}`}
                                    alt={post.title}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        )}

                        <div className="relative z-[5] p-5 sm:p-7">
                            {/* Pinned indicator */}
                            {post.is_pinned && (
                                <div className="mb-3 flex items-center gap-1.5 text-xs font-bold text-amber-800 font-handwriting tracking-wide">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className="h-3.5 w-3.5 text-pin-red"
                                        aria-hidden="true"
                                    >
                                        <path d="M9.828.722a.5.5 0 01.354 0l4.243 4.243a.5.5 0 010 .707L13.011 7.09l.83 3.318a1 1 0 01-.26.97l-5 5a1 1 0 01-1.638-.317l-1.554-4.663L2.48 14.85a.5.5 0 01-.707-.707l3.45-3.45L.56 9.139a1 1 0 01-.317-1.638l5-5a1 1 0 01.97-.26l3.317.83L10.89.96a.5.5 0 01-.06-.237V.722z" />
                                    </svg>
                                    Pinned by admin
                                </div>
                            )}

                            {/* Badges */}
                            <div className="mb-3 flex flex-wrap items-center gap-2">
                                <CategoryBadge category={post.category} />
                                {post.category === 'issue' && post.status && (
                                    <StatusBadge status={post.status} />
                                )}
                                {post.barangay?.name && (
                                    <span className="inline-flex items-center gap-1 text-xs text-cork-600">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            className="h-3.5 w-3.5 text-cork-400"
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
                            </div>

                            {/* Title */}
                            <h1 className="text-xl font-bold text-cork-900 sm:text-2xl lg:text-3xl font-handwriting tracking-wide">
                                {post.title}
                            </h1>

                            {/* Author + time */}
                            <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-cork-600">
                                <span className="flex items-center gap-1.5">
                                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-blue-600 text-xs font-bold text-white">
                                        {post.user?.name?.charAt(0)?.toUpperCase() ?? '?'}
                                    </div>
                                    <span className="font-medium text-cork-800">
                                        {post.user?.name ?? 'Anonymous'}
                                    </span>
                                </span>
                                <span aria-hidden="true">&middot;</span>
                                <time dateTime={post.created_at}>
                                    {relativeTime(post.created_at)}
                                </time>
                                {post.location && (
                                    <>
                                        <span aria-hidden="true">&middot;</span>
                                        <span className="flex items-center gap-1">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                className="h-3.5 w-3.5"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.757.433 5.737 5.737 0 00.281.14l.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            {post.location}
                                        </span>
                                    </>
                                )}
                            </div>

                            {/* Divider */}
                            <hr className="my-5 border-cork-200/50" />

                            {/* Body */}
                            <div className="prose prose-sm max-w-none text-cork-800 sm:prose-base">
                                <p className="whitespace-pre-wrap leading-relaxed">
                                    {post.body}
                                </p>
                            </div>

                            {/* Map for posts with location */}
                            {hasLocation && (
                                <div className="mt-6 overflow-hidden rounded-lg border-2 border-cork-300 shadow-sm">
                                    <BarangayMap
                                        posts={[post]}
                                        height="280px"
                                        singlePost
                                    />
                                </div>
                            )}

                            {/* Vote + action row */}
                            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-lg bg-cork-50/60 px-4 py-3 ring-1 ring-cork-200/50">
                                <div className="flex items-center gap-3">
                                    {auth?.user ? (
                                        <VoteButton post={post} />
                                    ) : (
                                        <span className="flex items-center gap-1.5 rounded-full bg-cork-100 px-3 py-1.5 text-sm text-cork-700">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                className="h-4 w-4 text-cork-400"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            {post.votes_count ?? 0} upvotes
                                        </span>
                                    )}

                                    <span className="flex items-center gap-1.5 text-sm text-cork-600">
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
                                        {post.comments?.length ?? 0} comments
                                    </span>
                                </div>

                                {/* Owner / admin actions */}
                                {(isOwner || isAdmin) && (
                                    <div className="flex flex-wrap items-center gap-2">
                                        {isOwner && (
                                            <Link
                                                href={route('posts.edit', post.id)}
                                                className="rounded-lg bg-paper-100 px-3 py-1.5 text-xs font-medium text-cork-700 ring-1 ring-cork-300 hover:bg-paper-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                                            >
                                                Edit Post
                                            </Link>
                                        )}

                                        {isAdmin && (
                                            <button
                                                onClick={handlePinToggle}
                                                className={`rounded-lg px-3 py-1.5 text-xs font-medium ring-1 focus:outline-none focus:ring-2 focus:ring-amber-400 ${
                                                    post.is_pinned
                                                        ? 'bg-amber-100 text-amber-700 ring-amber-200 hover:bg-amber-200'
                                                        : 'bg-paper-100 text-cork-700 ring-cork-300 hover:bg-paper-200'
                                                }`}
                                            >
                                                {post.is_pinned ? 'Unpin Post' : 'Pin Post'}
                                            </button>
                                        )}

                                        {isAdmin && post.category === 'issue' && (
                                            <div className="flex items-center gap-1.5">
                                                <label
                                                    htmlFor="status-select"
                                                    className="text-xs text-cork-600"
                                                >
                                                    Status:
                                                </label>
                                                <select
                                                    id="status-select"
                                                    value={post.status ?? 'open'}
                                                    onChange={handleStatusChange}
                                                    className="rounded-lg border-cork-300 py-1.5 pl-2 pr-7 text-xs text-cork-800 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                                                >
                                                    {STATUS_OPTIONS.map((s) => (
                                                        <option key={s.value} value={s.value}>
                                                            {s.label}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        )}

                                        {(isOwner || isAdmin) && (
                                            <button
                                                onClick={handleDelete}
                                                className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 ring-1 ring-red-200 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-400"
                                            >
                                                Delete
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </article>

                    {/* Comment section */}
                    <CommentSection
                        comments={post.comments ?? []}
                        postId={post.id}
                        auth={auth}
                    />
                </main>
            </div>
        </>
    );
}
