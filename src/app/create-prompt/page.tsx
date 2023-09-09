'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

import Form from '~/components/Form';
import { ICreatePost, IPost } from '~/utils/types/prompt.type';
import { SessionWithUser } from '../api/auth/[...nextauth]/route';

export default function CreatePrompt() {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState<IPost>({
    prompt: '',
    tag: '',
  });

  const createPrompt = async (e: FormEvent<HTMLFormElement>): Promise<any> => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response: Response = await fetch('/api/prompt/new', {
        method: 'POST',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
          userId: (session as SessionWithUser).user.id,
        } as ICreatePost),
      });

      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return <Form type="Create" post={post} setPost={setPost} submitting={submitting} handleSubmit={createPrompt} />;
}
