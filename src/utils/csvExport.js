// CSV Export Utility Functions

/**
 * Convert array of objects to CSV string
 * @param {Array} data - Array of breakdown records
 * @returns {string} CSV formatted string
 */
export const convertToCSV = (data) => {
  if (!data || data.length === 0) {
    return "";
  }

  // Define CSV headers
  const headers = [
    "Date",
    "Executive",
    "Shift",
    "Machine/Equipment",
    "Breakdown Category",
    "Description",
    "Delay Time (Hours)",
    "Maintenance Priority",
    "Spare Parts Used",
    "Resolution Method",
    "Created At",
  ];

  // Create CSV header row
  const csvHeaders = headers.join(",");

  // Convert data rows to CSV format
  const csvRows = data.map((record) => {
    const row = [
      formatDateForCSV(record.date),
      escapeCSVField(record.executive || ""),
      escapeCSVField(record.shift || ""),
      escapeCSVField(record.machine || ""),
      escapeCSVField(record.category || ""),
      escapeCSVField(record.description || ""),
      record.delayTime || "0",
      escapeCSVField(record.priority || ""),
      escapeCSVField(record.spareParts || ""),
      escapeCSVField(record.resolution || ""),
      formatDateTimeForCSV(record.createdAt || record.timestamp),
    ];
    return row.join(",");
  });

  // Combine headers and rows
  return [csvHeaders, ...csvRows].join("\n");
};

/**
 * Escape CSV field to handle commas, quotes, and newlines
 * @param {string} field - Field value to escape
 * @returns {string} Escaped field value
 */
const escapeCSVField = (field) => {
  if (field === null || field === undefined) {
    return "";
  }

  const stringField = String(field);

  // If field contains comma, quote, or newline, wrap in quotes and escape internal quotes
  if (
    stringField.includes(",") ||
    stringField.includes('"') ||
    stringField.includes("\n")
  ) {
    return `"${stringField.replace(/"/g, '""')}"`;
  }

  return stringField;
};

/**
 * Format date for CSV (YYYY-MM-DD format)
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date string
 */
const formatDateForCSV = (date) => {
  if (!date) return "";

  try {
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) return "";

    return dateObj.toISOString().split("T")[0]; // YYYY-MM-DD format
  } catch (error) {
    return "";
  }
};

/**
 * Format datetime for CSV (YYYY-MM-DD HH:MM:SS format)
 * @param {string|Date|Object} datetime - DateTime to format
 * @returns {string} Formatted datetime string
 */
const formatDateTimeForCSV = (datetime) => {
  if (!datetime) return "";

  try {
    let dateObj;

    // Handle Firestore Timestamp objects
    if (datetime && typeof datetime === "object" && datetime.toDate) {
      dateObj = datetime.toDate();
    } else {
      dateObj = new Date(datetime);
    }

    if (isNaN(dateObj.getTime())) return "";

    return dateObj
      .toLocaleString("en-CA", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      })
      .replace(",", "");
  } catch (error) {
    return "";
  }
};

/**
 * Download CSV file
 * @param {string} csvContent - CSV content string
 * @param {string} filename - Filename for download
 */
export const downloadCSV = (csvContent, filename = null) => {
  if (!csvContent) {
    throw new Error("No data to export");
  }

  // Generate filename if not provided
  if (!filename) {
    const now = new Date();
    const timestamp = now
      .toISOString()
      .replace(/[:.]/g, "-")
      .replace("T", "-")
      .substring(0, 19);
    filename = `breakdown-records-${timestamp}.csv`;
  }

  // Create blob and download link
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");

  if (link.download !== undefined) {
    // Create download link
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";

    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up URL object
    URL.revokeObjectURL(url);
  } else {
    // Fallback for older browsers
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    URL.revokeObjectURL(url);
  }
};

/**
 * Export breakdown records to CSV
 * @param {Array} data - Array of breakdown records
 * @param {string} filename - Optional filename
 * @returns {Promise} Promise that resolves when export is complete
 */
export const exportBreakdownRecordsToCSV = async (data, filename = null) => {
  try {
    if (!data || data.length === 0) {
      throw new Error("No records to export");
    }

    const csvContent = convertToCSV(data);
    downloadCSV(csvContent, filename);

    return {
      success: true,
      message: `Successfully exported ${data.length} records to CSV`,
      recordCount: data.length,
    };
  } catch (error) {
    throw new Error(`Export failed: ${error.message}`);
  }
};
