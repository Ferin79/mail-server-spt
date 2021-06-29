import { createLogger, format, transports } from "winston";

const { combine, timestamp, prettyPrint } = format;

export const RequestLoggerConfig = createLogger({
  level: "info",
  format: combine(timestamp(), prettyPrint()),
  transports: [new transports.File({ filename: "requests.log" })],
});

export const Logger = createLogger({
  level: "debug",
  format: combine(timestamp(), prettyPrint()),
  transports: [
    new transports.File({ filename: "error.log", level: "error" }),
    new transports.File({ filename: "combined.log" }),
    new transports.Console(),
  ],
});
