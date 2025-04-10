const JobFilters = ({ statusFilter, dateFilter, onStatusChange, onDateChange, onClear }) => (
  <div className="filter-controls">
    <select
      className="filter-select"
      value={statusFilter}
      onChange={(e) => onStatusChange(e.target.value)}
    >
      <option value="">All Statuses</option>
      <option value="applied">Applied</option>
      <option value="interview">Interview</option>
      <option value="offer">Offer</option>
      <option value="rejected">Rejected</option>
    </select>
    
    <input
      type="date"
      className="filter-date"
      value={dateFilter}
      onChange={(e) => onDateChange(e.target.value)}
    />
    
    {(statusFilter || dateFilter) && (
      <button className="filter-clear" onClick={onClear}>
        Clear Filters
      </button>
    )}
  </div>
);

export default JobFilters;