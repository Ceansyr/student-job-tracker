const JobCard = ({ job, onView, onEdit, onDelete }) => {
  const getStatusClass = (status) => {
    switch(status.toLowerCase()) {
      case 'applied': return 'status-applied';
      case 'interview': return 'status-interview';
      case 'offer': return 'status-offer';
      case 'rejected': return 'status-rejected';
      default: return '';
    }
  };

  return (
    <div className="job-card">
      <div className="job-info">
        <h3 className="job-title">{job.title}</h3>
        <p className="job-company">{job.company}</p>
      </div>
      <span className={`status-badge ${getStatusClass(job.status)}`}>
        {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
      </span>
      <p className="job-date">{new Date(job.appliedDate).toLocaleDateString()}</p>
      <div className="job-actions">
        <button className="view-btn" onClick={() => onView(job)}>View</button>
        <button className="edit-btn" onClick={() => onEdit(job)}>Edit</button>
        <button className="delete-btn" onClick={() => onDelete(job._id)}>Delete</button>
      </div>
    </div>
  );
};

export default JobCard;