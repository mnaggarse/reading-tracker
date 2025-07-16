import { BookCard } from "@/components/BookCard";

export default function BookList() {
  return (
    <div className="p-6 mx-auto max-w-5xl grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
      <BookCard />
      <BookCard />
      <BookCard />
      <BookCard />
      <BookCard />
      <BookCard />
    </div>
  );
}
