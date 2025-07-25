"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, BookOpen, Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"

interface GoogleBook {
  id: string
  volumeInfo: {
    title: string
    authors?: string[]
    imageLinks?: {
      thumbnail: string
    }
    pageCount?: number
    description?: string
  }
}

export default function AddBookPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<GoogleBook[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [manualBook, setManualBook] = useState({
    title: "",
    author: "",
    totalPages: "",
    cover: "",
  })
  const router = useRouter()

  const searchBooks = async () => {
    if (!searchQuery.trim()) return

    setIsSearching(true)
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchQuery)}&maxResults=20`,
      )
      const data = await response.json()
      setSearchResults(data.items || [])
    } catch (error) {
      console.error("Error searching books:", error)
      setSearchResults([])
    } finally {
      setIsSearching(false)
    }
  }

  const addBookFromSearch = (book: GoogleBook) => {
    // In a real app, you would save this to your database
    console.log("Adding book from search:", book)
    alert(`Added "${book.volumeInfo.title}" to your reading list!`)
    router.push("/")
  }

  const addManualBook = (e: React.FormEvent) => {
    e.preventDefault()
    if (!manualBook.title || !manualBook.totalPages) {
      alert("Please fill in at least the title and total pages")
      return
    }

    // In a real app, you would save this to your database
    console.log("Adding manual book:", manualBook)
    alert(`Added "${manualBook.title}" to your reading list!`)
    router.push("/")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Add New Book</h1>
          <p className="text-gray-600 mt-1">Search for books or add them manually</p>
        </div>

        <Tabs defaultValue="search" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="search">Search Books</TabsTrigger>
            <TabsTrigger value="manual">Add Manually</TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Search Google Books
                </CardTitle>
                <CardDescription>Search for books from Google's extensive library</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter book title, author, or ISBN..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && searchBooks()}
                    className="flex-1"
                  />
                  <Button onClick={searchBooks} disabled={isSearching}>
                    {isSearching ? "Searching..." : "Search"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {searchResults.length > 0 && (
              <div className="grid gap-4">
                {searchResults.map((book) => (
                  <Card key={book.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0">
                          <Image
                            src={
                              book.volumeInfo.imageLinks?.thumbnail ||
                              "/placeholder.svg?height=120&width=80&text=No+Cover"
                            }
                            alt={book.volumeInfo.title}
                            width={80}
                            height={120}
                            className="rounded-md object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-lg mb-1 truncate">{book.volumeInfo.title}</h3>
                          {book.volumeInfo.authors && (
                            <p className="text-gray-600 mb-2">by {book.volumeInfo.authors.join(", ")}</p>
                          )}
                          {book.volumeInfo.pageCount && (
                            <p className="text-sm text-gray-500 mb-2">{book.volumeInfo.pageCount} pages</p>
                          )}
                          {book.volumeInfo.description && (
                            <p className="text-sm text-gray-600 line-clamp-2 mb-3">{book.volumeInfo.description}</p>
                          )}
                          <Button
                            onClick={() => addBookFromSearch(book)}
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            Add to Library
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
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
                <CardDescription>Enter book details manually if you can't find it in search</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={addManualBook} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Book Title *</Label>
                      <Input
                        id="title"
                        placeholder="Enter book title"
                        value={manualBook.title}
                        onChange={(e) => setManualBook({ ...manualBook, title: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="author">Author</Label>
                      <Input
                        id="author"
                        placeholder="Enter author name"
                        value={manualBook.author}
                        onChange={(e) => setManualBook({ ...manualBook, author: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="pages">Total Pages *</Label>
                      <Input
                        id="pages"
                        type="number"
                        min="1"
                        placeholder="Enter total pages"
                        value={manualBook.totalPages}
                        onChange={(e) => setManualBook({ ...manualBook, totalPages: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cover">Cover Image URL</Label>
                      <Input
                        id="cover"
                        placeholder="Enter cover image URL (optional)"
                        value={manualBook.cover}
                        onChange={(e) => setManualBook({ ...manualBook, cover: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="h-4 w-4 mr-1" />
                      Add Book
                    </Button>
                    <Button type="button" variant="outline" onClick={() => router.push("/")}>
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
  )
}
