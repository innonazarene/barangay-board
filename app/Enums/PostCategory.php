<?php

namespace App\Enums;

enum PostCategory: string
{
    case Announcement = 'announcement';
    case Issue = 'issue';
    case Event = 'event';
    case LostAndFound = 'lost_and_found';
    case HelpRequest = 'help_request';

    public function label(): string
    {
        return match ($this) {
            self::Announcement => 'Announcement',
            self::Issue => 'Issue Report',
            self::Event => 'Event',
            self::LostAndFound => 'Lost & Found',
            self::HelpRequest => 'Help Request',
        };
    }

    public function color(): string
    {
        return match ($this) {
            self::Announcement => 'blue',
            self::Issue => 'red',
            self::Event => 'green',
            self::LostAndFound => 'yellow',
            self::HelpRequest => 'purple',
        };
    }
}
