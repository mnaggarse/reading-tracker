"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { Plus, User } from "lucide-react";
import Link from "next/link";

export function MobileNav() {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="md:hidden flex items-center gap-4">
      <Button asChild variant="ghost" size="sm" className="gap-2">
        <Link href="/profile">
          <User className="h-4 w-4" />
        </Link>
      </Button>
      <Button asChild className="font-bold gap-2 bg-blue-600 hover:bg-blue-700">
        <Link href="/add-book">
          <Plus className="h-4 w-4" />
          Add Book
        </Link>
      </Button>
    </div>
  );
}
