import { useEffect, useState } from 'react';

const JobTracker = () => {
  const [jobs, setJobs] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [viewingJob, setViewingJob] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    status: 'applied',
    appliedDate: '',
  });

  const fetchJobs = async () => {
    try {
      let url = `${import.meta.env.VITE_API_URL}/jobs?`;
      if (statusFilter) url += `status=${statusFilter}&`;
      if (dateFilter) url += `appliedDate=${dateFilter}&`;

      const res = await fetch(url);
      const { data } = await res.json();
      setJobs(data);
    } catch (err) {
      console.error('❌ Failed to fetch jobs:', err.message);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [statusFilter, dateFilter]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/jobs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to submit job');

      showNotification('✅ Job application added successfully!', 'success');

      setFormData({
        title: '',
        company: '',
        location: '',
        status: 'applied',
        appliedDate: '',
      });

      fetchJobs();
    } catch (err) {
      console.error('❌ Error:', err.message);
      showNotification(`❌ Error: ${err.message}`, 'error');
    }
  };

  const handleUpdate = async (updatedJob) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/jobs/${updatedJob._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedJob),
      });
      
      if (!res.ok) throw new Error('Failed to update job');
      
      showNotification('✅ Job updated successfully!', 'success');
      
      setSelectedJob(null);
      fetchJobs();
    } catch (err) {
      console.error(err.message);
      showNotification(`❌ Error: ${err.message}`, 'error');
    }
  };

  const handleDelete = async (jobId) => {
    if (!confirm('Are you sure you want to delete this job application?')) return;
    
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/jobs/${jobId}`, {
        method: 'DELETE',
      });
      
      if (!res.ok) throw new Error('Failed to delete job');
      
      showNotification('✅ Job deleted successfully!', 'success');
      
      fetchJobs();
    } catch (err) {
      console.error(err.message);
      showNotification(`❌ Error: ${err.message}`, 'error');
    }
  };

  const showNotification = (message, type) => {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  };

  const getStatusClass = (status) => {
    switch(status.toLowerCase()) {
      case 'applied': return 'status-applied';
      case 'interview': return 'status-interview';
      case 'offer': return 'status-offer';
      case 'rejected': return 'status-rejected';
      default: return '';
    }
  };

  const JobCard = ({ job }) => (
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
        <button className="view-btn" onClick={() => setViewingJob(job)}>View</button>
        <button className="edit-btn" onClick={() => setSelectedJob(job)}>Edit</button>
        <button className="delete-btn" onClick={() => handleDelete(job._id)}>Delete</button>
      </div>
    </div>
  );

  const UpdateModal = ({ job }) => {
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
      handleUpdate({ _id: job._id, ...updateData });
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
              <button type="button" className="cancel-btn" onClick={() => setSelectedJob(null)}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const ViewModal = ({ job }) => (
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
            setSelectedJob(job);
            setViewingJob(null);
          }}>Edit</button>
          <button type="button" className="cancel-btn" onClick={() => setViewingJob(null)}>Close</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="job-tracker">
      <header className="navbar">
        <h1>Job Tracker</h1>
      </header>
      
      <main className="container">
        <section className="add-job-section">
          <h2>Add New Job Application</h2>
          <form className="job-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="title">Job Title</label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="company">Company</label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  value={formData.company}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="applied">Applied</option>
                  <option value="interview">Interview</option>
                  <option value="offer">Offer</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="appliedDate">Date Applied</label>
                <input
                  id="appliedDate"
                  name="appliedDate"
                  type="date"
                  value={formData.appliedDate}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            
            <button type="submit" className="add-btn">Add Job</button>
          </form>
        </section>
        
        <section className="job-list-section">
          <div className="section-header">
            <h2>Your Job Applications</h2>
            <div className="filter-controls">
              <select
                className="filter-select"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
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
                onChange={(e) => setDateFilter(e.target.value)}
              />
              
              {(statusFilter || dateFilter) && (
                <button
                  className="filter-clear"
                  onClick={() => {
                    setStatusFilter('');
                    setDateFilter('');
                  }}
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
          
          <div className="job-grid">
            {jobs.length > 0 ? (
              jobs.map((job) => <JobCard key={job._id} job={job} />)
            ) : (
              <p className="empty-message">No job applications found. Add your first job application above!</p>
            )}
          </div>
        </section>
      </main>
      
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()}</p>
      </footer>

      {selectedJob && <UpdateModal job={selectedJob} />}
      {viewingJob && <ViewModal job={viewingJob} />}
    </div>
  );
};

export default JobTracker;