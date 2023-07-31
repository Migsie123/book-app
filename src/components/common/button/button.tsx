import React from "react";
import styles from "./button.module.scss";
import { StyleSize, StyleStatus } from "@/types/styles";
import classNames from "classnames";

type ButtonProps = {
  children?: React.ReactNode;
  onClick?: () => void;
  status?: StyleStatus;
  size?: StyleSize;
};

export default function Button({
  children,
  onClick,
  status = "default",
  size = "medium",
}: ButtonProps) {
  return (
    <button
      className={classNames(styles.button, styles[status], styles[size])}
      onClick={() => {
        if (onClick) onClick();
      }}
    >
      {children}
    </button>
  );
}
