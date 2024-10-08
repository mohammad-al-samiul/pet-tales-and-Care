import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import PostModel from "./post.model";
import { postServices } from "./post.service";
import AppError from "../../errors/AppError";

const createPost = catchAsync(async (req, res) => {
  if (!req.file) {
    throw new AppError(400, "Please upload a thumbnail");
  }
  const bodyData = req.body;
  const postData = {
    thumbnail: req?.file?.path,
    ...bodyData,
  };

  const result = await postServices.createPostIntoDb(postData);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Post created successfully!",
    data: result,
  });
});

const getAllPosts = catchAsync(async (req, res) => {
  const result = await postServices.getAllPostFromDb(req.query);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Posts retrieved successfully!",
    data: result,
  });
});

const getPostById = catchAsync(async (req, res) => {
  const result = await postServices.getSinglePostFromDb(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Post retrieved successfully!",
    data: result,
  });
});

const updateSinglePost = catchAsync(async (req, res) => {
  const bodyData = req.body;
  let thumbnail;
  const oldPost = await PostModel.findById(req.params.id);
  if (req.file) {
    thumbnail = req.file?.path;
  } else {
    thumbnail = oldPost?.thumbnail;
  }
  const postData = {
    thumbnail,
    ...bodyData,
  };

  const retrievedToken = req.headers.authorization;
  const token = retrievedToken?.split("Bearer, ")[1];

  const result = await postServices.updateSinglePost(
    req.params.id,
    postData,
    token!
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Post updated successfully!",
    data: result,
  });
});

const updatePostVote = catchAsync(async (req, res) => {
  const result = await postServices.updatePostVote(
    req.params.id,
    req.body.vote
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Post vote updated successfully!",
    data: result,
  });
});

const deletePost = catchAsync(async (req, res) => {
  const retrievedToken = req.headers.authorization;
  const token = retrievedToken?.split("Bearer, ")[1];
  const result = await postServices.deletePost(req.params.id, token!);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Post deleted successfully!",
    data: result,
  });
});

const getPostByUser = catchAsync(async (req, res) => {
  const result = await postServices.getPostByUser(req.params.userId);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Post retrieved successfully!",
    data: result,
  });
});

const updatePostPublishStatus = catchAsync(async (req, res) => {
  const retrievedToken = req.headers.authorization;
  const token = retrievedToken?.split("Bearer, ")[1];
  const isPublished = req.body.isPublished;
  const result = await postServices.updatePostPublishStatus(
    req.params.id,
    isPublished,
    token!
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: `Post ${isPublished ? "published" : "unpublished"} successfully!`,
    data: result,
  });
});

export const postControllers = {
  createPost,
  getAllPosts,
  getPostById,
  updateSinglePost,
  updatePostVote,
  deletePost,
  getPostByUser,
  updatePostPublishStatus,
};
