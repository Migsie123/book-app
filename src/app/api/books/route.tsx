import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { NextResponse } from "next/server";
import { Book } from "@/types/book";
sqlite3.verbose();

export async function GET(request: Request) {
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
    "SELECT * FROM books ORDER BY timestamp DESC LIMIT 20 OFFSET :offset",
    {
      ":offset": totalOffset,
    }
  );

  return NextResponse.json({ books });
}
