/* 
CREATE TABLE books (
    title TEXT NOT NULL, 
    author TEXT, 
    timestamp TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
*/

type BookData = {
  title: string;
  author?: string;
};
export type Book = BookData & {
  timestamp: string;
};
export type BookFormData = BookData;
