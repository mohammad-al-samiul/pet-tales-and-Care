import { authServices } from "./auth.service";

import config from "../../config";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";

const createUser = catchAsync(async (req, res) => {
  const result = await authServices.createUserIntoDb(req.body);
  res.cookie("refreshToken", result.refreshToken, {
    secure: config.node_env === "production",
    httpOnly: true,
  });
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "User registered successfully!",
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await authServices.loginUser(req.body);
  res.cookie("refreshToken", result.refreshToken, {
    secure: config.node_env === "production",
    httpOnly: true,
  });
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User logged in successfully!",
    data: result,
  });
});

const forgetPassword = catchAsync(async (req, res) => {
  const result = await authServices.forgetPassword(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Reset password token generated!",
    data: result,
  });
});

const resetPassword = catchAsync(async (req, res) => {
  const authToken = req.headers.authorization;
  const token = authToken?.split("Bearer, ")[1];
  const result = await authServices.resetPassword(req.body, token!);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Password reset successfully!",
    data: result,
  });
});

const getNewAccessToken = catchAsync(async (req, res) => {
  const authToken = req.headers.authorization;
  const token = authToken?.split("Bearer, ")[1];
  const result = await authServices.getNewAccessToken(token!);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Access token retrieved successfully!",
    data: result,
  });
});

export const authControllers = {
  createUser,
  loginUser,
  forgetPassword,
  resetPassword,
  getNewAccessToken,
};
