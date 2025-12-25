import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import "./ConfirmDialog.css";

const ConfirmDialog = ({ visible, title = "Confirm", message, onConfirm, onCancel }) => {
  useEffect(() => {
    if (!visible) return;
    const onKey = (e) => {
      if (e.key === "Escape") onCancel && onCancel();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [visible, onCancel]);

  if (!visible) return null;

  const node = (
    <div className="confirm-overlay" role="dialog" aria-modal="true" aria-label={title}>
      <div className="confirm-box">
        <h3 className="confirm-title">{title}</h3>
        <p className="confirm-message">{message}</p>
        <div className="confirm-actions">
          <button className="btn btn-cancel" onClick={onCancel}>Cancel</button>
          <button className="btn btn-confirm" onClick={onConfirm}>Remove</button>
        </div>
      </div>
    </div>
  );

  return createPortal(node, document.body);
};

export default ConfirmDialog;