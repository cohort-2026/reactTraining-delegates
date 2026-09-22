import { useState } from 'react'
import { navLinks, profile } from '../data/cv'
import ThemeToggle from './ThemeToggle'

function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-red-200 bg-white/80 backdrop-blur dark:border-red-900 dark:bg-black/80">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a href="#home" className="flex items-center gap-3 font-mono text-sm font-medium">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white dark:bg-red-600 dark:text-white">
            {profile.initials}
          </span>
          {profile.name}
          <span className="text-red-600 dark:text-red-500">_</span>
        </a>

        <div className="flex items-center gap-4 md:gap-6">
          <ul className="hidden items-center gap-6 text-sm md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-slate-600 transition hover:text-red-600 dark:text-red-200 dark:hover:text-red-500"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <ThemeToggle />

          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label="Toggle menu"
            className="rounded-md border border-red-300 px-3 py-1.5 text-xs md:hidden dark:border-red-800"
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </nav>

      {open && (
        <ul className="border-t border-red-200 px-6 py-3 md:hidden dark:border-red-900">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block py-2 text-sm text-slate-700 dark:text-red-100"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}

export default Navbar