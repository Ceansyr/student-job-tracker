const detectDuplicateApplications = (applications) => {
  const seen = new Set();
  const duplicates = [];

  for (const app of applications) {
    const { company, role } = app;

    if (!company || !role) {
      throw new Error('Each application must have both "company" and "role" fields.');
    }

    const key = `${company.trim().toLowerCase()}-${role.trim().toLowerCase()}`;

    if (seen.has(key)) {
      duplicates.push(app);
    } else {
      seen.add(key);
    } 
  }

  return duplicates.length > 0
    ? { status: 'duplicates found', duplicates }
    : { status: 'no duplicates found' };
}

const applications = [
  { company: 'Google', role: 'Software Engineer' },
  { company: 'Amazon', role: 'Data Scientist' },
  { company: 'google', role: 'software engineer' }, 
  { company: 'Netflix', role: 'Frontend Developer' },
];

try {
  const result = detectDuplicateApplications(applications);
  console.log(result);
} catch (err) {
  console.error('Error:', err.message);
}
