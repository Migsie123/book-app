# Fullstack Book App
## Frontend
### Display infinitely scrolling list of books
> Dynamicly loads 20 books at a time as the user scrolls. Initially load books until the parent element of the BookList becomes scrollable.

### Form to add new Books to the database
> Mandatory Title field. Optional Author field.

### Error management and display
> Form validation. API error display. React Error Boundaries for component failed states.

## Backend
### SQLite Database
### JSON REST API
### GET /api/books?page=0&offset=0
> Returns 20 books sorted by Timestamp. Supports query parameters for pagination and dynamic offset to account for the Books added by user
### POST /api/books
> Inserts a new book to the database. Uses current date time as a timestamp.

## How To Run
``npm run dev``
