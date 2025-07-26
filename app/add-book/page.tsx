"use client";

import Link from "next/link";
import type React from "react";

import { MobileNav } from "@/components/mobile-nav";
import { ProtectedRoute } from "@/components/protected-route";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useBooks } from "@/hooks/use-books";
import { BookOpen, Loader2, Plus, Search } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface GoogleBook {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    imageLinks?: {
      thumbnail: string;
    };
    pageCount?: number;
    description?: string;
  };
}

function AddBookContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<GoogleBook[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [addingBookId, setAddingBookId] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [manualBook, setManualBook] = useState({
    title: "",
    pages: "",
    cover: "",
  });
  const router = useRouter();
  const { addBook } = useBooks();

  const searchBooks = async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setSearchResults([]);
    setHasSearched(true);
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
          searchQuery
        )}&maxResults=20&orderBy=relevance`
      );
      const data = await response.json();

      if (data.error) {
        console.error("Google Books API error:", data.error);
        setSearchResults([]);
      } else {
        setSearchResults(data.items || []);
      }
    } catch (error) {
      console.error("Error searching books:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const addBookFromSearch = async (book: GoogleBook) => {
    setAddingBookId(book.id);
    setIsAdding(true);

    try {
      const newBook = await addBook({
        title: book.volumeInfo.title,
        cover: book.volumeInfo.imageLinks?.thumbnail || "/placeholder.svg",
        pages: book.volumeInfo.pageCount || 1,
        read: 0,
      });

      if (newBook) {
        router.push("/dashboard");
      } else {
        console.error("Failed to add book");
        alert("Failed to add book. Please try again.");
      }
    } catch (error) {
      console.error("Error adding book:", error);
      alert("Error adding book. Please try again.");
    } finally {
      setIsAdding(false);
      setAddingBookId(null);
    }
  };

  const addManualBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualBook.title.trim()) {
      alert("Please fill in at least the title");
      return;
    }

    setIsAdding(true);

    try {
      console.log("Adding manual book:", {
        title: manualBook.title.trim(),
        cover: manualBook.cover.trim() || "/placeholder.svg",
        pages: manualBook.pages ? parseInt(manualBook.pages) : 1,
        read: 0,
      });

      const newBook = await addBook({
        title: manualBook.title.trim(),
        cover: manualBook.cover.trim() || "/placeholder.svg",
        pages: manualBook.pages ? parseInt(manualBook.pages) : 1,
        read: 0,
      });

      if (newBook) {
        console.log("Book added successfully:", newBook);
        router.push("/dashboard");
      } else {
        console.error("Failed to add book - no book returned");
        alert("Failed to add book. Please try again.");
      }
    } catch (error) {
      console.error("Error adding book:", error);
      alert("Error adding book. Please try again.");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="border-b bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 font-semibold text-xl text-blue-600"
              >
                <BookOpen className="h-6 w-6 text-blue-600" />
                ReadTracker
              </Link>
            </div>

            {/* Mobile Navigation */}
            <MobileNav />
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900">Add New Book</h1>
            <p className="text-gray-600 mt-1">
              Search for books or add them manually
            </p>
          </div>

          <Tabs defaultValue="search" className="w-full">
            <TabsList className="grid w-full grid-cols-2 rounded-xl">
              <TabsTrigger value="search" className="rounded-lg">
                Search Books
              </TabsTrigger>
              <TabsTrigger value="manual" className="rounded-lg">
                Add Manually
              </TabsTrigger>
            </TabsList>

            <TabsContent value="search" className="space-y-6">
              <Card className="rounded-xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="h-5 w-5" />
                    Search Google Books
                  </CardTitle>
                  <CardDescription>
                    Search for books from Google's extensive library
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <Input
                        placeholder="Enter book title, author, or ISBN..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && searchBooks()}
                        className="flex-1 rounded-xl border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                        disabled={isSearching}
                      />
                      <Button
                        onClick={searchBooks}
                        disabled={isSearching || !searchQuery.trim()}
                        className="bg-blue-600 hover:bg-blue-700 rounded-xl px-6 font-medium"
                      >
                        {isSearching ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Searching...
                          </>
                        ) : (
                          <>
                            <Search className="h-4 w-4 mr-2" />
                            Search
                          </>
                        )}
                      </Button>
                    </div>

                    <div className="text-sm text-gray-500">
                      <p>
                        💡 <strong>Search tips:</strong> Try searching by title,
                        author name, or ISBN for better results
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Search Results */}
              {isSearching && (
                <div className="text-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
                  <p className="text-gray-600">Searching for books...</p>
                </div>
              )}

              {!isSearching && !hasSearched && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Search for books
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Enter a book title, author, or ISBN above to find books to
                    add to your library
                  </p>
                </div>
              )}

              {!isSearching && hasSearched && searchResults.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No books found
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Try searching with different keywords or add the book
                    manually
                  </p>
                  <Button
                    onClick={() => {
                      const manualTab = document.querySelector(
                        '[data-value="manual"]'
                      ) as HTMLElement;
                      if (manualTab) manualTab.click();
                    }}
                    variant="outline"
                    className="rounded-xl"
                  >
                    Add Manually Instead
                  </Button>
                </div>
              )}

              {!isSearching && searchResults.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Found {searchResults.length} book
                      {searchResults.length !== 1 ? "s" : ""}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Click "Add to Library" to save a book
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {searchResults.map((book) => (
                      <Card
                        key={book.id}
                        className="hover:shadow-lg transition-all duration-200 border border-gray-200 rounded-xl overflow-hidden group flex flex-col h-full"
                      >
                        <CardContent className="p-6 flex flex-col h-full">
                          <div className="flex flex-col h-full">
                            <div className="flex-shrink-0 mb-4">
                              <div className="relative mx-auto">
                                <Image
                                  src={
                                    book.volumeInfo.imageLinks?.thumbnail ||
                                    "/placeholder.svg"
                                  }
                                  alt={book.volumeInfo.title}
                                  width={120}
                                  height={180}
                                  className="mx-auto rounded-lg object-cover shadow-md group-hover:shadow-lg transition-shadow duration-200"
                                />
                                {!book.volumeInfo.imageLinks?.thumbnail && (
                                  <div className="absolute inset-0 bg-gray-100 rounded-lg flex items-center justify-center">
                                    <BookOpen className="h-8 w-8 text-gray-400" />
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="flex-1 min-w-0 text-center flex flex-col">
                              <div className="mb-4">
                                <h3 className="font-bold text-lg mb-2 text-gray-900 line-clamp-2">
                                  {book.volumeInfo.title}
                                </h3>

                                {book.volumeInfo.authors && (
                                  <p className="text-gray-600 mb-2 font-medium text-sm">
                                    by {book.volumeInfo.authors.join(", ")}
                                  </p>
                                )}

                                <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mb-3">
                                  {book.volumeInfo.pageCount && (
                                    <span className="flex items-center gap-1">
                                      <BookOpen className="h-4 w-4" />
                                      {book.volumeInfo.pageCount} pages
                                    </span>
                                  )}
                                </div>
                              </div>

                              {book.volumeInfo.description && (
                                <div className="mb-4 flex-1">
                                  <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
                                    {book.volumeInfo.description.replace(
                                      /<[^>]*>/g,
                                      ""
                                    )}
                                  </p>
                                </div>
                              )}

                              <div className="mt-auto pt-4">
                                <Button
                                  onClick={() => addBookFromSearch(book)}
                                  size="sm"
                                  className="bg-blue-600 hover:bg-blue-700 rounded-xl px-6 py-2 h-auto font-medium w-full"
                                  disabled={addingBookId === book.id}
                                >
                                  {addingBookId === book.id ? (
                                    <>
                                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                      Adding to Library...
                                    </>
                                  ) : (
                                    <>
                                      <Plus className="h-4 w-4 mr-2" />
                                      Add to Library
                                    </>
                                  )}
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="manual">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Add Book Manually
                  </CardTitle>
                  <CardDescription>
                    Enter book details manually if you can't find it in search
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={addManualBook} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Book Title *</Label>
                      <Input
                        id="title"
                        placeholder="Enter book title"
                        value={manualBook.title}
                        onChange={(e) =>
                          setManualBook({
                            ...manualBook,
                            title: e.target.value,
                          })
                        }
                        required
                        disabled={isAdding}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="pages">Total Pages</Label>
                        <Input
                          id="pages"
                          type="number"
                          min="1"
                          placeholder="Enter total pages (optional)"
                          value={manualBook.pages}
                          onChange={(e) =>
                            setManualBook({
                              ...manualBook,
                              pages: e.target.value,
                            })
                          }
                          disabled={isAdding}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cover">Cover Image URL</Label>
                        <Input
                          id="cover"
                          placeholder="Enter cover image URL (optional)"
                          value={manualBook.cover}
                          onChange={(e) =>
                            setManualBook({
                              ...manualBook,
                              cover: e.target.value,
                            })
                          }
                          disabled={isAdding}
                        />
                      </div>
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700"
                        disabled={isAdding}
                      >
                        {isAdding ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                            Adding Book...
                          </>
                        ) : (
                          <>
                            <Plus className="h-4 w-4 mr-1" />
                            Add Book
                          </>
                        )}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.push("/dashboard")}
                        disabled={isAdding}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default function AddBookPage() {
  return (
    <ProtectedRoute>
      <AddBookContent />
    </ProtectedRoute>
  );
}
