<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class VoteController extends Controller
{
    /**
     * Toggle a vote on a post for the authenticated user.
     * Creates the vote if it does not exist; deletes it if it does.
     */
    public function toggle(Request $request, Post $post): RedirectResponse
    {
        $userId   = $request->user()->id;
        $existing = $post->votes()->where('user_id', $userId)->first();

        if ($existing) {
            $existing->delete();
        } else {
            $post->votes()->create(['user_id' => $userId]);
        }

        return redirect()->back();
    }
}
