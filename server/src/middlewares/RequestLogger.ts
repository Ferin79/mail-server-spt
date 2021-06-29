import { NextFunction, Request, Response } from "express";
import { RequestLoggerConfig } from "../configs/winston";

export const RequestLogger = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  const data = {
    originalUrl: req.originalUrl,
    baseUrl: req.baseUrl,
    method: req.method,
    headers: req.headers,
    body: req.body,
    params: req.params,
    query: req.query,
    cookies: req.cookies,
    path: req.path,
    ip: req.ip,
    ips: req.ips,
  };
  RequestLoggerConfig.info(data);
  next();
};
