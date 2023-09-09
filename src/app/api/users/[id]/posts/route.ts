import PromptModel from '~/models/prompt';
import { connectDB } from '~/utils/database';

type Params = { id: string };

export const GET = async (req: Request, { params }: { params: Params }): Promise<Response> => {
  try {
    await connectDB();

    const prompts = await PromptModel.find({ creator: params.id }).populate('creator');
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    return new Response('Failed to get');
  }
};
