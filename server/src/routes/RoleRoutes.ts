import { seedRole, getAllRoles } from "../controllers/RoleController";
import express from "express";

const router = express.Router();

router.get("/", getAllRoles);
router.get("/seed", seedRole);

export default router;
