/* 
CREATE TABLE books (
    title TEXT NOT NULL, 
    author TEXT, 
    timestamp TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
*/

export type Book = {
  title: string;
  author?: string;
  timestamp: string;
};
