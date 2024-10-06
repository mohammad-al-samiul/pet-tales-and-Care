import { Model, ObjectId } from "mongoose";

export type TUser = {
  _id: string;
  name: string;
  email: string;
  password: string;
  bio?: string;
  coverPhoto?: string;
  profilePicture?: string;
  role: "user" | "admin";
  followers: ObjectId[];
  following: ObjectId[];
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  passwordChangedAt?: Date;
  passResetToken?: string;
};

export type TUserRole = "user" | "admin";

export interface TUserModel extends Model<TUser> {
  isUserExist(email: string): TUser | null;
}
