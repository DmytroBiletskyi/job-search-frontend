"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import clsx from 'clsx';
import Cookies from 'js-cookie';
import { useAuth } from '@/context/AuthContext';


const Header = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    Cookies.remove('token');
    Cookies.remove('profile');
    localStorage.removeItem('likedJobs');
    setIsLoggedIn(false);
    router.push('/login');
  };

  return (
    <header className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link href="/" className={clsx(
              "hover:text-blue-400 transition-colors",
              pathname === "/" && "text-blue-400"
            )}>Job Portal</Link>
        </h1>

        <nav className="flex-grow flex justify-center items-center space-x-4">
          
          <Link
            href="/jobs"
            className={clsx(
              "hover:text-blue-400 transition-colors",
              pathname === "/jobs" && "text-blue-400"
            )}
          >
            Job Search
          </Link>

          <a
            href="/liked"
            className={clsx(
              "hover:text-blue-400 transition-colors",
              pathname === "/liked" && "text-blue-400"
            )}
          >
            Liked Jobs
          </a>
        </nav>

        <nav className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <Link
                href="/profile"
                className={clsx(
                  "hover:text-blue-400 transition-colors font-semibold",
                  pathname === "/profile" && "text-blue-400"
                )}
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className={clsx(
                "bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors",
                pathname === "/login" && "bg-blue-600"
              )}
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
