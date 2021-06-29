import { Request, Response } from "express";
import { Role } from "../models/Role";
import { RoleType } from "../types/RoleTypes";

export const seedRole = (_: Request, res: Response): void => {
  Object.keys(RoleType).forEach((item) => {
    Role.insert({
      name: item,
    });
  });
  res.status(200).json({
    success: true,
  });
};

export const getAllRoles = async (_: Request, res: Response) => {
  const roles = await Role.find();

  res.status(200).json({
    success: true,
    roles,
  });
};
