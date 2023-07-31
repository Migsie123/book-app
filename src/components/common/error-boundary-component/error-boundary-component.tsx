import React from "react";
import styles from "./error-boundary-component.module.scss";
import Card from "@/components/common/card";
import Button from "@/components/common/button";

import {
  withErrorBoundary,
  ErrorBoundaryPropsWithComponent,
} from "react-error-boundary";

export default function ErrorBoundaryComponent(
  component: React.ComponentType<any>,
  errorBoundaryProps?: ErrorBoundaryPropsWithComponent
) {
  const props = errorBoundaryProps || { FallbackComponent: undefined };
  props.FallbackComponent = props.FallbackComponent
    ? props.FallbackComponent
    : ({ error, resetErrorBoundary }) => (
        <Card status="error">
          <header>Something went wrong</header>
          <div>
            <pre>{error.message}</pre>
            <Button status="error" onClick={resetErrorBoundary}>
              Try again
            </Button>
          </div>
        </Card>
      );
  return withErrorBoundary(component, props as ErrorBoundaryPropsWithComponent);
}
