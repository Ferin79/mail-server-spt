import { isAuth } from "./../middlewares/isAuth";
import { refreshYourToken } from "./../controllers/UserController";
import { Login, Register } from "../controllers/UserController";
import express from "express";

const router = express.Router();

router.post("/refresh/:id", isAuth, refreshYourToken);
router.post("/login", Login);
router.post("/register", Register);

export default router;
