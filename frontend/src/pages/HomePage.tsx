import AddButton from "@/components/AddButton";
import Nav from "@/components/Nav";
import BookList from "@/features/BookList";

export default function HomePage() {
  return (
    <div>
      <Nav />
      <BookList />
      <AddButton />
    </div>
  );
}
