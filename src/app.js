import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRouter from './routers/userRouts.js'; // User routes import
import applicantRouter from './routers/applicantRouts.js';
import jobRoutes from './routers/postJobsRoutes.js'
import eventRoutes from './routers/eventRoutes.js'
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));
app.use(cookieParser());

// Routes declaration----->
try {
  app.use('/api/v1/users', userRouter);
} catch (error) {
  console.log('Error while setting up user routes:', error); 
}

try {
  app.use('/api/v1/Applicants', applicantRouter);
} catch (error) {
  console.log('Error while setting up applicant routes:', error); 
}
try {
  app.use('/api/v1/jobs', jobRoutes);
  
} catch (error) {
  console.log('Error while setting up jobs routes:', error); 

}
try {
  app.use('/api/v1/events', eventRoutes);
  
} catch (error) {
  console.log('Error while setting up event routes:', error); 
  
}

export { app };
