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
  Loader2,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function HomePage() {
  const { user, signInWithGoogle } = useAuth();
  const [isHovered, setIsHovered] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);

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

  return (
    <div className="min-h-screen">
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
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3"
                  onClick={async () => {
                    setIsSigningIn(true);
                    await signInWithGoogle();
                    setIsSigningIn(false);
                  }}
                  disabled={isSigningIn}
                >
                  {isSigningIn ? (
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                  ) : null}
                  Continue with Google
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
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
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-3"
                onClick={async () => {
                  setIsSigningIn(true);
                  await signInWithGoogle();
                  setIsSigningIn(false);
                }}
                disabled={isSigningIn}
              >
                {isSigningIn ? (
                  <Loader2 className="h-5 w-5 animate-spin mr-2" />
                ) : null}
                Continue with Google
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
