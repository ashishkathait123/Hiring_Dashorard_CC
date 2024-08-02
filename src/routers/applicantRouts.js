import { Router } from "express";
import { createApplicant, getApplicants } from "../controllers/applicant.controller.js";
import upload from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/").post(
  upload.fields([
    { name: "profilePicture", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  createApplicant
);

router.route("/").get(getApplicants);

export default router;
