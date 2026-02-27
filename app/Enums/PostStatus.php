<?php

namespace App\Enums;

enum PostStatus: string
{
    case Open = 'open';
    case InProgress = 'in_progress';
    case Resolved = 'resolved';

    public function label(): string
    {
        return match ($this) {
            self::Open => 'Open',
            self::InProgress => 'In Progress',
            self::Resolved => 'Resolved',
        };
    }

    public function color(): string
    {
        return match ($this) {
            self::Open => 'red',
            self::InProgress => 'yellow',
            self::Resolved => 'green',
        };
    }
}
