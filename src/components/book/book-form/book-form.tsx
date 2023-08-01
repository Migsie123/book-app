"use client";
import { useState } from "react";
import styles from "./book-form.module.scss";
import { useForm } from "react-hook-form";
import { Book, BookFormData } from "@/types/book";
import Button from "@/components/common/button";
import classNames from "classnames";
import Loader from "@/components/common/loader";

type BookFormProps = {
  className?: string;
  onAdd?: (book: Book) => void;
};

export default function BookForm({ className, onAdd }: BookFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BookFormData>();
  const [apiError, setApiError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (data: BookFormData) => {
    setLoading(true);
    setApiError(null);
    const url = new URL(window.location.href);
    url.pathname = "/api/books";
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const resData = await res.json();
    if (res.status !== 200) {
      setApiError(resData.error || "Unable to create the book.");
      return;
    }

    const book = resData.book as Book;
    reset();
    setLoading(false);
    if (onAdd) onAdd(book);
  };

  return (
    <>
      <form
        className={classNames(styles.bookForm, className)}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={styles.group}>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            placeholder="Title"
            {...register("title", { required: true })}
          />
          {errors.title && (
            <span className={styles.errormsg}>This field is required</span>
          )}
        </div>
        <div className={styles.group}>
          <label htmlFor="author">
            Author <span className={styles.optional}>(optional)</span>
          </label>
          <input id="author" placeholder="Author" {...register("author")} />
        </div>
        <Button type="submit" loading={loading} loadingText="Creating...">
          Add New Book
        </Button>
      </form>
      {apiError && (
        <div className={styles.apierror}>Server Error: {apiError}</div>
      )}
    </>
  );
}
