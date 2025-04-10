import { useEffect, useState } from 'react';

const JobTracker = () => {
  // State for job list and filtering
  const [jobs, setJobs] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [viewingJob, setViewingJob] = useState(null); // Add this new state for viewing job details
  
  // State for add job form
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    status: 'applied',
    appliedDate: '',
  });

  // Fetch jobs with optional filters
  const fetchJobs = async () => {
    try {
      let url = `${import.meta.env.VITE_API_URL}/jobs?`;
      if (statusFilter) url += `status=${statusFilter}&`;
      if (dateFilter) url += `appliedDate=${dateFilter}&`; // Changed from 'date' to 'appliedDate'

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

  // Handle form input changes for adding a job
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Submit new job application
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

      // Show success message
      const notification = document.createElement('div');
      notification.className = 'notification success';
      notification.textContent = '✅ Job application added successfully!';
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 3000);

      // Reset form
      setFormData({
        title: '',
        company: '',
        location: '',
        status: 'applied',
        appliedDate: '',
      });

      // Refresh job list
      fetchJobs();
    } catch (err) {
      console.error('❌ Error:', err.message);

      // Show error message
      const notification = document.createElement('div');
      notification.className = 'notification error';
      notification.textContent = `❌ Error: ${err.message}`;
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 3000);
    }
  };

  // Update existing job
  const handleUpdate = async (updatedJob) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/jobs/${updatedJob._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedJob),
      });
      
      if (!res.ok) throw new Error('Failed to update job');
      
      // Show success message
      const notification = document.createElement('div');
      notification.className = 'notification success';
      notification.textContent = '✅ Job updated successfully!';
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 3000);
      
      setSelectedJob(null);
      fetchJobs();
    } catch (err) {
      console.error(err.message);
      
      // Show error message
      const notification = document.createElement('div');
      notification.className = 'notification error';
      notification.textContent = `❌ Error: ${err.message}`;
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 3000);
    }
  };

  // Delete job
  const handleDelete = async (jobId) => {
    if (!confirm('Are you sure you want to delete this job application?')) return;
    
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/jobs/${jobId}`, {
        method: 'DELETE',
      });
      
      if (!res.ok) throw new Error('Failed to delete job');
      
      // Show success message
      const notification = document.createElement('div');
      notification.className = 'notification success';
      notification.textContent = '✅ Job deleted successfully!';
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 3000);
      
      fetchJobs();
    } catch (err) {
      console.error(err.message);
      
      // Show error message
      const notification = document.createElement('div');
      notification.className = 'notification error';
      notification.textContent = `❌ Error: ${err.message}`;
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 3000);
    }
  };

  // Helper function to determine status badge class (moved outside of JobCard)
  const getStatusClass = (status) => {
    switch(status.toLowerCase()) {
      case 'applied': return 'status-applied';
      case 'interview': return 'status-interview';
      case 'offer': return 'status-offer';
      case 'rejected': return 'status-rejected';
      default: return '';
    }
  };

  // Job card component
  const JobCard = ({ job }) => {
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
          <button className="view-btn" onClick={() => setViewingJob(job)}>View</button>
          <button className="edit-btn" onClick={() => setSelectedJob(job)}>Edit</button>
          <button className="delete-btn" onClick={() => handleDelete(job._id)}>Delete</button>
        </div>
      </div>
    );
  };

  // Update modal component
  const UpdateModal = ({ job }) => {
    const [formData, setFormData] = useState({ ...job });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

    return (
      <div className="modal-overlay">
        <div className="modal">
          <h2>Update Job Application</h2>
          <form className="update-form">
            <div className="form-group">
              <label htmlFor="title">Role</label>
              <input 
                type="text" 
                id="title" 
                name="title" 
                value={formData.title} 
                onChange={handleChange} 
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="company">Company</label>
              <input 
                type="text" 
                id="company" 
                name="company" 
                value={formData.company} 
                onChange={handleChange} 
                required 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input 
                type="text" 
                id="location" 
                name="location" 
                value={formData.location || ''} 
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
              <label htmlFor="appliedDate">Date of Application</label>
              <input 
                type="date" 
                id="appliedDate" 
                name="appliedDate" 
                value={formData.appliedDate.split('T')[0]} 
                onChange={handleChange} 
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="link">Application Link</label>
              <input 
                type="url" 
                id="link" 
                name="link" 
                value={formData.link || ''} 
                onChange={handleChange} 
                placeholder="https://..." 
              />
            </div>
            
            <div className="modal-actions">
              <button type="button" className="save-btn" onClick={() => handleUpdate(formData)}>Save</button>
              <button type="button" className="cancel-btn" onClick={() => setSelectedJob(null)}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // View job details modal component
  const ViewModal = ({ job }) => {
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
              setSelectedJob(job);
              setViewingJob(null);
            }}>Edit</button>
            <button type="button" className="cancel-btn" onClick={() => setViewingJob(null)}>Close</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="job-tracker">
      <header className="navbar">
        <h1>Job Tracker</h1>
      </header>

      <main className="container">
        <section className="add-job-section">
          <h2>Add Job Application</h2>
          <form onSubmit={handleSubmit} className="job-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="company">Company</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
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
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="title">Role</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="appliedDate">Date of Application</label>
                <input
                  type="date"
                  id="appliedDate"
                  name="appliedDate"
                  value={formData.appliedDate}
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>
              
              <div className="form-group">
                <button type="submit" className="add-btn">Add</button>
              </div>
            </div>
          </form>
        </section>

        <section className="job-list-section">
          <div className="section-header">
            <h2>Job Applications</h2>
            <div className="filter-controls">
              <select
                className="filter-select"
                onChange={(e) => setStatusFilter(e.target.value)}
                value={statusFilter}
              >
                <option value="">Status</option>
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
                placeholder="Date"
              />
            </div>
          </div>

          <div className="job-grid">
            {(!jobs || jobs.length === 0) ? (
              <p className="empty-message">No job applications found.</p>
            ) : (
              jobs.map((job) => <JobCard key={job._id} job={job} />)
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