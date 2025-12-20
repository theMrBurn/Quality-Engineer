normalizeDate.js;
// normalizeDate.js
function normalizeDate(dateStr) {
  return dateStr && dateStr.split("T")[0];
}

module.exports = normalizeDate;
