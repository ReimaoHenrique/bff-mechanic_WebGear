import { Router } from "express";
import { getProfile } from "./user.controller";

const router = Router();

router.get("/me", getProfile);

export default router;
