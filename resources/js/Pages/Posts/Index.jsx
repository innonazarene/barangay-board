import { Head, Link, router, usePage } from '@inertiajs/react';
import { useCallback, useState } from 'react';
import PostCard from '@/Components/PostCard';
import BarangayFilter from '@/Components/BarangayFilter';
import FilterBar from '@/Components/FilterBar';
import BarangayMap from '@/Components/BarangayMap';

const CATEGORIES = [
    { value: 'announcement', label: 'Announcements' },
    { value: 'issue', label: 'Issues' },
    { value: 'event', label: 'Events' },
    { value: 'lost_and_found', label: 'Lost & Found' },
    { value: 'help_request', label: 'Help Requests' },
];

export default function Index({ posts, barangays, filters }) {
    const { auth } = usePage().props;
    const [mapOpen, setMapOpen] = useState(false);

    const [localFilters, setLocalFilters] = useState({
        barangay: filters?.barangay ?? null,
        category: filters?.category ?? null,
        search: filters?.search ?? '',
        sort: filters?.sort ?? 'latest',
    });

    const [searchTimer, setSearchTimer] = useState(null);

    const applyFilters = useCallback((updatedFilters) => {
        const params = {};
        if (updatedFilters.barangay) params.barangay = updatedFilters.barangay;
        if (updatedFilters.category) params.category = updatedFilters.category;
        if (updatedFilters.search) params.search = updatedFilters.search;
        if (updatedFilters.sort && updatedFilters.sort !== 'latest') {
            params.sort = updatedFilters.sort;
        }
        router.get(route('home'), params, { preserveState: true, replace: true });
    }, []);

    const handleBarangayChange = (barangayId) => {
        const updated = { ...localFilters, barangay: barangayId };
        setLocalFilters(updated);
        applyFilters(updated);
    };

    const handleCategoryChange = (category) => {
        const updated = { ...localFilters, category: category || null };
        setLocalFilters(updated);
        applyFilters(updated);
    };

    const handleSearchChange = (search) => {
        setLocalFilters((prev) => ({ ...prev, search }));
        if (searchTimer) clearTimeout(searchTimer);
        const timer = setTimeout(() => {
            const updated = { ...localFilters, search };
            applyFilters(updated);
        }, 400);
        setSearchTimer(timer);
    };

    const handleSortChange = (sort) => {
        const updated = { ...localFilters, sort };
        setLocalFilters(updated);
        applyFilters(updated);
    };

    const pinnedPosts = posts?.data?.filter((p) => p.is_pinned) ?? [];
    const regularPosts = posts?.data?.filter((p) => !p.is_pinned) ?? [];
    const allPosts = posts?.data ?? [];

    return (
        <>
            <Head title="Barangay Bulletin Board" />

            <div className="min-h-screen corkboard-bg">
                {/* Wood-textured header */}
                <header className="wood-nav px-4 py-8 text-white shadow-lg sm:px-6 sm:py-12 lg:px-8 border-b-4 border-cork-900/30">
                    <div className="mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl font-handwriting drop-shadow-md">
                                    Barangay Bulletin Board
                                </h1>
                                <p className="mt-1 text-sm text-amber-200 sm:text-base">
                                    Butuan City Community Hub — stay informed,
                                    stay connected.
                                </p>
                            </div>

                            {auth?.user ? (
                                <Link
                                    href={route('posts.create')}
                                    className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-paper-100 px-5 py-2.5 text-sm font-bold text-cork-800 shadow-paper transition hover:bg-white hover:shadow-paper-hover focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-offset-2 focus:ring-offset-cork-800"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className="h-4 w-4"
                                        aria-hidden="true"
                                    >
                                        <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                                    </svg>
                                    Create Post
                                </Link>
                            ) : (
                                <div className="flex gap-2">
                                    <Link
                                        href={route('login')}
                                        className="rounded-lg border border-amber-400/40 px-4 py-2 text-sm font-medium text-amber-100 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-amber-300"
                                    >
                                        Log In
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="rounded-lg bg-paper-100 px-4 py-2 text-sm font-bold text-cork-800 hover:bg-white focus:outline-none focus:ring-2 focus:ring-amber-300"
                                    >
                                        Register
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                <main className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                    {/* Collapsible Map Section */}
                    <div className="mb-6">
                        <button
                            onClick={() => setMapOpen(!mapOpen)}
                            className="flex w-full items-center justify-between rounded-t-lg bg-cork-800 px-4 py-3 text-sm font-bold text-paper-100 transition hover:bg-cork-900 font-handwriting tracking-wide"
                        >
                            <span className="flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-pin-green">
                                    <path fillRule="evenodd" d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.757.433 5.737 5.737 0 00.281.14l.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z" clipRule="evenodd" />
                                </svg>
                                Butuan City Map
                            </span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className={`h-5 w-5 transition-transform duration-200 ${mapOpen ? 'rotate-180' : ''}`}
                            >
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                        {mapOpen && (
                            <div className="overflow-hidden rounded-b-lg border-2 border-t-0 border-cork-700 shadow-paper">
                                <BarangayMap posts={allPosts} height="320px" />
                            </div>
                        )}
                    </div>

                    {/* Filters - styled as a pinned note */}
                    <div className="mb-6 space-y-4 paper-note rounded-lg p-4 shadow-paper sm:p-5 tape-top">
                        <BarangayFilter
                            barangays={barangays}
                            selectedBarangay={localFilters.barangay}
                            onChange={handleBarangayChange}
                        />
                        <hr className="border-cork-200/40" />
                        <FilterBar
                            categories={CATEGORIES}
                            selectedCategory={localFilters.category}
                            onCategoryChange={handleCategoryChange}
                            search={localFilters.search}
                            onSearchChange={handleSearchChange}
                            sort={localFilters.sort}
                            onSortChange={handleSortChange}
                        />
                    </div>

                    {/* Pinned posts */}
                    {pinnedPosts.length > 0 && (
                        <section className="mb-6" aria-label="Pinned posts">
                            <h2 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-amber-900 font-handwriting text-base">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    className="h-4 w-4 text-pin-red"
                                    aria-hidden="true"
                                >
                                    <path d="M9.828.722a.5.5 0 01.354 0l4.243 4.243a.5.5 0 010 .707L13.011 7.09l.83 3.318a1 1 0 01-.26.97l-5 5a1 1 0 01-1.638-.317l-1.554-4.663L2.48 14.85a.5.5 0 01-.707-.707l3.45-3.45L.56 9.139a1 1 0 01-.317-1.638l5-5a1 1 0 01.97-.26l3.317.83L10.89.96a.5.5 0 01-.06-.237V.722z" />
                                </svg>
                                Pinned
                            </h2>
                            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                                {pinnedPosts.map((post, idx) => (
                                    <PostCard key={post.id} post={post} index={idx} />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Regular posts */}
                    <section aria-label="Community posts">
                        {regularPosts.length === 0 && pinnedPosts.length === 0 ? (
                            <div className="flex flex-col items-center justify-center paper-note rounded-lg py-16 text-center shadow-paper push-pin pt-8">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="mb-4 h-12 w-12 text-cork-300"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                                    />
                                </svg>
                                <h3 className="text-base font-bold text-cork-800 font-handwriting text-lg">
                                    No posts found
                                </h3>
                                <p className="mt-1 text-sm text-cork-600">
                                    Try adjusting your filters or be the first
                                    to post!
                                </p>
                                {auth?.user && (
                                    <Link
                                        href={route('posts.create')}
                                        className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    >
                                        Create the first post
                                    </Link>
                                )}
                            </div>
                        ) : (
                            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                                {regularPosts.map((post, idx) => (
                                    <PostCard key={post.id} post={post} index={idx + pinnedPosts.length} />
                                ))}
                            </div>
                        )}
                    </section>

                    {/* Pagination */}
                    {posts?.links && posts.links.length > 3 && (
                        <nav
                            className="mt-8 flex flex-wrap justify-center gap-1"
                            aria-label="Pagination"
                        >
                            {posts.links.map((link, idx) => {
                                if (!link.url && !link.active) {
                                    return (
                                        <span
                                            key={idx}
                                            className="inline-flex min-w-[2.25rem] items-center justify-center rounded-lg px-3 py-2 text-sm text-cork-500"
                                            dangerouslySetInnerHTML={{
                                                __html: link.label,
                                            }}
                                        />
                                    );
                                }

                                return link.active ? (
                                    <span
                                        key={idx}
                                        className="inline-flex min-w-[2.25rem] items-center justify-center rounded-lg bg-cork-800 px-3 py-2 text-sm font-semibold text-paper-100"
                                        aria-current="page"
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    />
                                ) : (
                                    <Link
                                        key={idx}
                                        href={link.url}
                                        className="inline-flex min-w-[2.25rem] items-center justify-center rounded-lg paper-note px-3 py-2 text-sm font-medium text-cork-800 ring-1 ring-cork-300 hover:bg-paper-100 focus:outline-none focus:ring-2 focus:ring-cork-500"
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                        preserveState
                                    />
                                );
                            })}
                        </nav>
                    )}
                </main>
            </div>
        </>
    );
}
