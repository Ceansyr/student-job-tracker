import { useState, useCallback } from 'react';

const useJobsApi = (statusFilter = '', dateFilter = '') => {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = useCallback(async () => {
    try {
      let url = `${import.meta.env.VITE_API_URL}/jobs?`;
      if (statusFilter) url += `status=${statusFilter}&`;
      if (dateFilter) url += `appliedDate=${dateFilter}&`;

      const res = await fetch(url);
      const { data } = await res.json();
      setJobs(data);
    } catch (err) {
      console.error('❌ Failed to fetch jobs:', err.message);
      throw err;
    }
  }, [statusFilter, dateFilter]);

  const addJob = async (jobData) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/jobs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jobData),
    });
    if (!res.ok) throw new Error('Failed to submit job');
    await fetchJobs();
  };

  const updateJob = async (updatedJob) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/jobs/${updatedJob._id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedJob),
    });
    if (!res.ok) throw new Error('Failed to update job');
    await fetchJobs();
  };

  const deleteJob = async (jobId) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/jobs/${jobId}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete job');
    await fetchJobs();
  };

  return {
    jobs,
    fetchJobs,
    addJob,
    updateJob,
    deleteJob,
  };
};

export default useJobsApi;