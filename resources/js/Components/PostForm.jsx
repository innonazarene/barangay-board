import { useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import MapPicker from '@/Components/MapPicker';

export default function PostForm({ post, barangays, categories }) {
    const isEditing = Boolean(post);

    const { data, setData, post: submitPost, put, processing, errors, reset } =
        useForm({
            title: post?.title ?? '',
            body: post?.body ?? '',
            category: post?.category ?? '',
            location: post?.location ?? '',
            latitude: post?.latitude ?? '',
            longitude: post?.longitude ?? '',
            image: null,
        });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isEditing) {
            put(route('posts.update', post.id), {
                onSuccess: () => reset('image'),
                forceFormData: true,
            });
        } else {
            submitPost(route('posts.store'), {
                onSuccess: () => reset(),
                forceFormData: true,
            });
        }
    };

    const handleLocationChange = (lat, lng) => {
        setData((prev) => ({
            ...prev,
            latitude: lat !== null ? lat : '',
            longitude: lng !== null ? lng : '',
        }));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
            {/* Title */}
            <div>
                <InputLabel htmlFor="title" value="Title" />
                <TextInput
                    id="title"
                    name="title"
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    className="mt-1 block w-full"
                    placeholder="Enter a clear, descriptive title"
                    required
                />
                <InputError message={errors.title} className="mt-2" />
            </div>

            {/* Category */}
            <div>
                <InputLabel htmlFor="category" value="Category" />
                <select
                    id="category"
                    name="category"
                    value={data.category}
                    onChange={(e) => setData('category', e.target.value)}
                    className="mt-1 block w-full rounded-lg border-gray-300 py-2 pl-3 pr-8 text-sm text-gray-700 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                    required
                >
                    <option value="" disabled>
                        Select a category
                    </option>
                    {Array.isArray(categories) &&
                        categories.map((cat) => (
                            <option key={cat.value} value={cat.value}>
                                {cat.label}
                            </option>
                        ))}
                </select>
                <InputError message={errors.category} className="mt-2" />
            </div>

            {/* Body */}
            <div>
                <InputLabel htmlFor="body" value="Description" />
                <textarea
                    id="body"
                    name="body"
                    value={data.body}
                    onChange={(e) => setData('body', e.target.value)}
                    rows={6}
                    placeholder="Describe the announcement, issue, event, or request in detail..."
                    className="mt-1 block w-full rounded-lg border-gray-300 text-sm text-gray-700 shadow-sm placeholder:text-gray-400 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                    required
                />
                <InputError message={errors.body} className="mt-2" />
            </div>

            {/* Location text */}
            <div>
                <InputLabel htmlFor="location" value="Location description (optional)" />
                <TextInput
                    id="location"
                    name="location"
                    value={data.location}
                    onChange={(e) => setData('location', e.target.value)}
                    className="mt-1 block w-full"
                    placeholder="e.g. Brgy. Agusan Pequeño, near the covered court"
                />
                <InputError message={errors.location} className="mt-2" />
            </div>

            {/* Map picker for coordinates */}
            <div>
                <InputLabel value="Pin on Map (optional)" />
                <div className="mt-1">
                    <MapPicker
                        latitude={data.latitude}
                        longitude={data.longitude}
                        onLocationChange={handleLocationChange}
                    />
                </div>
                <InputError message={errors.latitude} className="mt-2" />
                <InputError message={errors.longitude} className="mt-2" />
            </div>

            {/* Image upload */}
            <div>
                <InputLabel htmlFor="image" value="Photo (optional)" />
                <div className="mt-1">
                    <input
                        id="image"
                        name="image"
                        type="file"
                        accept="image/jpeg,image/png,image/webp,image/gif"
                        onChange={(e) =>
                            setData('image', e.target.files[0] ?? null)
                        }
                        className="block w-full text-sm text-gray-700 file:mr-4 file:rounded-lg file:border-0 file:bg-green-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-green-700 hover:file:bg-green-100 focus:outline-none"
                    />
                </div>

                {/* New image preview */}
                {data.image && (
                    <div className="mt-3">
                        <p className="mb-1.5 text-xs text-gray-500">New image preview:</p>
                        <img
                            src={URL.createObjectURL(data.image)}
                            alt="Preview"
                            className="h-32 w-auto rounded-lg object-cover ring-1 ring-gray-200"
                        />
                    </div>
                )}

                {/* Current image preview when editing */}
                {isEditing && post.image && !data.image && (
                    <div className="mt-3">
                        <p className="mb-1.5 text-xs text-gray-500">
                            Current image (upload a new one to replace it):
                        </p>
                        <img
                            src={`/storage/${post.image}`}
                            alt="Current post image"
                            className="h-32 w-auto rounded-lg object-cover ring-1 ring-gray-200"
                        />
                    </div>
                )}

                <InputError message={errors.image} className="mt-2" />
            </div>

            {/* Submit */}
            <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-4">
                <a
                    href={route('home')}
                    className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1"
                >
                    Cancel
                </a>
                <PrimaryButton
                    disabled={processing}
                    className="bg-green-600 hover:bg-green-700 focus:ring-green-500"
                >
                    {processing
                        ? isEditing
                            ? 'Saving…'
                            : 'Publishing…'
                        : isEditing
                        ? 'Save Changes'
                        : 'Publish Post'}
                </PrimaryButton>
            </div>
        </form>
    );
}
