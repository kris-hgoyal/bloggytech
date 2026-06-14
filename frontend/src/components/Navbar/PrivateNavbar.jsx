import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../../redux/slices/users/userSlices";
import profilePicture from "../../assets/profile-picture.png";

export default function PrivateNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navigate = useNavigate();
  
  const dispatch = useDispatch();

  const { userAuth } = useSelector((state) => state?.users);
  const user = userAuth?.userInfo;

  const logoutHandler = () => {
    dispatch(logoutAction());
    navigate("/");
    window.location.reload();
  };

  return (
    <header className="sticky top-0 z-50 bg-[#fafafa] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-20 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="group">
            <h1 className="text-lg md:text-xl font-black tracking-[0.25em] text-slate-900">
              BLOGGYTECH
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            <Link
              to="/"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition"
            >
              Home
            </Link>

            <Link
              to="/posts"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition"
            >
              Articles
            </Link>

            <Link
              to="/add-post"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition"
            >
              Write
            </Link>
          </nav>

          {/* Desktop Profile */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-3"
            >
              <img
                src={user?.profilePicture || profilePicture}
                alt={user?.username}
                className="h-10 w-10 rounded-full object-cover border border-slate-200"
              />

              <span className="font-medium text-slate-800">
                {user?.username}
              </span>

              <span className="text-slate-500">▼</span>
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-3 w-48 rounded-2xl border border-slate-200 bg-white p-2 shadow-lg">
                <Link
                  to="/user-profile"
                  className="block rounded-xl px-4 py-3 text-sm text-slate-700 hover:bg-slate-100"
                >
                  Profile
                </Link>

                <button
                  onClick={logoutHandler}
                  className="w-full text-left rounded-xl px-4 py-3 text-sm text-red-500 hover:bg-red-50"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>

          {/* Mobile Button */}
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

            <Link to="/" className="text-slate-700 font-medium">
              Home
            </Link>

            <Link to="/posts" className="text-slate-700 font-medium">
              Articles
            </Link>

            <Link to="/add-post" className="text-slate-700 font-medium">
              Write
            </Link>

            <Link
              to="/user-profile"
              className="text-slate-700 font-medium"
            >
              Profile
            </Link>

            <button
              onClick={logoutHandler}
              className="text-left font-medium text-red-500"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </header>
  );
}