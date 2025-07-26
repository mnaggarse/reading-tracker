"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/lib/auth-context";
import {
  ArrowRight,
  BookOpen,
  Star,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function HomePage() {
  const { user } = useAuth();
  const [isHovered, setIsHovered] = useState(false);

  const features = [
    {
      icon: BookOpen,
      title: "Track Your Reading",
      description:
        "Keep track of your current page, reading progress, and completion status for all your books.",
    },
    {
      icon: Target,
      title: "Set Reading Goals",
      description:
        "Set daily, weekly, and yearly reading goals to stay motivated and build consistent reading habits.",
    },
    {
      icon: TrendingUp,
      title: "Monitor Progress",
      description:
        "Visualize your reading progress with beautiful charts and track your reading statistics over time.",
    },
    {
      icon: Users,
      title: "Personal Library",
      description:
        "Build your personal digital library with books from Google Books or add them manually.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Book Club Leader",
      content:
        "ReadTracker has completely transformed how I manage my reading. The progress tracking keeps me motivated!",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Student",
      content:
        "Perfect for tracking my academic reading. The goal-setting feature helps me stay on top of my studies.",
      rating: 5,
    },
    {
      name: "Emma Davis",
      role: "Book Blogger",
      content:
        "I love how easy it is to add books and track my progress. The interface is clean and intuitive.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
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
              {user ? (
                <div className="flex items-center gap-4">
                  <Link href="/dashboard">
                    <Button variant="ghost">Dashboard</Button>
                  </Link>
                  <Link href="/dashboard">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      My Books
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Button variant="ghost" asChild>
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button asChild className="bg-blue-600 hover:bg-blue-700">
                    <Link href="/signup">Sign Up</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Track Your Reading
              <span className="text-blue-600"> Journey</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Transform your reading habits with our intuitive reading tracker.
              Set goals, monitor progress, and build a personal library that
              grows with you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <Link href="/dashboard">
                  <Button
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3"
                  >
                    Go to Dashboard
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/signup">
                    <Button
                      size="lg"
                      className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3"
                    >
                      Get Started Free
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button
                      size="lg"
                      variant="outline"
                      className="text-lg px-8 py-3"
                    >
                      Sign In
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Track Your Reading
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to help you build better reading habits
              and achieve your goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow duration-300"
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Loved by Readers Worldwide
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of readers who have transformed their reading
              habits with ReadTracker.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-blue-600">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Transform Your Reading?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of readers who are already tracking their progress
              and achieving their reading goals.
            </p>
            {user ? (
              <Link href="/dashboard">
                <Button
                  size="lg"
                  variant="secondary"
                  className="text-lg px-8 py-3"
                >
                  Go to Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            ) : (
              <Link href="/signup">
                <Button
                  size="lg"
                  variant="secondary"
                  className="text-lg px-8 py-3"
                >
                  Start Reading Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-900 text-white">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <BookOpen className="h-6 w-6 text-blue-400" />
              <span className="font-semibold text-xl">ReadTracker</span>
            </div>
            <div className="text-gray-400 text-sm">
              © 2024 ReadTracker. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
