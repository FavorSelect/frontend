"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { logout, setUser } from "@/store/slices/user/userSlice";
import { User, UserPlus, LogIn, LogOut } from "lucide-react";
import Span from "@/components/atoms/Span";
import Image from "next/image";
import { cn } from "@/utils/cn";
import { useLogoutMutation } from "@/store/api/authApi";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useSearchParams } from "next/navigation";
import { decrypt } from "@/utils/decrypt";
import { apiSlice } from "@/store/api/api";

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user.userInfo);
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const searchParams = useSearchParams();
  const handleLinkClick = () => setIsOpen(false);
  const [logoutApi] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
      dispatch(logout());

      dispatch(apiSlice.util.resetApiState());
      setIsOpen(false);
      toast.success("You have been logged out.");
      router.push("/login");
    } catch (error) {
      console.error("Logout failed", error);
      toast.error("Failed to logout. Please try again.");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const encrypted = searchParams.get("data");

    if (!encrypted) return;

    const decryptedData = decrypt(encrypted);

    if (!decryptedData) return;

    try {
      const parsed = JSON.parse(decryptedData);
      const { name, email } = parsed;

      if (name && email) {
        dispatch(
          setUser({
            name,
            email,
          })
        );

        const newUrl = window.location.origin + window.location.pathname;
        window.history.replaceState({}, "", newUrl);
      }
    } catch (err) {
      console.error("Failed to parse decrypted data:", err);
    }
  }, [searchParams, dispatch]);

  return (
    <div ref={ref} className="relative text-sm cursor-pointer">
      {/* Profile Button */}
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        className="flex flex-col items-center group"
      >
        {isLoggedIn && user ? (
          <>
            <Image
              src={user.profileImage || "/user.jpg"}
              alt="User Avatar"
              className="w-6 h-6 rounded-full object-cover"
              width={40}
              height={40}
            />
            <Span className="mt-1 hidden xl:block">{user.name}</Span>
          </>
        ) : (
          <>
            <User className="w-6 h-6" />
            <Span className="mt-1 hidden xl:block">Profile</Span>
          </>
        )}
      </div>

      {/* Dropdown Menu */}
      <ul
        role="listbox"
        aria-labelledby="auth-pages-dropdown"
        className={cn(
          "absolute top-full -left-12 sm:-left-10 xl:left-0 mt-2 w-40 z-100 bg-white border border-gray-200 rounded-lg shadow-lg transition-all duration-300 transform",
          isOpen
            ? "opacity-100 translate-y-1 pointer-events-auto"
            : "opacity-0 translate-y-0 pointer-events-none"
        )}
        tabIndex={0}
      >
        {!isLoggedIn ? (
          <>
            <li onClick={handleLinkClick}>
              <Link
                href="/signup"
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-scarlet-red hover:text-white transition-colors"
              >
                <UserPlus className="mr-2 w-5 h-5" />
                Sign Up
              </Link>
            </li>
            <li onClick={handleLinkClick}>
              <Link
                href="/login"
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-scarlet-red hover:text-white transition-colors"
              >
                <LogIn className="mr-2 w-5 h-5" />
                Login
              </Link>
            </li>
          </>
        ) : (
          <>
            <li onClick={handleLinkClick}>
              <Link
                href="/dashboard"
                className="flex w-full items-center px-4 py-2 text-red-600 hover:bg-gray-100 hover:text-red-700 transition-colors"
              >
                <User className="mr-2 w-5 h-5" />
                Profile
              </Link>
            </li>
            <li onClick={handleLogout}>
              <button className="flex w-full items-center px-4 py-2 text-red-600 hover:bg-gray-100 hover:text-red-700 transition-colors cursor-pointer">
                <LogOut className="mr-2 w-5 h-5" />
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}
