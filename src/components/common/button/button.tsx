import React from "react";
import styles from "./button.module.scss";
import { StyleSize, StyleStatus } from "@/types/styles";
import classNames from "classnames";

type ButtonProps = {
  children?: React.ReactNode;
  onClick?: () => void;
  status?: StyleStatus;
  size?: StyleSize;
  type?: "button" | "submit";
  loading?: boolean;
  loadingText?: string;
};

export default function Button({
  children,
  onClick,
  status = "default",
  size = "medium",
  type = "button",
  loading = false,
  loadingText = "Loading...",
}: ButtonProps) {
  return (
    <button
      type={type}
      className={classNames(styles.button, styles[status], styles[size], {
        [styles.loading]: loading,
      })}
      onClick={() => {
        if (onClick) onClick();
      }}
      disabled={loading}
    >
      <div className={styles.content}>{children}</div>
      {loading && <div className={styles.loader}>{loadingText}</div>}
    </button>
  );
}
