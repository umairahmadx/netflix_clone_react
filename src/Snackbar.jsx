import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import "./Snackbar.css";

const Snackbar = ({ message, visible, onClose, duration = 2500, type = "info" }) => {
  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => onClose && onClose(), duration);
    return () => clearTimeout(t);
  }, [visible, duration, onClose]);

  if (!visible) return null;

  const node = (
    <div className={`snackbar snackbar-${type}`} role="status" aria-live="polite">
      {message}
    </div>
  );

  return createPortal(node, document.body);
};

export default Snackbar;
