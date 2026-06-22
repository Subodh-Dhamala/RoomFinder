"use client";

import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { user, isLoaded, isSignedIn } = useUser();
  const pathname = usePathname();

  const role = user?.publicMetadata?.role as
    | "tenant"
    | "landlord"
    | undefined;

  if (!isLoaded) return null;

  const navLink = (href: string) =>
    pathname === href
      ? "border-b-2 border-primary pb-1 text-[15px] font-semibold text-primary"
      : "text-[15px] font-medium text-on-surface-variant transition-colors hover:text-primary";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-outline-variant/30 bg-surface/80 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-gutter">

        <div className="flex items-center gap-12">

          <Link href="/" className="text-[30px] font-bold tracking-tight text-primary">
            RoomFinder
          </Link>

          <nav className="hidden items-center gap-8 md:flex">

            {!isSignedIn && (
              <Link href="/" className={navLink("/")}>
                Find a Room
              </Link>
            )}

            {isSignedIn && role === "tenant" && (
              <>
                <Link href="/" className={navLink("/")}>
                  Find a Room
                </Link>
                <Link href="/tenant/bookings" className={navLink("/tenant/bookings")}>
                  My Bookings
                </Link>
                <Link href="/tenant/wishlist" className={navLink("/tenant/wishlist")}>
                  Wishlist
                </Link>
              </>
            )}

            {isSignedIn && role === "landlord" && (
              <>
                <Link href="/landlord/listings/new" className={navLink("/landlord/listings/new")}>
                  Post Listing
                </Link>
                <Link href="/landlord/listings" className={navLink("/landlord/listings")}>
                  My Listings
                </Link>
                <Link href="/landlord/bookings" className={navLink("/landlord/bookings")}>
                  Bookings
                </Link>
              </>
            )}

            <Link href="/support" className={navLink("/support")}>
              Support
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <button className="rounded-lg px-4 py-2 text-[14px] font-medium text-on-surface-variant transition-all hover:bg-surface-container-low">
            Help
          </button>

  {isSignedIn ? (
  <div className="flex items-center gap-3">
    <Link href="/profile" className={navLink("/profile")}>
      Profile
    </Link>
    <UserButton />
  </div>
) : (
  <Link href="/sign-in" className="rounded-lg bg-primary px-6 py-2 text-[14px] font-semibold text-white transition-all hover:opacity-90">
    Sign In
  </Link>
)}
        </div>

      </div>
    </header>
  );
}