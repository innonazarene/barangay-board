<?php

namespace App\Policies;

use App\Models\Post;
use App\Models\User;

class PostPolicy
{
    /**
     * Admins bypass all policy checks.
     */
    public function before(User $user, string $ability): bool|null
    {
        if ($user->isAdmin()) {
            return true;
        }

        return null;
    }

    /**
     * Only the post owner (or admin via before()) may update a post.
     */
    public function update(User $user, Post $post): bool
    {
        return $user->id === $post->user_id;
    }

    /**
     * Only the post owner (or admin via before()) may delete a post.
     */
    public function delete(User $user, Post $post): bool
    {
        return $user->id === $post->user_id;
    }

    /**
     * Only admins may pin/unpin a post. Handled entirely by before().
     */
    public function pin(User $user, Post $post): bool
    {
        return false;
    }

    /**
     * Only admins may change post status. Handled entirely by before().
     */
    public function updateStatus(User $user, Post $post): bool
    {
        return false;
    }
}
