import {
  getMyProject,
  createProject,
  deleteProject,
  getDashboardDetail,
  updateProject,
} from "../controllers/ProjectController";
import express from "express";

const router = express.Router();

router.get("/", getMyProject);
router.get("/dashboard", getDashboardDetail);
router.post("/", createProject);
router.patch("/:id", updateProject);
router.delete("/:id", deleteProject);

export default router;
