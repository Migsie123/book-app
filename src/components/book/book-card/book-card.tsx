import Card from "@/components/common/card";
import { Book } from "@/types/book";

type BookCardProps = {
  book: Book;
};

export default function BookCard({ book }: BookCardProps) {
  return (
    <Card>
      <header>{book?.title}</header>
      {book?.author && <div>Author: {book?.author}</div>}
      <footer>Added: {book?.timestamp}</footer>
    </Card>
  );
}
