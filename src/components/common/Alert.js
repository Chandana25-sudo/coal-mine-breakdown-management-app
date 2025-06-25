import React from "react";

const Alert = ({ type = "info", message, onClose, className = "" }) => {
  const alertTypes = {
    success: {
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      textColor: "text-green-800",
      icon: "✓",
    },
    error: {
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      textColor: "text-red-800",
      icon: "✕",
    },
    warning: {
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      textColor: "text-yellow-800",
      icon: "⚠",
    },
    info: {
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      textColor: "text-blue-800",
      icon: "ℹ",
    },
  };

  const alertStyle = alertTypes[type] || alertTypes.info;

  return (
    <div className={`alert alert-${type} ${className}`} role="alert">
      <div className="alert-content">
        <div className="alert-message-section">
          <span className="alert-icon">{alertStyle.icon}</span>
          <span className="alert-message">{message}</span>
        </div>
        {onClose && (
          <button
            className="alert-close"
            onClick={onClose}
            aria-label="Close alert"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;
