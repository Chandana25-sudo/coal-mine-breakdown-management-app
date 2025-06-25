import React, { useState } from "react";
import Alert from "../common/Alert";
import { testFirebaseConnection } from "../../utils/testFirebase";

const DataEntry = ({ onAddRecord, data, loading }) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    executive: "",
    shift: "",
    machine: "",
    machineOther: "",
    category: "",
    categoryOther: "",
    description: "",
    delayTime: "",
    priority: "",
    spareParts: "",
    resolution: "",
  });

  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [alert, setAlert] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const executives = ["Yeshwanth", "Adarsh", "Deepak"];

  const shifts = [
    { value: "General (8am-5pm)", label: "General Shift (8am to 5pm)" },
    { value: "Evening (4pm-12pm)", label: "Evening Shift (4pm to 12pm)" },
    { value: "Night (12am-8am)", label: "Night Shift (12am to 8am)" },
  ];

  const machines = [
    "SDL",
    "LHD",
    "Drill Machine",
    "Coal Cutter",
    "Conveyor Belt",
    "Pump",
    "Fan",
    "Other",
  ];

  const categories = [
    "Electrical",
    "Mechanical",
    "Hydraulic",
    "Engine",
    "Structural",
    "Other",
  ];

  const priorities = ["Low", "Medium", "High"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.executive) newErrors.executive = "Executive name is required";
    if (!formData.shift) newErrors.shift = "Shift is required";
    if (!formData.machine) newErrors.machine = "Machine is required";
    if (formData.machine === "Other" && !formData.machineOther) {
      newErrors.machine = "Please specify the machine";
    }
    if (!formData.category) newErrors.category = "Category is required";
    if (formData.category === "Other" && !formData.categoryOther) {
      newErrors.category = "Please specify the category";
    }
    if (!formData.delayTime || formData.delayTime < 0) {
      newErrors.delayTime = "Valid delay time is required";
    }
    if (!formData.priority) newErrors.priority = "Priority is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setAlert({ type: "error", message: "Please fix the errors below" });
      return;
    }

    setIsSubmitting(true);
    setAlert(null);

    try {
      const submitData = {
        ...formData,
        machine:
          formData.machine === "Other"
            ? formData.machineOther
            : formData.machine,
        category:
          formData.category === "Other"
            ? formData.categoryOther
            : formData.category,
      };

      await onAddRecord(submitData);
      setAlert({
        type: "success",
        message: "Breakdown record successfully recorded!",
      });
      resetForm();
    } catch (error) {
      setAlert({
        type: "error",
        message: "Failed to save record. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      date: new Date().toISOString().split("T")[0],
      executive: "",
      shift: "",
      machine: "",
      machineOther: "",
      category: "",
      categoryOther: "",
      description: "",
      delayTime: "",
      priority: "",
      spareParts: "",
      resolution: "",
    });
    setErrors({});
  };

  const cancelEdit = () => {
    setIsEditing(false);
    resetForm();
  };

  const handleTestFirebase = async () => {
    setAlert({ type: "info", message: "Testing Firebase connection..." });
    const result = await testFirebaseConnection();

    if (result.success) {
      setAlert({
        type: "success",
        message: `✅ ${result.message}`,
      });
    } else {
      setAlert({
        type: "error",
        message: `❌ ${result.message}`,
      });
    }
  };

  return (
    <section className="form-section">
      <h2 className="section-header">Breakdown Data Entry</h2>
      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="date">Date *</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
              aria-describedby="date-error"
            />
            {errors.date && (
              <div id="date-error" className="error-message" aria-live="polite">
                {errors.date}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="executive">Executive Name *</label>
            <select
              id="executive"
              name="executive"
              value={formData.executive}
              onChange={handleInputChange}
              required
              aria-describedby="executive-error"
            >
              <option value="">Select Executive</option>
              {executives.map((exec) => (
                <option key={exec} value={exec}>
                  {exec}
                </option>
              ))}
            </select>
            {errors.executive && (
              <div
                id="executive-error"
                className="error-message"
                aria-live="polite"
              >
                {errors.executive}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="shift">Shift *</label>
            <select
              id="shift"
              name="shift"
              value={formData.shift}
              onChange={handleInputChange}
              required
              aria-describedby="shift-error"
            >
              <option value="">Select Shift</option>
              {shifts.map((shift) => (
                <option key={shift.value} value={shift.value}>
                  {shift.label}
                </option>
              ))}
            </select>
            {errors.shift && (
              <div
                id="shift-error"
                className="error-message"
                aria-live="polite"
              >
                {errors.shift}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="machine">Machine/Equipment *</label>
            <select
              id="machine"
              name="machine"
              value={formData.machine}
              onChange={handleInputChange}
              required
              aria-describedby="machine-error"
            >
              <option value="">Select Machine</option>
              {machines.map((machine) => (
                <option key={machine} value={machine}>
                  {machine}
                </option>
              ))}
            </select>
            {formData.machine === "Other" && (
              <input
                type="text"
                name="machineOther"
                value={formData.machineOther}
                onChange={handleInputChange}
                placeholder="Specify other machine"
                className="hidden-input"
                aria-label="Specify other machine"
              />
            )}
            {errors.machine && (
              <div
                id="machine-error"
                className="error-message"
                aria-live="polite"
              >
                {errors.machine}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="category">Breakdown Category *</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
              aria-describedby="category-error"
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {formData.category === "Other" && (
              <input
                type="text"
                name="categoryOther"
                value={formData.categoryOther}
                onChange={handleInputChange}
                placeholder="Specify other category"
                className="hidden-input"
                aria-label="Specify other category"
              />
            )}
            {errors.category && (
              <div
                id="category-error"
                className="error-message"
                aria-live="polite"
              >
                {errors.category}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="delayTime">Delay Time (Hours) *</label>
            <input
              type="number"
              id="delayTime"
              name="delayTime"
              value={formData.delayTime}
              onChange={handleInputChange}
              min="0"
              step="0.1"
              required
              aria-describedby="delayTime-error"
            />
            {errors.delayTime && (
              <div
                id="delayTime-error"
                className="error-message"
                aria-live="polite"
              >
                {errors.delayTime}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="priority">Maintenance Priority *</label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
              required
              aria-describedby="priority-error"
            >
              <option value="">Select Priority</option>
              {priorities.map((priority) => (
                <option key={priority} value={priority}>
                  {priority}
                </option>
              ))}
            </select>
            {errors.priority && (
              <div
                id="priority-error"
                className="error-message"
                aria-live="polite"
              >
                {errors.priority}
              </div>
            )}
          </div>

          <div className="form-group full-width">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Detailed breakdown description (optional)"
            />
          </div>

          <div className="form-group full-width">
            <label htmlFor="spareParts">Spare Parts Used</label>
            <input
              type="text"
              id="spareParts"
              name="spareParts"
              value={formData.spareParts}
              onChange={handleInputChange}
              placeholder="List spare parts used (optional)"
            />
          </div>

          <div className="form-group full-width">
            <label htmlFor="resolution">Resolution Method</label>
            <textarea
              id="resolution"
              name="resolution"
              value={formData.resolution}
              onChange={handleInputChange}
              placeholder="Describe how the issue was resolved (optional)"
            />
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Saving..."
              : isEditing
              ? "Update Breakdown Report"
              : "Submit Breakdown Report"}
          </button>
          {isEditing && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={cancelEdit}
              style={{ marginLeft: "15px" }}
            >
              Cancel Edit
            </button>
          )}
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleTestFirebase}
            style={{ marginLeft: "15px" }}
          >
            🔥 Test Firebase
          </button>
        </div>
      </form>
    </section>
  );
};

export default DataEntry;
