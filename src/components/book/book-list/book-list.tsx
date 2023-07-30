"use client";
import React from "react";
import styles from "./book-list.module.scss";
import { Book } from "@/types/book";
import { useEffect, useState } from "react";
import BookCard from "@/components/book/book-card/book-card";
import InfiniteScrollingList from "@/components/common/infinite-scrolling-list";

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

  const dataFetcher = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const arr = [];
        for (let i = 0; i < 20; i++) {
          arr.push({
            title: `Book ${i}`,
            timestamp: new Date().toISOString(),
            author: Math.random() > 0.5 ? "Author" : undefined,
          });
        }
        resolve(arr);
      }, 1500);
    });
  };

  return (
    <InfiniteScrollingList dataFetcher={dataFetcher}>
      {(book: Book, index: number) => <BookCard key={index} book={book} />}
    </InfiniteScrollingList>
  );
}
