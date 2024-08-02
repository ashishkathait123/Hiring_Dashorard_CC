import {Job} from '../models/postJobs.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';


const createJob = asyncHandler(async (req, res) => {
  const job = new Job(req.body);
  await job.save();
  res.status(201).json({ message: 'Job created successfully', job });
});

const getAllJobs = asyncHandler(async (req, res) => {
  const jobs = await Job.find();
  res.status(200).json(jobs);
});


const getJobById = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) {
    return res.status(404).json({ message: 'Job not found' });
  }
  res.status(200).json(job);
});


const updateJob = asyncHandler(async (req, res) => {
  const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!job) {
    return res.status(404).json({ message: 'Job not found' });
  }

  res.status(200).json({ message: 'Job updated successfully', job });
});

// @desc    Delete job by ID

const deleteJob = asyncHandler(async (req, res) => {
  const job = await Job.findByIdAndDelete(req.params.id);

  if (!job) {
    return res.status(404).json({ message: 'Job not found' });
  }

  res.status(204).send(); 
});

export { createJob, getAllJobs, getJobById, updateJob, deleteJob };
