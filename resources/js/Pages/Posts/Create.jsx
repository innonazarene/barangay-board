import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PostForm from '@/Components/PostForm';

export default function Create({ barangays, categories }) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-100">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="h-5 w-5 text-green-700"
                            aria-hidden="true"
                        >
                            <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">
                            Create New Post
                        </h2>
                        <p className="text-sm text-gray-500">
                            Share an announcement, issue, event, or request with the community.
                        </p>
                    </div>
                </div>
            }
        >
            <Head title="Create Post" />

            <div className="py-8">
                <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
                    <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-200 sm:p-7">
                        <PostForm
                            barangays={barangays}
                            categories={categories}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
