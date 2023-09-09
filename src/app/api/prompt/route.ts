import PromptModel from '~/models/prompt';
import { connectDB } from '~/utils/database';

export const GET = async (req: Request) => {
  try {
    await connectDB();

    const prompts = await PromptModel.find().populate('creator');
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response('Failed to fetch all prompts', { status: 500 });
  }
};
