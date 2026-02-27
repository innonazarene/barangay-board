import { router } from '@inertiajs/react';

export default function VoteButton({ post }) {
    const handleVote = () => {
        router.post(
            route('posts.vote', post.id),
            {},
            { preserveScroll: true },
        );
    };

    return (
        <button
            onClick={handleVote}
            className={`group inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1 ${
                post.has_voted
                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            aria-label={post.has_voted ? 'Remove upvote' : 'Upvote this post'}
            aria-pressed={post.has_voted}
        >
            {/* Upvote arrow icon */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className={`h-4 w-4 transition-transform duration-150 group-hover:-translate-y-0.5 ${
                    post.has_voted ? 'text-green-600' : 'text-gray-500'
                }`}
                aria-hidden="true"
            >
                <path
                    fillRule="evenodd"
                    d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z"
                    clipRule="evenodd"
                />
            </svg>

            <span>{post.votes_count ?? 0}</span>
        </button>
    );
}
