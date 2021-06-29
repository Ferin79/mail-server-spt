import { BadRequest } from "./../errors/BadRequest";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import fs from "fs";
import { InputError } from "./../errors/InputError";
import { NotFound } from "./../errors/NotFound";
import { Mail } from "./../models/Mail";
import { Project } from "./../models/Project";
import { AttachmentType } from "./../types/AttachmentType";
import sgMail from "@sendgrid/mail";
import * as dotenv from "dotenv";
dotenv.config();

const from = "smartypantsdeveloper@gmail.com";

function base64_encode(file: string) {
  const bitmap = fs.readFileSync(file);
  return Buffer.from(bitmap).toString("base64");
}

export const sendMail = (
  from: string,
  to: string,
  subject: string,
  html: string,
  project: Project,
  useOwnCred: boolean,
  files?: any
) => {
  if (useOwnCred) {
    sgMail.setApiKey(project.sendGrid);
  } else {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
  }

  const attachments: AttachmentType[] = [];
  if (files?.files?.length) {
    files.files.forEach((item: Express.Multer.File) => {
      attachments.push({
        filename: item.filename,
        content: base64_encode(item.path),
        type: item.mimetype,
        disposition: "attachment",
        contentId: item.filename,
      });
    });
  }

  const msg = {
    to,
    from: useOwnCred ? project.sendGridVerifiedEmail : from,
    subject,
    html,
    attachments,
  };

  if (files?.files?.length) {
    files.files.forEach((item: Express.Multer.File) => {
      fs.unlink(item.path, () => {
        console.log("File Deleted", item.path);
      });
    });
  }
  return sgMail.send(msg);
};

export const handleMail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const apiKey: string = req.body.apiKey;
    const to: string = req.body.to;
    const subject: string = req.body.subject;
    const html: string = req.body.html;
    const useOwnCred: boolean = req.body.useOwnCred === "true" ? true : false;

    if (!apiKey.trim().length) {
      throw new InputError({ apiKey: "api key cannot be null" });
    }

    if (!to.trim().length) {
      throw new InputError({ to: "sender email cannot be null" });
    }
    if (!subject.trim().length) {
      throw new InputError({ subject: "subject cannot be null" });
    }
    if (!html.trim().length) {
      throw new InputError({ html: "body cannot be null" });
    }

    const project = await Project.findOne({ where: { apiKey } });
    if (!project) {
      throw new NotFound("project", apiKey);
    }
    if (useOwnCred) {
      if (
        !project.sendGrid.trim().length ||
        !project.sendGridVerifiedEmail.trim().length
      ) {
        throw new BadRequest("you have invalid sendGrid credentail");
      }
    }

    let isSuccess = false;
    try {
      const data = await sendMail(
        from,
        to,
        subject,
        html,
        project,
        useOwnCred,
        req.files
      );
      res.status(200).json({
        success: true,
        data,
      });
      isSuccess = true;
    } catch (error) {
      console.log(error);
      isSuccess = false;
      res.status(400).json({
        success: false,
        message: "Something went wrong",
        error: error?.response?.body?.errors[0] || error.message,
      });
    }

    const mail = new Mail();
    mail.from = from;
    mail.to = to;
    mail.subject = subject;
    mail.html = html;
    mail.project = project;
    mail.isSuccess = isSuccess;
    mail.fileCount = (req.files as any)?.files
      ? (req.files as any)?.files.length
      : 0;
    mail.save();

    project.mailSent += 1;
    project.save();
  } catch (error) {
    return next(error);
  }
};

export const getAllMailSendByProjectId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id: string = req.params.id;
    console.log(id);
    const mails = await Mail.find({
      where: { projectId: id },
      order: { createdAt: "DESC" },
    });

    res.status(200).json({
      success: true,
      mails,
    });
  } catch (error) {
    return next(error);
  }
};
