import React from "react";

const Navigation = ({ currentView, setCurrentView }) => {
  const navItems = [
    { id: "data-entry", label: "Data Entry", icon: "📝" },
    { id: "records", label: "Records", icon: "📊" },
    { id: "analytics", label: "Analytics", icon: "📈" },
  ];

  return (
    <nav className="navigation">
      <div className="nav-container">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${currentView === item.id ? "active" : ""}`}
            onClick={() => setCurrentView(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
