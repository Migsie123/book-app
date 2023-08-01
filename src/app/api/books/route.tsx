import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { NextResponse } from "next/server";
import { Book } from "@/types/book";

export async function GET(request: Request) {
  try {
    const pageSize = 20;
    const params = new URL(request.url).searchParams;
    const page = parseInt(params.get("page") || "") || 0;
    const offset = parseInt(params.get("offset") || "") || 0;

    const db = await open({
      filename: "./src/app/api/sqlite.db",
      driver: sqlite3.Database,
    });
    //use page and offset to query the database
    const totalOffset = page * pageSize + offset;
    const books: Book[] = await db.all(
      "SELECT title, author, timestamp FROM books ORDER BY timestamp DESC LIMIT 20 OFFSET :offset",
      {
        ":offset": totalOffset,
      }
    );
    return NextResponse.json({ books });
  } catch (err: any) {
    const errMsg =
      err && err.message ? err.message : "Unable to fetch the books.";
    return NextResponse.json({ error: errMsg }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    //title is required
    if (!body.title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    const db = await open({
      filename: "./src/app/api/sqlite.db",
      driver: sqlite3.Database,
    });

    //date in YYYY-MM-DD HH:MM:SS format
    const date = new Date().toISOString().slice(0, 19).replace("T", " ");

    const book = {
      title: body.title,
      author: body.author ? body.author : null,
      timestamp: date,
    };

    await db.run(
      "INSERT INTO books (title, author, timestamp) VALUES (:title, :author, :timestamp)",
      {
        ":title": book.title,
        ":author": book.author,
        ":timestamp": book.timestamp,
      }
    );
    return NextResponse.json({ book });
  } catch (err: any) {
    const errMsg =
      err && err.message ? err.message : "Unable to create the book.";
    return NextResponse.json({ error: errMsg }, { status: 500 });
  }
}
