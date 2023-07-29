"use client";
import React from "react";
import styles from "./book-list.module.scss";
import { Book } from "@/types/book";
import { useEffect, useState } from "react";
import BookCard from "@/components/book/book-card/book-card";

type BookListProps = {};

export default function BookList(props: BookListProps) {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const arr = [];
    for (let i = 0; i < 100; i++) {
      arr.push({
        title: `Book ${i}`,
        timestamp: new Date().toISOString(),
        author: Math.random() > 0.5 ? "Author" : undefined,
      });
    }
    setBooks(arr);
  }, []);
  return (
    <ol className={styles.bookList}>
      {books.map((book, index) => (
        <BookCard key={`book-${index}`} book={book}></BookCard>
      ))}
    </ol>
  );
}
