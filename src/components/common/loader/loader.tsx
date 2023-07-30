import React from "react";
import styles from "./loader.module.scss";

type LoaderProps = {
  children?: React.ReactNode;
};

export default function Loader({ children }: LoaderProps) {
  return (
    <div className={styles.loader}>
      <div />
      <div />
      <div />
      <div />
    </div>
  );
}
