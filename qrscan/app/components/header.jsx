"use client"

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-3xl">📊</span>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              <span className="text-blue-600">Ecom</span>Helper
            </h1>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition">
              Features
            </a>
            <a href="#why-us" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 transition">
              Why Us
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}
