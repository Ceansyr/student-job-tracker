import { useState, useEffect } from 'react';
import JobForm from '../components/JobForm';
import JobCard from '../components/JobCard';
import JobFilters from '../components/JobFilters';
import { UpdateModal, ViewModal } from '../components/JobModals';
import useJobsApi from '../hooks/useJobsApi';
import useNotification from '../hooks/useNotification';

const JobTracker = () => {
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [viewingJob, setViewingJob] = useState(null);
  
  const { jobs, fetchJobs, addJob, updateJob, deleteJob } = useJobsApi(statusFilter, dateFilter);
  const showNotification = useNotification();

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs, statusFilter, dateFilter]);

  const handleSubmit = async (formData) => {
    try {
      await addJob(formData);
      showNotification('✅ Job application added successfully!', 'success');
    } catch (err) {
      showNotification(`❌ Error: ${err.message}`, 'error');
    }
  };

  const handleUpdate = async (updatedJob) => {
    try {
      await updateJob(updatedJob);
      showNotification('✅ Job updated successfully!', 'success');
      setSelectedJob(null);
    } catch (err) {
      showNotification(`❌ Error: ${err.message}`, 'error');
    }
  };

  const handleDelete = async (jobId) => {
    if (!confirm('Are you sure you want to delete this job application?')) return;
    
    try {
      await deleteJob(jobId);
      showNotification('✅ Job deleted successfully!', 'success');
    } catch (err) {
      showNotification(`❌ Error: ${err.message}`, 'error');
    }
  };

  return (
    <div className="job-tracker">
      <header className="navbar">
        <h1>Job Tracker</h1>
      </header>
      
      <main className="container">
        <JobForm onSubmit={handleSubmit} />
        
        <section className="job-list-section">
          <div className="section-header">
            <h2>Your Job Applications</h2>
            <JobFilters
              statusFilter={statusFilter}
              dateFilter={dateFilter}
              onStatusChange={setStatusFilter}
              onDateChange={setDateFilter}
              onClear={() => {
                setStatusFilter('');
                setDateFilter('');
              }}
            />
          </div>
          
          <div className="job-grid">
            {jobs.length > 0 ? (
              jobs.map((job) => (
                <JobCard
                  key={job._id}
                  job={job}
                  onView={setViewingJob}
                  onEdit={setSelectedJob}
                  onDelete={handleDelete}
                />
              ))
            ) : (
              <p className="empty-message">
                No job applications found. Add your first job application above!
              </p>
            )}
          </div>
        </section>
      </main>
      
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()}</p>
      </footer>

      {selectedJob && (
        <UpdateModal
          job={selectedJob}
          onUpdate={handleUpdate}
          onClose={() => setSelectedJob(null)}
        />
      )}
      {viewingJob && (
        <ViewModal
          job={viewingJob}
          onEdit={setSelectedJob}
          onClose={() => setViewingJob(null)}
        />
      )}
    </div>
  );
};

export default JobTracker;