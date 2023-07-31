"use client";
import React from "react";
import styles from "./book-list.module.scss";
import { Book } from "@/types/book";
import BookCard from "@/components/book/book-card/book-card";
import InfiniteScrollingList from "@/components/common/infinite-scrolling-list";
import ErrorBoundaryComponent from "@/components/common/error-boundary-component";

type BookListProps = {};

const BookList = (props: BookListProps) => {
  const dataFetcher = (page: number) => {
    return new Promise(async (resolve, reject) => {
      try {
        const url = new URL(window.location.href);
        url.pathname = "/api/books";
        if (page) url.searchParams.append("page", page.toString());
        const res = await fetch(url);
        const data = await res.json();
        if (res.status !== 200)
          throw new Error(data.message || "Unable to fetch books.");
        const books = (data.books as Book[]) || [];
        resolve(books);
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  };

  return (
    <InfiniteScrollingList dataFetcher={dataFetcher}>
      {(book: Book, index: number) => <BookCard key={index} book={book} />}
    </InfiniteScrollingList>
  );
};

export default ErrorBoundaryComponent(BookList);
