import { useForm, router } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import { relativeTime } from '@/utils/relativeTime';

function CommentItem({ comment, auth }) {
    const isOwner = auth?.user && auth.user.id === comment.user?.id;
    const isAdmin = auth?.user?.is_admin;

    const handleDelete = () => {
        if (!confirm('Delete this comment?')) return;
        router.delete(route('comments.destroy', comment.id), {
            preserveScroll: true,
        });
    };

    return (
        <div className="flex gap-3">
            {/* Avatar placeholder */}
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-blue-500 text-xs font-bold text-white">
                {comment.user?.name?.charAt(0)?.toUpperCase() ?? '?'}
            </div>

            <div className="flex-1 rounded-xl bg-gray-50 px-4 py-3 ring-1 ring-gray-200">
                {/* Header */}
                <div className="mb-1 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-800">
                            {comment.user?.name ?? 'Anonymous'}
                        </span>
                        <time
                            dateTime={comment.created_at}
                            className="text-xs text-gray-400"
                        >
                            {relativeTime(comment.created_at)}
                        </time>
                    </div>

                    {(isOwner || isAdmin) && (
                        <button
                            onClick={handleDelete}
                            className="rounded p-1 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-1"
                            aria-label="Delete comment"
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
                                    d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    )}
                </div>

                {/* Body */}
                <p className="whitespace-pre-wrap text-sm text-gray-700">
                    {comment.body}
                </p>
            </div>
        </div>
    );
}

export default function CommentSection({ comments, postId, auth }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        body: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('posts.comments.store', postId), {
            preserveScroll: true,
            onSuccess: () => reset('body'),
        });
    };

    const sortedComments = Array.isArray(comments) ? [...comments] : [];

    return (
        <section aria-labelledby="comments-heading" className="mt-8">
            <h2
                id="comments-heading"
                className="mb-4 text-lg font-semibold text-gray-900"
            >
                Comments
                {sortedComments.length > 0 && (
                    <span className="ml-2 rounded-full bg-gray-100 px-2.5 py-0.5 text-sm text-gray-600">
                        {sortedComments.length}
                    </span>
                )}
            </h2>

            {/* Existing comments */}
            <div className="space-y-4">
                {sortedComments.length === 0 && (
                    <p className="py-4 text-center text-sm text-gray-500">
                        No comments yet. Be the first to share your thoughts!
                    </p>
                )}
                {sortedComments.map((comment) => (
                    <CommentItem
                        key={comment.id}
                        comment={comment}
                        auth={auth}
                    />
                ))}
            </div>

            {/* New comment form */}
            {auth?.user ? (
                <form
                    onSubmit={handleSubmit}
                    className="mt-6 rounded-xl bg-white p-4 ring-1 ring-gray-200 sm:p-5"
                >
                    <div className="flex gap-3">
                        {/* Avatar */}
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-blue-500 text-xs font-bold text-white">
                            {auth.user.name?.charAt(0)?.toUpperCase() ?? '?'}
                        </div>

                        <div className="flex-1">
                            <label htmlFor="comment-body" className="sr-only">
                                Write a comment
                            </label>
                            <textarea
                                id="comment-body"
                                name="body"
                                value={data.body}
                                onChange={(e) => setData('body', e.target.value)}
                                rows={3}
                                placeholder="Share your thoughts or report an update..."
                                className="block w-full rounded-lg border-gray-300 text-sm text-gray-700 shadow-sm placeholder:text-gray-400 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                                required
                            />
                            <InputError
                                message={errors.body}
                                className="mt-2"
                            />

                            <div className="mt-3 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={processing || !data.body.trim()}
                                    className="inline-flex items-center gap-1.5 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {processing ? 'Posting…' : 'Post Comment'}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            ) : (
                <div className="mt-6 rounded-xl border border-dashed border-gray-300 bg-gray-50 px-4 py-6 text-center">
                    <p className="text-sm text-gray-600">
                        <a
                            href={route('login')}
                            className="font-medium text-green-600 hover:underline"
                        >
                            Log in
                        </a>{' '}
                        or{' '}
                        <a
                            href={route('register')}
                            className="font-medium text-green-600 hover:underline"
                        >
                            register
                        </a>{' '}
                        to leave a comment.
                    </p>
                </div>
            )}
        </section>
    );
}
