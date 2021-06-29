import { classToPlain } from "class-transformer";
import { User } from "../models/User";

export const formatUser = (user: User) => {
  return <User>classToPlain(user);
};
