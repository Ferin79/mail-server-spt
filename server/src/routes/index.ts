import { isAuth } from "../middlewares/isAuth";
import { NotFound } from "../errors/NotFound";
import RoleRouter from "./RoleRoutes";
import UserRouter from "./UserRoutes";
import ProjectRouter from "./ProjectRoutes";
import MailRouter from "./MailRoutes";

import express, { Request, Response, NextFunction } from "express";

const router = express.Router();

router.use("/role", RoleRouter);
router.use("/user", UserRouter);
router.use("/project", isAuth, ProjectRouter);
router.use("/mail", MailRouter);

router.get("/healthCheck", (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "API IS WORKING",
  });
});

router.use("*", (req: Request, _res: Response, next: NextFunction) => {
  next(new NotFound("API", req.originalUrl));
});

export default router;
