import { useState } from 'react';

const JobForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    status: 'applied',
    appliedDate: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(formData);
    setFormData({
      title: '',
      company: '',
      location: '',
      status: 'applied',
      appliedDate: '',
    });
  };

  return (
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
  );
};

export default JobForm;