import { asyncHandler } from "../utils/asyncHandler.js";
import  {Applicant} from "../models/Applicant.model.js"
import { ApiError } from "../utils/ApiError.1.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadonCloudnary } from "../utils/cloudnary.js";

const createApplicant = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    jobTitle,
    linkedin,
    portfolio,
    additionalInfo,
    address,
    technicalSkills,
    certifications,
    yearsOfExperience,
    noticePeriod,
    currentCTC,
    ApplyFor,
    FormSubmitDate,
    instagram,
    twitter,
    dob,
    language,
    gender,
    jobId
  } = req.body;

  const profilePicturePath = req.files?.profilePicture?.[0]?.path;
  const resumePath = req.files?.resume?.[0]?.path;

  if (!profilePicturePath)
    throw new ApiError(400, "Profile picture is required");
  if (!resumePath) throw new ApiError(400, "Resume is required");

  let profilePicture, resume;
  try {
    profilePicture = await uploadonCloudnary(profilePicturePath);
    resume = await uploadonCloudnary(resumePath);
  } catch (error) {
    console.error("Error uploading files to Cloudinary:", error);
    throw new ApiError(500, "File upload failed");
  }

  const newApplicant = new Applicant({
    firstName,
    lastName,
    email,
    phone,
    jobTitle,
    linkedin,
    portfolio,
    additionalInfo,
    profilePicture: profilePicture.url,
    resume: resume.url,
    address,
    technicalSkills,
    certifications,
    yearsOfExperience,
    noticePeriod,
    currentCTC,
    ApplyFor,
    FormSubmitDate,
    instagram,
    twitter,
    dob,
    language,
    gender,
    jobId
  });

  try {
    await newApplicant.save();
    res
      .status(201)
      .json(new ApiResponse(201, "Applicant created successfully"));
  } catch (error) {
    console.error("Error saving applicant:", error);
    res.status(500).json(new ApiResponse(500, "Form submission failed"));
  }
});


const getApplicants = asyncHandler(async (req, res) => {
  try {
    const applicants = await Applicant.find({});
    res
      .status(200)
      .json(
        new ApiResponse(200, "Applicants fetched successfully", applicants)
      );
  } catch (error) {
    console.error("Error fetching applicants:", error);
    res.status(500).json(new ApiResponse(500, "Error fetching applicants"));
  }
});

export { createApplicant, getApplicants };
