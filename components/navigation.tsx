"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BookOpen, LogOut, User } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const email = localStorage.getItem("userEmail") || "";
    setIsLoggedIn(loggedIn);
    setUserEmail(email);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    setIsLoggedIn(false);
    router.push("/login");
  };

  // Don't show navigation on auth pages
  if (pathname === "/login" || pathname === "/signup") {
    return null;
  }

  return (
    <nav className="border-b bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold text-xl text-blue-600"
          >
            <BookOpen className="h-6 w-6 text-blue-600" />
            ReadTracker
          </Link>

          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <Link
                  href="/"
                  className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                    pathname === "/" ? "text-blue-600" : "text-gray-600"
                  }`}
                >
                  Home
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <User className="h-4 w-4" />
                      {userEmail}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="cursor-pointer">
                        <User className="h-4 w-4 mr-2" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="cursor-pointer"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Link
                  href="/add-book"
                  className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                    pathname === "/add-book" ? "text-blue-600" : "text-gray-600"
                  }`}
                >
                  Add Book
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Button asChild className="bg-blue-600 hover:bg-blue-700">
                  <Link href="/login">Continue with Google</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
