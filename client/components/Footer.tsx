export default function Footer() {
  return (
    <footer className="w-full border-t border-outline-variant/30 bg-surface-container-highest py-lg mt-xl">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-md px-gutter md:flex-row">
        
        <div className="flex flex-col items-center gap-xs md:items-start">
          <span className="font-semibold text-on-surface">RoomFinder</span>
          <p className="text-caption text-on-surface-variant">
            © {new Date().getFullYear()} RoomFinder. All rights reserved.
          </p>
        </div>

        <nav className="flex flex-wrap justify-center gap-md">
          <a href="/support" className="text-caption text-on-surface-variant hover:text-primary transition-colors">
            Support
          </a>
          <a href="#" className="text-caption text-on-surface-variant hover:text-primary transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="text-caption text-on-surface-variant hover:text-primary transition-colors">
            Terms of Service
          </a>
          <a href="#" className="text-caption text-on-surface-variant hover:text-primary transition-colors">
            Contact Us
          </a>
        </nav>

      </div>
    </footer>
  )
}