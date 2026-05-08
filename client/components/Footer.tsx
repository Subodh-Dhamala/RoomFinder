import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-outline-variant/30 bg-surface-container-highest py-md mt-xl">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-md px-gutter md:flex-row">

        <div className="flex flex-col items-center gap-xs md:items-start">
          <span className="font-semibold text-on-surface">
            RoomFinder
          </span>

          <p className="text-caption text-on-surface-variant">
            © {new Date().getFullYear()} RoomFinder. All rights reserved.
          </p>
        </div>

        <nav className="flex flex-wrap justify-center gap-md">

          <Link
            href="/support"
            className="text-caption text-on-surface-variant hover:text-primary transition-colors"
          >
            Support
          </Link>

          <Link
            href="/privacy"
            className="text-caption text-on-surface-variant hover:text-primary transition-colors"
          >
            Privacy Policy
          </Link>

          <Link
            href="/terms"
            className="text-caption text-on-surface-variant hover:text-primary transition-colors"
          >
            Terms of Service
          </Link>

          <Link
            href="/contact"
            className="text-caption text-on-surface-variant hover:text-primary transition-colors"
          >
            Contact Us
          </Link>

        </nav>

      </div>
    </footer>
  );
}