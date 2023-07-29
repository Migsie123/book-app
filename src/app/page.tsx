import BookList from "@/components/book/book-list";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <main>
      <section>
        <h1 className={styles.title}>Books</h1>
        <BookList />
      </section>
    </main>
  );
}
