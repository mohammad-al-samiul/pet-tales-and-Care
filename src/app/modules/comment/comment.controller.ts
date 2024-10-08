import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { commentServices } from "./comment.service";

const createComment = catchAsync(async (req, res) => {
  const authToken = req.headers.authorization;
  const token = authToken?.split("Bearer, ")[1];
  const postData = req.body;
  const result = await commentServices.createCommentIntoDb(postData, token!);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Comment created successfully!",
    data: result,
  });
});

const updateComment = catchAsync(async (req, res) => {
  const authToken = req.headers.authorization;
  const token = authToken?.split("Bearer, ")[1];
  const comment = req.body;
  const commentId = req.params.id;
  const result = await commentServices.updateComment(
    commentId,
    comment,
    token!
  );
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Comment updated successfully!",
    data: result,
  });
});

const deleteComment = catchAsync(async (req, res) => {
  const authToken = req.headers.authorization;
  const token = authToken?.split("Bearer, ")[1];
  const commentId = req.params.id;
  const result = await commentServices.deleteComment(commentId, token!);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Comment deleted successfully!",
    data: result,
  });
});

export const commentControllers = {
  createComment,
  updateComment,
  deleteComment,
};
