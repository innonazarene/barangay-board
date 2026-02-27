<?php

namespace App\Http\Controllers;

use App\Enums\PostCategory;
use App\Enums\PostStatus;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Models\Barangay;
use App\Models\Post;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
    /**
     * Display a paginated feed with optional filters.
     * Pinned posts always appear first, then sorted by latest or vote count.
     */
    public function index(Request $request): Response
    {
        $query = Post::query()
            ->with(['user', 'barangay'])
            ->withCount(['votes', 'comments']);

        // Filter by barangay
        if ($request->filled('barangay_id')) {
            $query->where('barangay_id', $request->integer('barangay_id'));
        }

        // Filter by category
        if ($request->filled('category')) {
            $query->where('category', $request->string('category')->toString());
        }

        // Full-text search on title and body
        if ($request->filled('search')) {
            $search = $request->string('search')->toString();
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('body', 'like', "%{$search}%");
            });
        }

        // Sort: pinned posts always surface first, then by chosen sort order
        $sort = $request->input('sort', 'latest');

        if ($sort === 'votes') {
            $query->orderByDesc('is_pinned')
                  ->orderByDesc('votes_count');
        } else {
            $query->orderByDesc('is_pinned')
                  ->orderByDesc('created_at');
        }

        $posts = $query->paginate(15)->withQueryString();

        // Attach the authenticated user's vote status to each post
        $authUser = $request->user();
        if ($authUser) {
            $posts->getCollection()->transform(function (Post $post) use ($authUser) {
                $post->user_has_voted = $post->hasVoteFrom($authUser);
                return $post;
            });
        } else {
            $posts->getCollection()->transform(function (Post $post) {
                $post->user_has_voted = false;
                return $post;
            });
        }

        return Inertia::render('Posts/Index', [
            'posts'      => $posts,
            'filters'    => $request->only('barangay_id', 'category', 'search', 'sort'),
            'barangays'  => Barangay::orderBy('name')->get(),
            'categories' => PostCategory::cases(),
        ]);
    }

    /**
     * Display a single post with its comments and vote status.
     */
    public function show(Post $post): Response
    {
        $post->load([
            'user',
            'barangay',
            'comments.user',
        ])->loadCount(['votes', 'comments']);

        $authUser = request()->user();

        return Inertia::render('Posts/Show', [
            'post'          => $post,
            'userHasVoted'  => $authUser ? $post->hasVoteFrom($authUser) : false,
        ]);
    }

    /**
     * Show the form for creating a new post.
     */
    public function create(): Response
    {
        return Inertia::render('Posts/Create', [
            'barangays'  => Barangay::orderBy('name')->get(),
            'categories' => PostCategory::cases(),
        ]);
    }

    /**
     * Store a newly created post.
     */
    public function store(StorePostRequest $request): RedirectResponse
    {
        $data = $request->validated();

        // Auto-assign the authenticated user's barangay
        $data['user_id']     = $request->user()->id;
        $data['barangay_id'] = $request->user()->barangay_id;
        $data['status']      = PostStatus::Open;

        // Handle image upload
        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('posts', 'public');
        }

        $post = Post::create($data);

        return redirect()->route('posts.show', $post)
            ->with('success', 'Post created successfully.');
    }

    /**
     * Show the form for editing an existing post.
     */
    public function edit(Post $post): Response
    {
        $this->authorize('update', $post);

        return Inertia::render('Posts/Edit', [
            'post'       => $post,
            'barangays'  => Barangay::orderBy('name')->get(),
            'categories' => PostCategory::cases(),
        ]);
    }

    /**
     * Update an existing post.
     */
    public function update(UpdatePostRequest $request, Post $post): RedirectResponse
    {
        $this->authorize('update', $post);

        $data = $request->validated();

        // Handle image replacement
        if ($request->hasFile('image')) {
            // Delete the old image if one exists
            if ($post->image) {
                Storage::disk('public')->delete($post->image);
            }
            $data['image'] = $request->file('image')->store('posts', 'public');
        } else {
            // Preserve the existing image path — do not overwrite with null
            unset($data['image']);
        }

        $post->update($data);

        return redirect()->route('posts.show', $post)
            ->with('success', 'Post updated successfully.');
    }

    /**
     * Delete a post and its associated image.
     */
    public function destroy(Post $post): RedirectResponse
    {
        $this->authorize('delete', $post);

        if ($post->image) {
            Storage::disk('public')->delete($post->image);
        }

        $post->delete();

        return redirect()->route('home')
            ->with('success', 'Post deleted successfully.');
    }

    /**
     * Toggle the pinned state of a post (admin only).
     */
    public function togglePin(Post $post): RedirectResponse
    {
        $this->authorize('pin', $post);

        $post->update(['is_pinned' => ! $post->is_pinned]);

        return redirect()->back()
            ->with('success', $post->is_pinned ? 'Post pinned.' : 'Post unpinned.');
    }

    /**
     * Update the status of a post (admin only).
     */
    public function updateStatus(Request $request, Post $post): RedirectResponse
    {
        $this->authorize('updateStatus', $post);

        $validated = $request->validate([
            'status' => ['required', new \Illuminate\Validation\Rules\Enum(PostStatus::class)],
        ]);

        $post->update(['status' => $validated['status']]);

        return redirect()->back()
            ->with('success', 'Post status updated.');
    }
}
