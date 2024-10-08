/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodArray, ZodEffects, ZodRecord } from "zod";
import catchAsync from "../utils/catchAsync";

interface MulterRequest extends Request {
  file?: Express.Multer.File; // Use optional to avoid errors if no file is uploaded
}

const validateImageFileRequest = (
  schema: AnyZodObject | ZodEffects<any> | ZodArray<any> | ZodRecord<any>
) => {
  return catchAsync(
    async (req: MulterRequest, res: Response, next: NextFunction) => {
      // Validate the file with the provided schema
      const parsedFile = await schema.parseAsync({
        file: req.file,
      });

      req.file = parsedFile.file; // Assign the validated file back to req.file

      next();
    }
  );
};
export default validateImageFileRequest;
