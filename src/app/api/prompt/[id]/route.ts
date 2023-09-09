import PromptModel from '~/models/prompt';
import { connectDB } from '~/utils/database';
import { IPost } from '~/utils/types/prompt.type';

type Params = { id: string };

export const GET = async (req: Request, { params }: { params: Params }) => {
  try {
    await connectDB();

    const prompt = await PromptModel.findById(params.id).populate('creator');

    if (!prompt) return new Response('Prompt not found', { status: 404 });

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response('Failed to fetch prompt', { status: 500 });
  }
};

export const PATCH = async (req: Request, { params }: { params: Params }) => {
  const { prompt, tag } = (await req.json()) as IPost; // body

  console.log({ prompt, tag });
  try {
    await connectDB();

    const existingPrompt = await PromptModel.findById(params.id).populate('creator');

    if (!existingPrompt) return new Response('Prompt not found', { status: 404 });

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    await existingPrompt.save();

    return new Response('Update prompt successfully', { status: 200 });
  } catch (error) {
    return new Response('Failed to update prompt', { status: 500 });
  }
};

export const DELETE = async (req: Request, { params }: { params: Params }) => {
  try {
    await connectDB();

    await PromptModel.findByIdAndRemove(params.id);
    return new Response('Prompt deleted successfully', { status: 200 });
  } catch (error) {
    return new Response('Failed to delete prompt', { status: 500 });
  }
};
