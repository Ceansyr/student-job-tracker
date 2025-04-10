import express from 'express';
import { addJob, getAllJobs, updateJob, deleteJob } from '../controllers/jobController.js';
import { jobSchema } from '../validators/jobValidator.js';
import { validateJob } from '../middlewares/jobValidator.js';

const router = express.Router();

router.post('/', validateJob(jobSchema), addJob);
router.get('/', getAllJobs);
router.patch('/:id', updateJob);
router.delete('/:id', deleteJob);

export default router;
