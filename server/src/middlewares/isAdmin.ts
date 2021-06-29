import { NextFunction, Response } from "express";
import { RoleType } from "../types/RoleTypes";
import { Forbidden } from "../errors/Forbidden";
import { AuthRequest } from "../types/AuthRequest";
export const isAdmin = async (
  req: AuthRequest,
  _res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Forbidden();
    }

    if (!user) {
      throw new Forbidden();
    }
    if (user.role.name !== RoleType.admin) {
      throw new Forbidden();
    }

    next();
  } catch (error) {
    return next(error);
  }
};
