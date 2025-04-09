import Job from '../models/Jobs.js'

// @desc Add a new job
export const addJob = async (req, res) => {
  try {
    const job = new Job(req.body)
    const savedJob = await job.save()
    res.status(201).json(savedJob)
  } catch (error) {
    next(error);
  }
}

// @desc Get all jobs
export const getAllJobs = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const { status, sort } = req.query

    const filter = status ? { status } : {}
    const sortOption = sort === 'date' ? { appliedDate: -1 } : {}

    const jobs = await Job.find(filter)
      .sort(sortOption)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const totalJobs = await Job.countDocuments();

    res.status(200).json({
      total: totalJobs,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(totalJobs / limit),
      data: jobs,
    });
  } catch (error) {
    next(error);
  }
}

// @desc Update job status
export const updateJobStatus = async (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body

    const job = await Job.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    )

    if (!job) return res.status(404).json({ error: 'Job not found' })

    res.status(200).json(job)
  } catch (error) {
    next(error);
  }
}

// @desc Delete job
export const deleteJob = async (req, res) => {
  try {
    const { id } = req.params
    const job = await Job.findByIdAndDelete(id)

    if (!job) return res.status(404).json({ error: 'Job not found' })

    res.status(200).json({ message: 'Job deleted successfully' })
  } catch (error) {
    next(error);
  }
}
