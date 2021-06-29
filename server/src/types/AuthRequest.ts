import { Request } from "express";
import { User } from "../models/User";
export type AuthRequest = Request & { user?: User };
