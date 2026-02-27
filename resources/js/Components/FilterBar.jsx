export default function FilterBar({
    categories,
    selectedCategory,
    onCategoryChange,
    search,
    onSearchChange,
    sort,
    onSortChange,
}) {
    const allCategories = [{ value: '', label: 'All' }, ...categories];

    return (
        <div className="flex flex-col gap-3 sm:gap-4">
            {/* Category filter pills */}
            <div className="flex flex-wrap gap-2">
                {allCategories.map((cat) => {
                    const isActive =
                        cat.value === (selectedCategory ?? '');
                    return (
                        <button
                            key={cat.value}
                            onClick={() => onCategoryChange(cat.value || null)}
                            className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1 sm:px-4 sm:text-sm ${
                                isActive
                                    ? 'bg-green-600 text-white shadow-sm'
                                    : 'bg-white text-gray-600 ring-1 ring-gray-300 hover:bg-gray-50'
                            }`}
                            aria-pressed={isActive}
                        >
                            {cat.label}
                        </button>
                    );
                })}
            </div>

            {/* Search + sort row */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                {/* Search input */}
                <div className="relative flex-1">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="h-4 w-4 text-gray-400"
                            aria-hidden="true"
                        >
                            <path
                                fillRule="evenodd"
                                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                    <input
                        type="search"
                        value={search ?? ''}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Search posts..."
                        className="block w-full rounded-lg border-gray-300 py-2 pl-10 pr-4 text-sm text-gray-700 shadow-sm placeholder:text-gray-400 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                    />
                </div>

                {/* Sort toggle */}
                <div
                    className="flex shrink-0 overflow-hidden rounded-lg ring-1 ring-gray-300"
                    role="group"
                    aria-label="Sort order"
                >
                    <button
                        onClick={() => onSortChange('latest')}
                        className={`px-3 py-2 text-xs font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500 sm:px-4 sm:text-sm ${
                            sort === 'latest' || !sort
                                ? 'bg-green-600 text-white'
                                : 'bg-white text-gray-600 hover:bg-gray-50'
                        }`}
                        aria-pressed={sort === 'latest' || !sort}
                    >
                        Latest
                    </button>
                    <button
                        onClick={() => onSortChange('votes')}
                        className={`border-l border-gray-300 px-3 py-2 text-xs font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500 sm:px-4 sm:text-sm ${
                            sort === 'votes'
                                ? 'bg-green-600 text-white'
                                : 'bg-white text-gray-600 hover:bg-gray-50'
                        }`}
                        aria-pressed={sort === 'votes'}
                    >
                        Most Upvoted
                    </button>
                </div>
            </div>
        </div>
    );
}
