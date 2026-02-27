import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center corkboard-bg pt-6 sm:justify-center sm:pt-0">
            {/* Title */}
            <div className="mb-2 flex flex-col items-center gap-3 pt-8 sm:pt-0">
                <Link href="/" className="flex flex-col items-center gap-2 focus:outline-none group">
                    <h1 className="text-xl font-bold text-paper-100 drop-shadow-md font-handwriting tracking-wide sm:text-2xl">
                        Barangay Bulletin Board
                    </h1>
                    <p className="text-xs text-amber-200/80">Butuan City Community Hub</p>
                </Link>
            </div>

            {/* Form card - styled as pinned note */}
            <div className="mt-6 w-full overflow-hidden paper-note rounded-lg shadow-paper push-pin pt-5 px-6 py-6 sm:max-w-md relative">
                <div className="relative z-[5]">
                    {children}
                </div>
            </div>

            {/* Footer text */}
            <p className="mt-6 pb-8 text-xs text-cork-800/60">
                &copy; {new Date().getFullYear()} Barangay Board &mdash; Butuan City
            </p>
        </div>
    );
}
