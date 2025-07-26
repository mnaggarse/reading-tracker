"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/lib/auth-context";
import { BookOpen, Home, LogOut, Menu, Plus, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface MobileNavProps {
  currentPath?: string;
}

export function MobileNav({ currentPath }: MobileNavProps) {
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
  };

  const navItems = [
    {
      href: "/",
      label: "Home",
      icon: Home,
      isActive: currentPath === "/",
    },
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: BookOpen,
      isActive: currentPath === "/dashboard",
    },
    {
      href: "/add-book",
      label: "Add Book",
      icon: Plus,
      isActive: currentPath === "/add-book",
    },
  ];

  return (
    <div className="md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="sm" className="p-2">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-8 pt-4">
              <BookOpen className="h-6 w-6 text-blue-600" />
              <span className="font-semibold text-xl text-blue-600">
                ReadTracker
              </span>
            </div>

            {/* Navigation Items */}
            <nav className="flex-1 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                      item.isActive
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* User Section */}
            {user && (
              <div className="border-t pt-4 mt-4">
                <div className="flex items-center gap-3 px-3 py-2 mb-2">
                  <User className="h-5 w-5 text-gray-600" />
                  <span className="text-sm text-gray-600 truncate">
                    {user.email}
                  </span>
                </div>

                <div className="space-y-1">
                  <Link
                    href="/profile"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <User className="h-4 w-4" />
                    Profile
                  </Link>

                  <Button
                    variant="ghost"
                    onClick={handleSignOut}
                    className="w-full justify-start gap-3 px-3 py-2 h-auto text-gray-700 hover:bg-gray-100"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
