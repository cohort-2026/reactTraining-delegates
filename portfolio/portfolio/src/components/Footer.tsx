import { profile } from '../data/cv'

function Footer() {
  return (
    <footer className="border-t border-red-200 px-6 py-8 text-center text-sm text-slate-500 dark:border-red-900 dark:text-red-300">
      <p>
        © {new Date().getFullYear()} {profile.name}. Built with React,
        TypeScript and Tailwind CSS.
      </p>
    </footer>
  )
}

export default Footer