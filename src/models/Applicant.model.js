import mongoose, { Schema, modelNames } from "mongoose";

const applicantSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    jobTitle: { type: String, required: true },
    linkedin: { type: String, required: true },
    portfolio: { type: String, required: true },
    additionalInfo: { type: String, required: true },
    profilePicture: { type: String, required: true },
    resume: { type: String, required: true },
    address: { type: String, required: true },
    technicalSkills: { type: String, required: true },
    certifications: { type: String, required: true },
    yearsOfExperience: { type: String, required: true },
    noticePeriod: { type: String, required: true },
    currentCTC: { type: String, required: true },
    ApplyFor: { type: String },
    FormSubmitDate: { type: String, required: true },
    instagram: {
      type: String,
    },
    twitter: {
      type: String,
    },
    dob: {
      type: String,
    },
    language: {
      type: String,
    },
    gender: {
      type: String,
    },
    jobId: { type: Schema.Types.ObjectId, ref: "Job", required:true },
  },
  { timestamps: true }
);

export const Applicant = mongoose.model("Applicant", applicantSchema);

// export default Applicant;
