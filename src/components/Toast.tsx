import { useEffect } from "react";

interface ToastProps {
  message: string;
  onClose: () => void;
}

function Toast({ message, onClose }: ToastProps) {
  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        background: "green",
        color: "white",
        padding: "12px 20px",
        borderRadius: "6px",
        zIndex: 9999,
      }}
    >
      {message}
    </div>
  );
}

export default Toast;