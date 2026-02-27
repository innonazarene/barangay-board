<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\VoteController;
use Illuminate\Support\Facades\Route;

// ─── Public routes ────────────────────────────────────────────────────────────

Route::get('/', [PostController::class, 'index'])->name('home');

// The show route is declared here (public) so guests can read posts.
// Note: /posts/create is registered inside the auth group below, and because
// Laravel matches routes in declaration order, the literal "create" segment
// will be checked first when the user is authenticated.
// We will register the show route below the create route so it doesn't intercept it.

// ─── Authenticated routes ─────────────────────────────────────────────────────

Route::middleware('auth')->group(function () {

    // Posts CRUD — /posts/create must come before /posts/{post} wildcards
    Route::get('/posts/create', [PostController::class, 'create'])->name('posts.create');
    Route::post('/posts', [PostController::class, 'store'])->name('posts.store');

    Route::get('/posts/{post}/edit', [PostController::class, 'edit'])->name('posts.edit');
    Route::patch('/posts/{post}', [PostController::class, 'update'])->name('posts.update');
    Route::delete('/posts/{post}', [PostController::class, 'destroy'])->name('posts.destroy');

    // Admin post actions
    Route::patch('/posts/{post}/pin', [PostController::class, 'togglePin'])->name('posts.pin');
    Route::patch('/posts/{post}/status', [PostController::class, 'updateStatus'])->name('posts.status');

    // Votes
    Route::post('/posts/{post}/vote', [VoteController::class, 'toggle'])->name('posts.vote');

    // Comments
    Route::post('/posts/{post}/comments', [CommentController::class, 'store'])->name('comments.store');
    Route::delete('/comments/{comment}', [CommentController::class, 'destroy'])->name('comments.destroy');

    // Profile (Breeze)
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// The show route is declared here so guests can read posts, 
// but it is BELOW the auth group so that `/posts/create` gets matched first.
Route::get('/posts/{post}', [PostController::class, 'show'])->name('posts.show');

require __DIR__ . '/auth.php';
