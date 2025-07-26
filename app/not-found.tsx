"use client";

import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="flex flex-col items-center">
        <BookOpen className="h-16 w-16 text-blue-600 mb-6" />
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-2">
          404 - Page Not Found
        </h1>
        <Button
          asChild
          className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg rounded-xl"
        >
          <Link href="/">Go to Home</Link>
        </Button>
      </div>
    </div>
  );
}
