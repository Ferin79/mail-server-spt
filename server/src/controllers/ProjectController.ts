import { Mail } from "./../models/Mail";
import { Unathorized } from "./../errors/Unauthorized";
import { NotFound } from "./../errors/NotFound";
import { InputError } from "../errors/InputError";
import { Project } from "../models/Project";
import { BadRequest } from "../errors/BadRequest";
import { Response } from "express";
import { NextFunction } from "express";
import { AuthRequest } from "../types/AuthRequest";
import { getConnection } from "typeorm";

export const getMyProject = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    if (!user) {
      throw new BadRequest("user cannot be null");
    }

    const projects = await getConnection()
      .getRepository(Project)
      .createQueryBuilder("project")
      .where("project.userId = :id", { id: user.id })
      .orderBy("project.createdAt", "DESC")
      .getMany();

    res.status(200).json({
      success: true,
      projects,
    });
  } catch (error) {
    return next(error);
  }
};

export const createProject = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    if (!user) {
      throw new BadRequest("user cannot be null");
    }
    const name: string = req.body.name || "";
    const description: string = req.body.description || "";
    const sendGrid: string = req.body.sendGrid || "";
    const sendGridVerifiedEmail: string = req.body.sendGridVerifiedEmail || "";

    if (!name.trim().length) {
      throw new InputError({ name: "name cannot be empty" });
    }

    if (sendGrid.trim().length && !sendGridVerifiedEmail.trim().length) {
      throw new InputError({
        sendGridVerifiedEmail: "sendGrid Verified Email cannnot be null",
      });
    }

    if (!sendGrid.trim().length && sendGridVerifiedEmail.trim().length) {
      throw new InputError({
        sendGrid: "sendGrid key cannot be null",
      });
    }

    const project = new Project();
    project.name = name;
    project.description = description;
    project.sendGrid = sendGrid;
    project.sendGridVerifiedEmail = sendGridVerifiedEmail;
    project.userId = user.id;
    await project.save();

    res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    return next(error);
  }
};

export const deleteProject = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    if (!user) {
      throw new BadRequest("user cannot be null");
    }

    const id = +req.params.id;
    const data = await Project.delete({ id, userId: user.id });
    res.status(200).json({
      success: true,
      data,
      id,
    });
  } catch (error) {
    return next(error);
  }
};

export const updateProject = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    const id = req.params.id;
    if (!user) {
      throw new BadRequest("user cannot be null");
    }
    if (!id) {
      throw new BadRequest("id cannot be null");
    }

    const name: string = req.body.name || "";
    const description: string = req.body.description || "";
    const sendGrid: string = req.body.sendGrid || "";
    const sendGridVerifiedEmail: string = req.body.sendGridVerifiedEmail || "";

    const project = await Project.findOne(id);
    if (!project) {
      throw new NotFound("project", id);
    }

    if (project.userId !== user.id) {
      throw new Unathorized();
    }
    if (name.trim().length) {
      project.name = name;
    }
    if (description.trim().length) {
      project.description = description;
    }
    if (!sendGrid.trim().length && !sendGridVerifiedEmail.trim().length) {
      project.sendGrid = "";
      project.sendGridVerifiedEmail = "";
    } else {
      project.sendGrid = sendGrid;
      project.sendGridVerifiedEmail = sendGridVerifiedEmail;
    }

    await project.save();

    res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    return next(error);
  }
};

export const getDashboardDetail = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;
    if (!user) {
      throw new BadRequest("user cannot be null");
    }

    const totalProject = await getConnection()
      .getRepository(Project)
      .createQueryBuilder("project")
      .where("project.userId = :id", { id: user.id })
      .getCount();

    const totalMail = await getConnection()
      .getRepository(Mail)
      .createQueryBuilder("mail")
      .leftJoinAndSelect("mail.project", "project")
      .where("project.userId = :id", { id: user.id })
      .andWhere("mail.isSuccess = true")
      .getCount();

    const totalFailedMail = await getConnection()
      .getRepository(Mail)
      .createQueryBuilder("mail")
      .leftJoinAndSelect("mail.project", "project")
      .where("project.userId = :id", { id: user.id })
      .andWhere("mail.isSuccess = false")
      .getCount();

    res.status(200).json({
      success: true,
      "total project": totalProject,
      "mail sent successfully": totalMail,
      "mail failed": totalFailedMail,
    });
  } catch (error) {
    return next(error);
  }
};
