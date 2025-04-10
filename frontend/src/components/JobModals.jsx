import { useState } from 'react';

export const UpdateModal = ({ job, onUpdate, onClose }) => {
  const [updateData, setUpdateData] = useState({
    title: job.title,
    company: job.company,
    location: job.location || '',
    status: job.status,
    appliedDate: job.appliedDate.split('T')[0],
  });

  const handleUpdateChange = (e) => {
    setUpdateData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    onUpdate({ _id: job._id, ...updateData });
  };

  const GET_STATUS_CLASS = (status) => {
    switch(status.toLowerCase()) {
      case 'applied': return 'status-applied';
      case 'interview': return 'status-interview';
      case 'offer': return 'status-offer';
      case 'rejected': return 'status-rejected';
      default: return '';
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Update Job</h2>
        <form className="update-form" onSubmit={handleUpdateSubmit}>
          <div className="form-group">
            <label htmlFor="update-title">Job Title</label>
            <input
              id="update-title"
              name="title"
              type="text"
              value={updateData.title}
              onChange={handleUpdateChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="update-company">Company</label>
            <input
              id="update-company"
              name="company"
              type="text"
              value={updateData.company}
              onChange={handleUpdateChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="update-location">Location</label>
            <input
              id="update-location"
              name="location"
              type="text"
              value={updateData.location}
              onChange={handleUpdateChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="update-status">Status</label>
            <select
              id="update-status"
              name="status"
              value={updateData.status}
              onChange={handleUpdateChange}
              required
            >
              <option value="applied">Applied</option>
              <option value="interview">Interview</option>
              <option value="offer">Offer</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="update-date">Date Applied</label>
            <input
              id="update-date"
              name="appliedDate"
              type="date"
              value={updateData.appliedDate}
              onChange={handleUpdateChange}
              required
            />
          </div>
          <div className="modal-actions">
            <button type="submit" className="save-btn">Save</button>
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const ViewModal = ({ job, onEdit, onClose }) => {
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
    <div className="modal-overlay">
      <div className="modal">
        <h2>Job Details</h2>
        <div className="job-details">
          <div className="detail-group">
            <label>Role:</label>
            <p>{job.title}</p>
          </div>
          
          <div className="detail-group">
            <label>Company:</label>
            <p>{job.company}</p>
          </div>
          
          <div className="detail-group">
            <label>Location:</label>
            <p>{job.location || 'Not specified'}</p>
          </div>
          
          <div className="detail-group">
            <label>Status:</label>
            <p className={`status-text ${getStatusClass(job.status)}`}>
              {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
            </p>
          </div>
          
          <div className="detail-group">
            <label>Date Applied:</label>
            <p>{new Date(job.appliedDate).toLocaleDateString()}</p>
          </div>
          
          {job.link && (
            <div className="detail-group">
              <label>Application Link:</label>
              <a href={job.link} target="_blank" rel="noopener noreferrer">{job.link}</a>
            </div>
          )}
        </div>
        
        <div className="modal-actions">
          <button type="button" className="edit-btn" onClick={() => {
            onEdit(job);
            onClose();
          }}>Edit</button>
          <button type="button" className="cancel-btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};