import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
 
const router = Router();

router 
  .route("/signUp")
  .post(upload.fields([{ name: "profile", maxCount: 1 }]), registerUser);
router.route("/login").post(loginUser);

// secured user
router.route("/logout").post(verifyJwt, logoutUser);
export default router;
