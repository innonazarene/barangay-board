import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen corkboard-bg">
            <nav className="wood-nav border-b-4 border-cork-900/30 shadow-lg">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        {/* Logo + nav links */}
                        <div className="flex">
                            {/* Logo / wordmark */}
                            <div className="flex shrink-0 items-center">
                                <Link
                                    href={route('home')}
                                    className="flex items-center gap-2 focus:outline-none"
                                >
                                    <span className="text-sm font-bold text-paper-100 font-handwriting tracking-wide">
                                        Barangay Board
                                    </span>
                                </Link>
                            </div>

                            {/* Desktop nav links */}
                            <div className="hidden space-x-1 sm:-my-px sm:ms-6 sm:flex">
                                <NavLink
                                    href={route('home')}
                                    active={route().current('home')}
                                    className="!text-amber-200 hover:!text-white !border-amber-400"
                                >
                                    Home
                                </NavLink>
                                <NavLink
                                    href={route('posts.create')}
                                    active={route().current('posts.create')}
                                    className="!text-amber-200 hover:!text-white !border-amber-400"
                                >
                                    Create Post
                                </NavLink>
                            </div>
                        </div>

                        {/* Right side: profile dropdown */}
                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center gap-2 rounded-md border border-transparent px-3 py-2 text-sm font-medium leading-4 text-amber-200 transition duration-150 ease-in-out hover:text-white focus:outline-none"
                                            >
                                                {/* Avatar initial */}
                                                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-blue-600 text-xs font-bold text-white shadow-pin">
                                                    {user.name?.charAt(0)?.toUpperCase() ?? '?'}
                                                </div>

                                                <span className="hidden md:block">
                                                    {user.name}
                                                </span>

                                                <svg
                                                    className="h-4 w-4 text-amber-300"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.edit')}>
                                            Profile
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        {/* Mobile hamburger */}
                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (prev) => !prev,
                                    )
                                }
                                className="inline-flex items-center justify-center rounded-md p-2 text-amber-300 transition duration-150 ease-in-out hover:bg-cork-800/50 hover:text-white focus:bg-cork-800/50 focus:text-white focus:outline-none"
                                aria-expanded={showingNavigationDropdown}
                                aria-label="Toggle navigation menu"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu panel */}
                <div
                    className={
                        (showingNavigationDropdown ? 'block' : 'hidden') +
                        ' sm:hidden'
                    }
                >
                    <div className="space-y-1 pb-3 pt-2 border-t border-cork-700/50">
                        <ResponsiveNavLink
                            href={route('home')}
                            active={route().current('home')}
                        >
                            Home
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            href={route('posts.create')}
                            active={route().current('posts.create')}
                        >
                            Create Post
                        </ResponsiveNavLink>
                    </div>

                    <div className="border-t border-cork-700/50 pb-1 pt-4">
                        <div className="px-4">
                            <div className="text-base font-medium text-paper-100">
                                {user.name}
                            </div>
                            <div className="text-sm font-medium text-amber-300/70">
                                {user.email}
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route('logout')}
                                as="button"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Page header slot */}
            {header && (
                <header className="paper-note shadow-paper">
                    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
