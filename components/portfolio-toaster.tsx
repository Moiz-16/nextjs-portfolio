"use client";

import { Toaster } from "react-hot-toast";

export default function PortfolioToaster() {
  return (
    <Toaster
      containerStyle={{ zIndex: 1000 }}
      gutter={10}
      position="bottom-right"
      toastOptions={{
        duration: 5000,
        className: "portfolio-toast",
        success: {
          className: "portfolio-toast portfolio-toast-success",
          iconTheme: {
            primary: "var(--toast-success-icon)",
            secondary: "var(--toast-icon-foreground)",
          },
        },
        error: {
          className: "portfolio-toast portfolio-toast-error",
          iconTheme: {
            primary: "var(--toast-error-icon)",
            secondary: "var(--toast-icon-foreground)",
          },
        },
      }}
    />
  );
}
