import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { userService } from "./user.service";

const getAllUsers = catchAsync(async (req, res) => {
  const result = await userService.getAllUsers();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All users retrieved successfully!",
    data: result,
  });
});

const getOwnProfile = catchAsync(async (req, res) => {
  const authToken = req.headers.authorization;
  const token = authToken?.split("Bearer, ")[1];

  const result = await userService.getOwnProfile(token!);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Profile retrieved successfully!",
    data: result,
  });
});

const updateProfile = catchAsync(async (req, res) => {
  const authToken = req.headers.authorization;
  const token = authToken?.split("Bearer, ")[1];

  const result = await userService.updateProfile(req.body, token!);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Profile updated successfully!",
    data: result,
  });
});

const followingUser = catchAsync(async (req, res) => {
  const authToken = req.headers.authorization;
  const token = authToken?.split("Bearer, ")[1];
  const result = await userService.followingUser(token!, req.body.followingId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Follow created successfully!",
    data: result,
  });
});

const unFollowingUser = catchAsync(async (req, res) => {
  const authToken = req.headers.authorization;
  const token = authToken?.split("Bearer, ")[1];
  const result = await userService.unFollowingUser(
    token!,
    req.body.unFollowingId
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Unfollowed successfully!",
    data: result,
  });
});

export const userController = {
  getAllUsers,
  getOwnProfile,
  updateProfile,
  followingUser,
  unFollowingUser,
};
