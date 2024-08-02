import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  responsibilities: String,
  whoYouAre: String,
  niceToHaves: String,
  perksBenefits: String,
  categories: String,
  applyBefore: Date,
  salary: String,
  postDate: Date,
}, { timestamps: true });

export const Job = mongoose.model('Job', jobSchema);
 
