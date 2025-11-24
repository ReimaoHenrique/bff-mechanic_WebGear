import { Router } from "express";
import multer from "multer";
import { getProfile, updateProfile } from "./user.controller";

const router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

router.get("/me", getProfile);
router.put("/me", upload.single("picture"), updateProfile);     

export default router;
