"use client";
import BookList from "@/components/book/book-list";
import styles from "./page.module.scss";
import BookForm from "@/components/book/book-form";
import { useState } from "react";
import { Book } from "@/types/book";

export default function Home() {
  const [addedBooks, setAddedBooks] = useState<Book[]>([]);

  return (
    <main>
      <section>
        <h1 className={styles.title}>Books</h1>
        <BookForm
          className={styles.form}
          onAdd={(book: Book) => setAddedBooks((books) => [book, ...books])}
        />
        <BookList addedBooks={addedBooks} />
      </section>
    </main>
  );
}
