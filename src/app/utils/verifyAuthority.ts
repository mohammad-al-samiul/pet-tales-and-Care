import httpStatus from "http-status";

import verifyAccessToken from "./verifyJWT";
import AppError from "../errors/AppError";

export const verifyAuthority = (idToVerify: string, token: string) => {
  const decoded = verifyAccessToken(token);
  if (decoded.role !== "admin" && idToVerify !== decoded._id) {
    throw new AppError(httpStatus.FORBIDDEN, "Forbidden");
  }

  return decoded;
};
