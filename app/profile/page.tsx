"use client";

import { ProtectedRoute } from "@/components/protected-route";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useBooks } from "@/hooks/use-books";
import { useAuth } from "@/lib/auth-context";
import { BookOpen, Calendar, Target, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

function ProfileContent() {
  const { user } = useAuth();
  const { books } = useBooks();

  const [userStats, setUserStats] = useState({
    name: "User",
    email: "",
    totalBooksRead: 0,
    totalPagesRead: 0,
    currentlyReading: 0,
    averagePagesPerDay: 0,
    readingStreak: 0,
    joinDate: "January 2024",
  });

  useEffect(() => {
    if (user) {
      const userName =
        user.user_metadata?.name || user.email?.split("@")[0] || "User";
      const userEmail = user.email || "";
      const joinDate = new Date(user.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      });

      // Calculate real statistics from books
      const completedBooks = books.filter(
        (book) => book.pages > 0 && book.read >= book.pages
      );
      const inProgressBooks = books.filter(
        (book) => book.read > 0 && book.read < book.pages
      );

      const totalPagesRead = books.reduce((total, book) => {
        return total + Math.min(book.read, book.pages);
      }, 0);

      const averagePagesPerDay =
        books.length > 0 ? Math.round(totalPagesRead / books.length) : 0;

      setUserStats({
        name: userName,
        email: userEmail,
        totalBooksRead: completedBooks.length,
        totalPagesRead: totalPagesRead,
        currentlyReading: inProgressBooks.length,
        averagePagesPerDay: averagePagesPerDay,
        readingStreak: 0, // This would need additional tracking
        joinDate: joinDate,
      });
    }
  }, [user, books]);

  const statCards = [
    {
      title: "Books Completed",
      value: userStats.totalBooksRead,
      icon: BookOpen,
      description: "Total books finished",
      color: "text-green-600",
    },
    {
      title: "Pages Read",
      value: userStats.totalPagesRead.toLocaleString(),
      icon: TrendingUp,
      description: "Total pages read",
      color: "text-blue-600",
    },
    {
      title: "Currently Reading",
      value: userStats.currentlyReading,
      icon: Target,
      description: "Books in progress",
      color: "text-orange-600",
    },
    {
      title: "Total Books",
      value: books.length,
      icon: Calendar,
      description: "Books in library",
      color: "text-purple-600",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {userStats.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {userStats.name}
              </h1>
              <p className="text-gray-600">{userStats.email}</p>
            </div>
          </div>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-gray-600 mt-1">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Reading Goals */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Reading Goals</CardTitle>
            <CardDescription>
              Your progress towards reading goals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Books Completed</span>
                  <span>
                    {userStats.totalBooksRead}/{books.length} books
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{
                      width: `${
                        books.length > 0
                          ? (userStats.totalBooksRead / books.length) * 100
                          : 0
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Pages Read</span>
                  <span>
                    {userStats.totalPagesRead.toLocaleString()}/
                    {books
                      .reduce((total, book) => total + book.pages, 0)
                      .toLocaleString()}{" "}
                    pages
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{
                      width: `${
                        books.length > 0
                          ? (userStats.totalPagesRead /
                              books.reduce(
                                (total, book) => total + book.pages,
                                0
                              )) *
                            100
                          : 0
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  );
}
