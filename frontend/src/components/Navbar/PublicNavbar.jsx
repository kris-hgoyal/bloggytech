import { useState } from "react";
import { Link } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

export default function PublicNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#fafafa] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-20 flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="group">
            <h1 className="text-lg md:text-xl font-black tracking-[0.25em] text-slate-900 transition">
              BLOGGYTECH
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            <Link
              to="/"
              className="text-sm font-medium tracking-wide text-slate-600 hover:text-slate-900 transition"
            >
              Home
            </Link>

            <Link
              to="/posts"
              className="text-sm font-medium tracking-wide text-slate-600 hover:text-slate-900 transition"
            >
              Articles
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/login"
              className="text-sm font-medium text-slate-700 hover:text-slate-900 transition"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="px-5 py-2.5 bg-slate-900 text-white rounded-full text-sm font-medium hover:bg-slate-800 transition"
            >
              Start Writing
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden"
          >
            {mobileMenuOpen ? (
              <XMarkIcon className="h-7 w-7 text-slate-900" />
            ) : (
              <Bars3Icon className="h-7 w-7 text-slate-900" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-[#fafafa]">
          <div className="px-6 py-6 flex flex-col gap-5">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-700 font-medium"
            >
              Home
            </Link>

            <Link
              to="/posts"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-700 font-medium"
            >
              Articles
            </Link>

            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="text-slate-700 font-medium"
            >
              Login
            </Link>

            <Link
              to="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-white font-medium"
            >
              Start Writing
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}