import { upload } from "./../configs/multer";
import { isAuth } from "./../middlewares/isAuth";
import {
  handleMail,
  getAllMailSendByProjectId,
} from "./../controllers/MailController";
import express from "express";

const router = express.Router();

router.get("/:id", isAuth, getAllMailSendByProjectId);
router.post("/", upload.fields([{ name: "files", maxCount: 10 }]), handleMail);

export default router;
