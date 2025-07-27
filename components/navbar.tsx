"use client";

import { MobileNav } from "@/components/mobile-nav";
import { Button } from "@/components/ui/button";
import { BookOpen, Plus, User } from "lucide-react";
import Link from "next/link";

interface NavbarProps {
  showAddBook?: boolean;
  showProfile?: boolean;
}

export function Navbar({
  showAddBook = false,
  showProfile = false,
}: NavbarProps) {
  return (
    <nav className="border-b bg-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 font-semibold text-xl text-blue-600"
          >
            <BookOpen className="h-6 w-6 text-blue-600" />
            ReadTracker
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            {showProfile && (
              <Button asChild variant="ghost" size="sm" className="gap-2">
                <Link href="/profile">
                  <User className="h-4 w-4" />
                  Profile
                </Link>
              </Button>
            )}
            {showAddBook && (
              <Button
                asChild
                className="font-bold gap-2 bg-blue-600 hover:bg-blue-700"
              >
                <Link href="/add-book">
                  <Plus className="h-4 w-4" />
                  Add Book
                </Link>
              </Button>
            )}
          </div>

          {/* Mobile Navigation */}
          <MobileNav showAddBook={showAddBook} showProfile={showProfile} />
        </div>
      </div>
    </nav>
  );
}
