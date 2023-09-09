import PromptModel from '~/models/prompt';
import { connectDB } from '~/utils/database';
import { ICreatePost } from '~/utils/types/prompt.type';

export const POST = async (req: Request, res: Response) => {
  const { userId, prompt, tag } = (await req.json()) as ICreatePost;

  try {
    await connectDB();
    const newPrompt = new PromptModel({
      creator: userId,
      prompt,
      tag,
    });

    await newPrompt.save();

    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    return new Response('Failed to create a new prompt', { status: 500 });
  }
};
