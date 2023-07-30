import styles from "./card.module.scss";
import React from "react";
import classNames from "classnames";

export default function Card({
  children = null,
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <article className={classNames(styles.card, className)}>
      <div className={styles.inner}>{children}</div>
    </article>
  );
}
