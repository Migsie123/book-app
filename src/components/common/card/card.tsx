import styles from "./card.module.scss";
import React from "react";
import classNames from "classnames";
import { StyleStatus } from "@/types/styles";

type CardProps = {
  children?: React.ReactNode;
  className?: string;
  status?: StyleStatus;
};

export default function Card({
  children = null,
  className = "",
  status = "default",
}: CardProps) {
  return (
    <article className={classNames(styles.card, className, styles[status])}>
      <div className={styles.inner}>{children}</div>
    </article>
  );
}
