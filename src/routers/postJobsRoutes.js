import express from 'express';
import {
    createJob,
    getAllJobs,
    getJobById,
    updateJob,
    deleteJob,
  } from '../controllers/jobPost.controller.js'
import { verifyJwt } from '../middlewares/auth.middleware.js';

  const router = express.Router();

// Public routes
router.get('/', getAllJobs);
router.get('/:id', getJobById);

// Protected routes with role-based authorization
router.post('/', verifyJwt(['admin']), createJob); 
router.put('/:id', verifyJwt(['admin']), updateJob); 
router.delete('/:id', verifyJwt(['admin']), deleteJob); 

export default router;
