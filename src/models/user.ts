import { HydratedDocument, Model, Schema, Types, model, models } from 'mongoose';

export interface IUser {
  _id?: Types.ObjectId;
  email?: string; // optional due to profile has optional keys
  username?: string; // optional due to profile has optional keys
  image?: string; // optional due to profile has optional keys
  createdAt?: Date;
  deletedAt?: Date;
}

export type UserDocument = HydratedDocument<IUser>;

export const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      // unique: [true, 'Email is already taken'], // WRONG SYNTAX
      unique: true,
      required: [true, 'Email is required'],
    },
    username: {
      type: String,
      required: [true, 'Username is required'],
      match: [
        /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
        'Username invalid, it should contain 8-20 alphanumeric letters and be unique!',
      ],
    },
    image: {
      type: String,
    },
  },
  { timestamps: true },
);

// The "models" object is provided by the Mongoose Library and stores all the registered models.
// If a model named "User" already exists in the "models" object, it assigns that existing model to the "User" variable.
// This prevents redefining the model and ensures that the existing model is reused.

// If a model named "User" does not exist in the "models" object, the "model " function from Mongoose is called to create a new model
// The newly created model is then assigned to the "User" variable.

const UserModel: Model<IUser> = models.User || model<IUser>('User', UserSchema);

export default UserModel;
