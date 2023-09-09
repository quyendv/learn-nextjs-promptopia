import { HydratedDocument, Model, Schema, Types, model, models } from 'mongoose';
import { UserDocument } from './user';

export interface IPrompt {
  _id?: Types.ObjectId;
  creator: UserDocument;
  prompt: string;
  tag: string;
  createdAt?: Date;
  deletedAt?: Date;
}

export type PromptDocument = HydratedDocument<IPrompt>;

const PromptSchema = new Schema<IPrompt>({
  creator: {
    type: Types.ObjectId,
    ref: 'User',
  },
  prompt: {
    type: String,
    required: [true, 'Prompt is required.'],
  },
  tag: {
    type: String,
    required: [true, 'Tag is required.'],
  },
});

const PromptModel: Model<IPrompt> = models.Prompt || model('Prompt', PromptSchema);

export default PromptModel;
