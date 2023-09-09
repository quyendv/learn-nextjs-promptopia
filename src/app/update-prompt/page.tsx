'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import Form from '~/components/Form';
import { IPost } from '~/utils/types/prompt.type';

export default function UpdatePrompt() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get('id');

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState<IPost>({
    prompt: '',
    tag: '',
  });

  useEffect(() => {
    const getPromptDetails = async (): Promise<void> => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = (await response.json()) as IPost;

      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };

    if (promptId) getPromptDetails();
  }, [promptId]);

  const updatePrompt = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    if (!promptId) return alert('Missing PromptId!');

    try {
      console.log(post);
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: 'PATCH',
        body: JSON.stringify({ prompt: post.prompt, tag: post.tag } as IPost),
      });

      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return <Form type="Edit" post={post} setPost={setPost} submitting={submitting} handleSubmit={updatePrompt} />;
}
