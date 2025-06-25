import React, { useState } from "react";
import Alert from "../common/Alert";
import { exportBreakdownRecordsToCSV } from "../../utils/csvExport";

const Records = ({
  data,
  onUpdateRecord,
  onDeleteRecord,
  onRefresh,
  loading,
}) => {
  const [expandedRecord, setExpandedRecord] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [alert, setAlert] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const truncateText = (text, maxLength) => {
    if (!text || text.length <= maxLength) return text || "N/A";
    return text.substring(0, maxLength) + "...";
  };

  const handleEdit = (record) => {
    // This would need to be implemented to populate the form
    // For now, we'll just show an alert
    setAlert({
      type: "info",
      message: "Edit functionality will be implemented soon",
    });
  };

  const handleDeleteClick = (id) => {
    setDeleteConfirm(id);
  };

  const confirmDelete = async (id) => {
    try {
      await onDeleteRecord(id);
      setAlert({
        type: "success",
        message: "Breakdown record deleted successfully!",
      });
      setDeleteConfirm(null);
    } catch (error) {
      setAlert({
        type: "error",
        message: "Failed to delete record. Please try again.",
      });
    }
  };

  const cancelDelete = () => {
    setDeleteConfirm(null);
  };

  const toggleExpand = (id) => {
    setExpandedRecord(expandedRecord === id ? null : id);
  };

  const handleExportCSV = async () => {
    try {
      if (!data || data.length === 0) {
        setAlert({ type: "error", message: "No records to export" });
        return;
      }

      await exportBreakdownRecordsToCSV(data);
      setAlert({
        type: "success",
        message: `Successfully exported ${data.length} records to CSV`,
      });
    } catch (error) {
      console.error("Export error:", error);
      setAlert({ type: "error", message: `Export failed: ${error.message}` });
    }
  };

  return (
    <div className="records-container">
      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}
      <div className="records-header">
        <h2 className="section-header">Breakdown Records</h2>
        <div className="header-actions">
          {onRefresh && (
            <button
              className="btn btn-secondary refresh-btn"
              onClick={onRefresh}
              aria-label="Refresh records"
            >
              🔄 Refresh
            </button>
          )}
          <button
            className="btn btn-primary export-btn"
            onClick={handleExportCSV}
            aria-label="Export records to CSV"
            disabled={data.length === 0}
          >
            📥 Download
          </button>
        </div>
      </div>

      {data.length === 0 ? (
        <div className="no-records">
          <div className="no-records-icon">📋</div>
          <h3>No Records Found</h3>
          <p>Add your first breakdown record using the Data Entry tab.</p>
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="desktop-table">
            <div className="table-wrapper">
              <table role="table">
                <thead>
                  <tr role="row">
                    <th scope="col">Date</th>
                    <th scope="col">Executive</th>
                    <th scope="col">Shift</th>
                    <th scope="col">Machine</th>
                    <th scope="col">Category</th>
                    <th scope="col">Description</th>
                    <th scope="col">Delay (hrs)</th>
                    <th scope="col">Priority</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((record) => (
                    <tr key={record.id}>
                      <td data-label="Date">{formatDate(record.date)}</td>
                      <td data-label="Executive">{record.executive}</td>
                      <td data-label="Shift">{record.shift}</td>
                      <td data-label="Machine">{record.machine}</td>
                      <td data-label="Category">{record.category}</td>
                      <td data-label="Description" title={record.description}>
                        {truncateText(record.description, 40)}
                      </td>
                      <td data-label="Delay">{record.delayTime}h</td>
                      <td data-label="Priority">
                        <span
                          className={`priority-badge priority-${record.priority.toLowerCase()}`}
                        >
                          {record.priority}
                        </span>
                      </td>
                      <td data-label="Actions">
                        <div className="action-buttons">
                          <button
                            className="btn-icon btn-edit-icon"
                            onClick={() => handleEdit(record)}
                            aria-label="Edit record"
                            title="Edit Record"
                          >
                            ✏️
                          </button>
                          <button
                            className="btn-icon btn-delete-icon"
                            onClick={() => handleDeleteClick(record.id)}
                            aria-label="Delete record"
                            title="Delete Record"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Card View */}
          <div className="mobile-cards">
            {data.map((record) => (
              <div key={record.id} className="record-card">
                <div className="card-header">
                  <div className="card-date">{formatDate(record.date)}</div>
                  <div className="card-actions">
                    <button
                      className="btn-icon btn-edit-icon"
                      onClick={() => handleEdit(record)}
                      aria-label="Edit record"
                      title="Edit Record"
                    >
                      ✏️
                    </button>
                    <button
                      className="btn-icon btn-delete-icon"
                      onClick={() => handleDeleteClick(record.id)}
                      aria-label="Delete record"
                      title="Delete Record"
                    >
                      🗑️
                    </button>
                  </div>
                </div>

                <div className="card-content">
                  <div className="card-row">
                    <span className="card-label">Executive:</span>
                    <span className="card-value">{record.executive}</span>
                  </div>
                  <div className="card-row">
                    <span className="card-label">Shift:</span>
                    <span className="card-value">{record.shift}</span>
                  </div>
                  <div className="card-row">
                    <span className="card-label">Machine:</span>
                    <span className="card-value">{record.machine}</span>
                  </div>
                  <div className="card-row">
                    <span className="card-label">Category:</span>
                    <span className="card-value">{record.category}</span>
                  </div>
                  <div className="card-row">
                    <span className="card-label">Delay:</span>
                    <span className="card-value">{record.delayTime}h</span>
                  </div>
                  <div className="card-row">
                    <span className="card-label">Priority:</span>
                    <span
                      className={`priority-badge priority-${record.priority.toLowerCase()}`}
                    >
                      {record.priority}
                    </span>
                  </div>

                  {(record.description ||
                    record.spareParts ||
                    record.resolution) && (
                    <button
                      className="expand-btn"
                      onClick={() => toggleExpand(record.id)}
                    >
                      {expandedRecord === record.id
                        ? "Show Less ▲"
                        : "Show More ▼"}
                    </button>
                  )}

                  {expandedRecord === record.id && (
                    <div className="expanded-content">
                      {record.description && (
                        <div className="card-row">
                          <span className="card-label">Description:</span>
                          <span className="card-value">
                            {record.description}
                          </span>
                        </div>
                      )}
                      {record.spareParts && (
                        <div className="card-row">
                          <span className="card-label">Spare Parts:</span>
                          <span className="card-value">
                            {record.spareParts}
                          </span>
                        </div>
                      )}
                      {record.resolution && (
                        <div className="card-row">
                          <span className="card-label">Resolution:</span>
                          <span className="card-value">
                            {record.resolution}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Confirm Delete</h3>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete this breakdown record?</p>
              <p className="warning-text">This action cannot be undone.</p>
            </div>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={cancelDelete}>
                Cancel
              </button>
              <button
                className="btn btn-danger"
                onClick={() => confirmDelete(deleteConfirm)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Records;
