import React, { useState } from "react";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import DataEntry from "./components/DataEntry/DataEntry";
import Records from "./components/Records/Records";
import Analytics from "./components/Analytics/Analytics";
import Loading from "./components/common/Loading";
import Alert from "./components/common/Alert";
import { useFirebaseBreakdownData } from "./hooks/useFirebaseBreakdownData";
import "./styles/globals.css";

function App() {
  const [currentView, setCurrentView] = useState("data-entry");
  const {
    breakdownData,
    loading,
    error,
    addRecord,
    updateRecord,
    deleteRecord,
    refreshData,
  } = useFirebaseBreakdownData();

  const renderCurrentView = () => {
    switch (currentView) {
      case "data-entry":
        return (
          <DataEntry
            onAddRecord={addRecord}
            data={breakdownData}
            loading={loading}
          />
        );
      case "records":
        return loading ? (
          <Loading />
        ) : (
          <Records
            data={breakdownData}
            onUpdateRecord={updateRecord}
            onDeleteRecord={deleteRecord}
            onRefresh={refreshData}
            loading={loading}
          />
        );
      case "analytics":
        return loading ? <Loading /> : <Analytics data={breakdownData || []} />;
      default:
        return (
          <DataEntry
            onAddRecord={addRecord}
            data={breakdownData}
            loading={loading}
          />
        );
    }
  };

  return (
    <div className="App">
      <Header />
      <Navigation currentView={currentView} setCurrentView={setCurrentView} />
      {error && (
        <Alert
          type="error"
          message={error}
          onClose={() => window.location.reload()}
        />
      )}
      <main className="main-content">{renderCurrentView()}</main>
    </div>
  );
}

export default App;
