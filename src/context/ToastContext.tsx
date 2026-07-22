import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import Toast from "../components/Toast";

interface ToastContextType {
  showToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [message, setMessage] = useState("");

  function showToast(text: string) {
    setMessage(text);
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <Toast
        message={message}
        onClose={() => setMessage("")}
      />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error(
      "useToast must be used inside ToastProvider"
    );
  }

  return context;
}